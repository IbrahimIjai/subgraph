import {
	PFUpdated as PFUpdatedEvent,
	Transfer as TransferEvent,
} from "../generated/KoanProfile/KoanProfile";
import { User, Token, PFUpdated, Transfer } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handlePFUpdated(event: PFUpdatedEvent): void {
	console.log(
		"Handling PFUpdated event for user: " +
			event.params.user.toHexString() +
			" with tokenId: " +
			event.params.tokenId.toString(),
	
		);

	
	let user = getOrCreateUser(event.params.user);

	console.log("User loaded/created: " + user.id);
	let token = Token.load(event.params.tokenId.toString());

	if (token) {
		user.currentPFP = token.id;
		console.log("Setting user's currentPFP to tokenId: " + token.id);
		user.save();
	}

	let entity = new PFUpdated(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.user = event.params.user;
	entity.tokenId = event.params.tokenId;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleTransfer(event: TransferEvent): void {
	let tokenId = event.params.tokenId.toString();
	let token = Token.load(tokenId);

	if (!token) {
		token = new Token(tokenId);
		token.createdAt = event.block.timestamp;
	}

	// Handle mint (from address zero)
	if (event.params.from.equals(Address.zero())) {
		let newOwner = getOrCreateUser(event.params.to);
		token.owner = newOwner.id;
		token.updatedAt = event.block.timestamp;
		newOwner.tokenCount = newOwner.tokenCount.plus(BigInt.fromI32(1));
		newOwner.save();
		token.save();
	} else {
		// Handle regular transfer
		let prevOwner = getOrCreateUser(event.params.from);
		let newOwner = getOrCreateUser(event.params.to);

		token.owner = newOwner.id;
		token.updatedAt = event.block.timestamp;

		prevOwner.tokenCount = prevOwner.tokenCount.minus(BigInt.fromI32(1));
		newOwner.tokenCount = newOwner.tokenCount.plus(BigInt.fromI32(1));

		prevOwner.save();
		newOwner.save();
		token.save();
	}

	let entity = new Transfer(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.from = event.params.from;
	entity.to = event.params.to;
	entity.tokenId = event.params.tokenId;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

function getOrCreateUser(address: Address): User {
	let user = User.load(address.toHexString());
	if (!user) {
		user = new User(address.toHexString());
		user.tokenCount = BigInt.fromI32(0);
		user.save();
	}
	return user;
}

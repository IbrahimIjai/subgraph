import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Factory as FactoryContract } from "../../generated/templates/Pool/Factory";

export const FACTORY_ADDRESS = Address.fromString(
	"0x4E02A5e71197fAE4925b23CEdc35D987a4409DB0",
);
export const NETWORK = "base-sepolia";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS);

export const WHITELISTED_TOKEN_ADDRESSES: string[] =
	"0x4200000000000000000000000000000000000006,0x036CbD53842c5426634e7929541eC2318f3dCF7e,0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e,0x7f31d5064C7914e417091A39eceBb81bAc582536".split(",");

export const NATIVE_ADDRESS = "0x4200000000000000000000000000000000000006";

export const STABLE_TOKEN_ADDRESSES: string[] =
	"0x036CbD53842c5426634e7929541eC2318f3dCF7e,0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e".split(",");

export const MINIMUM_ETH_LOCKED = BigDecimal.fromString(
	"1",
);

export const NATIVE_PRICE_POOL = Address.fromString("0x2ca52156682e4a80aef0500de2ff41a43b98bccd")
	.toHex()
	.toLowerCase();

	
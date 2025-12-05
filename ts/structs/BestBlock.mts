
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The best known block as identified by its hash and height.
 */
export class BestBlock extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BestBlock_free);
	}

	/**
	 * The block's hash
	 */
	public get_block_hash(): Uint8Array {
		const ret: number = bindings.BestBlock_get_block_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The block's hash
	 */
	public set_block_hash(val: Uint8Array): void {
		bindings.BestBlock_set_block_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public get_height(): number {
		const ret: number = bindings.BestBlock_get_height(this.ptr);
		return ret;
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public set_height(val: number): void {
		bindings.BestBlock_set_height(this.ptr, val);
	}

	/**
	 * Constructs a new BestBlock given each field
	 */
	public static constructor_new(block_hash_arg: Uint8Array, height_arg: number): BestBlock {
		const ret: bigint = bindings.BestBlock_new(bindings.encodeUint8Array(block_hash_arg), height_arg);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BestBlock_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BestBlock
	 */
	public clone(): BestBlock {
		const ret: bigint = bindings.BestBlock_clone(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BestBlock.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BestBlock_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BestBlocks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BestBlock): boolean {
		const ret: boolean = bindings.BestBlock_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Constructs a `BestBlock` that represents the genesis block at height 0 of the given
	 * network.
	 */
	public static constructor_from_network(network: Network): BestBlock {
		const ret: bigint = bindings.BestBlock_from_network(network);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the BestBlock object into a byte array which can be read by BestBlock_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BestBlock_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BestBlock from a byte array, created by BestBlock_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BestBlockDecodeErrorZ {
		const ret: bigint = bindings.BestBlock_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BestBlockDecodeErrorZ = Result_BestBlockDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

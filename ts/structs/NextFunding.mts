
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information exchanged during channel reestablishment about the next funding from interactive
 * transaction construction.
 */
export class NextFunding extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NextFunding_free);
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public get_txid(): Uint8Array {
		const ret: number = bindings.NextFunding_get_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The txid of the interactive transaction construction.
	 */
	public set_txid(val: Uint8Array): void {
		bindings.NextFunding_set_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public get_retransmit_flags(): number {
		const ret: number = bindings.NextFunding_get_retransmit_flags(this.ptr);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`NextFundingFlag`] for details.
	 */
	public set_retransmit_flags(val: number): void {
		bindings.NextFunding_set_retransmit_flags(this.ptr, val);
	}

	/**
	 * Constructs a new NextFunding given each field
	 */
	public static constructor_new(txid_arg: Uint8Array, retransmit_flags_arg: number): NextFunding {
		const ret: bigint = bindings.NextFunding_new(bindings.encodeUint8Array(txid_arg), retransmit_flags_arg);
		const ret_hu_conv: NextFunding = new NextFunding(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NextFunding_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NextFunding
	 */
	public clone(): NextFunding {
		const ret: bigint = bindings.NextFunding_clone(this.ptr);
		const ret_hu_conv: NextFunding = new NextFunding(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NextFunding.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.NextFunding_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two NextFundings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NextFunding): boolean {
		const ret: boolean = bindings.NextFunding_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public retransmit(flag: NextFundingFlag): void {
		bindings.NextFunding_retransmit(this.ptr, flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public should_retransmit(flag: NextFundingFlag): boolean {
		const ret: boolean = bindings.NextFunding_should_retransmit(this.ptr, flag);
		return ret;
	}

	/**
	 * Serialize the NextFunding object into a byte array which can be read by NextFunding_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NextFunding_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NextFunding from a byte array, created by NextFunding_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NextFundingDecodeErrorZ {
		const ret: bigint = bindings.NextFunding_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NextFundingDecodeErrorZ = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information exchanged during channel reestablishment about the last funding locked.
 */
export class FundingLocked extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FundingLocked_free);
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public get_txid(): Uint8Array {
		const ret: number = bindings.FundingLocked_get_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The last txid sent by the sending node, which may be either from the last `splice_locked` or
	 * for the initial funding transaction if it sent `channel_ready`.
	 */
	public set_txid(val: Uint8Array): void {
		bindings.FundingLocked_set_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public get_retransmit_flags(): number {
		const ret: number = bindings.FundingLocked_get_retransmit_flags(this.ptr);
		return ret;
	}

	/**
	 * A bitfield indicating which messages should be retransmitted by the receiving node.
	 * 
	 * See [`FundingLockedFlags`] for details.
	 */
	public set_retransmit_flags(val: number): void {
		bindings.FundingLocked_set_retransmit_flags(this.ptr, val);
	}

	/**
	 * Constructs a new FundingLocked given each field
	 */
	public static constructor_new(txid_arg: Uint8Array, retransmit_flags_arg: number): FundingLocked {
		const ret: bigint = bindings.FundingLocked_new(bindings.encodeUint8Array(txid_arg), retransmit_flags_arg);
		const ret_hu_conv: FundingLocked = new FundingLocked(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FundingLocked_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FundingLocked
	 */
	public clone(): FundingLocked {
		const ret: bigint = bindings.FundingLocked_clone(this.ptr);
		const ret_hu_conv: FundingLocked = new FundingLocked(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the FundingLocked.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.FundingLocked_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two FundingLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: FundingLocked): boolean {
		const ret: boolean = bindings.FundingLocked_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Sets the bit in `retransmit_flags` for retransmitting the message corresponding to `flag`.
	 */
	public retransmit(flag: FundingLockedFlags): void {
		bindings.FundingLocked_retransmit(this.ptr, flag);
	}

	/**
	 * Returns whether the message corresponding to `flag` should be retransmitted.
	 */
	public should_retransmit(flag: FundingLockedFlags): boolean {
		const ret: boolean = bindings.FundingLocked_should_retransmit(this.ptr, flag);
		return ret;
	}

	/**
	 * Serialize the FundingLocked object into a byte array which can be read by FundingLocked_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FundingLocked_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingLocked from a byte array, created by FundingLocked_write
	 */
	public static constructor_read(ser: Uint8Array): Result_FundingLockedDecodeErrorZ {
		const ret: bigint = bindings.FundingLocked_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_FundingLockedDecodeErrorZ = Result_FundingLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

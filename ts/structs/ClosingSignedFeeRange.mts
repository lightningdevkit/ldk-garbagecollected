
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The minimum and maximum fees which the sender is willing to place on the closing transaction.
 * 
 * This is provided in [`ClosingSigned`] by both sides to indicate the fee range they are willing
 * to use.
 */
export class ClosingSignedFeeRange extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ClosingSignedFeeRange_free);
	}

	/**
	 * The minimum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public get_min_fee_satoshis(): bigint {
		const ret: bigint = bindings.ClosingSignedFeeRange_get_min_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The minimum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public set_min_fee_satoshis(val: bigint): void {
		bindings.ClosingSignedFeeRange_set_min_fee_satoshis(this.ptr, val);
	}

	/**
	 * The maximum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public get_max_fee_satoshis(): bigint {
		const ret: bigint = bindings.ClosingSignedFeeRange_get_max_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The maximum absolute fee, in satoshis, which the sender is willing to place on the closing
	 * transaction.
	 */
	public set_max_fee_satoshis(val: bigint): void {
		bindings.ClosingSignedFeeRange_set_max_fee_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new ClosingSignedFeeRange given each field
	 */
	public static constructor_new(min_fee_satoshis_arg: bigint, max_fee_satoshis_arg: bigint): ClosingSignedFeeRange {
		const ret: bigint = bindings.ClosingSignedFeeRange_new(min_fee_satoshis_arg, max_fee_satoshis_arg);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClosingSignedFeeRange_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSignedFeeRange
	 */
	public clone(): ClosingSignedFeeRange {
		const ret: bigint = bindings.ClosingSignedFeeRange_clone(this.ptr);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingSignedFeeRange.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ClosingSignedFeeRange_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ClosingSignedFeeRanges contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ClosingSignedFeeRange): boolean {
		const ret: boolean = bindings.ClosingSignedFeeRange_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ClosingSignedFeeRange object into a byte array which can be read by ClosingSignedFeeRange_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ClosingSignedFeeRange_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClosingSignedFeeRange from a byte array, created by ClosingSignedFeeRange_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ClosingSignedFeeRangeDecodeErrorZ {
		const ret: bigint = bindings.ClosingSignedFeeRange_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ClosingSignedFeeRangeDecodeErrorZ = Result_ClosingSignedFeeRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

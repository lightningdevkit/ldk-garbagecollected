
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The reason for HTLC failures in [`Event::HTLCHandlingFailed`].
 */
export class HTLCHandlingFailureReason extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.HTLCHandlingFailureReason_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): HTLCHandlingFailureReason {
		const raw_ty: number = bindings.LDKHTLCHandlingFailureReason_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HTLCHandlingFailureReason_Downstream(ptr);
			case 1: return new HTLCHandlingFailureReason_Local(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HTLCHandlingFailureReason_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureReason
	 */
	public clone(): HTLCHandlingFailureReason {
		const ret: bigint = bindings.HTLCHandlingFailureReason_clone(this.ptr);
		const ret_hu_conv: HTLCHandlingFailureReason = HTLCHandlingFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Downstream-variant HTLCHandlingFailureReason
	 */
	public static constructor_downstream(): HTLCHandlingFailureReason {
		const ret: bigint = bindings.HTLCHandlingFailureReason_downstream();
		const ret_hu_conv: HTLCHandlingFailureReason = HTLCHandlingFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Local-variant HTLCHandlingFailureReason
	 */
	public static constructor_local(reason: LocalHTLCFailureReason): HTLCHandlingFailureReason {
		const ret: bigint = bindings.HTLCHandlingFailureReason_local(CommonBase.get_ptr_of(reason));
		const ret_hu_conv: HTLCHandlingFailureReason = HTLCHandlingFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: HTLCHandlingFailureReason): boolean {
		const ret: boolean = bindings.HTLCHandlingFailureReason_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the HTLCHandlingFailureReason object into a byte array which can be read by HTLCHandlingFailureReason_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HTLCHandlingFailureReason_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCHandlingFailureReason from a byte array, created by HTLCHandlingFailureReason_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HTLCHandlingFailureReasonDecodeErrorZ {
		const ret: bigint = bindings.HTLCHandlingFailureReason_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HTLCHandlingFailureReasonDecodeErrorZ = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a HTLCHandlingFailureReason from a LocalHTLCFailureReason
	 */
	public static constructor_from_LocalHTLCFailureReason(f: LocalHTLCFailureReason): HTLCHandlingFailureReason {
		const ret: bigint = bindings.HTLCHandlingFailureReason_from_LocalHTLCFailureReason(CommonBase.get_ptr_of(f));
		const ret_hu_conv: HTLCHandlingFailureReason = HTLCHandlingFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A HTLCHandlingFailureReason of type Downstream */
export class HTLCHandlingFailureReason_Downstream extends HTLCHandlingFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A HTLCHandlingFailureReason of type Local */
export class HTLCHandlingFailureReason_Local extends HTLCHandlingFailureReason {
	/**
	 * The reason that our node chose to fail the HTLC.
	 */
	public reason: LocalHTLCFailureReason;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const reason: bigint = bindings.LDKHTLCHandlingFailureReason_Local_get_reason(ptr);
		const reason_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
	}
}

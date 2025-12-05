
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Strategies available to retry payment path failures.
 */
export class Retry extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Retry_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Retry {
		const raw_ty: number = bindings.LDKRetry_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Retry_Attempts(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Retry_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Retry
	 */
	public clone(): Retry {
		const ret: bigint = bindings.Retry_clone(this.ptr);
		const ret_hu_conv: Retry = Retry.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Attempts-variant Retry
	 */
	public static constructor_attempts(a: number): Retry {
		const ret: bigint = bindings.Retry_attempts(a);
		const ret_hu_conv: Retry = Retry.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Retrys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Retry): boolean {
		const ret: boolean = bindings.Retry_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Retry.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Retry_hash(this.ptr);
		return ret;
	}

	/**
	 * Serialize the Retry object into a byte array which can be read by Retry_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Retry_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Retry from a byte array, created by Retry_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RetryDecodeErrorZ {
		const ret: bigint = bindings.Retry_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RetryDecodeErrorZ = Result_RetryDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A Retry of type Attempts */
export class Retry_Attempts extends Retry {
	public attempts: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.attempts = bindings.LDKRetry_Attempts_get_attempts(ptr);
	}
}

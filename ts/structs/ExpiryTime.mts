
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Positive duration that defines when (relatively to the timestamp) in the future the invoice
 * expires
 */
export class ExpiryTime extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ExpiryTime_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ExpiryTime_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ExpiryTime
	 */
	public clone(): ExpiryTime {
		const ret: bigint = bindings.ExpiryTime_clone(this.ptr);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ExpiryTime.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ExpiryTime_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ExpiryTime): boolean {
		const ret: boolean = bindings.ExpiryTime_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Construct an `ExpiryTime` from seconds.
	 */
	public static constructor_from_seconds(seconds: bigint): ExpiryTime {
		const ret: bigint = bindings.ExpiryTime_from_seconds(seconds);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Construct an `ExpiryTime` from a [`Duration`], dropping the sub-second part.
	 */
	public static constructor_from_duration(duration: bigint): ExpiryTime {
		const ret: bigint = bindings.ExpiryTime_from_duration(duration);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the expiry time in seconds
	 */
	public as_seconds(): bigint {
		const ret: bigint = bindings.ExpiryTime_as_seconds(this.ptr);
		return ret;
	}

	/**
	 * Returns a reference to the underlying [`Duration`] (=expiry time)
	 */
	public as_duration(): bigint {
		const ret: bigint = bindings.ExpiryTime_as_duration(this.ptr);
		return ret;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A timestamp that refers to a date after 1 January 1970.
 * 
 * # Invariants
 * 
 * The Unix timestamp representing the stored time has to be positive and no greater than
 * [`MAX_TIMESTAMP`].
 */
export class PositiveTimestamp extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PositiveTimestamp_free);
	}

	/**
	 * Checks if two PositiveTimestamps contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PositiveTimestamp): boolean {
		const ret: boolean = bindings.PositiveTimestamp_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PositiveTimestamp_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PositiveTimestamp
	 */
	public clone(): PositiveTimestamp {
		const ret: bigint = bindings.PositiveTimestamp_clone(this.ptr);
		const ret_hu_conv: PositiveTimestamp = new PositiveTimestamp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PositiveTimestamp.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PositiveTimestamp_hash(this.ptr);
		return ret;
	}

	/**
	 * Creates a `PositiveTimestamp` from a Unix timestamp in the range `0..=MAX_TIMESTAMP`.
	 * 
	 * Otherwise, returns a [`CreationError::TimestampOutOfBounds`].
	 */
	public static constructor_from_unix_timestamp(unix_seconds: bigint): Result_PositiveTimestampCreationErrorZ {
		const ret: bigint = bindings.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		const ret_hu_conv: Result_PositiveTimestampCreationErrorZ = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a `PositiveTimestamp` from a [`Duration`] since the Unix epoch in the range
	 * `0..=MAX_TIMESTAMP`.
	 * 
	 * Note that the subsecond part is dropped as it is not representable in BOLT 11 invoices.
	 * 
	 * Otherwise, returns a [`CreationError::TimestampOutOfBounds`].
	 */
	public static constructor_from_duration_since_epoch(duration: bigint): Result_PositiveTimestampCreationErrorZ {
		const ret: bigint = bindings.PositiveTimestamp_from_duration_since_epoch(duration);
		const ret_hu_conv: Result_PositiveTimestampCreationErrorZ = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the Unix timestamp representing the stored time
	 */
	public as_unix_timestamp(): bigint {
		const ret: bigint = bindings.PositiveTimestamp_as_unix_timestamp(this.ptr);
		return ret;
	}

	/**
	 * Returns the duration of the stored time since the Unix epoch
	 */
	public as_duration_since_epoch(): bigint {
		const ret: bigint = bindings.PositiveTimestamp_as_duration_since_epoch(this.ptr);
		return ret;
	}

}

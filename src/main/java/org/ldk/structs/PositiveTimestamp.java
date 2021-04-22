package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * A timestamp that refers to a date after 1 January 1970 which means its representation as UNIX
 * timestamp is positive.
 * 
 * # Invariants
 * The UNIX timestamp representing the stored time has to be positive and small enough so that
 * a `EpiryTime` can be added to it without an overflow.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PositiveTimestamp extends CommonBase {
	PositiveTimestamp(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PositiveTimestamp_free(ptr); }
	}

	/**
	 * Creates a copy of the PositiveTimestamp
	 */
	public PositiveTimestamp clone() {
		long ret = bindings.PositiveTimestamp_clone(this.ptr);
		PositiveTimestamp ret_hu_conv = new PositiveTimestamp(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a new `PositiveTimestamp` from a unix timestamp in the Range
	 * `0...SYSTEM_TIME_MAX_UNIX_TIMESTAMP - MAX_EXPIRY_TIME`, otherwise return a
	 * `CreationError::TimestampOutOfBounds`.
	 */
	public static Result_PositiveTimestampCreationErrorZ constructor_from_unix_timestamp(long unix_seconds) {
		long ret = bindings.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new `PositiveTimestamp` from a `SystemTime` with a corresponding unix timestamp in
	 * the Range `0...SYSTEM_TIME_MAX_UNIX_TIMESTAMP - MAX_EXPIRY_TIME`, otherwise return a
	 * `CreationError::TimestampOutOfBounds`.
	 */
	public static Result_PositiveTimestampCreationErrorZ constructor_from_system_time(long time) {
		long ret = bindings.PositiveTimestamp_from_system_time(time);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the UNIX timestamp representing the stored time
	 */
	public long as_unix_timestamp() {
		long ret = bindings.PositiveTimestamp_as_unix_timestamp(this.ptr);
		return ret;
	}

	/**
	 * Returns a reference to the internal `SystemTime` time representation
	 */
	public long as_time() {
		long ret = bindings.PositiveTimestamp_as_time(this.ptr);
		return ret;
	}

}

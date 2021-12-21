package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
	 * Checks if two PositiveTimestamps contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PositiveTimestamp b) {
		boolean ret = bindings.PositiveTimestamp_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PositiveTimestamp)) return false;
		return this.eq((PositiveTimestamp)o);
	}
	long clone_ptr() {
		long ret = bindings.PositiveTimestamp_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PositiveTimestamp
	 */
	public PositiveTimestamp clone() {
		long ret = bindings.PositiveTimestamp_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PositiveTimestamp ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PositiveTimestamp(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Create a new `PositiveTimestamp` from a unix timestamp in the Range
	 * `0...SYSTEM_TIME_MAX_UNIX_TIMESTAMP - MAX_EXPIRY_TIME`, otherwise return a
	 * `CreationError::TimestampOutOfBounds`.
	 */
	public static Result_PositiveTimestampCreationErrorZ from_unix_timestamp(long unix_seconds) {
		long ret = bindings.PositiveTimestamp_from_unix_timestamp(unix_seconds);
		Reference.reachabilityFence(unix_seconds);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new `PositiveTimestamp` from a `SystemTime` with a corresponding unix timestamp in
	 * the Range `0...SYSTEM_TIME_MAX_UNIX_TIMESTAMP - MAX_EXPIRY_TIME`, otherwise return a
	 * `CreationError::TimestampOutOfBounds`.
	 */
	public static Result_PositiveTimestampCreationErrorZ from_system_time(long time) {
		long ret = bindings.PositiveTimestamp_from_system_time(time);
		Reference.reachabilityFence(time);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the UNIX timestamp representing the stored time
	 */
	public long as_unix_timestamp() {
		long ret = bindings.PositiveTimestamp_as_unix_timestamp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns a reference to the internal `SystemTime` time representation
	 */
	public long as_time() {
		long ret = bindings.PositiveTimestamp_as_time(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

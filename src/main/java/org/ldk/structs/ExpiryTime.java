package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Positive duration that defines when (relatively to the timestamp) in the future the invoice
 * expires
 * 
 * # Invariants
 * The number of seconds this expiry time represents has to be in the range
 * `0...(SYSTEM_TIME_MAX_UNIX_TIMESTAMP - MAX_EXPIRY_TIME)` to avoid overflows when adding it to a
 * timestamp
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ExpiryTime extends CommonBase {
	ExpiryTime(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ExpiryTime_free(ptr); }
	}

	/**
	 * Creates a copy of the ExpiryTime
	 */
	public ExpiryTime clone() {
		long ret = bindings.ExpiryTime_clone(this.ptr);
		if (ret < 1024) { return null; }
		ExpiryTime ret_hu_conv = new ExpiryTime(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.ExpiryTime_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(ExpiryTime b) {
		boolean ret = bindings.ExpiryTime_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Construct an `ExpiryTime` from seconds. If there exists a `PositiveTimestamp` which would
	 * overflow on adding the `EpiryTime` to it then this function will return a
	 * `CreationError::ExpiryTimeOutOfBounds`.
	 */
	public static Result_ExpiryTimeCreationErrorZ from_seconds(long seconds) {
		long ret = bindings.ExpiryTime_from_seconds(seconds);
		if (ret < 1024) { return null; }
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Construct an `ExpiryTime` from a `Duration`. If there exists a `PositiveTimestamp` which
	 * would overflow on adding the `EpiryTime` to it then this function will return a
	 * `CreationError::ExpiryTimeOutOfBounds`.
	 */
	public static Result_ExpiryTimeCreationErrorZ from_duration(long duration) {
		long ret = bindings.ExpiryTime_from_duration(duration);
		if (ret < 1024) { return null; }
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the expiry time in seconds
	 */
	public long as_seconds() {
		long ret = bindings.ExpiryTime_as_seconds(this.ptr);
		return ret;
	}

	/**
	 * Returns a reference to the underlying `Duration` (=expiry time)
	 */
	public long as_duration() {
		long ret = bindings.ExpiryTime_as_duration(this.ptr);
		return ret;
	}

}

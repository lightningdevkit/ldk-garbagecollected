package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Positive duration that defines when (relatively to the timestamp) in the future the invoice
 * expires
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ExpiryTime extends CommonBase {
	ExpiryTime(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ExpiryTime_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.ExpiryTime_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ExpiryTime
	 */
	public ExpiryTime clone() {
		long ret = bindings.ExpiryTime_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ExpiryTime(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.ExpiryTime_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ExpiryTimes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(ExpiryTime b) {
		boolean ret = bindings.ExpiryTime_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ExpiryTime)) return false;
		return this.eq((ExpiryTime)o);
	}
	/**
	 * Construct an `ExpiryTime` from seconds.
	 */
	public static ExpiryTime from_seconds(long seconds) {
		long ret = bindings.ExpiryTime_from_seconds(seconds);
		Reference.reachabilityFence(seconds);
		if (ret >= 0 && ret <= 4096) { return null; }
		ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ExpiryTime(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Construct an `ExpiryTime` from a `Duration`.
	 */
	public static ExpiryTime from_duration(long duration) {
		long ret = bindings.ExpiryTime_from_duration(duration);
		Reference.reachabilityFence(duration);
		if (ret >= 0 && ret <= 4096) { return null; }
		ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ExpiryTime(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the expiry time in seconds
	 */
	public long as_seconds() {
		long ret = bindings.ExpiryTime_as_seconds(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns a reference to the underlying `Duration` (=expiry time)
	 */
	public long as_duration() {
		long ret = bindings.ExpiryTime_as_duration(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

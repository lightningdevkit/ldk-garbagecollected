package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Number of attempts to retry payment path failures for an [`Invoice`].
 * 
 * Note that this is the number of *path* failures, not full payment retries. For multi-path
 * payments, if this is less than the total number of paths, we will never even retry all of the
 * payment's paths.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RetryAttempts extends CommonBase {
	RetryAttempts(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RetryAttempts_free(ptr); }
	}

	public long get_a() {
		long ret = bindings.RetryAttempts_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(long val) {
		bindings.RetryAttempts_set_a(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new RetryAttempts given each field
	 */
	public static RetryAttempts of(long a_arg) {
		long ret = bindings.RetryAttempts_new(a_arg);
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		RetryAttempts ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RetryAttempts(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.RetryAttempts_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RetryAttempts
	 */
	public RetryAttempts clone() {
		long ret = bindings.RetryAttempts_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RetryAttempts ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RetryAttempts(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RetryAttemptss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RetryAttempts b) {
		boolean ret = bindings.RetryAttempts_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RetryAttempts)) return false;
		return this.eq((RetryAttempts)o);
	}
	/**
	 * Checks if two RetryAttemptss contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RetryAttempts_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
}

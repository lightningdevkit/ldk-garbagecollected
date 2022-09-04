package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Strategies available to retry payment path failures for an [`Invoice`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Retry extends CommonBase {
	private Retry(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Retry_free(ptr); }
	}
	static Retry constr_from_ptr(long ptr) {
		bindings.LDKRetry raw_val = bindings.LDKRetry_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKRetry.Attempts.class) {
			return new Attempts(ptr, (bindings.LDKRetry.Attempts)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKRetry.Timeout.class) {
			return new Timeout(ptr, (bindings.LDKRetry.Timeout)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Max number of attempts to retry payment.
	 * 
	 * Note that this is the number of *path* failures, not full payment retries. For multi-path
	 * payments, if this is less than the total number of paths, we will never even retry all of the
	 * payment's paths.
	 */
	public final static class Attempts extends Retry {
		public final long attempts;
		private Attempts(long ptr, bindings.LDKRetry.Attempts obj) {
			super(null, ptr);
			this.attempts = obj.attempts;
		}
	}
	/**
	 * Time elapsed before abandoning retries for a payment.
	 */
	public final static class Timeout extends Retry {
		public final long timeout;
		private Timeout(long ptr, bindings.LDKRetry.Timeout obj) {
			super(null, ptr);
			this.timeout = obj.timeout;
		}
	}
	long clone_ptr() {
		long ret = bindings.Retry_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Retry
	 */
	public Retry clone() {
		long ret = bindings.Retry_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Retry ret_hu_conv = org.ldk.structs.Retry.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Attempts-variant Retry
	 */
	public static Retry attempts(long a) {
		long ret = bindings.Retry_attempts(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Retry ret_hu_conv = org.ldk.structs.Retry.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Timeout-variant Retry
	 */
	public static Retry timeout(long a) {
		long ret = bindings.Retry_timeout(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Retry ret_hu_conv = org.ldk.structs.Retry.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Retrys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(Retry b) {
		boolean ret = bindings.Retry_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Retry)) return false;
		return this.eq((Retry)o);
	}
	/**
	 * Checks if two Retrys contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Retry_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The reason for HTLC failures in [`Event::HTLCHandlingFailed`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCHandlingFailureReason extends CommonBase {
	private HTLCHandlingFailureReason(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCHandlingFailureReason_free(ptr); }
	}
	static HTLCHandlingFailureReason constr_from_ptr(long ptr) {
		bindings.LDKHTLCHandlingFailureReason raw_val = bindings.LDKHTLCHandlingFailureReason_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureReason.Downstream.class) {
			return new Downstream(ptr, (bindings.LDKHTLCHandlingFailureReason.Downstream)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKHTLCHandlingFailureReason.Local.class) {
			return new Local(ptr, (bindings.LDKHTLCHandlingFailureReason.Local)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The forwarded HTLC was failed back by the downstream node with an encrypted error reason.
	 */
	public final static class Downstream extends HTLCHandlingFailureReason {
		private Downstream(long ptr, bindings.LDKHTLCHandlingFailureReason.Downstream obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed locally by our node.
	 */
	public final static class Local extends HTLCHandlingFailureReason {
		/**
		 * The reason that our node chose to fail the HTLC.
		*/
		public final org.ldk.structs.LocalHTLCFailureReason reason;
		private Local(long ptr, bindings.LDKHTLCHandlingFailureReason.Local obj) {
			super(null, ptr);
			long reason = obj.reason;
			org.ldk.structs.LocalHTLCFailureReason reason_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.add(this); };
			this.reason = reason_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.HTLCHandlingFailureReason_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureReason
	 */
	public HTLCHandlingFailureReason clone() {
		long ret = bindings.HTLCHandlingFailureReason_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Downstream-variant HTLCHandlingFailureReason
	 */
	public static HTLCHandlingFailureReason downstream() {
		long ret = bindings.HTLCHandlingFailureReason_downstream();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Local-variant HTLCHandlingFailureReason
	 */
	public static HTLCHandlingFailureReason local(org.ldk.structs.LocalHTLCFailureReason reason) {
		long ret = bindings.HTLCHandlingFailureReason_local(reason.ptr);
		Reference.reachabilityFence(reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.HTLCHandlingFailureReason b) {
		boolean ret = bindings.HTLCHandlingFailureReason_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof HTLCHandlingFailureReason)) return false;
		return this.eq((HTLCHandlingFailureReason)o);
	}
	/**
	 * Serialize the HTLCHandlingFailureReason object into a byte array which can be read by HTLCHandlingFailureReason_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HTLCHandlingFailureReason_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a HTLCHandlingFailureReason from a byte array, created by HTLCHandlingFailureReason_write
	 */
	public static Result_HTLCHandlingFailureReasonDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HTLCHandlingFailureReason_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCHandlingFailureReasonDecodeErrorZ ret_hu_conv = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a HTLCHandlingFailureReason from a LocalHTLCFailureReason
	 */
	public static HTLCHandlingFailureReason from_LocalHTLCFailureReason(org.ldk.structs.LocalHTLCFailureReason f) {
		long ret = bindings.HTLCHandlingFailureReason_from_LocalHTLCFailureReason(f.ptr);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

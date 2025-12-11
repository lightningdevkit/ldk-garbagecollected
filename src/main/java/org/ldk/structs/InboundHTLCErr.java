package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Invalid inbound onion payment.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InboundHTLCErr extends CommonBase {
	InboundHTLCErr(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.InboundHTLCErr_free(ptr); }
	}

	/**
	 * BOLT 4 error code.
	 */
	public LocalHTLCFailureReason get_reason() {
		long ret = bindings.InboundHTLCErr_get_reason(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * BOLT 4 error code.
	 */
	public void set_reason(org.ldk.structs.LocalHTLCFailureReason val) {
		bindings.InboundHTLCErr_set_reason(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Data attached to this error.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_err_data() {
		byte[] ret = bindings.InboundHTLCErr_get_err_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Data attached to this error.
	 */
	public void set_err_data(byte[] val) {
		bindings.InboundHTLCErr_set_err_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Error message text.
	 */
	public String get_msg() {
		String ret = bindings.InboundHTLCErr_get_msg(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Error message text.
	 */
	public void set_msg(java.lang.String val) {
		bindings.InboundHTLCErr_set_msg(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new InboundHTLCErr given each field
	 */
	public static InboundHTLCErr of(org.ldk.structs.LocalHTLCFailureReason reason_arg, byte[] err_data_arg, java.lang.String msg_arg) {
		long ret = bindings.InboundHTLCErr_new(reason_arg.ptr, err_data_arg, msg_arg);
		Reference.reachabilityFence(reason_arg);
		Reference.reachabilityFence(err_data_arg);
		Reference.reachabilityFence(msg_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InboundHTLCErr ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InboundHTLCErr(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.InboundHTLCErr_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InboundHTLCErr
	 */
	public InboundHTLCErr clone() {
		long ret = bindings.InboundHTLCErr_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InboundHTLCErr ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InboundHTLCErr(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the InboundHTLCErr.
	 */
	public long hash() {
		long ret = bindings.InboundHTLCErr_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two InboundHTLCErrs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.InboundHTLCErr b) {
		boolean ret = bindings.InboundHTLCErr_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof InboundHTLCErr)) return false;
		return this.eq((InboundHTLCErr)o);
	}
}

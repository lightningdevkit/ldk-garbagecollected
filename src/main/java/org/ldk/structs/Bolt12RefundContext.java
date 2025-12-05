package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The context of a payment made for an invoice sent for a BOLT 12 [`Refund`].
 * 
 * [`Refund`]: crate::offers::refund::Refund
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt12RefundContext extends CommonBase {
	Bolt12RefundContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt12RefundContext_free(ptr); }
	}

	/**
	 * Constructs a new Bolt12RefundContext given each field
	 */
	public static Bolt12RefundContext of() {
		long ret = bindings.Bolt12RefundContext_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12RefundContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Bolt12RefundContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12RefundContext
	 */
	public Bolt12RefundContext clone() {
		long ret = bindings.Bolt12RefundContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12RefundContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12RefundContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Bolt12RefundContext b) {
		boolean ret = bindings.Bolt12RefundContext_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt12RefundContext)) return false;
		return this.eq((Bolt12RefundContext)o);
	}
	/**
	 * Serialize the Bolt12RefundContext object into a byte array which can be read by Bolt12RefundContext_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Bolt12RefundContext_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Bolt12RefundContext from a byte array, created by Bolt12RefundContext_write
	 */
	public static Result_Bolt12RefundContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt12RefundContext_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt12RefundContextDecodeErrorZ ret_hu_conv = Result_Bolt12RefundContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

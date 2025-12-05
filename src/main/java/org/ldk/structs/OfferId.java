package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An identifier for an [`Offer`] built using [`DerivedMetadata`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OfferId extends CommonBase {
	OfferId(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OfferId_free(ptr); }
	}

	public byte[] get_a() {
		byte[] ret = bindings.OfferId_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	public void set_a(byte[] val) {
		bindings.OfferId_set_a(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OfferId given each field
	 */
	public static OfferId of(byte[] a_arg) {
		long ret = bindings.OfferId_new(InternalUtils.check_arr_len(a_arg, 32));
		Reference.reachabilityFence(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OfferId_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferId
	 */
	public OfferId clone() {
		long ret = bindings.OfferId_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two OfferIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.OfferId b) {
		boolean ret = bindings.OfferId_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof OfferId)) return false;
		return this.eq((OfferId)o);
	}
	/**
	 * Serialize the OfferId object into a byte array which can be read by OfferId_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OfferId_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OfferId from a byte array, created by OfferId_write
	 */
	public static Result_OfferIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferId_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferIdDecodeErrorZ ret_hu_conv = Result_OfferIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

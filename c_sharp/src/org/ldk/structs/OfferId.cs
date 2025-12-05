using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An identifier for an [`Offer`] built using [`DerivedMetadata`].
 */
public class OfferId : CommonBase {
	internal OfferId(object _dummy, long ptr) : base(ptr) { }
	~OfferId() {
		if (ptr != 0) { bindings.OfferId_free(ptr); }
	}

	public byte[] get_a() {
		long ret = bindings.OfferId_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	public void set_a(byte[] val) {
		bindings.OfferId_set_a(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new OfferId given each field
	 */
	public static org.ldk.structs.OfferId of(byte[] a_arg) {
		long ret = bindings.OfferId_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a_arg, 32)));
		GC.KeepAlive(a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OfferId_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferId
	 */
	public org.ldk.structs.OfferId clone() {
		long ret = bindings.OfferId_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two OfferIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.OfferId b) {
		bool ret = bindings.OfferId_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is OfferId)) return false;
		return this.eq((OfferId)o);
	}
	/**
	 * Serialize the OfferId object into a byte array which can be read by OfferId_read
	 */
	public byte[] write() {
		long ret = bindings.OfferId_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferId from a byte array, created by OfferId_write
	 */
	public static org.ldk.structs.Result_OfferIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferId_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferIdDecodeErrorZ ret_hu_conv = Result_OfferIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

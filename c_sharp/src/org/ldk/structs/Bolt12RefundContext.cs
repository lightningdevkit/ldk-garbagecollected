using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The context of a payment made for an invoice sent for a BOLT 12 [`Refund`].
 * 
 * [`Refund`]: crate::offers::refund::Refund
 */
public class Bolt12RefundContext : CommonBase {
	internal Bolt12RefundContext(object _dummy, long ptr) : base(ptr) { }
	~Bolt12RefundContext() {
		if (ptr != 0) { bindings.Bolt12RefundContext_free(ptr); }
	}

	/**
	 * Constructs a new Bolt12RefundContext given each field
	 */
	public static org.ldk.structs.Bolt12RefundContext of() {
		long ret = bindings.Bolt12RefundContext_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12RefundContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Bolt12RefundContext_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12RefundContext
	 */
	public org.ldk.structs.Bolt12RefundContext clone() {
		long ret = bindings.Bolt12RefundContext_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12RefundContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt12RefundContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12RefundContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Bolt12RefundContext b) {
		bool ret = bindings.Bolt12RefundContext_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Bolt12RefundContext)) return false;
		return this.eq((Bolt12RefundContext)o);
	}
	/**
	 * Serialize the Bolt12RefundContext object into a byte array which can be read by Bolt12RefundContext_read
	 */
	public byte[] write() {
		long ret = bindings.Bolt12RefundContext_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt12RefundContext from a byte array, created by Bolt12RefundContext_write
	 */
	public static org.ldk.structs.Result_Bolt12RefundContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Bolt12RefundContext_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt12RefundContextDecodeErrorZ ret_hu_conv = Result_Bolt12RefundContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

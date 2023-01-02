using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Features used within an `invoice_request`.
 */
public class InvoiceRequestFeatures : CommonBase {
	internal InvoiceRequestFeatures(object _dummy, long ptr) : base(ptr) { }
	~InvoiceRequestFeatures() {
		if (ptr != 0) { bindings.InvoiceRequestFeatures_free(ptr); }
	}

	/**
	 * Checks if two InvoiceRequestFeaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.InvoiceRequestFeatures b) {
		bool ret = bindings.InvoiceRequestFeatures_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is InvoiceRequestFeatures)) return false;
		return this.eq((InvoiceRequestFeatures)o);
	}
	internal long clone_ptr() {
		long ret = bindings.InvoiceRequestFeatures_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceRequestFeatures
	 */
	public InvoiceRequestFeatures clone() {
		long ret = bindings.InvoiceRequestFeatures_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static InvoiceRequestFeatures empty() {
		long ret = bindings.InvoiceRequestFeatures_empty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public bool requires_unknown_bits() {
		bool ret = bindings.InvoiceRequestFeatures_requires_unknown_bits(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the InvoiceRequestFeatures object into a byte array which can be read by InvoiceRequestFeatures_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceRequestFeatures_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a InvoiceRequestFeatures from a byte array, created by InvoiceRequestFeatures_write
	 */
	public static Result_InvoiceRequestFeaturesDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceRequestFeatures_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceRequestFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceRequestFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

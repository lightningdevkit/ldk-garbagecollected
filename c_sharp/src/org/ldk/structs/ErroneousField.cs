using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
public class ErroneousField : CommonBase {
	internal ErroneousField(object _dummy, long ptr) : base(ptr) { }
	~ErroneousField() {
		if (ptr != 0) { bindings.ErroneousField_free(ptr); }
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public long get_tlv_fieldnum() {
		long ret = bindings.ErroneousField_get_tlv_fieldnum(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public void set_tlv_fieldnum(long val) {
		bindings.ErroneousField_set_tlv_fieldnum(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_u8ZZ get_suggested_value() {
		long ret = bindings.ErroneousField_get_suggested_value(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 */
	public void set_suggested_value(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.ErroneousField_set_suggested_value(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ErroneousField given each field
	 */
	public static ErroneousField of(long tlv_fieldnum_arg, org.ldk.structs.Option_CVec_u8ZZ suggested_value_arg) {
		long ret = bindings.ErroneousField_new(tlv_fieldnum_arg, suggested_value_arg.ptr);
		GC.KeepAlive(tlv_fieldnum_arg);
		GC.KeepAlive(suggested_value_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(suggested_value_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ErroneousField_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ErroneousField
	 */
	public ErroneousField clone() {
		long ret = bindings.ErroneousField_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

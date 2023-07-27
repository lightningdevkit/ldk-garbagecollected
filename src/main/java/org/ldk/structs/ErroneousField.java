package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErroneousField extends CommonBase {
	ErroneousField(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ErroneousField_free(ptr); }
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public long get_tlv_fieldnum() {
		long ret = bindings.ErroneousField_get_tlv_fieldnum(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public void set_tlv_fieldnum(long val) {
		bindings.ErroneousField_set_tlv_fieldnum(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 * 
	 * Returns a copy of the field.
	 */
	public Option_CVec_u8ZZ get_suggested_value() {
		long ret = bindings.ErroneousField_get_suggested_value(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 */
	public void set_suggested_value(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.ErroneousField_set_suggested_value(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ErroneousField given each field
	 */
	public static ErroneousField of(long tlv_fieldnum_arg, org.ldk.structs.Option_CVec_u8ZZ suggested_value_arg) {
		long ret = bindings.ErroneousField_new(tlv_fieldnum_arg, suggested_value_arg.ptr);
		Reference.reachabilityFence(tlv_fieldnum_arg);
		Reference.reachabilityFence(suggested_value_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(suggested_value_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ErroneousField_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ErroneousField
	 */
	public ErroneousField clone() {
		long ret = bindings.ErroneousField_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

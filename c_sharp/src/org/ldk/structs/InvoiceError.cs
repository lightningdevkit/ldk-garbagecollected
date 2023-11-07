using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An error in response to an [`InvoiceRequest`] or an [`Bolt12Invoice`].
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
public class InvoiceError : CommonBase {
	internal InvoiceError(object _dummy, long ptr) : base(ptr) { }
	~InvoiceError() {
		if (ptr != 0) { bindings.InvoiceError_free(ptr); }
	}

	/**
	 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ErroneousField get_erroneous_field() {
		long ret = bindings.InvoiceError_get_erroneous_field(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_erroneous_field(org.ldk.structs.ErroneousField val) {
		bindings.InvoiceError_set_erroneous_field(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * An explanation of the error.
	 */
	public UntrustedString get_message() {
		long ret = bindings.InvoiceError_get_message(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * An explanation of the error.
	 */
	public void set_message(org.ldk.structs.UntrustedString val) {
		bindings.InvoiceError_set_message(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new InvoiceError given each field
	 * 
	 * Note that erroneous_field_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static InvoiceError of(org.ldk.structs.ErroneousField erroneous_field_arg, org.ldk.structs.UntrustedString message_arg) {
		long ret = bindings.InvoiceError_new(erroneous_field_arg == null ? 0 : erroneous_field_arg.ptr, message_arg == null ? 0 : message_arg.ptr);
		GC.KeepAlive(erroneous_field_arg);
		GC.KeepAlive(message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(erroneous_field_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(message_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.InvoiceError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceError
	 */
	public InvoiceError clone() {
		long ret = bindings.InvoiceError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceError`] with the given message.
	 */
	public static InvoiceError from_string(string s) {
		long ret = bindings.InvoiceError_from_string(InternalUtils.encodeString(s));
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InvoiceError object into a byte array which can be read by InvoiceError_read
	 */
	public byte[] write() {
		long ret = bindings.InvoiceError_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InvoiceError from a byte array, created by InvoiceError_write
	 */
	public static Result_InvoiceErrorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceError_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceErrorDecodeErrorZ ret_hu_conv = Result_InvoiceErrorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

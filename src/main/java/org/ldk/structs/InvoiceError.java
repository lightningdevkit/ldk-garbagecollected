package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error in response to an [`InvoiceRequest`] or an [`Bolt12Invoice`].
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class InvoiceError extends CommonBase {
	InvoiceError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
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
	@Nullable
	public ErroneousField get_erroneous_field() {
		long ret = bindings.InvoiceError_get_erroneous_field(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErroneousField ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ErroneousField(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_erroneous_field(@Nullable org.ldk.structs.ErroneousField val) {
		bindings.InvoiceError_set_erroneous_field(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * An explanation of the error.
	 */
	public UntrustedString get_message() {
		long ret = bindings.InvoiceError_get_message(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * An explanation of the error.
	 */
	public void set_message(org.ldk.structs.UntrustedString val) {
		bindings.InvoiceError_set_message(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new InvoiceError given each field
	 * 
	 * Note that erroneous_field_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static InvoiceError of(@Nullable org.ldk.structs.ErroneousField erroneous_field_arg, org.ldk.structs.UntrustedString message_arg) {
		long ret = bindings.InvoiceError_new(erroneous_field_arg == null ? 0 : erroneous_field_arg.ptr, message_arg == null ? 0 : message_arg.ptr);
		Reference.reachabilityFence(erroneous_field_arg);
		Reference.reachabilityFence(message_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(erroneous_field_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(message_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.InvoiceError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceError
	 */
	public InvoiceError clone() {
		long ret = bindings.InvoiceError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the InvoiceError object into a byte array which can be read by InvoiceError_read
	 */
	public byte[] write() {
		byte[] ret = bindings.InvoiceError_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a InvoiceError from a byte array, created by InvoiceError_write
	 */
	public static Result_InvoiceErrorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceError_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceErrorDecodeErrorZ ret_hu_conv = Result_InvoiceErrorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

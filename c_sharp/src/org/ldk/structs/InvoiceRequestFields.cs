using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Fields sent in an [`InvoiceRequest`] message to include in [`PaymentContext::Bolt12Offer`].
 * 
 * [`PaymentContext::Bolt12Offer`]: crate::blinded_path::payment::PaymentContext::Bolt12Offer
 */
public class InvoiceRequestFields : CommonBase {
	internal InvoiceRequestFields(object _dummy, long ptr) : base(ptr) { }
	~InvoiceRequestFields() {
		if (ptr != 0) { bindings.InvoiceRequestFields_free(ptr); }
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public byte[] get_payer_signing_pubkey() {
		long ret = bindings.InvoiceRequestFields_get_payer_signing_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public void set_payer_signing_pubkey(byte[] val) {
		bindings.InvoiceRequestFields_set_payer_signing_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public org.ldk.structs.Option_u64Z get_quantity() {
		long ret = bindings.InvoiceRequestFields_get_quantity(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public void set_quantity(org.ldk.structs.Option_u64Z val) {
		bindings.InvoiceRequestFields_set_quantity(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response. Truncated to [`PAYER_NOTE_LIMIT`] characters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.UntrustedString get_payer_note_truncated() {
		long ret = bindings.InvoiceRequestFields_get_payer_note_truncated(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UntrustedString ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UntrustedString(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response. Truncated to [`PAYER_NOTE_LIMIT`] characters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_payer_note_truncated(org.ldk.structs.UntrustedString val) {
		bindings.InvoiceRequestFields_set_payer_note_truncated(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The Human Readable Name which the sender indicated they were paying to.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.HumanReadableName get_human_readable_name() {
		long ret = bindings.InvoiceRequestFields_get_human_readable_name(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The Human Readable Name which the sender indicated they were paying to.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_human_readable_name(org.ldk.structs.HumanReadableName val) {
		bindings.InvoiceRequestFields_set_human_readable_name(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new InvoiceRequestFields given each field
	 * 
	 * Note that payer_note_truncated_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that human_readable_name_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.InvoiceRequestFields of(byte[] payer_signing_pubkey_arg, org.ldk.structs.Option_u64Z quantity_arg, org.ldk.structs.UntrustedString payer_note_truncated_arg, org.ldk.structs.HumanReadableName human_readable_name_arg) {
		long ret = bindings.InvoiceRequestFields_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payer_signing_pubkey_arg, 33)), quantity_arg.ptr, payer_note_truncated_arg == null ? 0 : payer_note_truncated_arg.ptr, human_readable_name_arg == null ? 0 : human_readable_name_arg.ptr);
		GC.KeepAlive(payer_signing_pubkey_arg);
		GC.KeepAlive(quantity_arg);
		GC.KeepAlive(payer_note_truncated_arg);
		GC.KeepAlive(human_readable_name_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.InvoiceRequestFields_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceRequestFields
	 */
	public org.ldk.structs.InvoiceRequestFields clone() {
		long ret = bindings.InvoiceRequestFields_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceRequestFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceRequestFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two InvoiceRequestFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.InvoiceRequestFields b) {
		bool ret = bindings.InvoiceRequestFields_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is InvoiceRequestFields)) return false;
		return this.eq((InvoiceRequestFields)o);
	}
	/**
	 * Serialize the InvoiceRequestFields object into a byte array which can be read by InvoiceRequestFields_read
	 */
	public byte[] write() {
		long ret = bindings.InvoiceRequestFields_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InvoiceRequestFields from a byte array, created by InvoiceRequestFields_write
	 */
	public static org.ldk.structs.Result_InvoiceRequestFieldsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.InvoiceRequestFields_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceRequestFieldsDecodeErrorZ ret_hu_conv = Result_InvoiceRequestFieldsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

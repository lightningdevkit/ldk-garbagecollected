using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Represents a signed `RawInvoice` with cached hash. The signature is not checked and may be
 * invalid.
 * 
 * # Invariants
 * The hash has to be either from the deserialized invoice or from the serialized `raw_invoice`.
 */
public class SignedRawInvoice : CommonBase {
	internal SignedRawInvoice(object _dummy, long ptr) : base(ptr) { }
	~SignedRawInvoice() {
		if (ptr != 0) { bindings.SignedRawInvoice_free(ptr); }
	}

	/**
	 * Checks if two SignedRawInvoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.SignedRawInvoice b) {
		bool ret = bindings.SignedRawInvoice_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SignedRawInvoice)) return false;
		return this.eq((SignedRawInvoice)o);
	}
	internal long clone_ptr() {
		long ret = bindings.SignedRawInvoice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SignedRawInvoice
	 */
	public SignedRawInvoice clone() {
		long ret = bindings.SignedRawInvoice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignedRawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SignedRawInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SignedRawInvoices contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.SignedRawInvoice_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Disassembles the `SignedRawInvoice` into its three parts:
	 * 1. raw invoice
	 * 2. hash of the raw invoice
	 * 3. signature
	 */
	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ into_parts() {
		long ret = bindings.SignedRawInvoice_into_parts(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The `RawInvoice` which was signed.
	 */
	public RawInvoice raw_invoice() {
		long ret = bindings.SignedRawInvoice_raw_invoice(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The hash of the `RawInvoice` that was signed.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.SignedRawInvoice_signable_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * InvoiceSignature for the invoice.
	 */
	public InvoiceSignature signature() {
		long ret = bindings.SignedRawInvoice_signature(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Recovers the public key used for signing the invoice from the recoverable signature.
	 */
	public Result_PayeePubKeyErrorZ recover_payee_pub_key() {
		long ret = bindings.SignedRawInvoice_recover_payee_pub_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the signature is valid for the included payee public key or if none exists if it's
	 * valid for the recovered signature (which should always be true?).
	 */
	public bool check_signature() {
		bool ret = bindings.SignedRawInvoice_check_signature(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a SignedRawInvoice object from a string
	 */
	public static Result_SignedRawInvoiceParseErrorZ from_str(string s) {
		long ret = bindings.SignedRawInvoice_from_str(s);
		GC.KeepAlive(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SignedRawInvoice object
	 */
	public string to_str() {
		string ret = bindings.SignedRawInvoice_to_str(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents a signed `RawInvoice` with cached hash. The signature is not checked and may be
 * invalid.
 * 
 * # Invariants
 * The hash has to be either from the deserialized invoice or from the serialized `raw_invoice`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignedRawInvoice extends CommonBase {
	SignedRawInvoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SignedRawInvoice_free(ptr); }
	}

	/**
	 * Checks if two SignedRawInvoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(SignedRawInvoice b) {
		boolean ret = bindings.SignedRawInvoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SignedRawInvoice)) return false;
		return this.eq((SignedRawInvoice)o);
	}
	long clone_ptr() {
		long ret = bindings.SignedRawInvoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SignedRawInvoice
	 */
	public SignedRawInvoice clone() {
		long ret = bindings.SignedRawInvoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignedRawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new SignedRawInvoice(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Disassembles the `SignedRawInvoice` into its three parts:
	 * 1. raw invoice
	 * 2. hash of the raw invoice
	 * 3. signature
	 */
	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ into_parts() {
		long ret = bindings.SignedRawInvoice_into_parts(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		;
		return ret_hu_conv;
	}

	/**
	 * The `RawInvoice` which was signed.
	 */
	public RawInvoice raw_invoice() {
		long ret = bindings.SignedRawInvoice_raw_invoice(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RawInvoice(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The hash of the `RawInvoice` that was signed.
	 */
	public byte[] hash() {
		byte[] ret = bindings.SignedRawInvoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * InvoiceSignature for the invoice.
	 */
	public InvoiceSignature signature() {
		long ret = bindings.SignedRawInvoice_signature(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceSignature(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Recovers the public key used for signing the invoice from the recoverable signature.
	 */
	public Result_PayeePubKeyErrorZ recover_payee_pub_key() {
		long ret = bindings.SignedRawInvoice_recover_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the signature is valid for the included payee public key or if none exists if it's
	 * valid for the recovered signature (which should always be true?).
	 */
	public boolean check_signature() {
		boolean ret = bindings.SignedRawInvoice_check_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SignedRawInvoice object from a string
	 */
	public static Result_SignedRawInvoiceNoneZ from_str(java.lang.String s) {
		long ret = bindings.SignedRawInvoice_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SignedRawInvoice object
	 */
	public String to_str() {
		String ret = bindings.SignedRawInvoice_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

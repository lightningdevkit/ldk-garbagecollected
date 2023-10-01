package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents a signed [`RawBolt11Invoice`] with cached hash. The signature is not checked and may be
 * invalid.
 * 
 * # Invariants
 * The hash has to be either from the deserialized invoice or from the serialized [`RawBolt11Invoice`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignedRawBolt11Invoice extends CommonBase {
	SignedRawBolt11Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SignedRawBolt11Invoice_free(ptr); }
	}

	/**
	 * Checks if two SignedRawBolt11Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.SignedRawBolt11Invoice b) {
		boolean ret = bindings.SignedRawBolt11Invoice_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SignedRawBolt11Invoice)) return false;
		return this.eq((SignedRawBolt11Invoice)o);
	}
	long clone_ptr() {
		long ret = bindings.SignedRawBolt11Invoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SignedRawBolt11Invoice
	 */
	public SignedRawBolt11Invoice clone() {
		long ret = bindings.SignedRawBolt11Invoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignedRawBolt11Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SignedRawBolt11Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the SignedRawBolt11Invoice.
	 */
	public long hash() {
		long ret = bindings.SignedRawBolt11Invoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Disassembles the `SignedRawBolt11Invoice` into its three parts:
	 * 1. raw invoice
	 * 2. hash of the raw invoice
	 * 3. signature
	 */
	public ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ into_parts() {
		long ret = bindings.SignedRawBolt11Invoice_into_parts(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The [`RawBolt11Invoice`] which was signed.
	 */
	public RawBolt11Invoice raw_invoice() {
		long ret = bindings.SignedRawBolt11Invoice_raw_invoice(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawBolt11Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawBolt11Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The hash of the [`RawBolt11Invoice`] that was signed.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.SignedRawBolt11Invoice_signable_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Signature for the invoice.
	 */
	public Bolt11InvoiceSignature signature() {
		long ret = bindings.SignedRawBolt11Invoice_signature(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Recovers the public key used for signing the invoice from the recoverable signature.
	 */
	public Result_PayeePubKeySecp256k1ErrorZ recover_payee_pub_key() {
		long ret = bindings.SignedRawBolt11Invoice_recover_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the signature is valid for the included payee public key or if none exists if it's
	 * valid for the recovered signature (which should always be true?).
	 */
	public boolean check_signature() {
		boolean ret = bindings.SignedRawBolt11Invoice_check_signature(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a SignedRawBolt11Invoice object from a string
	 */
	public static Result_SignedRawBolt11InvoiceBolt11ParseErrorZ from_str(java.lang.String s) {
		long ret = bindings.SignedRawBolt11Invoice_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawBolt11InvoiceBolt11ParseErrorZ ret_hu_conv = Result_SignedRawBolt11InvoiceBolt11ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a SignedRawBolt11Invoice object
	 */
	public String to_str() {
		String ret = bindings.SignedRawBolt11Invoice_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

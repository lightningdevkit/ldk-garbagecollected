package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Represents a syntactically and semantically correct lightning BOLT11 invoice.
 * 
 * There are three ways to construct an `Invoice`:
 * 1. using `InvoiceBuilder`
 * 2. using `Invoice::from_signed(SignedRawInvoice)`
 * 3. using `str::parse::<Invoice>(&str)`
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Invoice extends CommonBase {
	Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Invoice_free(ptr); }
	}

	/**
	 * Checks if two Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(Invoice b) {
		boolean ret = bindings.Invoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the Invoice
	 */
	public Invoice clone() {
		long ret = bindings.Invoice_clone(this.ptr);
		if (ret < 1024) { return null; }
		Invoice ret_hu_conv = new Invoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Transform the `Invoice` into it's unchecked version
	 */
	public SignedRawInvoice into_signed_raw() {
		long ret = bindings.Invoice_into_signed_raw(this.ptr);
		if (ret < 1024) { return null; }
		SignedRawInvoice ret_hu_conv = new SignedRawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Check that the invoice is signed correctly and that key recovery works
	 */
	public Result_NoneSemanticErrorZ check_signature() {
		long ret = bindings.Invoice_check_signature(this.ptr);
		if (ret < 1024) { return null; }
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs an `Invoice` from a `SignedRawInvoice` by checking all its invariants.
	 * ```
	 * use lightning_invoice::*;
	 * 
	 * let invoice = \"lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdp\\
	 * \tl2pkx2ctnv5sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d7\\
	 * \t3gafnh3cax9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ec\\
	 * \tky03ylcqca784w\";
	 * 
	 * let signed = invoice.parse::<SignedRawInvoice>().unwrap();
	 * 
	 * assert!(Invoice::from_signed(signed).is_ok());
	 * ```
	 */
	public static Result_InvoiceSemanticErrorZ from_signed(SignedRawInvoice signed_invoice) {
		long ret = bindings.Invoice_from_signed(signed_invoice == null ? 0 : signed_invoice.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(signed_invoice);
		return ret_hu_conv;
	}

	/**
	 * Returns the `Invoice`'s timestamp (should equal it's creation time)
	 */
	public long timestamp() {
		long ret = bindings.Invoice_timestamp(this.ptr);
		return ret;
	}

	/**
	 * Returns the hash to which we will receive the preimage on completion of the payment
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.Invoice_payment_hash(this.ptr);
		return ret;
	}

	/**
	 * Get the payee's public key if one was included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] payee_pub_key() {
		byte[] ret = bindings.Invoice_payee_pub_key(this.ptr);
		return ret;
	}

	/**
	 * Get the payment secret if one was included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] payment_secret() {
		byte[] ret = bindings.Invoice_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Get the invoice features if they were included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public InvoiceFeatures features() {
		long ret = bindings.Invoice_features(this.ptr);
		if (ret < 1024) { return null; }
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Recover the payee's public key (only to be used if none was included in the invoice)
	 */
	public byte[] recover_payee_pub_key() {
		byte[] ret = bindings.Invoice_recover_payee_pub_key(this.ptr);
		return ret;
	}

	/**
	 * Returns the invoice's expiry time, if present, otherwise [`DEFAULT_EXPIRY_TIME`].
	 */
	public long expiry_time() {
		long ret = bindings.Invoice_expiry_time(this.ptr);
		return ret;
	}

	/**
	 * Returns the invoice's `min_final_cltv_expiry` time, if present, otherwise
	 * [`DEFAULT_MIN_FINAL_CLTV_EXPIRY`].
	 */
	public long min_final_cltv_expiry() {
		long ret = bindings.Invoice_min_final_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * Returns a list of all routes included in the invoice
	 */
	public PrivateRoute[] private_routes() {
		long[] ret = bindings.Invoice_private_routes(this.ptr);
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long ret_conv_14 = ret[o];
			PrivateRoute ret_conv_14_hu_conv = new PrivateRoute(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	/**
	 * Returns a list of all routes included in the invoice as the underlying hints
	 */
	public RouteHint[] route_hints() {
		long[] ret = bindings.Invoice_route_hints(this.ptr);
		RouteHint[] ret_conv_11_arr = new RouteHint[ret.length];
		for (int l = 0; l < ret.length; l++) {
			long ret_conv_11 = ret[l];
			RouteHint ret_conv_11_hu_conv = new RouteHint(null, ret_conv_11);
			ret_conv_11_hu_conv.ptrs_to.add(this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		return ret_conv_11_arr;
	}

	/**
	 * Returns the currency for which the invoice was issued
	 */
	public Currency currency() {
		Currency ret = bindings.Invoice_currency(this.ptr);
		return ret;
	}

	/**
	 * Returns the amount if specified in the invoice as pico <currency>.
	 */
	public Option_u64Z amount_pico_btc() {
		long ret = bindings.Invoice_amount_pico_btc(this.ptr);
		if (ret < 1024) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Read a Invoice object from a string
	 */
	public static Result_InvoiceNoneZ from_str(java.lang.String s) {
		long ret = bindings.Invoice_from_str(s);
		if (ret < 1024) { return null; }
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Invoice object
	 */
	public String to_str() {
		String ret = bindings.Invoice_to_str(this.ptr);
		return ret;
	}

}

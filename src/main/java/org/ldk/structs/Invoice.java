package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Invoice)) return false;
		return this.eq((Invoice)o);
	}
	long clone_ptr() {
		long ret = bindings.Invoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Invoice
	 */
	public Invoice clone() {
		long ret = bindings.Invoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Invoice(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Transform the `Invoice` into it's unchecked version
	 */
	public SignedRawInvoice into_signed_raw() {
		long ret = bindings.Invoice_into_signed_raw(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignedRawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new SignedRawInvoice(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		;
		return ret_hu_conv;
	}

	/**
	 * Check that the invoice is signed correctly and that key recovery works
	 */
	public Result_NoneSemanticErrorZ check_signature() {
		long ret = bindings.Invoice_check_signature(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs an `Invoice` from a `SignedRawInvoice` by checking all its invariants.
	 * ```
	 * use lightning_invoice::*;
	 * 
	 * let invoice = \"lnbc100p1psj9jhxdqud3jxktt5w46x7unfv9kz6mn0v3jsnp4q0d3p2sfluzdx45tqcs\\
	 * h2pu5qc7lgq0xs578ngs6s0s68ua4h7cvspp5q6rmq35js88zp5dvwrv9m459tnk2zunwj5jalqtyxqulh0l\\
	 * 5gflssp5nf55ny5gcrfl30xuhzj3nphgj27rstekmr9fw3ny5989s300gyus9qyysgqcqpcrzjqw2sxwe993\\
	 * h5pcm4dxzpvttgza8zhkqxpgffcrf5v25nwpr3cmfg7z54kuqq8rgqqqqqqqq2qqqqq9qq9qrzjqd0ylaqcl\\
	 * j9424x9m8h2vcukcgnm6s56xfgu3j78zyqzhgs4hlpzvznlugqq9vsqqqqqqqlgqqqqqeqq9qrzjqwldmj9d\\
	 * ha74df76zhx6l9we0vjdquygcdt3kssupehe64g6yyp5yz5rhuqqwccqqyqqqqlgqqqqjcqq9qrzjqf9e58a\\
	 * guqr0rcun0ajlvmzq3ek63cw2w282gv3z5uupmuwvgjtq2z55qsqqg6qqqyqqqrtnqqqzq3cqygrzjqvphms\\
	 * ywntrrhqjcraumvc4y6r8v4z5v593trte429v4hredj7ms5z52usqq9ngqqqqqqqlgqqqqqqgq9qrzjq2v0v\\
	 * p62g49p7569ev48cmulecsxe59lvaw3wlxm7r982zxa9zzj7z5l0cqqxusqqyqqqqlgqqqqqzsqygarl9fh3\\
	 * 8s0gyuxjjgux34w75dnc6xp2l35j7es3jd4ugt3lu0xzre26yg5m7ke54n2d5sym4xcmxtl8238xxvw5h5h5\\
	 * j5r6drg6k6zcqj0fcwg\";
	 * 
	 * let signed = invoice.parse::<SignedRawInvoice>().unwrap();
	 * 
	 * assert!(Invoice::from_signed(signed).is_ok());
	 * ```
	 */
	public static Result_InvoiceSemanticErrorZ from_signed(SignedRawInvoice signed_invoice) {
		long ret = bindings.Invoice_from_signed(signed_invoice == null ? 0 : signed_invoice.ptr & ~1);
		Reference.reachabilityFence(signed_invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the `Invoice`'s timestamp (should equal its creation time)
	 */
	public long timestamp() {
		long ret = bindings.Invoice_timestamp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the `Invoice`'s timestamp as a duration since the Unix epoch
	 */
	public long duration_since_epoch() {
		long ret = bindings.Invoice_duration_since_epoch(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the hash to which we will receive the preimage on completion of the payment
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.Invoice_payment_hash(this.ptr);
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the payment secret if one was included in the invoice
	 */
	public byte[] payment_secret() {
		byte[] ret = bindings.Invoice_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Recover the payee's public key (only to be used if none was included in the invoice)
	 */
	public byte[] recover_payee_pub_key() {
		byte[] ret = bindings.Invoice_recover_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the invoice's expiry time, if present, otherwise [`DEFAULT_EXPIRY_TIME`].
	 */
	public long expiry_time() {
		long ret = bindings.Invoice_expiry_time(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns whether the invoice has expired.
	 */
	public boolean is_expired() {
		boolean ret = bindings.Invoice_is_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns whether the expiry time would pass at the given point in time.
	 * `at_time` is the timestamp as a duration since the Unix epoch.
	 */
	public boolean would_expire(long at_time) {
		boolean ret = bindings.Invoice_would_expire(this.ptr, at_time);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(at_time);
		return ret;
	}

	/**
	 * Returns the invoice's `min_final_cltv_expiry` time, if present, otherwise
	 * [`DEFAULT_MIN_FINAL_CLTV_EXPIRY`].
	 */
	public long min_final_cltv_expiry() {
		long ret = bindings.Invoice_min_final_cltv_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns a list of all routes included in the invoice
	 */
	public PrivateRoute[] private_routes() {
		long[] ret = bindings.Invoice_private_routes(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_14_len = ret.length;
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = ret[o];
			PrivateRoute ret_conv_14_hu_conv = null; if (ret_conv_14 < 0 || ret_conv_14 > 4096) { ret_conv_14_hu_conv = new PrivateRoute(null, ret_conv_14); }
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
		Reference.reachabilityFence(this);
		int ret_conv_11_len = ret.length;
		RouteHint[] ret_conv_11_arr = new RouteHint[ret_conv_11_len];
		for (int l = 0; l < ret_conv_11_len; l++) {
			long ret_conv_11 = ret[l];
			RouteHint ret_conv_11_hu_conv = null; if (ret_conv_11 < 0 || ret_conv_11 > 4096) { ret_conv_11_hu_conv = new RouteHint(null, ret_conv_11); }
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
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the amount if specified in the invoice as millisatoshis.
	 */
	public Option_u64Z amount_milli_satoshis() {
		long ret = bindings.Invoice_amount_milli_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Read a Invoice object from a string
	 */
	public static Result_InvoiceNoneZ from_str(java.lang.String s) {
		long ret = bindings.Invoice_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Invoice object
	 */
	public String to_str() {
		String ret = bindings.Invoice_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

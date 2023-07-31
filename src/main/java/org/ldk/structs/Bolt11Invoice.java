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
 * There are three ways to construct a `Bolt11Invoice`:
 * 1. using [`InvoiceBuilder`]
 * 2. using [`Bolt11Invoice::from_signed`]
 * 3. using `str::parse::<Bolt11Invoice>(&str)` (see [`Bolt11Invoice::from_str`])
 * 
 * [`Bolt11Invoice::from_str`]: crate::Bolt11Invoice#impl-FromStr
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt11Invoice extends CommonBase {
	Bolt11Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt11Invoice_free(ptr); }
	}

	/**
	 * Checks if two Bolt11Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Bolt11Invoice b) {
		boolean ret = bindings.Bolt11Invoice_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt11Invoice)) return false;
		return this.eq((Bolt11Invoice)o);
	}
	long clone_ptr() {
		long ret = bindings.Bolt11Invoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11Invoice
	 */
	public Bolt11Invoice clone() {
		long ret = bindings.Bolt11Invoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11Invoice.
	 */
	public long hash() {
		long ret = bindings.Bolt11Invoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * The hash of the [`RawBolt11Invoice`] that was signed.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.Bolt11Invoice_signable_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Transform the `Bolt11Invoice` into its unchecked version.
	 */
	public SignedRawBolt11Invoice into_signed_raw() {
		long ret = bindings.Bolt11Invoice_into_signed_raw(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignedRawBolt11Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.SignedRawBolt11Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Check that the invoice is signed correctly and that key recovery works
	 */
	public Result_NoneBolt11SemanticErrorZ check_signature() {
		long ret = bindings.Bolt11Invoice_check_signature(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt11SemanticErrorZ ret_hu_conv = Result_NoneBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a `Bolt11Invoice` from a [`SignedRawBolt11Invoice`] by checking all its invariants.
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
	 * let signed = invoice.parse::<SignedRawBolt11Invoice>().unwrap();
	 * 
	 * assert!(Bolt11Invoice::from_signed(signed).is_ok());
	 * ```
	 */
	public static Result_Bolt11InvoiceBolt11SemanticErrorZ from_signed(org.ldk.structs.SignedRawBolt11Invoice signed_invoice) {
		long ret = bindings.Bolt11Invoice_from_signed(signed_invoice == null ? 0 : signed_invoice.ptr);
		Reference.reachabilityFence(signed_invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceBolt11SemanticErrorZ ret_hu_conv = Result_Bolt11InvoiceBolt11SemanticErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(signed_invoice); };
		return ret_hu_conv;
	}

	/**
	 * Returns the `Bolt11Invoice`'s timestamp (should equal its creation time)
	 */
	public long timestamp() {
		long ret = bindings.Bolt11Invoice_timestamp(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the `Bolt11Invoice`'s timestamp as a duration since the Unix epoch
	 */
	public long duration_since_epoch() {
		long ret = bindings.Bolt11Invoice_duration_since_epoch(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the hash to which we will receive the preimage on completion of the payment
	 */
	public byte[] payment_hash() {
		byte[] ret = bindings.Bolt11Invoice_payment_hash(this.ptr);
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
		byte[] ret = bindings.Bolt11Invoice_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the payment secret if one was included in the invoice
	 */
	public byte[] payment_secret() {
		byte[] ret = bindings.Bolt11Invoice_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the payment metadata blob if one was included in the invoice
	 */
	public Option_CVec_u8ZZ payment_metadata() {
		long ret = bindings.Bolt11Invoice_payment_metadata(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Get the invoice features if they were included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Bolt11InvoiceFeatures features() {
		long ret = bindings.Bolt11Invoice_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Recover the payee's public key (only to be used if none was included in the invoice)
	 */
	public byte[] recover_payee_pub_key() {
		byte[] ret = bindings.Bolt11Invoice_recover_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the Duration since the Unix epoch at which the invoice expires.
	 * Returning None if overflow occurred.
	 */
	public Option_DurationZ expires_at() {
		long ret = bindings.Bolt11Invoice_expires_at(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the invoice's expiry time, if present, otherwise [`DEFAULT_EXPIRY_TIME`].
	 */
	public long expiry_time() {
		long ret = bindings.Bolt11Invoice_expiry_time(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns whether the invoice has expired.
	 */
	public boolean is_expired() {
		boolean ret = bindings.Bolt11Invoice_is_expired(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the Duration remaining until the invoice expires.
	 */
	public long duration_until_expiry() {
		long ret = bindings.Bolt11Invoice_duration_until_expiry(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the Duration remaining until the invoice expires given the current time.
	 * `time` is the timestamp as a duration since the Unix epoch.
	 */
	public long expiration_remaining_from_epoch(long time) {
		long ret = bindings.Bolt11Invoice_expiration_remaining_from_epoch(this.ptr, time);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(time);
		return ret;
	}

	/**
	 * Returns whether the expiry time would pass at the given point in time.
	 * `at_time` is the timestamp as a duration since the Unix epoch.
	 */
	public boolean would_expire(long at_time) {
		boolean ret = bindings.Bolt11Invoice_would_expire(this.ptr, at_time);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(at_time);
		return ret;
	}

	/**
	 * Returns the invoice's `min_final_cltv_expiry_delta` time, if present, otherwise
	 * [`DEFAULT_MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 */
	public long min_final_cltv_expiry_delta() {
		long ret = bindings.Bolt11Invoice_min_final_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns a list of all fallback addresses as [`Address`]es
	 */
	public String[] fallback_addresses() {
		String[] ret = bindings.Bolt11Invoice_fallback_addresses(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns a list of all routes included in the invoice
	 */
	public PrivateRoute[] private_routes() {
		long[] ret = bindings.Bolt11Invoice_private_routes(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_14_len = ret.length;
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = ret[o];
			org.ldk.structs.PrivateRoute ret_conv_14_hu_conv = null; if (ret_conv_14 < 0 || ret_conv_14 > 4096) { ret_conv_14_hu_conv = new org.ldk.structs.PrivateRoute(null, ret_conv_14); }
			if (ret_conv_14_hu_conv != null) { ret_conv_14_hu_conv.ptrs_to.add(this); };
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	/**
	 * Returns a list of all routes included in the invoice as the underlying hints
	 */
	public RouteHint[] route_hints() {
		long[] ret = bindings.Bolt11Invoice_route_hints(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_11_len = ret.length;
		RouteHint[] ret_conv_11_arr = new RouteHint[ret_conv_11_len];
		for (int l = 0; l < ret_conv_11_len; l++) {
			long ret_conv_11 = ret[l];
			org.ldk.structs.RouteHint ret_conv_11_hu_conv = null; if (ret_conv_11 < 0 || ret_conv_11 > 4096) { ret_conv_11_hu_conv = new org.ldk.structs.RouteHint(null, ret_conv_11); }
			if (ret_conv_11_hu_conv != null) { ret_conv_11_hu_conv.ptrs_to.add(this); };
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		return ret_conv_11_arr;
	}

	/**
	 * Returns the currency for which the invoice was issued
	 */
	public Currency currency() {
		Currency ret = bindings.Bolt11Invoice_currency(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the amount if specified in the invoice as millisatoshis.
	 */
	public Option_u64Z amount_milli_satoshis() {
		long ret = bindings.Bolt11Invoice_amount_milli_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Read a Bolt11Invoice object from a string
	 */
	public static Result_Bolt11InvoiceParseOrSemanticErrorZ from_str(java.lang.String s) {
		long ret = bindings.Bolt11Invoice_from_str(s);
		Reference.reachabilityFence(s);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Bolt11Invoice object
	 */
	public String to_str() {
		String ret = bindings.Bolt11Invoice_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

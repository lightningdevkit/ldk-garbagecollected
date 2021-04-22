package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Represents an syntactically correct Invoice for a payment on the lightning network,
 * but without the signature information.
 * De- and encoding should not lead to information loss but may lead to different hashes.
 * 
 * For methods without docs see the corresponding methods in `Invoice`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RawInvoice extends CommonBase {
	RawInvoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RawInvoice_free(ptr); }
	}

	/**
	 * data part
	 */
	public RawDataPart get_data() {
		long ret = bindings.RawInvoice_get_data(this.ptr);
		RawDataPart ret_hu_conv = new RawDataPart(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * data part
	 */
	public void set_data(RawDataPart val) {
		bindings.RawInvoice_set_data(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Creates a copy of the RawInvoice
	 */
	public RawInvoice clone() {
		long ret = bindings.RawInvoice_clone(this.ptr);
		RawInvoice ret_hu_conv = new RawInvoice(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Calculate the hash of the encoded `RawInvoice`
	 */
	public byte[] hash() {
		byte[] ret = bindings.RawInvoice_hash(this.ptr);
		return ret;
	}

	public Sha256 payment_hash() {
		long ret = bindings.RawInvoice_payment_hash(this.ptr);
		Sha256 ret_hu_conv = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Description description() {
		long ret = bindings.RawInvoice_description(this.ptr);
		Description ret_hu_conv = new Description(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public PayeePubKey payee_pub_key() {
		long ret = bindings.RawInvoice_payee_pub_key(this.ptr);
		PayeePubKey ret_hu_conv = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Sha256 description_hash() {
		long ret = bindings.RawInvoice_description_hash(this.ptr);
		Sha256 ret_hu_conv = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public ExpiryTime expiry_time() {
		long ret = bindings.RawInvoice_expiry_time(this.ptr);
		ExpiryTime ret_hu_conv = new ExpiryTime(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public MinFinalCltvExpiry min_final_cltv_expiry() {
		long ret = bindings.RawInvoice_min_final_cltv_expiry(this.ptr);
		MinFinalCltvExpiry ret_hu_conv = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] payment_secret() {
		byte[] ret = bindings.RawInvoice_payment_secret(this.ptr);
		return ret;
	}

	public InvoiceFeatures features() {
		long ret = bindings.RawInvoice_features(this.ptr);
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public RouteHint[] routes() {
		long[] ret = bindings.RawInvoice_routes(this.ptr);
		RouteHint[] ret_conv_11_arr = new RouteHint[ret.length];
		for (int l = 0; l < ret.length; l++) {
			long ret_conv_11 = ret[l];
			RouteHint ret_conv_11_hu_conv = new RouteHint(null, ret_conv_11);
			ret_conv_11_hu_conv.ptrs_to.add(this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		return ret_conv_11_arr;
	}

	public Option_u64Z amount_pico_btc() {
		long ret = bindings.RawInvoice_amount_pico_btc(this.ptr);
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public LDKCurrency currency() {
		LDKCurrency ret = bindings.RawInvoice_currency(this.ptr);
		return ret;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


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
		if (ret >= 0 && ret < 1024) { return null; }
		RawDataPart ret_hu_conv = new RawDataPart(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * data part
	 */
	public void set_data(RawDataPart val) {
		bindings.RawInvoice_set_data(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * Checks if two RawInvoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(RawInvoice b) {
		boolean ret = bindings.RawInvoice_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Creates a copy of the RawInvoice
	 */
	public RawInvoice clone() {
		long ret = bindings.RawInvoice_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
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

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Sha256 payment_hash() {
		long ret = bindings.RawInvoice_payment_hash(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Sha256 ret_hu_conv = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Description description() {
		long ret = bindings.RawInvoice_description(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Description ret_hu_conv = new Description(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PayeePubKey payee_pub_key() {
		long ret = bindings.RawInvoice_payee_pub_key(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		PayeePubKey ret_hu_conv = new PayeePubKey(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Sha256 description_hash() {
		long ret = bindings.RawInvoice_description_hash(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Sha256 ret_hu_conv = new Sha256(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ExpiryTime expiry_time() {
		long ret = bindings.RawInvoice_expiry_time(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		ExpiryTime ret_hu_conv = new ExpiryTime(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public MinFinalCltvExpiry min_final_cltv_expiry() {
		long ret = bindings.RawInvoice_min_final_cltv_expiry(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		MinFinalCltvExpiry ret_hu_conv = new MinFinalCltvExpiry(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] payment_secret() {
		byte[] ret = bindings.RawInvoice_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public InvoiceFeatures features() {
		long ret = bindings.RawInvoice_features(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		InvoiceFeatures ret_hu_conv = new InvoiceFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public PrivateRoute[] private_routes() {
		long[] ret = bindings.RawInvoice_private_routes(this.ptr);
		PrivateRoute[] ret_conv_14_arr = new PrivateRoute[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long ret_conv_14 = ret[o];
			PrivateRoute ret_conv_14_hu_conv = new PrivateRoute(null, ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public Option_u64Z amount_pico_btc() {
		long ret = bindings.RawInvoice_amount_pico_btc(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Currency currency() {
		Currency ret = bindings.RawInvoice_currency(this.ptr);
		return ret;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawDataPart ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawDataPart(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * data part
	 */
	public void set_data(org.ldk.structs.RawDataPart val) {
		bindings.RawInvoice_set_data(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Checks if two RawInvoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.RawInvoice b) {
		boolean ret = bindings.RawInvoice_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof RawInvoice)) return false;
		return this.eq((RawInvoice)o);
	}
	long clone_ptr() {
		long ret = bindings.RawInvoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RawInvoice
	 */
	public RawInvoice clone() {
		long ret = bindings.RawInvoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two RawInvoices contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.RawInvoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Calculate the hash of the encoded `RawInvoice` which should be signed.
	 */
	public byte[] signable_hash() {
		byte[] ret = bindings.RawInvoice_signable_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Sha256 payment_hash() {
		long ret = bindings.RawInvoice_payment_hash(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sha256 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sha256(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Description description() {
		long ret = bindings.RawInvoice_description(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Description ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Description(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PayeePubKey payee_pub_key() {
		long ret = bindings.RawInvoice_payee_pub_key(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PayeePubKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PayeePubKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public Sha256 description_hash() {
		long ret = bindings.RawInvoice_description_hash(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Sha256 ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Sha256(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ExpiryTime expiry_time() {
		long ret = bindings.RawInvoice_expiry_time(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ExpiryTime ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ExpiryTime(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public MinFinalCltvExpiry min_final_cltv_expiry() {
		long ret = bindings.RawInvoice_min_final_cltv_expiry(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MinFinalCltvExpiry ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MinFinalCltvExpiry(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public byte[] payment_secret() {
		byte[] ret = bindings.RawInvoice_payment_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public InvoiceFeatures features() {
		long ret = bindings.RawInvoice_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public PrivateRoute[] private_routes() {
		long[] ret = bindings.RawInvoice_private_routes(this.ptr);
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

	public Option_u64Z amount_pico_btc() {
		long ret = bindings.RawInvoice_amount_pico_btc(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	public Currency currency() {
		Currency ret = bindings.RawInvoice_currency(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

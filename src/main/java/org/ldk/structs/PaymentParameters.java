package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The recipient of a payment.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentParameters extends CommonBase {
	PaymentParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentParameters_free(ptr); }
	}

	/**
	 * The node id of the payee.
	 */
	public byte[] get_payee_pubkey() {
		byte[] ret = bindings.PaymentParameters_get_payee_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The node id of the payee.
	 */
	public void set_payee_pubkey(byte[] val) {
		bindings.PaymentParameters_set_payee_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Features supported by the payee.
	 * 
	 * May be set from the payee's invoice or via [`for_keysend`]. May be `None` if the invoice
	 * does not contain any features.
	 * 
	 * [`for_keysend`]: Self::for_keysend
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public InvoiceFeatures get_features() {
		long ret = bindings.PaymentParameters_get_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Features supported by the payee.
	 * 
	 * May be set from the payee's invoice or via [`for_keysend`]. May be `None` if the invoice
	 * does not contain any features.
	 * 
	 * [`for_keysend`]: Self::for_keysend
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_features(@Nullable InvoiceFeatures val) {
		bindings.PaymentParameters_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
	 */
	public RouteHint[] get_route_hints() {
		long[] ret = bindings.PaymentParameters_get_route_hints(this.ptr);
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
	 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
	 */
	public void set_route_hints(RouteHint[] val) {
		bindings.PaymentParameters_set_route_hints(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_11 -> val_conv_11 == null ? 0 : val_conv_11.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Expiration of a payment to the payee, in seconds relative to the UNIX epoch.
	 */
	public Option_u64Z get_expiry_time() {
		long ret = bindings.PaymentParameters_get_expiry_time(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Expiration of a payment to the payee, in seconds relative to the UNIX epoch.
	 */
	public void set_expiry_time(Option_u64Z val) {
		bindings.PaymentParameters_set_expiry_time(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 */
	public int get_max_total_cltv_expiry_delta() {
		int ret = bindings.PaymentParameters_get_max_total_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 */
	public void set_max_total_cltv_expiry_delta(int val) {
		bindings.PaymentParameters_set_max_total_cltv_expiry_delta(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PaymentParameters given each field
	 */
	public static PaymentParameters of(byte[] payee_pubkey_arg, InvoiceFeatures features_arg, RouteHint[] route_hints_arg, Option_u64Z expiry_time_arg, int max_total_cltv_expiry_delta_arg) {
		long ret = bindings.PaymentParameters_new(InternalUtils.check_arr_len(payee_pubkey_arg, 33), features_arg == null ? 0 : features_arg.ptr & ~1, route_hints_arg != null ? Arrays.stream(route_hints_arg).mapToLong(route_hints_arg_conv_11 -> route_hints_arg_conv_11 == null ? 0 : route_hints_arg_conv_11.ptr & ~1).toArray() : null, expiry_time_arg.ptr, max_total_cltv_expiry_delta_arg);
		Reference.reachabilityFence(payee_pubkey_arg);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(route_hints_arg);
		Reference.reachabilityFence(expiry_time_arg);
		Reference.reachabilityFence(max_total_cltv_expiry_delta_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PaymentParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PaymentParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentParameters
	 */
	public PaymentParameters clone() {
		long ret = bindings.PaymentParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PaymentParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentParameterss contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.PaymentParameters_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two PaymentParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PaymentParameters b) {
		boolean ret = bindings.PaymentParameters_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PaymentParameters)) return false;
		return this.eq((PaymentParameters)o);
	}
	/**
	 * Serialize the PaymentParameters object into a byte array which can be read by PaymentParameters_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaymentParameters_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PaymentParameters from a byte array, created by PaymentParameters_write
	 */
	public static Result_PaymentParametersDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentParameters_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentParametersDecodeErrorZ ret_hu_conv = Result_PaymentParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey`.
	 */
	public static PaymentParameters from_node_id(byte[] payee_pubkey) {
		long ret = bindings.PaymentParameters_from_node_id(InternalUtils.check_arr_len(payee_pubkey, 33));
		Reference.reachabilityFence(payee_pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PaymentParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey` to use for keysend payments.
	 */
	public static PaymentParameters for_keysend(byte[] payee_pubkey) {
		long ret = bindings.PaymentParameters_for_keysend(InternalUtils.check_arr_len(payee_pubkey, 33));
		Reference.reachabilityFence(payee_pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new PaymentParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

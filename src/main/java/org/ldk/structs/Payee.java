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
public class Payee extends CommonBase {
	Payee(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Payee_free(ptr); }
	}

	/**
	 * The node id of the payee.
	 */
	public byte[] get_pubkey() {
		byte[] ret = bindings.Payee_get_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The node id of the payee.
	 */
	public void set_pubkey(byte[] val) {
		bindings.Payee_set_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
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
		long ret = bindings.Payee_get_features(this.ptr);
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
		bindings.Payee_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Hints for routing to the payee, containing channels connecting the payee to public nodes.
	 */
	public RouteHint[] get_route_hints() {
		long[] ret = bindings.Payee_get_route_hints(this.ptr);
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
		bindings.Payee_set_route_hints(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_11 -> val_conv_11 == null ? 0 : val_conv_11.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Expiration of a payment to the payee, in seconds relative to the UNIX epoch.
	 */
	public Option_u64Z get_expiry_time() {
		long ret = bindings.Payee_get_expiry_time(this.ptr);
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
		bindings.Payee_set_expiry_time(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Payee given each field
	 */
	public static Payee of(byte[] pubkey_arg, InvoiceFeatures features_arg, RouteHint[] route_hints_arg, Option_u64Z expiry_time_arg) {
		long ret = bindings.Payee_new(InternalUtils.check_arr_len(pubkey_arg, 33), features_arg == null ? 0 : features_arg.ptr & ~1, route_hints_arg != null ? Arrays.stream(route_hints_arg).mapToLong(route_hints_arg_conv_11 -> route_hints_arg_conv_11 == null ? 0 : route_hints_arg_conv_11.ptr & ~1).toArray() : null, expiry_time_arg.ptr);
		Reference.reachabilityFence(pubkey_arg);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(route_hints_arg);
		Reference.reachabilityFence(expiry_time_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payee ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Payee(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Payee_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Payee
	 */
	public Payee clone() {
		long ret = bindings.Payee_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payee ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Payee(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Payees contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Payee_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Payees contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(Payee b) {
		boolean ret = bindings.Payee_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		this.ptrs_to.add(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Payee)) return false;
		return this.eq((Payee)o);
	}
	/**
	 * Serialize the Payee object into a byte array which can be read by Payee_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Payee_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Payee from a byte array, created by Payee_write
	 */
	public static Result_PayeeDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Payee_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey`.
	 */
	public static Payee from_node_id(byte[] pubkey) {
		long ret = bindings.Payee_from_node_id(InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payee ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Payee(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey` to use for keysend payments.
	 */
	public static Payee for_keysend(byte[] pubkey) {
		long ret = bindings.Payee_for_keysend(InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payee ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new Payee(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

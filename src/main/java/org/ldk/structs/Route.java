package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A route directs a payment from the sender (us) to the recipient. If the recipient supports MPP,
 * it can take multiple paths. Each path is composed of one or more hops through the network.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Route extends CommonBase {
	Route(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Route_free(ptr); }
	}

	/**
	 * The list of routes taken for a single (potentially-)multi-part payment. The pubkey of the
	 * last RouteHop in each path must be the same. Each entry represents a list of hops, NOT
	 * INCLUDING our own, where the last hop is the destination. Thus, this must always be at
	 * least length one. While the maximum length of any given path is variable, keeping the length
	 * of any path less or equal to 19 should currently ensure it is viable.
	 */
	public RouteHop[][] get_paths() {
		long[][] ret = bindings.Route_get_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_12_len = ret.length;
		RouteHop[][] ret_conv_12_arr = new RouteHop[ret_conv_12_len][];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long[] ret_conv_12 = ret[m];
			int ret_conv_12_conv_10_len = ret_conv_12.length;
			RouteHop[] ret_conv_12_conv_10_arr = new RouteHop[ret_conv_12_conv_10_len];
			for (int k = 0; k < ret_conv_12_conv_10_len; k++) {
				long ret_conv_12_conv_10 = ret_conv_12[k];
				org.ldk.structs.RouteHop ret_conv_12_conv_10_hu_conv = null; if (ret_conv_12_conv_10 < 0 || ret_conv_12_conv_10 > 4096) { ret_conv_12_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, ret_conv_12_conv_10); }
				if (ret_conv_12_conv_10_hu_conv != null) { ret_conv_12_conv_10_hu_conv.ptrs_to.add(this); };
				ret_conv_12_conv_10_arr[k] = ret_conv_12_conv_10_hu_conv;
			}
			ret_conv_12_arr[m] = ret_conv_12_conv_10_arr;
		}
		return ret_conv_12_arr;
	}

	/**
	 * The list of routes taken for a single (potentially-)multi-part payment. The pubkey of the
	 * last RouteHop in each path must be the same. Each entry represents a list of hops, NOT
	 * INCLUDING our own, where the last hop is the destination. Thus, this must always be at
	 * least length one. While the maximum length of any given path is variable, keeping the length
	 * of any path less or equal to 19 should currently ensure it is viable.
	 */
	public void set_paths(RouteHop[][] val) {
		bindings.Route_set_paths(this.ptr, val != null ? Arrays.stream(val).map(val_conv_12 -> val_conv_12 != null ? Arrays.stream(val_conv_12).mapToLong(val_conv_12_conv_10 -> val_conv_12_conv_10 == null ? 0 : val_conv_12_conv_10.ptr).toArray() : null).toArray(long[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (RouteHop[] val_conv_12: val) { for (RouteHop val_conv_12_conv_10: val_conv_12) { if (this != null) { this.ptrs_to.add(val_conv_12_conv_10); }; }; };
	}

	/**
	 * The `payment_params` parameter passed to [`find_route`].
	 * This is used by `ChannelManager` to track information which may be required for retries,
	 * provided back to you via [`Event::PaymentPathFailed`].
	 * 
	 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public PaymentParameters get_payment_params() {
		long ret = bindings.Route_get_payment_params(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The `payment_params` parameter passed to [`find_route`].
	 * This is used by `ChannelManager` to track information which may be required for retries,
	 * provided back to you via [`Event::PaymentPathFailed`].
	 * 
	 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_payment_params(@Nullable PaymentParameters val) {
		bindings.Route_set_payment_params(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new Route given each field
	 */
	public static Route of(RouteHop[][] paths_arg, PaymentParameters payment_params_arg) {
		long ret = bindings.Route_new(paths_arg != null ? Arrays.stream(paths_arg).map(paths_arg_conv_12 -> paths_arg_conv_12 != null ? Arrays.stream(paths_arg_conv_12).mapToLong(paths_arg_conv_12_conv_10 -> paths_arg_conv_12_conv_10 == null ? 0 : paths_arg_conv_12_conv_10.ptr).toArray() : null).toArray(long[][]::new) : null, payment_params_arg == null ? 0 : payment_params_arg.ptr);
		Reference.reachabilityFence(paths_arg);
		Reference.reachabilityFence(payment_params_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHop[] paths_arg_conv_12: paths_arg) { for (RouteHop paths_arg_conv_12_conv_10: paths_arg_conv_12) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(paths_arg_conv_12_conv_10); }; }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(payment_params_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Route_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Route
	 */
	public Route clone() {
		long ret = bindings.Route_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Routes contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Route_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Routes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(Route b) {
		boolean ret = bindings.Route_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Route)) return false;
		return this.eq((Route)o);
	}
	/**
	 * Returns the total amount of fees paid on this [`Route`].
	 * 
	 * This doesn't include any extra payment made to the recipient, which can happen in excess of
	 * the amount passed to [`find_route`]'s `params.final_value_msat`.
	 */
	public long get_total_fees() {
		long ret = bindings.Route_get_total_fees(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the total amount paid on this [`Route`], excluding the fees.
	 */
	public long get_total_amount() {
		long ret = bindings.Route_get_total_amount(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the Route object into a byte array which can be read by Route_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Route_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a Route from a byte array, created by Route_write
	 */
	public static Result_RouteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Route_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

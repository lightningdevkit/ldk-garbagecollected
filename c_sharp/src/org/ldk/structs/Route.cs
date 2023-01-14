using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A route directs a payment from the sender (us) to the recipient. If the recipient supports MPP,
 * it can take multiple paths. Each path is composed of one or more hops through the network.
 */
public class Route : CommonBase {
	internal Route(object _dummy, long ptr) : base(ptr) { }
	~Route() {
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
		GC.KeepAlive(this);
		int ret_conv_12_len = ret.Length;
		RouteHop[][] ret_conv_12_arr = new RouteHop[ret_conv_12_len][];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long[] ret_conv_12 = ret[m];
			int ret_conv_12_conv_10_len = ret_conv_12.Length;
			RouteHop[] ret_conv_12_conv_10_arr = new RouteHop[ret_conv_12_conv_10_len];
			for (int k = 0; k < ret_conv_12_conv_10_len; k++) {
				long ret_conv_12_conv_10 = ret_conv_12[k];
				org.ldk.structs.RouteHop ret_conv_12_conv_10_hu_conv = null; if (ret_conv_12_conv_10 < 0 || ret_conv_12_conv_10 > 4096) { ret_conv_12_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, ret_conv_12_conv_10); }
				if (ret_conv_12_conv_10_hu_conv != null) { ret_conv_12_conv_10_hu_conv.ptrs_to.AddLast(this); };
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
		bindings.Route_set_paths(this.ptr, val != null ? InternalUtils.mapArray(val, val_conv_12 => val_conv_12 != null ? InternalUtils.mapArray(val_conv_12, val_conv_12_conv_10 => val_conv_12_conv_10 == null ? 0 : val_conv_12_conv_10.ptr) : null) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		foreach (RouteHop[] val_conv_12 in val) { foreach (RouteHop val_conv_12_conv_10 in val_conv_12) { if (this != null) { this.ptrs_to.AddLast(val_conv_12_conv_10); }; }; };
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
	public PaymentParameters get_payment_params() {
		long ret = bindings.Route_get_payment_params(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PaymentParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public void set_payment_params(org.ldk.structs.PaymentParameters val) {
		bindings.Route_set_payment_params(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new Route given each field
	 */
	public static Route of(RouteHop[][] paths_arg, org.ldk.structs.PaymentParameters payment_params_arg) {
		long ret = bindings.Route_new(paths_arg != null ? InternalUtils.mapArray(paths_arg, paths_arg_conv_12 => paths_arg_conv_12 != null ? InternalUtils.mapArray(paths_arg_conv_12, paths_arg_conv_12_conv_10 => paths_arg_conv_12_conv_10 == null ? 0 : paths_arg_conv_12_conv_10.ptr) : null) : null, payment_params_arg == null ? 0 : payment_params_arg.ptr);
		GC.KeepAlive(paths_arg);
		GC.KeepAlive(payment_params_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (RouteHop[] paths_arg_conv_12 in paths_arg) { foreach (RouteHop paths_arg_conv_12_conv_10 in paths_arg_conv_12) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(paths_arg_conv_12_conv_10); }; }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(payment_params_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Route_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Route
	 */
	public Route clone() {
		long ret = bindings.Route_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Routes contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.Route_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Routes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Route b) {
		bool ret = bindings.Route_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Route)) return false;
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
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the total amount paid on this [`Route`], excluding the fees.
	 */
	public long get_total_amount() {
		long ret = bindings.Route_get_total_amount(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the Route object into a byte array which can be read by Route_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Route_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a Route from a byte array, created by Route_write
	 */
	public static Result_RouteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Route_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

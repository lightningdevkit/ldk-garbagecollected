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
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public Path[] get_paths() {
		long ret = bindings.Route_get_paths(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_6_len = InternalUtils.getArrayLength(ret);
		Path[] ret_conv_6_arr = new Path[ret_conv_6_len];
		for (int g = 0; g < ret_conv_6_len; g++) {
			long ret_conv_6 = InternalUtils.getU64ArrayElem(ret, g);
			org.ldk.structs.Path ret_conv_6_hu_conv = null; if (ret_conv_6 < 0 || ret_conv_6 > 4096) { ret_conv_6_hu_conv = new org.ldk.structs.Path(null, ret_conv_6); }
			if (ret_conv_6_hu_conv != null) { ret_conv_6_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_6_arr[g] = ret_conv_6_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_6_arr;
	}

	/**
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public void set_paths(Path[] val) {
		bindings.Route_set_paths(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_6 => val_conv_6 == null ? 0 : val_conv_6.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		foreach (Path val_conv_6 in val) { if (this != null) { this.ptrs_to.AddLast(val_conv_6); }; };
	}

	/**
	 * The `route_params` parameter passed to [`find_route`].
	 * 
	 * This is used by `ChannelManager` to track information which may be required for retries.
	 * 
	 * Will be `None` for objects serialized with LDK versions prior to 0.0.117.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public RouteParameters get_route_params() {
		long ret = bindings.Route_get_route_params(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The `route_params` parameter passed to [`find_route`].
	 * 
	 * This is used by `ChannelManager` to track information which may be required for retries.
	 * 
	 * Will be `None` for objects serialized with LDK versions prior to 0.0.117.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_route_params(org.ldk.structs.RouteParameters val) {
		bindings.Route_set_route_params(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new Route given each field
	 * 
	 * Note that route_params_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Route of(Path[] paths_arg, org.ldk.structs.RouteParameters route_params_arg) {
		long ret = bindings.Route_new(InternalUtils.encodeUint64Array(InternalUtils.mapArray(paths_arg, paths_arg_conv_6 => paths_arg_conv_6 == null ? 0 : paths_arg_conv_6.ptr)), route_params_arg == null ? 0 : route_params_arg.ptr);
		GC.KeepAlive(paths_arg);
		GC.KeepAlive(route_params_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (Path paths_arg_conv_6 in paths_arg) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(paths_arg_conv_6); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(route_params_arg); };
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
	 * Generates a non-cryptographic 64-bit hash of the Route.
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
	 * For objects serialized with LDK 0.0.117 and after, this includes any extra payment made to
	 * the recipient, which can happen in excess of the amount passed to [`find_route`] via
	 * [`RouteParameters::final_value_msat`], if we had to reach the [`htlc_minimum_msat`] limits.
	 * 
	 * [`htlc_minimum_msat`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
	 */
	public long get_total_fees() {
		long ret = bindings.Route_get_total_fees(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the total amount paid on this [`Route`], excluding the fees.
	 * 
	 * Might be more than requested as part of the given [`RouteParameters::final_value_msat`] if
	 * we had to reach the [`htlc_minimum_msat`] limits.
	 * 
	 * [`htlc_minimum_msat`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
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
		long ret = bindings.Route_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Route from a byte array, created by Route_write
	 */
	public static Result_RouteDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Route_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteDecodeErrorZ ret_hu_conv = Result_RouteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

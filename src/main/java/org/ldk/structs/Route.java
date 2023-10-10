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
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public Path[] get_paths() {
		long[] ret = bindings.Route_get_paths(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_6_len = ret.length;
		Path[] ret_conv_6_arr = new Path[ret_conv_6_len];
		for (int g = 0; g < ret_conv_6_len; g++) {
			long ret_conv_6 = ret[g];
			org.ldk.structs.Path ret_conv_6_hu_conv = null; if (ret_conv_6 < 0 || ret_conv_6 > 4096) { ret_conv_6_hu_conv = new org.ldk.structs.Path(null, ret_conv_6); }
			if (ret_conv_6_hu_conv != null) { ret_conv_6_hu_conv.ptrs_to.add(this); };
			ret_conv_6_arr[g] = ret_conv_6_hu_conv;
		}
		return ret_conv_6_arr;
	}

	/**
	 * The list of [`Path`]s taken for a single (potentially-)multi-part payment. If no
	 * [`BlindedTail`]s are present, then the pubkey of the last [`RouteHop`] in each path must be
	 * the same.
	 */
	public void set_paths(Path[] val) {
		bindings.Route_set_paths(this.ptr, val != null ? Arrays.stream(val).mapToLong(val_conv_6 -> val_conv_6 == null ? 0 : val_conv_6.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		for (Path val_conv_6: val) { if (this != null) { this.ptrs_to.add(val_conv_6); }; };
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
	@Nullable
	public RouteParameters get_route_params() {
		long ret = bindings.Route_get_route_params(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_route_params(@Nullable org.ldk.structs.RouteParameters val) {
		bindings.Route_set_route_params(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new Route given each field
	 * 
	 * Note that route_params_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Route of(Path[] paths_arg, @Nullable org.ldk.structs.RouteParameters route_params_arg) {
		long ret = bindings.Route_new(paths_arg != null ? Arrays.stream(paths_arg).mapToLong(paths_arg_conv_6 -> paths_arg_conv_6 == null ? 0 : paths_arg_conv_6.ptr).toArray() : null, route_params_arg == null ? 0 : route_params_arg.ptr);
		Reference.reachabilityFence(paths_arg);
		Reference.reachabilityFence(route_params_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Route ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Route(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (Path paths_arg_conv_6: paths_arg) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(paths_arg_conv_6); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(route_params_arg); };
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
	 * Generates a non-cryptographic 64-bit hash of the Route.
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
	public boolean eq(org.ldk.structs.Route b) {
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
	 * For objects serialized with LDK 0.0.117 and after, this includes any extra payment made to
	 * the recipient, which can happen in excess of the amount passed to [`find_route`] via
	 * [`RouteParameters::final_value_msat`], if we had to reach the [`htlc_minimum_msat`] limits.
	 * 
	 * [`htlc_minimum_msat`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
	 */
	public long get_total_fees() {
		long ret = bindings.Route_get_total_fees(this.ptr);
		Reference.reachabilityFence(this);
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

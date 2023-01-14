package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait defining behavior for routing a payment.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Router extends CommonBase {
	final bindings.LDKRouter bindings_instance;
	Router(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Router(bindings.LDKRouter arg) {
		super(bindings.LDKRouter_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Router_free(ptr); } super.finalize();
	}

	public static interface RouterInterface {
		/**
		 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs);
		/**
		 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values. Includes
		 * `PaymentHash` and `PaymentId` to be able to correlate the request with a specific payment.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route_with_id(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id);
		/**
		 * Lets the router know that payment through a specific path has failed.
		 */
		void notify_payment_path_failed(RouteHop[] path, long short_channel_id);
		/**
		 * Lets the router know that payment through a specific path was successful.
		 */
		void notify_payment_path_successful(RouteHop[] path);
		/**
		 * Lets the router know that a payment probe was successful.
		 */
		void notify_payment_probe_successful(RouteHop[] path);
		/**
		 * Lets the router know that a payment probe failed.
		 */
		void notify_payment_probe_failed(RouteHop[] path, long short_channel_id);
	}
	private static class LDKRouterHolder { Router held; }
	public static Router new_impl(RouterInterface arg) {
		final LDKRouterHolder impl_holder = new LDKRouterHolder();
		impl_holder.held = new Router(new bindings.LDKRouter() {
			@Override public long find_route(byte[] payer, long route_params, long[] first_hops, long inflight_htlcs) {
				org.ldk.structs.RouteParameters route_params_hu_conv = null; if (route_params < 0 || route_params > 4096) { route_params_hu_conv = new org.ldk.structs.RouteParameters(null, route_params); }
				int first_hops_conv_16_len = first_hops.length;
				ChannelDetails[] first_hops_conv_16_arr = new ChannelDetails[first_hops_conv_16_len];
				if (first_hops != null) {
					for (int q = 0; q < first_hops_conv_16_len; q++) {
						long first_hops_conv_16 = first_hops[q];
						org.ldk.structs.ChannelDetails first_hops_conv_16_hu_conv = null; if (first_hops_conv_16 < 0 || first_hops_conv_16 > 4096) { first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, first_hops_conv_16); }
						if (first_hops_conv_16_hu_conv != null) { first_hops_conv_16_hu_conv.ptrs_to.add(this); };
						first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
					}
				}
				org.ldk.structs.InFlightHtlcs inflight_htlcs_hu_conv = null; if (inflight_htlcs < 0 || inflight_htlcs > 4096) { inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, inflight_htlcs); }
				if (inflight_htlcs_hu_conv != null) { inflight_htlcs_hu_conv.ptrs_to.add(this); };
				Result_RouteLightningErrorZ ret = arg.find_route(payer, route_params_hu_conv, first_hops_conv_16_arr, inflight_htlcs_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long find_route_with_id(byte[] payer, long route_params, long[] first_hops, long inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
				org.ldk.structs.RouteParameters route_params_hu_conv = null; if (route_params < 0 || route_params > 4096) { route_params_hu_conv = new org.ldk.structs.RouteParameters(null, route_params); }
				int first_hops_conv_16_len = first_hops.length;
				ChannelDetails[] first_hops_conv_16_arr = new ChannelDetails[first_hops_conv_16_len];
				if (first_hops != null) {
					for (int q = 0; q < first_hops_conv_16_len; q++) {
						long first_hops_conv_16 = first_hops[q];
						org.ldk.structs.ChannelDetails first_hops_conv_16_hu_conv = null; if (first_hops_conv_16 < 0 || first_hops_conv_16 > 4096) { first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, first_hops_conv_16); }
						if (first_hops_conv_16_hu_conv != null) { first_hops_conv_16_hu_conv.ptrs_to.add(this); };
						first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
					}
				}
				org.ldk.structs.InFlightHtlcs inflight_htlcs_hu_conv = null; if (inflight_htlcs < 0 || inflight_htlcs > 4096) { inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, inflight_htlcs); }
				if (inflight_htlcs_hu_conv != null) { inflight_htlcs_hu_conv.ptrs_to.add(this); };
				Result_RouteLightningErrorZ ret = arg.find_route_with_id(payer, route_params_hu_conv, first_hops_conv_16_arr, inflight_htlcs_hu_conv, _payment_hash, _payment_id);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public void notify_payment_path_failed(long[] path, long short_channel_id) {
				int path_conv_10_len = path.length;
				RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
				for (int k = 0; k < path_conv_10_len; k++) {
					long path_conv_10 = path[k];
					org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
					if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
				arg.notify_payment_path_failed(path_conv_10_arr, short_channel_id);
				Reference.reachabilityFence(arg);
			}
			@Override public void notify_payment_path_successful(long[] path) {
				int path_conv_10_len = path.length;
				RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
				for (int k = 0; k < path_conv_10_len; k++) {
					long path_conv_10 = path[k];
					org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
					if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
				arg.notify_payment_path_successful(path_conv_10_arr);
				Reference.reachabilityFence(arg);
			}
			@Override public void notify_payment_probe_successful(long[] path) {
				int path_conv_10_len = path.length;
				RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
				for (int k = 0; k < path_conv_10_len; k++) {
					long path_conv_10 = path[k];
					org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
					if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
				arg.notify_payment_probe_successful(path_conv_10_arr);
				Reference.reachabilityFence(arg);
			}
			@Override public void notify_payment_probe_failed(long[] path, long short_channel_id) {
				int path_conv_10_len = path.length;
				RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
				for (int k = 0; k < path_conv_10_len; k++) {
					long path_conv_10 = path[k];
					org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
					if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
					path_conv_10_arr[k] = path_conv_10_hu_conv;
				}
				arg.notify_payment_probe_failed(path_conv_10_arr, short_channel_id);
				Reference.reachabilityFence(arg);
			}
		});
		return impl_holder.held;
	}
	/**
	 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route(byte[] payer, org.ldk.structs.RouteParameters route_params, @Nullable ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs) {
		long ret = bindings.Router_find_route(this.ptr, InternalUtils.check_arr_len(payer, 33), route_params == null ? 0 : route_params.ptr, first_hops != null ? Arrays.stream(first_hops).mapToLong(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr).toArray() : null, inflight_htlcs == null ? 0 : inflight_htlcs.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payer);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(first_hops);
		Reference.reachabilityFence(inflight_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(route_params); };
		if (first_hops != null) { for (ChannelDetails first_hops_conv_16: first_hops) { if (this != null) { this.ptrs_to.add(first_hops_conv_16); }; } };
		if (this != null) { this.ptrs_to.add(inflight_htlcs); };
		return ret_hu_conv;
	}

	/**
	 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values. Includes
	 * `PaymentHash` and `PaymentId` to be able to correlate the request with a specific payment.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route_with_id(byte[] payer, org.ldk.structs.RouteParameters route_params, @Nullable ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
		long ret = bindings.Router_find_route_with_id(this.ptr, InternalUtils.check_arr_len(payer, 33), route_params == null ? 0 : route_params.ptr, first_hops != null ? Arrays.stream(first_hops).mapToLong(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr).toArray() : null, inflight_htlcs == null ? 0 : inflight_htlcs.ptr, InternalUtils.check_arr_len(_payment_hash, 32), InternalUtils.check_arr_len(_payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payer);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(first_hops);
		Reference.reachabilityFence(inflight_htlcs);
		Reference.reachabilityFence(_payment_hash);
		Reference.reachabilityFence(_payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(route_params); };
		if (first_hops != null) { for (ChannelDetails first_hops_conv_16: first_hops) { if (this != null) { this.ptrs_to.add(first_hops_conv_16); }; } };
		if (this != null) { this.ptrs_to.add(inflight_htlcs); };
		return ret_hu_conv;
	}

	/**
	 * Lets the router know that payment through a specific path has failed.
	 */
	public void notify_payment_path_failed(RouteHop[] path, long short_channel_id) {
		bindings.Router_notify_payment_path_failed(this.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null, short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		for (RouteHop path_conv_10: path) { if (this != null) { this.ptrs_to.add(path_conv_10); }; };
	}

	/**
	 * Lets the router know that payment through a specific path was successful.
	 */
	public void notify_payment_path_successful(RouteHop[] path) {
		bindings.Router_notify_payment_path_successful(this.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		for (RouteHop path_conv_10: path) { if (this != null) { this.ptrs_to.add(path_conv_10); }; };
	}

	/**
	 * Lets the router know that a payment probe was successful.
	 */
	public void notify_payment_probe_successful(RouteHop[] path) {
		bindings.Router_notify_payment_probe_successful(this.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		for (RouteHop path_conv_10: path) { if (this != null) { this.ptrs_to.add(path_conv_10); }; };
	}

	/**
	 * Lets the router know that a payment probe failed.
	 */
	public void notify_payment_probe_failed(RouteHop[] path, long short_channel_id) {
		bindings.Router_notify_payment_probe_failed(this.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null, short_channel_id);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		for (RouteHop path_conv_10: path) { if (this != null) { this.ptrs_to.add(path_conv_10); }; };
	}

}

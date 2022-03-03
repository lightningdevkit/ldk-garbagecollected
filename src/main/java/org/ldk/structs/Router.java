package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait defining behavior for routing an [`Invoice`] payment.
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
		Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters route_params, byte[] payment_hash, ChannelDetails[] first_hops, Score scorer);
	}
	private static class LDKRouterHolder { Router held; }
	public static Router new_impl(RouterInterface arg) {
		final LDKRouterHolder impl_holder = new LDKRouterHolder();
		impl_holder.held = new Router(new bindings.LDKRouter() {
			@Override public long find_route(byte[] payer, long route_params, byte[] payment_hash, long[] first_hops, long scorer) {
				RouteParameters route_params_hu_conv = null; if (route_params < 0 || route_params > 4096) { route_params_hu_conv = new RouteParameters(null, route_params); }
				int first_hops_conv_16_len = first_hops.length;
				ChannelDetails[] first_hops_conv_16_arr = new ChannelDetails[first_hops_conv_16_len];
				for (int q = 0; q < first_hops_conv_16_len; q++) {
					long first_hops_conv_16 = first_hops[q];
					ChannelDetails first_hops_conv_16_hu_conv = null; if (first_hops_conv_16 < 0 || first_hops_conv_16 > 4096) { first_hops_conv_16_hu_conv = new ChannelDetails(null, first_hops_conv_16); }
					first_hops_conv_16_hu_conv.ptrs_to.add(this);
					first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
				}
				Score ret_hu_conv = new Score(null, scorer);
				ret_hu_conv.ptrs_to.add(this);
				Result_RouteLightningErrorZ ret = arg.find_route(payer, route_params_hu_conv, payment_hash, first_hops_conv_16_arr, ret_hu_conv);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters route_params, byte[] payment_hash, @Nullable ChannelDetails[] first_hops, Score scorer) {
		long ret = bindings.Router_find_route(this.ptr, InternalUtils.check_arr_len(payer, 33), route_params == null ? 0 : route_params.ptr & ~1, InternalUtils.check_arr_len(payment_hash, 32), first_hops != null ? Arrays.stream(first_hops).mapToLong(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr & ~1).toArray() : null, scorer == null ? 0 : scorer.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payer);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(first_hops);
		Reference.reachabilityFence(scorer);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(route_params);
		for (ChannelDetails first_hops_conv_16: first_hops) { this.ptrs_to.add(first_hops_conv_16); };
		this.ptrs_to.add(scorer);
		return ret_hu_conv;
	}

}

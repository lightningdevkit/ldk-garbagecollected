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
	private Router(bindings.LDKRouter arg, bindings.LDKMessageRouter MessageRouter) {
		super(bindings.LDKRouter_new(arg, MessageRouter));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(MessageRouter);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Router_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.Router_free(ptr); }
		ptr = 0;
	}
	public static interface RouterInterface {
		/**
		 * Finds a [`Route`] for a payment between the given `payer` and a payee.
		 * 
		 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
		 * and [`RouteParameters::final_value_msat`], respectively.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs);
		/**
		 * Finds a [`Route`] for a payment between the given `payer` and a payee.
		 * 
		 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
		 * and [`RouteParameters::final_value_msat`], respectively.
		 * 
		 * Includes a [`PaymentHash`] and a [`PaymentId`] to be able to correlate the request with a specific
		 * payment.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route_with_id(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id);
		/**
		 * Creates [`BlindedPath`]s for payment to the `recipient` node. The channels in `first_hops`
		 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
		 * given in `tlvs`.
		 */
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, ReceiveTlvs tlvs, long amount_msats);
	}
	private static class LDKRouterHolder { Router held; }
	public static Router new_impl(RouterInterface arg, MessageRouter.MessageRouterInterface MessageRouter_impl) {
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
			@Override public long create_blinded_payment_paths(byte[] recipient, long[] first_hops, long tlvs, long amount_msats) {
				int first_hops_conv_16_len = first_hops.length;
				ChannelDetails[] first_hops_conv_16_arr = new ChannelDetails[first_hops_conv_16_len];
				for (int q = 0; q < first_hops_conv_16_len; q++) {
					long first_hops_conv_16 = first_hops[q];
					org.ldk.structs.ChannelDetails first_hops_conv_16_hu_conv = null; if (first_hops_conv_16 < 0 || first_hops_conv_16 > 4096) { first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, first_hops_conv_16); }
					if (first_hops_conv_16_hu_conv != null) { first_hops_conv_16_hu_conv.ptrs_to.add(this); };
					first_hops_conv_16_arr[q] = first_hops_conv_16_hu_conv;
				}
				org.ldk.structs.ReceiveTlvs tlvs_hu_conv = null; if (tlvs < 0 || tlvs > 4096) { tlvs_hu_conv = new org.ldk.structs.ReceiveTlvs(null, tlvs); }
				if (tlvs_hu_conv != null) { tlvs_hu_conv.ptrs_to.add(this); };
				Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret = arg.create_blinded_payment_paths(recipient, first_hops_conv_16_arr, tlvs_hu_conv, amount_msats);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
		}, MessageRouter.new_impl(MessageRouter_impl).bindings_instance);
		return impl_holder.held;
	}

	/**
	 * Gets the underlying MessageRouter.
	 */
	public MessageRouter get_message_router() {
		MessageRouter res = new MessageRouter(null, bindings.LDKRouter_get_MessageRouter(this.ptr));
		res.ptrs_to.add(this);
		return res;
	}

	/**
	 * Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
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
	 * Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Includes a [`PaymentHash`] and a [`PaymentId`] to be able to correlate the request with a specific
	 * payment.
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
	 * Creates [`BlindedPath`]s for payment to the `recipient` node. The channels in `first_hops`
	 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
	 * given in `tlvs`.
	 */
	public Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, org.ldk.structs.ReceiveTlvs tlvs, long amount_msats) {
		long ret = bindings.Router_create_blinded_payment_paths(this.ptr, InternalUtils.check_arr_len(recipient, 33), first_hops != null ? Arrays.stream(first_hops).mapToLong(first_hops_conv_16 -> first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr).toArray() : null, tlvs == null ? 0 : tlvs.ptr, amount_msats);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(recipient);
		Reference.reachabilityFence(first_hops);
		Reference.reachabilityFence(tlvs);
		Reference.reachabilityFence(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		for (ChannelDetails first_hops_conv_16: first_hops) { if (this != null) { this.ptrs_to.add(first_hops_conv_16); }; };
		if (this != null) { this.ptrs_to.add(tlvs); };
		return ret_hu_conv;
	}

}

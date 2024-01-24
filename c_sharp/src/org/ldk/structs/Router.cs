
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of Router */
public interface RouterInterface {
	/**Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	Result_RouteLightningErrorZ find_route(byte[] payer, RouteParameters route_params, ChannelDetails[] first_hops, InFlightHtlcs inflight_htlcs);
	/**Finds a [`Route`] for a payment between the given `payer` and a payee.
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
	/**Creates [`BlindedPath`]s for payment to the `recipient` node. The channels in `first_hops`
	 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
	 * given in `tlvs`.
	 */
	Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, ReceiveTlvs tlvs, long amount_msats);
}

/**
 * A trait defining behavior for routing a payment.
 */
public class Router : CommonBase {
	internal bindings.LDKRouter bindings_instance;
	internal long instance_idx;

	internal Router(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~Router() {
		if (ptr != 0) { bindings.Router_free(ptr); }
	}

	private class LDKRouterHolder { internal Router held; }
	private class LDKRouterImpl : bindings.LDKRouter {
		internal LDKRouterImpl(RouterInterface arg, LDKRouterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private RouterInterface arg;
		private LDKRouterHolder impl_holder;
		public long find_route(long _payer, long _route_params, long _first_hops, long _inflight_htlcs) {
			byte[] _payer_conv = InternalUtils.decodeUint8Array(_payer);
			org.ldk.structs.RouteParameters _route_params_hu_conv = null; if (_route_params < 0 || _route_params > 4096) { _route_params_hu_conv = new org.ldk.structs.RouteParameters(null, _route_params); }
			int _first_hops_conv_16_len = InternalUtils.getArrayLength(_first_hops);
			ChannelDetails[] _first_hops_conv_16_arr = new ChannelDetails[_first_hops_conv_16_len];
			if (_first_hops != null) {
				for (int q = 0; q < _first_hops_conv_16_len; q++) {
					long _first_hops_conv_16 = InternalUtils.getU64ArrayElem(_first_hops, q);
					org.ldk.structs.ChannelDetails _first_hops_conv_16_hu_conv = null; if (_first_hops_conv_16 < 0 || _first_hops_conv_16 > 4096) { _first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, _first_hops_conv_16); }
					if (_first_hops_conv_16_hu_conv != null) { _first_hops_conv_16_hu_conv.ptrs_to.AddLast(this); };
					_first_hops_conv_16_arr[q] = _first_hops_conv_16_hu_conv;
				}
			}
			bindings.free_buffer(_first_hops);
			org.ldk.structs.InFlightHtlcs _inflight_htlcs_hu_conv = null; if (_inflight_htlcs < 0 || _inflight_htlcs > 4096) { _inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, _inflight_htlcs); }
			if (_inflight_htlcs_hu_conv != null) { _inflight_htlcs_hu_conv.ptrs_to.AddLast(this); };
			Result_RouteLightningErrorZ ret = arg.find_route(_payer_conv, _route_params_hu_conv, _first_hops_conv_16_arr, _inflight_htlcs_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long find_route_with_id(long _payer, long _route_params, long _first_hops, long _inflight_htlcs, long __payment_hash, long __payment_id) {
			byte[] _payer_conv = InternalUtils.decodeUint8Array(_payer);
			org.ldk.structs.RouteParameters _route_params_hu_conv = null; if (_route_params < 0 || _route_params > 4096) { _route_params_hu_conv = new org.ldk.structs.RouteParameters(null, _route_params); }
			int _first_hops_conv_16_len = InternalUtils.getArrayLength(_first_hops);
			ChannelDetails[] _first_hops_conv_16_arr = new ChannelDetails[_first_hops_conv_16_len];
			if (_first_hops != null) {
				for (int q = 0; q < _first_hops_conv_16_len; q++) {
					long _first_hops_conv_16 = InternalUtils.getU64ArrayElem(_first_hops, q);
					org.ldk.structs.ChannelDetails _first_hops_conv_16_hu_conv = null; if (_first_hops_conv_16 < 0 || _first_hops_conv_16 > 4096) { _first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, _first_hops_conv_16); }
					if (_first_hops_conv_16_hu_conv != null) { _first_hops_conv_16_hu_conv.ptrs_to.AddLast(this); };
					_first_hops_conv_16_arr[q] = _first_hops_conv_16_hu_conv;
				}
			}
			bindings.free_buffer(_first_hops);
			org.ldk.structs.InFlightHtlcs _inflight_htlcs_hu_conv = null; if (_inflight_htlcs < 0 || _inflight_htlcs > 4096) { _inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, _inflight_htlcs); }
			if (_inflight_htlcs_hu_conv != null) { _inflight_htlcs_hu_conv.ptrs_to.AddLast(this); };
			byte[] __payment_hash_conv = InternalUtils.decodeUint8Array(__payment_hash);
			byte[] __payment_id_conv = InternalUtils.decodeUint8Array(__payment_id);
			Result_RouteLightningErrorZ ret = arg.find_route_with_id(_payer_conv, _route_params_hu_conv, _first_hops_conv_16_arr, _inflight_htlcs_hu_conv, __payment_hash_conv, __payment_id_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long create_blinded_payment_paths(long _recipient, long _first_hops, long _tlvs, long _amount_msats) {
			byte[] _recipient_conv = InternalUtils.decodeUint8Array(_recipient);
			int _first_hops_conv_16_len = InternalUtils.getArrayLength(_first_hops);
			ChannelDetails[] _first_hops_conv_16_arr = new ChannelDetails[_first_hops_conv_16_len];
			for (int q = 0; q < _first_hops_conv_16_len; q++) {
				long _first_hops_conv_16 = InternalUtils.getU64ArrayElem(_first_hops, q);
				org.ldk.structs.ChannelDetails _first_hops_conv_16_hu_conv = null; if (_first_hops_conv_16 < 0 || _first_hops_conv_16 > 4096) { _first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, _first_hops_conv_16); }
				if (_first_hops_conv_16_hu_conv != null) { _first_hops_conv_16_hu_conv.ptrs_to.AddLast(this); };
				_first_hops_conv_16_arr[q] = _first_hops_conv_16_hu_conv;
			}
			bindings.free_buffer(_first_hops);
			org.ldk.structs.ReceiveTlvs _tlvs_hu_conv = null; if (_tlvs < 0 || _tlvs > 4096) { _tlvs_hu_conv = new org.ldk.structs.ReceiveTlvs(null, _tlvs); }
			if (_tlvs_hu_conv != null) { _tlvs_hu_conv.ptrs_to.AddLast(this); };
			Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret = arg.create_blinded_payment_paths(_recipient_conv, _first_hops_conv_16_arr, _tlvs_hu_conv, _amount_msats);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}

	/** Creates a new instance of Router from a given implementation */
	public static Router new_impl(RouterInterface arg, MessageRouterInterface messageRouter_impl) {
		LDKRouterHolder impl_holder = new LDKRouterHolder();
		LDKRouterImpl impl = new LDKRouterImpl(arg, impl_holder);
		MessageRouter messageRouter = MessageRouter.new_impl(messageRouter_impl);
		long[] ptr_idx = bindings.LDKRouter_new(impl, messageRouter.instance_idx);

		impl_holder.held = new Router(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		impl_holder.held.ptrs_to.AddLast(messageRouter);
		return impl_holder.held;
	}

	/**
	 * Finds a [`Route`] for a payment between the given `payer` and a payee.
	 * 
	 * The `payee` and the payment's value are given in [`RouteParameters::payment_params`]
	 * and [`RouteParameters::final_value_msat`], respectively.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route(byte[] payer, org.ldk.structs.RouteParameters route_params, ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs) {
		long ret = bindings.Router_find_route(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payer, 33)), route_params == null ? 0 : route_params.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(first_hops, first_hops_conv_16 => first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr)), inflight_htlcs == null ? 0 : inflight_htlcs.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(payer);
		GC.KeepAlive(route_params);
		GC.KeepAlive(first_hops);
		GC.KeepAlive(inflight_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route_params); };
		if (first_hops != null) { foreach (ChannelDetails first_hops_conv_16 in first_hops) { if (this != null) { this.ptrs_to.AddLast(first_hops_conv_16); }; } };
		if (this != null) { this.ptrs_to.AddLast(inflight_htlcs); };
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
	public Result_RouteLightningErrorZ find_route_with_id(byte[] payer, org.ldk.structs.RouteParameters route_params, ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
		long ret = bindings.Router_find_route_with_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payer, 33)), route_params == null ? 0 : route_params.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(first_hops, first_hops_conv_16 => first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr)), inflight_htlcs == null ? 0 : inflight_htlcs.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(_payment_hash, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(_payment_id, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(payer);
		GC.KeepAlive(route_params);
		GC.KeepAlive(first_hops);
		GC.KeepAlive(inflight_htlcs);
		GC.KeepAlive(_payment_hash);
		GC.KeepAlive(_payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route_params); };
		if (first_hops != null) { foreach (ChannelDetails first_hops_conv_16 in first_hops) { if (this != null) { this.ptrs_to.AddLast(first_hops_conv_16); }; } };
		if (this != null) { this.ptrs_to.AddLast(inflight_htlcs); };
		return ret_hu_conv;
	}

	/**
	 * Creates [`BlindedPath`]s for payment to the `recipient` node. The channels in `first_hops`
	 * are assumed to be with the `recipient`'s peers. The payment secret and any constraints are
	 * given in `tlvs`.
	 */
	public Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ create_blinded_payment_paths(byte[] recipient, ChannelDetails[] first_hops, org.ldk.structs.ReceiveTlvs tlvs, long amount_msats) {
		long ret = bindings.Router_create_blinded_payment_paths(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(recipient, 33)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(first_hops, first_hops_conv_16 => first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr)), tlvs == null ? 0 : tlvs.ptr, amount_msats);
		GC.KeepAlive(this);
		GC.KeepAlive(recipient);
		GC.KeepAlive(first_hops);
		GC.KeepAlive(tlvs);
		GC.KeepAlive(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		foreach (ChannelDetails first_hops_conv_16 in first_hops) { if (this != null) { this.ptrs_to.AddLast(first_hops_conv_16); }; };
		if (this != null) { this.ptrs_to.AddLast(tlvs); };
		return ret_hu_conv;
	}

}
} } }

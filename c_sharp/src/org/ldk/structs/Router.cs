using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait defining behavior for routing a payment.
 */
public class Router : CommonBase {
	internal readonly bindings.LDKRouter bindings_instance;
	internal Router(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Router(bindings.LDKRouter arg) : base(bindings.LDKRouter_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Router() {
		if (ptr != 0) { bindings.Router_free(ptr); }
	}

	public interface RouterInterface {
		/**
		 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route(byte[] _payer, RouteParameters _route_params, ChannelDetails[] _first_hops, InFlightHtlcs _inflight_htlcs);
		/**
		 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values. Includes
		 * `PaymentHash` and `PaymentId` to be able to correlate the request with a specific payment.
		 * 
		 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_RouteLightningErrorZ find_route_with_id(byte[] _payer, RouteParameters _route_params, ChannelDetails[] _first_hops, InFlightHtlcs _inflight_htlcs, byte[] __payment_hash, byte[] __payment_id);
		/**
		 * Lets the router know that payment through a specific path has failed.
		 */
		void notify_payment_path_failed(RouteHop[] _path, long _short_channel_id);
		/**
		 * Lets the router know that payment through a specific path was successful.
		 */
		void notify_payment_path_successful(RouteHop[] _path);
		/**
		 * Lets the router know that a payment probe was successful.
		 */
		void notify_payment_probe_successful(RouteHop[] _path);
		/**
		 * Lets the router know that a payment probe failed.
		 */
		void notify_payment_probe_failed(RouteHop[] _path, long _short_channel_id);
	}
	private class LDKRouterHolder { internal Router held; }
	private class LDKRouterImpl : bindings.LDKRouter {
		internal LDKRouterImpl(RouterInterface arg, LDKRouterHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private RouterInterface arg;
		private LDKRouterHolder impl_holder;
		public long find_route(byte[] _payer, long _route_params, long[] _first_hops, long _inflight_htlcs) {
			org.ldk.structs.RouteParameters _route_params_hu_conv = null; if (_route_params < 0 || _route_params > 4096) { _route_params_hu_conv = new org.ldk.structs.RouteParameters(null, _route_params); }
			int _first_hops_conv_16_len = _first_hops.Length;
			ChannelDetails[] _first_hops_conv_16_arr = new ChannelDetails[_first_hops_conv_16_len];
			if (_first_hops != null) {
				for (int q = 0; q < _first_hops_conv_16_len; q++) {
					long _first_hops_conv_16 = _first_hops[q];
					org.ldk.structs.ChannelDetails _first_hops_conv_16_hu_conv = null; if (_first_hops_conv_16 < 0 || _first_hops_conv_16 > 4096) { _first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, _first_hops_conv_16); }
					if (_first_hops_conv_16_hu_conv != null) { _first_hops_conv_16_hu_conv.ptrs_to.AddLast(this); };
					_first_hops_conv_16_arr[q] = _first_hops_conv_16_hu_conv;
				}
			}
			org.ldk.structs.InFlightHtlcs _inflight_htlcs_hu_conv = null; if (_inflight_htlcs < 0 || _inflight_htlcs > 4096) { _inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, _inflight_htlcs); }
			if (_inflight_htlcs_hu_conv != null) { _inflight_htlcs_hu_conv.ptrs_to.AddLast(this); };
			Result_RouteLightningErrorZ ret = arg.find_route(_payer, _route_params_hu_conv, _first_hops_conv_16_arr, _inflight_htlcs_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long find_route_with_id(byte[] _payer, long _route_params, long[] _first_hops, long _inflight_htlcs, byte[] __payment_hash, byte[] __payment_id) {
			org.ldk.structs.RouteParameters _route_params_hu_conv = null; if (_route_params < 0 || _route_params > 4096) { _route_params_hu_conv = new org.ldk.structs.RouteParameters(null, _route_params); }
			int _first_hops_conv_16_len = _first_hops.Length;
			ChannelDetails[] _first_hops_conv_16_arr = new ChannelDetails[_first_hops_conv_16_len];
			if (_first_hops != null) {
				for (int q = 0; q < _first_hops_conv_16_len; q++) {
					long _first_hops_conv_16 = _first_hops[q];
					org.ldk.structs.ChannelDetails _first_hops_conv_16_hu_conv = null; if (_first_hops_conv_16 < 0 || _first_hops_conv_16 > 4096) { _first_hops_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, _first_hops_conv_16); }
					if (_first_hops_conv_16_hu_conv != null) { _first_hops_conv_16_hu_conv.ptrs_to.AddLast(this); };
					_first_hops_conv_16_arr[q] = _first_hops_conv_16_hu_conv;
				}
			}
			org.ldk.structs.InFlightHtlcs _inflight_htlcs_hu_conv = null; if (_inflight_htlcs < 0 || _inflight_htlcs > 4096) { _inflight_htlcs_hu_conv = new org.ldk.structs.InFlightHtlcs(null, _inflight_htlcs); }
			if (_inflight_htlcs_hu_conv != null) { _inflight_htlcs_hu_conv.ptrs_to.AddLast(this); };
			Result_RouteLightningErrorZ ret = arg.find_route_with_id(_payer, _route_params_hu_conv, _first_hops_conv_16_arr, _inflight_htlcs_hu_conv, __payment_hash, __payment_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void notify_payment_path_failed(long[] _path, long _short_channel_id) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.notify_payment_path_failed(_path_conv_10_arr, _short_channel_id);
				GC.KeepAlive(arg);
		}
		public void notify_payment_path_successful(long[] _path) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.notify_payment_path_successful(_path_conv_10_arr);
				GC.KeepAlive(arg);
		}
		public void notify_payment_probe_successful(long[] _path) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.notify_payment_probe_successful(_path_conv_10_arr);
				GC.KeepAlive(arg);
		}
		public void notify_payment_probe_failed(long[] _path, long _short_channel_id) {
			int _path_conv_10_len = _path.Length;
			RouteHop[] _path_conv_10_arr = new RouteHop[_path_conv_10_len];
			for (int k = 0; k < _path_conv_10_len; k++) {
				long _path_conv_10 = _path[k];
				org.ldk.structs.RouteHop _path_conv_10_hu_conv = null; if (_path_conv_10 < 0 || _path_conv_10 > 4096) { _path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, _path_conv_10); }
				if (_path_conv_10_hu_conv != null) { _path_conv_10_hu_conv.ptrs_to.AddLast(this); };
				_path_conv_10_arr[k] = _path_conv_10_hu_conv;
			}
			arg.notify_payment_probe_failed(_path_conv_10_arr, _short_channel_id);
				GC.KeepAlive(arg);
		}
	}
	public static Router new_impl(RouterInterface arg) {
		LDKRouterHolder impl_holder = new LDKRouterHolder();
		impl_holder.held = new Router(new LDKRouterImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route(byte[] payer, org.ldk.structs.RouteParameters route_params, ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs) {
		long ret = bindings.Router_find_route(this.ptr, InternalUtils.check_arr_len(payer, 33), route_params == null ? 0 : route_params.ptr, first_hops != null ? InternalUtils.mapArray(first_hops, first_hops_conv_16 => first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr) : null, inflight_htlcs == null ? 0 : inflight_htlcs.ptr);
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
	 * Finds a [`Route`] between `payer` and `payee` for a payment with the given values. Includes
	 * `PaymentHash` and `PaymentId` to be able to correlate the request with a specific payment.
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_RouteLightningErrorZ find_route_with_id(byte[] payer, org.ldk.structs.RouteParameters route_params, ChannelDetails[] first_hops, org.ldk.structs.InFlightHtlcs inflight_htlcs, byte[] _payment_hash, byte[] _payment_id) {
		long ret = bindings.Router_find_route_with_id(this.ptr, InternalUtils.check_arr_len(payer, 33), route_params == null ? 0 : route_params.ptr, first_hops != null ? InternalUtils.mapArray(first_hops, first_hops_conv_16 => first_hops_conv_16 == null ? 0 : first_hops_conv_16.ptr) : null, inflight_htlcs == null ? 0 : inflight_htlcs.ptr, InternalUtils.check_arr_len(_payment_hash, 32), InternalUtils.check_arr_len(_payment_id, 32));
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
	 * Lets the router know that payment through a specific path has failed.
	 */
	public void notify_payment_path_failed(RouteHop[] path, long short_channel_id) {
		bindings.Router_notify_payment_path_failed(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Lets the router know that payment through a specific path was successful.
	 */
	public void notify_payment_path_successful(RouteHop[] path) {
		bindings.Router_notify_payment_path_successful(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Lets the router know that a payment probe was successful.
	 */
	public void notify_payment_probe_successful(RouteHop[] path) {
		bindings.Router_notify_payment_probe_successful(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

	/**
	 * Lets the router know that a payment probe failed.
	 */
	public void notify_payment_probe_failed(RouteHop[] path, long short_channel_id) {
		bindings.Router_notify_payment_probe_failed(this.ptr, path != null ? InternalUtils.mapArray(path, path_conv_10 => path_conv_10 == null ? 0 : path_conv_10.ptr) : null, short_channel_id);
		GC.KeepAlive(this);
		GC.KeepAlive(path);
		GC.KeepAlive(short_channel_id);
		foreach (RouteHop path_conv_10 in path) { if (this != null) { this.ptrs_to.AddLast(path_conv_10); }; };
	}

}
} } }

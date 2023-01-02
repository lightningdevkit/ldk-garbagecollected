using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait defining behavior of an [`Invoice`] payer.
 * 
 * While the behavior of [`InvoicePayer`] provides idempotency of duplicate `send_*payment` calls
 * with the same [`PaymentHash`], it is up to the `Payer` to provide idempotency across restarts.
 * 
 * [`ChannelManager`] provides idempotency for duplicate payments with the same [`PaymentId`].
 * 
 * In order to trivially ensure idempotency for payments, the default `Payer` implementation
 * reuses the [`PaymentHash`] bytes as the [`PaymentId`]. Custom implementations wishing to
 * provide payment idempotency with a different idempotency key (i.e. [`PaymentId`]) should map
 * the [`Invoice`] or spontaneous payment target pubkey to their own idempotency key.
 * 
 * [`ChannelManager`]: lightning::ln::channelmanager::ChannelManager
 */
public class Payer : CommonBase {
	internal readonly bindings.LDKPayer bindings_instance;
	internal Payer(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private Payer(bindings.LDKPayer arg) : base(bindings.LDKPayer_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~Payer() {
		if (ptr != 0) { bindings.Payer_free(ptr); }
	}

	public interface PayerInterface {
		/**
		 * Returns the payer's node id.
		 */
		byte[] node_id();
		/**
		 * Returns the payer's channels.
		 */
		ChannelDetails[] first_hops();
		/**
		 * Sends a payment over the Lightning Network using the given [`Route`].
		 * 
		 * Note that payment_secret (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		Result_NonePaymentSendFailureZ send_payment(Route _route, byte[] _payment_hash, byte[] _payment_secret, byte[] _payment_id);
		/**
		 * Sends a spontaneous payment over the Lightning Network using the given [`Route`].
		 */
		Result_NonePaymentSendFailureZ send_spontaneous_payment(Route _route, byte[] _payment_preimage, byte[] _payment_id);
		/**
		 * Retries a failed payment path for the [`PaymentId`] using the given [`Route`].
		 */
		Result_NonePaymentSendFailureZ retry_payment(Route _route, byte[] _payment_id);
		/**
		 * Signals that no further retries for the given payment will occur.
		 */
		void abandon_payment(byte[] _payment_id);
		/**
		 * Construct an [`InFlightHtlcs`] containing information about currently used up liquidity
		 * across payments.
		 */
		InFlightHtlcs inflight_htlcs();
	}
	private class LDKPayerHolder { internal Payer held; }
	private class LDKPayerImpl : bindings.LDKPayer {
		internal LDKPayerImpl(PayerInterface arg, LDKPayerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private PayerInterface arg;
		private LDKPayerHolder impl_holder;
		public byte[] node_id() {
			byte[] ret = arg.node_id();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 33);
			return result;
		}
		public long[] first_hops() {
			ChannelDetails[] ret = arg.first_hops();
				GC.KeepAlive(arg);
			long[] result = ret != null ? InternalUtils.mapArray(ret, ret_conv_16 => ret_conv_16 == null ? 0 : ret_conv_16.clone_ptr()) : null;
			return result;
		}
		public long send_payment(long _route, byte[] _payment_hash, byte[] _payment_secret, byte[] _payment_id) {
			org.ldk.structs.Route _route_hu_conv = null; if (_route < 0 || _route > 4096) { _route_hu_conv = new org.ldk.structs.Route(null, _route); }
			Result_NonePaymentSendFailureZ ret = arg.send_payment(_route_hu_conv, _payment_hash, _payment_secret, _payment_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long send_spontaneous_payment(long _route, byte[] _payment_preimage, byte[] _payment_id) {
			org.ldk.structs.Route _route_hu_conv = null; if (_route < 0 || _route > 4096) { _route_hu_conv = new org.ldk.structs.Route(null, _route); }
			Result_NonePaymentSendFailureZ ret = arg.send_spontaneous_payment(_route_hu_conv, _payment_preimage, _payment_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long retry_payment(long _route, byte[] _payment_id) {
			org.ldk.structs.Route _route_hu_conv = null; if (_route < 0 || _route > 4096) { _route_hu_conv = new org.ldk.structs.Route(null, _route); }
			Result_NonePaymentSendFailureZ ret = arg.retry_payment(_route_hu_conv, _payment_id);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void abandon_payment(byte[] _payment_id) {
			arg.abandon_payment(_payment_id);
				GC.KeepAlive(arg);
		}
		public long inflight_htlcs() {
			InFlightHtlcs ret = arg.inflight_htlcs();
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
	}
	public static Payer new_impl(PayerInterface arg) {
		LDKPayerHolder impl_holder = new LDKPayerHolder();
		impl_holder.held = new Payer(new LDKPayerImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Returns the payer's node id.
	 */
	public byte[] node_id() {
		byte[] ret = bindings.Payer_node_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the payer's channels.
	 */
	public ChannelDetails[] first_hops() {
		long[] ret = bindings.Payer_first_hops(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_16_len = ret.Length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Sends a payment over the Lightning Network using the given [`Route`].
	 * 
	 * Note that payment_secret (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NonePaymentSendFailureZ send_payment(org.ldk.structs.Route route, byte[] payment_hash, byte[] payment_secret, byte[] payment_id) {
		long ret = bindings.Payer_send_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32), InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(payment_secret);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Sends a spontaneous payment over the Lightning Network using the given [`Route`].
	 */
	public Result_NonePaymentSendFailureZ send_spontaneous_payment(org.ldk.structs.Route route, byte[] payment_preimage, byte[] payment_id) {
		long ret = bindings.Payer_send_spontaneous_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_preimage);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Retries a failed payment path for the [`PaymentId`] using the given [`Route`].
	 */
	public Result_NonePaymentSendFailureZ retry_payment(org.ldk.structs.Route route, byte[] payment_id) {
		long ret = bindings.Payer_retry_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Signals that no further retries for the given payment will occur.
	 */
	public void abandon_payment(byte[] payment_id) {
		bindings.Payer_abandon_payment(this.ptr, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_id);
	}

	/**
	 * Construct an [`InFlightHtlcs`] containing information about currently used up liquidity
	 * across payments.
	 */
	public InFlightHtlcs inflight_htlcs() {
		long ret = bindings.Payer_inflight_htlcs(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

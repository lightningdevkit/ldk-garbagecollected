package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

/**
 * A trait defining behavior of an [`Invoice`] payer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Payer extends CommonBase {
	final bindings.LDKPayer bindings_instance;
	Payer(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Payer(bindings.LDKPayer arg) {
		super(bindings.LDKPayer_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Payer_free(ptr); } super.finalize();
	}

	public static interface PayerInterface {
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
		Result_PaymentIdPaymentSendFailureZ send_payment(Route route, byte[] payment_hash, byte[] payment_secret);
		/**
		 * Retries a failed payment path for the [`PaymentId`] using the given [`Route`].
		 */
		Result_NonePaymentSendFailureZ retry_payment(Route route, byte[] payment_id);
	}
	private static class LDKPayerHolder { Payer held; }
	public static Payer new_impl(PayerInterface arg) {
		final LDKPayerHolder impl_holder = new LDKPayerHolder();
		impl_holder.held = new Payer(new bindings.LDKPayer() {
			@Override public byte[] node_id() {
				byte[] ret = arg.node_id();
				return ret;
			}
			@Override public long[] first_hops() {
				ChannelDetails[] ret = arg.first_hops();
				long[] result = ret != null ? Arrays.stream(ret).mapToLong(ret_conv_16 -> ret_conv_16 == null ? 0 : ret_conv_16.ptr & ~1).toArray() : null;
				return result;
			}
			@Override public long send_payment(long route, byte[] payment_hash, byte[] payment_secret) {
				Route route_hu_conv = null; if (route < 0 || route > 4096) { route_hu_conv = new Route(null, route); }
				Result_PaymentIdPaymentSendFailureZ ret = arg.send_payment(route_hu_conv, payment_hash, payment_secret);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long retry_payment(long route, byte[] payment_id) {
				Route route_hu_conv = null; if (route < 0 || route > 4096) { route_hu_conv = new Route(null, route); }
				Result_NonePaymentSendFailureZ ret = arg.retry_payment(route_hu_conv, payment_id);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Returns the payer's node id.
	 */
	public byte[] node_id() {
		byte[] ret = bindings.Payer_node_id(this.ptr);
		return ret;
	}

	/**
	 * Returns the payer's channels.
	 */
	public ChannelDetails[] first_hops() {
		long[] ret = bindings.Payer_first_hops(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			long ret_conv_16 = ret[q];
			ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new ChannelDetails(null, ret_conv_16); }
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Sends a payment over the Lightning Network using the given [`Route`].
	 * 
	 * Note that payment_secret (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_PaymentIdPaymentSendFailureZ send_payment(Route route, byte[] payment_hash, @Nullable byte[] payment_secret) {
		long ret = bindings.Payer_send_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_hash, payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	/**
	 * Retries a failed payment path for the [`PaymentId`] using the given [`Route`].
	 */
	public Result_NonePaymentSendFailureZ retry_payment(Route route, byte[] payment_id) {
		long ret = bindings.Payer_retry_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

}

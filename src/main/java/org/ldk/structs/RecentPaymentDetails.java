package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Used by [`ChannelManager::list_recent_payments`] to express the status of recent payments.
 * These include payments that have yet to find a successful path, or have unresolved HTLCs.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RecentPaymentDetails extends CommonBase {
	private RecentPaymentDetails(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RecentPaymentDetails_free(ptr); }
	}
	static RecentPaymentDetails constr_from_ptr(long ptr) {
		bindings.LDKRecentPaymentDetails raw_val = bindings.LDKRecentPaymentDetails_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKRecentPaymentDetails.AwaitingInvoice.class) {
			return new AwaitingInvoice(ptr, (bindings.LDKRecentPaymentDetails.AwaitingInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKRecentPaymentDetails.Pending.class) {
			return new Pending(ptr, (bindings.LDKRecentPaymentDetails.Pending)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKRecentPaymentDetails.Fulfilled.class) {
			return new Fulfilled(ptr, (bindings.LDKRecentPaymentDetails.Fulfilled)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKRecentPaymentDetails.Abandoned.class) {
			return new Abandoned(ptr, (bindings.LDKRecentPaymentDetails.Abandoned)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When an invoice was requested and thus a payment has not yet been sent.
	 */
	public final static class AwaitingInvoice extends RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		*/
		public final byte[] payment_id;
		private AwaitingInvoice(long ptr, bindings.LDKRecentPaymentDetails.AwaitingInvoice obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
		}
	}
	/**
	 * When a payment is still being sent and awaiting successful delivery.
	 */
	public final static class Pending extends RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		*/
		public final byte[] payment_id;
		/**
		 * Hash of the payment that is currently being sent but has yet to be fulfilled or
		 * abandoned.
		*/
		public final byte[] payment_hash;
		/**
		 * Total amount (in msat, excluding fees) across all paths for this payment,
		 * not just the amount currently inflight.
		*/
		public final long total_msat;
		private Pending(long ptr, bindings.LDKRecentPaymentDetails.Pending obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			this.total_msat = obj.total_msat;
		}
	}
	/**
	 * When a pending payment is fulfilled, we continue tracking it until all pending HTLCs have
	 * been resolved. Upon receiving [`Event::PaymentSent`], we delay for a few minutes before the
	 * payment is removed from tracking.
	 */
	public final static class Fulfilled extends RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		*/
		public final byte[] payment_id;
		/**
		 * Hash of the payment that was claimed. `None` for serializations of [`ChannelManager`]
		 * made before LDK version 0.0.104.
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash;
		private Fulfilled(long ptr, bindings.LDKRecentPaymentDetails.Fulfilled obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			long payment_hash = obj.payment_hash;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.add(this); };
			this.payment_hash = payment_hash_hu_conv;
		}
	}
	/**
	 * After a payment's retries are exhausted per the provided [`Retry`], or it is explicitly
	 * abandoned via [`ChannelManager::abandon_payment`], it is marked as abandoned until all
	 * pending HTLCs for this payment resolve and an [`Event::PaymentFailed`] is generated.
	 */
	public final static class Abandoned extends RecentPaymentDetails {
		/**
		 * A user-provided identifier in [`ChannelManager::send_payment`] used to uniquely identify
		 * a payment and ensure idempotency in LDK.
		*/
		public final byte[] payment_id;
		/**
		 * Hash of the payment that we have given up trying to send.
		*/
		public final byte[] payment_hash;
		private Abandoned(long ptr, bindings.LDKRecentPaymentDetails.Abandoned obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
		}
	}
	long clone_ptr() {
		long ret = bindings.RecentPaymentDetails_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the RecentPaymentDetails
	 */
	public RecentPaymentDetails clone() {
		long ret = bindings.RecentPaymentDetails_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AwaitingInvoice-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails awaiting_invoice(byte[] payment_id) {
		long ret = bindings.RecentPaymentDetails_awaiting_invoice(InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Pending-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails pending(byte[] payment_id, byte[] payment_hash, long total_msat) {
		long ret = bindings.RecentPaymentDetails_pending(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), total_msat);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(total_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Fulfilled-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails fulfilled(byte[] payment_id, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash) {
		long ret = bindings.RecentPaymentDetails_fulfilled(InternalUtils.check_arr_len(payment_id, 32), payment_hash.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(payment_hash); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Abandoned-variant RecentPaymentDetails
	 */
	public static RecentPaymentDetails abandoned(byte[] payment_id, byte[] payment_hash) {
		long ret = bindings.RecentPaymentDetails_abandoned(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RecentPaymentDetails ret_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

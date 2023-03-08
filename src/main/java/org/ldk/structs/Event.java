package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An Event which you should probably take some action in response to.
 * 
 * Note that while Writeable and Readable are implemented for Event, you probably shouldn't use
 * them directly as they don't round-trip exactly (for example FundingGenerationReady is never
 * written as it makes no sense to respond to it after reconnecting to peers).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Event extends CommonBase {
	private Event(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Event_free(ptr); }
	}
	static Event constr_from_ptr(long ptr) {
		bindings.LDKEvent raw_val = bindings.LDKEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKEvent.FundingGenerationReady.class) {
			return new FundingGenerationReady(ptr, (bindings.LDKEvent.FundingGenerationReady)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentClaimable.class) {
			return new PaymentClaimable(ptr, (bindings.LDKEvent.PaymentClaimable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentClaimed.class) {
			return new PaymentClaimed(ptr, (bindings.LDKEvent.PaymentClaimed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentSent.class) {
			return new PaymentSent(ptr, (bindings.LDKEvent.PaymentSent)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentFailed.class) {
			return new PaymentFailed(ptr, (bindings.LDKEvent.PaymentFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentPathSuccessful.class) {
			return new PaymentPathSuccessful(ptr, (bindings.LDKEvent.PaymentPathSuccessful)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentPathFailed.class) {
			return new PaymentPathFailed(ptr, (bindings.LDKEvent.PaymentPathFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ProbeSuccessful.class) {
			return new ProbeSuccessful(ptr, (bindings.LDKEvent.ProbeSuccessful)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ProbeFailed.class) {
			return new ProbeFailed(ptr, (bindings.LDKEvent.ProbeFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PendingHTLCsForwardable.class) {
			return new PendingHTLCsForwardable(ptr, (bindings.LDKEvent.PendingHTLCsForwardable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.HTLCIntercepted.class) {
			return new HTLCIntercepted(ptr, (bindings.LDKEvent.HTLCIntercepted)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpendableOutputs.class) {
			return new SpendableOutputs(ptr, (bindings.LDKEvent.SpendableOutputs)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentForwarded.class) {
			return new PaymentForwarded(ptr, (bindings.LDKEvent.PaymentForwarded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelReady.class) {
			return new ChannelReady(ptr, (bindings.LDKEvent.ChannelReady)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKEvent.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.DiscardFunding.class) {
			return new DiscardFunding(ptr, (bindings.LDKEvent.DiscardFunding)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.OpenChannelRequest.class) {
			return new OpenChannelRequest(ptr, (bindings.LDKEvent.OpenChannelRequest)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.HTLCHandlingFailed.class) {
			return new HTLCHandlingFailed(ptr, (bindings.LDKEvent.HTLCHandlingFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Used to indicate that the client should generate a funding transaction with the given
	 * parameters and then call [`ChannelManager::funding_transaction_generated`].
	 * Generated in [`ChannelManager`] message handling.
	 * Note that *all inputs* in the funding transaction must spend SegWit outputs or your
	 * counterparty can steal your funds!
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public final static class FundingGenerationReady extends Event {
		/**
		 * The random channel_id we picked which you'll need to pass into
		 * [`ChannelManager::funding_transaction_generated`].
		 * 
		 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
		*/
		public final byte[] temporary_channel_id;
		/**
		 * The counterparty's node_id, which you'll need to pass back into
		 * [`ChannelManager::funding_transaction_generated`].
		 * 
		 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The value, in satoshis, that the output should have.
		*/
		public final long channel_value_satoshis;
		/**
		 * The script which should be used in the transaction output.
		*/
		public final byte[] output_script;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`], or a
		 * random value for an inbound channel. This may be zero for objects serialized with LDK
		 * versions prior to 0.0.113.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		private FundingGenerationReady(long ptr, bindings.LDKEvent.FundingGenerationReady obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.counterparty_node_id = obj.counterparty_node_id;
			this.channel_value_satoshis = obj.channel_value_satoshis;
			this.output_script = obj.output_script;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
		}
	}
	/**
	 * Indicates that we've been offered a payment and it needs to be claimed via calling
	 * [`ChannelManager::claim_funds`] with the preimage given in [`PaymentPurpose`].
	 * 
	 * Note that if the preimage is not known, you should call
	 * [`ChannelManager::fail_htlc_backwards`] or [`ChannelManager::fail_htlc_backwards_with_reason`]
	 * to free up resources for this HTLC and avoid network congestion.
	 * If you fail to call either [`ChannelManager::claim_funds`], [`ChannelManager::fail_htlc_backwards`],
	 * or [`ChannelManager::fail_htlc_backwards_with_reason`] within the HTLC's timeout, the HTLC will be
	 * automatically failed.
	 * 
	 * # Note
	 * LDK will not stop an inbound payment from being paid multiple times, so multiple
	 * `PaymentClaimable` events may be generated for the same payment.
	 * 
	 * # Note
	 * This event used to be called `PaymentReceived` in LDK versions 0.0.112 and earlier.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 * [`ChannelManager::fail_htlc_backwards`]: crate::ln::channelmanager::ChannelManager::fail_htlc_backwards
	 * [`ChannelManager::fail_htlc_backwards_with_reason`]: crate::ln::channelmanager::ChannelManager::fail_htlc_backwards_with_reason
	 */
	public final static class PaymentClaimable extends Event {
		/**
		 * The node that will receive the payment after it has been claimed.
		 * This is useful to identify payments received via [phantom nodes].
		 * This field will always be filled in when the event was generated by LDK versions
		 * 0.0.113 and above.
		 * 
		 * [phantom nodes]: crate::chain::keysinterface::PhantomKeysManager
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] receiver_node_id;
		/**
		 * The hash for which the preimage should be handed to the ChannelManager. Note that LDK will
		 * not stop you from registering duplicate payment hashes for inbound payments.
		*/
		public final byte[] payment_hash;
		/**
		 * The value, in thousandths of a satoshi, that this payment is for.
		*/
		public final long amount_msat;
		/**
		 * Information for claiming this received payment, based on whether the purpose of the
		 * payment is to pay an invoice or to send a spontaneous payment.
		*/
		public final org.ldk.structs.PaymentPurpose purpose;
		/**
		 * The `channel_id` indicating over which channel we received the payment.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] via_channel_id;
		/**
		 * The `user_channel_id` indicating over which channel we received the payment.
		*/
		public final org.ldk.structs.Option_u128Z via_user_channel_id;
		private PaymentClaimable(long ptr, bindings.LDKEvent.PaymentClaimable obj) {
			super(null, ptr);
			this.receiver_node_id = obj.receiver_node_id;
			this.payment_hash = obj.payment_hash;
			this.amount_msat = obj.amount_msat;
			long purpose = obj.purpose;
			org.ldk.structs.PaymentPurpose purpose_hu_conv = org.ldk.structs.PaymentPurpose.constr_from_ptr(purpose);
			if (purpose_hu_conv != null) { purpose_hu_conv.ptrs_to.add(this); };
			this.purpose = purpose_hu_conv;
			this.via_channel_id = obj.via_channel_id;
			long via_user_channel_id = obj.via_user_channel_id;
			org.ldk.structs.Option_u128Z via_user_channel_id_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(via_user_channel_id);
			if (via_user_channel_id_hu_conv != null) { via_user_channel_id_hu_conv.ptrs_to.add(this); };
			this.via_user_channel_id = via_user_channel_id_hu_conv;
		}
	}
	/**
	 * Indicates a payment has been claimed and we've received money!
	 * 
	 * This most likely occurs when [`ChannelManager::claim_funds`] has been called in response
	 * to an [`Event::PaymentClaimable`]. However, if we previously crashed during a
	 * [`ChannelManager::claim_funds`] call you may see this event without a corresponding
	 * [`Event::PaymentClaimable`] event.
	 * 
	 * # Note
	 * LDK will not stop an inbound payment from being paid multiple times, so multiple
	 * `PaymentClaimable` events may be generated for the same payment. If you then call
	 * [`ChannelManager::claim_funds`] twice for the same [`Event::PaymentClaimable`] you may get
	 * multiple `PaymentClaimed` events.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public final static class PaymentClaimed extends Event {
		/**
		 * The node that received the payment.
		 * This is useful to identify payments which were received via [phantom nodes].
		 * This field will always be filled in when the event was generated by LDK versions
		 * 0.0.113 and above.
		 * 
		 * [phantom nodes]: crate::chain::keysinterface::PhantomKeysManager
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] receiver_node_id;
		/**
		 * The payment hash of the claimed payment. Note that LDK will not stop you from
		 * registering duplicate payment hashes for inbound payments.
		*/
		public final byte[] payment_hash;
		/**
		 * The value, in thousandths of a satoshi, that this payment is for.
		*/
		public final long amount_msat;
		/**
		 * The purpose of the claimed payment, i.e. whether the payment was for an invoice or a
		 * spontaneous payment.
		*/
		public final org.ldk.structs.PaymentPurpose purpose;
		private PaymentClaimed(long ptr, bindings.LDKEvent.PaymentClaimed obj) {
			super(null, ptr);
			this.receiver_node_id = obj.receiver_node_id;
			this.payment_hash = obj.payment_hash;
			this.amount_msat = obj.amount_msat;
			long purpose = obj.purpose;
			org.ldk.structs.PaymentPurpose purpose_hu_conv = org.ldk.structs.PaymentPurpose.constr_from_ptr(purpose);
			if (purpose_hu_conv != null) { purpose_hu_conv.ptrs_to.add(this); };
			this.purpose = purpose_hu_conv;
		}
	}
	/**
	 * Indicates an outbound payment we made succeeded (i.e. it made it all the way to its target
	 * and we got back the payment preimage for it).
	 * 
	 * Note for MPP payments: in rare cases, this event may be preceded by a `PaymentPathFailed`
	 * event. In this situation, you SHOULD treat this payment as having succeeded.
	 */
	public final static class PaymentSent extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] payment_id;
		/**
		 * The preimage to the hash given to ChannelManager::send_payment.
		 * Note that this serves as a payment receipt, if you wish to have such a thing, you must
		 * store it somehow!
		*/
		public final byte[] payment_preimage;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_hash;
		/**
		 * The total fee which was spent at intermediate hops in this payment, across all paths.
		 * 
		 * Note that, like [`Route::get_total_fees`] this does *not* include any potential
		 * overpayment to the recipient node.
		 * 
		 * If the recipient or an intermediate node misbehaves and gives us free money, this may
		 * overstate the amount paid, though this is unlikely.
		 * 
		 * [`Route::get_total_fees`]: crate::routing::router::Route::get_total_fees
		*/
		public final org.ldk.structs.Option_u64Z fee_paid_msat;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_preimage = obj.payment_preimage;
			this.payment_hash = obj.payment_hash;
			long fee_paid_msat = obj.fee_paid_msat;
			org.ldk.structs.Option_u64Z fee_paid_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(fee_paid_msat);
			if (fee_paid_msat_hu_conv != null) { fee_paid_msat_hu_conv.ptrs_to.add(this); };
			this.fee_paid_msat = fee_paid_msat_hu_conv;
		}
	}
	/**
	 * Indicates an outbound payment failed. Individual [`Event::PaymentPathFailed`] events
	 * provide failure information for each path attempt in the payment, including retries.
	 * 
	 * This event is provided once there are no further pending HTLCs for the payment and the
	 * payment is no longer retryable, due either to the [`Retry`] provided or
	 * [`ChannelManager::abandon_payment`] having been called for the corresponding payment.
	 * 
	 * [`Retry`]: crate::ln::channelmanager::Retry
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class PaymentFailed extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::abandon_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
		*/
		public final byte[] payment_id;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_hash;
		private PaymentFailed(long ptr, bindings.LDKEvent.PaymentFailed obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
		}
	}
	/**
	 * Indicates that a path for an outbound payment was successful.
	 * 
	 * Always generated after [`Event::PaymentSent`] and thus useful for scoring channels. See
	 * [`Event::PaymentSent`] for obtaining the payment preimage.
	 */
	public final static class PaymentPathSuccessful extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_id;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] payment_hash;
		/**
		 * The payment path that was successful.
		 * 
		 * May contain a closed channel if the HTLC sent along the path was fulfilled on chain.
		*/
		public final RouteHop[] path;
		private PaymentPathSuccessful(long ptr, bindings.LDKEvent.PaymentPathSuccessful obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			long[] path = obj.path;
			int path_conv_10_len = path.length;
			RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
			for (int k = 0; k < path_conv_10_len; k++) {
				long path_conv_10 = path[k];
				org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
				if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
		}
	}
	/**
	 * Indicates an outbound HTLC we sent failed, likely due to an intermediary node being unable to
	 * handle the HTLC.
	 * 
	 * Note that this does *not* indicate that all paths for an MPP payment have failed, see
	 * [`Event::PaymentFailed`].
	 * 
	 * See [`ChannelManager::abandon_payment`] for giving up on this payment before its retries have
	 * been exhausted.
	 * 
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class PaymentPathFailed extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::abandon_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] payment_id;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_hash;
		/**
		 * Indicates the payment was rejected for some reason by the recipient. This implies that
		 * the payment has failed, not just the route in question. If this is not set, the payment may
		 * be retried via a different route.
		*/
		public final boolean payment_failed_permanently;
		/**
		 * Extra error details based on the failure type. May contain an update that needs to be
		 * applied to the [`NetworkGraph`].
		 * 
		 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
		*/
		public final org.ldk.structs.PathFailure failure;
		/**
		 * The payment path that failed.
		*/
		public final RouteHop[] path;
		/**
		 * The channel responsible for the failed payment path.
		 * 
		 * Note that for route hints or for the first hop in a path this may be an SCID alias and
		 * may not refer to a channel in the public network graph. These aliases may also collide
		 * with channels in the public network graph.
		 * 
		 * If this is `Some`, then the corresponding channel should be avoided when the payment is
		 * retried. May be `None` for older [`Event`] serializations.
		*/
		public final org.ldk.structs.Option_u64Z short_channel_id;
		/**
		 * Parameters used by LDK to compute a new [`Route`] when retrying the failed payment path.
		 * 
		 * [`Route`]: crate::routing::router::Route
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.RouteParameters retry;
		private PaymentPathFailed(long ptr, bindings.LDKEvent.PaymentPathFailed obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			this.payment_failed_permanently = obj.payment_failed_permanently;
			long failure = obj.failure;
			org.ldk.structs.PathFailure failure_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(failure);
			if (failure_hu_conv != null) { failure_hu_conv.ptrs_to.add(this); };
			this.failure = failure_hu_conv;
			long[] path = obj.path;
			int path_conv_10_len = path.length;
			RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
			for (int k = 0; k < path_conv_10_len; k++) {
				long path_conv_10 = path[k];
				org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
				if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
			long short_channel_id = obj.short_channel_id;
			org.ldk.structs.Option_u64Z short_channel_id_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(short_channel_id);
			if (short_channel_id_hu_conv != null) { short_channel_id_hu_conv.ptrs_to.add(this); };
			this.short_channel_id = short_channel_id_hu_conv;
			long retry = obj.retry;
			org.ldk.structs.RouteParameters retry_hu_conv = null; if (retry < 0 || retry > 4096) { retry_hu_conv = new org.ldk.structs.RouteParameters(null, retry); }
			if (retry_hu_conv != null) { retry_hu_conv.ptrs_to.add(this); };
			this.retry = retry_hu_conv;
		}
	}
	/**
	 * Indicates that a probe payment we sent returned successful, i.e., only failed at the destination.
	 */
	public final static class ProbeSuccessful extends Event {
		/**
		 * The id returned by [`ChannelManager::send_probe`].
		 * 
		 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
		*/
		public final byte[] payment_id;
		/**
		 * The hash generated by [`ChannelManager::send_probe`].
		 * 
		 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
		*/
		public final byte[] payment_hash;
		/**
		 * The payment path that was successful.
		*/
		public final RouteHop[] path;
		private ProbeSuccessful(long ptr, bindings.LDKEvent.ProbeSuccessful obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			long[] path = obj.path;
			int path_conv_10_len = path.length;
			RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
			for (int k = 0; k < path_conv_10_len; k++) {
				long path_conv_10 = path[k];
				org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
				if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
		}
	}
	/**
	 * Indicates that a probe payment we sent failed at an intermediary node on the path.
	 */
	public final static class ProbeFailed extends Event {
		/**
		 * The id returned by [`ChannelManager::send_probe`].
		 * 
		 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
		*/
		public final byte[] payment_id;
		/**
		 * The hash generated by [`ChannelManager::send_probe`].
		 * 
		 * [`ChannelManager::send_probe`]: crate::ln::channelmanager::ChannelManager::send_probe
		*/
		public final byte[] payment_hash;
		/**
		 * The payment path that failed.
		*/
		public final RouteHop[] path;
		/**
		 * The channel responsible for the failed probe.
		 * 
		 * Note that for route hints or for the first hop in a path this may be an SCID alias and
		 * may not refer to a channel in the public network graph. These aliases may also collide
		 * with channels in the public network graph.
		*/
		public final org.ldk.structs.Option_u64Z short_channel_id;
		private ProbeFailed(long ptr, bindings.LDKEvent.ProbeFailed obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			long[] path = obj.path;
			int path_conv_10_len = path.length;
			RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
			for (int k = 0; k < path_conv_10_len; k++) {
				long path_conv_10 = path[k];
				org.ldk.structs.RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new org.ldk.structs.RouteHop(null, path_conv_10); }
				if (path_conv_10_hu_conv != null) { path_conv_10_hu_conv.ptrs_to.add(this); };
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
			long short_channel_id = obj.short_channel_id;
			org.ldk.structs.Option_u64Z short_channel_id_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(short_channel_id);
			if (short_channel_id_hu_conv != null) { short_channel_id_hu_conv.ptrs_to.add(this); };
			this.short_channel_id = short_channel_id_hu_conv;
		}
	}
	/**
	 * Used to indicate that [`ChannelManager::process_pending_htlc_forwards`] should be called at
	 * a time in the future.
	 * 
	 * [`ChannelManager::process_pending_htlc_forwards`]: crate::ln::channelmanager::ChannelManager::process_pending_htlc_forwards
	 */
	public final static class PendingHTLCsForwardable extends Event {
		/**
		 * The minimum amount of time that should be waited prior to calling
		 * process_pending_htlc_forwards. To increase the effort required to correlate payments,
		 * you should wait a random amount of time in roughly the range (now + time_forwardable,
		 * now + 5*time_forwardable).
		*/
		public final long time_forwardable;
		private PendingHTLCsForwardable(long ptr, bindings.LDKEvent.PendingHTLCsForwardable obj) {
			super(null, ptr);
			this.time_forwardable = obj.time_forwardable;
		}
	}
	/**
	 * Used to indicate that we've intercepted an HTLC forward. This event will only be generated if
	 * you've encoded an intercept scid in the receiver's invoice route hints using
	 * [`ChannelManager::get_intercept_scid`] and have set [`UserConfig::accept_intercept_htlcs`].
	 * 
	 * [`ChannelManager::forward_intercepted_htlc`] or
	 * [`ChannelManager::fail_intercepted_htlc`] MUST be called in response to this event. See
	 * their docs for more information.
	 * 
	 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
	 * [`UserConfig::accept_intercept_htlcs`]: crate::util::config::UserConfig::accept_intercept_htlcs
	 * [`ChannelManager::forward_intercepted_htlc`]: crate::ln::channelmanager::ChannelManager::forward_intercepted_htlc
	 * [`ChannelManager::fail_intercepted_htlc`]: crate::ln::channelmanager::ChannelManager::fail_intercepted_htlc
	 */
	public final static class HTLCIntercepted extends Event {
		/**
		 * An id to help LDK identify which HTLC is being forwarded or failed.
		*/
		public final byte[] intercept_id;
		/**
		 * The fake scid that was programmed as the next hop's scid, generated using
		 * [`ChannelManager::get_intercept_scid`].
		 * 
		 * [`ChannelManager::get_intercept_scid`]: crate::ln::channelmanager::ChannelManager::get_intercept_scid
		*/
		public final long requested_next_hop_scid;
		/**
		 * The payment hash used for this HTLC.
		*/
		public final byte[] payment_hash;
		/**
		 * How many msats were received on the inbound edge of this HTLC.
		*/
		public final long inbound_amount_msat;
		/**
		 * How many msats the payer intended to route to the next node. Depending on the reason you are
		 * intercepting this payment, you might take a fee by forwarding less than this amount.
		 * 
		 * Note that LDK will NOT check that expected fees were factored into this value. You MUST
		 * check that whatever fee you want has been included here or subtract it as required. Further,
		 * LDK will not stop you from forwarding more than you received.
		*/
		public final long expected_outbound_amount_msat;
		private HTLCIntercepted(long ptr, bindings.LDKEvent.HTLCIntercepted obj) {
			super(null, ptr);
			this.intercept_id = obj.intercept_id;
			this.requested_next_hop_scid = obj.requested_next_hop_scid;
			this.payment_hash = obj.payment_hash;
			this.inbound_amount_msat = obj.inbound_amount_msat;
			this.expected_outbound_amount_msat = obj.expected_outbound_amount_msat;
		}
	}
	/**
	 * Used to indicate that an output which you should know how to spend was confirmed on chain
	 * and is now spendable.
	 * Such an output will *not* ever be spent by rust-lightning, and are not at risk of your
	 * counterparty spending them due to some kind of timeout. Thus, you need to store them
	 * somewhere and spend them when you create on-chain transactions.
	 */
	public final static class SpendableOutputs extends Event {
		/**
		 * The outputs which you should store as spendable by you.
		*/
		public final SpendableOutputDescriptor[] outputs;
		private SpendableOutputs(long ptr, bindings.LDKEvent.SpendableOutputs obj) {
			super(null, ptr);
			long[] outputs = obj.outputs;
			int outputs_conv_27_len = outputs.length;
			SpendableOutputDescriptor[] outputs_conv_27_arr = new SpendableOutputDescriptor[outputs_conv_27_len];
			for (int b = 0; b < outputs_conv_27_len; b++) {
				long outputs_conv_27 = outputs[b];
				org.ldk.structs.SpendableOutputDescriptor outputs_conv_27_hu_conv = org.ldk.structs.SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				if (outputs_conv_27_hu_conv != null) { outputs_conv_27_hu_conv.ptrs_to.add(this); };
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
			this.outputs = outputs_conv_27_arr;
		}
	}
	/**
	 * This event is generated when a payment has been successfully forwarded through us and a
	 * forwarding fee earned.
	 */
	public final static class PaymentForwarded extends Event {
		/**
		 * The incoming channel between the previous node and us. This is only `None` for events
		 * generated or serialized by versions prior to 0.0.107.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] prev_channel_id;
		/**
		 * The outgoing channel between the next node and us. This is only `None` for events
		 * generated or serialized by versions prior to 0.0.107.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] next_channel_id;
		/**
		 * The fee, in milli-satoshis, which was earned as a result of the payment.
		 * 
		 * Note that if we force-closed the channel over which we forwarded an HTLC while the HTLC
		 * was pending, the amount the next hop claimed will have been rounded down to the nearest
		 * whole satoshi. Thus, the fee calculated here may be higher than expected as we still
		 * claimed the full value in millisatoshis from the source. In this case,
		 * `claim_from_onchain_tx` will be set.
		 * 
		 * If the channel which sent us the payment has been force-closed, we will claim the funds
		 * via an on-chain transaction. In that case we do not yet know the on-chain transaction
		 * fees which we will spend and will instead set this to `None`. It is possible duplicate
		 * `PaymentForwarded` events are generated for the same payment iff `fee_earned_msat` is
		 * `None`.
		*/
		public final org.ldk.structs.Option_u64Z fee_earned_msat;
		/**
		 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
		 * transaction.
		*/
		public final boolean claim_from_onchain_tx;
		private PaymentForwarded(long ptr, bindings.LDKEvent.PaymentForwarded obj) {
			super(null, ptr);
			this.prev_channel_id = obj.prev_channel_id;
			this.next_channel_id = obj.next_channel_id;
			long fee_earned_msat = obj.fee_earned_msat;
			org.ldk.structs.Option_u64Z fee_earned_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(fee_earned_msat);
			if (fee_earned_msat_hu_conv != null) { fee_earned_msat_hu_conv.ptrs_to.add(this); };
			this.fee_earned_msat = fee_earned_msat_hu_conv;
			this.claim_from_onchain_tx = obj.claim_from_onchain_tx;
		}
	}
	/**
	 * Used to indicate that a channel with the given `channel_id` is ready to
	 * be used. This event is emitted either when the funding transaction has been confirmed
	 * on-chain, or, in case of a 0conf channel, when both parties have confirmed the channel
	 * establishment.
	 */
	public final static class ChannelReady extends Event {
		/**
		 * The channel_id of the channel that is ready.
		*/
		public final byte[] channel_id;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
		 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
		 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
		 * `user_channel_id` will be randomized for an inbound channel.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		/**
		 * The node_id of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The features that this channel will operate with.
		*/
		public final org.ldk.structs.ChannelTypeFeatures channel_type;
		private ChannelReady(long ptr, bindings.LDKEvent.ChannelReady obj) {
			super(null, ptr);
			this.channel_id = obj.channel_id;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
		}
	}
	/**
	 * Used to indicate that a previously opened channel with the given `channel_id` is in the
	 * process of closure.
	 */
	public final static class ChannelClosed extends Event {
		/**
		 * The channel_id of the channel which has been closed. Note that on-chain transactions
		 * resolving the channel are likely still awaiting confirmation.
		*/
		public final byte[] channel_id;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
		 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
		 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
		 * `user_channel_id` will be randomized for inbound channels.
		 * This may be zero for inbound channels serialized prior to 0.0.113 and will always be
		 * zero for objects serialized with LDK versions prior to 0.0.102.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		/**
		 * The reason the channel was closed.
		*/
		public final org.ldk.structs.ClosureReason reason;
		private ChannelClosed(long ptr, bindings.LDKEvent.ChannelClosed obj) {
			super(null, ptr);
			this.channel_id = obj.channel_id;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			long reason = obj.reason;
			org.ldk.structs.ClosureReason reason_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.add(this); };
			this.reason = reason_hu_conv;
		}
	}
	/**
	 * Used to indicate to the user that they can abandon the funding transaction and recycle the
	 * inputs for another purpose.
	 */
	public final static class DiscardFunding extends Event {
		/**
		 * The channel_id of the channel which has been closed.
		*/
		public final byte[] channel_id;
		/**
		 * The full transaction received from the user
		*/
		public final byte[] transaction;
		private DiscardFunding(long ptr, bindings.LDKEvent.DiscardFunding obj) {
			super(null, ptr);
			this.channel_id = obj.channel_id;
			this.transaction = obj.transaction;
		}
	}
	/**
	 * Indicates a request to open a new channel by a peer.
	 * 
	 * To accept the request, call [`ChannelManager::accept_inbound_channel`]. To reject the
	 * request, call [`ChannelManager::force_close_without_broadcasting_txn`].
	 * 
	 * The event is only triggered when a new open channel request is received and the
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_without_broadcasting_txn`]: crate::ln::channelmanager::ChannelManager::force_close_without_broadcasting_txn
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public final static class OpenChannelRequest extends Event {
		/**
		 * The temporary channel ID of the channel requested to be opened.
		 * 
		 * When responding to the request, the `temporary_channel_id` should be passed
		 * back to the ChannelManager through [`ChannelManager::accept_inbound_channel`] to accept,
		 * or through [`ChannelManager::force_close_without_broadcasting_txn`] to reject.
		 * 
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`ChannelManager::force_close_without_broadcasting_txn`]: crate::ln::channelmanager::ChannelManager::force_close_without_broadcasting_txn
		*/
		public final byte[] temporary_channel_id;
		/**
		 * The node_id of the counterparty requesting to open the channel.
		 * 
		 * When responding to the request, the `counterparty_node_id` should be passed
		 * back to the `ChannelManager` through [`ChannelManager::accept_inbound_channel`] to
		 * accept the request, or through [`ChannelManager::force_close_without_broadcasting_txn`] to reject the
		 * request.
		 * 
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`ChannelManager::force_close_without_broadcasting_txn`]: crate::ln::channelmanager::ChannelManager::force_close_without_broadcasting_txn
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The channel value of the requested channel.
		*/
		public final long funding_satoshis;
		/**
		 * Our starting balance in the channel if the request is accepted, in milli-satoshi.
		*/
		public final long push_msat;
		/**
		 * The features that this channel will operate with. If you reject the channel, a
		 * well-behaved counterparty may automatically re-attempt the channel with a new set of
		 * feature flags.
		 * 
		 * Note that if [`ChannelTypeFeatures::supports_scid_privacy`] returns true on this type,
		 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
		 * 0.0.106.
		 * 
		 * Furthermore, note that if [`ChannelTypeFeatures::supports_zero_conf`] returns true on this type,
		 * the resulting [`ChannelManager`] will not be readable by versions of LDK prior to
		 * 0.0.107. Channels setting this type also need to get manually accepted via
		 * [`crate::ln::channelmanager::ChannelManager::accept_inbound_channel_from_trusted_peer_0conf`],
		 * or will be rejected otherwise.
		 * 
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		*/
		public final org.ldk.structs.ChannelTypeFeatures channel_type;
		private OpenChannelRequest(long ptr, bindings.LDKEvent.OpenChannelRequest obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.counterparty_node_id = obj.counterparty_node_id;
			this.funding_satoshis = obj.funding_satoshis;
			this.push_msat = obj.push_msat;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
		}
	}
	/**
	 * Indicates that the HTLC was accepted, but could not be processed when or after attempting to
	 * forward it.
	 * 
	 * Some scenarios where this event may be sent include:
	 * Insufficient capacity in the outbound channel
	 * While waiting to forward the HTLC, the channel it is meant to be forwarded through closes
	 * When an unknown SCID is requested for forwarding a payment.
	 * Claiming an amount for an MPP payment that exceeds the HTLC total
	 * The HTLC has timed out
	 * 
	 * This event, however, does not get generated if an HTLC fails to meet the forwarding
	 * requirements (i.e. insufficient fees paid, or a CLTV that is too soon).
	 */
	public final static class HTLCHandlingFailed extends Event {
		/**
		 * The channel over which the HTLC was received.
		*/
		public final byte[] prev_channel_id;
		/**
		 * Destination of the HTLC that failed to be processed.
		*/
		public final org.ldk.structs.HTLCDestination failed_next_destination;
		private HTLCHandlingFailed(long ptr, bindings.LDKEvent.HTLCHandlingFailed obj) {
			super(null, ptr);
			this.prev_channel_id = obj.prev_channel_id;
			long failed_next_destination = obj.failed_next_destination;
			org.ldk.structs.HTLCDestination failed_next_destination_hu_conv = org.ldk.structs.HTLCDestination.constr_from_ptr(failed_next_destination);
			if (failed_next_destination_hu_conv != null) { failed_next_destination_hu_conv.ptrs_to.add(this); };
			this.failed_next_destination = failed_next_destination_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.Event_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Event
	 */
	public Event clone() {
		long ret = bindings.Event_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static Event funding_generation_ready(byte[] temporary_channel_id, byte[] counterparty_node_id, long channel_value_satoshis, byte[] output_script, org.ldk.util.UInt128 user_channel_id) {
		long ret = bindings.Event_funding_generation_ready(InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), channel_value_satoshis, output_script, user_channel_id.getLEBytes());
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(channel_value_satoshis);
		Reference.reachabilityFence(output_script);
		Reference.reachabilityFence(user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimable-variant Event
	 */
	public static Event payment_claimable(byte[] receiver_node_id, byte[] payment_hash, long amount_msat, org.ldk.structs.PaymentPurpose purpose, byte[] via_channel_id, org.ldk.structs.Option_u128Z via_user_channel_id) {
		long ret = bindings.Event_payment_claimable(InternalUtils.check_arr_len(receiver_node_id, 33), InternalUtils.check_arr_len(payment_hash, 32), amount_msat, purpose.ptr, InternalUtils.check_arr_len(via_channel_id, 32), via_user_channel_id.ptr);
		Reference.reachabilityFence(receiver_node_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(purpose);
		Reference.reachabilityFence(via_channel_id);
		Reference.reachabilityFence(via_user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(purpose); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(via_user_channel_id); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimed-variant Event
	 */
	public static Event payment_claimed(byte[] receiver_node_id, byte[] payment_hash, long amount_msat, org.ldk.structs.PaymentPurpose purpose) {
		long ret = bindings.Event_payment_claimed(InternalUtils.check_arr_len(receiver_node_id, 33), InternalUtils.check_arr_len(payment_hash, 32), amount_msat, purpose.ptr);
		Reference.reachabilityFence(receiver_node_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(purpose);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(purpose); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static Event payment_sent(byte[] payment_id, byte[] payment_preimage, byte[] payment_hash, org.ldk.structs.Option_u64Z fee_paid_msat) {
		long ret = bindings.Event_payment_sent(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_hash, 32), fee_paid_msat.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(fee_paid_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fee_paid_msat); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static Event payment_failed(byte[] payment_id, byte[] payment_hash) {
		long ret = bindings.Event_payment_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static Event payment_path_successful(byte[] payment_id, byte[] payment_hash, RouteHop[] path) {
		long ret = bindings.Event_payment_path_successful(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHop path_conv_10: path) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(path_conv_10); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static Event payment_path_failed(byte[] payment_id, byte[] payment_hash, boolean payment_failed_permanently, org.ldk.structs.PathFailure failure, RouteHop[] path, org.ldk.structs.Option_u64Z short_channel_id, org.ldk.structs.RouteParameters retry) {
		long ret = bindings.Event_payment_path_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), payment_failed_permanently, failure.ptr, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null, short_channel_id.ptr, retry == null ? 0 : retry.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(payment_failed_permanently);
		Reference.reachabilityFence(failure);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(retry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(failure); };
		for (RouteHop path_conv_10: path) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(path_conv_10); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(short_channel_id); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(retry); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeSuccessful-variant Event
	 */
	public static Event probe_successful(byte[] payment_id, byte[] payment_hash, RouteHop[] path) {
		long ret = bindings.Event_probe_successful(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHop path_conv_10: path) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(path_conv_10); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeFailed-variant Event
	 */
	public static Event probe_failed(byte[] payment_id, byte[] payment_hash, RouteHop[] path, org.ldk.structs.Option_u64Z short_channel_id) {
		long ret = bindings.Event_probe_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr).toArray() : null, short_channel_id.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (RouteHop path_conv_10: path) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(path_conv_10); }; };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(short_channel_id); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingHTLCsForwardable-variant Event
	 */
	public static Event pending_htlcs_forwardable(long time_forwardable) {
		long ret = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		Reference.reachabilityFence(time_forwardable);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCIntercepted-variant Event
	 */
	public static Event htlcintercepted(byte[] intercept_id, long requested_next_hop_scid, byte[] payment_hash, long inbound_amount_msat, long expected_outbound_amount_msat) {
		long ret = bindings.Event_htlcintercepted(InternalUtils.check_arr_len(intercept_id, 32), requested_next_hop_scid, InternalUtils.check_arr_len(payment_hash, 32), inbound_amount_msat, expected_outbound_amount_msat);
		Reference.reachabilityFence(intercept_id);
		Reference.reachabilityFence(requested_next_hop_scid);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(inbound_amount_msat);
		Reference.reachabilityFence(expected_outbound_amount_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static Event spendable_outputs(SpendableOutputDescriptor[] outputs) {
		long ret = bindings.Event_spendable_outputs(outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_27 -> outputs_conv_27.ptr).toArray() : null);
		Reference.reachabilityFence(outputs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (SpendableOutputDescriptor outputs_conv_27: outputs) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outputs_conv_27); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static Event payment_forwarded(byte[] prev_channel_id, byte[] next_channel_id, org.ldk.structs.Option_u64Z fee_earned_msat, boolean claim_from_onchain_tx) {
		long ret = bindings.Event_payment_forwarded(InternalUtils.check_arr_len(prev_channel_id, 32), InternalUtils.check_arr_len(next_channel_id, 32), fee_earned_msat.ptr, claim_from_onchain_tx);
		Reference.reachabilityFence(prev_channel_id);
		Reference.reachabilityFence(next_channel_id);
		Reference.reachabilityFence(fee_earned_msat);
		Reference.reachabilityFence(claim_from_onchain_tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fee_earned_msat); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelReady-variant Event
	 */
	public static Event channel_ready(byte[] channel_id, org.ldk.util.UInt128 user_channel_id, byte[] counterparty_node_id, org.ldk.structs.ChannelTypeFeatures channel_type) {
		long ret = bindings.Event_channel_ready(InternalUtils.check_arr_len(channel_id, 32), user_channel_id.getLEBytes(), InternalUtils.check_arr_len(counterparty_node_id, 33), channel_type == null ? 0 : channel_type.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(channel_type);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_type); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static Event channel_closed(byte[] channel_id, org.ldk.util.UInt128 user_channel_id, org.ldk.structs.ClosureReason reason) {
		long ret = bindings.Event_channel_closed(InternalUtils.check_arr_len(channel_id, 32), user_channel_id.getLEBytes(), reason.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(reason); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DiscardFunding-variant Event
	 */
	public static Event discard_funding(byte[] channel_id, byte[] transaction) {
		long ret = bindings.Event_discard_funding(InternalUtils.check_arr_len(channel_id, 32), transaction);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OpenChannelRequest-variant Event
	 */
	public static Event open_channel_request(byte[] temporary_channel_id, byte[] counterparty_node_id, long funding_satoshis, long push_msat, org.ldk.structs.ChannelTypeFeatures channel_type) {
		long ret = bindings.Event_open_channel_request(InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), funding_satoshis, push_msat, channel_type == null ? 0 : channel_type.ptr);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_satoshis);
		Reference.reachabilityFence(push_msat);
		Reference.reachabilityFence(channel_type);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_type); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCHandlingFailed-variant Event
	 */
	public static Event htlchandling_failed(byte[] prev_channel_id, org.ldk.structs.HTLCDestination failed_next_destination) {
		long ret = bindings.Event_htlchandling_failed(InternalUtils.check_arr_len(prev_channel_id, 32), failed_next_destination.ptr);
		Reference.reachabilityFence(prev_channel_id);
		Reference.reachabilityFence(failed_next_destination);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(failed_next_destination); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Events contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Event b) {
		boolean ret = bindings.Event_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Event)) return false;
		return this.eq((Event)o);
	}
	/**
	 * Serialize the Event object into a byte array which can be read by Event_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Event_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

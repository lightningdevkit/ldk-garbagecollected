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
		if (raw_val.getClass() == bindings.LDKEvent.PaymentReceived.class) {
			return new PaymentReceived(ptr, (bindings.LDKEvent.PaymentReceived)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentSent.class) {
			return new PaymentSent(ptr, (bindings.LDKEvent.PaymentSent)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentPathFailed.class) {
			return new PaymentPathFailed(ptr, (bindings.LDKEvent.PaymentPathFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentFailed.class) {
			return new PaymentFailed(ptr, (bindings.LDKEvent.PaymentFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PendingHTLCsForwardable.class) {
			return new PendingHTLCsForwardable(ptr, (bindings.LDKEvent.PendingHTLCsForwardable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpendableOutputs.class) {
			return new SpendableOutputs(ptr, (bindings.LDKEvent.SpendableOutputs)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentForwarded.class) {
			return new PaymentForwarded(ptr, (bindings.LDKEvent.PaymentForwarded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKEvent.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.DiscardFunding.class) {
			return new DiscardFunding(ptr, (bindings.LDKEvent.DiscardFunding)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentPathSuccessful.class) {
			return new PaymentPathSuccessful(ptr, (bindings.LDKEvent.PaymentPathSuccessful)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.OpenChannelRequest.class) {
			return new OpenChannelRequest(ptr, (bindings.LDKEvent.OpenChannelRequest)raw_val);
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
		 * ChannelManager::funding_transaction_generated.
		*/
		public final byte[] temporary_channel_id;
		/**
		 * The value, in satoshis, that the output should have.
		*/
		public final long channel_value_satoshis;
		/**
		 * The script which should be used in the transaction output.
		*/
		public final byte[] output_script;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`], or 0 for
		 * an inbound channel.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		*/
		public final long user_channel_id;
		private FundingGenerationReady(long ptr, bindings.LDKEvent.FundingGenerationReady obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.channel_value_satoshis = obj.channel_value_satoshis;
			this.output_script = obj.output_script;
			this.user_channel_id = obj.user_channel_id;
		}
	}
	/**
	 * Indicates we've received money! Just gotta dig out that payment preimage and feed it to
	 * [`ChannelManager::claim_funds`] to get it....
	 * Note that if the preimage is not known, you should call
	 * [`ChannelManager::fail_htlc_backwards`] to free up resources for this HTLC and avoid
	 * network congestion.
	 * If you fail to call either [`ChannelManager::claim_funds`] or
	 * [`ChannelManager::fail_htlc_backwards`] within the HTLC's timeout, the HTLC will be
	 * automatically failed.
	 * 
	 * # Note
	 * LDK will not stop an inbound payment from being paid multiple times, so multiple
	 * `PaymentReceived` events may be generated for the same payment.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 * [`ChannelManager::fail_htlc_backwards`]: crate::ln::channelmanager::ChannelManager::fail_htlc_backwards
	 */
	public final static class PaymentReceived extends Event {
		/**
		 * The hash for which the preimage should be handed to the ChannelManager. Note that LDK will
		 * not stop you from registering duplicate payment hashes for inbound payments.
		*/
		public final byte[] payment_hash;
		/**
		 * The value, in thousandths of a satoshi, that this payment is for.
		*/
		public final long amt;
		/**
		 * Information for claiming this received payment, based on whether the purpose of the
		 * payment is to pay an invoice or to send a spontaneous payment.
		*/
		public final PaymentPurpose purpose;
		private PaymentReceived(long ptr, bindings.LDKEvent.PaymentReceived obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.amt = obj.amt;
			long purpose = obj.purpose;
			PaymentPurpose purpose_hu_conv = PaymentPurpose.constr_from_ptr(purpose);
			purpose_hu_conv.ptrs_to.add(this);
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
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::retry_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
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
		public final Option_u64Z fee_paid_msat;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_preimage = obj.payment_preimage;
			this.payment_hash = obj.payment_hash;
			long fee_paid_msat = obj.fee_paid_msat;
			Option_u64Z fee_paid_msat_hu_conv = Option_u64Z.constr_from_ptr(fee_paid_msat);
			fee_paid_msat_hu_conv.ptrs_to.add(this);
			this.fee_paid_msat = fee_paid_msat_hu_conv;
		}
	}
	/**
	 * Indicates an outbound HTLC we sent failed. Probably some intermediary node dropped
	 * something. You may wish to retry with a different route.
	 * 
	 * Note that this does *not* indicate that all paths for an MPP payment have failed, see
	 * [`Event::PaymentFailed`] and [`all_paths_failed`].
	 * 
	 * [`all_paths_failed`]: Self::PaymentPathFailed::all_paths_failed
	 */
	public final static class PaymentPathFailed extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::retry_payment`] and [`ChannelManager::abandon_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
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
		 * the payment has failed, not just the route in question. If this is not set, you may
		 * retry the payment via a different route.
		*/
		public final boolean rejected_by_dest;
		/**
		 * Any failure information conveyed via the Onion return packet by a node along the failed
		 * payment route.
		 * 
		 * Should be applied to the [`NetworkGraph`] so that routing decisions can take into
		 * account the update. [`NetGraphMsgHandler`] is capable of doing this.
		 * 
		 * [`NetworkGraph`]: crate::routing::network_graph::NetworkGraph
		 * [`NetGraphMsgHandler`]: crate::routing::network_graph::NetGraphMsgHandler
		*/
		public final Option_NetworkUpdateZ network_update;
		/**
		 * For both single-path and multi-path payments, this is set if all paths of the payment have
		 * failed. This will be set to false if (1) this is an MPP payment and (2) other parts of the
		 * larger MPP payment were still in flight when this event was generated.
		 * 
		 * Note that if you are retrying individual MPP parts, using this value to determine if a
		 * payment has fully failed is race-y. Because multiple failures can happen prior to events
		 * being processed, you may retry in response to a first failure, with a second failure
		 * (with `all_paths_failed` set) still pending. Then, when the second failure is processed
		 * you will see `all_paths_failed` set even though the retry of the first failure still
		 * has an associated in-flight HTLC. See (1) for an example of such a failure.
		 * 
		 * If you wish to retry individual MPP parts and learn when a payment has failed, you must
		 * call [`ChannelManager::abandon_payment`] and wait for a [`Event::PaymentFailed`] event.
		 * 
		 * (1) <https://github.com/lightningdevkit/rust-lightning/issues/1164>
		 * 
		 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
		*/
		public final boolean all_paths_failed;
		/**
		 * The payment path that failed.
		*/
		public final RouteHop[] path;
		/**
		 * The channel responsible for the failed payment path.
		 * 
		 * If this is `Some`, then the corresponding channel should be avoided when the payment is
		 * retried. May be `None` for older [`Event`] serializations.
		*/
		public final Option_u64Z short_channel_id;
		/**
		 * Parameters needed to compute a new [`Route`] when retrying the failed payment path.
		 * 
		 * See [`find_route`] for details.
		 * 
		 * [`Route`]: crate::routing::router::Route
		 * [`find_route`]: crate::routing::router::find_route
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final RouteParameters retry;
		private PaymentPathFailed(long ptr, bindings.LDKEvent.PaymentPathFailed obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			this.rejected_by_dest = obj.rejected_by_dest;
			long network_update = obj.network_update;
			Option_NetworkUpdateZ network_update_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			network_update_hu_conv.ptrs_to.add(this);
			this.network_update = network_update_hu_conv;
			this.all_paths_failed = obj.all_paths_failed;
			long[] path = obj.path;
			int path_conv_10_len = path.length;
			RouteHop[] path_conv_10_arr = new RouteHop[path_conv_10_len];
			for (int k = 0; k < path_conv_10_len; k++) {
				long path_conv_10 = path[k];
				RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new RouteHop(null, path_conv_10); }
				path_conv_10_hu_conv.ptrs_to.add(this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
			long short_channel_id = obj.short_channel_id;
			Option_u64Z short_channel_id_hu_conv = Option_u64Z.constr_from_ptr(short_channel_id);
			short_channel_id_hu_conv.ptrs_to.add(this);
			this.short_channel_id = short_channel_id_hu_conv;
			long retry = obj.retry;
			RouteParameters retry_hu_conv = null; if (retry < 0 || retry > 4096) { retry_hu_conv = new RouteParameters(null, retry); }
			retry_hu_conv.ptrs_to.add(this);
			this.retry = retry_hu_conv;
		}
	}
	/**
	 * Indicates an outbound payment failed. Individual [`Event::PaymentPathFailed`] events
	 * provide failure information for each MPP part in the payment.
	 * 
	 * This event is provided once there are no further pending HTLCs for the payment and the
	 * payment is no longer retryable, either due to a several-block timeout or because
	 * [`ChannelManager::abandon_payment`] was previously called for the corresponding payment.
	 * 
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class PaymentFailed extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::retry_payment`] and [`ChannelManager::abandon_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
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
				SpendableOutputDescriptor outputs_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				outputs_conv_27_hu_conv.ptrs_to.add(this);
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
		public final Option_u64Z fee_earned_msat;
		/**
		 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
		 * transaction.
		*/
		public final boolean claim_from_onchain_tx;
		private PaymentForwarded(long ptr, bindings.LDKEvent.PaymentForwarded obj) {
			super(null, ptr);
			long fee_earned_msat = obj.fee_earned_msat;
			Option_u64Z fee_earned_msat_hu_conv = Option_u64Z.constr_from_ptr(fee_earned_msat);
			fee_earned_msat_hu_conv.ptrs_to.add(this);
			this.fee_earned_msat = fee_earned_msat_hu_conv;
			this.claim_from_onchain_tx = obj.claim_from_onchain_tx;
		}
	}
	/**
	 * Used to indicate that a channel with the given `channel_id` is in the process of closure.
	 */
	public final static class ChannelClosed extends Event {
		/**
		 * The channel_id of the channel which has been closed. Note that on-chain transactions
		 * resolving the channel are likely still awaiting confirmation.
		*/
		public final byte[] channel_id;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`], or 0 for
		 * an inbound channel. This will always be zero for objects serialized with LDK versions
		 * prior to 0.0.102.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		*/
		public final long user_channel_id;
		/**
		 * The reason the channel was closed.
		*/
		public final ClosureReason reason;
		private ChannelClosed(long ptr, bindings.LDKEvent.ChannelClosed obj) {
			super(null, ptr);
			this.channel_id = obj.channel_id;
			this.user_channel_id = obj.user_channel_id;
			long reason = obj.reason;
			ClosureReason reason_hu_conv = ClosureReason.constr_from_ptr(reason);
			reason_hu_conv.ptrs_to.add(this);
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
	 * Indicates that a path for an outbound payment was successful.
	 * 
	 * Always generated after [`Event::PaymentSent`] and thus useful for scoring channels. See
	 * [`Event::PaymentSent`] for obtaining the payment preimage.
	 */
	public final static class PaymentPathSuccessful extends Event {
		/**
		 * The id returned by [`ChannelManager::send_payment`] and used with
		 * [`ChannelManager::retry_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::retry_payment`]: crate::ln::channelmanager::ChannelManager::retry_payment
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
				RouteHop path_conv_10_hu_conv = null; if (path_conv_10 < 0 || path_conv_10 > 4096) { path_conv_10_hu_conv = new RouteHop(null, path_conv_10); }
				path_conv_10_hu_conv.ptrs_to.add(this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
		}
	}
	/**
	 * Indicates a request to open a new channel by a peer.
	 * 
	 * To accept the request, call [`ChannelManager::accept_inbound_channel`]. To reject the
	 * request, call [`ChannelManager::force_close_channel`].
	 * 
	 * The event is only triggered when a new open channel request is received and the
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelManager::force_close_channel`]: crate::ln::channelmanager::ChannelManager::force_close_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public final static class OpenChannelRequest extends Event {
		/**
		 * The temporary channel ID of the channel requested to be opened.
		 * 
		 * When responding to the request, the `temporary_channel_id` should be passed
		 * back to the ChannelManager with [`ChannelManager::accept_inbound_channel`] to accept,
		 * or to [`ChannelManager::force_close_channel`] to reject.
		 * 
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`ChannelManager::force_close_channel`]: crate::ln::channelmanager::ChannelManager::force_close_channel
		*/
		public final byte[] temporary_channel_id;
		/**
		 * The node_id of the counterparty requesting to open the channel.
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
		private OpenChannelRequest(long ptr, bindings.LDKEvent.OpenChannelRequest obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.counterparty_node_id = obj.counterparty_node_id;
			this.funding_satoshis = obj.funding_satoshis;
			this.push_msat = obj.push_msat;
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
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static Event funding_generation_ready(byte[] temporary_channel_id, long channel_value_satoshis, byte[] output_script, long user_channel_id) {
		long ret = bindings.Event_funding_generation_ready(InternalUtils.check_arr_len(temporary_channel_id, 32), channel_value_satoshis, output_script, user_channel_id);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(channel_value_satoshis);
		Reference.reachabilityFence(output_script);
		Reference.reachabilityFence(user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentReceived-variant Event
	 */
	public static Event payment_received(byte[] payment_hash, long amt, PaymentPurpose purpose) {
		long ret = bindings.Event_payment_received(InternalUtils.check_arr_len(payment_hash, 32), amt, purpose.ptr);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(amt);
		Reference.reachabilityFence(purpose);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static Event payment_sent(byte[] payment_id, byte[] payment_preimage, byte[] payment_hash, Option_u64Z fee_paid_msat) {
		long ret = bindings.Event_payment_sent(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_hash, 32), fee_paid_msat.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(fee_paid_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static Event payment_path_failed(byte[] payment_id, byte[] payment_hash, boolean rejected_by_dest, Option_NetworkUpdateZ network_update, boolean all_paths_failed, RouteHop[] path, Option_u64Z short_channel_id, RouteParameters retry) {
		long ret = bindings.Event_payment_path_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), rejected_by_dest, network_update.ptr, all_paths_failed, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray() : null, short_channel_id.ptr, retry == null ? 0 : retry.ptr & ~1);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(rejected_by_dest);
		Reference.reachabilityFence(network_update);
		Reference.reachabilityFence(all_paths_failed);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(retry);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
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
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingHTLCsForwardable-variant Event
	 */
	public static Event pending_htlcs_forwardable(long time_forwardable) {
		long ret = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		Reference.reachabilityFence(time_forwardable);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static Event spendable_outputs(SpendableOutputDescriptor[] outputs) {
		long ret = bindings.Event_spendable_outputs(outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_27 -> outputs_conv_27.ptr).toArray() : null);
		Reference.reachabilityFence(outputs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static Event payment_forwarded(Option_u64Z fee_earned_msat, boolean claim_from_onchain_tx) {
		long ret = bindings.Event_payment_forwarded(fee_earned_msat.ptr, claim_from_onchain_tx);
		Reference.reachabilityFence(fee_earned_msat);
		Reference.reachabilityFence(claim_from_onchain_tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static Event channel_closed(byte[] channel_id, long user_channel_id, ClosureReason reason) {
		long ret = bindings.Event_channel_closed(InternalUtils.check_arr_len(channel_id, 32), user_channel_id, reason.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
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
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static Event payment_path_successful(byte[] payment_id, byte[] payment_hash, RouteHop[] path) {
		long ret = bindings.Event_payment_path_successful(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray() : null);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OpenChannelRequest-variant Event
	 */
	public static Event open_channel_request(byte[] temporary_channel_id, byte[] counterparty_node_id, long funding_satoshis, long push_msat) {
		long ret = bindings.Event_open_channel_request(InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), funding_satoshis, push_msat);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_satoshis);
		Reference.reachabilityFence(push_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
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

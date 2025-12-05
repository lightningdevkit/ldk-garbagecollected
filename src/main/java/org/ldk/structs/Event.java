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
		if (raw_val.getClass() == bindings.LDKEvent.FundingTxBroadcastSafe.class) {
			return new FundingTxBroadcastSafe(ptr, (bindings.LDKEvent.FundingTxBroadcastSafe)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentClaimable.class) {
			return new PaymentClaimable(ptr, (bindings.LDKEvent.PaymentClaimable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentClaimed.class) {
			return new PaymentClaimed(ptr, (bindings.LDKEvent.PaymentClaimed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ConnectionNeeded.class) {
			return new ConnectionNeeded(ptr, (bindings.LDKEvent.ConnectionNeeded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.InvoiceReceived.class) {
			return new InvoiceReceived(ptr, (bindings.LDKEvent.InvoiceReceived)raw_val);
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
		if (raw_val.getClass() == bindings.LDKEvent.HTLCIntercepted.class) {
			return new HTLCIntercepted(ptr, (bindings.LDKEvent.HTLCIntercepted)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpendableOutputs.class) {
			return new SpendableOutputs(ptr, (bindings.LDKEvent.SpendableOutputs)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentForwarded.class) {
			return new PaymentForwarded(ptr, (bindings.LDKEvent.PaymentForwarded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelPending.class) {
			return new ChannelPending(ptr, (bindings.LDKEvent.ChannelPending)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelReady.class) {
			return new ChannelReady(ptr, (bindings.LDKEvent.ChannelReady)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKEvent.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SplicePending.class) {
			return new SplicePending(ptr, (bindings.LDKEvent.SplicePending)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpliceFailed.class) {
			return new SpliceFailed(ptr, (bindings.LDKEvent.SpliceFailed)raw_val);
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
		if (raw_val.getClass() == bindings.LDKEvent.BumpTransaction.class) {
			return new BumpTransaction(ptr, (bindings.LDKEvent.BumpTransaction)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.OnionMessageIntercepted.class) {
			return new OnionMessageIntercepted(ptr, (bindings.LDKEvent.OnionMessageIntercepted)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.OnionMessagePeerConnected.class) {
			return new OnionMessagePeerConnected(ptr, (bindings.LDKEvent.OnionMessagePeerConnected)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PersistStaticInvoice.class) {
			return new PersistStaticInvoice(ptr, (bindings.LDKEvent.PersistStaticInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.StaticInvoiceRequested.class) {
			return new StaticInvoiceRequested(ptr, (bindings.LDKEvent.StaticInvoiceRequested)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.FundingTransactionReadyForSigning.class) {
			return new FundingTransactionReadyForSigning(ptr, (bindings.LDKEvent.FundingTransactionReadyForSigning)raw_val);
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
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`), but won't be persisted across restarts.
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
		public final org.ldk.structs.ChannelId temporary_channel_id;
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
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`] for outbound
		 * channels, or to [`ChannelManager::accept_inbound_channel`] for inbound channels if
		 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
		 * `user_channel_id` will be randomized for an inbound channel.  This may be zero for objects
		 * serialized with LDK versions prior to 0.0.113.
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		private FundingGenerationReady(long ptr, bindings.LDKEvent.FundingGenerationReady obj) {
			super(null, ptr);
			long temporary_channel_id = obj.temporary_channel_id;
			org.ldk.structs.ChannelId temporary_channel_id_hu_conv = null; if (temporary_channel_id < 0 || temporary_channel_id > 4096) { temporary_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, temporary_channel_id); }
			if (temporary_channel_id_hu_conv != null) { temporary_channel_id_hu_conv.ptrs_to.add(this); };
			this.temporary_channel_id = temporary_channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			this.channel_value_satoshis = obj.channel_value_satoshis;
			this.output_script = obj.output_script;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
		}
	}
	/**
	 * Used to indicate that the counterparty node has provided the signature(s) required to
	 * recover our funds in case they go offline.
	 * 
	 * It is safe (and your responsibility) to broadcast the funding transaction upon receiving this
	 * event.
	 * 
	 * This event is only emitted if you called
	 * [`ChannelManager::unsafe_manual_funding_transaction_generated`] instead of
	 * [`ChannelManager::funding_transaction_generated`].
	 * 
	 * [`ChannelManager::unsafe_manual_funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::unsafe_manual_funding_transaction_generated
	 * [`ChannelManager::funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::funding_transaction_generated
	 */
	public final static class FundingTxBroadcastSafe extends Event {
		/**
		 * The `channel_id` indicating which channel has reached this stage.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * The `user_channel_id` value passed in to [`ChannelManager::create_channel`].
		 * 
		 * [`ChannelManager::create_channel`]: crate::ln::channelmanager::ChannelManager::create_channel
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		/**
		 * The outpoint of the channel's funding transaction.
		*/
		public final org.ldk.structs.OutPoint funding_txo;
		/**
		 * The `node_id` of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The `temporary_channel_id` this channel used to be known by during channel establishment.
		*/
		public final org.ldk.structs.ChannelId former_temporary_channel_id;
		private FundingTxBroadcastSafe(long ptr, bindings.LDKEvent.FundingTxBroadcastSafe obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			long funding_txo = obj.funding_txo;
			org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
			if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
			this.funding_txo = funding_txo_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long former_temporary_channel_id = obj.former_temporary_channel_id;
			org.ldk.structs.ChannelId former_temporary_channel_id_hu_conv = null; if (former_temporary_channel_id < 0 || former_temporary_channel_id > 4096) { former_temporary_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, former_temporary_channel_id); }
			if (former_temporary_channel_id_hu_conv != null) { former_temporary_channel_id_hu_conv.ptrs_to.add(this); };
			this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
		}
	}
	/**
	 * Indicates that we've been offered a payment and it needs to be claimed via calling
	 * [`ChannelManager::claim_funds`] with the preimage given in [`PaymentPurpose`].
	 * 
	 * Note that if the preimage is not known, you should call
	 * [`ChannelManager::fail_htlc_backwards`] or [`ChannelManager::fail_htlc_backwards_with_reason`]
	 * to free up resources for this HTLC and avoid network congestion.
	 * 
	 * If [`Event::PaymentClaimable::onion_fields`] is `Some`, and includes custom TLVs with even type
	 * numbers, you should use [`ChannelManager::fail_htlc_backwards_with_reason`] with
	 * [`FailureCode::InvalidOnionPayload`] if you fail to understand and handle the contents, or
	 * [`ChannelManager::claim_funds_with_known_custom_tlvs`] upon successful handling.
	 * If you don't intend to check for custom TLVs, you can simply use
	 * [`ChannelManager::claim_funds`], which will automatically fail back even custom TLVs.
	 * 
	 * If you fail to call [`ChannelManager::claim_funds`],
	 * [`ChannelManager::claim_funds_with_known_custom_tlvs`],
	 * [`ChannelManager::fail_htlc_backwards`], or
	 * [`ChannelManager::fail_htlc_backwards_with_reason`] within the HTLC's timeout, the HTLC will
	 * be automatically failed.
	 * 
	 * # Note
	 * LDK will not stop an inbound payment from being paid multiple times, so multiple
	 * `PaymentClaimable` events may be generated for the same payment. In such a case it is
	 * polite (and required in the lightning specification) to fail the payment the second time
	 * and give the sender their money back rather than accepting double payment.
	 * 
	 * # Note
	 * This event used to be called `PaymentReceived` in LDK versions 0.0.112 and earlier.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 * [`ChannelManager::claim_funds_with_known_custom_tlvs`]: crate::ln::channelmanager::ChannelManager::claim_funds_with_known_custom_tlvs
	 * [`FailureCode::InvalidOnionPayload`]: crate::ln::channelmanager::FailureCode::InvalidOnionPayload
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
		 * [phantom nodes]: crate::sign::PhantomKeysManager
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
		 * The fields in the onion which were received with each HTLC. Only fields which were
		 * identical in each HTLC involved in the payment will be included here.
		 * 
		 * Payments received on LDK versions prior to 0.0.115 will have this field unset.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.RecipientOnionFields onion_fields;
		/**
		 * The value, in thousandths of a satoshi, that this payment is claimable for. May be greater
		 * than the invoice amount.
		 * 
		 * May be less than the invoice amount if [`ChannelConfig::accept_underpaying_htlcs`] is set
		 * and the previous hop took an extra fee.
		 * 
		 * # Note
		 * If [`ChannelConfig::accept_underpaying_htlcs`] is set and you claim without verifying this
		 * field, you may lose money!
		 * 
		 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
		*/
		public final long amount_msat;
		/**
		 * The value, in thousands of a satoshi, that was skimmed off of this payment as an extra fee
		 * taken by our channel counterparty.
		 * 
		 * Will always be 0 unless [`ChannelConfig::accept_underpaying_htlcs`] is set.
		 * 
		 * [`ChannelConfig::accept_underpaying_htlcs`]: crate::util::config::ChannelConfig::accept_underpaying_htlcs
		*/
		public final long counterparty_skimmed_fee_msat;
		/**
		 * Information for claiming this received payment, based on whether the purpose of the
		 * payment is to pay an invoice or to send a spontaneous payment.
		*/
		public final org.ldk.structs.PaymentPurpose purpose;
		/**
		 * The `(channel_id, user_channel_id)` pairs over which the payment was received.
		 * 
		 * This will be an incomplete vector for MPP payment events created/serialized using LDK version 0.1.0 and prior.
		*/
		public final TwoTuple_ChannelIdCOption_U128ZZ[] receiving_channel_ids;
		/**
		 * The block height at which this payment will be failed back and will no longer be
		 * eligible for claiming.
		 * 
		 * Prior to this height, a call to [`ChannelManager::claim_funds`] is guaranteed to
		 * succeed, however you should wait for [`Event::PaymentClaimed`] to be sure.
		 * 
		 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
		*/
		public final org.ldk.structs.Option_u32Z claim_deadline;
		/**
		 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
		 * 
		 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
		 * an intermediary node may steal the funds). Thus, in order to accurately track when
		 * payments are received and claimed, you should use this identifier.
		 * 
		 * Only filled in for payments received on LDK versions 0.1 and higher.
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_id;
		private PaymentClaimable(long ptr, bindings.LDKEvent.PaymentClaimable obj) {
			super(null, ptr);
			this.receiver_node_id = obj.receiver_node_id;
			this.payment_hash = obj.payment_hash;
			long onion_fields = obj.onion_fields;
			org.ldk.structs.RecipientOnionFields onion_fields_hu_conv = null; if (onion_fields < 0 || onion_fields > 4096) { onion_fields_hu_conv = new org.ldk.structs.RecipientOnionFields(null, onion_fields); }
			if (onion_fields_hu_conv != null) { onion_fields_hu_conv.ptrs_to.add(this); };
			this.onion_fields = onion_fields_hu_conv;
			this.amount_msat = obj.amount_msat;
			this.counterparty_skimmed_fee_msat = obj.counterparty_skimmed_fee_msat;
			long purpose = obj.purpose;
			org.ldk.structs.PaymentPurpose purpose_hu_conv = org.ldk.structs.PaymentPurpose.constr_from_ptr(purpose);
			if (purpose_hu_conv != null) { purpose_hu_conv.ptrs_to.add(this); };
			this.purpose = purpose_hu_conv;
			long[] receiving_channel_ids = obj.receiving_channel_ids;
			int receiving_channel_ids_conv_34_len = receiving_channel_ids.length;
			TwoTuple_ChannelIdCOption_U128ZZ[] receiving_channel_ids_conv_34_arr = new TwoTuple_ChannelIdCOption_U128ZZ[receiving_channel_ids_conv_34_len];
			for (int i = 0; i < receiving_channel_ids_conv_34_len; i++) {
				long receiving_channel_ids_conv_34 = receiving_channel_ids[i];
				TwoTuple_ChannelIdCOption_U128ZZ receiving_channel_ids_conv_34_hu_conv = new TwoTuple_ChannelIdCOption_U128ZZ(null, receiving_channel_ids_conv_34);
				if (receiving_channel_ids_conv_34_hu_conv != null) { receiving_channel_ids_conv_34_hu_conv.ptrs_to.add(this); };
				receiving_channel_ids_conv_34_arr[i] = receiving_channel_ids_conv_34_hu_conv;
			}
			this.receiving_channel_ids = receiving_channel_ids_conv_34_arr;
			long claim_deadline = obj.claim_deadline;
			org.ldk.structs.Option_u32Z claim_deadline_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(claim_deadline);
			if (claim_deadline_hu_conv != null) { claim_deadline_hu_conv.ptrs_to.add(this); };
			this.claim_deadline = claim_deadline_hu_conv;
			long payment_id = obj.payment_id;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_id_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			if (payment_id_hu_conv != null) { payment_id_hu_conv.ptrs_to.add(this); };
			this.payment_id = payment_id_hu_conv;
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
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
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
		 * [phantom nodes]: crate::sign::PhantomKeysManager
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
		 * The value, in thousandths of a satoshi, that this payment is for. May be greater than the
		 * invoice amount.
		*/
		public final long amount_msat;
		/**
		 * The purpose of the claimed payment, i.e. whether the payment was for an invoice or a
		 * spontaneous payment.
		*/
		public final org.ldk.structs.PaymentPurpose purpose;
		/**
		 * The HTLCs that comprise the claimed payment. This will be empty for events serialized prior
		 * to LDK version 0.0.117.
		*/
		public final ClaimedHTLC[] htlcs;
		/**
		 * The sender-intended sum total of all the MPP parts. This will be `None` for events
		 * serialized prior to LDK version 0.0.117.
		*/
		public final org.ldk.structs.Option_u64Z sender_intended_total_msat;
		/**
		 * The fields in the onion which were received with each HTLC. Only fields which were
		 * identical in each HTLC involved in the payment will be included here.
		 * 
		 * Payments received on LDK versions prior to 0.0.124 will have this field unset.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.RecipientOnionFields onion_fields;
		/**
		 * A unique ID describing this payment (derived from the list of HTLCs in the payment).
		 * 
		 * Payers may pay for the same [`PaymentHash`] multiple times (though this is unsafe and
		 * an intermediary node may steal the funds). Thus, in order to accurately track when
		 * payments are received and claimed, you should use this identifier.
		 * 
		 * Only filled in for payments received on LDK versions 0.1 and higher.
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_id;
		private PaymentClaimed(long ptr, bindings.LDKEvent.PaymentClaimed obj) {
			super(null, ptr);
			this.receiver_node_id = obj.receiver_node_id;
			this.payment_hash = obj.payment_hash;
			this.amount_msat = obj.amount_msat;
			long purpose = obj.purpose;
			org.ldk.structs.PaymentPurpose purpose_hu_conv = org.ldk.structs.PaymentPurpose.constr_from_ptr(purpose);
			if (purpose_hu_conv != null) { purpose_hu_conv.ptrs_to.add(this); };
			this.purpose = purpose_hu_conv;
			long[] htlcs = obj.htlcs;
			int htlcs_conv_13_len = htlcs.length;
			ClaimedHTLC[] htlcs_conv_13_arr = new ClaimedHTLC[htlcs_conv_13_len];
			for (int n = 0; n < htlcs_conv_13_len; n++) {
				long htlcs_conv_13 = htlcs[n];
				org.ldk.structs.ClaimedHTLC htlcs_conv_13_hu_conv = null; if (htlcs_conv_13 < 0 || htlcs_conv_13 > 4096) { htlcs_conv_13_hu_conv = new org.ldk.structs.ClaimedHTLC(null, htlcs_conv_13); }
				if (htlcs_conv_13_hu_conv != null) { htlcs_conv_13_hu_conv.ptrs_to.add(this); };
				htlcs_conv_13_arr[n] = htlcs_conv_13_hu_conv;
			}
			this.htlcs = htlcs_conv_13_arr;
			long sender_intended_total_msat = obj.sender_intended_total_msat;
			org.ldk.structs.Option_u64Z sender_intended_total_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(sender_intended_total_msat);
			if (sender_intended_total_msat_hu_conv != null) { sender_intended_total_msat_hu_conv.ptrs_to.add(this); };
			this.sender_intended_total_msat = sender_intended_total_msat_hu_conv;
			long onion_fields = obj.onion_fields;
			org.ldk.structs.RecipientOnionFields onion_fields_hu_conv = null; if (onion_fields < 0 || onion_fields > 4096) { onion_fields_hu_conv = new org.ldk.structs.RecipientOnionFields(null, onion_fields); }
			if (onion_fields_hu_conv != null) { onion_fields_hu_conv.ptrs_to.add(this); };
			this.onion_fields = onion_fields_hu_conv;
			long payment_id = obj.payment_id;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_id_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			if (payment_id_hu_conv != null) { payment_id_hu_conv.ptrs_to.add(this); };
			this.payment_id = payment_id_hu_conv;
		}
	}
	/**
	 * Indicates that a peer connection with a node is needed in order to send an [`OnionMessage`].
	 * 
	 * Typically, this happens when a [`MessageRouter`] is unable to find a complete path to a
	 * [`Destination`]. Once a connection is established, any messages buffered by an
	 * [`OnionMessageHandler`] may be sent.
	 * 
	 * This event will not be generated for onion message forwards; only for sends including
	 * replies. Handlers should connect to the node otherwise any buffered messages may be lost.
	 * 
	 * # Failure Behavior and Persistence
	 * This event won't be replayed after failures-to-handle
	 * (i.e., the event handler returning `Err(ReplayEvent ())`), and also won't be persisted
	 * across restarts.
	 * 
	 * [`OnionMessage`]: msgs::OnionMessage
	 * [`MessageRouter`]: crate::onion_message::messenger::MessageRouter
	 * [`Destination`]: crate::onion_message::messenger::Destination
	 * [`OnionMessageHandler`]: crate::ln::msgs::OnionMessageHandler
	 */
	public final static class ConnectionNeeded extends Event {
		/**
		 * The node id for the node needing a connection.
		*/
		public final byte[] node_id;
		/**
		 * Sockets for connecting to the node, if available. We don't require these addresses to be
		 * present in case the node id corresponds to a known peer that is offline and can be awoken,
		 * such as via the LSPS5 protocol.
		*/
		public final SocketAddress[] addresses;
		private ConnectionNeeded(long ptr, bindings.LDKEvent.ConnectionNeeded obj) {
			super(null, ptr);
			this.node_id = obj.node_id;
			long[] addresses = obj.addresses;
			int addresses_conv_15_len = addresses.length;
			SocketAddress[] addresses_conv_15_arr = new SocketAddress[addresses_conv_15_len];
			for (int p = 0; p < addresses_conv_15_len; p++) {
				long addresses_conv_15 = addresses[p];
				org.ldk.structs.SocketAddress addresses_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(addresses_conv_15);
				if (addresses_conv_15_hu_conv != null) { addresses_conv_15_hu_conv.ptrs_to.add(this); };
				addresses_conv_15_arr[p] = addresses_conv_15_hu_conv;
			}
			this.addresses = addresses_conv_15_arr;
		}
	}
	/**
	 * Indicates a [`Bolt12Invoice`] in response to an [`InvoiceRequest`] or a [`Refund`] was
	 * received.
	 * 
	 * This event will only be generated if [`UserConfig::manually_handle_bolt12_invoices`] is set.
	 * Use [`ChannelManager::send_payment_for_bolt12_invoice`] to pay the invoice or
	 * [`ChannelManager::abandon_payment`] to abandon the associated payment. See those docs for
	 * further details.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Refund`]: crate::offers::refund::Refund
	 * [`UserConfig::manually_handle_bolt12_invoices`]: crate::util::config::UserConfig::manually_handle_bolt12_invoices
	 * [`ChannelManager::send_payment_for_bolt12_invoice`]: crate::ln::channelmanager::ChannelManager::send_payment_for_bolt12_invoice
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class InvoiceReceived extends Event {
		/**
		 * The `payment_id` associated with payment for the invoice.
		*/
		public final byte[] payment_id;
		/**
		 * The invoice to pay.
		*/
		public final org.ldk.structs.Bolt12Invoice invoice;
		/**
		 * The context of the [`BlindedMessagePath`] used to send the invoice.
		 * 
		 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
		*/
		public final org.ldk.structs.Option_OffersContextZ context;
		/**
		 * A responder for replying with an [`InvoiceError`] if needed.
		 * 
		 * `None` if the invoice wasn't sent with a reply path.
		 * 
		 * [`InvoiceError`]: crate::offers::invoice_error::InvoiceError
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.Responder responder;
		private InvoiceReceived(long ptr, bindings.LDKEvent.InvoiceReceived obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			long invoice = obj.invoice;
			org.ldk.structs.Bolt12Invoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.Bolt12Invoice(null, invoice); }
			if (invoice_hu_conv != null) { invoice_hu_conv.ptrs_to.add(this); };
			this.invoice = invoice_hu_conv;
			long context = obj.context;
			org.ldk.structs.Option_OffersContextZ context_hu_conv = org.ldk.structs.Option_OffersContextZ.constr_from_ptr(context);
			if (context_hu_conv != null) { context_hu_conv.ptrs_to.add(this); };
			this.context = context_hu_conv;
			long responder = obj.responder;
			org.ldk.structs.Responder responder_hu_conv = null; if (responder < 0 || responder > 4096) { responder_hu_conv = new org.ldk.structs.Responder(null, responder); }
			if (responder_hu_conv != null) { responder_hu_conv.ptrs_to.add(this); };
			this.responder = responder_hu_conv;
		}
	}
	/**
	 * Indicates an outbound payment we made succeeded (i.e. it made it all the way to its target
	 * and we got back the payment preimage for it).
	 * 
	 * Note for MPP payments: in rare cases, this event may be preceded by a `PaymentPathFailed`
	 * event. In this situation, you SHOULD treat this payment as having succeeded.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class PaymentSent extends Event {
		/**
		 * The `payment_id` passed to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_id;
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
		 * The total amount that was paid, across all paths.
		 * 
		 * Note that, like [`Route::get_total_amount`], this does *not* include the paid fees.
		 * 
		 * This is only `None` for payments initiated on LDK versions prior to 0.2.
		 * 
		 * [`Route::get_total_amount`]: crate::routing::router::Route::get_total_amount
		*/
		public final org.ldk.structs.Option_u64Z amount_msat;
		/**
		 * The total fee which was spent at intermediate hops in this payment, across all paths.
		 * 
		 * Note that, like [`Route::get_total_fees`], this does *not* include any potential
		 * overpayment to the recipient node.
		 * 
		 * If the recipient or an intermediate node misbehaves and gives us free money, this may
		 * overstate the amount paid, though this is unlikely.
		 * 
		 * This is only `None` for payments initiated on LDK versions prior to 0.0.103.
		 * 
		 * [`Route::get_total_fees`]: crate::routing::router::Route::get_total_fees
		*/
		public final org.ldk.structs.Option_u64Z fee_paid_msat;
		/**
		 * The BOLT 12 invoice that was paid. `None` if the payment was a non BOLT 12 payment.
		 * 
		 * The BOLT 12 invoice is useful for proof of payment because it contains the
		 * payment hash. A third party can verify that the payment was made by
		 * showing the invoice and confirming that the payment hash matches
		 * the hash of the payment preimage.
		 * 
		 * However, the [`PaidBolt12Invoice`] can also be of type [`StaticInvoice`], which
		 * is a special [`Bolt12Invoice`] where proof of payment is not possible.
		 * 
		 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
		*/
		public final org.ldk.structs.Option_PaidBolt12InvoiceZ bolt12_invoice;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			long payment_id = obj.payment_id;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_id_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			if (payment_id_hu_conv != null) { payment_id_hu_conv.ptrs_to.add(this); };
			this.payment_id = payment_id_hu_conv;
			this.payment_preimage = obj.payment_preimage;
			this.payment_hash = obj.payment_hash;
			long amount_msat = obj.amount_msat;
			org.ldk.structs.Option_u64Z amount_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(amount_msat);
			if (amount_msat_hu_conv != null) { amount_msat_hu_conv.ptrs_to.add(this); };
			this.amount_msat = amount_msat_hu_conv;
			long fee_paid_msat = obj.fee_paid_msat;
			org.ldk.structs.Option_u64Z fee_paid_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(fee_paid_msat);
			if (fee_paid_msat_hu_conv != null) { fee_paid_msat_hu_conv.ptrs_to.add(this); };
			this.fee_paid_msat = fee_paid_msat_hu_conv;
			long bolt12_invoice = obj.bolt12_invoice;
			org.ldk.structs.Option_PaidBolt12InvoiceZ bolt12_invoice_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(bolt12_invoice);
			if (bolt12_invoice_hu_conv != null) { bolt12_invoice_hu_conv.ptrs_to.add(this); };
			this.bolt12_invoice = bolt12_invoice_hu_conv;
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
	 * In exceedingly rare cases, it is possible that an [`Event::PaymentFailed`] is generated for
	 * a payment after an [`Event::PaymentSent`] event for this same payment has already been
	 * received and processed. In this case, the [`Event::PaymentFailed`] event MUST be ignored,
	 * and the payment MUST be treated as having succeeded.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 * 
	 * [`Retry`]: crate::ln::channelmanager::Retry
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class PaymentFailed extends Event {
		/**
		 * The `payment_id` passed to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_id;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`]. `None` if the payment failed
		 * before receiving an invoice when paying a BOLT12 [`Offer`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`Offer`]: crate::offers::offer::Offer
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash;
		/**
		 * The reason the payment failed. This is only `None` for events generated or serialized
		 * by versions prior to 0.0.115, or when downgrading to a version with a reason that was
		 * added after.
		*/
		public final org.ldk.structs.Option_PaymentFailureReasonZ reason;
		private PaymentFailed(long ptr, bindings.LDKEvent.PaymentFailed obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			long payment_hash = obj.payment_hash;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.add(this); };
			this.payment_hash = payment_hash_hu_conv;
			long reason = obj.reason;
			org.ldk.structs.Option_PaymentFailureReasonZ reason_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.add(this); };
			this.reason = reason_hu_conv;
		}
	}
	/**
	 * Indicates that a path for an outbound payment was successful.
	 * 
	 * Always generated after [`Event::PaymentSent`] and thus useful for scoring channels. See
	 * [`Event::PaymentSent`] for obtaining the payment preimage.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class PaymentPathSuccessful extends Event {
		/**
		 * The `payment_id` passed to [`ChannelManager::send_payment`].
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final byte[] payment_id;
		/**
		 * The hash that was given to [`ChannelManager::send_payment`].
		 * 
		 * This will be `Some` for all payments which completed on LDK 0.0.104 or later.
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash;
		/**
		 * The payment path that was successful.
		 * 
		 * May contain a closed channel if the HTLC sent along the path was fulfilled on chain.
		*/
		public final org.ldk.structs.Path path;
		/**
		 * The time that each hop indicated it held the HTLC.
		 * 
		 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
		 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
		 * 
		 * We expect that at each hop the actual hold time will be strictly greater than the hold
		 * time of the following hops, as a node along the path shouldn't have completed the HTLC
		 * until the next node has completed it. Note that because hold times are in 100's of ms,
		 * hold times as reported are likely to often be equal across hops.
		 * 
		 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
		 * will be empty.
		 * 
		 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
		 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
		 * support hold times, the list may be shorter than the number of hops in the path.
		*/
		public final int[] hold_times;
		private PaymentPathSuccessful(long ptr, bindings.LDKEvent.PaymentPathSuccessful obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			long payment_hash = obj.payment_hash;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.add(this); };
			this.payment_hash = payment_hash_hu_conv;
			long path = obj.path;
			org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.add(this); };
			this.path = path_hu_conv;
			this.hold_times = obj.hold_times;
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
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 * 
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	public final static class PaymentPathFailed extends Event {
		/**
		 * The `payment_id` passed to [`ChannelManager::send_payment`].
		 * 
		 * This will be `Some` for all payment paths which failed on LDK 0.0.103 or later.
		 * 
		 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
		 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_id;
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
		public final org.ldk.structs.Path path;
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
		 * The time that each hop indicated it held the HTLC.
		 * 
		 * The unit in which the hold times are expressed are 100's of milliseconds. So a hop
		 * reporting 2 is a hold time that corresponds to between 200 and 299 milliseconds.
		 * 
		 * We expect that at each hop the actual hold time will be strictly greater than the hold
		 * time of the following hops, as a node along the path shouldn't have completed the HTLC
		 * until the next node has completed it. Note that because hold times are in 100's of ms,
		 * hold times as reported are likely to often be equal across hops.
		 * 
		 * If our peer didn't provide attribution data or the HTLC resolved on chain, the list
		 * will be empty.
		 * 
		 * Each entry will correspond with one entry in [`Path::hops`], or, thereafter, the
		 * [`BlindedTail::trampoline_hops`] in [`Path::blinded_tail`]. Because not all nodes
		 * support hold times, the list may be shorter than the number of hops in the path.
		*/
		public final int[] hold_times;
		private PaymentPathFailed(long ptr, bindings.LDKEvent.PaymentPathFailed obj) {
			super(null, ptr);
			long payment_id = obj.payment_id;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_id_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_id);
			if (payment_id_hu_conv != null) { payment_id_hu_conv.ptrs_to.add(this); };
			this.payment_id = payment_id_hu_conv;
			this.payment_hash = obj.payment_hash;
			this.payment_failed_permanently = obj.payment_failed_permanently;
			long failure = obj.failure;
			org.ldk.structs.PathFailure failure_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(failure);
			if (failure_hu_conv != null) { failure_hu_conv.ptrs_to.add(this); };
			this.failure = failure_hu_conv;
			long path = obj.path;
			org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.add(this); };
			this.path = path_hu_conv;
			long short_channel_id = obj.short_channel_id;
			org.ldk.structs.Option_u64Z short_channel_id_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(short_channel_id);
			if (short_channel_id_hu_conv != null) { short_channel_id_hu_conv.ptrs_to.add(this); };
			this.short_channel_id = short_channel_id_hu_conv;
			this.hold_times = obj.hold_times;
		}
	}
	/**
	 * Indicates that a probe payment we sent returned successful, i.e., only failed at the destination.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
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
		public final org.ldk.structs.Path path;
		private ProbeSuccessful(long ptr, bindings.LDKEvent.ProbeSuccessful obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
			this.payment_hash = obj.payment_hash;
			long path = obj.path;
			org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.add(this); };
			this.path = path_hu_conv;
		}
	}
	/**
	 * Indicates that a probe payment we sent failed at an intermediary node on the path.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
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
		public final org.ldk.structs.Path path;
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
			long path = obj.path;
			org.ldk.structs.Path path_hu_conv = null; if (path < 0 || path > 4096) { path_hu_conv = new org.ldk.structs.Path(null, path); }
			if (path_hu_conv != null) { path_hu_conv.ptrs_to.add(this); };
			this.path = path_hu_conv;
			long short_channel_id = obj.short_channel_id;
			org.ldk.structs.Option_u64Z short_channel_id_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(short_channel_id);
			if (short_channel_id_hu_conv != null) { short_channel_id_hu_conv.ptrs_to.add(this); };
			this.short_channel_id = short_channel_id_hu_conv;
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
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
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
		 * Forwarding less than this amount may break compatibility with LDK versions prior to 0.0.116.
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
	 * 
	 * Such an output will *never* be spent directly by LDK, and are not at risk of your
	 * counterparty spending them due to some kind of timeout. Thus, you need to store them
	 * somewhere and spend them when you create on-chain transactions.
	 * 
	 * You may hand them to the [`OutputSweeper`] utility which will store and (re-)generate spending
	 * transactions for you.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 * 
	 * [`OutputSweeper`]: crate::util::sweep::OutputSweeper
	 */
	public final static class SpendableOutputs extends Event {
		/**
		 * The outputs which you should store as spendable by you.
		*/
		public final SpendableOutputDescriptor[] outputs;
		/**
		 * The `channel_id` indicating which channel the spendable outputs belong to.
		 * 
		 * This will always be `Some` for events generated by LDK versions 0.0.117 and above.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelId channel_id;
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
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
		}
	}
	/**
	 * This event is generated when a payment has been successfully forwarded through us and a
	 * forwarding fee earned.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class PaymentForwarded extends Event {
		/**
		 * The channel id of the incoming channel between the previous node and us.
		 * 
		 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelId prev_channel_id;
		/**
		 * The channel id of the outgoing channel between the next node and us.
		 * 
		 * This is only `None` for events generated or serialized by versions prior to 0.0.107.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelId next_channel_id;
		/**
		 * The `user_channel_id` of the incoming channel between the previous node and us.
		 * 
		 * This is only `None` for events generated or serialized by versions prior to 0.0.122.
		*/
		public final org.ldk.structs.Option_U128Z prev_user_channel_id;
		/**
		 * The `user_channel_id` of the outgoing channel between the next node and us.
		 * 
		 * This will be `None` if the payment was settled via an on-chain transaction. See the
		 * caveat described for the `total_fee_earned_msat` field. Moreover it will be `None` for
		 * events generated or serialized by versions prior to 0.0.122.
		*/
		public final org.ldk.structs.Option_U128Z next_user_channel_id;
		/**
		 * The node id of the previous node.
		 * 
		 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
		 * versions prior to 0.1
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] prev_node_id;
		/**
		 * The node id of the next node.
		 * 
		 * This is only `None` for HTLCs received prior to 0.1 or for events serialized by
		 * versions prior to 0.1
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] next_node_id;
		/**
		 * The total fee, in milli-satoshis, which was earned as a result of the payment.
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
		 * `PaymentForwarded` events are generated for the same payment iff `total_fee_earned_msat` is
		 * `None`.
		*/
		public final org.ldk.structs.Option_u64Z total_fee_earned_msat;
		/**
		 * The share of the total fee, in milli-satoshis, which was withheld in addition to the
		 * forwarding fee.
		 * 
		 * This will only be `Some` if we forwarded an intercepted HTLC with less than the
		 * expected amount. This means our counterparty accepted to receive less than the invoice
		 * amount, e.g., by claiming the payment featuring a corresponding
		 * [`PaymentClaimable::counterparty_skimmed_fee_msat`].
		 * 
		 * Will also always be `None` for events serialized with LDK prior to version 0.0.122.
		 * 
		 * The caveat described above the `total_fee_earned_msat` field applies here as well.
		 * 
		 * [`PaymentClaimable::counterparty_skimmed_fee_msat`]: Self::PaymentClaimable::counterparty_skimmed_fee_msat
		*/
		public final org.ldk.structs.Option_u64Z skimmed_fee_msat;
		/**
		 * If this is `true`, the forwarded HTLC was claimed by our counterparty via an on-chain
		 * transaction.
		*/
		public final boolean claim_from_onchain_tx;
		/**
		 * The final amount forwarded, in milli-satoshis, after the fee is deducted.
		 * 
		 * The caveat described above the `total_fee_earned_msat` field applies here as well.
		*/
		public final org.ldk.structs.Option_u64Z outbound_amount_forwarded_msat;
		private PaymentForwarded(long ptr, bindings.LDKEvent.PaymentForwarded obj) {
			super(null, ptr);
			long prev_channel_id = obj.prev_channel_id;
			org.ldk.structs.ChannelId prev_channel_id_hu_conv = null; if (prev_channel_id < 0 || prev_channel_id > 4096) { prev_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, prev_channel_id); }
			if (prev_channel_id_hu_conv != null) { prev_channel_id_hu_conv.ptrs_to.add(this); };
			this.prev_channel_id = prev_channel_id_hu_conv;
			long next_channel_id = obj.next_channel_id;
			org.ldk.structs.ChannelId next_channel_id_hu_conv = null; if (next_channel_id < 0 || next_channel_id > 4096) { next_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, next_channel_id); }
			if (next_channel_id_hu_conv != null) { next_channel_id_hu_conv.ptrs_to.add(this); };
			this.next_channel_id = next_channel_id_hu_conv;
			long prev_user_channel_id = obj.prev_user_channel_id;
			org.ldk.structs.Option_U128Z prev_user_channel_id_hu_conv = org.ldk.structs.Option_U128Z.constr_from_ptr(prev_user_channel_id);
			if (prev_user_channel_id_hu_conv != null) { prev_user_channel_id_hu_conv.ptrs_to.add(this); };
			this.prev_user_channel_id = prev_user_channel_id_hu_conv;
			long next_user_channel_id = obj.next_user_channel_id;
			org.ldk.structs.Option_U128Z next_user_channel_id_hu_conv = org.ldk.structs.Option_U128Z.constr_from_ptr(next_user_channel_id);
			if (next_user_channel_id_hu_conv != null) { next_user_channel_id_hu_conv.ptrs_to.add(this); };
			this.next_user_channel_id = next_user_channel_id_hu_conv;
			this.prev_node_id = obj.prev_node_id;
			this.next_node_id = obj.next_node_id;
			long total_fee_earned_msat = obj.total_fee_earned_msat;
			org.ldk.structs.Option_u64Z total_fee_earned_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(total_fee_earned_msat);
			if (total_fee_earned_msat_hu_conv != null) { total_fee_earned_msat_hu_conv.ptrs_to.add(this); };
			this.total_fee_earned_msat = total_fee_earned_msat_hu_conv;
			long skimmed_fee_msat = obj.skimmed_fee_msat;
			org.ldk.structs.Option_u64Z skimmed_fee_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(skimmed_fee_msat);
			if (skimmed_fee_msat_hu_conv != null) { skimmed_fee_msat_hu_conv.ptrs_to.add(this); };
			this.skimmed_fee_msat = skimmed_fee_msat_hu_conv;
			this.claim_from_onchain_tx = obj.claim_from_onchain_tx;
			long outbound_amount_forwarded_msat = obj.outbound_amount_forwarded_msat;
			org.ldk.structs.Option_u64Z outbound_amount_forwarded_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(outbound_amount_forwarded_msat);
			if (outbound_amount_forwarded_msat_hu_conv != null) { outbound_amount_forwarded_msat_hu_conv.ptrs_to.add(this); };
			this.outbound_amount_forwarded_msat = outbound_amount_forwarded_msat_hu_conv;
		}
	}
	/**
	 * Used to indicate that a channel with the given `channel_id` is being opened and pending
	 * confirmation on-chain.
	 * 
	 * This event is emitted when the funding transaction has been signed and is broadcast to the
	 * network. For 0conf channels it will be immediately followed by the corresponding
	 * [`Event::ChannelReady`] event.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class ChannelPending extends Event {
		/**
		 * The `channel_id` of the channel that is pending confirmation.
		*/
		public final org.ldk.structs.ChannelId channel_id;
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
		 * The `temporary_channel_id` this channel used to be known by during channel establishment.
		 * 
		 * Will be `None` for channels created prior to LDK version 0.0.115.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelId former_temporary_channel_id;
		/**
		 * The `node_id` of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The outpoint of the channel's funding transaction.
		*/
		public final org.ldk.structs.OutPoint funding_txo;
		/**
		 * The features that this channel will operate with.
		 * 
		 * Will be `None` for channels created prior to LDK version 0.0.122.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelTypeFeatures channel_type;
		/**
		 * The witness script that is used to lock the channel's funding output to commitment transactions.
		 * 
		 * This field will be `None` for objects serialized with LDK versions prior to 0.2.0.
		*/
		public final org.ldk.structs.Option_CVec_u8ZZ funding_redeem_script;
		private ChannelPending(long ptr, bindings.LDKEvent.ChannelPending obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			long former_temporary_channel_id = obj.former_temporary_channel_id;
			org.ldk.structs.ChannelId former_temporary_channel_id_hu_conv = null; if (former_temporary_channel_id < 0 || former_temporary_channel_id > 4096) { former_temporary_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, former_temporary_channel_id); }
			if (former_temporary_channel_id_hu_conv != null) { former_temporary_channel_id_hu_conv.ptrs_to.add(this); };
			this.former_temporary_channel_id = former_temporary_channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long funding_txo = obj.funding_txo;
			org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
			if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
			this.funding_txo = funding_txo_hu_conv;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
			long funding_redeem_script = obj.funding_redeem_script;
			org.ldk.structs.Option_CVec_u8ZZ funding_redeem_script_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(funding_redeem_script);
			if (funding_redeem_script_hu_conv != null) { funding_redeem_script_hu_conv.ptrs_to.add(this); };
			this.funding_redeem_script = funding_redeem_script_hu_conv;
		}
	}
	/**
	 * Used to indicate that a channel with the given `channel_id` is ready to be used. This event
	 * is emitted when
	 * - the initial funding transaction has been confirmed on-chain to an acceptable depth
	 * according to both parties (i.e., `channel_ready` messages were exchanged),
	 * - a splice funding transaction has been confirmed on-chain to an acceptable depth according
	 * to both parties (i.e., `splice_locked` messages were exchanged), or,
	 * - in case of a 0conf channel, when both parties have confirmed the channel establishment.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class ChannelReady extends Event {
		/**
		 * The `channel_id` of the channel that is ready.
		*/
		public final org.ldk.structs.ChannelId channel_id;
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
		 * The `node_id` of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The outpoint of the channel's funding transaction.
		 * 
		 * Will be `None` if the channel's funding transaction reached an acceptable depth prior to
		 * version 0.2.
		*/
		public final org.ldk.structs.Option_OutPointZ funding_txo;
		/**
		 * The features that this channel will operate with.
		*/
		public final org.ldk.structs.ChannelTypeFeatures channel_type;
		private ChannelReady(long ptr, bindings.LDKEvent.ChannelReady obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long funding_txo = obj.funding_txo;
			org.ldk.structs.Option_OutPointZ funding_txo_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(funding_txo);
			if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
			this.funding_txo = funding_txo_hu_conv;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
		}
	}
	/**
	 * Used to indicate that a channel that got past the initial handshake with the given `channel_id` is in the
	 * process of closure. This includes previously opened channels, and channels that time out from not being funded.
	 * 
	 * Note that this event is only triggered for accepted channels: if the
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true and the channel is
	 * rejected, no `ChannelClosed` event will be sent.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class ChannelClosed extends Event {
		/**
		 * The `channel_id` of the channel which has been closed. Note that on-chain transactions
		 * resolving the channel are likely still awaiting confirmation.
		*/
		public final org.ldk.structs.ChannelId channel_id;
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
		/**
		 * Counterparty in the closed channel.
		 * 
		 * This field will be `None` for objects serialized prior to LDK 0.0.117.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] counterparty_node_id;
		/**
		 * Channel capacity of the closing channel (sats).
		 * 
		 * This field will be `None` for objects serialized prior to LDK 0.0.117.
		*/
		public final org.ldk.structs.Option_u64Z channel_capacity_sats;
		/**
		 * The original channel funding TXO; this helps checking for the existence and confirmation
		 * status of the closing tx.
		 * Note that for instances serialized in v0.0.119 or prior this will be missing (None).
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.OutPoint channel_funding_txo;
		/**
		 * An upper bound on the our last local balance in msats before the channel was closed.
		 * 
		 * Will overstate our balance as it ignores pending outbound HTLCs and transaction fees.
		 * 
		 * For more accurate balances including fee information see
		 * [`ChainMonitor::get_claimable_balances`].
		 * 
		 * This field will be `None` only for objects serialized prior to LDK 0.1.
		 * 
		 * [`ChainMonitor::get_claimable_balances`]: crate::chain::chainmonitor::ChainMonitor::get_claimable_balances
		*/
		public final org.ldk.structs.Option_u64Z last_local_balance_msat;
		private ChannelClosed(long ptr, bindings.LDKEvent.ChannelClosed obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			long reason = obj.reason;
			org.ldk.structs.ClosureReason reason_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.add(this); };
			this.reason = reason_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long channel_capacity_sats = obj.channel_capacity_sats;
			org.ldk.structs.Option_u64Z channel_capacity_sats_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(channel_capacity_sats);
			if (channel_capacity_sats_hu_conv != null) { channel_capacity_sats_hu_conv.ptrs_to.add(this); };
			this.channel_capacity_sats = channel_capacity_sats_hu_conv;
			long channel_funding_txo = obj.channel_funding_txo;
			org.ldk.structs.OutPoint channel_funding_txo_hu_conv = null; if (channel_funding_txo < 0 || channel_funding_txo > 4096) { channel_funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, channel_funding_txo); }
			if (channel_funding_txo_hu_conv != null) { channel_funding_txo_hu_conv.ptrs_to.add(this); };
			this.channel_funding_txo = channel_funding_txo_hu_conv;
			long last_local_balance_msat = obj.last_local_balance_msat;
			org.ldk.structs.Option_u64Z last_local_balance_msat_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(last_local_balance_msat);
			if (last_local_balance_msat_hu_conv != null) { last_local_balance_msat_hu_conv.ptrs_to.add(this); };
			this.last_local_balance_msat = last_local_balance_msat_hu_conv;
		}
	}
	/**
	 * Used to indicate that a splice for the given `channel_id` has been negotiated and its
	 * funding transaction has been broadcast.
	 * 
	 * The splice is then considered pending until both parties have seen enough confirmations to
	 * consider the funding locked. Once this occurs, an [`Event::ChannelReady`] will be emitted.
	 * 
	 * Any UTXOs spent by the splice cannot be reused except by an RBF attempt for the same channel.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class SplicePending extends Event {
		/**
		 * The `channel_id` of the channel that has a pending splice funding transaction.
		*/
		public final org.ldk.structs.ChannelId channel_id;
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
		 * The `node_id` of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The outpoint of the channel's splice funding transaction.
		*/
		public final org.ldk.structs.OutPoint new_funding_txo;
		/**
		 * The features that this channel will operate with. Currently, these will be the same
		 * features that the channel was opened with, but in the future splices may change them.
		*/
		public final org.ldk.structs.ChannelTypeFeatures channel_type;
		/**
		 * The witness script that is used to lock the channel's funding output to commitment transactions.
		*/
		public final byte[] new_funding_redeem_script;
		private SplicePending(long ptr, bindings.LDKEvent.SplicePending obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long new_funding_txo = obj.new_funding_txo;
			org.ldk.structs.OutPoint new_funding_txo_hu_conv = null; if (new_funding_txo < 0 || new_funding_txo > 4096) { new_funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, new_funding_txo); }
			if (new_funding_txo_hu_conv != null) { new_funding_txo_hu_conv.ptrs_to.add(this); };
			this.new_funding_txo = new_funding_txo_hu_conv;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
			this.new_funding_redeem_script = obj.new_funding_redeem_script;
		}
	}
	/**
	 * Used to indicate that a splice for the given `channel_id` has failed.
	 * 
	 * This event may be emitted if a splice fails after it has been initiated but prior to signing
	 * any negotiated funding transaction.
	 * 
	 * Any UTXOs contributed to be spent by the funding transaction may be reused and will be
	 * given in `contributed_inputs`.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class SpliceFailed extends Event {
		/**
		 * The `channel_id` of the channel for which the splice failed.
		*/
		public final org.ldk.structs.ChannelId channel_id;
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
		 * The `node_id` of the channel counterparty.
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The outpoint of the channel's splice funding transaction, if one was created.
		*/
		public final org.ldk.structs.Option_OutPointZ abandoned_funding_txo;
		/**
		 * The features that this channel will operate with, if available.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.ChannelTypeFeatures channel_type;
		/**
		 * UTXOs spent as inputs contributed to the splice transaction.
		*/
		public final OutPoint[] contributed_inputs;
		/**
		 * Outputs contributed to the splice transaction.
		*/
		public final TxOut[] contributed_outputs;
		private SpliceFailed(long ptr, bindings.LDKEvent.SpliceFailed obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			long abandoned_funding_txo = obj.abandoned_funding_txo;
			org.ldk.structs.Option_OutPointZ abandoned_funding_txo_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(abandoned_funding_txo);
			if (abandoned_funding_txo_hu_conv != null) { abandoned_funding_txo_hu_conv.ptrs_to.add(this); };
			this.abandoned_funding_txo = abandoned_funding_txo_hu_conv;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
			long[] contributed_inputs = obj.contributed_inputs;
			int contributed_inputs_conv_10_len = contributed_inputs.length;
			OutPoint[] contributed_inputs_conv_10_arr = new OutPoint[contributed_inputs_conv_10_len];
			for (int k = 0; k < contributed_inputs_conv_10_len; k++) {
				long contributed_inputs_conv_10 = contributed_inputs[k];
				org.ldk.structs.OutPoint contributed_inputs_conv_10_hu_conv = null; if (contributed_inputs_conv_10 < 0 || contributed_inputs_conv_10 > 4096) { contributed_inputs_conv_10_hu_conv = new org.ldk.structs.OutPoint(null, contributed_inputs_conv_10); }
				if (contributed_inputs_conv_10_hu_conv != null) { contributed_inputs_conv_10_hu_conv.ptrs_to.add(this); };
				contributed_inputs_conv_10_arr[k] = contributed_inputs_conv_10_hu_conv;
			}
			this.contributed_inputs = contributed_inputs_conv_10_arr;
			long[] contributed_outputs = obj.contributed_outputs;
			int contributed_outputs_conv_7_len = contributed_outputs.length;
			TxOut[] contributed_outputs_conv_7_arr = new TxOut[contributed_outputs_conv_7_len];
			for (int h = 0; h < contributed_outputs_conv_7_len; h++) {
				long contributed_outputs_conv_7 = contributed_outputs[h];
				TxOut contributed_outputs_conv_7_conv = new TxOut(null, contributed_outputs_conv_7);
				contributed_outputs_conv_7_arr[h] = contributed_outputs_conv_7_conv;
			}
			this.contributed_outputs = contributed_outputs_conv_7_arr;
		}
	}
	/**
	 * Used to indicate to the user that they can abandon the funding transaction and recycle the
	 * inputs for another purpose.
	 * 
	 * When splicing, users can expect to receive an event for each negotiated splice transaction
	 * that did not become locked. The negotiated splice transaction that became locked can be
	 * obtained via [`Event::ChannelReady::funding_txo`].
	 * 
	 * This event is not guaranteed to be generated for channels that are closed due to a restart.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class DiscardFunding extends Event {
		/**
		 * The channel_id of the channel which has been closed.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * The full transaction received from the user
		*/
		public final org.ldk.structs.FundingInfo funding_info;
		private DiscardFunding(long ptr, bindings.LDKEvent.DiscardFunding obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			long funding_info = obj.funding_info;
			org.ldk.structs.FundingInfo funding_info_hu_conv = org.ldk.structs.FundingInfo.constr_from_ptr(funding_info);
			if (funding_info_hu_conv != null) { funding_info_hu_conv.ptrs_to.add(this); };
			this.funding_info = funding_info_hu_conv;
		}
	}
	/**
	 * Indicates a request to open a new channel by a peer.
	 * 
	 * To accept the request (and in the case of a dual-funded channel, not contribute funds),
	 * call [`ChannelManager::accept_inbound_channel`].
	 * To reject the request, call [`ChannelManager::force_close_broadcasting_latest_txn`].
	 * Note that a [`ChannelClosed`] event will _not_ be triggered if the channel is rejected.
	 * 
	 * The event is only triggered when a new open channel request is received and the
	 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and won't be persisted across restarts.
	 * 
	 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
	 * [`ChannelClosed`]: Event::ChannelClosed
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
	 */
	public final static class OpenChannelRequest extends Event {
		/**
		 * The temporary channel ID of the channel requested to be opened.
		 * 
		 * When responding to the request, the `temporary_channel_id` should be passed
		 * back to the ChannelManager through [`ChannelManager::accept_inbound_channel`] to accept,
		 * or through [`ChannelManager::force_close_broadcasting_latest_txn`] to reject.
		 * 
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
		*/
		public final org.ldk.structs.ChannelId temporary_channel_id;
		/**
		 * The node_id of the counterparty requesting to open the channel.
		 * 
		 * When responding to the request, the `counterparty_node_id` should be passed
		 * back to the `ChannelManager` through [`ChannelManager::accept_inbound_channel`] to
		 * accept the request, or through [`ChannelManager::force_close_broadcasting_latest_txn`]
		 * to reject the request.
		 * 
		 * [`ChannelManager::accept_inbound_channel`]: crate::ln::channelmanager::ChannelManager::accept_inbound_channel
		 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The channel value of the requested channel.
		*/
		public final long funding_satoshis;
		/**
		 * If `channel_negotiation_type` is `InboundChannelFunds::DualFunded`, this indicates that the peer wishes to
		 * open a dual-funded channel. Otherwise, this field will be `InboundChannelFunds::PushMsats`,
		 * indicating the `push_msats` value our peer is pushing to us for a non-dual-funded channel.
		*/
		public final org.ldk.structs.InboundChannelFunds channel_negotiation_type;
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
		/**
		 * True if this channel is (or will be) publicly-announced.
		*/
		public final boolean is_announced;
		/**
		 * Channel parameters given by the counterparty.
		*/
		public final org.ldk.structs.ChannelParameters params;
		private OpenChannelRequest(long ptr, bindings.LDKEvent.OpenChannelRequest obj) {
			super(null, ptr);
			long temporary_channel_id = obj.temporary_channel_id;
			org.ldk.structs.ChannelId temporary_channel_id_hu_conv = null; if (temporary_channel_id < 0 || temporary_channel_id > 4096) { temporary_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, temporary_channel_id); }
			if (temporary_channel_id_hu_conv != null) { temporary_channel_id_hu_conv.ptrs_to.add(this); };
			this.temporary_channel_id = temporary_channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			this.funding_satoshis = obj.funding_satoshis;
			long channel_negotiation_type = obj.channel_negotiation_type;
			org.ldk.structs.InboundChannelFunds channel_negotiation_type_hu_conv = org.ldk.structs.InboundChannelFunds.constr_from_ptr(channel_negotiation_type);
			if (channel_negotiation_type_hu_conv != null) { channel_negotiation_type_hu_conv.ptrs_to.add(this); };
			this.channel_negotiation_type = channel_negotiation_type_hu_conv;
			long channel_type = obj.channel_type;
			org.ldk.structs.ChannelTypeFeatures channel_type_hu_conv = null; if (channel_type < 0 || channel_type > 4096) { channel_type_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, channel_type); }
			if (channel_type_hu_conv != null) { channel_type_hu_conv.ptrs_to.add(this); };
			this.channel_type = channel_type_hu_conv;
			this.is_announced = obj.is_announced;
			long params = obj.params;
			org.ldk.structs.ChannelParameters params_hu_conv = null; if (params < 0 || params > 4096) { params_hu_conv = new org.ldk.structs.ChannelParameters(null, params); }
			if (params_hu_conv != null) { params_hu_conv.ptrs_to.add(this); };
			this.params = params_hu_conv;
		}
	}
	/**
	 * Indicates that the HTLC was accepted, but could not be processed when or after attempting to
	 * forward it.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`) and will be persisted across restarts.
	 */
	public final static class HTLCHandlingFailed extends Event {
		/**
		 * The channel over which the HTLC was received.
		*/
		public final org.ldk.structs.ChannelId prev_channel_id;
		/**
		 * The type of HTLC handling that failed.
		*/
		public final org.ldk.structs.HTLCHandlingFailureType failure_type;
		/**
		 * The reason that the HTLC failed.
		 * 
		 * This field will be `None` only for objects serialized prior to LDK 0.2.0.
		*/
		public final org.ldk.structs.Option_HTLCHandlingFailureReasonZ failure_reason;
		private HTLCHandlingFailed(long ptr, bindings.LDKEvent.HTLCHandlingFailed obj) {
			super(null, ptr);
			long prev_channel_id = obj.prev_channel_id;
			org.ldk.structs.ChannelId prev_channel_id_hu_conv = null; if (prev_channel_id < 0 || prev_channel_id > 4096) { prev_channel_id_hu_conv = new org.ldk.structs.ChannelId(null, prev_channel_id); }
			if (prev_channel_id_hu_conv != null) { prev_channel_id_hu_conv.ptrs_to.add(this); };
			this.prev_channel_id = prev_channel_id_hu_conv;
			long failure_type = obj.failure_type;
			org.ldk.structs.HTLCHandlingFailureType failure_type_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(failure_type);
			if (failure_type_hu_conv != null) { failure_type_hu_conv.ptrs_to.add(this); };
			this.failure_type = failure_type_hu_conv;
			long failure_reason = obj.failure_reason;
			org.ldk.structs.Option_HTLCHandlingFailureReasonZ failure_reason_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(failure_reason);
			if (failure_reason_hu_conv != null) { failure_reason_hu_conv.ptrs_to.add(this); };
			this.failure_reason = failure_reason_hu_conv;
		}
	}
	/**
	 * Indicates that a transaction originating from LDK needs to have its fee bumped. This event
	 * requires confirmed external funds to be readily available to spend.
	 * 
	 * LDK does not currently generate this event unless either the
	 * [`ChannelHandshakeConfig::negotiate_anchors_zero_fee_htlc_tx`] or the
	 * [`ChannelHandshakeConfig::negotiate_anchor_zero_fee_commitments`] config flags are set to
	 * true.
	 * It is limited to the scope of channels with anchor outputs.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`), but will only be regenerated as needed after restarts.
	 * 
	 * [`ChannelHandshakeConfig::negotiate_anchors_zero_fee_htlc_tx`]: crate::util::config::ChannelHandshakeConfig::negotiate_anchors_zero_fee_htlc_tx
	 * [`ChannelHandshakeConfig::negotiate_anchor_zero_fee_commitments`]: crate::util::config::ChannelHandshakeConfig::negotiate_anchor_zero_fee_commitments
	 */
	public final static class BumpTransaction extends Event {
		public final org.ldk.structs.BumpTransactionEvent bump_transaction;
		private BumpTransaction(long ptr, bindings.LDKEvent.BumpTransaction obj) {
			super(null, ptr);
			long bump_transaction = obj.bump_transaction;
			org.ldk.structs.BumpTransactionEvent bump_transaction_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(bump_transaction);
			if (bump_transaction_hu_conv != null) { bump_transaction_hu_conv.ptrs_to.add(this); };
			this.bump_transaction = bump_transaction_hu_conv;
		}
	}
	/**
	 * We received an onion message that is intended to be forwarded to a peer
	 * that is currently offline. This event will only be generated if the
	 * `OnionMessenger` was initialized with
	 * [`OnionMessenger::new_with_offline_peer_interception`], see its docs.
	 * 
	 * The offline peer should be awoken if possible on receipt of this event, such as via the LSPS5
	 * protocol.
	 * 
	 * Once they connect, you should handle the generated [`Event::OnionMessagePeerConnected`] and
	 * provide the stored message.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`), but won't be persisted across restarts.
	 * 
	 * [`OnionMessenger::new_with_offline_peer_interception`]: crate::onion_message::messenger::OnionMessenger::new_with_offline_peer_interception
	 */
	public final static class OnionMessageIntercepted extends Event {
		/**
		 * The node id of the offline peer.
		*/
		public final byte[] peer_node_id;
		/**
		 * The onion message intended to be forwarded to `peer_node_id`.
		*/
		public final org.ldk.structs.OnionMessage message;
		private OnionMessageIntercepted(long ptr, bindings.LDKEvent.OnionMessageIntercepted obj) {
			super(null, ptr);
			this.peer_node_id = obj.peer_node_id;
			long message = obj.message;
			org.ldk.structs.OnionMessage message_hu_conv = null; if (message < 0 || message > 4096) { message_hu_conv = new org.ldk.structs.OnionMessage(null, message); }
			if (message_hu_conv != null) { message_hu_conv.ptrs_to.add(this); };
			this.message = message_hu_conv;
		}
	}
	/**
	 * Indicates that an onion message supporting peer has come online and any messages previously
	 * stored for them (from [`Event::OnionMessageIntercepted`]s) should be forwarded to them by
	 * calling [`OnionMessenger::forward_onion_message`].
	 * 
	 * This event will only be generated if the `OnionMessenger` was initialized with
	 * [`OnionMessenger::new_with_offline_peer_interception`], see its docs.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`), but won't be persisted across restarts.
	 * 
	 * [`OnionMessenger::forward_onion_message`]: crate::onion_message::messenger::OnionMessenger::forward_onion_message
	 * [`OnionMessenger::new_with_offline_peer_interception`]: crate::onion_message::messenger::OnionMessenger::new_with_offline_peer_interception
	 */
	public final static class OnionMessagePeerConnected extends Event {
		/**
		 * The node id of the peer we just connected to, who advertises support for
		 * onion messages.
		*/
		public final byte[] peer_node_id;
		private OnionMessagePeerConnected(long ptr, bindings.LDKEvent.OnionMessagePeerConnected obj) {
			super(null, ptr);
			this.peer_node_id = obj.peer_node_id;
		}
	}
	/**
	 * As a static invoice server, we received a [`StaticInvoice`] from an async recipient that wants
	 * us to serve the invoice to payers on their behalf when they are offline. This event will only
	 * be generated if we previously created paths using
	 * [`ChannelManager::blinded_paths_for_async_recipient`] and the recipient was configured with
	 * them via [`ChannelManager::set_paths_to_static_invoice_server`].
	 * 
	 * [`ChannelManager::blinded_paths_for_async_recipient`]: crate::ln::channelmanager::ChannelManager::blinded_paths_for_async_recipient
	 * [`ChannelManager::set_paths_to_static_invoice_server`]: crate::ln::channelmanager::ChannelManager::set_paths_to_static_invoice_server
	 */
	public final static class PersistStaticInvoice extends Event {
		/**
		 * The invoice that should be persisted and later provided to payers when handling a future
		 * [`Event::StaticInvoiceRequested`].
		*/
		public final org.ldk.structs.StaticInvoice invoice;
		/**
		 * The path to where invoice requests will be forwarded. If we receive an invoice
		 * request, we'll forward it to the async recipient over this path in case the
		 * recipient is online to provide a new invoice. This path should be persisted and
		 * later provided to [`ChannelManager::respond_to_static_invoice_request`].
		 * 
		 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to our node or one of our
		 * peers. This is because, for DoS protection, invoice requests forwarded over this path are
		 * treated by our node like any other onion message forward and will not generate
		 * [`Event::ConnectionNeeded`] if the first hop in the path is not our peer.
		 * 
		 * If the next-hop peer in the path is offline, if configured to do so we will generate an
		 * [`Event::OnionMessageIntercepted`] for the invoice request.
		 * 
		 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
		*/
		public final org.ldk.structs.BlindedMessagePath invoice_request_path;
		/**
		 * Useful for the recipient to replace a specific invoice stored by us as the static invoice
		 * server.
		 * 
		 * When this invoice and its metadata are persisted, this slot number should be included so if
		 * we receive another [`Event::PersistStaticInvoice`] containing the same slot number we can
		 * swap the existing invoice out for the new one.
		*/
		public final short invoice_slot;
		/**
		 * An identifier for the recipient, originally provided to
		 * [`ChannelManager::blinded_paths_for_async_recipient`].
		 * 
		 * When an [`Event::StaticInvoiceRequested`] comes in for the invoice, this id will be surfaced
		 * and can be used alongside the `invoice_slot` to retrieve the invoice from the database.
		 * 
		 * [`ChannelManager::blinded_paths_for_async_recipient`]: crate::ln::channelmanager::ChannelManager::blinded_paths_for_async_recipient
		*/
		public final byte[] recipient_id;
		/**
		 * Once the [`StaticInvoice`] and `invoice_slot` are persisted,
		 * [`ChannelManager::static_invoice_persisted`] should be called with this responder to confirm
		 * to the recipient that their [`Offer`] is ready to be used for async payments.
		 * 
		 * [`ChannelManager::static_invoice_persisted`]: crate::ln::channelmanager::ChannelManager::static_invoice_persisted
		 * [`Offer`]: crate::offers::offer::Offer
		*/
		public final org.ldk.structs.Responder invoice_persisted_path;
		private PersistStaticInvoice(long ptr, bindings.LDKEvent.PersistStaticInvoice obj) {
			super(null, ptr);
			long invoice = obj.invoice;
			org.ldk.structs.StaticInvoice invoice_hu_conv = null; if (invoice < 0 || invoice > 4096) { invoice_hu_conv = new org.ldk.structs.StaticInvoice(null, invoice); }
			if (invoice_hu_conv != null) { invoice_hu_conv.ptrs_to.add(this); };
			this.invoice = invoice_hu_conv;
			long invoice_request_path = obj.invoice_request_path;
			org.ldk.structs.BlindedMessagePath invoice_request_path_hu_conv = null; if (invoice_request_path < 0 || invoice_request_path > 4096) { invoice_request_path_hu_conv = new org.ldk.structs.BlindedMessagePath(null, invoice_request_path); }
			if (invoice_request_path_hu_conv != null) { invoice_request_path_hu_conv.ptrs_to.add(this); };
			this.invoice_request_path = invoice_request_path_hu_conv;
			this.invoice_slot = obj.invoice_slot;
			this.recipient_id = obj.recipient_id;
			long invoice_persisted_path = obj.invoice_persisted_path;
			org.ldk.structs.Responder invoice_persisted_path_hu_conv = null; if (invoice_persisted_path < 0 || invoice_persisted_path > 4096) { invoice_persisted_path_hu_conv = new org.ldk.structs.Responder(null, invoice_persisted_path); }
			if (invoice_persisted_path_hu_conv != null) { invoice_persisted_path_hu_conv.ptrs_to.add(this); };
			this.invoice_persisted_path = invoice_persisted_path_hu_conv;
		}
	}
	/**
	 * As a static invoice server, we received an [`InvoiceRequest`] on behalf of an often-offline
	 * recipient for whom we are serving [`StaticInvoice`]s.
	 * 
	 * This event will only be generated if we previously created paths using
	 * [`ChannelManager::blinded_paths_for_async_recipient`] and the recipient was configured with
	 * them via [`ChannelManager::set_paths_to_static_invoice_server`].
	 * 
	 * If we previously persisted a [`StaticInvoice`] from an [`Event::PersistStaticInvoice`] that
	 * matches the below `recipient_id` and `invoice_slot`, that invoice should be retrieved now
	 * and forwarded to the payer via [`ChannelManager::respond_to_static_invoice_request`].
	 * The invoice request path previously persisted from [`Event::PersistStaticInvoice`] should
	 * also be provided in [`ChannelManager::respond_to_static_invoice_request`].
	 * 
	 * [`ChannelManager::blinded_paths_for_async_recipient`]: crate::ln::channelmanager::ChannelManager::blinded_paths_for_async_recipient
	 * [`ChannelManager::set_paths_to_static_invoice_server`]: crate::ln::channelmanager::ChannelManager::set_paths_to_static_invoice_server
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
	 */
	public final static class StaticInvoiceRequested extends Event {
		/**
		 * An identifier for the recipient previously surfaced in
		 * [`Event::PersistStaticInvoice::recipient_id`]. Useful when paired with the `invoice_slot` to
		 * retrieve the [`StaticInvoice`] requested by the payer.
		*/
		public final byte[] recipient_id;
		/**
		 * The slot number for the invoice being requested, previously surfaced in
		 * [`Event::PersistStaticInvoice::invoice_slot`]. Useful when paired with the `recipient_id` to
		 * retrieve the [`StaticInvoice`] requested by the payer.
		*/
		public final short invoice_slot;
		/**
		 * The path over which the [`StaticInvoice`] will be sent to the payer, which should be
		 * provided to [`ChannelManager::respond_to_static_invoice_request`] along with the invoice.
		 * 
		 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
		*/
		public final org.ldk.structs.Responder reply_path;
		/**
		 * The invoice request that will be forwarded to the async recipient to give the
		 * recipient a chance to provide an invoice in case it is online. It should be
		 * provided to [`ChannelManager::respond_to_static_invoice_request`].
		 * 
		 * [`ChannelManager::respond_to_static_invoice_request`]: crate::ln::channelmanager::ChannelManager::respond_to_static_invoice_request
		*/
		public final org.ldk.structs.InvoiceRequest invoice_request;
		private StaticInvoiceRequested(long ptr, bindings.LDKEvent.StaticInvoiceRequested obj) {
			super(null, ptr);
			this.recipient_id = obj.recipient_id;
			this.invoice_slot = obj.invoice_slot;
			long reply_path = obj.reply_path;
			org.ldk.structs.Responder reply_path_hu_conv = null; if (reply_path < 0 || reply_path > 4096) { reply_path_hu_conv = new org.ldk.structs.Responder(null, reply_path); }
			if (reply_path_hu_conv != null) { reply_path_hu_conv.ptrs_to.add(this); };
			this.reply_path = reply_path_hu_conv;
			long invoice_request = obj.invoice_request;
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.add(this); };
			this.invoice_request = invoice_request_hu_conv;
		}
	}
	/**
	 * Indicates that a channel funding transaction constructed interactively is ready to be
	 * signed. This event will only be triggered if at least one input was contributed.
	 * 
	 * The transaction contains all inputs and outputs provided by both parties including the
	 * channel's funding output and a change output if applicable.
	 * 
	 * No part of the transaction should be changed before signing as the content of the transaction
	 * has already been negotiated with the counterparty.
	 * 
	 * Each signature MUST use the `SIGHASH_ALL` flag to avoid invalidation of the initial commitment and
	 * hence possible loss of funds.
	 * 
	 * After signing, call [`ChannelManager::funding_transaction_signed`] with the (partially) signed
	 * funding transaction.
	 * 
	 * Generated in [`ChannelManager`] message handling.
	 * 
	 * # Failure Behavior and Persistence
	 * This event will eventually be replayed after failures-to-handle (i.e., the event handler
	 * returning `Err(ReplayEvent ())`), but will only be regenerated as needed after restarts.
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
	 */
	public final static class FundingTransactionReadyForSigning extends Event {
		/**
		 * The `channel_id` of the channel which you'll need to pass back into
		 * [`ChannelManager::funding_transaction_signed`].
		 * 
		 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * The counterparty's `node_id`, which you'll need to pass back into
		 * [`ChannelManager::funding_transaction_signed`].
		 * 
		 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
		*/
		public final byte[] counterparty_node_id;
		/**
		 * The `user_channel_id` value passed in for outbound channels, or for inbound channels if
		 * [`UserConfig::manually_accept_inbound_channels`] config flag is set to true. Otherwise
		 * `user_channel_id` will be randomized for inbound channels.
		 * 
		 * [`UserConfig::manually_accept_inbound_channels`]: crate::util::config::UserConfig::manually_accept_inbound_channels
		*/
		public final org.ldk.util.UInt128 user_channel_id;
		/**
		 * The unsigned transaction to be signed and passed back to
		 * [`ChannelManager::funding_transaction_signed`].
		 * 
		 * [`ChannelManager::funding_transaction_signed`]: crate::ln::channelmanager::ChannelManager::funding_transaction_signed
		*/
		public final byte[] unsigned_transaction;
		private FundingTransactionReadyForSigning(long ptr, bindings.LDKEvent.FundingTransactionReadyForSigning obj) {
			super(null, ptr);
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
			byte[] user_channel_id = obj.user_channel_id;
			org.ldk.util.UInt128 user_channel_id_conv = new org.ldk.util.UInt128(user_channel_id);
			this.user_channel_id = user_channel_id_conv;
			this.unsigned_transaction = obj.unsigned_transaction;
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
	public static Event funding_generation_ready(org.ldk.structs.ChannelId temporary_channel_id, byte[] counterparty_node_id, long channel_value_satoshis, byte[] output_script, org.ldk.util.UInt128 user_channel_id) {
		long ret = bindings.Event_funding_generation_ready(temporary_channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), channel_value_satoshis, output_script, user_channel_id.getLEBytes());
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
	 * Utility method to constructs a new FundingTxBroadcastSafe-variant Event
	 */
	public static Event funding_tx_broadcast_safe(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, org.ldk.structs.OutPoint funding_txo, byte[] counterparty_node_id, org.ldk.structs.ChannelId former_temporary_channel_id) {
		long ret = bindings.Event_funding_tx_broadcast_safe(channel_id.ptr, user_channel_id.getLEBytes(), funding_txo.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), former_temporary_channel_id.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(former_temporary_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimable-variant Event
	 */
	public static Event payment_claimable(byte[] receiver_node_id, byte[] payment_hash, org.ldk.structs.RecipientOnionFields onion_fields, long amount_msat, long counterparty_skimmed_fee_msat, org.ldk.structs.PaymentPurpose purpose, TwoTuple_ChannelIdCOption_U128ZZ[] receiving_channel_ids, org.ldk.structs.Option_u32Z claim_deadline, org.ldk.structs.Option_ThirtyTwoBytesZ payment_id) {
		long ret = bindings.Event_payment_claimable(InternalUtils.check_arr_len(receiver_node_id, 33), InternalUtils.check_arr_len(payment_hash, 32), onion_fields.ptr, amount_msat, counterparty_skimmed_fee_msat, purpose.ptr, receiving_channel_ids != null ? Arrays.stream(receiving_channel_ids).mapToLong(receiving_channel_ids_conv_34 -> receiving_channel_ids_conv_34.ptr).toArray() : null, claim_deadline.ptr, payment_id.ptr);
		Reference.reachabilityFence(receiver_node_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(onion_fields);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(counterparty_skimmed_fee_msat);
		Reference.reachabilityFence(purpose);
		Reference.reachabilityFence(receiving_channel_ids);
		Reference.reachabilityFence(claim_deadline);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimed-variant Event
	 */
	public static Event payment_claimed(byte[] receiver_node_id, byte[] payment_hash, long amount_msat, org.ldk.structs.PaymentPurpose purpose, ClaimedHTLC[] htlcs, org.ldk.structs.Option_u64Z sender_intended_total_msat, org.ldk.structs.RecipientOnionFields onion_fields, org.ldk.structs.Option_ThirtyTwoBytesZ payment_id) {
		long ret = bindings.Event_payment_claimed(InternalUtils.check_arr_len(receiver_node_id, 33), InternalUtils.check_arr_len(payment_hash, 32), amount_msat, purpose.ptr, htlcs != null ? Arrays.stream(htlcs).mapToLong(htlcs_conv_13 -> htlcs_conv_13.ptr).toArray() : null, sender_intended_total_msat.ptr, onion_fields.ptr, payment_id.ptr);
		Reference.reachabilityFence(receiver_node_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(purpose);
		Reference.reachabilityFence(htlcs);
		Reference.reachabilityFence(sender_intended_total_msat);
		Reference.reachabilityFence(onion_fields);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ConnectionNeeded-variant Event
	 */
	public static Event connection_needed(byte[] node_id, SocketAddress[] addresses) {
		long ret = bindings.Event_connection_needed(InternalUtils.check_arr_len(node_id, 33), addresses != null ? Arrays.stream(addresses).mapToLong(addresses_conv_15 -> addresses_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(addresses);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceReceived-variant Event
	 */
	public static Event invoice_received(byte[] payment_id, org.ldk.structs.Bolt12Invoice invoice, org.ldk.structs.Option_OffersContextZ context, org.ldk.structs.Responder responder) {
		long ret = bindings.Event_invoice_received(InternalUtils.check_arr_len(payment_id, 32), invoice.ptr, context.ptr, responder.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(responder);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static Event payment_sent(org.ldk.structs.Option_ThirtyTwoBytesZ payment_id, byte[] payment_preimage, byte[] payment_hash, org.ldk.structs.Option_u64Z amount_msat, org.ldk.structs.Option_u64Z fee_paid_msat, org.ldk.structs.Option_PaidBolt12InvoiceZ bolt12_invoice) {
		long ret = bindings.Event_payment_sent(payment_id.ptr, InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_hash, 32), amount_msat.ptr, fee_paid_msat.ptr, bolt12_invoice.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(fee_paid_msat);
		Reference.reachabilityFence(bolt12_invoice);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static Event payment_failed(byte[] payment_id, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash, org.ldk.structs.Option_PaymentFailureReasonZ reason) {
		long ret = bindings.Event_payment_failed(InternalUtils.check_arr_len(payment_id, 32), payment_hash.ptr, reason.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathSuccessful-variant Event
	 */
	public static Event payment_path_successful(byte[] payment_id, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash, org.ldk.structs.Path path, int[] hold_times) {
		long ret = bindings.Event_payment_path_successful(InternalUtils.check_arr_len(payment_id, 32), payment_hash.ptr, path.ptr, hold_times);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(hold_times);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static Event payment_path_failed(org.ldk.structs.Option_ThirtyTwoBytesZ payment_id, byte[] payment_hash, boolean payment_failed_permanently, org.ldk.structs.PathFailure failure, org.ldk.structs.Path path, org.ldk.structs.Option_u64Z short_channel_id, int[] hold_times) {
		long ret = bindings.Event_payment_path_failed(payment_id.ptr, InternalUtils.check_arr_len(payment_hash, 32), payment_failed_permanently, failure.ptr, path.ptr, short_channel_id.ptr, hold_times);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(payment_failed_permanently);
		Reference.reachabilityFence(failure);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(hold_times);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeSuccessful-variant Event
	 */
	public static Event probe_successful(byte[] payment_id, byte[] payment_hash, org.ldk.structs.Path path) {
		long ret = bindings.Event_probe_successful(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProbeFailed-variant Event
	 */
	public static Event probe_failed(byte[] payment_id, byte[] payment_hash, org.ldk.structs.Path path, org.ldk.structs.Option_u64Z short_channel_id) {
		long ret = bindings.Event_probe_failed(InternalUtils.check_arr_len(payment_id, 32), InternalUtils.check_arr_len(payment_hash, 32), path.ptr, short_channel_id.ptr);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(short_channel_id);
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
	public static Event spendable_outputs(SpendableOutputDescriptor[] outputs, org.ldk.structs.ChannelId channel_id) {
		long ret = bindings.Event_spendable_outputs(outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_27 -> outputs_conv_27.ptr).toArray() : null, channel_id.ptr);
		Reference.reachabilityFence(outputs);
		Reference.reachabilityFence(channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static Event payment_forwarded(org.ldk.structs.ChannelId prev_channel_id, org.ldk.structs.ChannelId next_channel_id, org.ldk.structs.Option_U128Z prev_user_channel_id, org.ldk.structs.Option_U128Z next_user_channel_id, byte[] prev_node_id, byte[] next_node_id, org.ldk.structs.Option_u64Z total_fee_earned_msat, org.ldk.structs.Option_u64Z skimmed_fee_msat, boolean claim_from_onchain_tx, org.ldk.structs.Option_u64Z outbound_amount_forwarded_msat) {
		long ret = bindings.Event_payment_forwarded(prev_channel_id.ptr, next_channel_id.ptr, prev_user_channel_id.ptr, next_user_channel_id.ptr, InternalUtils.check_arr_len(prev_node_id, 33), InternalUtils.check_arr_len(next_node_id, 33), total_fee_earned_msat.ptr, skimmed_fee_msat.ptr, claim_from_onchain_tx, outbound_amount_forwarded_msat.ptr);
		Reference.reachabilityFence(prev_channel_id);
		Reference.reachabilityFence(next_channel_id);
		Reference.reachabilityFence(prev_user_channel_id);
		Reference.reachabilityFence(next_user_channel_id);
		Reference.reachabilityFence(prev_node_id);
		Reference.reachabilityFence(next_node_id);
		Reference.reachabilityFence(total_fee_earned_msat);
		Reference.reachabilityFence(skimmed_fee_msat);
		Reference.reachabilityFence(claim_from_onchain_tx);
		Reference.reachabilityFence(outbound_amount_forwarded_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelPending-variant Event
	 */
	public static Event channel_pending(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, org.ldk.structs.ChannelId former_temporary_channel_id, byte[] counterparty_node_id, org.ldk.structs.OutPoint funding_txo, org.ldk.structs.ChannelTypeFeatures channel_type, org.ldk.structs.Option_CVec_u8ZZ funding_redeem_script) {
		long ret = bindings.Event_channel_pending(channel_id.ptr, user_channel_id.getLEBytes(), former_temporary_channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), funding_txo.ptr, channel_type.ptr, funding_redeem_script.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(former_temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(channel_type);
		Reference.reachabilityFence(funding_redeem_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelReady-variant Event
	 */
	public static Event channel_ready(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, byte[] counterparty_node_id, org.ldk.structs.Option_OutPointZ funding_txo, org.ldk.structs.ChannelTypeFeatures channel_type) {
		long ret = bindings.Event_channel_ready(channel_id.ptr, user_channel_id.getLEBytes(), InternalUtils.check_arr_len(counterparty_node_id, 33), funding_txo.ptr, channel_type.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(channel_type);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static Event channel_closed(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, org.ldk.structs.ClosureReason reason, byte[] counterparty_node_id, org.ldk.structs.Option_u64Z channel_capacity_sats, org.ldk.structs.OutPoint channel_funding_txo, org.ldk.structs.Option_u64Z last_local_balance_msat) {
		long ret = bindings.Event_channel_closed(channel_id.ptr, user_channel_id.getLEBytes(), reason.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), channel_capacity_sats.ptr, channel_funding_txo.ptr, last_local_balance_msat.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(reason);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(channel_capacity_sats);
		Reference.reachabilityFence(channel_funding_txo);
		Reference.reachabilityFence(last_local_balance_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SplicePending-variant Event
	 */
	public static Event splice_pending(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, byte[] counterparty_node_id, org.ldk.structs.OutPoint new_funding_txo, org.ldk.structs.ChannelTypeFeatures channel_type, byte[] new_funding_redeem_script) {
		long ret = bindings.Event_splice_pending(channel_id.ptr, user_channel_id.getLEBytes(), InternalUtils.check_arr_len(counterparty_node_id, 33), new_funding_txo.ptr, channel_type.ptr, new_funding_redeem_script);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(new_funding_txo);
		Reference.reachabilityFence(channel_type);
		Reference.reachabilityFence(new_funding_redeem_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceFailed-variant Event
	 */
	public static Event splice_failed(org.ldk.structs.ChannelId channel_id, org.ldk.util.UInt128 user_channel_id, byte[] counterparty_node_id, org.ldk.structs.Option_OutPointZ abandoned_funding_txo, org.ldk.structs.ChannelTypeFeatures channel_type, OutPoint[] contributed_inputs, TxOut[] contributed_outputs) {
		long ret = bindings.Event_splice_failed(channel_id.ptr, user_channel_id.getLEBytes(), InternalUtils.check_arr_len(counterparty_node_id, 33), abandoned_funding_txo.ptr, channel_type.ptr, contributed_inputs != null ? Arrays.stream(contributed_inputs).mapToLong(contributed_inputs_conv_10 -> contributed_inputs_conv_10.ptr).toArray() : null, contributed_outputs != null ? Arrays.stream(contributed_outputs).mapToLong(contributed_outputs_conv_7 -> contributed_outputs_conv_7.ptr).toArray() : null);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(abandoned_funding_txo);
		Reference.reachabilityFence(channel_type);
		Reference.reachabilityFence(contributed_inputs);
		Reference.reachabilityFence(contributed_outputs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DiscardFunding-variant Event
	 */
	public static Event discard_funding(org.ldk.structs.ChannelId channel_id, org.ldk.structs.FundingInfo funding_info) {
		long ret = bindings.Event_discard_funding(channel_id.ptr, funding_info.ptr);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(funding_info);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OpenChannelRequest-variant Event
	 */
	public static Event open_channel_request(org.ldk.structs.ChannelId temporary_channel_id, byte[] counterparty_node_id, long funding_satoshis, org.ldk.structs.InboundChannelFunds channel_negotiation_type, org.ldk.structs.ChannelTypeFeatures channel_type, boolean is_announced, org.ldk.structs.ChannelParameters params) {
		long ret = bindings.Event_open_channel_request(temporary_channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), funding_satoshis, channel_negotiation_type.ptr, channel_type.ptr, is_announced, params.ptr);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_satoshis);
		Reference.reachabilityFence(channel_negotiation_type);
		Reference.reachabilityFence(channel_type);
		Reference.reachabilityFence(is_announced);
		Reference.reachabilityFence(params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCHandlingFailed-variant Event
	 */
	public static Event htlchandling_failed(org.ldk.structs.ChannelId prev_channel_id, org.ldk.structs.HTLCHandlingFailureType failure_type, org.ldk.structs.Option_HTLCHandlingFailureReasonZ failure_reason) {
		long ret = bindings.Event_htlchandling_failed(prev_channel_id.ptr, failure_type.ptr, failure_reason.ptr);
		Reference.reachabilityFence(prev_channel_id);
		Reference.reachabilityFence(failure_type);
		Reference.reachabilityFence(failure_reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BumpTransaction-variant Event
	 */
	public static Event bump_transaction(org.ldk.structs.BumpTransactionEvent a) {
		long ret = bindings.Event_bump_transaction(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessageIntercepted-variant Event
	 */
	public static Event onion_message_intercepted(byte[] peer_node_id, org.ldk.structs.OnionMessage message) {
		long ret = bindings.Event_onion_message_intercepted(InternalUtils.check_arr_len(peer_node_id, 33), message.ptr);
		Reference.reachabilityFence(peer_node_id);
		Reference.reachabilityFence(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnionMessagePeerConnected-variant Event
	 */
	public static Event onion_message_peer_connected(byte[] peer_node_id) {
		long ret = bindings.Event_onion_message_peer_connected(InternalUtils.check_arr_len(peer_node_id, 33));
		Reference.reachabilityFence(peer_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PersistStaticInvoice-variant Event
	 */
	public static Event persist_static_invoice(org.ldk.structs.StaticInvoice invoice, org.ldk.structs.BlindedMessagePath invoice_request_path, short invoice_slot, byte[] recipient_id, org.ldk.structs.Responder invoice_persisted_path) {
		long ret = bindings.Event_persist_static_invoice(invoice.ptr, invoice_request_path.ptr, invoice_slot, recipient_id, invoice_persisted_path.ptr);
		Reference.reachabilityFence(invoice);
		Reference.reachabilityFence(invoice_request_path);
		Reference.reachabilityFence(invoice_slot);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(invoice_persisted_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoiceRequested-variant Event
	 */
	public static Event static_invoice_requested(byte[] recipient_id, short invoice_slot, org.ldk.structs.Responder reply_path, org.ldk.structs.InvoiceRequest invoice_request) {
		long ret = bindings.Event_static_invoice_requested(recipient_id, invoice_slot, reply_path.ptr, invoice_request.ptr);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(invoice_slot);
		Reference.reachabilityFence(reply_path);
		Reference.reachabilityFence(invoice_request);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTransactionReadyForSigning-variant Event
	 */
	public static Event funding_transaction_ready_for_signing(org.ldk.structs.ChannelId channel_id, byte[] counterparty_node_id, org.ldk.util.UInt128 user_channel_id, byte[] unsigned_transaction) {
		long ret = bindings.Event_funding_transaction_ready_for_signing(channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), user_channel_id.getLEBytes(), unsigned_transaction);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(unsigned_transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Event ret_hu_conv = org.ldk.structs.Event.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Events contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Event b) {
		boolean ret = bindings.Event_eq(this.ptr, b.ptr);
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

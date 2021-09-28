package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
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
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

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
		 * The value passed in to ChannelManager::create_channel
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
	public final static class PaymentReceived extends Event {
		/**
		 * The hash for which the preimage should be handed to the ChannelManager.
		*/
		public final byte[] payment_hash;
		/**
		 * The value, in thousandths of a satoshi, that this payment is for. Note that you must
		 * compare this to the expected value before accepting the payment (as otherwise you are
		 * providing proof-of-payment for less than the value you expected!).
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
	public final static class PaymentSent extends Event {
		/**
		 * The preimage to the hash given to ChannelManager::send_payment.
		 * Note that this serves as a payment receipt, if you wish to have such a thing, you must
		 * store it somehow!
		*/
		public final byte[] payment_preimage;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			this.payment_preimage = obj.payment_preimage;
		}
	}
	public final static class PaymentPathFailed extends Event {
		/**
		 * The hash which was given to ChannelManager::send_payment.
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
		*/
		public final boolean all_paths_failed;
		/**
		 * The payment path that failed.
		*/
		public final RouteHop[] path;
		private PaymentPathFailed(long ptr, bindings.LDKEvent.PaymentPathFailed obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.rejected_by_dest = obj.rejected_by_dest;
			long network_update = obj.network_update;
			Option_NetworkUpdateZ network_update_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			network_update_hu_conv.ptrs_to.add(this);
			this.network_update = network_update_hu_conv;
			this.all_paths_failed = obj.all_paths_failed;
			long[] path = obj.path;
			RouteHop[] path_conv_10_arr = new RouteHop[path.length];
			for (int k = 0; k < path.length; k++) {
				long path_conv_10 = path[k];
				RouteHop path_conv_10_hu_conv = new RouteHop(null, path_conv_10);
				path_conv_10_hu_conv.ptrs_to.add(this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
			this.path = path_conv_10_arr;
		}
	}
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
	public final static class SpendableOutputs extends Event {
		/**
		 * The outputs which you should store as spendable by you.
		*/
		public final SpendableOutputDescriptor[] outputs;
		private SpendableOutputs(long ptr, bindings.LDKEvent.SpendableOutputs obj) {
			super(null, ptr);
			long[] outputs = obj.outputs;
			SpendableOutputDescriptor[] outputs_conv_27_arr = new SpendableOutputDescriptor[outputs.length];
			for (int b = 0; b < outputs.length; b++) {
				long outputs_conv_27 = outputs[b];
				SpendableOutputDescriptor outputs_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				outputs_conv_27_hu_conv.ptrs_to.add(this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
			this.outputs = outputs_conv_27_arr;
		}
	}
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
	public final static class ChannelClosed extends Event {
		/**
		 * The channel_id of the channel which has been closed. Note that on-chain transactions
		 * resolving the channel are likely still awaiting confirmation.
		*/
		public final byte[] channel_id;
		/**
		 * The reason the channel was closed.
		*/
		public final ClosureReason reason;
		private ChannelClosed(long ptr, bindings.LDKEvent.ChannelClosed obj) {
			super(null, ptr);
			this.channel_id = obj.channel_id;
			long reason = obj.reason;
			ClosureReason reason_hu_conv = ClosureReason.constr_from_ptr(reason);
			reason_hu_conv.ptrs_to.add(this);
			this.reason = reason_hu_conv;
		}
	}
	/**
	 * Creates a copy of the Event
	 */
	public Event clone() {
		long ret = bindings.Event_clone(this.ptr);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingGenerationReady-variant Event
	 */
	public static Event funding_generation_ready(byte[] temporary_channel_id, long channel_value_satoshis, byte[] output_script, long user_channel_id) {
		long ret = bindings.Event_funding_generation_ready(temporary_channel_id, channel_value_satoshis, output_script, user_channel_id);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentReceived-variant Event
	 */
	public static Event payment_received(byte[] payment_hash, long amt, PaymentPurpose purpose) {
		long ret = bindings.Event_payment_received(payment_hash, amt, purpose.ptr);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSent-variant Event
	 */
	public static Event payment_sent(byte[] payment_preimage) {
		long ret = bindings.Event_payment_sent(payment_preimage);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentPathFailed-variant Event
	 */
	public static Event payment_path_failed(byte[] payment_hash, boolean rejected_by_dest, Option_NetworkUpdateZ network_update, boolean all_paths_failed, RouteHop[] path) {
		long ret = bindings.Event_payment_path_failed(payment_hash, rejected_by_dest, network_update.ptr, all_paths_failed, path != null ? Arrays.stream(path).mapToLong(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray() : null);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingHTLCsForwardable-variant Event
	 */
	public static Event pending_htlcs_forwardable(long time_forwardable) {
		long ret = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpendableOutputs-variant Event
	 */
	public static Event spendable_outputs(SpendableOutputDescriptor[] outputs) {
		long ret = bindings.Event_spendable_outputs(outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_27 -> outputs_conv_27.ptr).toArray() : null);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentForwarded-variant Event
	 */
	public static Event payment_forwarded(Option_u64Z fee_earned_msat, boolean claim_from_onchain_tx) {
		long ret = bindings.Event_payment_forwarded(fee_earned_msat.ptr, claim_from_onchain_tx);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant Event
	 */
	public static Event channel_closed(byte[] channel_id, ClosureReason reason) {
		long ret = bindings.Event_channel_closed(channel_id, reason.ptr);
		if (ret < 1024) { return null; }
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Event object into a byte array which can be read by Event_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Event_write(this.ptr);
		return ret;
	}

}

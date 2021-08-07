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
		if (raw_val.getClass() == bindings.LDKEvent.PaymentFailed.class) {
			return new PaymentFailed(ptr, (bindings.LDKEvent.PaymentFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PendingHTLCsForwardable.class) {
			return new PendingHTLCsForwardable(ptr, (bindings.LDKEvent.PendingHTLCsForwardable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpendableOutputs.class) {
			return new SpendableOutputs(ptr, (bindings.LDKEvent.SpendableOutputs)raw_val);
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
		 * The preimage to the payment_hash, if the payment hash (and secret) were fetched via
		 * [`ChannelManager::create_inbound_payment`]. If provided, this can be handed directly to
		 * [`ChannelManager::claim_funds`].
		 * 
		 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
		 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] payment_preimage;
		/**
		 * The \"payment secret\". This authenticates the sender to the recipient, preventing a
		 * number of deanonymization attacks during the routing process.
		 * It is provided here for your reference, however its accuracy is enforced directly by
		 * [`ChannelManager`] using the values you previously provided to
		 * [`ChannelManager::create_inbound_payment`] or
		 * [`ChannelManager::create_inbound_payment_for_hash`].
		 * 
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
		 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
		*/
		public final byte[] payment_secret;
		/**
		 * The value, in thousandths of a satoshi, that this payment is for. Note that you must
		 * compare this to the expected value before accepting the payment (as otherwise you are
		 * providing proof-of-payment for less than the value you expected!).
		*/
		public final long amt;
		/**
		 * This is the `user_payment_id` which was provided to
		 * [`ChannelManager::create_inbound_payment_for_hash`] or
		 * [`ChannelManager::create_inbound_payment`]. It has no meaning inside of LDK and is
		 * simply copied here. It may be used to correlate PaymentReceived events with invoice
		 * metadata stored elsewhere.
		 * 
		 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
		 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
		*/
		public final long user_payment_id;
		private PaymentReceived(long ptr, bindings.LDKEvent.PaymentReceived obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.payment_preimage = obj.payment_preimage;
			this.payment_secret = obj.payment_secret;
			this.amt = obj.amt;
			this.user_payment_id = obj.user_payment_id;
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
	public final static class PaymentFailed extends Event {
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
		private PaymentFailed(long ptr, bindings.LDKEvent.PaymentFailed obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.rejected_by_dest = obj.rejected_by_dest;
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
	public static Event payment_received(byte[] payment_hash, byte[] payment_preimage, byte[] payment_secret, long amt, long user_payment_id) {
		long ret = bindings.Event_payment_received(payment_hash, payment_preimage, payment_secret, amt, user_payment_id);
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
	 * Utility method to constructs a new PaymentFailed-variant Event
	 */
	public static Event payment_failed(byte[] payment_hash, boolean rejected_by_dest) {
		long ret = bindings.Event_payment_failed(payment_hash, rejected_by_dest);
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
		/* TODO 2 SpendableOutputDescriptor  */;
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

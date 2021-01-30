package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
		if (raw_val.getClass() == bindings.LDKEvent.FundingBroadcastSafe.class) {
			return new FundingBroadcastSafe(ptr, (bindings.LDKEvent.FundingBroadcastSafe)raw_val);
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
		public final byte[] temporary_channel_id;
		public final long channel_value_satoshis;
		public final byte[] output_script;
		public final long user_channel_id;
		private FundingGenerationReady(long ptr, bindings.LDKEvent.FundingGenerationReady obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.channel_value_satoshis = obj.channel_value_satoshis;
			this.output_script = obj.output_script;
			this.user_channel_id = obj.user_channel_id;
		}
	}
	public final static class FundingBroadcastSafe extends Event {
		public final OutPoint funding_txo;
		public final long user_channel_id;
		private FundingBroadcastSafe(long ptr, bindings.LDKEvent.FundingBroadcastSafe obj) {
			super(null, ptr);
			long funding_txo = obj.funding_txo;
			OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
			funding_txo_hu_conv.ptrs_to.add(this);
			this.funding_txo = funding_txo_hu_conv;
			this.user_channel_id = obj.user_channel_id;
		}
	}
	public final static class PaymentReceived extends Event {
		public final byte[] payment_hash;
		public final byte[] payment_secret;
		public final long amt;
		private PaymentReceived(long ptr, bindings.LDKEvent.PaymentReceived obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.payment_secret = obj.payment_secret;
			this.amt = obj.amt;
		}
	}
	public final static class PaymentSent extends Event {
		public final byte[] payment_preimage;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			this.payment_preimage = obj.payment_preimage;
		}
	}
	public final static class PaymentFailed extends Event {
		public final byte[] payment_hash;
		public final boolean rejected_by_dest;
		private PaymentFailed(long ptr, bindings.LDKEvent.PaymentFailed obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.rejected_by_dest = obj.rejected_by_dest;
		}
	}
	public final static class PendingHTLCsForwardable extends Event {
		public final long time_forwardable;
		private PendingHTLCsForwardable(long ptr, bindings.LDKEvent.PendingHTLCsForwardable obj) {
			super(null, ptr);
			this.time_forwardable = obj.time_forwardable;
		}
	}
	public final static class SpendableOutputs extends Event {
		public final SpendableOutputDescriptor[] outputs;
		private SpendableOutputs(long ptr, bindings.LDKEvent.SpendableOutputs obj) {
			super(null, ptr);
			long[] outputs = obj.outputs;
			SpendableOutputDescriptor[] arr_conv_27_arr = new SpendableOutputDescriptor[outputs.length];
			for (int b = 0; b < outputs.length; b++) {
				long arr_conv_27 = outputs[b];
				SpendableOutputDescriptor arr_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(arr_conv_27);
				arr_conv_27_hu_conv.ptrs_to.add(this);
				arr_conv_27_arr[b] = arr_conv_27_hu_conv;
			}
			this.outputs = arr_conv_27_arr;
		}
	}
}

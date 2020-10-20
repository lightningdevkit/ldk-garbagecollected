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
		bindings.Event_free(ptr);
	}
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
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
		public byte[] temporary_channel_id;
		public long channel_value_satoshis;
		public byte[] output_script;
		public long user_channel_id;
		private FundingGenerationReady(long ptr, bindings.LDKEvent.FundingGenerationReady obj) {
			super(null, ptr);
			this.temporary_channel_id = obj.temporary_channel_id;
			this.channel_value_satoshis = obj.channel_value_satoshis;
			this.output_script = obj.output_script;
			this.user_channel_id = obj.user_channel_id;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class FundingBroadcastSafe extends Event {
		public OutPoint funding_txo;
		public long user_channel_id;
		private FundingBroadcastSafe(long ptr, bindings.LDKEvent.FundingBroadcastSafe obj) {
			super(null, ptr);
			long funding_txo = obj.funding_txo;
			OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
			this.funding_txo = funding_txo_hu_conv;
			this.user_channel_id = obj.user_channel_id;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentReceived extends Event {
		public byte[] payment_hash;
		public byte[] payment_secret;
		public long amt;
		private PaymentReceived(long ptr, bindings.LDKEvent.PaymentReceived obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.payment_secret = obj.payment_secret;
			this.amt = obj.amt;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentSent extends Event {
		public byte[] payment_preimage;
		private PaymentSent(long ptr, bindings.LDKEvent.PaymentSent obj) {
			super(null, ptr);
			this.payment_preimage = obj.payment_preimage;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentFailed extends Event {
		public byte[] payment_hash;
		public boolean rejected_by_dest;
		private PaymentFailed(long ptr, bindings.LDKEvent.PaymentFailed obj) {
			super(null, ptr);
			this.payment_hash = obj.payment_hash;
			this.rejected_by_dest = obj.rejected_by_dest;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PendingHTLCsForwardable extends Event {
		public long time_forwardable;
		private PendingHTLCsForwardable(long ptr, bindings.LDKEvent.PendingHTLCsForwardable obj) {
			super(null, ptr);
			this.time_forwardable = obj.time_forwardable;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SpendableOutputs extends Event {
		public SpendableOutputDescriptor[] outputs;
		private SpendableOutputs(long ptr, bindings.LDKEvent.SpendableOutputs obj) {
			super(null, ptr);
			long[] outputs = obj.outputs;
			SpendableOutputDescriptor[] arr_conv_27_arr = new SpendableOutputDescriptor[outputs.length];
			for (int b = 0; b < outputs.length; b++) {
				long arr_conv_27 = outputs[b];
				SpendableOutputDescriptor arr_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(arr_conv_27);
				arr_conv_27_arr[b] = arr_conv_27_hu_conv;
			}
			this.outputs = arr_conv_27_arr;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}

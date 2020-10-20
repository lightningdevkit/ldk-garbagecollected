package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Event extends CommonBase {
	private Event(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static Event constr_from_ptr(long ptr) {
		bindings.LDKEvent raw_val = bindings.LDKEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKEvent.FundingGenerationReady.class) {
			return new FundingGenerationReady(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.FundingBroadcastSafe.class) {
			return new FundingBroadcastSafe(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentReceived.class) {
			return new PaymentReceived(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentSent.class) {
			return new PaymentSent(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PaymentFailed.class) {
			return new PaymentFailed(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.PendingHTLCsForwardable.class) {
			return new PendingHTLCsForwardable(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKEvent.SpendableOutputs.class) {
			return new SpendableOutputs(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class FundingGenerationReady extends Event {
		public byte[] temporary_channel_id;
		public long channel_value_satoshis;
		public byte[] output_script;
		public long user_channel_id;
		private FundingGenerationReady(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class FundingBroadcastSafe extends Event {
		public OutPoint funding_txo;
		public long user_channel_id;
		private FundingBroadcastSafe(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentReceived extends Event {
		public byte[] payment_hash;
		public byte[] payment_secret;
		public long amt;
		private PaymentReceived(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentSent extends Event {
		public byte[] payment_preimage;
		private PaymentSent(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PaymentFailed extends Event {
		public byte[] payment_hash;
		public boolean rejected_by_dest;
		private PaymentFailed(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class PendingHTLCsForwardable extends Event {
		public long time_forwardable;
		private PendingHTLCsForwardable(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SpendableOutputs extends Event {
		public SpendableOutputDescriptor[] outputs;
		private SpendableOutputs(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}

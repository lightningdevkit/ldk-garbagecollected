package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * An event to be processed by the ChannelManager.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MonitorEvent extends CommonBase {
	private MonitorEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorEvent_free(ptr); }
	}
	static MonitorEvent constr_from_ptr(long ptr) {
		bindings.LDKMonitorEvent raw_val = bindings.LDKMonitorEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKMonitorEvent.HTLCEvent.class) {
			return new HTLCEvent(ptr, (bindings.LDKMonitorEvent.HTLCEvent)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.CommitmentTxBroadcasted.class) {
			return new CommitmentTxBroadcasted(ptr, (bindings.LDKMonitorEvent.CommitmentTxBroadcasted)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class HTLCEvent extends MonitorEvent {
		public final HTLCUpdate htlc_event;
		private HTLCEvent(long ptr, bindings.LDKMonitorEvent.HTLCEvent obj) {
			super(null, ptr);
			long htlc_event = obj.htlc_event;
			HTLCUpdate htlc_event_hu_conv = new HTLCUpdate(null, htlc_event);
			htlc_event_hu_conv.ptrs_to.add(this);
			this.htlc_event = htlc_event_hu_conv;
		}
	}
	public final static class CommitmentTxBroadcasted extends MonitorEvent {
		public final OutPoint commitment_tx_broadcasted;
		private CommitmentTxBroadcasted(long ptr, bindings.LDKMonitorEvent.CommitmentTxBroadcasted obj) {
			super(null, ptr);
			long commitment_tx_broadcasted = obj.commitment_tx_broadcasted;
			OutPoint commitment_tx_broadcasted_hu_conv = new OutPoint(null, commitment_tx_broadcasted);
			commitment_tx_broadcasted_hu_conv.ptrs_to.add(this);
			this.commitment_tx_broadcasted = commitment_tx_broadcasted_hu_conv;
		}
	}
	/**
	 * Creates a copy of the MonitorEvent
	 */
	public MonitorEvent clone() {
		long ret = bindings.MonitorEvent_clone(this.ptr);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

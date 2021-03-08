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
		private HTLCEvent(long ptr, bindings.LDKMonitorEvent.HTLCEvent obj) {
			super(null, ptr);
		}
	}
	public final static class CommitmentTxBroadcasted extends MonitorEvent {
		private CommitmentTxBroadcasted(long ptr, bindings.LDKMonitorEvent.CommitmentTxBroadcasted obj) {
			super(null, ptr);
		}
	}
}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
		if (raw_val.getClass() == bindings.LDKMonitorEvent.HolderForceClosedWithInfo.class) {
			return new HolderForceClosedWithInfo(ptr, (bindings.LDKMonitorEvent.HolderForceClosedWithInfo)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.HolderForceClosed.class) {
			return new HolderForceClosed(ptr, (bindings.LDKMonitorEvent.HolderForceClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.CommitmentTxConfirmed.class) {
			return new CommitmentTxConfirmed(ptr, (bindings.LDKMonitorEvent.CommitmentTxConfirmed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.Completed.class) {
			return new Completed(ptr, (bindings.LDKMonitorEvent.Completed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A monitor event containing an HTLCUpdate.
	 */
	public final static class HTLCEvent extends MonitorEvent {
		public final org.ldk.structs.HTLCUpdate htlc_event;
		private HTLCEvent(long ptr, bindings.LDKMonitorEvent.HTLCEvent obj) {
			super(null, ptr);
			long htlc_event = obj.htlc_event;
			org.ldk.structs.HTLCUpdate htlc_event_hu_conv = null; if (htlc_event < 0 || htlc_event > 4096) { htlc_event_hu_conv = new org.ldk.structs.HTLCUpdate(null, htlc_event); }
			if (htlc_event_hu_conv != null) { htlc_event_hu_conv.ptrs_to.add(this); };
			this.htlc_event = htlc_event_hu_conv;
		}
	}
	/**
	 * Indicates we broadcasted the channel's latest commitment transaction and thus closed the
	 * channel. Holds information about the channel and why it was closed.
	 */
	public final static class HolderForceClosedWithInfo extends MonitorEvent {
		/**
		 * The reason the channel was closed.
		*/
		public final org.ldk.structs.ClosureReason reason;
		/**
		 * The funding outpoint of the channel.
		*/
		public final org.ldk.structs.OutPoint outpoint;
		/**
		 * The channel ID of the channel.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		private HolderForceClosedWithInfo(long ptr, bindings.LDKMonitorEvent.HolderForceClosedWithInfo obj) {
			super(null, ptr);
			long reason = obj.reason;
			org.ldk.structs.ClosureReason reason_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.add(this); };
			this.reason = reason_hu_conv;
			long outpoint = obj.outpoint;
			org.ldk.structs.OutPoint outpoint_hu_conv = null; if (outpoint < 0 || outpoint > 4096) { outpoint_hu_conv = new org.ldk.structs.OutPoint(null, outpoint); }
			if (outpoint_hu_conv != null) { outpoint_hu_conv.ptrs_to.add(this); };
			this.outpoint = outpoint_hu_conv;
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
		}
	}
	/**
	 * Indicates we broadcasted the channel's latest commitment transaction and thus closed the
	 * channel.
	 */
	public final static class HolderForceClosed extends MonitorEvent {
		public final org.ldk.structs.OutPoint holder_force_closed;
		private HolderForceClosed(long ptr, bindings.LDKMonitorEvent.HolderForceClosed obj) {
			super(null, ptr);
			long holder_force_closed = obj.holder_force_closed;
			org.ldk.structs.OutPoint holder_force_closed_hu_conv = null; if (holder_force_closed < 0 || holder_force_closed > 4096) { holder_force_closed_hu_conv = new org.ldk.structs.OutPoint(null, holder_force_closed); }
			if (holder_force_closed_hu_conv != null) { holder_force_closed_hu_conv.ptrs_to.add(this); };
			this.holder_force_closed = holder_force_closed_hu_conv;
		}
	}
	/**
	 * Indicates that we've detected a commitment transaction (either holder's or counterparty's)
	 * be included in a block and should consider the channel closed.
	 */
	public final static class CommitmentTxConfirmed extends MonitorEvent {
		private CommitmentTxConfirmed(long ptr, bindings.LDKMonitorEvent.CommitmentTxConfirmed obj) {
			super(null, ptr);
		}
	}
	/**
	 * Indicates a [`ChannelMonitor`] update has completed. See
	 * [`ChannelMonitorUpdateStatus::InProgress`] for more information on how this is used.
	 * 
	 * [`ChannelMonitorUpdateStatus::InProgress`]: super::ChannelMonitorUpdateStatus::InProgress
	 */
	public final static class Completed extends MonitorEvent {
		/**
		 * The funding outpoint of the [`ChannelMonitor`] that was updated
		*/
		public final org.ldk.structs.OutPoint funding_txo;
		/**
		 * The channel ID of the channel associated with the [`ChannelMonitor`]
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * The Update ID from [`ChannelMonitorUpdate::update_id`] which was applied or
		 * [`ChannelMonitor::get_latest_update_id`].
		 * 
		 * Note that this should only be set to a given update's ID if all previous updates for the
		 * same [`ChannelMonitor`] have been applied and persisted.
		*/
		public final long monitor_update_id;
		private Completed(long ptr, bindings.LDKMonitorEvent.Completed obj) {
			super(null, ptr);
			long funding_txo = obj.funding_txo;
			org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
			if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.add(this); };
			this.funding_txo = funding_txo_hu_conv;
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			this.monitor_update_id = obj.monitor_update_id;
		}
	}
	long clone_ptr() {
		long ret = bindings.MonitorEvent_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorEvent
	 */
	public MonitorEvent clone() {
		long ret = bindings.MonitorEvent_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCEvent-variant MonitorEvent
	 */
	public static MonitorEvent htlcevent(org.ldk.structs.HTLCUpdate a) {
		long ret = bindings.MonitorEvent_htlcevent(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosedWithInfo-variant MonitorEvent
	 */
	public static MonitorEvent holder_force_closed_with_info(org.ldk.structs.ClosureReason reason, org.ldk.structs.OutPoint outpoint, org.ldk.structs.ChannelId channel_id) {
		long ret = bindings.MonitorEvent_holder_force_closed_with_info(reason.ptr, outpoint.ptr, channel_id.ptr);
		Reference.reachabilityFence(reason);
		Reference.reachabilityFence(outpoint);
		Reference.reachabilityFence(channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant MonitorEvent
	 */
	public static MonitorEvent holder_force_closed(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorEvent_holder_force_closed(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant MonitorEvent
	 */
	public static MonitorEvent commitment_tx_confirmed() {
		long ret = bindings.MonitorEvent_commitment_tx_confirmed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Completed-variant MonitorEvent
	 */
	public static MonitorEvent completed(org.ldk.structs.OutPoint funding_txo, org.ldk.structs.ChannelId channel_id, long monitor_update_id) {
		long ret = bindings.MonitorEvent_completed(funding_txo.ptr, channel_id.ptr, monitor_update_id);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(monitor_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.MonitorEvent b) {
		boolean ret = bindings.MonitorEvent_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof MonitorEvent)) return false;
		return this.eq((MonitorEvent)o);
	}
	/**
	 * Serialize the MonitorEvent object into a byte array which can be read by MonitorEvent_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MonitorEvent_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

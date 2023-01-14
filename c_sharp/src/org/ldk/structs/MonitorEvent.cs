using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An event to be processed by the ChannelManager.
 */
public class MonitorEvent : CommonBase {
	protected MonitorEvent(object _dummy, long ptr) : base(ptr) { }
	~MonitorEvent() {
		if (ptr != 0) { bindings.MonitorEvent_free(ptr); }
	}

	internal static MonitorEvent constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKMonitorEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MonitorEvent_HTLCEvent(ptr);
			case 1: return new MonitorEvent_CommitmentTxConfirmed(ptr);
			case 2: return new MonitorEvent_Completed(ptr);
			case 3: return new MonitorEvent_UpdateFailed(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A MonitorEvent of type HTLCEvent */
	public class MonitorEvent_HTLCEvent : MonitorEvent {
		public HTLCUpdate htlc_event;
		internal MonitorEvent_HTLCEvent(long ptr) : base(null, ptr) {
			long htlc_event = bindings.LDKMonitorEvent_HTLCEvent_get_htlc_event(ptr);
			org.ldk.structs.HTLCUpdate htlc_event_hu_conv = null; if (htlc_event < 0 || htlc_event > 4096) { htlc_event_hu_conv = new org.ldk.structs.HTLCUpdate(null, htlc_event); }
			if (htlc_event_hu_conv != null) { htlc_event_hu_conv.ptrs_to.AddLast(this); };
			this.htlc_event = htlc_event_hu_conv;
		}
	}
	/** A MonitorEvent of type CommitmentTxConfirmed */
	public class MonitorEvent_CommitmentTxConfirmed : MonitorEvent {
		public OutPoint commitment_tx_confirmed;
		internal MonitorEvent_CommitmentTxConfirmed(long ptr) : base(null, ptr) {
			long commitment_tx_confirmed = bindings.LDKMonitorEvent_CommitmentTxConfirmed_get_commitment_tx_confirmed(ptr);
			org.ldk.structs.OutPoint commitment_tx_confirmed_hu_conv = null; if (commitment_tx_confirmed < 0 || commitment_tx_confirmed > 4096) { commitment_tx_confirmed_hu_conv = new org.ldk.structs.OutPoint(null, commitment_tx_confirmed); }
			if (commitment_tx_confirmed_hu_conv != null) { commitment_tx_confirmed_hu_conv.ptrs_to.AddLast(this); };
			this.commitment_tx_confirmed = commitment_tx_confirmed_hu_conv;
		}
	}
	/** A MonitorEvent of type Completed */
	public class MonitorEvent_Completed : MonitorEvent {
		/**
		 * The funding outpoint of the [`ChannelMonitor`] that was updated
		 */
		public OutPoint funding_txo;
		/**
		 * The Update ID from [`ChannelMonitorUpdate::update_id`] which was applied or
		 * [`ChannelMonitor::get_latest_update_id`].
		 * 
		 * Note that this should only be set to a given update's ID if all previous updates for the
		 * same [`ChannelMonitor`] have been applied and persisted.
		 */
		public long monitor_update_id;
		internal MonitorEvent_Completed(long ptr) : base(null, ptr) {
			long funding_txo = bindings.LDKMonitorEvent_Completed_get_funding_txo(ptr);
			org.ldk.structs.OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new org.ldk.structs.OutPoint(null, funding_txo); }
			if (funding_txo_hu_conv != null) { funding_txo_hu_conv.ptrs_to.AddLast(this); };
			this.funding_txo = funding_txo_hu_conv;
			this.monitor_update_id = bindings.LDKMonitorEvent_Completed_get_monitor_update_id(ptr);
		}
	}
	/** A MonitorEvent of type UpdateFailed */
	public class MonitorEvent_UpdateFailed : MonitorEvent {
		public OutPoint update_failed;
		internal MonitorEvent_UpdateFailed(long ptr) : base(null, ptr) {
			long update_failed = bindings.LDKMonitorEvent_UpdateFailed_get_update_failed(ptr);
			org.ldk.structs.OutPoint update_failed_hu_conv = null; if (update_failed < 0 || update_failed > 4096) { update_failed_hu_conv = new org.ldk.structs.OutPoint(null, update_failed); }
			if (update_failed_hu_conv != null) { update_failed_hu_conv.ptrs_to.AddLast(this); };
			this.update_failed = update_failed_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.MonitorEvent_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorEvent
	 */
	public MonitorEvent clone() {
		long ret = bindings.MonitorEvent_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCEvent-variant MonitorEvent
	 */
	public static MonitorEvent htlcevent(org.ldk.structs.HTLCUpdate a) {
		long ret = bindings.MonitorEvent_htlcevent(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant MonitorEvent
	 */
	public static MonitorEvent commitment_tx_confirmed(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorEvent_commitment_tx_confirmed(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Completed-variant MonitorEvent
	 */
	public static MonitorEvent completed(org.ldk.structs.OutPoint funding_txo, long monitor_update_id) {
		long ret = bindings.MonitorEvent_completed(funding_txo == null ? 0 : funding_txo.ptr, monitor_update_id);
		GC.KeepAlive(funding_txo);
		GC.KeepAlive(monitor_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(funding_txo); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UpdateFailed-variant MonitorEvent
	 */
	public static MonitorEvent update_failed(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorEvent_update_failed(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorEvent ret_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.MonitorEvent b) {
		bool ret = bindings.MonitorEvent_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is MonitorEvent)) return false;
		return this.eq((MonitorEvent)o);
	}
	/**
	 * Serialize the MonitorEvent object into a byte array which can be read by MonitorEvent_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MonitorEvent_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

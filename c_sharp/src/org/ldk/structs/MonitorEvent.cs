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
			case 1: return new MonitorEvent_HolderForceClosed(ptr);
			case 2: return new MonitorEvent_Completed(ptr);
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
	/** A MonitorEvent of type HolderForceClosed */
	public class MonitorEvent_HolderForceClosed : MonitorEvent {
		public OutPoint holder_force_closed;
		internal MonitorEvent_HolderForceClosed(long ptr) : base(null, ptr) {
			long holder_force_closed = bindings.LDKMonitorEvent_HolderForceClosed_get_holder_force_closed(ptr);
			org.ldk.structs.OutPoint holder_force_closed_hu_conv = null; if (holder_force_closed < 0 || holder_force_closed > 4096) { holder_force_closed_hu_conv = new org.ldk.structs.OutPoint(null, holder_force_closed); }
			if (holder_force_closed_hu_conv != null) { holder_force_closed_hu_conv.ptrs_to.AddLast(this); };
			this.holder_force_closed = holder_force_closed_hu_conv;
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
	 * Utility method to constructs a new HolderForceClosed-variant MonitorEvent
	 */
	public static MonitorEvent holder_force_closed(org.ldk.structs.OutPoint a) {
		long ret = bindings.MonitorEvent_holder_force_closed(a == null ? 0 : a.ptr);
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
		long ret = bindings.MonitorEvent_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

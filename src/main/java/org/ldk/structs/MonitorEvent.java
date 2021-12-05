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
		if (raw_val.getClass() == bindings.LDKMonitorEvent.CommitmentTxConfirmed.class) {
			return new CommitmentTxConfirmed(ptr, (bindings.LDKMonitorEvent.CommitmentTxConfirmed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.UpdateCompleted.class) {
			return new UpdateCompleted(ptr, (bindings.LDKMonitorEvent.UpdateCompleted)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKMonitorEvent.UpdateFailed.class) {
			return new UpdateFailed(ptr, (bindings.LDKMonitorEvent.UpdateFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A monitor event containing an HTLCUpdate.
	 */
	public final static class HTLCEvent extends MonitorEvent {
		public final HTLCUpdate htlc_event;
		private HTLCEvent(long ptr, bindings.LDKMonitorEvent.HTLCEvent obj) {
			super(null, ptr);
			long htlc_event = obj.htlc_event;
			HTLCUpdate htlc_event_hu_conv = null; if (htlc_event < 0 || htlc_event > 4096) { htlc_event_hu_conv = new HTLCUpdate(null, htlc_event); }
			htlc_event_hu_conv.ptrs_to.add(this);
			this.htlc_event = htlc_event_hu_conv;
		}
	}
	/**
	 * A monitor event that the Channel's commitment transaction was confirmed.
	 */
	public final static class CommitmentTxConfirmed extends MonitorEvent {
		public final OutPoint commitment_tx_confirmed;
		private CommitmentTxConfirmed(long ptr, bindings.LDKMonitorEvent.CommitmentTxConfirmed obj) {
			super(null, ptr);
			long commitment_tx_confirmed = obj.commitment_tx_confirmed;
			OutPoint commitment_tx_confirmed_hu_conv = null; if (commitment_tx_confirmed < 0 || commitment_tx_confirmed > 4096) { commitment_tx_confirmed_hu_conv = new OutPoint(null, commitment_tx_confirmed); }
			commitment_tx_confirmed_hu_conv.ptrs_to.add(this);
			this.commitment_tx_confirmed = commitment_tx_confirmed_hu_conv;
		}
	}
	/**
	 * Indicates a [`ChannelMonitor`] update has completed. See
	 * [`ChannelMonitorUpdateErr::TemporaryFailure`] for more information on how this is used.
	 * 
	 * [`ChannelMonitorUpdateErr::TemporaryFailure`]: super::ChannelMonitorUpdateErr::TemporaryFailure
	 */
	public final static class UpdateCompleted extends MonitorEvent {
		/**
		 * The funding outpoint of the [`ChannelMonitor`] that was updated
		*/
		public final OutPoint funding_txo;
		/**
		 * The Update ID from [`ChannelMonitorUpdate::update_id`] which was applied or
		 * [`ChannelMonitor::get_latest_update_id`].
		 * 
		 * Note that this should only be set to a given update's ID if all previous updates for the
		 * same [`ChannelMonitor`] have been applied and persisted.
		*/
		public final long monitor_update_id;
		private UpdateCompleted(long ptr, bindings.LDKMonitorEvent.UpdateCompleted obj) {
			super(null, ptr);
			long funding_txo = obj.funding_txo;
			OutPoint funding_txo_hu_conv = null; if (funding_txo < 0 || funding_txo > 4096) { funding_txo_hu_conv = new OutPoint(null, funding_txo); }
			funding_txo_hu_conv.ptrs_to.add(this);
			this.funding_txo = funding_txo_hu_conv;
			this.monitor_update_id = obj.monitor_update_id;
		}
	}
	/**
	 * Indicates a [`ChannelMonitor`] update has failed. See
	 * [`ChannelMonitorUpdateErr::PermanentFailure`] for more information on how this is used.
	 * 
	 * [`ChannelMonitorUpdateErr::PermanentFailure`]: super::ChannelMonitorUpdateErr::PermanentFailure
	 */
	public final static class UpdateFailed extends MonitorEvent {
		public final OutPoint update_failed;
		private UpdateFailed(long ptr, bindings.LDKMonitorEvent.UpdateFailed obj) {
			super(null, ptr);
			long update_failed = obj.update_failed;
			OutPoint update_failed_hu_conv = null; if (update_failed < 0 || update_failed > 4096) { update_failed_hu_conv = new OutPoint(null, update_failed); }
			update_failed_hu_conv.ptrs_to.add(this);
			this.update_failed = update_failed_hu_conv;
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
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCEvent-variant MonitorEvent
	 */
	public static MonitorEvent htlcevent(HTLCUpdate a) {
		long ret = bindings.MonitorEvent_htlcevent(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant MonitorEvent
	 */
	public static MonitorEvent commitment_tx_confirmed(OutPoint a) {
		long ret = bindings.MonitorEvent_commitment_tx_confirmed(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UpdateCompleted-variant MonitorEvent
	 */
	public static MonitorEvent update_completed(OutPoint funding_txo, long monitor_update_id) {
		long ret = bindings.MonitorEvent_update_completed(funding_txo == null ? 0 : funding_txo.ptr & ~1, monitor_update_id);
		Reference.reachabilityFence(funding_txo);
		Reference.reachabilityFence(monitor_update_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UpdateFailed-variant MonitorEvent
	 */
	public static MonitorEvent update_failed(OutPoint a) {
		long ret = bindings.MonitorEvent_update_failed(a == null ? 0 : a.ptr & ~1);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
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

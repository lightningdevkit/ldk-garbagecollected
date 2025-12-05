package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The reason the channel was closed. See individual variants for more details.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosureReason extends CommonBase {
	private ClosureReason(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ClosureReason_free(ptr); }
	}
	static ClosureReason constr_from_ptr(long ptr) {
		bindings.LDKClosureReason raw_val = bindings.LDKClosureReason_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKClosureReason.CounterpartyForceClosed.class) {
			return new CounterpartyForceClosed(ptr, (bindings.LDKClosureReason.CounterpartyForceClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.HolderForceClosed.class) {
			return new HolderForceClosed(ptr, (bindings.LDKClosureReason.HolderForceClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.LegacyCooperativeClosure.class) {
			return new LegacyCooperativeClosure(ptr, (bindings.LDKClosureReason.LegacyCooperativeClosure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.CounterpartyInitiatedCooperativeClosure.class) {
			return new CounterpartyInitiatedCooperativeClosure(ptr, (bindings.LDKClosureReason.CounterpartyInitiatedCooperativeClosure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.LocallyInitiatedCooperativeClosure.class) {
			return new LocallyInitiatedCooperativeClosure(ptr, (bindings.LDKClosureReason.LocallyInitiatedCooperativeClosure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.CommitmentTxConfirmed.class) {
			return new CommitmentTxConfirmed(ptr, (bindings.LDKClosureReason.CommitmentTxConfirmed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.FundingTimedOut.class) {
			return new FundingTimedOut(ptr, (bindings.LDKClosureReason.FundingTimedOut)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.ProcessingError.class) {
			return new ProcessingError(ptr, (bindings.LDKClosureReason.ProcessingError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.DisconnectedPeer.class) {
			return new DisconnectedPeer(ptr, (bindings.LDKClosureReason.DisconnectedPeer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.OutdatedChannelManager.class) {
			return new OutdatedChannelManager(ptr, (bindings.LDKClosureReason.OutdatedChannelManager)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.CounterpartyCoopClosedUnfundedChannel.class) {
			return new CounterpartyCoopClosedUnfundedChannel(ptr, (bindings.LDKClosureReason.CounterpartyCoopClosedUnfundedChannel)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.LocallyCoopClosedUnfundedChannel.class) {
			return new LocallyCoopClosedUnfundedChannel(ptr, (bindings.LDKClosureReason.LocallyCoopClosedUnfundedChannel)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.FundingBatchClosure.class) {
			return new FundingBatchClosure(ptr, (bindings.LDKClosureReason.FundingBatchClosure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.HTLCsTimedOut.class) {
			return new HTLCsTimedOut(ptr, (bindings.LDKClosureReason.HTLCsTimedOut)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKClosureReason.PeerFeerateTooLow.class) {
			return new PeerFeerateTooLow(ptr, (bindings.LDKClosureReason.PeerFeerateTooLow)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Closure generated from receiving a peer error message.
	 * 
	 * Our counterparty may have broadcasted their latest commitment state, and we have
	 * as well.
	 */
	public final static class CounterpartyForceClosed extends ClosureReason {
		/**
		 * The error which the peer sent us.
		 * 
		 * Be careful about printing the peer_msg, a well-crafted message could exploit
		 * a security vulnerability in the terminal emulator or the logging subsystem.
		 * To be safe, use `Display` on `UntrustedString`
		 * 
		 * [`UntrustedString`]: crate::types::string::UntrustedString
		*/
		public final org.ldk.structs.UntrustedString peer_msg;
		private CounterpartyForceClosed(long ptr, bindings.LDKClosureReason.CounterpartyForceClosed obj) {
			super(null, ptr);
			long peer_msg = obj.peer_msg;
			org.ldk.structs.UntrustedString peer_msg_hu_conv = null; if (peer_msg < 0 || peer_msg > 4096) { peer_msg_hu_conv = new org.ldk.structs.UntrustedString(null, peer_msg); }
			if (peer_msg_hu_conv != null) { peer_msg_hu_conv.ptrs_to.add(this); };
			this.peer_msg = peer_msg_hu_conv;
		}
	}
	/**
	 * Closure generated from [`ChannelManager::force_close_broadcasting_latest_txn`] or
	 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`], called by the user.
	 * 
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_all_channels_broadcasting_latest_txn
	 */
	public final static class HolderForceClosed extends ClosureReason {
		/**
		 * Whether or not the latest transaction was broadcasted when the channel was force
		 * closed.
		 * 
		 * This will be set to `Some(true)` for any channels closed after their funding
		 * transaction was (or might have been) broadcasted, and `Some(false)` for any channels
		 * closed prior to their funding transaction being broadcasted.
		 * 
		 * This will be `None` for objects generated or written by LDK 0.0.123 and
		 * earlier.
		*/
		public final org.ldk.structs.Option_boolZ broadcasted_latest_txn;
		/**
		 * The error message provided to [`ChannelManager::force_close_broadcasting_latest_txn`] or
		 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`].
		 * 
		 * This will be the empty string for objects generated or written by LDK 0.1 and earlier.
		 * 
		 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
		 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_all_channels_broadcasting_latest_txn
		*/
		public final java.lang.String message;
		private HolderForceClosed(long ptr, bindings.LDKClosureReason.HolderForceClosed obj) {
			super(null, ptr);
			long broadcasted_latest_txn = obj.broadcasted_latest_txn;
			org.ldk.structs.Option_boolZ broadcasted_latest_txn_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(broadcasted_latest_txn);
			if (broadcasted_latest_txn_hu_conv != null) { broadcasted_latest_txn_hu_conv.ptrs_to.add(this); };
			this.broadcasted_latest_txn = broadcasted_latest_txn_hu_conv;
			this.message = obj.message;
		}
	}
	/**
	 * The channel was closed after negotiating a cooperative close and we've now broadcasted
	 * the cooperative close transaction. Note the shutdown may have been initiated by us.
	 * 
	 * This was only set in versions of LDK prior to 0.0.122.
	 */
	public final static class LegacyCooperativeClosure extends ClosureReason {
		private LegacyCooperativeClosure(long ptr, bindings.LDKClosureReason.LegacyCooperativeClosure obj) {
			super(null, ptr);
		}
	}
	/**
	 * The channel was closed after negotiating a cooperative close and we've now broadcasted
	 * the cooperative close transaction. This indicates that the shutdown was initiated by our
	 * counterparty.
	 * 
	 * In rare cases where we initiated closure immediately prior to shutting down without
	 * persisting, this value may be provided for channels we initiated closure for.
	 */
	public final static class CounterpartyInitiatedCooperativeClosure extends ClosureReason {
		private CounterpartyInitiatedCooperativeClosure(long ptr, bindings.LDKClosureReason.CounterpartyInitiatedCooperativeClosure obj) {
			super(null, ptr);
		}
	}
	/**
	 * The channel was closed after negotiating a cooperative close and we've now broadcasted
	 * the cooperative close transaction. This indicates that the shutdown was initiated by us.
	 */
	public final static class LocallyInitiatedCooperativeClosure extends ClosureReason {
		private LocallyInitiatedCooperativeClosure(long ptr, bindings.LDKClosureReason.LocallyInitiatedCooperativeClosure obj) {
			super(null, ptr);
		}
	}
	/**
	 * A commitment transaction was confirmed on chain, closing the channel. Most likely this
	 * commitment transaction came from our counterparty, but it may also have come from
	 * a copy of our own `ChannelMonitor`.
	 */
	public final static class CommitmentTxConfirmed extends ClosureReason {
		private CommitmentTxConfirmed(long ptr, bindings.LDKClosureReason.CommitmentTxConfirmed obj) {
			super(null, ptr);
		}
	}
	/**
	 * The funding transaction failed to confirm in a timely manner on an inbound channel or the
	 * counterparty failed to fund the channel in a timely manner.
	 */
	public final static class FundingTimedOut extends ClosureReason {
		private FundingTimedOut(long ptr, bindings.LDKClosureReason.FundingTimedOut obj) {
			super(null, ptr);
		}
	}
	/**
	 * Closure generated from processing an event, likely a HTLC forward/relay/reception.
	 */
	public final static class ProcessingError extends ClosureReason {
		/**
		 * A developer-readable error message which we generated.
		*/
		public final java.lang.String err;
		private ProcessingError(long ptr, bindings.LDKClosureReason.ProcessingError obj) {
			super(null, ptr);
			this.err = obj.err;
		}
	}
	/**
	 * The peer disconnected prior to funding completing. In this case the spec mandates that we
	 * forget the channel entirely - we can attempt again if the peer reconnects.
	 * 
	 * This includes cases where we restarted prior to funding completion, including prior to the
	 * initial [`ChannelMonitor`] persistence completing.
	 * 
	 * In LDK versions prior to 0.0.107 this could also occur if we were unable to connect to the
	 * peer because of mutual incompatibility between us and our channel counterparty.
	 * 
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 */
	public final static class DisconnectedPeer extends ClosureReason {
		private DisconnectedPeer(long ptr, bindings.LDKClosureReason.DisconnectedPeer obj) {
			super(null, ptr);
		}
	}
	/**
	 * Closure generated from `ChannelManager::read` if the [`ChannelMonitor`] is newer than
	 * the [`ChannelManager`] deserialized.
	 * 
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public final static class OutdatedChannelManager extends ClosureReason {
		private OutdatedChannelManager(long ptr, bindings.LDKClosureReason.OutdatedChannelManager obj) {
			super(null, ptr);
		}
	}
	/**
	 * The counterparty requested a cooperative close of a channel that had not been funded yet.
	 * The channel has been immediately closed.
	 */
	public final static class CounterpartyCoopClosedUnfundedChannel extends ClosureReason {
		private CounterpartyCoopClosedUnfundedChannel(long ptr, bindings.LDKClosureReason.CounterpartyCoopClosedUnfundedChannel obj) {
			super(null, ptr);
		}
	}
	/**
	 * We requested a cooperative close of a channel that had not been funded yet.
	 * The channel has been immediately closed.
	 * 
	 * Note that events containing this variant will be lost on downgrade to a version of LDK
	 * prior to 0.2.
	 */
	public final static class LocallyCoopClosedUnfundedChannel extends ClosureReason {
		private LocallyCoopClosedUnfundedChannel(long ptr, bindings.LDKClosureReason.LocallyCoopClosedUnfundedChannel obj) {
			super(null, ptr);
		}
	}
	/**
	 * Another channel in the same funding batch closed before the funding transaction
	 * was ready to be broadcast.
	 */
	public final static class FundingBatchClosure extends ClosureReason {
		private FundingBatchClosure(long ptr, bindings.LDKClosureReason.FundingBatchClosure obj) {
			super(null, ptr);
		}
	}
	/**
	 * One of our HTLCs timed out in a channel, causing us to force close the channel.
	 */
	public final static class HTLCsTimedOut extends ClosureReason {
		/**
		 * The payment hash of an HTLC that timed out.
		 * 
		 * Will be `None` for any event serialized by LDK prior to 0.2.
		*/
		public final org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash;
		private HTLCsTimedOut(long ptr, bindings.LDKClosureReason.HTLCsTimedOut obj) {
			super(null, ptr);
			long payment_hash = obj.payment_hash;
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.add(this); };
			this.payment_hash = payment_hash_hu_conv;
		}
	}
	/**
	 * Our peer provided a feerate which violated our required minimum (fetched from our
	 * [`FeeEstimator`] either as [`ConfirmationTarget::MinAllowedAnchorChannelRemoteFee`] or
	 * [`ConfirmationTarget::MinAllowedNonAnchorChannelRemoteFee`]).
	 * 
	 * [`FeeEstimator`]: crate::chain::chaininterface::FeeEstimator
	 * [`ConfirmationTarget::MinAllowedAnchorChannelRemoteFee`]: crate::chain::chaininterface::ConfirmationTarget::MinAllowedAnchorChannelRemoteFee
	 * [`ConfirmationTarget::MinAllowedNonAnchorChannelRemoteFee`]: crate::chain::chaininterface::ConfirmationTarget::MinAllowedNonAnchorChannelRemoteFee
	 */
	public final static class PeerFeerateTooLow extends ClosureReason {
		/**
		 * The feerate on our channel set by our peer.
		*/
		public final int peer_feerate_sat_per_kw;
		/**
		 * The required feerate we enforce, from our [`FeeEstimator`].
		 * 
		 * [`FeeEstimator`]: crate::chain::chaininterface::FeeEstimator
		*/
		public final int required_feerate_sat_per_kw;
		private PeerFeerateTooLow(long ptr, bindings.LDKClosureReason.PeerFeerateTooLow obj) {
			super(null, ptr);
			this.peer_feerate_sat_per_kw = obj.peer_feerate_sat_per_kw;
			this.required_feerate_sat_per_kw = obj.required_feerate_sat_per_kw;
		}
	}
	long clone_ptr() {
		long ret = bindings.ClosureReason_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosureReason
	 */
	public ClosureReason clone() {
		long ret = bindings.ClosureReason_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyForceClosed-variant ClosureReason
	 */
	public static ClosureReason counterparty_force_closed(org.ldk.structs.UntrustedString peer_msg) {
		long ret = bindings.ClosureReason_counterparty_force_closed(peer_msg.ptr);
		Reference.reachabilityFence(peer_msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant ClosureReason
	 */
	public static ClosureReason holder_force_closed(org.ldk.structs.Option_boolZ broadcasted_latest_txn, java.lang.String message) {
		long ret = bindings.ClosureReason_holder_force_closed(broadcasted_latest_txn.ptr, message);
		Reference.reachabilityFence(broadcasted_latest_txn);
		Reference.reachabilityFence(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LegacyCooperativeClosure-variant ClosureReason
	 */
	public static ClosureReason legacy_cooperative_closure() {
		long ret = bindings.ClosureReason_legacy_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static ClosureReason counterparty_initiated_cooperative_closure() {
		long ret = bindings.ClosureReason_counterparty_initiated_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static ClosureReason locally_initiated_cooperative_closure() {
		long ret = bindings.ClosureReason_locally_initiated_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant ClosureReason
	 */
	public static ClosureReason commitment_tx_confirmed() {
		long ret = bindings.ClosureReason_commitment_tx_confirmed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTimedOut-variant ClosureReason
	 */
	public static ClosureReason funding_timed_out() {
		long ret = bindings.ClosureReason_funding_timed_out();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProcessingError-variant ClosureReason
	 */
	public static ClosureReason processing_error(java.lang.String err) {
		long ret = bindings.ClosureReason_processing_error(err);
		Reference.reachabilityFence(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectedPeer-variant ClosureReason
	 */
	public static ClosureReason disconnected_peer() {
		long ret = bindings.ClosureReason_disconnected_peer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutdatedChannelManager-variant ClosureReason
	 */
	public static ClosureReason outdated_channel_manager() {
		long ret = bindings.ClosureReason_outdated_channel_manager();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static ClosureReason counterparty_coop_closed_unfunded_channel() {
		long ret = bindings.ClosureReason_counterparty_coop_closed_unfunded_channel();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static ClosureReason locally_coop_closed_unfunded_channel() {
		long ret = bindings.ClosureReason_locally_coop_closed_unfunded_channel();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingBatchClosure-variant ClosureReason
	 */
	public static ClosureReason funding_batch_closure() {
		long ret = bindings.ClosureReason_funding_batch_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCsTimedOut-variant ClosureReason
	 */
	public static ClosureReason htlcs_timed_out(org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash) {
		long ret = bindings.ClosureReason_htlcs_timed_out(payment_hash.ptr);
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerFeerateTooLow-variant ClosureReason
	 */
	public static ClosureReason peer_feerate_too_low(int peer_feerate_sat_per_kw, int required_feerate_sat_per_kw) {
		long ret = bindings.ClosureReason_peer_feerate_too_low(peer_feerate_sat_per_kw, required_feerate_sat_per_kw);
		Reference.reachabilityFence(peer_feerate_sat_per_kw);
		Reference.reachabilityFence(required_feerate_sat_per_kw);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ClosureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.ClosureReason b) {
		boolean ret = bindings.ClosureReason_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ClosureReason)) return false;
		return this.eq((ClosureReason)o);
	}
	/**
	 * Get the string representation of a ClosureReason object
	 */
	public String to_str() {
		String ret = bindings.ClosureReason_to_str(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the ClosureReason object into a byte array which can be read by ClosureReason_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ClosureReason_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

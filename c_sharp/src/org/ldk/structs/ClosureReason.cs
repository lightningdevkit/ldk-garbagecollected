using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The reason the channel was closed. See individual variants for more details.
 */
public class ClosureReason : CommonBase {
	protected ClosureReason(object _dummy, long ptr) : base(ptr) { }
	~ClosureReason() {
		if (ptr != 0) { bindings.ClosureReason_free(ptr); }
	}

	internal static ClosureReason constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKClosureReason_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ClosureReason_CounterpartyForceClosed(ptr);
			case 1: return new ClosureReason_HolderForceClosed(ptr);
			case 2: return new ClosureReason_LegacyCooperativeClosure(ptr);
			case 3: return new ClosureReason_CounterpartyInitiatedCooperativeClosure(ptr);
			case 4: return new ClosureReason_LocallyInitiatedCooperativeClosure(ptr);
			case 5: return new ClosureReason_CommitmentTxConfirmed(ptr);
			case 6: return new ClosureReason_FundingTimedOut(ptr);
			case 7: return new ClosureReason_ProcessingError(ptr);
			case 8: return new ClosureReason_DisconnectedPeer(ptr);
			case 9: return new ClosureReason_OutdatedChannelManager(ptr);
			case 10: return new ClosureReason_CounterpartyCoopClosedUnfundedChannel(ptr);
			case 11: return new ClosureReason_LocallyCoopClosedUnfundedChannel(ptr);
			case 12: return new ClosureReason_FundingBatchClosure(ptr);
			case 13: return new ClosureReason_HTLCsTimedOut(ptr);
			case 14: return new ClosureReason_PeerFeerateTooLow(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ClosureReason of type CounterpartyForceClosed */
	public class ClosureReason_CounterpartyForceClosed : ClosureReason {
		/**
		 * The error which the peer sent us.
		 * 
		 * Be careful about printing the peer_msg, a well-crafted message could exploit
		 * a security vulnerability in the terminal emulator or the logging subsystem.
		 * To be safe, use `Display` on `UntrustedString`
		 * 
		 * [`UntrustedString`]: crate::types::string::UntrustedString
		 */
		public org.ldk.structs.UntrustedString peer_msg;
		internal ClosureReason_CounterpartyForceClosed(long ptr) : base(null, ptr) {
			long peer_msg = bindings.LDKClosureReason_CounterpartyForceClosed_get_peer_msg(ptr);
			org.ldk.structs.UntrustedString peer_msg_hu_conv = null; if (peer_msg < 0 || peer_msg > 4096) { peer_msg_hu_conv = new org.ldk.structs.UntrustedString(null, peer_msg); }
			if (peer_msg_hu_conv != null) { peer_msg_hu_conv.ptrs_to.AddLast(this); };
			this.peer_msg = peer_msg_hu_conv;
		}
	}
	/** A ClosureReason of type HolderForceClosed */
	public class ClosureReason_HolderForceClosed : ClosureReason {
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
		public org.ldk.structs.Option_boolZ broadcasted_latest_txn;
		/**
		 * The error message provided to [`ChannelManager::force_close_broadcasting_latest_txn`] or
		 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`].
		 * 
		 * This will be the empty string for objects generated or written by LDK 0.1 and earlier.
		 * 
		 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
		 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_all_channels_broadcasting_latest_txn
		 */
		public string message;
		internal ClosureReason_HolderForceClosed(long ptr) : base(null, ptr) {
			long broadcasted_latest_txn = bindings.LDKClosureReason_HolderForceClosed_get_broadcasted_latest_txn(ptr);
			org.ldk.structs.Option_boolZ broadcasted_latest_txn_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(broadcasted_latest_txn);
			if (broadcasted_latest_txn_hu_conv != null) { broadcasted_latest_txn_hu_conv.ptrs_to.AddLast(this); };
			this.broadcasted_latest_txn = broadcasted_latest_txn_hu_conv;
			long message = bindings.LDKClosureReason_HolderForceClosed_get_message(ptr);
			string message_conv = InternalUtils.decodeString(message);
			this.message = message_conv;
		}
	}
	/** A ClosureReason of type LegacyCooperativeClosure */
	public class ClosureReason_LegacyCooperativeClosure : ClosureReason {
		internal ClosureReason_LegacyCooperativeClosure(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type CounterpartyInitiatedCooperativeClosure */
	public class ClosureReason_CounterpartyInitiatedCooperativeClosure : ClosureReason {
		internal ClosureReason_CounterpartyInitiatedCooperativeClosure(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type LocallyInitiatedCooperativeClosure */
	public class ClosureReason_LocallyInitiatedCooperativeClosure : ClosureReason {
		internal ClosureReason_LocallyInitiatedCooperativeClosure(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type CommitmentTxConfirmed */
	public class ClosureReason_CommitmentTxConfirmed : ClosureReason {
		internal ClosureReason_CommitmentTxConfirmed(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type FundingTimedOut */
	public class ClosureReason_FundingTimedOut : ClosureReason {
		internal ClosureReason_FundingTimedOut(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type ProcessingError */
	public class ClosureReason_ProcessingError : ClosureReason {
		/**
		 * A developer-readable error message which we generated.
		 */
		public string err;
		internal ClosureReason_ProcessingError(long ptr) : base(null, ptr) {
			long err = bindings.LDKClosureReason_ProcessingError_get_err(ptr);
			string err_conv = InternalUtils.decodeString(err);
			this.err = err_conv;
		}
	}
	/** A ClosureReason of type DisconnectedPeer */
	public class ClosureReason_DisconnectedPeer : ClosureReason {
		internal ClosureReason_DisconnectedPeer(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type OutdatedChannelManager */
	public class ClosureReason_OutdatedChannelManager : ClosureReason {
		internal ClosureReason_OutdatedChannelManager(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type CounterpartyCoopClosedUnfundedChannel */
	public class ClosureReason_CounterpartyCoopClosedUnfundedChannel : ClosureReason {
		internal ClosureReason_CounterpartyCoopClosedUnfundedChannel(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type LocallyCoopClosedUnfundedChannel */
	public class ClosureReason_LocallyCoopClosedUnfundedChannel : ClosureReason {
		internal ClosureReason_LocallyCoopClosedUnfundedChannel(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type FundingBatchClosure */
	public class ClosureReason_FundingBatchClosure : ClosureReason {
		internal ClosureReason_FundingBatchClosure(long ptr) : base(null, ptr) {
		}
	}
	/** A ClosureReason of type HTLCsTimedOut */
	public class ClosureReason_HTLCsTimedOut : ClosureReason {
		/**
		 * The payment hash of an HTLC that timed out.
		 * 
		 * Will be `None` for any event serialized by LDK prior to 0.2.
		 */
		public org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash;
		internal ClosureReason_HTLCsTimedOut(long ptr) : base(null, ptr) {
			long payment_hash = bindings.LDKClosureReason_HTLCsTimedOut_get_payment_hash(ptr);
			org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			if (payment_hash_hu_conv != null) { payment_hash_hu_conv.ptrs_to.AddLast(this); };
			this.payment_hash = payment_hash_hu_conv;
		}
	}
	/** A ClosureReason of type PeerFeerateTooLow */
	public class ClosureReason_PeerFeerateTooLow : ClosureReason {
		/**
		 * The feerate on our channel set by our peer.
		 */
		public int peer_feerate_sat_per_kw;
		/**
		 * The required feerate we enforce, from our [`FeeEstimator`].
		 * 
		 * [`FeeEstimator`]: crate::chain::chaininterface::FeeEstimator
		 */
		public int required_feerate_sat_per_kw;
		internal ClosureReason_PeerFeerateTooLow(long ptr) : base(null, ptr) {
			this.peer_feerate_sat_per_kw = bindings.LDKClosureReason_PeerFeerateTooLow_get_peer_feerate_sat_per_kw(ptr);
			this.required_feerate_sat_per_kw = bindings.LDKClosureReason_PeerFeerateTooLow_get_required_feerate_sat_per_kw(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ClosureReason_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ClosureReason
	 */
	public org.ldk.structs.ClosureReason clone() {
		long ret = bindings.ClosureReason_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyForceClosed-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason counterparty_force_closed(org.ldk.structs.UntrustedString peer_msg) {
		long ret = bindings.ClosureReason_counterparty_force_closed(peer_msg.ptr);
		GC.KeepAlive(peer_msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason holder_force_closed(org.ldk.structs.Option_boolZ broadcasted_latest_txn, string message) {
		long ret = bindings.ClosureReason_holder_force_closed(broadcasted_latest_txn.ptr, InternalUtils.encodeString(message));
		GC.KeepAlive(broadcasted_latest_txn);
		GC.KeepAlive(message);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LegacyCooperativeClosure-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason legacy_cooperative_closure() {
		long ret = bindings.ClosureReason_legacy_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason counterparty_initiated_cooperative_closure() {
		long ret = bindings.ClosureReason_counterparty_initiated_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason locally_initiated_cooperative_closure() {
		long ret = bindings.ClosureReason_locally_initiated_cooperative_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason commitment_tx_confirmed() {
		long ret = bindings.ClosureReason_commitment_tx_confirmed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTimedOut-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason funding_timed_out() {
		long ret = bindings.ClosureReason_funding_timed_out();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProcessingError-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason processing_error(string err) {
		long ret = bindings.ClosureReason_processing_error(InternalUtils.encodeString(err));
		GC.KeepAlive(err);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectedPeer-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason disconnected_peer() {
		long ret = bindings.ClosureReason_disconnected_peer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutdatedChannelManager-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason outdated_channel_manager() {
		long ret = bindings.ClosureReason_outdated_channel_manager();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason counterparty_coop_closed_unfunded_channel() {
		long ret = bindings.ClosureReason_counterparty_coop_closed_unfunded_channel();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason locally_coop_closed_unfunded_channel() {
		long ret = bindings.ClosureReason_locally_coop_closed_unfunded_channel();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingBatchClosure-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason funding_batch_closure() {
		long ret = bindings.ClosureReason_funding_batch_closure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCsTimedOut-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason htlcs_timed_out(org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash) {
		long ret = bindings.ClosureReason_htlcs_timed_out(payment_hash.ptr);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerFeerateTooLow-variant ClosureReason
	 */
	public static org.ldk.structs.ClosureReason peer_feerate_too_low(int peer_feerate_sat_per_kw, int required_feerate_sat_per_kw) {
		long ret = bindings.ClosureReason_peer_feerate_too_low(peer_feerate_sat_per_kw, required_feerate_sat_per_kw);
		GC.KeepAlive(peer_feerate_sat_per_kw);
		GC.KeepAlive(required_feerate_sat_per_kw);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ClosureReason ret_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ClosureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.ClosureReason b) {
		bool ret = bindings.ClosureReason_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ClosureReason)) return false;
		return this.eq((ClosureReason)o);
	}
	/**
	 * Get the string representation of a ClosureReason object
	 */
	public string to_str() {
		long ret = bindings.ClosureReason_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the ClosureReason object into a byte array which can be read by ClosureReason_read
	 */
	public byte[] write() {
		long ret = bindings.ClosureReason_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

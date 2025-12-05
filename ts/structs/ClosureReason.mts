
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The reason the channel was closed. See individual variants for more details.
 */
export class ClosureReason extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.ClosureReason_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): ClosureReason {
		const raw_ty: number = bindings.LDKClosureReason_ty_from_ptr(ptr);
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
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClosureReason_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClosureReason
	 */
	public clone(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_clone(this.ptr);
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyForceClosed-variant ClosureReason
	 */
	public static constructor_counterparty_force_closed(peer_msg: UntrustedString): ClosureReason {
		const ret: bigint = bindings.ClosureReason_counterparty_force_closed(CommonBase.get_ptr_of(peer_msg));
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant ClosureReason
	 */
	public static constructor_holder_force_closed(broadcasted_latest_txn: Option_boolZ, message: string): ClosureReason {
		const ret: bigint = bindings.ClosureReason_holder_force_closed(CommonBase.get_ptr_of(broadcasted_latest_txn), bindings.encodeString(message));
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LegacyCooperativeClosure-variant ClosureReason
	 */
	public static constructor_legacy_cooperative_closure(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_legacy_cooperative_closure();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static constructor_counterparty_initiated_cooperative_closure(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_counterparty_initiated_cooperative_closure();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyInitiatedCooperativeClosure-variant ClosureReason
	 */
	public static constructor_locally_initiated_cooperative_closure(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_locally_initiated_cooperative_closure();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant ClosureReason
	 */
	public static constructor_commitment_tx_confirmed(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_commitment_tx_confirmed();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingTimedOut-variant ClosureReason
	 */
	public static constructor_funding_timed_out(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_funding_timed_out();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ProcessingError-variant ClosureReason
	 */
	public static constructor_processing_error(err: string): ClosureReason {
		const ret: bigint = bindings.ClosureReason_processing_error(bindings.encodeString(err));
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectedPeer-variant ClosureReason
	 */
	public static constructor_disconnected_peer(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_disconnected_peer();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutdatedChannelManager-variant ClosureReason
	 */
	public static constructor_outdated_channel_manager(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_outdated_channel_manager();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static constructor_counterparty_coop_closed_unfunded_channel(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_counterparty_coop_closed_unfunded_channel();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LocallyCoopClosedUnfundedChannel-variant ClosureReason
	 */
	public static constructor_locally_coop_closed_unfunded_channel(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_locally_coop_closed_unfunded_channel();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FundingBatchClosure-variant ClosureReason
	 */
	public static constructor_funding_batch_closure(): ClosureReason {
		const ret: bigint = bindings.ClosureReason_funding_batch_closure();
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCsTimedOut-variant ClosureReason
	 */
	public static constructor_htlcs_timed_out(payment_hash: Option_ThirtyTwoBytesZ): ClosureReason {
		const ret: bigint = bindings.ClosureReason_htlcs_timed_out(CommonBase.get_ptr_of(payment_hash));
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerFeerateTooLow-variant ClosureReason
	 */
	public static constructor_peer_feerate_too_low(peer_feerate_sat_per_kw: number, required_feerate_sat_per_kw: number): ClosureReason {
		const ret: bigint = bindings.ClosureReason_peer_feerate_too_low(peer_feerate_sat_per_kw, required_feerate_sat_per_kw);
		const ret_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ClosureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: ClosureReason): boolean {
		const ret: boolean = bindings.ClosureReason_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a ClosureReason object
	 */
	public to_str(): string {
		const ret: number = bindings.ClosureReason_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the ClosureReason object into a byte array which can be read by ClosureReason_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ClosureReason_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A ClosureReason of type CounterpartyForceClosed */
export class ClosureReason_CounterpartyForceClosed extends ClosureReason {
	/**
	 * The error which the peer sent us.
	 * 
	 * Be careful about printing the peer_msg, a well-crafted message could exploit
	 * a security vulnerability in the terminal emulator or the logging subsystem.
	 * To be safe, use `Display` on `UntrustedString`
	 * 
	 * [`UntrustedString`]: crate::types::string::UntrustedString
	 */
	public peer_msg: UntrustedString;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const peer_msg: bigint = bindings.LDKClosureReason_CounterpartyForceClosed_get_peer_msg(ptr);
		const peer_msg_hu_conv: UntrustedString = new UntrustedString(null, peer_msg);
			CommonBase.add_ref_from(peer_msg_hu_conv, this);
		this.peer_msg = peer_msg_hu_conv;
	}
}
/** A ClosureReason of type HolderForceClosed */
export class ClosureReason_HolderForceClosed extends ClosureReason {
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
	public broadcasted_latest_txn: Option_boolZ;
	/**
	 * The error message provided to [`ChannelManager::force_close_broadcasting_latest_txn`] or
	 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`].
	 * 
	 * This will be the empty string for objects generated or written by LDK 0.1 and earlier.
	 * 
	 * [`ChannelManager::force_close_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_broadcasting_latest_txn
	 * [`ChannelManager::force_close_all_channels_broadcasting_latest_txn`]: crate::ln::channelmanager::ChannelManager::force_close_all_channels_broadcasting_latest_txn
	 */
	public message: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const broadcasted_latest_txn: bigint = bindings.LDKClosureReason_HolderForceClosed_get_broadcasted_latest_txn(ptr);
		const broadcasted_latest_txn_hu_conv: Option_boolZ = Option_boolZ.constr_from_ptr(broadcasted_latest_txn);
			CommonBase.add_ref_from(broadcasted_latest_txn_hu_conv, this);
		this.broadcasted_latest_txn = broadcasted_latest_txn_hu_conv;
		const message: number = bindings.LDKClosureReason_HolderForceClosed_get_message(ptr);
		const message_conv: string = bindings.decodeString(message);
		this.message = message_conv;
	}
}
/** A ClosureReason of type LegacyCooperativeClosure */
export class ClosureReason_LegacyCooperativeClosure extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type CounterpartyInitiatedCooperativeClosure */
export class ClosureReason_CounterpartyInitiatedCooperativeClosure extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type LocallyInitiatedCooperativeClosure */
export class ClosureReason_LocallyInitiatedCooperativeClosure extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type CommitmentTxConfirmed */
export class ClosureReason_CommitmentTxConfirmed extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type FundingTimedOut */
export class ClosureReason_FundingTimedOut extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type ProcessingError */
export class ClosureReason_ProcessingError extends ClosureReason {
	/**
	 * A developer-readable error message which we generated.
	 */
	public err: string;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: number = bindings.LDKClosureReason_ProcessingError_get_err(ptr);
		const err_conv: string = bindings.decodeString(err);
		this.err = err_conv;
	}
}
/** A ClosureReason of type DisconnectedPeer */
export class ClosureReason_DisconnectedPeer extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type OutdatedChannelManager */
export class ClosureReason_OutdatedChannelManager extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type CounterpartyCoopClosedUnfundedChannel */
export class ClosureReason_CounterpartyCoopClosedUnfundedChannel extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type LocallyCoopClosedUnfundedChannel */
export class ClosureReason_LocallyCoopClosedUnfundedChannel extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type FundingBatchClosure */
export class ClosureReason_FundingBatchClosure extends ClosureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ClosureReason of type HTLCsTimedOut */
export class ClosureReason_HTLCsTimedOut extends ClosureReason {
	/**
	 * The payment hash of an HTLC that timed out.
	 * 
	 * Will be `None` for any event serialized by LDK prior to 0.2.
	 */
	public payment_hash: Option_ThirtyTwoBytesZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_hash: bigint = bindings.LDKClosureReason_HTLCsTimedOut_get_payment_hash(ptr);
		const payment_hash_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_hash);
			CommonBase.add_ref_from(payment_hash_hu_conv, this);
		this.payment_hash = payment_hash_hu_conv;
	}
}
/** A ClosureReason of type PeerFeerateTooLow */
export class ClosureReason_PeerFeerateTooLow extends ClosureReason {
	/**
	 * The feerate on our channel set by our peer.
	 */
	public peer_feerate_sat_per_kw: number;
	/**
	 * The required feerate we enforce, from our [`FeeEstimator`].
	 * 
	 * [`FeeEstimator`]: crate::chain::chaininterface::FeeEstimator
	 */
	public required_feerate_sat_per_kw: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.peer_feerate_sat_per_kw = bindings.LDKClosureReason_PeerFeerateTooLow_get_peer_feerate_sat_per_kw(ptr);
		this.required_feerate_sat_per_kw = bindings.LDKClosureReason_PeerFeerateTooLow_get_required_feerate_sat_per_kw(ptr);
	}
}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An event to be processed by the ChannelManager.
 */
export class MonitorEvent extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MonitorEvent_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MonitorEvent {
		const raw_ty: number = bindings.LDKMonitorEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MonitorEvent_HTLCEvent(ptr);
			case 1: return new MonitorEvent_HolderForceClosedWithInfo(ptr);
			case 2: return new MonitorEvent_HolderForceClosed(ptr);
			case 3: return new MonitorEvent_CommitmentTxConfirmed(ptr);
			case 4: return new MonitorEvent_Completed(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MonitorEvent_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MonitorEvent
	 */
	public clone(): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_clone(this.ptr);
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCEvent-variant MonitorEvent
	 */
	public static constructor_htlcevent(a: HTLCUpdate): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_htlcevent(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosedWithInfo-variant MonitorEvent
	 */
	public static constructor_holder_force_closed_with_info(reason: ClosureReason, outpoint: OutPoint, channel_id: ChannelId): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_holder_force_closed_with_info(CommonBase.get_ptr_of(reason), CommonBase.get_ptr_of(outpoint), CommonBase.get_ptr_of(channel_id));
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HolderForceClosed-variant MonitorEvent
	 */
	public static constructor_holder_force_closed(a: OutPoint): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_holder_force_closed(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CommitmentTxConfirmed-variant MonitorEvent
	 */
	public static constructor_commitment_tx_confirmed(): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_commitment_tx_confirmed();
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Completed-variant MonitorEvent
	 */
	public static constructor_completed(funding_txo: OutPoint, channel_id: ChannelId, monitor_update_id: bigint): MonitorEvent {
		const ret: bigint = bindings.MonitorEvent_completed(CommonBase.get_ptr_of(funding_txo), CommonBase.get_ptr_of(channel_id), monitor_update_id);
		const ret_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two MonitorEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: MonitorEvent): boolean {
		const ret: boolean = bindings.MonitorEvent_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the MonitorEvent object into a byte array which can be read by MonitorEvent_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.MonitorEvent_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A MonitorEvent of type HTLCEvent */
export class MonitorEvent_HTLCEvent extends MonitorEvent {
	public htlc_event: HTLCUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const htlc_event: bigint = bindings.LDKMonitorEvent_HTLCEvent_get_htlc_event(ptr);
		const htlc_event_hu_conv: HTLCUpdate = new HTLCUpdate(null, htlc_event);
			CommonBase.add_ref_from(htlc_event_hu_conv, this);
		this.htlc_event = htlc_event_hu_conv;
	}
}
/** A MonitorEvent of type HolderForceClosedWithInfo */
export class MonitorEvent_HolderForceClosedWithInfo extends MonitorEvent {
	/**
	 * The reason the channel was closed.
	 */
	public reason: ClosureReason;
	/**
	 * The funding outpoint of the channel.
	 */
	public outpoint: OutPoint;
	/**
	 * The channel ID of the channel.
	 */
	public channel_id: ChannelId;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const reason: bigint = bindings.LDKMonitorEvent_HolderForceClosedWithInfo_get_reason(ptr);
		const reason_hu_conv: ClosureReason = ClosureReason.constr_from_ptr(reason);
			CommonBase.add_ref_from(reason_hu_conv, this);
		this.reason = reason_hu_conv;
		const outpoint: bigint = bindings.LDKMonitorEvent_HolderForceClosedWithInfo_get_outpoint(ptr);
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			CommonBase.add_ref_from(outpoint_hu_conv, this);
		this.outpoint = outpoint_hu_conv;
		const channel_id: bigint = bindings.LDKMonitorEvent_HolderForceClosedWithInfo_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
	}
}
/** A MonitorEvent of type HolderForceClosed */
export class MonitorEvent_HolderForceClosed extends MonitorEvent {
	public holder_force_closed: OutPoint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const holder_force_closed: bigint = bindings.LDKMonitorEvent_HolderForceClosed_get_holder_force_closed(ptr);
		const holder_force_closed_hu_conv: OutPoint = new OutPoint(null, holder_force_closed);
			CommonBase.add_ref_from(holder_force_closed_hu_conv, this);
		this.holder_force_closed = holder_force_closed_hu_conv;
	}
}
/** A MonitorEvent of type CommitmentTxConfirmed */
export class MonitorEvent_CommitmentTxConfirmed extends MonitorEvent {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A MonitorEvent of type Completed */
export class MonitorEvent_Completed extends MonitorEvent {
	/**
	 * The funding outpoint of the [`ChannelMonitor`] that was updated
	 */
	public funding_txo: OutPoint;
	/**
	 * The channel ID of the channel associated with the [`ChannelMonitor`]
	 */
	public channel_id: ChannelId;
	/**
	 * The Update ID from [`ChannelMonitorUpdate::update_id`] which was applied or
	 * [`ChannelMonitor::get_latest_update_id`].
	 * 
	 * Note that this should only be set to a given update's ID if all previous updates for the
	 * same [`ChannelMonitor`] have been applied and persisted.
	 */
	public monitor_update_id: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const funding_txo: bigint = bindings.LDKMonitorEvent_Completed_get_funding_txo(ptr);
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			CommonBase.add_ref_from(funding_txo_hu_conv, this);
		this.funding_txo = funding_txo_hu_conv;
		const channel_id: bigint = bindings.LDKMonitorEvent_Completed_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		this.monitor_update_id = bindings.LDKMonitorEvent_Completed_get_monitor_update_id(ptr);
	}
}

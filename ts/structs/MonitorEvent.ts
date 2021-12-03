
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class MonitorEvent extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.MonitorEvent_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): MonitorEvent {
		const raw_val: bindings.LDKMonitorEvent = bindings.LDKMonitorEvent_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKMonitorEvent.HTLCEvent) {
			return new HTLCEvent(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMonitorEvent.CommitmentTxConfirmed) {
			return new CommitmentTxConfirmed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMonitorEvent.UpdateCompleted) {
			return new UpdateCompleted(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKMonitorEvent.UpdateFailed) {
			return new UpdateFailed(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class HTLCEvent extends MonitorEvent {
	public htlc_event: HTLCUpdate;
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.HTLCEvent) {
		super(null, ptr);
		const htlc_event: number = obj.htlc_event;
		const htlc_event_hu_conv: HTLCUpdate = new HTLCUpdate(null, htlc_event);
			htlc_event_hu_conv.ptrs_to.add(this);
		this.htlc_event = htlc_event_hu_conv;
	}
}
export class CommitmentTxConfirmed extends MonitorEvent {
	public commitment_tx_confirmed: OutPoint;
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.CommitmentTxConfirmed) {
		super(null, ptr);
		const commitment_tx_confirmed: number = obj.commitment_tx_confirmed;
		const commitment_tx_confirmed_hu_conv: OutPoint = new OutPoint(null, commitment_tx_confirmed);
			commitment_tx_confirmed_hu_conv.ptrs_to.add(this);
		this.commitment_tx_confirmed = commitment_tx_confirmed_hu_conv;
	}
}
export class UpdateCompleted extends MonitorEvent {
	public funding_txo: OutPoint;
	public monitor_update_id: number;
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.UpdateCompleted) {
		super(null, ptr);
		const funding_txo: number = obj.funding_txo;
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
			funding_txo_hu_conv.ptrs_to.add(this);
		this.funding_txo = funding_txo_hu_conv;
		this.monitor_update_id = obj.monitor_update_id;
	}
}
export class UpdateFailed extends MonitorEvent {
	public update_failed: OutPoint;
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.UpdateFailed) {
		super(null, ptr);
		const update_failed: number = obj.update_failed;
		const update_failed_hu_conv: OutPoint = new OutPoint(null, update_failed);
			update_failed_hu_conv.ptrs_to.add(this);
		this.update_failed = update_failed_hu_conv;
	}
}
	public number clone_ptr() {
		number ret = bindings.MonitorEvent_clone_ptr(this.ptr);
		return ret;
	}

	public MonitorEvent clone() {
		number ret = bindings.MonitorEvent_clone(this.ptr);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static MonitorEvent constructor_htlcevent(HTLCUpdate a) {
		number ret = bindings.MonitorEvent_htlcevent(a == null ? 0 : a.ptr & ~1);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static MonitorEvent constructor_commitment_tx_confirmed(OutPoint a) {
		number ret = bindings.MonitorEvent_commitment_tx_confirmed(a == null ? 0 : a.ptr & ~1);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static MonitorEvent constructor_update_completed(OutPoint funding_txo, number monitor_update_id) {
		number ret = bindings.MonitorEvent_update_completed(funding_txo == null ? 0 : funding_txo.ptr & ~1, monitor_update_id);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static MonitorEvent constructor_update_failed(OutPoint a) {
		number ret = bindings.MonitorEvent_update_failed(a == null ? 0 : a.ptr & ~1);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.MonitorEvent_write(this.ptr);
		return ret;
	}

}

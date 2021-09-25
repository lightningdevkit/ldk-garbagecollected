
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
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

	public static MonitorEvent constructor_commitment_tx_confirmed(OutPoint a) {
		number ret = bindings.MonitorEvent_commitment_tx_confirmed(a == null ? 0 : a.ptr & ~1);
		MonitorEvent ret_hu_conv = MonitorEvent.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

}

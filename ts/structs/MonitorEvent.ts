
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
		if (raw_val instanceof bindings.LDKMonitorEvent.CommitmentTxBroadcasted) {
			return new CommitmentTxBroadcasted(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class HTLCEvent extends MonitorEvent {
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.HTLCEvent) {
		super(null, ptr);
	}
}
export class CommitmentTxBroadcasted extends MonitorEvent {
	private constructor(ptr: number, obj: bindings.LDKMonitorEvent.CommitmentTxBroadcasted) {
		super(null, ptr);
	}
}

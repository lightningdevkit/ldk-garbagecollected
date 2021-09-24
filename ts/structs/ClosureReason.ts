
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class ClosureReason extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.ClosureReason_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): ClosureReason {
		const raw_val: bindings.LDKClosureReason = bindings.LDKClosureReason_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKClosureReason.CounterpartyForceClosed) {
			return new CounterpartyForceClosed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.HolderForceClosed) {
			return new HolderForceClosed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.CooperativeClosure) {
			return new CooperativeClosure(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.CommitmentTxConfirmed) {
			return new CommitmentTxConfirmed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.ProcessingError) {
			return new ProcessingError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.DisconnectedPeer) {
			return new DisconnectedPeer(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKClosureReason.OutdatedChannelManager) {
			return new OutdatedChannelManager(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class CounterpartyForceClosed extends ClosureReason {
	public peer_msg: String;
	private constructor(ptr: number, obj: bindings.LDKClosureReason.CounterpartyForceClosed) {
		super(null, ptr);
		this.peer_msg = obj.peer_msg;
	}
}
export class HolderForceClosed extends ClosureReason {
	private constructor(ptr: number, obj: bindings.LDKClosureReason.HolderForceClosed) {
		super(null, ptr);
	}
}
export class CooperativeClosure extends ClosureReason {
	private constructor(ptr: number, obj: bindings.LDKClosureReason.CooperativeClosure) {
		super(null, ptr);
	}
}
export class CommitmentTxConfirmed extends ClosureReason {
	private constructor(ptr: number, obj: bindings.LDKClosureReason.CommitmentTxConfirmed) {
		super(null, ptr);
	}
}
export class ProcessingError extends ClosureReason {
	public err: String;
	private constructor(ptr: number, obj: bindings.LDKClosureReason.ProcessingError) {
		super(null, ptr);
		this.err = obj.err;
	}
}
export class DisconnectedPeer extends ClosureReason {
	private constructor(ptr: number, obj: bindings.LDKClosureReason.DisconnectedPeer) {
		super(null, ptr);
	}
}
export class OutdatedChannelManager extends ClosureReason {
	private constructor(ptr: number, obj: bindings.LDKClosureReason.OutdatedChannelManager) {
		super(null, ptr);
	}
}
	public ClosureReason clone() {
		number ret = bindings.ClosureReason_clone(this.ptr);
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_counterparty_force_closed(String peer_msg) {
		number ret = bindings.ClosureReason_counterparty_force_closed(peer_msg);
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_holder_force_closed() {
		number ret = bindings.ClosureReason_holder_force_closed();
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_cooperative_closure() {
		number ret = bindings.ClosureReason_cooperative_closure();
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_commitment_tx_confirmed() {
		number ret = bindings.ClosureReason_commitment_tx_confirmed();
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_processing_error(String err) {
		number ret = bindings.ClosureReason_processing_error(err);
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_disconnected_peer() {
		number ret = bindings.ClosureReason_disconnected_peer();
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ClosureReason constructor_outdated_channel_manager() {
		number ret = bindings.ClosureReason_outdated_channel_manager();
		ClosureReason ret_hu_conv = ClosureReason.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ClosureReason_write(this.ptr);
		return ret;
	}

}

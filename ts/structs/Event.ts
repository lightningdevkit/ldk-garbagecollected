
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class Event extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.Event_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): Event {
		const raw_val: bindings.LDKEvent = bindings.LDKEvent_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKEvent.FundingGenerationReady) {
			return new FundingGenerationReady(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentReceived) {
			return new PaymentReceived(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentSent) {
			return new PaymentSent(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentPathFailed) {
			return new PaymentPathFailed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PendingHTLCsForwardable) {
			return new PendingHTLCsForwardable(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.SpendableOutputs) {
			return new SpendableOutputs(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentForwarded) {
			return new PaymentForwarded(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.ChannelClosed) {
			return new ChannelClosed(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class FundingGenerationReady extends Event {
	public temporary_channel_id: Uint8Array;
	public channel_value_satoshis: number;
	public output_script: Uint8Array;
	public user_channel_id: number;
	private constructor(ptr: number, obj: bindings.LDKEvent.FundingGenerationReady) {
		super(null, ptr);
		this.temporary_channel_id = obj.temporary_channel_id;
		this.channel_value_satoshis = obj.channel_value_satoshis;
		this.output_script = obj.output_script;
		this.user_channel_id = obj.user_channel_id;
	}
}
export class PaymentReceived extends Event {
	public payment_hash: Uint8Array;
	public amt: number;
	public purpose: PaymentPurpose;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentReceived) {
		super(null, ptr);
		this.payment_hash = obj.payment_hash;
		this.amt = obj.amt;
		const purpose: number = obj.purpose;
		PaymentPurpose purpose_hu_conv = PaymentPurpose.constr_from_ptr(purpose);
			purpose_hu_conv.ptrs_to.add(this);
		this.purpose = purpose_hu_conv;
	}
}
export class PaymentSent extends Event {
	public payment_preimage: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentSent) {
		super(null, ptr);
		this.payment_preimage = obj.payment_preimage;
	}
}
export class PaymentPathFailed extends Event {
	public payment_hash: Uint8Array;
	public rejected_by_dest: boolean;
	public network_update: Option_NetworkUpdateZ;
	public all_paths_failed: boolean;
	public path: RouteHop[];
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentPathFailed) {
		super(null, ptr);
		this.payment_hash = obj.payment_hash;
		this.rejected_by_dest = obj.rejected_by_dest;
		const network_update: number = obj.network_update;
		Option_NetworkUpdateZ network_update_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			network_update_hu_conv.ptrs_to.add(this);
		this.network_update = network_update_hu_conv;
		this.all_paths_failed = obj.all_paths_failed;
		const path: number[] = obj.path;
		RouteHop[] path_conv_10_arr = new RouteHop[path.length];
			for (int k = 0; k < path.length; k++) {
				number path_conv_10 = path[k];
				const path_conv_10_hu_conv: RouteHop = new RouteHop(null, path_conv_10);
				path_conv_10_hu_conv.ptrs_to.add(this);
				path_conv_10_arr[k] = path_conv_10_hu_conv;
			}
		this.path = path_conv_10_arr;
	}
}
export class PendingHTLCsForwardable extends Event {
	public time_forwardable: number;
	private constructor(ptr: number, obj: bindings.LDKEvent.PendingHTLCsForwardable) {
		super(null, ptr);
		this.time_forwardable = obj.time_forwardable;
	}
}
export class SpendableOutputs extends Event {
	public outputs: SpendableOutputDescriptor[];
	private constructor(ptr: number, obj: bindings.LDKEvent.SpendableOutputs) {
		super(null, ptr);
		const outputs: number[] = obj.outputs;
		SpendableOutputDescriptor[] outputs_conv_27_arr = new SpendableOutputDescriptor[outputs.length];
			for (int b = 0; b < outputs.length; b++) {
				number outputs_conv_27 = outputs[b];
				SpendableOutputDescriptor outputs_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(outputs_conv_27);
				outputs_conv_27_hu_conv.ptrs_to.add(this);
				outputs_conv_27_arr[b] = outputs_conv_27_hu_conv;
			}
		this.outputs = outputs_conv_27_arr;
	}
}
export class PaymentForwarded extends Event {
	public fee_earned_msat: Option_u64Z;
	public claim_from_onchain_tx: boolean;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentForwarded) {
		super(null, ptr);
		const fee_earned_msat: number = obj.fee_earned_msat;
		Option_u64Z fee_earned_msat_hu_conv = Option_u64Z.constr_from_ptr(fee_earned_msat);
			fee_earned_msat_hu_conv.ptrs_to.add(this);
		this.fee_earned_msat = fee_earned_msat_hu_conv;
		this.claim_from_onchain_tx = obj.claim_from_onchain_tx;
	}
}
export class ChannelClosed extends Event {
	public channel_id: Uint8Array;
	public reason: ClosureReason;
	private constructor(ptr: number, obj: bindings.LDKEvent.ChannelClosed) {
		super(null, ptr);
		this.channel_id = obj.channel_id;
		const reason: number = obj.reason;
		ClosureReason reason_hu_conv = ClosureReason.constr_from_ptr(reason);
			reason_hu_conv.ptrs_to.add(this);
		this.reason = reason_hu_conv;
	}
}
	public Event clone() {
		number ret = bindings.Event_clone(this.ptr);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static Event constructor_funding_generation_ready(Uint8Array temporary_channel_id, number channel_value_satoshis, Uint8Array output_script, number user_channel_id) {
		number ret = bindings.Event_funding_generation_ready(temporary_channel_id, channel_value_satoshis, output_script, user_channel_id);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_payment_received(Uint8Array payment_hash, number amt, PaymentPurpose purpose) {
		number ret = bindings.Event_payment_received(payment_hash, amt, purpose.ptr);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_payment_sent(Uint8Array payment_preimage) {
		number ret = bindings.Event_payment_sent(payment_preimage);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_payment_path_failed(Uint8Array payment_hash, boolean rejected_by_dest, Option_NetworkUpdateZ network_update, boolean all_paths_failed, RouteHop[] path) {
		number ret = bindings.Event_payment_path_failed(payment_hash, rejected_by_dest, network_update.ptr, all_paths_failed, path != null ? Arrays.stream(path).map(path_conv_10 -> path_conv_10 == null ? 0 : path_conv_10.ptr & ~1).toArray(number[]::new) : null);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		for (RouteHop path_conv_10: path) { ret_hu_conv.ptrs_to.add(path_conv_10); };
		return ret_hu_conv;
	}

	public static Event constructor_pending_htlcs_forwardable(number time_forwardable) {
		number ret = bindings.Event_pending_htlcs_forwardable(time_forwardable);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_spendable_outputs(SpendableOutputDescriptor[] outputs) {
		number ret = bindings.Event_spendable_outputs(outputs != null ? Arrays.stream(outputs).map(outputs_conv_27 -> outputs_conv_27.ptr).toArray(number[]::new) : null);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_payment_forwarded(Option_u64Z fee_earned_msat, boolean claim_from_onchain_tx) {
		number ret = bindings.Event_payment_forwarded(fee_earned_msat.ptr, claim_from_onchain_tx);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Event constructor_channel_closed(Uint8Array channel_id, ClosureReason reason) {
		number ret = bindings.Event_channel_closed(channel_id, reason.ptr);
		Event ret_hu_conv = Event.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.Event_write(this.ptr);
		return ret;
	}

}

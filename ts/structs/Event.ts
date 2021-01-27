
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
		if (raw_val instanceof bindings.LDKEvent.FundingBroadcastSafe) {
			return new FundingBroadcastSafe(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentReceived) {
			return new PaymentReceived(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentSent) {
			return new PaymentSent(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PaymentFailed) {
			return new PaymentFailed(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.PendingHTLCsForwardable) {
			return new PendingHTLCsForwardable(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKEvent.SpendableOutputs) {
			return new SpendableOutputs(this.ptr, raw_val);
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
export class FundingBroadcastSafe extends Event {
	public funding_txo: OutPoint;
	public user_channel_id: number;
	private constructor(ptr: number, obj: bindings.LDKEvent.FundingBroadcastSafe) {
		super(null, ptr);
		const funding_txo: number = obj.funding_txo;
		const funding_txo_hu_conv: OutPoint = new OutPoint(null, funding_txo);
		this.funding_txo = funding_txo_hu_conv;
		this.user_channel_id = obj.user_channel_id;
	}
}
export class PaymentReceived extends Event {
	public payment_hash: Uint8Array;
	public payment_secret: Uint8Array;
	public amt: number;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentReceived) {
		super(null, ptr);
		this.payment_hash = obj.payment_hash;
		this.payment_secret = obj.payment_secret;
		this.amt = obj.amt;
	}
}
export class PaymentSent extends Event {
	public payment_preimage: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentSent) {
		super(null, ptr);
		this.payment_preimage = obj.payment_preimage;
	}
}
export class PaymentFailed extends Event {
	public payment_hash: Uint8Array;
	public rejected_by_dest: boolean;
	private constructor(ptr: number, obj: bindings.LDKEvent.PaymentFailed) {
		super(null, ptr);
		this.payment_hash = obj.payment_hash;
		this.rejected_by_dest = obj.rejected_by_dest;
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
		SpendableOutputDescriptor[] arr_conv_27_arr = new SpendableOutputDescriptor[outputs.length];
			for (int b = 0; b < outputs.length; b++) {
				number arr_conv_27 = outputs[b];
				SpendableOutputDescriptor arr_conv_27_hu_conv = SpendableOutputDescriptor.constr_from_ptr(arr_conv_27);
				arr_conv_27_hu_conv.ptrs_to.add(this);
				arr_conv_27_arr[b] = arr_conv_27_hu_conv;
			}
		this.outputs = arr_conv_27_arr;
	}
}

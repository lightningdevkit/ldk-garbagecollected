
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class SpendableOutputDescriptor extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.SpendableOutputDescriptor_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): SpendableOutputDescriptor {
		const raw_val: bindings.LDKSpendableOutputDescriptor = bindings.LDKSpendableOutputDescriptor_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKSpendableOutputDescriptor.StaticOutput) {
			return new StaticOutput(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput) {
			return new DelayedPaymentOutput(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput) {
			return new StaticPaymentOutput(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class StaticOutput extends SpendableOutputDescriptor {
	public outpoint: OutPoint;
	public output: TxOut;
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.StaticOutput) {
		super(null, ptr);
		const outpoint: number = obj.outpoint;
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			outpoint_hu_conv.ptrs_to.add(this);
		this.outpoint = outpoint_hu_conv;
		const output: number = obj.output;
		TxOut output_conv = new TxOut(null, output);
		this.output = output_conv;
	}
}
export class DelayedPaymentOutput extends SpendableOutputDescriptor {
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput) {
		super(null, ptr);
	}
}
export class StaticPaymentOutput extends SpendableOutputDescriptor {
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput) {
		super(null, ptr);
	}
}

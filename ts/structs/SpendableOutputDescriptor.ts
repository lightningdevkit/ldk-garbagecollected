
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
	public delayed_payment_output: DelayedPaymentOutputDescriptor;
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput) {
		super(null, ptr);
		const delayed_payment_output: number = obj.delayed_payment_output;
		const delayed_payment_output_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, delayed_payment_output);
			delayed_payment_output_hu_conv.ptrs_to.add(this);
		this.delayed_payment_output = delayed_payment_output_hu_conv;
	}
}
export class StaticPaymentOutput extends SpendableOutputDescriptor {
	public static_payment_output: StaticPaymentOutputDescriptor;
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput) {
		super(null, ptr);
		const static_payment_output: number = obj.static_payment_output;
		const static_payment_output_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, static_payment_output);
			static_payment_output_hu_conv.ptrs_to.add(this);
		this.static_payment_output = static_payment_output_hu_conv;
	}
}
	public SpendableOutputDescriptor clone() {
		number ret = bindings.SpendableOutputDescriptor_clone(this.ptr);
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static SpendableOutputDescriptor constructor_static_output(OutPoint outpoint, TxOut output) {
		number ret = bindings.SpendableOutputDescriptor_static_output(outpoint == null ? 0 : outpoint.ptr & ~1, output.ptr);
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint);
		return ret_hu_conv;
	}

	public static SpendableOutputDescriptor constructor_delayed_payment_output(DelayedPaymentOutputDescriptor a) {
		number ret = bindings.SpendableOutputDescriptor_delayed_payment_output(a == null ? 0 : a.ptr & ~1);
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

	public static SpendableOutputDescriptor constructor_static_payment_output(StaticPaymentOutputDescriptor a) {
		number ret = bindings.SpendableOutputDescriptor_static_payment_output(a == null ? 0 : a.ptr & ~1);
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.SpendableOutputDescriptor_write(this.ptr);
		return ret;
	}

	public static Result_SpendableOutputDescriptorDecodeErrorZ constructor_read(Uint8Array ser) {
		number ret = bindings.SpendableOutputDescriptor_read(ser);
		Result_SpendableOutputDescriptorDecodeErrorZ ret_hu_conv = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

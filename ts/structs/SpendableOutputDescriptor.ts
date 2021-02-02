
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
		if (raw_val instanceof bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH) {
			return new DynamicOutputP2WSH(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment) {
			return new StaticOutputCounterpartyPayment(this.ptr, raw_val);
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
export class DynamicOutputP2WSH extends SpendableOutputDescriptor {
	public outpoint: OutPoint;
	public per_commitment_point: Uint8Array;
	public to_self_delay: number;
	public output: TxOut;
	public key_derivation_params: TwoTuple<Number, Number>;
	public revocation_pubkey: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH) {
		super(null, ptr);
		const outpoint: number = obj.outpoint;
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			outpoint_hu_conv.ptrs_to.add(this);
		this.outpoint = outpoint_hu_conv;
		this.per_commitment_point = obj.per_commitment_point;
		this.to_self_delay = obj.to_self_delay;
		const output: number = obj.output;
		TxOut output_conv = new TxOut(null, output);
		this.output = output_conv;
		const key_derivation_params: number = obj.key_derivation_params;
		number key_derivation_params_a = bindings.LDKC2Tuple_u64u64Z_get_a(key_derivation_params);
			number key_derivation_params_b = bindings.LDKC2Tuple_u64u64Z_get_b(key_derivation_params);
			TwoTuple<Number, Number> key_derivation_params_conv = new TwoTuple<Number, Number>(key_derivation_params_a, key_derivation_params_b, () -> {
				bindings.C2Tuple_u64u64Z_free(key_derivation_params);
			});
		this.key_derivation_params = key_derivation_params_conv;
		this.revocation_pubkey = obj.revocation_pubkey;
	}
}
export class StaticOutputCounterpartyPayment extends SpendableOutputDescriptor {
	public outpoint: OutPoint;
	public output: TxOut;
	public key_derivation_params: TwoTuple<Number, Number>;
	private constructor(ptr: number, obj: bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment) {
		super(null, ptr);
		const outpoint: number = obj.outpoint;
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			outpoint_hu_conv.ptrs_to.add(this);
		this.outpoint = outpoint_hu_conv;
		const output: number = obj.output;
		TxOut output_conv = new TxOut(null, output);
		this.output = output_conv;
		const key_derivation_params: number = obj.key_derivation_params;
		number key_derivation_params_a = bindings.LDKC2Tuple_u64u64Z_get_a(key_derivation_params);
			number key_derivation_params_b = bindings.LDKC2Tuple_u64u64Z_get_b(key_derivation_params);
			TwoTuple<Number, Number> key_derivation_params_conv = new TwoTuple<Number, Number>(key_derivation_params_a, key_derivation_params_b, () -> {
				bindings.C2Tuple_u64u64Z_free(key_derivation_params);
			});
		this.key_derivation_params = key_derivation_params_conv;
	}
}


import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_C2Tuple_usizeTransactionZZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_C2Tuple_usizeTransactionZZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_C2Tuple_usizeTransactionZZ {
		const raw_val: bindings.LDKCOption_C2Tuple_usizeTransactionZZ = bindings.LDKCOption_C2Tuple_usizeTransactionZZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_C2Tuple_usizeTransactionZZ {
	public some: TwoTuple<Number, Uint8Array>;
	private constructor(ptr: number, obj: bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		number some_a = bindings.LDKC2Tuple_usizeTransactionZ_get_a(some);
			Uint8Array some_b = bindings.LDKC2Tuple_usizeTransactionZ_get_b(some);
			TwoTuple<Number, Uint8Array> some_conv = new TwoTuple<Number, Uint8Array>(some_a, some_b, () -> {
				bindings.C2Tuple_usizeTransactionZ_free(some);
			});
		this.some = some_conv;
	}
}
export class None extends COption_C2Tuple_usizeTransactionZZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None) {
		super(null, ptr);
	}
}
	public static Option_C2Tuple_usizeTransactionZZ constructor__some(TwoTuple<Number, Uint8Array> o) {
		number ret = bindings.COption_C2Tuple_usizeTransactionZZ_some(bindings.C2Tuple_usizeTransactionZ_new(o.a, o.b));
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_C2Tuple_usizeTransactionZZ constructor__none() {
		number ret = bindings.COption_C2Tuple_usizeTransactionZZ_none();
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}


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
	public some: TwoTuple_usizeTransactionZ;
	private constructor(ptr: number, obj: bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		TwoTuple_usizeTransactionZ some_hu_conv = new TwoTuple_usizeTransactionZ(null, some);
			some_hu_conv.ptrs_to.add(this);
		this.some = some_hu_conv;
	}
}
export class None extends COption_C2Tuple_usizeTransactionZZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None) {
		super(null, ptr);
	}
}
	public static Option_C2Tuple_usizeTransactionZZ constructor_some(TwoTuple_usizeTransactionZ o) {
		number ret = bindings.COption_C2Tuple_usizeTransactionZZ_some(o != null ? o.ptr : 0);
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_C2Tuple_usizeTransactionZZ constructor_none() {
		number ret = bindings.COption_C2Tuple_usizeTransactionZZ_none();
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Option_C2Tuple_usizeTransactionZZ clone() {
		number ret = bindings.COption_C2Tuple_usizeTransactionZZ_clone(this.ptr);
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

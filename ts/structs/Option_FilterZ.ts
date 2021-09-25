
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_FilterZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_FilterZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_FilterZ {
		const raw_val: bindings.LDKCOption_FilterZ = bindings.LDKCOption_FilterZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_FilterZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_FilterZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_FilterZ {
	public some: Filter;
	private constructor(ptr: number, obj: bindings.LDKCOption_FilterZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		Filter ret_hu_conv = new Filter(null, some);
			ret_hu_conv.ptrs_to.add(this);
		this.some = ret_hu_conv;
	}
}
export class None extends COption_FilterZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_FilterZ.None) {
		super(null, ptr);
	}
}
	public static Option_FilterZ constructor__some(Filter o) {
		number ret = bindings.COption_FilterZ_some(o == null ? 0 : o.ptr);
		Option_FilterZ ret_hu_conv = Option_FilterZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Option_FilterZ constructor__none() {
		number ret = bindings.COption_FilterZ_none();
		Option_FilterZ ret_hu_conv = Option_FilterZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

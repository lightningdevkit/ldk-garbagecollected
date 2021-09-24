
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_AccessZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_AccessZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_AccessZ {
		const raw_val: bindings.LDKCOption_AccessZ = bindings.LDKCOption_AccessZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_AccessZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_AccessZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_AccessZ {
	public some: Access;
	private constructor(ptr: number, obj: bindings.LDKCOption_AccessZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		Access ret_hu_conv = new Access(null, some);
			ret_hu_conv.ptrs_to.add(this);
		this.some = ret_hu_conv;
	}
}
export class None extends COption_AccessZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_AccessZ.None) {
		super(null, ptr);
	}
}
	public static Option_AccessZ constructor__some(Access o) {
		number ret = bindings.COption_AccessZ_some(o == null ? 0 : o.ptr);
		Option_AccessZ ret_hu_conv = Option_AccessZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Option_AccessZ constructor__none() {
		number ret = bindings.COption_AccessZ_none();
		Option_AccessZ ret_hu_conv = Option_AccessZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

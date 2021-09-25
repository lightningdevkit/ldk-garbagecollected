
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_TypeZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_TypeZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_TypeZ {
		const raw_val: bindings.LDKCOption_TypeZ = bindings.LDKCOption_TypeZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_TypeZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_TypeZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_TypeZ {
	public some: Type;
	private constructor(ptr: number, obj: bindings.LDKCOption_TypeZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		Type ret_hu_conv = new Type(null, some);
			ret_hu_conv.ptrs_to.add(this);
		this.some = ret_hu_conv;
	}
}
export class None extends COption_TypeZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_TypeZ.None) {
		super(null, ptr);
	}
}
	public static Option_TypeZ constructor__some(Type o) {
		number ret = bindings.COption_TypeZ_some(o == null ? 0 : o.ptr);
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Option_TypeZ constructor__none() {
		number ret = bindings.COption_TypeZ_none();
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Option_TypeZ _clone() {
		number ret = bindings.COption_TypeZ_clone(this.ptr);
		Option_TypeZ ret_hu_conv = Option_TypeZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

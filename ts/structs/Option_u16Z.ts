
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_u16Z extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_u16Z_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_u16Z {
		const raw_val: bindings.LDKCOption_u16Z = bindings.LDKCOption_u16Z_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_u16Z.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_u16Z.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_u16Z {
	public some: number;
	private constructor(ptr: number, obj: bindings.LDKCOption_u16Z.Some) {
		super(null, ptr);
		this.some = obj.some;
	}
}
export class None extends COption_u16Z {
	private constructor(ptr: number, obj: bindings.LDKCOption_u16Z.None) {
		super(null, ptr);
	}
}
	public static Option_u16Z constructor_some(number o) {
		number ret = bindings.COption_u16Z_some(o);
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_u16Z constructor_none() {
		number ret = bindings.COption_u16Z_none();
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.COption_u16Z_clone_ptr(this.ptr);
		return ret;
	}

	public Option_u16Z clone() {
		number ret = bindings.COption_u16Z_clone(this.ptr);
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

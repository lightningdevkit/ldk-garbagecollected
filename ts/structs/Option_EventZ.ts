
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_EventZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_EventZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_EventZ {
		const raw_val: bindings.LDKCOption_EventZ = bindings.LDKCOption_EventZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_EventZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_EventZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_EventZ {
	public some: Event;
	private constructor(ptr: number, obj: bindings.LDKCOption_EventZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		Event some_hu_conv = Event.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
		this.some = some_hu_conv;
	}
}
export class None extends COption_EventZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_EventZ.None) {
		super(null, ptr);
	}
}
	public static Option_EventZ constructor_some(Event o) {
		number ret = bindings.COption_EventZ_some(o.ptr);
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_EventZ constructor_none() {
		number ret = bindings.COption_EventZ_none();
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.COption_EventZ_clone_ptr(this.ptr);
		return ret;
	}

	public Option_EventZ clone() {
		number ret = bindings.COption_EventZ_clone(this.ptr);
		Option_EventZ ret_hu_conv = Option_EventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

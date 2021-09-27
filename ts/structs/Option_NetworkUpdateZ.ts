
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_NetworkUpdateZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_NetworkUpdateZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_NetworkUpdateZ {
		const raw_val: bindings.LDKCOption_NetworkUpdateZ = bindings.LDKCOption_NetworkUpdateZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_NetworkUpdateZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_NetworkUpdateZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_NetworkUpdateZ {
	public some: NetworkUpdate;
	private constructor(ptr: number, obj: bindings.LDKCOption_NetworkUpdateZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		NetworkUpdate some_hu_conv = NetworkUpdate.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
		this.some = some_hu_conv;
	}
}
export class None extends COption_NetworkUpdateZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_NetworkUpdateZ.None) {
		super(null, ptr);
	}
}
	public static Option_NetworkUpdateZ constructor_some(NetworkUpdate o) {
		number ret = bindings.COption_NetworkUpdateZ_some(o.ptr);
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_NetworkUpdateZ constructor_none() {
		number ret = bindings.COption_NetworkUpdateZ_none();
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public Option_NetworkUpdateZ clone() {
		number ret = bindings.COption_NetworkUpdateZ_clone(this.ptr);
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

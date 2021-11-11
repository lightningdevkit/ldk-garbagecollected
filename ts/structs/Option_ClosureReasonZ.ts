
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_ClosureReasonZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_ClosureReasonZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_ClosureReasonZ {
		const raw_val: bindings.LDKCOption_ClosureReasonZ = bindings.LDKCOption_ClosureReasonZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_ClosureReasonZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_ClosureReasonZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_ClosureReasonZ {
	public some: ClosureReason;
	private constructor(ptr: number, obj: bindings.LDKCOption_ClosureReasonZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		ClosureReason some_hu_conv = ClosureReason.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
		this.some = some_hu_conv;
	}
}
export class None extends COption_ClosureReasonZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_ClosureReasonZ.None) {
		super(null, ptr);
	}
}
	public static Option_ClosureReasonZ constructor_some(ClosureReason o) {
		number ret = bindings.COption_ClosureReasonZ_some(o.ptr);
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_ClosureReasonZ constructor_none() {
		number ret = bindings.COption_ClosureReasonZ_none();
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.COption_ClosureReasonZ_clone_ptr(this.ptr);
		return ret;
	}

	public Option_ClosureReasonZ clone() {
		number ret = bindings.COption_ClosureReasonZ_clone(this.ptr);
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

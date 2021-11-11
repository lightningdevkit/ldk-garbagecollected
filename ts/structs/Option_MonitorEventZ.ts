
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class COption_MonitorEventZ extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.COption_MonitorEventZ_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): COption_MonitorEventZ {
		const raw_val: bindings.LDKCOption_MonitorEventZ = bindings.LDKCOption_MonitorEventZ_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKCOption_MonitorEventZ.Some) {
			return new Some(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKCOption_MonitorEventZ.None) {
			return new None(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class Some extends COption_MonitorEventZ {
	public some: MonitorEvent;
	private constructor(ptr: number, obj: bindings.LDKCOption_MonitorEventZ.Some) {
		super(null, ptr);
		const some: number = obj.some;
		MonitorEvent some_hu_conv = MonitorEvent.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
		this.some = some_hu_conv;
	}
}
export class None extends COption_MonitorEventZ {
	private constructor(ptr: number, obj: bindings.LDKCOption_MonitorEventZ.None) {
		super(null, ptr);
	}
}
	public static Option_MonitorEventZ constructor_some(MonitorEvent o) {
		number ret = bindings.COption_MonitorEventZ_some(o.ptr);
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static Option_MonitorEventZ constructor_none() {
		number ret = bindings.COption_MonitorEventZ_none();
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public number clone_ptr() {
		number ret = bindings.COption_MonitorEventZ_clone_ptr(this.ptr);
		return ret;
	}

	public Option_MonitorEventZ clone() {
		number ret = bindings.COption_MonitorEventZ_clone(this.ptr);
		Option_MonitorEventZ ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

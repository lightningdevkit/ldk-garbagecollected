
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::lightning::chain::channelmonitor::MonitorEvent or not
 */
export class Option_MonitorEventZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_MonitorEventZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_MonitorEventZ {
		const raw_ty: number = bindings.LDKCOption_MonitorEventZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_MonitorEventZ_Some(ptr);
			case 1: return new Option_MonitorEventZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_MonitorEventZ containing a crate::lightning::chain::channelmonitor::MonitorEvent
	 */
	public static constructor_some(o: MonitorEvent): Option_MonitorEventZ {
		const ret: bigint = bindings.COption_MonitorEventZ_some(CommonBase.get_ptr_of(o));
		const ret_hu_conv: Option_MonitorEventZ = Option_MonitorEventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MonitorEventZ containing nothing
	 */
	public static constructor_none(): Option_MonitorEventZ {
		const ret: bigint = bindings.COption_MonitorEventZ_none();
		const ret_hu_conv: Option_MonitorEventZ = Option_MonitorEventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_MonitorEventZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_MonitorEventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_MonitorEventZ {
		const ret: bigint = bindings.COption_MonitorEventZ_clone(this.ptr);
		const ret_hu_conv: Option_MonitorEventZ = Option_MonitorEventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_MonitorEventZ of type Some */
export class Option_MonitorEventZ_Some extends Option_MonitorEventZ {
	public some: MonitorEvent;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: bigint = bindings.LDKCOption_MonitorEventZ_Some_get_some(ptr);
		const some_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(some);
			CommonBase.add_ref_from(some_hu_conv, this);
		this.some = some_hu_conv;
	}
}
/** A Option_MonitorEventZ of type None */
export class Option_MonitorEventZ_None extends Option_MonitorEventZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

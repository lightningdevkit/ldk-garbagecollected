
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::CVec_ThirtyTwoBytesZ or not
 */
export class Option_CVec_ThirtyTwoBytesZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_CVec_ThirtyTwoBytesZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_CVec_ThirtyTwoBytesZZ {
		const raw_ty: number = bindings.LDKCOption_CVec_ThirtyTwoBytesZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_ThirtyTwoBytesZZ_Some(ptr);
			case 1: return new Option_CVec_ThirtyTwoBytesZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_CVec_ThirtyTwoBytesZZ containing a crate::c_types::derived::CVec_ThirtyTwoBytesZ
	 */
	public static constructor_some(o: Uint8Array[]): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.COption_CVec_ThirtyTwoBytesZZ_some(bindings.encodeUint32Array(o.map(o_conv_12 => bindings.encodeUint8Array(o_conv_12))));
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_ThirtyTwoBytesZZ containing nothing
	 */
	public static constructor_none(): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.COption_CVec_ThirtyTwoBytesZZ_none();
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_CVec_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_ThirtyTwoBytesZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.COption_CVec_ThirtyTwoBytesZZ_clone(this.ptr);
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_CVec_ThirtyTwoBytesZZ of type Some */
export class Option_CVec_ThirtyTwoBytesZZ_Some extends Option_CVec_ThirtyTwoBytesZZ {
	public some: Uint8Array[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_CVec_ThirtyTwoBytesZZ_Some_get_some(ptr);
		const some_conv_12_len: number = bindings.getArrayLength(some);
			const some_conv_12_arr: Uint8Array[] = new Array(some_conv_12_len).fill(null);
			for (var m = 0; m < some_conv_12_len; m++) {
				const some_conv_12: number = bindings.getU32ArrayElem(some, m);
				const some_conv_12_conv: Uint8Array = bindings.decodeUint8Array(some_conv_12);
				some_conv_12_arr[m] = some_conv_12_conv;
			}
			bindings.freeWasmMemory(some)
		this.some = some_conv_12_arr;
	}
}
/** A Option_CVec_ThirtyTwoBytesZZ of type None */
export class Option_CVec_ThirtyTwoBytesZZ_None extends Option_CVec_ThirtyTwoBytesZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

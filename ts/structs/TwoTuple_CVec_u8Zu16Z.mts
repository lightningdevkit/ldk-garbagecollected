
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_CVec_u8Zu16Z extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_CVec_u8Zu16Z_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_CVec_u8Zu16Z_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): number {
		const ret: number = bindings.C2Tuple_CVec_u8Zu16Z_get_b(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_CVec_u8Zu16Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_CVec_u8Zu16Z {
		const ret: bigint = bindings.C2Tuple_CVec_u8Zu16Z_clone(this.ptr);
		const ret_hu_conv: TwoTuple_CVec_u8Zu16Z = new TwoTuple_CVec_u8Zu16Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_CVec_u8Zu16Z from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: number): TwoTuple_CVec_u8Zu16Z {
		const ret: bigint = bindings.C2Tuple_CVec_u8Zu16Z_new(bindings.encodeUint8Array(a), b);
		const ret_hu_conv: TwoTuple_CVec_u8Zu16Z = new TwoTuple_CVec_u8Zu16Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

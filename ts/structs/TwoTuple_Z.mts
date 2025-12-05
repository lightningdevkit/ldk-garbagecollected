
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_Z extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_Z_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint16Array {
		const ret: number = bindings.C2Tuple_Z_get_a(this.ptr);
		const ret_conv: Uint16Array = bindings.decodeUint16Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): Uint16Array {
		const ret: number = bindings.C2Tuple_Z_get_b(this.ptr);
		const ret_conv: Uint16Array = bindings.decodeUint16Array(ret);
		return ret_conv;
	}

	/**
	 * Creates a new C2Tuple_Z from the contained elements.
	 */
	public static constructor_new(a: Uint16Array, b: Uint16Array): TwoTuple_Z {
		const ret: bigint = bindings.C2Tuple_Z_new(bindings.encodeUint16Array(a), bindings.encodeUint16Array(b));
		const ret_hu_conv: TwoTuple_Z = new TwoTuple_Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

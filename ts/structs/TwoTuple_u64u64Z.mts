
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_u64u64Z extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_u64u64Z_free);
	}

	/**
	 * 
	 */
	public get_a(): bigint {
		const ret: bigint = bindings.C2Tuple_u64u64Z_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_b(): bigint {
		const ret: bigint = bindings.C2Tuple_u64u64Z_get_b(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_u64u64Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_u64u64Z {
		const ret: bigint = bindings.C2Tuple_u64u64Z_clone(this.ptr);
		const ret_hu_conv: TwoTuple_u64u64Z = new TwoTuple_u64u64Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u64u64Z from the contained elements.
	 */
	public static constructor_new(a: bigint, b: bigint): TwoTuple_u64u64Z {
		const ret: bigint = bindings.C2Tuple_u64u64Z_new(a, b);
		const ret_hu_conv: TwoTuple_u64u64Z = new TwoTuple_u64u64Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

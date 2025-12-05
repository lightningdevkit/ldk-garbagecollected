
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_OnionPacketu64u32Z extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_OnionPacketu64u32Z_free);
	}

	/**
	 * 
	 */
	public get_a(): OnionPacket {
		const ret: bigint = bindings.C3Tuple_OnionPacketu64u32Z_get_a(this.ptr);
		const ret_hu_conv: OnionPacket = new OnionPacket(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): bigint {
		const ret: bigint = bindings.C3Tuple_OnionPacketu64u32Z_get_b(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_c(): number {
		const ret: number = bindings.C3Tuple_OnionPacketu64u32Z_get_c(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_OnionPacketu64u32Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_OnionPacketu64u32Z {
		const ret: bigint = bindings.C3Tuple_OnionPacketu64u32Z_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_OnionPacketu64u32Z = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OnionPacketu64u32Z from the contained elements.
	 */
	public static constructor_new(a: OnionPacket, b: bigint, c: number): ThreeTuple_OnionPacketu64u32Z {
		const ret: bigint = bindings.C3Tuple_OnionPacketu64u32Z_new(CommonBase.get_ptr_of(a), b, c);
		const ret_hu_conv: ThreeTuple_OnionPacketu64u32Z = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

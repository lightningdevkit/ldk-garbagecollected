
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_StrStrStrZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_StrStrStrZ_free);
	}

	/**
	 * 
	 */
	public get_a(): string {
		const ret: number = bindings.C3Tuple_StrStrStrZ_get_a(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): string {
		const ret: number = bindings.C3Tuple_StrStrStrZ_get_b(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_c(): string {
		const ret: number = bindings.C3Tuple_StrStrStrZ_get_c(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_StrStrStrZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_StrStrStrZ {
		const ret: bigint = bindings.C3Tuple_StrStrStrZ_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_StrStrStrZ = new ThreeTuple_StrStrStrZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_StrStrStrZ from the contained elements.
	 */
	public static constructor_new(a: string, b: string, c: string): ThreeTuple_StrStrStrZ {
		const ret: bigint = bindings.C3Tuple_StrStrStrZ_new(bindings.encodeString(a), bindings.encodeString(b), bindings.encodeString(c));
		const ret_hu_conv: ThreeTuple_StrStrStrZ = new ThreeTuple_StrStrStrZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

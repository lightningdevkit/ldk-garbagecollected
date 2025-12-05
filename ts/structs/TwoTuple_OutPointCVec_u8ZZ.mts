
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_OutPointCVec_u8ZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_OutPointCVec_u8ZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): OutPoint {
		const ret: bigint = bindings.C2Tuple_OutPointCVec_u8ZZ_get_a(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): Uint8Array {
		const ret: number = bindings.C2Tuple_OutPointCVec_u8ZZ_get_b(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_OutPointCVec_u8ZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_OutPointCVec_u8ZZ {
		const ret: bigint = bindings.C2Tuple_OutPointCVec_u8ZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_OutPointCVec_u8ZZ = new TwoTuple_OutPointCVec_u8ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OutPointCVec_u8ZZ from the contained elements.
	 */
	public static constructor_new(a: OutPoint, b: Uint8Array): TwoTuple_OutPointCVec_u8ZZ {
		const ret: bigint = bindings.C2Tuple_OutPointCVec_u8ZZ_new(CommonBase.get_ptr_of(a), bindings.encodeUint8Array(b));
		const ret_hu_conv: TwoTuple_OutPointCVec_u8ZZ = new TwoTuple_OutPointCVec_u8ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

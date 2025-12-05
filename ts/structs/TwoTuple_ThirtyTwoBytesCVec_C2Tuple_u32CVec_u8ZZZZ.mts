
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): TwoTuple_u32CVec_u8ZZ[] {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_get_b(this.ptr);
		const ret_conv_23_len: number = bindings.getArrayLength(ret);
		const ret_conv_23_arr: TwoTuple_u32CVec_u8ZZ[] = new Array(ret_conv_23_len).fill(null);
		for (var x = 0; x < ret_conv_23_len; x++) {
			const ret_conv_23: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_23_hu_conv: TwoTuple_u32CVec_u8ZZ = new TwoTuple_u32CVec_u8ZZ(null, ret_conv_23);
			CommonBase.add_ref_from(ret_conv_23_hu_conv, this);
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_23_arr;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: TwoTuple_u32CVec_u8ZZ[]): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ_new(bindings.encodeUint8Array(a), bindings.encodeUint64Array(b.map(b_conv_23 => CommonBase.get_ptr_of(b_conv_23))));
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

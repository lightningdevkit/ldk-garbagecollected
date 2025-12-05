
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): TwoTuple_u32TxOutZ[] {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_get_b(this.ptr);
		const ret_conv_20_len: number = bindings.getArrayLength(ret);
		const ret_conv_20_arr: TwoTuple_u32TxOutZ[] = new Array(ret_conv_20_len).fill(null);
		for (var u = 0; u < ret_conv_20_len; u++) {
			const ret_conv_20: bigint = bindings.getU64ArrayElem(ret, u);
			const ret_conv_20_hu_conv: TwoTuple_u32TxOutZ = new TwoTuple_u32TxOutZ(null, ret_conv_20);
			CommonBase.add_ref_from(ret_conv_20_hu_conv, this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_20_arr;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: TwoTuple_u32TxOutZ[]): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ_new(bindings.encodeUint8Array(a), bindings.encodeUint64Array(b.map(b_conv_20 => CommonBase.get_ptr_of(b_conv_20))));
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

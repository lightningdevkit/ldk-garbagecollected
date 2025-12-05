
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): Uint8Array[] {
		const ret: number = bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_get_b(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: Uint8Array[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: number = bindings.getU32ArrayElem(ret, m);
			const ret_conv_12_conv: Uint8Array = bindings.decodeUint8Array(ret_conv_12);
			ret_conv_12_arr[m] = ret_conv_12_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ {
		const ret: bigint = bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ = new TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: Uint8Array[]): TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ {
		const ret: bigint = bindings.C2Tuple_ECDSASignatureCVec_ECDSASignatureZZ_new(bindings.encodeUint8Array(a), bindings.encodeUint32Array(b.map(b_conv_12 => bindings.encodeUint8Array(b_conv_12))));
		const ret_hu_conv: TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ = new TwoTuple_ECDSASignatureCVec_ECDSASignatureZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

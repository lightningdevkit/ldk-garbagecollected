
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): number {
		const ret: number = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_b(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_c(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_c(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: number, c: Option_ThirtyTwoBytesZ): ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_new(bindings.encodeUint8Array(a), b, CommonBase.get_ptr_of(c));
		const ret_hu_conv: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

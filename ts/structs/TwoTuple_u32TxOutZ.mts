
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_u32TxOutZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_u32TxOutZ_free);
	}

	/**
	 * 
	 */
	public get_a(): number {
		const ret: number = bindings.C2Tuple_u32TxOutZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_b(): TxOut {
		const ret: bigint = bindings.C2Tuple_u32TxOutZ_get_b(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_u32TxOutZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_u32TxOutZ {
		const ret: bigint = bindings.C2Tuple_u32TxOutZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_u32TxOutZ = new TwoTuple_u32TxOutZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u32TxOutZ from the contained elements.
	 */
	public static constructor_new(a: number, b: TxOut): TwoTuple_u32TxOutZ {
		const ret: bigint = bindings.C2Tuple_u32TxOutZ_new(a, CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_u32TxOutZ = new TwoTuple_u32TxOutZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_usizeTransactionZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_usizeTransactionZ_free);
	}

	/**
	 * 
	 */
	public get_a(): number {
		const ret: number = bindings.C2Tuple_usizeTransactionZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_b(): Uint8Array {
		const ret: number = bindings.C2Tuple_usizeTransactionZ_get_b(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_usizeTransactionZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_usizeTransactionZ {
		const ret: bigint = bindings.C2Tuple_usizeTransactionZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_usizeTransactionZ = new TwoTuple_usizeTransactionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_usizeTransactionZ from the contained elements.
	 */
	public static constructor_new(a: number, b: Uint8Array): TwoTuple_usizeTransactionZ {
		const ret: bigint = bindings.C2Tuple_usizeTransactionZ_new(a, bindings.encodeUint8Array(b));
		const ret_hu_conv: TwoTuple_usizeTransactionZ = new TwoTuple_usizeTransactionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

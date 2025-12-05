
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_OfferboolZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_OfferboolZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Offer {
		const ret: bigint = bindings.C2Tuple_OfferboolZ_get_a(this.ptr);
		const ret_hu_conv: Offer = new Offer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): boolean {
		const ret: boolean = bindings.C2Tuple_OfferboolZ_get_b(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_OfferboolZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_OfferboolZ {
		const ret: bigint = bindings.C2Tuple_OfferboolZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_OfferboolZ = new TwoTuple_OfferboolZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OfferboolZ from the contained elements.
	 */
	public static constructor_new(a: Offer, b: boolean): TwoTuple_OfferboolZ {
		const ret: bigint = bindings.C2Tuple_OfferboolZ_new(CommonBase.get_ptr_of(a), b);
		const ret_hu_conv: TwoTuple_OfferboolZ = new TwoTuple_OfferboolZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

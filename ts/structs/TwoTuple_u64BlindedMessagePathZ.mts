
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_u64BlindedMessagePathZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_u64BlindedMessagePathZ_free);
	}

	/**
	 * 
	 */
	public get_a(): bigint {
		const ret: bigint = bindings.C2Tuple_u64BlindedMessagePathZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public get_b(): BlindedMessagePath {
		const ret: bigint = bindings.C2Tuple_u64BlindedMessagePathZ_get_b(this.ptr);
		const ret_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_u64BlindedMessagePathZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_u64BlindedMessagePathZ {
		const ret: bigint = bindings.C2Tuple_u64BlindedMessagePathZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_u64BlindedMessagePathZ = new TwoTuple_u64BlindedMessagePathZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u64BlindedMessagePathZ from the contained elements.
	 */
	public static constructor_new(a: bigint, b: BlindedMessagePath): TwoTuple_u64BlindedMessagePathZ {
		const ret: bigint = bindings.C2Tuple_u64BlindedMessagePathZ_new(a, CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_u64BlindedMessagePathZ = new TwoTuple_u64BlindedMessagePathZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

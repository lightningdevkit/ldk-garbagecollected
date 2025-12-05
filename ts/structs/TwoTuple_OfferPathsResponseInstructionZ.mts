
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_OfferPathsResponseInstructionZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_OfferPathsResponseInstructionZ_free);
	}

	/**
	 * 
	 */
	public get_a(): OfferPaths {
		const ret: bigint = bindings.C2Tuple_OfferPathsResponseInstructionZ_get_a(this.ptr);
		const ret_hu_conv: OfferPaths = new OfferPaths(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): ResponseInstruction {
		const ret: bigint = bindings.C2Tuple_OfferPathsResponseInstructionZ_get_b(this.ptr);
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_OfferPathsResponseInstructionZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_OfferPathsResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_OfferPathsResponseInstructionZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_OfferPathsResponseInstructionZ = new TwoTuple_OfferPathsResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OfferPathsResponseInstructionZ from the contained elements.
	 */
	public static constructor_new(a: OfferPaths, b: ResponseInstruction): TwoTuple_OfferPathsResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_OfferPathsResponseInstructionZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_OfferPathsResponseInstructionZ = new TwoTuple_OfferPathsResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

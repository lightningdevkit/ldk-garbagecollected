
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_OnionMessageContentsResponseInstructionZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_free);
	}

	/**
	 * 
	 */
	public get_a(): OnionMessageContents {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_get_a(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): ResponseInstruction {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_get_b(this.ptr);
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_OnionMessageContentsResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_OnionMessageContentsResponseInstructionZ = new TwoTuple_OnionMessageContentsResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OnionMessageContentsResponseInstructionZ from the contained elements.
	 */
	public static constructor_new(a: OnionMessageContents, b: ResponseInstruction): TwoTuple_OnionMessageContentsResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsResponseInstructionZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_OnionMessageContentsResponseInstructionZ = new TwoTuple_OnionMessageContentsResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

}

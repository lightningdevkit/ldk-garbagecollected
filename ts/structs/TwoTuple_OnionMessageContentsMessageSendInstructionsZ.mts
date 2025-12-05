
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_OnionMessageContentsMessageSendInstructionsZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_free);
	}

	/**
	 * 
	 */
	public get_a(): OnionMessageContents {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_get_a(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): MessageSendInstructions {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_get_b(this.ptr);
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_OnionMessageContentsMessageSendInstructionsZ {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_OnionMessageContentsMessageSendInstructionsZ = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OnionMessageContentsMessageSendInstructionsZ from the contained elements.
	 */
	public static constructor_new(a: OnionMessageContents, b: MessageSendInstructions): TwoTuple_OnionMessageContentsMessageSendInstructionsZ {
		const ret: bigint = bindings.C2Tuple_OnionMessageContentsMessageSendInstructionsZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_OnionMessageContentsMessageSendInstructionsZ = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Instructions for how and where to send the response to an onion message.
 */
export class ResponseInstruction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ResponseInstruction_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ResponseInstruction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ResponseInstruction
	 */
	public clone(): ResponseInstruction {
		const ret: bigint = bindings.ResponseInstruction_clone(this.ptr);
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Converts this [`ResponseInstruction`] into a [`MessageSendInstructions`] so that it can be
	 * used to send the response via a normal message sending method.
	 */
	public into_instructions(): MessageSendInstructions {
		const ret: bigint = bindings.ResponseInstruction_into_instructions(this.ptr);
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

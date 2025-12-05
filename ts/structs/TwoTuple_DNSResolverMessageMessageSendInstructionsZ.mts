
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_DNSResolverMessageMessageSendInstructionsZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_free);
	}

	/**
	 * 
	 */
	public get_a(): DNSResolverMessage {
		const ret: bigint = bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_get_a(this.ptr);
		const ret_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): MessageSendInstructions {
		const ret: bigint = bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_get_b(this.ptr);
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_DNSResolverMessageMessageSendInstructionsZ {
		const ret: bigint = bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_DNSResolverMessageMessageSendInstructionsZ = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_DNSResolverMessageMessageSendInstructionsZ from the contained elements.
	 */
	public static constructor_new(a: DNSResolverMessage, b: MessageSendInstructions): TwoTuple_DNSResolverMessageMessageSendInstructionsZ {
		const ret: bigint = bindings.C2Tuple_DNSResolverMessageMessageSendInstructionsZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_DNSResolverMessageMessageSendInstructionsZ = new TwoTuple_DNSResolverMessageMessageSendInstructionsZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

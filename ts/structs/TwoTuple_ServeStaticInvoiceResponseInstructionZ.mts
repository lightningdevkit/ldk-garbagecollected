
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ServeStaticInvoiceResponseInstructionZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_free);
	}

	/**
	 * 
	 */
	public get_a(): ServeStaticInvoice {
		const ret: bigint = bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_get_a(this.ptr);
		const ret_hu_conv: ServeStaticInvoice = new ServeStaticInvoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): ResponseInstruction {
		const ret: bigint = bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_get_b(this.ptr);
		const ret_hu_conv: ResponseInstruction = new ResponseInstruction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ServeStaticInvoiceResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ServeStaticInvoiceResponseInstructionZ = new TwoTuple_ServeStaticInvoiceResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ServeStaticInvoiceResponseInstructionZ from the contained elements.
	 */
	public static constructor_new(a: ServeStaticInvoice, b: ResponseInstruction): TwoTuple_ServeStaticInvoiceResponseInstructionZ {
		const ret: bigint = bindings.C2Tuple_ServeStaticInvoiceResponseInstructionZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_ServeStaticInvoiceResponseInstructionZ = new TwoTuple_ServeStaticInvoiceResponseInstructionZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_free);
	}

	/**
	 * 
	 */
	public get_a(): RawBolt11Invoice {
		const ret: bigint = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_a(this.ptr);
		const ret_hu_conv: RawBolt11Invoice = new RawBolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): Uint8Array {
		const ret: number = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_b(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_c(): Bolt11InvoiceSignature {
		const ret: bigint = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_c(this.ptr);
		const ret_hu_conv: Bolt11InvoiceSignature = new Bolt11InvoiceSignature(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ {
		const ret: bigint = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ from the contained elements.
	 */
	public static constructor_new(a: RawBolt11Invoice, b: Uint8Array, c: Bolt11InvoiceSignature): ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ {
		const ret: bigint = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_new(CommonBase.get_ptr_of(a), bindings.encodeUint8Array(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

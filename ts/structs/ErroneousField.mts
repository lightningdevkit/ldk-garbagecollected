
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The field in the [`InvoiceRequest`] or the [`Bolt12Invoice`] that contained an error.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
export class ErroneousField extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ErroneousField_free);
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public get_tlv_fieldnum(): bigint {
		const ret: bigint = bindings.ErroneousField_get_tlv_fieldnum(this.ptr);
		return ret;
	}

	/**
	 * The type number of the TLV field containing the error.
	 */
	public set_tlv_fieldnum(val: bigint): void {
		bindings.ErroneousField_set_tlv_fieldnum(this.ptr, val);
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 * 
	 * Returns a copy of the field.
	 */
	public get_suggested_value(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.ErroneousField_get_suggested_value(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A value to use for the TLV field to avoid the error.
	 */
	public set_suggested_value(val: Option_CVec_u8ZZ): void {
		bindings.ErroneousField_set_suggested_value(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ErroneousField given each field
	 */
	public static constructor_new(tlv_fieldnum_arg: bigint, suggested_value_arg: Option_CVec_u8ZZ): ErroneousField {
		const ret: bigint = bindings.ErroneousField_new(tlv_fieldnum_arg, CommonBase.get_ptr_of(suggested_value_arg));
		const ret_hu_conv: ErroneousField = new ErroneousField(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ErroneousField_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ErroneousField
	 */
	public clone(): ErroneousField {
		const ret: bigint = bindings.ErroneousField_clone(this.ptr);
		const ret_hu_conv: ErroneousField = new ErroneousField(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

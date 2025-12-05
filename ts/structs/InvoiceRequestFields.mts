
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Fields sent in an [`InvoiceRequest`] message to include in [`PaymentContext::Bolt12Offer`].
 * 
 * [`PaymentContext::Bolt12Offer`]: crate::blinded_path::payment::PaymentContext::Bolt12Offer
 */
export class InvoiceRequestFields extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InvoiceRequestFields_free);
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public get_payer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.InvoiceRequestFields_get_payer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public set_payer_signing_pubkey(val: Uint8Array): void {
		bindings.InvoiceRequestFields_set_payer_signing_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public get_quantity(): Option_u64Z {
		const ret: bigint = bindings.InvoiceRequestFields_get_quantity(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public set_quantity(val: Option_u64Z): void {
		bindings.InvoiceRequestFields_set_quantity(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response. Truncated to [`PAYER_NOTE_LIMIT`] characters.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_payer_note_truncated(): UntrustedString {
		const ret: bigint = bindings.InvoiceRequestFields_get_payer_note_truncated(this.ptr);
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response. Truncated to [`PAYER_NOTE_LIMIT`] characters.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_payer_note_truncated(val: UntrustedString|null): void {
		bindings.InvoiceRequestFields_set_payer_note_truncated(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The Human Readable Name which the sender indicated they were paying to.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_human_readable_name(): HumanReadableName {
		const ret: bigint = bindings.InvoiceRequestFields_get_human_readable_name(this.ptr);
		const ret_hu_conv: HumanReadableName = new HumanReadableName(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The Human Readable Name which the sender indicated they were paying to.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_human_readable_name(val: HumanReadableName|null): void {
		bindings.InvoiceRequestFields_set_human_readable_name(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new InvoiceRequestFields given each field
	 * 
	 * Note that payer_note_truncated_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that human_readable_name_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(payer_signing_pubkey_arg: Uint8Array, quantity_arg: Option_u64Z, payer_note_truncated_arg: UntrustedString|null, human_readable_name_arg: HumanReadableName|null): InvoiceRequestFields {
		const ret: bigint = bindings.InvoiceRequestFields_new(bindings.encodeUint8Array(payer_signing_pubkey_arg), CommonBase.get_ptr_of(quantity_arg), payer_note_truncated_arg == null ? 0n : CommonBase.get_ptr_of(payer_note_truncated_arg), human_readable_name_arg == null ? 0n : CommonBase.get_ptr_of(human_readable_name_arg));
		const ret_hu_conv: InvoiceRequestFields = new InvoiceRequestFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InvoiceRequestFields_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InvoiceRequestFields
	 */
	public clone(): InvoiceRequestFields {
		const ret: bigint = bindings.InvoiceRequestFields_clone(this.ptr);
		const ret_hu_conv: InvoiceRequestFields = new InvoiceRequestFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two InvoiceRequestFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: InvoiceRequestFields): boolean {
		const ret: boolean = bindings.InvoiceRequestFields_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the InvoiceRequestFields object into a byte array which can be read by InvoiceRequestFields_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.InvoiceRequestFields_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InvoiceRequestFields from a byte array, created by InvoiceRequestFields_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InvoiceRequestFieldsDecodeErrorZ {
		const ret: bigint = bindings.InvoiceRequestFields_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InvoiceRequestFieldsDecodeErrorZ = Result_InvoiceRequestFieldsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Parameters used with [`create_bolt11_invoice`].
 * 
 * [`create_bolt11_invoice`]: ChannelManager::create_bolt11_invoice
 */
export class Bolt11InvoiceParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt11InvoiceParameters_free);
	}

	/**
	 * The amount for the invoice, if any.
	 */
	public get_amount_msats(): Option_u64Z {
		const ret: bigint = bindings.Bolt11InvoiceParameters_get_amount_msats(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The amount for the invoice, if any.
	 */
	public set_amount_msats(val: Option_u64Z): void {
		bindings.Bolt11InvoiceParameters_set_amount_msats(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The description for what the invoice is for, or hash of such description.
	 */
	public get_description(): Bolt11InvoiceDescription {
		const ret: bigint = bindings.Bolt11InvoiceParameters_get_description(this.ptr);
		const ret_hu_conv: Bolt11InvoiceDescription = Bolt11InvoiceDescription.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The description for what the invoice is for, or hash of such description.
	 */
	public set_description(val: Bolt11InvoiceDescription): void {
		bindings.Bolt11InvoiceParameters_set_description(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The invoice expiration relative to its creation time. If not set, the invoice will expire in
	 * [`DEFAULT_EXPIRY_TIME`] by default.
	 * 
	 * The creation time used is the duration since the Unix epoch for `std` builds. For non-`std`
	 * builds, the highest block timestamp seen is used instead. In the latter case, use a long
	 * enough expiry to account for the average block time.
	 */
	public get_invoice_expiry_delta_secs(): Option_u32Z {
		const ret: bigint = bindings.Bolt11InvoiceParameters_get_invoice_expiry_delta_secs(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The invoice expiration relative to its creation time. If not set, the invoice will expire in
	 * [`DEFAULT_EXPIRY_TIME`] by default.
	 * 
	 * The creation time used is the duration since the Unix epoch for `std` builds. For non-`std`
	 * builds, the highest block timestamp seen is used instead. In the latter case, use a long
	 * enough expiry to account for the average block time.
	 */
	public set_invoice_expiry_delta_secs(val: Option_u32Z): void {
		bindings.Bolt11InvoiceParameters_set_invoice_expiry_delta_secs(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The minimum `cltv_expiry` for the last HTLC in the route. If not set, will use
	 * [`MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 * 
	 * If set, must be at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`], and a three-block buffer will be
	 * added as well to allow for up to a few new block confirmations during routing.
	 */
	public get_min_final_cltv_expiry_delta(): Option_u16Z {
		const ret: bigint = bindings.Bolt11InvoiceParameters_get_min_final_cltv_expiry_delta(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum `cltv_expiry` for the last HTLC in the route. If not set, will use
	 * [`MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 * 
	 * If set, must be at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`], and a three-block buffer will be
	 * added as well to allow for up to a few new block confirmations during routing.
	 */
	public set_min_final_cltv_expiry_delta(val: Option_u16Z): void {
		bindings.Bolt11InvoiceParameters_set_min_final_cltv_expiry_delta(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The payment hash used in the invoice. If not set, a payment hash will be generated using a
	 * preimage that can be reproduced by [`ChannelManager`] without storing any state.
	 * 
	 * Uses the payment hash if set. This may be useful if you're building an on-chain swap or
	 * involving another protocol where the payment hash is also involved outside the scope of
	 * lightning.
	 */
	public get_payment_hash(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.Bolt11InvoiceParameters_get_payment_hash(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The payment hash used in the invoice. If not set, a payment hash will be generated using a
	 * preimage that can be reproduced by [`ChannelManager`] without storing any state.
	 * 
	 * Uses the payment hash if set. This may be useful if you're building an on-chain swap or
	 * involving another protocol where the payment hash is also involved outside the scope of
	 * lightning.
	 */
	public set_payment_hash(val: Option_ThirtyTwoBytesZ): void {
		bindings.Bolt11InvoiceParameters_set_payment_hash(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Bolt11InvoiceParameters given each field
	 */
	public static constructor_new(amount_msats_arg: Option_u64Z, description_arg: Bolt11InvoiceDescription, invoice_expiry_delta_secs_arg: Option_u32Z, min_final_cltv_expiry_delta_arg: Option_u16Z, payment_hash_arg: Option_ThirtyTwoBytesZ): Bolt11InvoiceParameters {
		const ret: bigint = bindings.Bolt11InvoiceParameters_new(CommonBase.get_ptr_of(amount_msats_arg), CommonBase.get_ptr_of(description_arg), CommonBase.get_ptr_of(invoice_expiry_delta_secs_arg), CommonBase.get_ptr_of(min_final_cltv_expiry_delta_arg), CommonBase.get_ptr_of(payment_hash_arg));
		const ret_hu_conv: Bolt11InvoiceParameters = new Bolt11InvoiceParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" Bolt11InvoiceParameters. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): Bolt11InvoiceParameters {
		const ret: bigint = bindings.Bolt11InvoiceParameters_default();
		const ret_hu_conv: Bolt11InvoiceParameters = new Bolt11InvoiceParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

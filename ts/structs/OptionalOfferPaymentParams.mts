
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Optional arguments to [`ChannelManager::pay_for_offer`]
 * and [`ChannelManager::pay_for_offer_from_human_readable_name`]
 * .
 * 
 * These fields will often not need to be set, and the provided [`Self::default`] can be used.
 */
export class OptionalOfferPaymentParams extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OptionalOfferPaymentParams_free);
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public get_payer_note(): Option_StrZ {
		const ret: bigint = bindings.OptionalOfferPaymentParams_get_payer_note(this.ptr);
		const ret_hu_conv: Option_StrZ = Option_StrZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public set_payer_note(val: Option_StrZ): void {
		bindings.OptionalOfferPaymentParams_set_payer_note(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public get_route_params_config(): RouteParametersConfig {
		const ret: bigint = bindings.OptionalOfferPaymentParams_get_route_params_config(this.ptr);
		const ret_hu_conv: RouteParametersConfig = new RouteParametersConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public set_route_params_config(val: RouteParametersConfig): void {
		bindings.OptionalOfferPaymentParams_set_route_params_config(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The number of tries or time during which we'll retry this payment if some paths to the
	 * recipient fail.
	 * 
	 * Once the retry limit is reached, further path failures will not be retried and the payment
	 * will ultimately fail once all pending paths have failed (generating an
	 * [`Event::PaymentFailed`]).
	 */
	public get_retry_strategy(): Retry {
		const ret: bigint = bindings.OptionalOfferPaymentParams_get_retry_strategy(this.ptr);
		const ret_hu_conv: Retry = Retry.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The number of tries or time during which we'll retry this payment if some paths to the
	 * recipient fail.
	 * 
	 * Once the retry limit is reached, further path failures will not be retried and the payment
	 * will ultimately fail once all pending paths have failed (generating an
	 * [`Event::PaymentFailed`]).
	 */
	public set_retry_strategy(val: Retry): void {
		bindings.OptionalOfferPaymentParams_set_retry_strategy(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new OptionalOfferPaymentParams given each field
	 */
	public static constructor_new(payer_note_arg: Option_StrZ, route_params_config_arg: RouteParametersConfig, retry_strategy_arg: Retry): OptionalOfferPaymentParams {
		const ret: bigint = bindings.OptionalOfferPaymentParams_new(CommonBase.get_ptr_of(payer_note_arg), CommonBase.get_ptr_of(route_params_config_arg), CommonBase.get_ptr_of(retry_strategy_arg));
		const ret_hu_conv: OptionalOfferPaymentParams = new OptionalOfferPaymentParams(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" OptionalOfferPaymentParams. See struct and individual field documentaiton for details on which values are used.
	 */
	public static constructor_default(): OptionalOfferPaymentParams {
		const ret: bigint = bindings.OptionalOfferPaymentParams_default();
		const ret_hu_conv: OptionalOfferPaymentParams = new OptionalOfferPaymentParams(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

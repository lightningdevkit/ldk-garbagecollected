using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Optional arguments to [`ChannelManager::pay_for_offer`]
 * and [`ChannelManager::pay_for_offer_from_human_readable_name`]
 * .
 * 
 * These fields will often not need to be set, and the provided [`Self::default`] can be used.
 */
public class OptionalOfferPaymentParams : CommonBase {
	internal OptionalOfferPaymentParams(object _dummy, long ptr) : base(ptr) { }
	~OptionalOfferPaymentParams() {
		if (ptr != 0) { bindings.OptionalOfferPaymentParams_free(ptr); }
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public org.ldk.structs.Option_StrZ get_payer_note() {
		long ret = bindings.OptionalOfferPaymentParams_get_payer_note(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_StrZ ret_hu_conv = org.ldk.structs.Option_StrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public void set_payer_note(org.ldk.structs.Option_StrZ val) {
		bindings.OptionalOfferPaymentParams_set_payer_note(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public org.ldk.structs.RouteParametersConfig get_route_params_config() {
		long ret = bindings.OptionalOfferPaymentParams_get_route_params_config(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParametersConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParametersConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public void set_route_params_config(org.ldk.structs.RouteParametersConfig val) {
		bindings.OptionalOfferPaymentParams_set_route_params_config(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of tries or time during which we'll retry this payment if some paths to the
	 * recipient fail.
	 * 
	 * Once the retry limit is reached, further path failures will not be retried and the payment
	 * will ultimately fail once all pending paths have failed (generating an
	 * [`Event::PaymentFailed`]).
	 */
	public org.ldk.structs.Retry get_retry_strategy() {
		long ret = bindings.OptionalOfferPaymentParams_get_retry_strategy(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Retry ret_hu_conv = org.ldk.structs.Retry.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public void set_retry_strategy(org.ldk.structs.Retry val) {
		bindings.OptionalOfferPaymentParams_set_retry_strategy(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new OptionalOfferPaymentParams given each field
	 */
	public static org.ldk.structs.OptionalOfferPaymentParams of(org.ldk.structs.Option_StrZ payer_note_arg, org.ldk.structs.RouteParametersConfig route_params_config_arg, org.ldk.structs.Retry retry_strategy_arg) {
		long ret = bindings.OptionalOfferPaymentParams_new(payer_note_arg.ptr, route_params_config_arg.ptr, retry_strategy_arg.ptr);
		GC.KeepAlive(payer_note_arg);
		GC.KeepAlive(route_params_config_arg);
		GC.KeepAlive(retry_strategy_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OptionalOfferPaymentParams ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OptionalOfferPaymentParams(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" OptionalOfferPaymentParams. See struct and individual field documentaiton for details on which values are used.
	 */
	public static org.ldk.structs.OptionalOfferPaymentParams with_default() {
		long ret = bindings.OptionalOfferPaymentParams_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OptionalOfferPaymentParams ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OptionalOfferPaymentParams(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

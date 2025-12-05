package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Optional arguments to [`ChannelManager::pay_for_offer`]
 * and [`ChannelManager::pay_for_offer_from_human_readable_name`]
 * .
 * 
 * These fields will often not need to be set, and the provided [`Self::default`] can be used.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OptionalOfferPaymentParams extends CommonBase {
	OptionalOfferPaymentParams(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OptionalOfferPaymentParams_free(ptr); }
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public Option_StrZ get_payer_note() {
		long ret = bindings.OptionalOfferPaymentParams_get_payer_note(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_StrZ ret_hu_conv = org.ldk.structs.Option_StrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A note that is communicated to the recipient about this payment via
	 * [`InvoiceRequest::payer_note`].
	 */
	public void set_payer_note(org.ldk.structs.Option_StrZ val) {
		bindings.OptionalOfferPaymentParams_set_payer_note(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public RouteParametersConfig get_route_params_config() {
		long ret = bindings.OptionalOfferPaymentParams_get_route_params_config(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RouteParametersConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RouteParametersConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Pathfinding options which tweak how the path is constructed to the recipient.
	 */
	public void set_route_params_config(org.ldk.structs.RouteParametersConfig val) {
		bindings.OptionalOfferPaymentParams_set_route_params_config(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of tries or time during which we'll retry this payment if some paths to the
	 * recipient fail.
	 * 
	 * Once the retry limit is reached, further path failures will not be retried and the payment
	 * will ultimately fail once all pending paths have failed (generating an
	 * [`Event::PaymentFailed`]).
	 */
	public Retry get_retry_strategy() {
		long ret = bindings.OptionalOfferPaymentParams_get_retry_strategy(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Retry ret_hu_conv = org.ldk.structs.Retry.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OptionalOfferPaymentParams given each field
	 */
	public static OptionalOfferPaymentParams of(org.ldk.structs.Option_StrZ payer_note_arg, org.ldk.structs.RouteParametersConfig route_params_config_arg, org.ldk.structs.Retry retry_strategy_arg) {
		long ret = bindings.OptionalOfferPaymentParams_new(payer_note_arg.ptr, route_params_config_arg.ptr, retry_strategy_arg.ptr);
		Reference.reachabilityFence(payer_note_arg);
		Reference.reachabilityFence(route_params_config_arg);
		Reference.reachabilityFence(retry_strategy_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OptionalOfferPaymentParams ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OptionalOfferPaymentParams(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates a "default" OptionalOfferPaymentParams. See struct and individual field documentaiton for details on which values are used.
	 */
	public static OptionalOfferPaymentParams with_default() {
		long ret = bindings.OptionalOfferPaymentParams_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OptionalOfferPaymentParams ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OptionalOfferPaymentParams(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

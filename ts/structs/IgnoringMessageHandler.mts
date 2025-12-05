
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A dummy struct which implements `RoutingMessageHandler` without storing any routing information
 * or doing any processing. You can provide one of these as the route_handler in a MessageHandler.
 */
export class IgnoringMessageHandler extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.IgnoringMessageHandler_free);
	}

	/**
	 * Constructs a new IgnoringMessageHandler given each field
	 */
	public static constructor_new(): IgnoringMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_new();
		const ret_hu_conv: IgnoringMessageHandler = new IgnoringMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public as_BaseMessageHandler(): BaseMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_BaseMessageHandler(this.ptr);
		const ret_hu_conv: BaseMessageHandler = new BaseMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public as_RoutingMessageHandler(): RoutingMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_RoutingMessageHandler(this.ptr);
		const ret_hu_conv: RoutingMessageHandler = new RoutingMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageHandler must be freed before this_arg is
	 */
	public as_OnionMessageHandler(): OnionMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_OnionMessageHandler(this.ptr);
		const ret_hu_conv: OnionMessageHandler = new OnionMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OffersMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OffersMessageHandler must be freed before this_arg is
	 */
	public as_OffersMessageHandler(): OffersMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_OffersMessageHandler(this.ptr);
		const ret_hu_conv: OffersMessageHandler = new OffersMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new AsyncPaymentsMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned AsyncPaymentsMessageHandler must be freed before this_arg is
	 */
	public as_AsyncPaymentsMessageHandler(): AsyncPaymentsMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_AsyncPaymentsMessageHandler(this.ptr);
		const ret_hu_conv: AsyncPaymentsMessageHandler = new AsyncPaymentsMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new DNSResolverMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned DNSResolverMessageHandler must be freed before this_arg is
	 */
	public as_DNSResolverMessageHandler(): DNSResolverMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_DNSResolverMessageHandler(this.ptr);
		const ret_hu_conv: DNSResolverMessageHandler = new DNSResolverMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomOnionMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomOnionMessageHandler must be freed before this_arg is
	 */
	public as_CustomOnionMessageHandler(): CustomOnionMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_CustomOnionMessageHandler(this.ptr);
		const ret_hu_conv: CustomOnionMessageHandler = new CustomOnionMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SendOnlyMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SendOnlyMessageHandler must be freed before this_arg is
	 */
	public as_SendOnlyMessageHandler(): SendOnlyMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_SendOnlyMessageHandler(this.ptr);
		const ret_hu_conv: SendOnlyMessageHandler = new SendOnlyMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageReader which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageReader must be freed before this_arg is
	 */
	public as_CustomMessageReader(): CustomMessageReader {
		const ret: bigint = bindings.IgnoringMessageHandler_as_CustomMessageReader(this.ptr);
		const ret_hu_conv: CustomMessageReader = new CustomMessageReader(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new CustomMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned CustomMessageHandler must be freed before this_arg is
	 */
	public as_CustomMessageHandler(): CustomMessageHandler {
		const ret: bigint = bindings.IgnoringMessageHandler_as_CustomMessageHandler(this.ptr);
		const ret_hu_conv: CustomMessageHandler = new CustomMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

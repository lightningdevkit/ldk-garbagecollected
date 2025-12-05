
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A dummy struct which implements `ChannelMessageHandler` without having any channels.
 * You can provide one of these as the route_handler in a MessageHandler.
 */
export class ErroringMessageHandler extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ErroringMessageHandler_free);
	}

	/**
	 * Constructs a new ErroringMessageHandler
	 */
	public static constructor_new(): ErroringMessageHandler {
		const ret: bigint = bindings.ErroringMessageHandler_new();
		const ret_hu_conv: ErroringMessageHandler = new ErroringMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new BaseMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned BaseMessageHandler must be freed before this_arg is
	 */
	public as_BaseMessageHandler(): BaseMessageHandler {
		const ret: bigint = bindings.ErroringMessageHandler_as_BaseMessageHandler(this.ptr);
		const ret_hu_conv: BaseMessageHandler = new BaseMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public as_ChannelMessageHandler(): ChannelMessageHandler {
		const ret: bigint = bindings.ErroringMessageHandler_as_ChannelMessageHandler(this.ptr);
		const ret_hu_conv: ChannelMessageHandler = new ChannelMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

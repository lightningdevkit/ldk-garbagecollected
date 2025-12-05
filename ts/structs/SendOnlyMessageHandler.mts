

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SendOnlyMessageHandler */
export interface SendOnlyMessageHandlerInterface {
}

class LDKSendOnlyMessageHandlerHolder {
	held: SendOnlyMessageHandler|null = null;
}

/**
 * A handler which can only be used to send messages.
 * 
 * This is implemented by [`ChainMonitor`].
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 */
export class SendOnlyMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSendOnlyMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SendOnlyMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SendOnlyMessageHandler from a given implementation */
	public static new_impl(arg: SendOnlyMessageHandlerInterface, baseMessageHandler_impl: BaseMessageHandlerInterface): SendOnlyMessageHandler {
		const impl_holder: LDKSendOnlyMessageHandlerHolder = new LDKSendOnlyMessageHandlerHolder();
		let structImplementation = {
		} as bindings.LDKSendOnlyMessageHandler;
		const baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		const ptr_idx: [bigint, number] = bindings.LDKSendOnlyMessageHandler_new(structImplementation, baseMessageHandler.instance_idx!);

		impl_holder.held = new SendOnlyMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(baseMessageHandler);
		return impl_holder.held!;
	}

}

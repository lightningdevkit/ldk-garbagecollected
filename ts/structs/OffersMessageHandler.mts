

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of OffersMessageHandler */
export interface OffersMessageHandlerInterface {
	/**Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * If the provided [`OffersContext`] is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`]. There is one exception to
	 * this: [`OffersContext::InvoiceRequest`].
	 * 
	 * In order to support offers created prior to LDK 0.2, [`OffersContext::InvoiceRequest`]s are
	 * not authenticated by the [`OnionMessenger`]. It is the responsibility of message handling code
	 * to authenticate the provided [`OffersContext`] in this case.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_message(message: OffersMessage, context: Option_OffersContextZ, responder: Responder): Option_C2Tuple_OffersMessageResponseInstructionZZ;
	/**Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	release_pending_messages(): TwoTuple_OffersMessageMessageSendInstructionsZ[];
}

class LDKOffersMessageHandlerHolder {
	held: OffersMessageHandler|null = null;
}

/**
 * A handler for an [`OnionMessage`] containing a BOLT 12 Offers message as its payload.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class OffersMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKOffersMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OffersMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of OffersMessageHandler from a given implementation */
	public static new_impl(arg: OffersMessageHandlerInterface): OffersMessageHandler {
		const impl_holder: LDKOffersMessageHandlerHolder = new LDKOffersMessageHandlerHolder();
		let structImplementation = {
			handle_message (message: bigint, context: bigint, responder: bigint): bigint {
				const message_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(message);
				CommonBase.add_ref_from(message_hu_conv, this);
				const context_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_OffersMessageResponseInstructionZZ = arg.handle_message(message_hu_conv, context_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			release_pending_messages (): number {
				const ret: TwoTuple_OffersMessageMessageSendInstructionsZ[] = arg.release_pending_messages();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_48 => ret_conv_48.clone_ptr()));
				return result;
			},
		} as bindings.LDKOffersMessageHandler;
		const ptr_idx: [bigint, number] = bindings.LDKOffersMessageHandler_new(structImplementation);

		impl_holder.held = new OffersMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Handles the given message by either responding with an [`Bolt12Invoice`], sending a payment,
	 * or replying with an error.
	 * 
	 * If the provided [`OffersContext`] is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`]. There is one exception to
	 * this: [`OffersContext::InvoiceRequest`].
	 * 
	 * In order to support offers created prior to LDK 0.2, [`OffersContext::InvoiceRequest`]s are
	 * not authenticated by the [`OnionMessenger`]. It is the responsibility of message handling code
	 * to authenticate the provided [`OffersContext`] in this case.
	 * 
	 * The returned [`OffersMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_message(message: OffersMessage, context: Option_OffersContextZ, responder: Responder|null): Option_C2Tuple_OffersMessageResponseInstructionZZ {
		const ret: bigint = bindings.OffersMessageHandler_handle_message(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_OffersMessageResponseInstructionZZ = Option_C2Tuple_OffersMessageResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Releases any [`OffersMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a payment flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_message`].
	 */
	public release_pending_messages(): TwoTuple_OffersMessageMessageSendInstructionsZ[] {
		const ret: number = bindings.OffersMessageHandler_release_pending_messages(this.ptr);
		const ret_conv_48_len: number = bindings.getArrayLength(ret);
		const ret_conv_48_arr: TwoTuple_OffersMessageMessageSendInstructionsZ[] = new Array(ret_conv_48_len).fill(null);
		for (var w = 0; w < ret_conv_48_len; w++) {
			const ret_conv_48: bigint = bindings.getU64ArrayElem(ret, w);
			const ret_conv_48_hu_conv: TwoTuple_OffersMessageMessageSendInstructionsZ = new TwoTuple_OffersMessageMessageSendInstructionsZ(null, ret_conv_48);
			CommonBase.add_ref_from(ret_conv_48_hu_conv, this);
			ret_conv_48_arr[w] = ret_conv_48_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_48_arr;
	}

}

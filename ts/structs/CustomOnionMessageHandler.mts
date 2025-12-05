

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of CustomOnionMessageHandler */
export interface CustomOnionMessageHandlerInterface {
	/**Called with the custom message that was received, returning a response to send, if any.
	 * 
	 * If the provided `context` is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`].
	 * 
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	handle_custom_message(message: OnionMessageContents, context: Option_CVec_u8ZZ, responder: Responder): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ;
	/**Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	read_custom_message(message_type: bigint, buffer: Uint8Array): Result_COption_OnionMessageContentsZDecodeErrorZ;
	/**Releases any [`Self::CustomMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a message flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_custom_message`].
	 */
	release_pending_custom_messages(): TwoTuple_OnionMessageContentsMessageSendInstructionsZ[];
}

class LDKCustomOnionMessageHandlerHolder {
	held: CustomOnionMessageHandler|null = null;
}

/**
 * Handler for custom onion messages. If you are using [`SimpleArcOnionMessenger`],
 * [`SimpleRefOnionMessenger`], or prefer to ignore inbound custom onion messages,
 * [`IgnoringMessageHandler`] must be provided to [`OnionMessenger::new`]. Otherwise, a custom
 * implementation of this trait must be provided, with [`CustomMessage`] specifying the supported
 * message types.
 * 
 * See [`OnionMessenger`] for example usage.
 * 
 * [`IgnoringMessageHandler`]: crate::ln::peer_handler::IgnoringMessageHandler
 * [`CustomMessage`]: Self::CustomMessage
 */
export class CustomOnionMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKCustomOnionMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CustomOnionMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of CustomOnionMessageHandler from a given implementation */
	public static new_impl(arg: CustomOnionMessageHandlerInterface): CustomOnionMessageHandler {
		const impl_holder: LDKCustomOnionMessageHandlerHolder = new LDKCustomOnionMessageHandlerHolder();
		let structImplementation = {
			handle_custom_message (message: bigint, context: bigint, responder: bigint): bigint {
				const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, message);
				CommonBase.add_ref_from(ret_hu_conv, this);
				const context_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(context);
				CommonBase.add_ref_from(context_hu_conv, this);
				const responder_hu_conv: Responder = new Responder(null, responder);
				CommonBase.add_ref_from(responder_hu_conv, this);
				const ret: Option_C2Tuple_OnionMessageContentsResponseInstructionZZ = arg.handle_custom_message(ret_hu_conv, context_hu_conv, responder_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			read_custom_message (message_type: bigint, buffer: number): bigint {
				const buffer_conv: Uint8Array = bindings.decodeUint8Array(buffer);
				const ret: Result_COption_OnionMessageContentsZDecodeErrorZ = arg.read_custom_message(message_type, buffer_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			release_pending_custom_messages (): number {
				const ret: TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] = arg.release_pending_custom_messages();
				const result: number = bindings.encodeUint64Array(ret.map(ret_conv_55 => ret_conv_55.clone_ptr()));
				return result;
			},
		} as bindings.LDKCustomOnionMessageHandler;
		const ptr_idx: [bigint, number] = bindings.LDKCustomOnionMessageHandler_new(structImplementation);

		impl_holder.held = new CustomOnionMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Called with the custom message that was received, returning a response to send, if any.
	 * 
	 * If the provided `context` is `Some`, then the message was sent to a blinded path that we
	 * created and was authenticated as such by the [`OnionMessenger`].
	 * 
	 * The returned [`Self::CustomMessage`], if any, is enqueued to be sent by [`OnionMessenger`].
	 * 
	 * Note that responder (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public handle_custom_message(message: OnionMessageContents, context: Option_CVec_u8ZZ, responder: Responder|null): Option_C2Tuple_OnionMessageContentsResponseInstructionZZ {
		const ret: bigint = bindings.CustomOnionMessageHandler_handle_custom_message(this.ptr, CommonBase.get_ptr_of(message), CommonBase.get_ptr_of(context), responder == null ? 0n : CommonBase.get_ptr_of(responder));
		const ret_hu_conv: Option_C2Tuple_OnionMessageContentsResponseInstructionZZ = Option_C2Tuple_OnionMessageContentsResponseInstructionZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		CommonBase.add_ref_from(this, message);
		return ret_hu_conv;
	}

	/**
	 * Read a custom message of type `message_type` from `buffer`, returning `Ok(None)` if the
	 * message type is unknown.
	 */
	public read_custom_message(message_type: bigint, buffer: Uint8Array): Result_COption_OnionMessageContentsZDecodeErrorZ {
		const ret: bigint = bindings.CustomOnionMessageHandler_read_custom_message(this.ptr, message_type, bindings.encodeUint8Array(buffer));
		const ret_hu_conv: Result_COption_OnionMessageContentsZDecodeErrorZ = Result_COption_OnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Releases any [`Self::CustomMessage`]s that need to be sent.
	 * 
	 * Typically, this is used for messages initiating a message flow rather than in response to
	 * another message. The latter should use the return value of [`Self::handle_custom_message`].
	 */
	public release_pending_custom_messages(): TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] {
		const ret: number = bindings.CustomOnionMessageHandler_release_pending_custom_messages(this.ptr);
		const ret_conv_55_len: number = bindings.getArrayLength(ret);
		const ret_conv_55_arr: TwoTuple_OnionMessageContentsMessageSendInstructionsZ[] = new Array(ret_conv_55_len).fill(null);
		for (var d = 0; d < ret_conv_55_len; d++) {
			const ret_conv_55: bigint = bindings.getU64ArrayElem(ret, d);
			const ret_conv_55_hu_conv: TwoTuple_OnionMessageContentsMessageSendInstructionsZ = new TwoTuple_OnionMessageContentsMessageSendInstructionsZ(null, ret_conv_55);
			CommonBase.add_ref_from(ret_conv_55_hu_conv, this);
			ret_conv_55_arr[d] = ret_conv_55_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_55_arr;
	}

}

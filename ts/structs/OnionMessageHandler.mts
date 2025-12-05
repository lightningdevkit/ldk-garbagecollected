

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of OnionMessageHandler */
export interface OnionMessageHandlerInterface {
	/**Handle an incoming `onion_message` message from the given peer.
	 */
	handle_onion_message(peer_node_id: Uint8Array, msg: OnionMessage): void;
	/**Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that onion messages can only be provided upstream via this method and *not* via
	 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	next_onion_message_for_peer(peer_node_id: Uint8Array): OnionMessage;
	/**Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peerst.
	 */
	timer_tick_occurred(): void;
}

class LDKOnionMessageHandlerHolder {
	held: OnionMessageHandler|null = null;
}

/**
 * A handler for received [`OnionMessage`]s and for providing generated ones to send.
 */
export class OnionMessageHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKOnionMessageHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OnionMessageHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of OnionMessageHandler from a given implementation */
	public static new_impl(arg: OnionMessageHandlerInterface, baseMessageHandler_impl: BaseMessageHandlerInterface): OnionMessageHandler {
		const impl_holder: LDKOnionMessageHandlerHolder = new LDKOnionMessageHandlerHolder();
		let structImplementation = {
			handle_onion_message (peer_node_id: number, msg: bigint): void {
				const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
				const msg_hu_conv: OnionMessage = new OnionMessage(null, msg);
				arg.handle_onion_message(peer_node_id_conv, msg_hu_conv);
			},
			next_onion_message_for_peer (peer_node_id: number): bigint {
				const peer_node_id_conv: Uint8Array = bindings.decodeUint8Array(peer_node_id);
				const ret: OnionMessage = arg.next_onion_message_for_peer(peer_node_id_conv);
				const result: bigint = ret == null ? 0n : ret.clone_ptr();
				return result;
			},
			timer_tick_occurred (): void {
				arg.timer_tick_occurred();
			},
		} as bindings.LDKOnionMessageHandler;
		const baseMessageHandler = BaseMessageHandler.new_impl(baseMessageHandler_impl);
		const ptr_idx: [bigint, number] = bindings.LDKOnionMessageHandler_new(structImplementation, baseMessageHandler.instance_idx!);

		impl_holder.held = new OnionMessageHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(baseMessageHandler);
		return impl_holder.held!;
	}

	/**
	 * Handle an incoming `onion_message` message from the given peer.
	 */
	public handle_onion_message(peer_node_id: Uint8Array, msg: OnionMessage): void {
		bindings.OnionMessageHandler_handle_onion_message(this.ptr, bindings.encodeUint8Array(peer_node_id), CommonBase.get_ptr_of(msg));
	}

	/**
	 * Returns the next pending onion message for the peer with the given node id.
	 * 
	 * Note that onion messages can only be provided upstream via this method and *not* via
	 * [`BaseMessageHandler::get_and_clear_pending_msg_events`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public next_onion_message_for_peer(peer_node_id: Uint8Array): OnionMessage {
		const ret: bigint = bindings.OnionMessageHandler_next_onion_message_for_peer(this.ptr, bindings.encodeUint8Array(peer_node_id));
		const ret_hu_conv: OnionMessage = new OnionMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Performs actions that should happen roughly every ten seconds after startup. Allows handlers
	 * to drop any buffered onion messages intended for prospective peerst.
	 */
	public timer_tick_occurred(): void {
		bindings.OnionMessageHandler_timer_tick_occurred(this.ptr);
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Provides references to trait impls which handle different types of messages.
 */
export class MessageHandler extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MessageHandler_free);
	}

	/**
	 * A message handler which handles messages specific to channels. Usually this is just a
	 * [`ChannelManager`] object or an [`ErroringMessageHandler`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public get_chan_handler(): ChannelMessageHandler {
		const ret: bigint = bindings.MessageHandler_get_chan_handler(this.ptr);
		const ret_hu_conv: ChannelMessageHandler = new ChannelMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles messages specific to channels. Usually this is just a
	 * [`ChannelManager`] object or an [`ErroringMessageHandler`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 */
	public set_chan_handler(val: ChannelMessageHandler): void {
		bindings.MessageHandler_set_chan_handler(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * A message handler which handles messages updating our knowledge of the network channel
	 * graph. Usually this is just a [`P2PGossipSync`] object or an [`IgnoringMessageHandler`].
	 * 
	 * [`P2PGossipSync`]: crate::routing::gossip::P2PGossipSync
	 */
	public get_route_handler(): RoutingMessageHandler {
		const ret: bigint = bindings.MessageHandler_get_route_handler(this.ptr);
		const ret_hu_conv: RoutingMessageHandler = new RoutingMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles messages updating our knowledge of the network channel
	 * graph. Usually this is just a [`P2PGossipSync`] object or an [`IgnoringMessageHandler`].
	 * 
	 * [`P2PGossipSync`]: crate::routing::gossip::P2PGossipSync
	 */
	public set_route_handler(val: RoutingMessageHandler): void {
		bindings.MessageHandler_set_route_handler(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * A message handler which handles onion messages. This should generally be an
	 * [`OnionMessenger`], but can also be an [`IgnoringMessageHandler`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	public get_onion_message_handler(): OnionMessageHandler {
		const ret: bigint = bindings.MessageHandler_get_onion_message_handler(this.ptr);
		const ret_hu_conv: OnionMessageHandler = new OnionMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles onion messages. This should generally be an
	 * [`OnionMessenger`], but can also be an [`IgnoringMessageHandler`].
	 * 
	 * [`OnionMessenger`]: crate::onion_message::messenger::OnionMessenger
	 */
	public set_onion_message_handler(val: OnionMessageHandler): void {
		bindings.MessageHandler_set_onion_message_handler(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * A message handler which handles custom messages. The only LDK-provided implementation is
	 * [`IgnoringMessageHandler`].
	 */
	public get_custom_message_handler(): CustomMessageHandler {
		const ret: bigint = bindings.MessageHandler_get_custom_message_handler(this.ptr);
		const ret_hu_conv: CustomMessageHandler = new CustomMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A message handler which handles custom messages. The only LDK-provided implementation is
	 * [`IgnoringMessageHandler`].
	 */
	public set_custom_message_handler(val: CustomMessageHandler): void {
		bindings.MessageHandler_set_custom_message_handler(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * A message handler which can be used to send messages.
	 * 
	 * This should generally be a [`ChainMonitor`].
	 * 
	 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
	 */
	public get_send_only_message_handler(): SendOnlyMessageHandler {
		const ret: bigint = bindings.MessageHandler_get_send_only_message_handler(this.ptr);
		const ret_hu_conv: SendOnlyMessageHandler = new SendOnlyMessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A message handler which can be used to send messages.
	 * 
	 * This should generally be a [`ChainMonitor`].
	 * 
	 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
	 */
	public set_send_only_message_handler(val: SendOnlyMessageHandler): void {
		bindings.MessageHandler_set_send_only_message_handler(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * Constructs a new MessageHandler given each field
	 */
	public static constructor_new(chan_handler_arg: ChannelMessageHandler, route_handler_arg: RoutingMessageHandler, onion_message_handler_arg: OnionMessageHandler, custom_message_handler_arg: CustomMessageHandler, send_only_message_handler_arg: SendOnlyMessageHandler): MessageHandler {
		const ret: bigint = bindings.MessageHandler_new(CommonBase.get_ptr_of(chan_handler_arg), CommonBase.get_ptr_of(route_handler_arg), CommonBase.get_ptr_of(onion_message_handler_arg), CommonBase.get_ptr_of(custom_message_handler_arg), CommonBase.get_ptr_of(send_only_message_handler_arg));
		const ret_hu_conv: MessageHandler = new MessageHandler(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, chan_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, route_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, onion_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, custom_message_handler_arg);
		CommonBase.add_ref_from(ret_hu_conv, send_only_message_handler_arg);
		return ret_hu_conv;
	}

}

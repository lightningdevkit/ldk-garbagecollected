package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Receives and validates network updates from peers,
 * stores authentic and relevant data as a network graph.
 * This network graph is then used for routing payments.
 * Provides interface to help with initial routing sync by
 * serving historical announcements.
 * 
 * Serves as an [`EventHandler`] for applying updates from [`Event::PaymentPathFailed`] to the
 * [`NetworkGraph`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetGraphMsgHandler extends CommonBase {
	NetGraphMsgHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetGraphMsgHandler_free(ptr); }
	}

	/**
	 * Constructs a new EventHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventHandler must be freed before this_arg is
	 */
	public EventHandler as_EventHandler() {
		long ret = bindings.NetGraphMsgHandler_as_EventHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventHandler ret_hu_conv = new EventHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new tracker of the actual state of the network of channels and nodes,
	 * assuming an existing Network Graph.
	 * Chain monitor is used to make sure announced channels exist on-chain,
	 * channel data is correct, and that the announcement is signed with
	 * channel owners' keys.
	 */
	public static NetGraphMsgHandler of(NetworkGraph network_graph, Option_AccessZ chain_access, Logger logger) {
		long ret = bindings.NetGraphMsgHandler_new(network_graph == null ? 0 : network_graph.ptr & ~1, chain_access.ptr, logger == null ? 0 : logger.ptr);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(chain_access);
		Reference.reachabilityFence(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		NetGraphMsgHandler ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new NetGraphMsgHandler(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(network_graph);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Adds a provider used to check new announcements. Does not affect
	 * existing announcements unless they are updated.
	 * Add, update or remove the provider would replace the current one.
	 */
	public void add_chain_access(Option_AccessZ chain_access) {
		bindings.NetGraphMsgHandler_add_chain_access(this.ptr, chain_access.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(chain_access);
		this.ptrs_to.add(chain_access);
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.NetGraphMsgHandler_as_MessageSendEventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

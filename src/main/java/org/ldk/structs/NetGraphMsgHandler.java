package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * Receives and validates network updates from peers,
 * stores authentic and relevant data as a network graph.
 * This network graph is then used for routing payments.
 * Provides interface to help with initial routing sync by
 * serving historical announcements.
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
	 * Creates a new tracker of the actual state of the network of channels and nodes,
	 * assuming a fresh network graph.
	 * Chain monitor is used to make sure announced channels exist on-chain,
	 * channel data is correct, and that the announcement is signed with
	 * channel owners' keys.
	 * 
	 * Note that chain_access (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static NetGraphMsgHandler of(byte[] genesis_hash, @Nullable Access chain_access, Logger logger) {
		long ret = bindings.NetGraphMsgHandler_new(genesis_hash, chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr);
		if (ret < 1024) { return null; }
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Creates a new tracker of the actual state of the network of channels and nodes,
	 * assuming an existing Network Graph.
	 * 
	 * Note that chain_access (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static NetGraphMsgHandler from_net_graph(@Nullable Access chain_access, Logger logger, NetworkGraph network_graph) {
		long ret = bindings.NetGraphMsgHandler_from_net_graph(chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr, network_graph == null ? 0 : network_graph.ptr & ~1);
		if (ret < 1024) { return null; }
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(network_graph);
		return ret_hu_conv;
	}

	/**
	 * Adds a provider used to check new announcements. Does not affect
	 * existing announcements unless they are updated.
	 * Add, update or remove the provider would replace the current one.
	 * 
	 * Note that chain_access (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void add_chain_access(@Nullable Access chain_access) {
		bindings.NetGraphMsgHandler_add_chain_access(this.ptr, chain_access == null ? 0 : chain_access.ptr);
		this.ptrs_to.add(chain_access);
	}

	/**
	 * Take a read lock on the network_graph and return it in the C-bindings
	 * newtype helper. This is likely only useful when called via the C
	 * bindings as you can call `self.network_graph.read().unwrap()` in Rust
	 * yourself.
	 */
	public LockedNetworkGraph read_locked_graph() {
		long ret = bindings.NetGraphMsgHandler_read_locked_graph(this.ptr);
		if (ret < 1024) { return null; }
		LockedNetworkGraph ret_hu_conv = new LockedNetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new RoutingMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned RoutingMessageHandler must be freed before this_arg is
	 */
	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr);
		if (ret < 1024) { return null; }
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
		if (ret < 1024) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

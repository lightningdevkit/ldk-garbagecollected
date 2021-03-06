package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class NetGraphMsgHandler extends CommonBase {
	NetGraphMsgHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetGraphMsgHandler_free(ptr); }
	}

	public static NetGraphMsgHandler constructor_new(byte[] genesis_hash, Access chain_access, Logger logger) {
		long ret = bindings.NetGraphMsgHandler_new(genesis_hash, chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr);
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public static NetGraphMsgHandler constructor_from_net_graph(Access chain_access, Logger logger, NetworkGraph network_graph) {
		long ret = bindings.NetGraphMsgHandler_from_net_graph(chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr, network_graph == null ? 0 : network_graph.ptr & ~1);
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(network_graph);
		return ret_hu_conv;
	}

	public void add_chain_access(Access chain_access) {
		bindings.NetGraphMsgHandler_add_chain_access(this.ptr, chain_access == null ? 0 : chain_access.ptr);
		this.ptrs_to.add(chain_access);
	}

	public LockedNetworkGraph read_locked_graph() {
		long ret = bindings.NetGraphMsgHandler_read_locked_graph(this.ptr);
		LockedNetworkGraph ret_hu_conv = new LockedNetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.NetGraphMsgHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

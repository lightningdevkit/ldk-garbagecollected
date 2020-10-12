package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class NetGraphMsgHandler extends CommonBase {
	NetGraphMsgHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.NetGraphMsgHandler_free(ptr); super.finalize();
	}

	public NetGraphMsgHandler(Access chain_access, Logger logger) {
		super(bindings.NetGraphMsgHandler_new(chain_access.ptr, logger.ptr));
		this.ptrs_to.add(chain_access);
		this.ptrs_to.add(logger);
	}

	public NetGraphMsgHandler(Access chain_access, Logger logger, NetworkGraph network_graph) {
		super(bindings.NetGraphMsgHandler_from_net_graph(chain_access.ptr, logger.ptr, network_graph.ptr & ~1));
		this.ptrs_to.add(chain_access);
		this.ptrs_to.add(logger);
		this.ptrs_to.add(network_graph);
	}

	public LockedNetworkGraph read_locked_graph() {
		LockedNetworkGraph ret = new LockedNetworkGraph(null, bindings.NetGraphMsgHandler_read_locked_graph(this.ptr));
		return ret;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		RoutingMessageHandler ret = new RoutingMessageHandler(null, bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

}

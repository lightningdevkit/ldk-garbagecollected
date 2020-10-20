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
		bindings.NetGraphMsgHandler_free(ptr);
	}

	public static NetGraphMsgHandler constructor_new(Access chain_access, Logger logger) {
		long ret = bindings.NetGraphMsgHandler_new(chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr);
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	// Skipped NetGraphMsgHandler_from_net_graph
	public LockedNetworkGraph read_locked_graph() {
		long ret = bindings.NetGraphMsgHandler_read_locked_graph(this.ptr);
		LockedNetworkGraph ret_hu_conv = new LockedNetworkGraph(null, ret);
		return ret_hu_conv;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		long ret = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

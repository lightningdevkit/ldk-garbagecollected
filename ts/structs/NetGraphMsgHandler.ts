
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class NetGraphMsgHandler extends CommonBase {
	NetGraphMsgHandler(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.NetGraphMsgHandler_free(ptr); }
	}

	public static NetGraphMsgHandler constructor_new(byte[] genesis_hash, Access chain_access, Logger logger) {
		uint32_t ret = bindings.NetGraphMsgHandler_new(genesis_hash, chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr);
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public static NetGraphMsgHandler constructor_from_net_graph(Access chain_access, Logger logger, byte[] network_graph_genesis_hash) {
		uint32_t ret = bindings.NetGraphMsgHandler_from_net_graph(chain_access == null ? 0 : chain_access.ptr, logger == null ? 0 : logger.ptr, bindings.NetworkGraph_new(network_graph_genesis_hash));
		NetGraphMsgHandler ret_hu_conv = new NetGraphMsgHandler(null, ret);
		ret_hu_conv.ptrs_to.add(chain_access);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public LockedNetworkGraph read_locked_graph() {
		uint32_t ret = bindings.NetGraphMsgHandler_read_locked_graph(this.ptr);
		LockedNetworkGraph ret_hu_conv = new LockedNetworkGraph(null, ret);
		return ret_hu_conv;
	}

	public RoutingMessageHandler as_RoutingMessageHandler() {
		uint32_t ret = bindings.NetGraphMsgHandler_as_RoutingMessageHandler(this.ptr);
		RoutingMessageHandler ret_hu_conv = new RoutingMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		uint32_t ret = bindings.NetGraphMsgHandler_as_MessageSendEventsProvider(this.ptr);
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

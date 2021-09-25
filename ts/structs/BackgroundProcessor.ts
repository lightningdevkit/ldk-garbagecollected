
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class BackgroundProcessor extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.BackgroundProcessor_free(this.ptr);
                    }
                }
	public static BackgroundProcessor constructor_start(ChannelManagerPersister persister, EventHandler event_handler, ChainMonitor chain_monitor, ChannelManager channel_manager, NetGraphMsgHandler net_graph_msg_handler, PeerManager peer_manager, Logger logger) {
		number ret = bindings.BackgroundProcessor_start(persister == null ? 0 : persister.ptr, event_handler == null ? 0 : event_handler.ptr, chain_monitor == null ? 0 : chain_monitor.ptr & ~1, channel_manager == null ? 0 : channel_manager.ptr & ~1, net_graph_msg_handler == null ? 0 : net_graph_msg_handler.ptr & ~1, peer_manager == null ? 0 : peer_manager.ptr & ~1, logger == null ? 0 : logger.ptr);
		const ret_hu_conv: BackgroundProcessor = new BackgroundProcessor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(persister);
		ret_hu_conv.ptrs_to.add(event_handler);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(channel_manager);
		ret_hu_conv.ptrs_to.add(net_graph_msg_handler);
		ret_hu_conv.ptrs_to.add(peer_manager);
		ret_hu_conv.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public Result_NoneErrorZ join() {
		number ret = bindings.BackgroundProcessor_join(this.ptr);
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneErrorZ stop() {
		number ret = bindings.BackgroundProcessor_stop(this.ptr);
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

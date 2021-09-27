
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class C2Tuple_BlockHashChannelManagerZ extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.C2Tuple_BlockHashChannelManagerZ_free(this.ptr);
                    }
                }
	public Uint8Array get_a() {
		Uint8Array ret = bindings.C2Tuple_BlockHashChannelManagerZ_get_a(this.ptr);
		return ret;
	}

	public ChannelManager get_b() {
		number ret = bindings.C2Tuple_BlockHashChannelManagerZ_get_b(this.ptr);
		const ret_hu_conv: ChannelManager = new ChannelManager(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static TwoTuple_BlockHashChannelManagerZ constructor_new(Uint8Array a, FeeEstimator b_fee_est, Watch b_chain_monitor, BroadcasterInterface b_tx_broadcaster, Logger b_logger, KeysInterface b_keys_manager, UserConfig b_config, ChainParameters b_params) {
		number ret = bindings.C2Tuple_BlockHashChannelManagerZ_new(a, bindings.ChannelManager_new(b_fee_est == null ? 0 : b_fee_est.ptr, b_chain_monitor == null ? 0 : b_chain_monitor.ptr, b_tx_broadcaster == null ? 0 : b_tx_broadcaster.ptr, b_logger == null ? 0 : b_logger.ptr, b_keys_manager == null ? 0 : b_keys_manager.ptr, b_config == null ? 0 : b_config.ptr & ~1, b_params == null ? 0 : b_params.ptr & ~1));
		TwoTuple_BlockHashChannelManagerZ ret_hu_conv = new TwoTuple_BlockHashChannelManagerZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b_fee_est);
		ret_hu_conv.ptrs_to.add(b_chain_monitor);
		ret_hu_conv.ptrs_to.add(b_tx_broadcaster);
		ret_hu_conv.ptrs_to.add(b_logger);
		ret_hu_conv.ptrs_to.add(b_keys_manager);
		ret_hu_conv.ptrs_to.add(b_config);
		ret_hu_conv.ptrs_to.add(b_params);
		return ret_hu_conv;
	}

}

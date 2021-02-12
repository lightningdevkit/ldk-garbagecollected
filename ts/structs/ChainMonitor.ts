
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChainMonitor extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChainMonitor_free(this.ptr);
                    }
                }
	public void block_connected(Uint8Array header, TwoTuple<Number, Uint8Array>[] txdata, number height) {
		bindings.ChainMonitor_block_connected(this.ptr, header, Arrays.stream(txdata).map(arr_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(arr_conv_30.a, arr_conv_30.b)).toArray(number[]::new), height);
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
	}

	public void block_disconnected(Uint8Array header, number disconnected_height) {
		bindings.ChainMonitor_block_disconnected(this.ptr, header, disconnected_height);
	}

	public static ChainMonitor constructor_new(Filter chain_source, BroadcasterInterface broadcaster, Logger logger, FeeEstimator feeest, Persist persister) {
		number ret = bindings.ChainMonitor_new(chain_source == null ? 0 : chain_source.ptr, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr, feeest == null ? 0 : feeest.ptr, persister == null ? 0 : persister.ptr);
		const ret_hu_conv: ChainMonitor = new ChainMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(chain_source);
		ret_hu_conv.ptrs_to.add(broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(feeest);
		ret_hu_conv.ptrs_to.add(persister);
		return ret_hu_conv;
	}

	public Watch as_Watch() {
		number ret = bindings.ChainMonitor_as_Watch(this.ptr);
		Watch ret_hu_conv = new Watch(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public EventsProvider as_EventsProvider() {
		number ret = bindings.ChainMonitor_as_EventsProvider(this.ptr);
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

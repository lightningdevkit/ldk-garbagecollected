
            
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location



            export default class ChannelMonitor extends CommonBase {
                constructor(_dummy: object, ptr: number) {
                    super(ptr);
                }

                
                protected finalize() {
                    super.finalize();

                    if (this.ptr != 0) {
                        bindings.ChannelMonitor_free(this.ptr);
                    }
                }
	public ChannelMonitor clone() {
		number ret = bindings.ChannelMonitor_clone(this.ptr);
		const ret_hu_conv: ChannelMonitor = new ChannelMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Uint8Array write() {
		Uint8Array ret = bindings.ChannelMonitor_write(this.ptr);
		return ret;
	}

	public Result_NoneMonitorUpdateErrorZ update_monitor(ChannelMonitorUpdate updates, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number ret = bindings.ChannelMonitor_update_monitor(this.ptr, updates == null ? 0 : updates.ptr & ~1, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(updates);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public number get_latest_update_id() {
		number ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	public TwoTuple_OutPointScriptZ get_funding_txo() {
		number ret = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		TwoTuple_OutPointScriptZ ret_hu_conv = new TwoTuple_OutPointScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ[] get_outputs_to_watch() {
		number[] ret = bindings.ChannelMonitor_get_outputs_to_watch(this.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ[] ret_conv_40_arr = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_40 = ret[o];
			TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ ret_conv_40_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32ScriptZZZ(null, ret_conv_40);
			ret_conv_40_hu_conv.ptrs_to.add(this);
			ret_conv_40_arr[o] = ret_conv_40_hu_conv;
		}
		return ret_conv_40_arr;
	}

	public void load_outputs_to_watch(Filter filter) {
		bindings.ChannelMonitor_load_outputs_to_watch(this.ptr, filter == null ? 0 : filter.ptr);
		this.ptrs_to.add(filter);
	}

	public MonitorEvent[] get_and_clear_pending_monitor_events() {
		number[] ret = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number ret_conv_14 = ret[o];
			MonitorEvent ret_conv_14_hu_conv = MonitorEvent.constr_from_ptr(ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	public Event[] get_and_clear_pending_events() {
		number[] ret = bindings.ChannelMonitor_get_and_clear_pending_events(this.ptr);
		Event[] ret_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			number ret_conv_7 = ret[h];
			Event ret_conv_7_hu_conv = Event.constr_from_ptr(ret_conv_7);
			ret_conv_7_hu_conv.ptrs_to.add(this);
			ret_conv_7_arr[h] = ret_conv_7_hu_conv;
		}
		return ret_conv_7_arr;
	}

	public Uint8Array[] get_latest_holder_commitment_txn(Logger logger) {
		Uint8Array[] ret = bindings.ChannelMonitor_get_latest_holder_commitment_txn(this.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(logger);
		return ret;
	}

	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] block_connected(Uint8Array header, TwoTuple_usizeTransactionZ[] txdata, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, txdata != null ? Arrays.stream(txdata).map(txdata_conv_28 -> txdata_conv_28 != null ? txdata_conv_28.ptr : 0).toArray(number[]::new) : null, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] ret_conv_39_arr = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[ret.length];
		for (int n = 0; n < ret.length; n++) {
			number ret_conv_39 = ret[n];
			TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_conv_39_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_39);
			ret_conv_39_hu_conv.ptrs_to.add(this);
			ret_conv_39_arr[n] = ret_conv_39_hu_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_39_arr;
	}

	public void block_disconnected(Uint8Array header, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] transactions_confirmed(Uint8Array header, TwoTuple_usizeTransactionZ[] txdata, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_transactions_confirmed(this.ptr, header, txdata != null ? Arrays.stream(txdata).map(txdata_conv_28 -> txdata_conv_28 != null ? txdata_conv_28.ptr : 0).toArray(number[]::new) : null, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] ret_conv_39_arr = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[ret.length];
		for (int n = 0; n < ret.length; n++) {
			number ret_conv_39 = ret[n];
			TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_conv_39_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_39);
			ret_conv_39_hu_conv.ptrs_to.add(this);
			ret_conv_39_arr[n] = ret_conv_39_hu_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_39_arr;
	}

	public void transaction_unconfirmed(Uint8Array txid, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_transaction_unconfirmed(this.ptr, txid, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	public TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] best_block_updated(Uint8Array header, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_best_block_updated(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[] ret_conv_39_arr = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ[ret.length];
		for (int n = 0; n < ret.length; n++) {
			number ret_conv_39 = ret[n];
			TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ ret_conv_39_hu_conv = new TwoTuple_TxidCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_39);
			ret_conv_39_hu_conv.ptrs_to.add(this);
			ret_conv_39_arr[n] = ret_conv_39_hu_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_39_arr;
	}

	public Uint8Array[] get_relevant_txids() {
		Uint8Array[] ret = bindings.ChannelMonitor_get_relevant_txids(this.ptr);
		return ret;
	}

	public BestBlock current_best_block() {
		number ret = bindings.ChannelMonitor_current_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Balance[] get_claimable_balances() {
		number[] ret = bindings.ChannelMonitor_get_claimable_balances(this.ptr);
		Balance[] ret_conv_9_arr = new Balance[ret.length];
		for (int j = 0; j < ret.length; j++) {
			number ret_conv_9 = ret[j];
			Balance ret_conv_9_hu_conv = Balance.constr_from_ptr(ret_conv_9);
			ret_conv_9_hu_conv.ptrs_to.add(this);
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		return ret_conv_9_arr;
	}

}

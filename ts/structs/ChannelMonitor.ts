
            
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

	public TwoTuple<OutPoint, Uint8Array> get_funding_txo() {
		number ret = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		number ret_a = bindings.LDKC2Tuple_OutPointScriptZ_get_a(ret);
		const ret_a_hu_conv: OutPoint = new OutPoint(null, ret_a);
		ret_a_hu_conv.ptrs_to.add(this);;
		Uint8Array ret_b = bindings.LDKC2Tuple_OutPointScriptZ_get_b(ret);
		TwoTuple<OutPoint, Uint8Array> ret_conv = new TwoTuple<OutPoint, Uint8Array>(ret_a_hu_conv, ret_b, () -> {
			bindings.C2Tuple_OutPointScriptZ_free(ret);
		});
		ret_a_hu_conv.ptrs_to.add(ret_conv);
		return ret_conv;
	}

	public TwoTuple<Uint8Array, TwoTuple<Number, Uint8Array>[]>[] get_outputs_to_watch() {
		number[] ret = bindings.ChannelMonitor_get_outputs_to_watch(this.ptr);
		TwoTuple<Uint8Array, TwoTuple<Number, Uint8Array>[]>[] ret_conv_54_arr = new TwoTuple[ret.length];
		for (int c = 0; c < ret.length; c++) {
			number ret_conv_54 = ret[c];
			Uint8Array ret_conv_54_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(ret_conv_54);
			number[] ret_conv_54_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(ret_conv_54);
			TwoTuple<Number, Uint8Array>[] ret_conv_54_b_conv_30_arr = new TwoTuple[ret_conv_54_b.length];
			for (int e = 0; e < ret_conv_54_b.length; e++) {
				number ret_conv_54_b_conv_30 = ret_conv_54_b[e];
				number ret_conv_54_b_conv_30_a = bindings.LDKC2Tuple_u32ScriptZ_get_a(ret_conv_54_b_conv_30);
				Uint8Array ret_conv_54_b_conv_30_b = bindings.LDKC2Tuple_u32ScriptZ_get_b(ret_conv_54_b_conv_30);
				TwoTuple<Number, Uint8Array> ret_conv_54_b_conv_30_conv = new TwoTuple<Number, Uint8Array>(ret_conv_54_b_conv_30_a, ret_conv_54_b_conv_30_b, () -> {
					bindings.C2Tuple_u32ScriptZ_free(ret_conv_54_b_conv_30);
				});
				ret_conv_54_b_conv_30_arr[e] = ret_conv_54_b_conv_30_conv;
			};
			TwoTuple<Uint8Array, TwoTuple<Number, Uint8Array>[]> ret_conv_54_conv = new TwoTuple<Uint8Array, TwoTuple<Number, Uint8Array>[]>(ret_conv_54_a, ret_conv_54_b_conv_30_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_54_arr[c] = ret_conv_54_conv;
		}
		return ret_conv_54_arr;
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

	public TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] block_connected(Uint8Array header, TwoTuple<Number, Uint8Array>[] txdata, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, Arrays.stream(txdata).map(txdata_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_30.a, txdata_conv_30.b)).toArray(number[]::new), height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] ret_conv_49_arr = new TwoTuple[ret.length];
		for (int x = 0; x < ret.length; x++) {
			number ret_conv_49 = ret[x];
			Uint8Array ret_conv_49_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_49);
			number[] ret_conv_49_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_49);
			TwoTuple<Number, TxOut>[] ret_conv_49_b_conv_25_arr = new TwoTuple[ret_conv_49_b.length];
			for (int z = 0; z < ret_conv_49_b.length; z++) {
				number ret_conv_49_b_conv_25 = ret_conv_49_b[z];
				number ret_conv_49_b_conv_25_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_49_b_conv_25);
				number ret_conv_49_b_conv_25_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_49_b_conv_25));
				TxOut ret_conv_49_b_conv_25_b_conv = new TxOut(null, ret_conv_49_b_conv_25_b);;
				TwoTuple<Number, TxOut> ret_conv_49_b_conv_25_conv = new TwoTuple<Number, TxOut>(ret_conv_49_b_conv_25_a, ret_conv_49_b_conv_25_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_49_b_conv_25);
				});
				ret_conv_49_b_conv_25_b_conv.ptrs_to.add(ret_conv_49_b_conv_25_conv);
				ret_conv_49_b_conv_25_arr[z] = ret_conv_49_b_conv_25_conv;
			};
			TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]> ret_conv_49_conv = new TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>(ret_conv_49_a, ret_conv_49_b_conv_25_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_49_arr[x] = ret_conv_49_conv;
		}
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_49_arr;
	}

	public void block_disconnected(Uint8Array header, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	public TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] transactions_confirmed(Uint8Array header, TwoTuple<Number, Uint8Array>[] txdata, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_transactions_confirmed(this.ptr, header, Arrays.stream(txdata).map(txdata_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_30.a, txdata_conv_30.b)).toArray(number[]::new), height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] ret_conv_49_arr = new TwoTuple[ret.length];
		for (int x = 0; x < ret.length; x++) {
			number ret_conv_49 = ret[x];
			Uint8Array ret_conv_49_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_49);
			number[] ret_conv_49_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_49);
			TwoTuple<Number, TxOut>[] ret_conv_49_b_conv_25_arr = new TwoTuple[ret_conv_49_b.length];
			for (int z = 0; z < ret_conv_49_b.length; z++) {
				number ret_conv_49_b_conv_25 = ret_conv_49_b[z];
				number ret_conv_49_b_conv_25_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_49_b_conv_25);
				number ret_conv_49_b_conv_25_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_49_b_conv_25));
				TxOut ret_conv_49_b_conv_25_b_conv = new TxOut(null, ret_conv_49_b_conv_25_b);;
				TwoTuple<Number, TxOut> ret_conv_49_b_conv_25_conv = new TwoTuple<Number, TxOut>(ret_conv_49_b_conv_25_a, ret_conv_49_b_conv_25_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_49_b_conv_25);
				});
				ret_conv_49_b_conv_25_b_conv.ptrs_to.add(ret_conv_49_b_conv_25_conv);
				ret_conv_49_b_conv_25_arr[z] = ret_conv_49_b_conv_25_conv;
			};
			TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]> ret_conv_49_conv = new TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>(ret_conv_49_a, ret_conv_49_b_conv_25_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_49_arr[x] = ret_conv_49_conv;
		}
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_49_arr;
	}

	public void transaction_unconfirmed(Uint8Array txid, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_transaction_unconfirmed(this.ptr, txid, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	public TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] best_block_updated(Uint8Array header, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_best_block_updated(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] ret_conv_49_arr = new TwoTuple[ret.length];
		for (int x = 0; x < ret.length; x++) {
			number ret_conv_49 = ret[x];
			Uint8Array ret_conv_49_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_49);
			number[] ret_conv_49_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_49);
			TwoTuple<Number, TxOut>[] ret_conv_49_b_conv_25_arr = new TwoTuple[ret_conv_49_b.length];
			for (int z = 0; z < ret_conv_49_b.length; z++) {
				number ret_conv_49_b_conv_25 = ret_conv_49_b[z];
				number ret_conv_49_b_conv_25_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_49_b_conv_25);
				number ret_conv_49_b_conv_25_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_49_b_conv_25));
				TxOut ret_conv_49_b_conv_25_b_conv = new TxOut(null, ret_conv_49_b_conv_25_b);;
				TwoTuple<Number, TxOut> ret_conv_49_b_conv_25_conv = new TwoTuple<Number, TxOut>(ret_conv_49_b_conv_25_a, ret_conv_49_b_conv_25_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_49_b_conv_25);
				});
				ret_conv_49_b_conv_25_b_conv.ptrs_to.add(ret_conv_49_b_conv_25_conv);
				ret_conv_49_b_conv_25_arr[z] = ret_conv_49_b_conv_25_conv;
			};
			TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]> ret_conv_49_conv = new TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>(ret_conv_49_a, ret_conv_49_b_conv_25_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_49_arr[x] = ret_conv_49_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_49_arr;
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

}

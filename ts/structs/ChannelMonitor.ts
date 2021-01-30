
            
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
		TwoTuple<OutPoint, Uint8Array> ret_conv = new TwoTuple<OutPoint, Uint8Array>(ret_a_hu_conv, ret_b);
		return ret_conv;
	}

	public MonitorEvent[] get_and_clear_pending_monitor_events() {
		number[] ret = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		MonitorEvent[] arr_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			number arr_conv_14 = ret[o];
			const arr_conv_14_hu_conv: MonitorEvent = new MonitorEvent(null, arr_conv_14);
			arr_conv_14_hu_conv.ptrs_to.add(this);
			arr_conv_14_arr[o] = arr_conv_14_hu_conv;
		}
		return arr_conv_14_arr;
	}

	public Event[] get_and_clear_pending_events() {
		number[] ret = bindings.ChannelMonitor_get_and_clear_pending_events(this.ptr);
		Event[] arr_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			number arr_conv_7 = ret[h];
			Event arr_conv_7_hu_conv = Event.constr_from_ptr(arr_conv_7);
			arr_conv_7_hu_conv.ptrs_to.add(this);
			arr_conv_7_arr[h] = arr_conv_7_hu_conv;
		}
		return arr_conv_7_arr;
	}

	public Uint8Array[] get_latest_holder_commitment_txn(Logger logger) {
		Uint8Array[] ret = bindings.ChannelMonitor_get_latest_holder_commitment_txn(this.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(logger);
		return ret;
	}

	public TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] block_connected(Uint8Array header, TwoTuple<Number, Uint8Array>[] txdata, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		number[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, (number[])Arrays.stream(txdata).map(arr_conv_30 -> bindings.C2Tuple_usizeTransactionZ_new(arr_conv_30.a, arr_conv_30.b)).toArray(), height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>[] arr_conv_49_arr = new TwoTuple[ret.length];
		for (int x = 0; x < ret.length; x++) {
			number arr_conv_49 = ret[x];
			Uint8Array arr_conv_49_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(arr_conv_49);
			number[] arr_conv_49_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(arr_conv_49);
			TwoTuple<Number, TxOut>[] arr_conv_25_arr = new TwoTuple[arr_conv_49_b.length];
			for (int z = 0; z < arr_conv_49_b.length; z++) {
				number arr_conv_25 = arr_conv_49_b[z];
				number arr_conv_25_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(arr_conv_25);
				number arr_conv_25_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(arr_conv_25));
				TxOut arr_conv_25_b_conv = new TxOut(null, arr_conv_25_b);;
				TwoTuple<Number, TxOut> arr_conv_25_conv = new TwoTuple<Number, TxOut>(arr_conv_25_a, arr_conv_25_b_conv);
				arr_conv_25_arr[z] = arr_conv_25_conv;
			};
			TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]> arr_conv_49_conv = new TwoTuple<Uint8Array, TwoTuple<Number, TxOut>[]>(arr_conv_49_a, arr_conv_25_arr);
			arr_conv_49_arr[x] = arr_conv_49_conv;
		}
		/* TODO 2 TwoTuple<Number, Uint8Array>  */;
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return arr_conv_49_arr;
	}

	public void block_disconnected(Uint8Array header, number height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

}

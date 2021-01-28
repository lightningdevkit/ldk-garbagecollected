package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelMonitor extends CommonBase {
	ChannelMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelMonitor_free(ptr); }
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelMonitor_write(this.ptr);
		return ret;
	}

	public Result_NoneMonitorUpdateErrorZ update_monitor(ChannelMonitorUpdate updates, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long ret = bindings.ChannelMonitor_update_monitor(this.ptr, updates == null ? 0 : updates.ptr & ~1, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(updates);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public long get_latest_update_id() {
		long ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	public TwoTuple<OutPoint, byte[]> get_funding_txo() {
		long ret = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		long ret_a = bindings.LDKC2Tuple_OutPointScriptZ_get_a(ret);
		OutPoint ret_a_hu_conv = new OutPoint(null, ret_a);;
		byte[] ret_b = bindings.LDKC2Tuple_OutPointScriptZ_get_b(ret);
		TwoTuple<OutPoint, byte[]> ret_conv = new TwoTuple<OutPoint, byte[]>(ret_a_hu_conv, ret_b);
		return ret_conv;
	}

	public MonitorEvent[] get_and_clear_pending_monitor_events() {
		long[] ret = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		MonitorEvent[] arr_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long arr_conv_14 = ret[o];
			MonitorEvent arr_conv_14_hu_conv = new MonitorEvent(null, arr_conv_14);
			arr_conv_14_arr[o] = arr_conv_14_hu_conv;
		}
		return arr_conv_14_arr;
	}

	public Event[] get_and_clear_pending_events() {
		long[] ret = bindings.ChannelMonitor_get_and_clear_pending_events(this.ptr);
		Event[] arr_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			long arr_conv_7 = ret[h];
			Event arr_conv_7_hu_conv = Event.constr_from_ptr(arr_conv_7);
			arr_conv_7_hu_conv.ptrs_to.add(this);
			arr_conv_7_arr[h] = arr_conv_7_hu_conv;
		}
		return arr_conv_7_arr;
	}

	public byte[][] get_latest_holder_commitment_txn(Logger logger) {
		byte[][] ret = bindings.ChannelMonitor_get_latest_holder_commitment_txn(this.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(logger);
		return ret;
	}

	public TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] block_connected(byte[] header, TwoTuple<Long, byte[]>[] txdata, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, Arrays.stream(txdata).mapToLong(arr_conv_24 -> bindings.C2Tuple_usizeTransactionZ_new(arr_conv_24.a, arr_conv_24.b)).toArray(), height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] arr_conv_46_arr = new TwoTuple[ret.length];
		for (int u = 0; u < ret.length; u++) {
			long arr_conv_46 = ret[u];
			byte[] arr_conv_46_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(arr_conv_46);
			long[] arr_conv_46_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(arr_conv_46);
			TwoTuple<Integer, TxOut>[] arr_conv_26_arr = new TwoTuple[arr_conv_46_b.length];
			for (int a = 0; a < arr_conv_46_b.length; a++) {
				long arr_conv_26 = arr_conv_46_b[a];
				int arr_conv_26_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(arr_conv_26);
				long arr_conv_26_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(arr_conv_26));
				TxOut arr_conv_26_b_conv = new TxOut(null, arr_conv_26_b);;
				TwoTuple<Integer, TxOut> arr_conv_26_conv = new TwoTuple<Integer, TxOut>(arr_conv_26_a, arr_conv_26_b_conv);
				arr_conv_26_arr[a] = arr_conv_26_conv;
			};
			TwoTuple<byte[], TwoTuple<Integer, TxOut>[]> arr_conv_46_conv = new TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>(arr_conv_46_a, arr_conv_26_arr);
			arr_conv_46_arr[u] = arr_conv_46_conv;
		}
		/* TODO 2 TwoTuple<Long, byte[]>  */;
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return arr_conv_46_arr;
	}

	public void block_disconnected(byte[] header, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

}

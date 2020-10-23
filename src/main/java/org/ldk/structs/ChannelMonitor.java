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

	public Result_NoneMonitorUpdateErrorZ update_monitor(ChannelMonitorUpdate updates, BroadcasterInterface broadcaster, Logger logger) {
		long ret = bindings.ChannelMonitor_update_monitor(this.ptr, updates == null ? 0 : updates.ptr & ~1, broadcaster == null ? 0 : broadcaster.ptr, logger == null ? 0 : logger.ptr);
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(updates);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	public long get_latest_update_id() {
		long ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	// Skipped ChannelMonitor_get_funding_txo
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

	public Transaction[] get_latest_holder_commitment_txn(Logger logger) {
		long[] ret = bindings.ChannelMonitor_get_latest_holder_commitment_txn(this.ptr, logger == null ? 0 : logger.ptr);
		Transaction[] arr_conv_13_arr = new Transaction[ret.length];
		for (int n = 0; n < ret.length; n++) {
			long arr_conv_13 = ret[n];
			Transaction arr_conv_13_conv = new Transaction(null, arr_conv_13);
			arr_conv_13_arr[n] = arr_conv_13_conv;
		}
		this.ptrs_to.add(logger);
		return arr_conv_13_arr;
	}

	public TwoTuple<byte[], TxOut[]>[] block_connected(byte[] header, TwoTuple<Long, Transaction>[] txdata, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, Arrays.stream(txdata).mapToLong(arr_conv_29 -> bindings.C2Tuple_usizeTransactionZ_new(arr_conv_29.a, arr_conv_29.b.ptr)).toArray(), height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<byte[], TxOut[]>[] arr_conv_27_arr = new TwoTuple[ret.length];
		for (int b = 0; b < ret.length; b++) {
			long arr_conv_27 = ret[b];
			byte[] arr_conv_27_a = bindings.LDKC2Tuple_TxidCVec_TxOutZZ_get_a(arr_conv_27);
			long[] arr_conv_27_b = bindings.LDKC2Tuple_TxidCVec_TxOutZZ_get_b(arr_conv_27);
			TxOut[] arr_conv_7_arr = new TxOut[arr_conv_27_b.length];
			for (int h = 0; h < arr_conv_27_b.length; h++) {
				long arr_conv_7 = arr_conv_27_b[h];
				TxOut arr_conv_7_conv = new TxOut(null, arr_conv_7);
				arr_conv_7_arr[h] = arr_conv_7_conv;
			};
			TwoTuple<byte[], TxOut[]> arr_conv_27_conv = new TwoTuple<byte[], TxOut[]>(arr_conv_27_a, arr_conv_7_arr);
			arr_conv_27_arr[b] = arr_conv_27_conv;
		}
		/* TODO 2 TwoTuple<Long, Transaction>  */;
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return arr_conv_27_arr;
	}

	public void block_disconnected(byte[] header, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

}

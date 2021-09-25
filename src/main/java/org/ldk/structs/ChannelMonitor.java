package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A ChannelMonitor handles chain events (blocks connected and disconnected) and generates
 * on-chain transactions to ensure no loss of funds occurs.
 * 
 * You MUST ensure that no ChannelMonitors for a given channel anywhere contain out-of-date
 * information and are actively monitoring the chain.
 * 
 * Pending Events or updated HTLCs which have not yet been read out by
 * get_and_clear_pending_monitor_events or get_and_clear_pending_events are serialized to disk and
 * reloaded at deserialize-time. Thus, you must ensure that, when handling events, all events
 * gotten are fully handled before re-serializing the new state.
 * 
 * Note that the deserializer is only implemented for (BlockHash, ChannelMonitor), which
 * tells you the last block hash which was block_connect()ed. You MUST rescan any blocks along
 * the \"reorg path\" (ie disconnecting blocks until you find a common ancestor from both the
 * returned block hash and the the current chain and then reconnecting blocks to get to the
 * best chain) upon deserializing the object!
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelMonitor extends CommonBase {
	ChannelMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelMonitor_free(ptr); }
	}

	/**
	 * Creates a copy of the ChannelMonitor
	 */
	public ChannelMonitor clone() {
		long ret = bindings.ChannelMonitor_clone(this.ptr);
		if (ret < 1024) { return null; }
		ChannelMonitor ret_hu_conv = new ChannelMonitor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelMonitor object into a byte array which can be read by ChannelMonitor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelMonitor_write(this.ptr);
		return ret;
	}

	/**
	 * Updates a ChannelMonitor on the basis of some new information provided by the Channel
	 * itself.
	 * 
	 * panics if the given update is not the next update by update_id.
	 */
	public Result_NoneMonitorUpdateErrorZ update_monitor(ChannelMonitorUpdate updates, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long ret = bindings.ChannelMonitor_update_monitor(this.ptr, updates == null ? 0 : updates.ptr & ~1, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		if (ret < 1024) { return null; }
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		this.ptrs_to.add(updates);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_hu_conv;
	}

	/**
	 * Gets the update_id from the latest ChannelMonitorUpdate which was applied to this
	 * ChannelMonitor.
	 */
	public long get_latest_update_id() {
		long ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	/**
	 * Gets the funding transaction outpoint of the channel this ChannelMonitor is monitoring for.
	 */
	public TwoTuple<OutPoint, byte[]> get_funding_txo() {
		long ret = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		if (ret < 1024) { return null; }
		long ret_a = bindings.LDKC2Tuple_OutPointScriptZ_get_a(ret);
		OutPoint ret_a_hu_conv = new OutPoint(null, ret_a);
		ret_a_hu_conv.ptrs_to.add(this);;
		byte[] ret_b = bindings.LDKC2Tuple_OutPointScriptZ_get_b(ret);
		TwoTuple<OutPoint, byte[]> ret_conv = new TwoTuple<OutPoint, byte[]>(ret_a_hu_conv, ret_b, () -> {
			bindings.C2Tuple_OutPointScriptZ_free(ret);
		});
		ret_a_hu_conv.ptrs_to.add(ret_conv);
		return ret_conv;
	}

	/**
	 * Gets a list of txids, with their output scripts (in the order they appear in the
	 * transaction), which we must learn about spends of via block_connected().
	 */
	public TwoTuple<byte[], TwoTuple<Integer, byte[]>[]>[] get_outputs_to_watch() {
		long[] ret = bindings.ChannelMonitor_get_outputs_to_watch(this.ptr);
		TwoTuple<byte[], TwoTuple<Integer, byte[]>[]>[] ret_conv_47_arr = new TwoTuple[ret.length];
		for (int v = 0; v < ret.length; v++) {
			long ret_conv_47 = ret[v];
			byte[] ret_conv_47_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_a(ret_conv_47);
			long[] ret_conv_47_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32ScriptZZZ_get_b(ret_conv_47);
			TwoTuple<Integer, byte[]>[] ret_conv_47_b_conv_27_arr = new TwoTuple[ret_conv_47_b.length];
			for (int b = 0; b < ret_conv_47_b.length; b++) {
				long ret_conv_47_b_conv_27 = ret_conv_47_b[b];
				int ret_conv_47_b_conv_27_a = bindings.LDKC2Tuple_u32ScriptZ_get_a(ret_conv_47_b_conv_27);
				byte[] ret_conv_47_b_conv_27_b = bindings.LDKC2Tuple_u32ScriptZ_get_b(ret_conv_47_b_conv_27);
				TwoTuple<Integer, byte[]> ret_conv_47_b_conv_27_conv = new TwoTuple<Integer, byte[]>(ret_conv_47_b_conv_27_a, ret_conv_47_b_conv_27_b, () -> {
					bindings.C2Tuple_u32ScriptZ_free(ret_conv_47_b_conv_27);
				});
				ret_conv_47_b_conv_27_arr[b] = ret_conv_47_b_conv_27_conv;
			};
			TwoTuple<byte[], TwoTuple<Integer, byte[]>[]> ret_conv_47_conv = new TwoTuple<byte[], TwoTuple<Integer, byte[]>[]>(ret_conv_47_a, ret_conv_47_b_conv_27_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_47_arr[v] = ret_conv_47_conv;
		}
		return ret_conv_47_arr;
	}

	/**
	 * Loads the funding txo and outputs to watch into the given `chain::Filter` by repeatedly
	 * calling `chain::Filter::register_output` and `chain::Filter::register_tx` until all outputs
	 * have been registered.
	 */
	public void load_outputs_to_watch(Filter filter) {
		bindings.ChannelMonitor_load_outputs_to_watch(this.ptr, filter == null ? 0 : filter.ptr);
		this.ptrs_to.add(filter);
	}

	/**
	 * Get the list of HTLCs who's status has been updated on chain. This should be called by
	 * ChannelManager via [`chain::Watch::release_pending_monitor_events`].
	 */
	public MonitorEvent[] get_and_clear_pending_monitor_events() {
		long[] ret = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long ret_conv_14 = ret[o];
			MonitorEvent ret_conv_14_hu_conv = MonitorEvent.constr_from_ptr(ret_conv_14);
			ret_conv_14_hu_conv.ptrs_to.add(this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		return ret_conv_14_arr;
	}

	/**
	 * Gets the list of pending events which were generated by previous actions, clearing the list
	 * in the process.
	 * 
	 * This is called by ChainMonitor::get_and_clear_pending_events() and is equivalent to
	 * EventsProvider::get_and_clear_pending_events() except that it requires &mut self as we do
	 * no internal locking in ChannelMonitors.
	 */
	public Event[] get_and_clear_pending_events() {
		long[] ret = bindings.ChannelMonitor_get_and_clear_pending_events(this.ptr);
		Event[] ret_conv_7_arr = new Event[ret.length];
		for (int h = 0; h < ret.length; h++) {
			long ret_conv_7 = ret[h];
			Event ret_conv_7_hu_conv = Event.constr_from_ptr(ret_conv_7);
			ret_conv_7_hu_conv.ptrs_to.add(this);
			ret_conv_7_arr[h] = ret_conv_7_hu_conv;
		}
		return ret_conv_7_arr;
	}

	/**
	 * Used by ChannelManager deserialization to broadcast the latest holder state if its copy of
	 * the Channel was out-of-date. You may use it to get a broadcastable holder toxic tx in case of
	 * fallen-behind, i.e when receiving a channel_reestablish with a proof that our counterparty side knows
	 * a higher revocation secret than the holder commitment number we are aware of. Broadcasting these
	 * transactions are UNSAFE, as they allow counterparty side to punish you. Nevertheless you may want to
	 * broadcast them if counterparty don't close channel with his higher commitment transaction after a
	 * substantial amount of time (a month or even a year) to get back funds. Best may be to contact
	 * out-of-band the other node operator to coordinate with him if option is available to you.
	 * In any-case, choice is up to the user.
	 */
	public byte[][] get_latest_holder_commitment_txn(Logger logger) {
		byte[][] ret = bindings.ChannelMonitor_get_latest_holder_commitment_txn(this.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(logger);
		return ret;
	}

	/**
	 * Processes transactions in a newly connected block, which may result in any of the following:
	 * - update the monitor's state against resolved HTLCs
	 * - punish the counterparty in the case of seeing a revoked commitment transaction
	 * - force close the channel and claim/timeout incoming/outgoing HTLCs if near expiration
	 * - detect settled outputs for later spending
	 * - schedule and bump any in-flight claims
	 * 
	 * Returns any new outputs to watch from `txdata`; after called, these are also included in
	 * [`get_outputs_to_watch`].
	 * 
	 * [`get_outputs_to_watch`]: #method.get_outputs_to_watch
	 */
	public TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] block_connected(byte[] header, TwoTuple<Long, byte[]>[] txdata, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long[] ret = bindings.ChannelMonitor_block_connected(this.ptr, header, txdata != null ? Arrays.stream(txdata).mapToLong(txdata_conv_24 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_24.a, txdata_conv_24.b)).toArray() : null, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] ret_conv_46_arr = new TwoTuple[ret.length];
		for (int u = 0; u < ret.length; u++) {
			long ret_conv_46 = ret[u];
			byte[] ret_conv_46_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_46);
			long[] ret_conv_46_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_46);
			TwoTuple<Integer, TxOut>[] ret_conv_46_b_conv_26_arr = new TwoTuple[ret_conv_46_b.length];
			for (int a = 0; a < ret_conv_46_b.length; a++) {
				long ret_conv_46_b_conv_26 = ret_conv_46_b[a];
				int ret_conv_46_b_conv_26_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_46_b_conv_26);
				long ret_conv_46_b_conv_26_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_46_b_conv_26));
				TxOut ret_conv_46_b_conv_26_b_conv = new TxOut(null, ret_conv_46_b_conv_26_b);;
				TwoTuple<Integer, TxOut> ret_conv_46_b_conv_26_conv = new TwoTuple<Integer, TxOut>(ret_conv_46_b_conv_26_a, ret_conv_46_b_conv_26_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_46_b_conv_26);
				});
				ret_conv_46_b_conv_26_b_conv.ptrs_to.add(ret_conv_46_b_conv_26_conv);
				ret_conv_46_b_conv_26_arr[a] = ret_conv_46_b_conv_26_conv;
			};
			TwoTuple<byte[], TwoTuple<Integer, TxOut>[]> ret_conv_46_conv = new TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>(ret_conv_46_a, ret_conv_46_b_conv_26_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_46_arr[u] = ret_conv_46_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_46_arr;
	}

	/**
	 * Determines if the disconnected block contained any transactions of interest and updates
	 * appropriately.
	 */
	public void block_disconnected(byte[] header, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	/**
	 * Processes transactions confirmed in a block with the given header and height, returning new
	 * outputs to watch. See [`block_connected`] for details.
	 * 
	 * Used instead of [`block_connected`] by clients that are notified of transactions rather than
	 * blocks. See [`chain::Confirm`] for calling expectations.
	 * 
	 * [`block_connected`]: Self::block_connected
	 */
	public TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] transactions_confirmed(byte[] header, TwoTuple<Long, byte[]>[] txdata, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long[] ret = bindings.ChannelMonitor_transactions_confirmed(this.ptr, header, txdata != null ? Arrays.stream(txdata).mapToLong(txdata_conv_24 -> bindings.C2Tuple_usizeTransactionZ_new(txdata_conv_24.a, txdata_conv_24.b)).toArray() : null, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] ret_conv_46_arr = new TwoTuple[ret.length];
		for (int u = 0; u < ret.length; u++) {
			long ret_conv_46 = ret[u];
			byte[] ret_conv_46_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_46);
			long[] ret_conv_46_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_46);
			TwoTuple<Integer, TxOut>[] ret_conv_46_b_conv_26_arr = new TwoTuple[ret_conv_46_b.length];
			for (int a = 0; a < ret_conv_46_b.length; a++) {
				long ret_conv_46_b_conv_26 = ret_conv_46_b[a];
				int ret_conv_46_b_conv_26_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_46_b_conv_26);
				long ret_conv_46_b_conv_26_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_46_b_conv_26));
				TxOut ret_conv_46_b_conv_26_b_conv = new TxOut(null, ret_conv_46_b_conv_26_b);;
				TwoTuple<Integer, TxOut> ret_conv_46_b_conv_26_conv = new TwoTuple<Integer, TxOut>(ret_conv_46_b_conv_26_a, ret_conv_46_b_conv_26_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_46_b_conv_26);
				});
				ret_conv_46_b_conv_26_b_conv.ptrs_to.add(ret_conv_46_b_conv_26_conv);
				ret_conv_46_b_conv_26_arr[a] = ret_conv_46_b_conv_26_conv;
			};
			TwoTuple<byte[], TwoTuple<Integer, TxOut>[]> ret_conv_46_conv = new TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>(ret_conv_46_a, ret_conv_46_b_conv_26_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_46_arr[u] = ret_conv_46_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_46_arr;
	}

	/**
	 * Processes a transaction that was reorganized out of the chain.
	 * 
	 * Used instead of [`block_disconnected`] by clients that are notified of transactions rather
	 * than blocks. See [`chain::Confirm`] for calling expectations.
	 * 
	 * [`block_disconnected`]: Self::block_disconnected
	 */
	public void transaction_unconfirmed(byte[] txid, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_transaction_unconfirmed(this.ptr, txid, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

	/**
	 * Updates the monitor with the current best chain tip, returning new outputs to watch. See
	 * [`block_connected`] for details.
	 * 
	 * Used instead of [`block_connected`] by clients that are notified of transactions rather than
	 * blocks. See [`chain::Confirm`] for calling expectations.
	 * 
	 * [`block_connected`]: Self::block_connected
	 */
	public TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] best_block_updated(byte[] header, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		long[] ret = bindings.ChannelMonitor_best_block_updated(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>[] ret_conv_46_arr = new TwoTuple[ret.length];
		for (int u = 0; u < ret.length; u++) {
			long ret_conv_46 = ret[u];
			byte[] ret_conv_46_a = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_a(ret_conv_46);
			long[] ret_conv_46_b = bindings.LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_get_b(ret_conv_46);
			TwoTuple<Integer, TxOut>[] ret_conv_46_b_conv_26_arr = new TwoTuple[ret_conv_46_b.length];
			for (int a = 0; a < ret_conv_46_b.length; a++) {
				long ret_conv_46_b_conv_26 = ret_conv_46_b[a];
				int ret_conv_46_b_conv_26_a = bindings.LDKC2Tuple_u32TxOutZ_get_a(ret_conv_46_b_conv_26);
				long ret_conv_46_b_conv_26_b = bindings.TxOut_clone(bindings.LDKC2Tuple_u32TxOutZ_get_b(ret_conv_46_b_conv_26));
				TxOut ret_conv_46_b_conv_26_b_conv = new TxOut(null, ret_conv_46_b_conv_26_b);;
				TwoTuple<Integer, TxOut> ret_conv_46_b_conv_26_conv = new TwoTuple<Integer, TxOut>(ret_conv_46_b_conv_26_a, ret_conv_46_b_conv_26_b_conv, () -> {
					bindings.C2Tuple_u32TxOutZ_free(ret_conv_46_b_conv_26);
				});
				ret_conv_46_b_conv_26_b_conv.ptrs_to.add(ret_conv_46_b_conv_26_conv);
				ret_conv_46_b_conv_26_arr[a] = ret_conv_46_b_conv_26_conv;
			};
			TwoTuple<byte[], TwoTuple<Integer, TxOut>[]> ret_conv_46_conv = new TwoTuple<byte[], TwoTuple<Integer, TxOut>[]>(ret_conv_46_a, ret_conv_46_b_conv_26_arr);
			// Warning: We may not free the C tuple object!
			ret_conv_46_arr[u] = ret_conv_46_conv;
		}
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
		return ret_conv_46_arr;
	}

	/**
	 * Returns the set of txids that should be monitored for re-organization out of the chain.
	 */
	public byte[][] get_relevant_txids() {
		byte[][] ret = bindings.ChannelMonitor_get_relevant_txids(this.ptr);
		return ret;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public BestBlock current_best_block() {
		long ret = bindings.ChannelMonitor_current_best_block(this.ptr);
		if (ret < 1024) { return null; }
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Gets the balances in this channel which are either claimable by us if we were to
	 * force-close the channel now or which are claimable on-chain (possibly awaiting
	 * confirmation).
	 * 
	 * Any balances in the channel which are available on-chain (excluding on-chain fees) are
	 * included here until an [`Event::SpendableOutputs`] event has been generated for the
	 * balance, or until our counterparty has claimed the balance and accrued several
	 * confirmations on the claim transaction.
	 * 
	 * Note that the balances available when you or your counterparty have broadcasted revoked
	 * state(s) may not be fully captured here.
	 * 
	 * See [`Balance`] for additional details on the types of claimable balances which
	 * may be returned here and their meanings.
	 */
	public Balance[] get_claimable_balances() {
		long[] ret = bindings.ChannelMonitor_get_claimable_balances(this.ptr);
		Balance[] ret_conv_9_arr = new Balance[ret.length];
		for (int j = 0; j < ret.length; j++) {
			long ret_conv_9 = ret[j];
			Balance ret_conv_9_hu_conv = Balance.constr_from_ptr(ret_conv_9);
			ret_conv_9_hu_conv.ptrs_to.add(this);
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		return ret_conv_9_arr;
	}

}

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A ChannelMonitor handles chain events (blocks connected and disconnected) and generates
 * on-chain transactions to ensure no loss of funds occurs.
 * 
 * You MUST ensure that no ChannelMonitors for a given channel anywhere contain out-of-date
 * information and are actively monitoring the chain.
 * 
 * Like the [`ChannelManager`], deserialization is implemented for `(BlockHash, ChannelMonitor)`,
 * providing you with the last block hash which was connected before shutting down. You must begin
 * syncing the chain from that point, disconnecting and connecting blocks as required to get to
 * the best chain on startup. Note that all [`ChannelMonitor`]s passed to a [`ChainMonitor`] must
 * by synced as of the same block, so syncing must happen prior to [`ChainMonitor`]
 * initialization.
 * 
 * For those loading potentially-ancient [`ChannelMonitor`]s, deserialization is also implemented
 * for `Option<(BlockHash, ChannelMonitor)>`. LDK can no longer deserialize a [`ChannelMonitor`]
 * that was first created in LDK prior to 0.0.110 and last updated prior to LDK 0.0.119. In such
 * cases, the `Option<(..)>` deserialization option may return `Ok(None)` rather than failing to
 * deserialize, allowing you to differentiate between the two cases.
 * 
 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 */
public class ChannelMonitor : CommonBase {
	internal ChannelMonitor(object _dummy, long ptr) : base(ptr) { }
	~ChannelMonitor() {
		if (ptr != 0) { bindings.ChannelMonitor_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelMonitor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelMonitor
	 */
	public org.ldk.structs.ChannelMonitor clone() {
		long ret = bindings.ChannelMonitor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelMonitor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelMonitor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelMonitor object into a byte array which can be read by ChannelMonitor_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelMonitor_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns a unique id for persisting the [`ChannelMonitor`], which is used as a key in a
	 * key-value store.
	 * 
	 * Note: Previously, the funding outpoint was used in the [`Persist`] trait. However, since the
	 * outpoint may change during splicing, this method is used to obtain a unique key instead. For
	 * v1 channels, the funding outpoint is still used for backwards compatibility, whereas v2
	 * channels use the channel id since it is fixed.
	 * 
	 * [`Persist`]: crate::chain::chainmonitor::Persist
	 */
	public org.ldk.structs.MonitorName persistence_key() {
		long ret = bindings.ChannelMonitor_persistence_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MonitorName ret_hu_conv = org.ldk.structs.MonitorName.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Updates a ChannelMonitor on the basis of some new information provided by the Channel
	 * itself.
	 * 
	 * panics if the given update is not the next update by update_id.
	 */
	public org.ldk.structs.Result_NoneNoneZ update_monitor(org.ldk.structs.ChannelMonitorUpdate updates, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_update_monitor(this.ptr, updates.ptr, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(updates);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_hu_conv;
	}

	/**
	 * Gets the update_id from the latest ChannelMonitorUpdate which was applied to this
	 * ChannelMonitor.
	 * 
	 * Note that for channels closed prior to LDK 0.1, this may return [`u64::MAX`].
	 */
	public long get_latest_update_id() {
		long ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Gets the funding transaction outpoint of the channel this ChannelMonitor is monitoring for.
	 */
	public org.ldk.structs.OutPoint get_funding_txo() {
		long ret = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the funding script of the channel this ChannelMonitor is monitoring for.
	 */
	public byte[] get_funding_script() {
		long ret = bindings.ChannelMonitor_get_funding_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the channel_id of the channel this ChannelMonitor is monitoring for.
	 */
	public org.ldk.structs.ChannelId channel_id() {
		long ret = bindings.ChannelMonitor_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the channel type of the corresponding channel.
	 */
	public org.ldk.structs.ChannelTypeFeatures channel_type_features() {
		long ret = bindings.ChannelMonitor_channel_type_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets a list of txids, with their output scripts (in the order they appear in the
	 * transaction), which we must learn about spends of via block_connected().
	 */
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ[] get_outputs_to_watch() {
		long ret = bindings.ChannelMonitor_get_outputs_to_watch(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_52_len = InternalUtils.getArrayLength(ret);
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ[] ret_conv_52_arr = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ[ret_conv_52_len];
		for (int a = 0; a < ret_conv_52_len; a++) {
			long ret_conv_52 = InternalUtils.getU64ArrayElem(ret, a);
			TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ ret_conv_52_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret_conv_52);
			if (ret_conv_52_hu_conv != null) { ret_conv_52_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_52_arr[a] = ret_conv_52_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_52_arr;
	}

	/**
	 * Loads the funding txo and outputs to watch into the given `chain::Filter` by repeatedly
	 * calling `chain::Filter::register_output` and `chain::Filter::register_tx` until all outputs
	 * have been registered.
	 */
	public void load_outputs_to_watch(org.ldk.structs.Filter filter, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_load_outputs_to_watch(this.ptr, filter.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(filter);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(filter); };
	}

	/**
	 * Get the list of HTLCs who's status has been updated on chain. This should be called by
	 * ChannelManager via [`chain::Watch::release_pending_monitor_events`].
	 */
	public MonitorEvent[] get_and_clear_pending_monitor_events() {
		long ret = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_14_len = InternalUtils.getArrayLength(ret);
		MonitorEvent[] ret_conv_14_arr = new MonitorEvent[ret_conv_14_len];
		for (int o = 0; o < ret_conv_14_len; o++) {
			long ret_conv_14 = InternalUtils.getU64ArrayElem(ret, o);
			org.ldk.structs.MonitorEvent ret_conv_14_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(ret_conv_14);
			if (ret_conv_14_hu_conv != null) { ret_conv_14_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_14_arr;
	}

	/**
	 * Processes [`SpendableOutputs`] events produced from each [`ChannelMonitor`] upon maturity.
	 * 
	 * For channels featuring anchor outputs, this method will also process [`BumpTransaction`]
	 * events produced from each [`ChannelMonitor`] while there is a balance to claim onchain
	 * within each channel. As the confirmation of a commitment transaction may be critical to the
	 * safety of funds, we recommend invoking this every 30 seconds, or lower if running in an
	 * environment with spotty connections, like on mobile.
	 * 
	 * An [`EventHandler`] may safely call back to the provider, though this shouldn't be needed in
	 * order to handle these events.
	 * 
	 * Will return a [`ReplayEvent`] error if event handling failed and should eventually be retried.
	 * 
	 * [`SpendableOutputs`]: crate::events::Event::SpendableOutputs
	 * [`BumpTransaction`]: crate::events::Event::BumpTransaction
	 */
	public org.ldk.structs.Result_NoneReplayEventZ process_pending_events(org.ldk.structs.EventHandler handler, org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_process_pending_events(this.ptr, handler.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(handler);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneReplayEventZ ret_hu_conv = Result_NoneReplayEventZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(handler); };
		return ret_hu_conv;
	}

	/**
	 * Gets the counterparty's initial commitment transaction. The returned commitment
	 * transaction is unsigned. This is intended to be called during the initial persistence of
	 * the monitor (inside an implementation of [`Persist::persist_new_channel`]), to allow for
	 * watchtowers in the persistence pipeline to have enough data to form justice transactions.
	 * 
	 * This is similar to [`Self::counterparty_commitment_txs_from_update`], except
	 * that for the initial commitment transaction, we don't have a corresponding update.
	 * 
	 * This will only return `Some` for channel monitors that have been created after upgrading
	 * to LDK 0.0.117+.
	 * 
	 * [`Persist::persist_new_channel`]: crate::chain::chainmonitor::Persist::persist_new_channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.CommitmentTransaction initial_counterparty_commitment_tx() {
		long ret = bindings.ChannelMonitor_initial_counterparty_commitment_tx(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets all of the counterparty commitment transactions provided by the given update. This
	 * may be empty if the update doesn't include any new counterparty commitments. Returned
	 * commitment transactions are unsigned.
	 * 
	 * This is provided so that watchtower clients in the persistence pipeline are able to build
	 * justice transactions for each counterparty commitment upon each update. It's intended to be
	 * used within an implementation of [`Persist::update_persisted_channel`], which is provided
	 * with a monitor and an update. Once revoked, signing a justice transaction can be done using
	 * [`Self::sign_to_local_justice_tx`].
	 * 
	 * It is expected that a watchtower client may use this method to retrieve the latest counterparty
	 * commitment transaction(s), and then hold the necessary data until a later update in which
	 * the monitor has been updated with the corresponding revocation data, at which point the
	 * monitor can sign the justice transaction.
	 * 
	 * This will only return a non-empty list for monitor updates that have been created after
	 * upgrading to LDK 0.0.117+. Note that no restriction lies on the monitors themselves, which
	 * may have been created prior to upgrading.
	 * 
	 * [`Persist::update_persisted_channel`]: crate::chain::chainmonitor::Persist::update_persisted_channel
	 */
	public CommitmentTransaction[] counterparty_commitment_txs_from_update(org.ldk.structs.ChannelMonitorUpdate update) {
		long ret = bindings.ChannelMonitor_counterparty_commitment_txs_from_update(this.ptr, update.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(update);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_23_len = InternalUtils.getArrayLength(ret);
		CommitmentTransaction[] ret_conv_23_arr = new CommitmentTransaction[ret_conv_23_len];
		for (int x = 0; x < ret_conv_23_len; x++) {
			long ret_conv_23 = InternalUtils.getU64ArrayElem(ret, x);
			org.ldk.structs.CommitmentTransaction ret_conv_23_hu_conv = null; if (ret_conv_23 < 0 || ret_conv_23 > 4096) { ret_conv_23_hu_conv = new org.ldk.structs.CommitmentTransaction(null, ret_conv_23); }
			if (ret_conv_23_hu_conv != null) { ret_conv_23_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_23_arr;
	}

	/**
	 * Wrapper around [`EcdsaChannelSigner::sign_justice_revoked_output`] to make
	 * signing the justice transaction easier for implementors of
	 * [`chain::chainmonitor::Persist`]. On success this method returns the provided transaction
	 * signing the input at `input_idx`. This method will only produce a valid signature for
	 * a transaction spending the `to_local` output of a commitment transaction, i.e. this cannot
	 * be used for revoked HTLC outputs.
	 * 
	 * `Value` is the value of the output being spent by the input at `input_idx`, committed
	 * in the BIP 143 signature.
	 * 
	 * This method will only succeed if this monitor has received the revocation secret for the
	 * provided `commitment_number`. If a commitment number is provided that does not correspond
	 * to the commitment transaction being revoked, this will return a signed transaction, but
	 * the signature will not be valid.
	 * 
	 * Note that due to splicing, this can also return an `Err` when the counterparty commitment
	 * this transaction is attempting to claim is no longer valid because the corresponding funding
	 * transaction was spliced.
	 * 
	 * [`EcdsaChannelSigner::sign_justice_revoked_output`]: crate::sign::ecdsa::EcdsaChannelSigner::sign_justice_revoked_output
	 * [`Persist`]: crate::chain::chainmonitor::Persist
	 */
	public org.ldk.structs.Result_TransactionNoneZ sign_to_local_justice_tx(byte[] justice_tx, long input_idx, long value, long commitment_number) {
		long ret = bindings.ChannelMonitor_sign_to_local_justice_tx(this.ptr, InternalUtils.encodeUint8Array(justice_tx), input_idx, value, commitment_number);
		GC.KeepAlive(this);
		GC.KeepAlive(justice_tx);
		GC.KeepAlive(input_idx);
		GC.KeepAlive(value);
		GC.KeepAlive(commitment_number);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the `node_id` of the counterparty for this channel.
	 */
	public byte[] get_counterparty_node_id() {
		long ret = bindings.ChannelMonitor_get_counterparty_node_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * You may use this to broadcast the latest local commitment transaction, either because
	 * a monitor update failed or because we've fallen behind (i.e. we've received proof that our
	 * counterparty side knows a revocation secret we gave them that they shouldn't know).
	 * 
	 * Broadcasting these transactions in this manner is UNSAFE, as they allow counterparty
	 * side to punish you. Nevertheless you may want to broadcast them if counterparty doesn't
	 * close channel with their commitment transaction after a substantial amount of time. Best
	 * may be to contact the other node operator out-of-band to coordinate other options available
	 * to you.
	 * 
	 * Note: For channels using manual funding broadcast (see
	 * [`crate::ln::channelmanager::ChannelManager::funding_transaction_generated_manual_broadcast`]),
	 * automatic broadcasts are suppressed until the funding transaction has been observed on-chain.
	 * Calling this method overrides that suppression and queues the latest holder commitment
	 * transaction for broadcast even if the funding has not yet been seen on-chain. This may result
	 * in unconfirmable transactions being broadcast or [`Event::BumpTransaction`] notifications for
	 * transactions that cannot be confirmed until the funding transaction is visible.
	 * 
	 * [`Event::BumpTransaction`]: crate::events::Event::BumpTransaction
	 */
	public void broadcast_latest_holder_commitment_txn(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_broadcast_latest_holder_commitment_txn(this.ptr, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
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
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] block_connected(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_block_connected(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(header, 80)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(txdata, txdata_conv_28 => txdata_conv_28.ptr)), height, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(txdata);
		GC.KeepAlive(height);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_49_len = InternalUtils.getArrayLength(ret);
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] ret_conv_49_arr = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = InternalUtils.getU64ArrayElem(ret, x);
			TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ ret_conv_49_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.free_buffer(ret);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_conv_49_arr;
	}

	/**
	 * Determines if the disconnected block contained any transactions of interest and updates
	 * appropriately.
	 */
	public void blocks_disconnected(org.ldk.structs.BestBlock fork_point, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_blocks_disconnected(this.ptr, fork_point.ptr, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(fork_point);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
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
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] transactions_confirmed(byte[] header, TwoTuple_usizeTransactionZ[] txdata, int height, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_transactions_confirmed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(header, 80)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(txdata, txdata_conv_28 => txdata_conv_28.ptr)), height, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(txdata);
		GC.KeepAlive(height);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_49_len = InternalUtils.getArrayLength(ret);
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] ret_conv_49_arr = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = InternalUtils.getU64ArrayElem(ret, x);
			TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ ret_conv_49_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.free_buffer(ret);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_conv_49_arr;
	}

	/**
	 * Processes a transaction that was reorganized out of the chain.
	 * 
	 * Used instead of [`blocks_disconnected`] by clients that are notified of transactions rather
	 * than blocks. See [`chain::Confirm`] for calling expectations.
	 * 
	 * [`blocks_disconnected`]: Self::blocks_disconnected
	 */
	public void transaction_unconfirmed(byte[] txid, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_transaction_unconfirmed(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(txid, 32)), broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(txid);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
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
	public TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] best_block_updated(byte[] header, int height, org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_best_block_updated(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(header, 80)), height, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(header);
		GC.KeepAlive(height);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_49_len = InternalUtils.getArrayLength(ret);
		TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] ret_conv_49_arr = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[ret_conv_49_len];
		for (int x = 0; x < ret_conv_49_len; x++) {
			long ret_conv_49 = InternalUtils.getU64ArrayElem(ret, x);
			TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ ret_conv_49_hu_conv = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			if (ret_conv_49_hu_conv != null) { ret_conv_49_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.free_buffer(ret);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
		return ret_conv_49_arr;
	}

	/**
	 * Returns the set of txids that should be monitored for re-organization out of the chain.
	 */
	public ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] get_relevant_txids() {
		long ret = bindings.ChannelMonitor_get_relevant_txids(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_54_len = InternalUtils.getArrayLength(ret);
		ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] ret_conv_54_arr = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[ret_conv_54_len];
		for (int c = 0; c < ret_conv_54_len; c++) {
			long ret_conv_54 = InternalUtils.getU64ArrayElem(ret, c);
			ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ ret_conv_54_hu_conv = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret_conv_54);
			if (ret_conv_54_hu_conv != null) { ret_conv_54_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_54_arr[c] = ret_conv_54_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_54_arr;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public org.ldk.structs.BestBlock current_best_block() {
		long ret = bindings.ChannelMonitor_current_best_block(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Triggers rebroadcasts/fee-bumps of pending claims from a force-closed channel. This is
	 * crucial in preventing certain classes of pinning attacks, detecting substantial mempool
	 * feerate changes between blocks, and ensuring reliability if broadcasting fails. We recommend
	 * invoking this every 30 seconds, or lower if running in an environment with spotty
	 * connections, like on mobile.
	 */
	public void rebroadcast_pending_claims(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_rebroadcast_pending_claims(this.ptr, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
	}

	/**
	 * Returns true if the monitor has pending claim requests that are not fully confirmed yet.
	 */
	public bool has_pending_claims() {
		bool ret = bindings.ChannelMonitor_has_pending_claims(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Triggers rebroadcasts of pending claims from a force-closed channel after a transaction
	 * signature generation failure.
	 */
	public void signer_unblocked(org.ldk.structs.BroadcasterInterface broadcaster, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Logger logger) {
		bindings.ChannelMonitor_signer_unblocked(this.ptr, broadcaster.ptr, fee_estimator.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(broadcaster);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(logger);
		if (this != null) { this.ptrs_to.AddLast(broadcaster); };
		if (this != null) { this.ptrs_to.AddLast(fee_estimator); };
	}

	/**
	 * Returns the descriptors for relevant outputs (i.e., those that we can spend) within the
	 * transaction if they exist and the transaction has at least [`ANTI_REORG_DELAY`]
	 * confirmations. For [`SpendableOutputDescriptor::DelayedPaymentOutput`] descriptors to be
	 * returned, the transaction must have at least `max(ANTI_REORG_DELAY, to_self_delay)`
	 * confirmations.
	 * 
	 * Descriptors returned by this method are primarily exposed via [`Event::SpendableOutputs`]
	 * once they are no longer under reorg risk. This method serves as a way to retrieve these
	 * descriptors at a later time, either for historical purposes, or to replay any
	 * missed/unhandled descriptors. For the purpose of gathering historical records, if the
	 * channel close has fully resolved (i.e., [`ChannelMonitor::get_claimable_balances`] returns
	 * an empty set), you can retrieve all spendable outputs by providing all descendant spending
	 * transactions starting from the channel's funding transaction and going down three levels.
	 * 
	 * `tx` is a transaction we'll scan the outputs of. Any transaction can be provided. If any
	 * outputs which can be spent by us are found, at least one descriptor is returned.
	 * 
	 * `confirmation_height` must be the height of the block in which `tx` was included in.
	 */
	public SpendableOutputDescriptor[] get_spendable_outputs(byte[] tx, int confirmation_height) {
		long ret = bindings.ChannelMonitor_get_spendable_outputs(this.ptr, InternalUtils.encodeUint8Array(tx), confirmation_height);
		GC.KeepAlive(this);
		GC.KeepAlive(tx);
		GC.KeepAlive(confirmation_height);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_27_len = InternalUtils.getArrayLength(ret);
		SpendableOutputDescriptor[] ret_conv_27_arr = new SpendableOutputDescriptor[ret_conv_27_len];
		for (int b = 0; b < ret_conv_27_len; b++) {
			long ret_conv_27 = InternalUtils.getU64ArrayElem(ret, b);
			org.ldk.structs.SpendableOutputDescriptor ret_conv_27_hu_conv = org.ldk.structs.SpendableOutputDescriptor.constr_from_ptr(ret_conv_27);
			if (ret_conv_27_hu_conv != null) { ret_conv_27_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_27_arr[b] = ret_conv_27_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_27_arr;
	}

	/**
	 * Checks if the monitor is fully resolved. Resolved monitor is one that has claimed all of
	 * its outputs and balances (i.e. [`Self::get_claimable_balances`] returns an empty set) and
	 * which does not have any payment preimages for HTLCs which are still pending on other
	 * channels.
	 * 
	 * Additionally may update state to track when the balances set became empty.
	 * 
	 * This function returns a tuple of two booleans, the first indicating whether the monitor is
	 * fully resolved, and the second whether the monitor needs persistence to ensure it is
	 * reliably marked as resolved within [`ARCHIVAL_DELAY_BLOCKS`] blocks.
	 * 
	 * The first boolean is true only if [`Self::get_claimable_balances`] has been empty for at
	 * least [`ARCHIVAL_DELAY_BLOCKS`] blocks as an additional protection against any bugs
	 * resulting in spuriously empty balance sets.
	 */
	public org.ldk.structs.TwoTuple_boolboolZ check_and_update_full_resolution_status(org.ldk.structs.Logger logger) {
		long ret = bindings.ChannelMonitor_check_and_update_full_resolution_status(this.ptr, logger.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_boolboolZ ret_hu_conv = new TwoTuple_boolboolZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	 * Note that for `ChannelMonitors` which track a channel which went on-chain with versions of
	 * LDK prior to 0.0.111, not all or excess balances may be included.
	 * 
	 * See [`Balance`] for additional details on the types of claimable balances which
	 * may be returned here and their meanings.
	 */
	public Balance[] get_claimable_balances() {
		long ret = bindings.ChannelMonitor_get_claimable_balances(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_9_len = InternalUtils.getArrayLength(ret);
		Balance[] ret_conv_9_arr = new Balance[ret_conv_9_len];
		for (int j = 0; j < ret_conv_9_len; j++) {
			long ret_conv_9 = InternalUtils.getU64ArrayElem(ret, j);
			org.ldk.structs.Balance ret_conv_9_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret_conv_9);
			if (ret_conv_9_hu_conv != null) { ret_conv_9_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_9_arr;
	}

}
} } }

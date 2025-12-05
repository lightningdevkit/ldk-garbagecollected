
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class ChannelMonitor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelMonitor_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelMonitor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelMonitor
	 */
	public clone(): ChannelMonitor {
		const ret: bigint = bindings.ChannelMonitor_clone(this.ptr);
		const ret_hu_conv: ChannelMonitor = new ChannelMonitor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelMonitor object into a byte array which can be read by ChannelMonitor_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelMonitor_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
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
	public persistence_key(): MonitorName {
		const ret: bigint = bindings.ChannelMonitor_persistence_key(this.ptr);
		const ret_hu_conv: MonitorName = MonitorName.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Updates a ChannelMonitor on the basis of some new information provided by the Channel
	 * itself.
	 * 
	 * panics if the given update is not the next update by update_id.
	 */
	public update_monitor(updates: ChannelMonitorUpdate, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): Result_NoneNoneZ {
		const ret: bigint = bindings.ChannelMonitor_update_monitor(this.ptr, CommonBase.get_ptr_of(updates), CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, fee_estimator);
		return ret_hu_conv;
	}

	/**
	 * Gets the update_id from the latest ChannelMonitorUpdate which was applied to this
	 * ChannelMonitor.
	 * 
	 * Note that for channels closed prior to LDK 0.1, this may return [`u64::MAX`].
	 */
	public get_latest_update_id(): bigint {
		const ret: bigint = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	/**
	 * Gets the funding transaction outpoint of the channel this ChannelMonitor is monitoring for.
	 */
	public get_funding_txo(): OutPoint {
		const ret: bigint = bindings.ChannelMonitor_get_funding_txo(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the funding script of the channel this ChannelMonitor is monitoring for.
	 */
	public get_funding_script(): Uint8Array {
		const ret: number = bindings.ChannelMonitor_get_funding_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Gets the channel_id of the channel this ChannelMonitor is monitoring for.
	 */
	public channel_id(): ChannelId {
		const ret: bigint = bindings.ChannelMonitor_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets the channel type of the corresponding channel.
	 */
	public channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.ChannelMonitor_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Gets a list of txids, with their output scripts (in the order they appear in the
	 * transaction), which we must learn about spends of via block_connected().
	 */
	public get_outputs_to_watch(): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ[] {
		const ret: number = bindings.ChannelMonitor_get_outputs_to_watch(this.ptr);
		const ret_conv_52_len: number = bindings.getArrayLength(ret);
		const ret_conv_52_arr: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ[] = new Array(ret_conv_52_len).fill(null);
		for (var a = 0; a < ret_conv_52_len; a++) {
			const ret_conv_52: bigint = bindings.getU64ArrayElem(ret, a);
			const ret_conv_52_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32CVec_u8ZZZZ(null, ret_conv_52);
			CommonBase.add_ref_from(ret_conv_52_hu_conv, this);
			ret_conv_52_arr[a] = ret_conv_52_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_52_arr;
	}

	/**
	 * Loads the funding txo and outputs to watch into the given `chain::Filter` by repeatedly
	 * calling `chain::Filter::register_output` and `chain::Filter::register_tx` until all outputs
	 * have been registered.
	 */
	public load_outputs_to_watch(filter: Filter, logger: Logger): void {
		bindings.ChannelMonitor_load_outputs_to_watch(this.ptr, CommonBase.get_ptr_of(filter), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, filter);
	}

	/**
	 * Get the list of HTLCs who's status has been updated on chain. This should be called by
	 * ChannelManager via [`chain::Watch::release_pending_monitor_events`].
	 */
	public get_and_clear_pending_monitor_events(): MonitorEvent[] {
		const ret: number = bindings.ChannelMonitor_get_and_clear_pending_monitor_events(this.ptr);
		const ret_conv_14_len: number = bindings.getArrayLength(ret);
		const ret_conv_14_arr: MonitorEvent[] = new Array(ret_conv_14_len).fill(null);
		for (var o = 0; o < ret_conv_14_len; o++) {
			const ret_conv_14: bigint = bindings.getU64ArrayElem(ret, o);
			const ret_conv_14_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret_conv_14);
			CommonBase.add_ref_from(ret_conv_14_hu_conv, this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.freeWasmMemory(ret)
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
	public process_pending_events(handler: EventHandler, logger: Logger): Result_NoneReplayEventZ {
		const ret: bigint = bindings.ChannelMonitor_process_pending_events(this.ptr, CommonBase.get_ptr_of(handler), CommonBase.get_ptr_of(logger));
		const ret_hu_conv: Result_NoneReplayEventZ = Result_NoneReplayEventZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, handler);
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
	public initial_counterparty_commitment_tx(): CommitmentTransaction {
		const ret: bigint = bindings.ChannelMonitor_initial_counterparty_commitment_tx(this.ptr);
		const ret_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public counterparty_commitment_txs_from_update(update: ChannelMonitorUpdate): CommitmentTransaction[] {
		const ret: number = bindings.ChannelMonitor_counterparty_commitment_txs_from_update(this.ptr, CommonBase.get_ptr_of(update));
		const ret_conv_23_len: number = bindings.getArrayLength(ret);
		const ret_conv_23_arr: CommitmentTransaction[] = new Array(ret_conv_23_len).fill(null);
		for (var x = 0; x < ret_conv_23_len; x++) {
			const ret_conv_23: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_23_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret_conv_23);
			CommonBase.add_ref_from(ret_conv_23_hu_conv, this);
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.freeWasmMemory(ret)
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
	public sign_to_local_justice_tx(justice_tx: Uint8Array, input_idx: number, value: bigint, commitment_number: bigint): Result_TransactionNoneZ {
		const ret: bigint = bindings.ChannelMonitor_sign_to_local_justice_tx(this.ptr, bindings.encodeUint8Array(justice_tx), input_idx, value, commitment_number);
		const ret_hu_conv: Result_TransactionNoneZ = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the `node_id` of the counterparty for this channel.
	 */
	public get_counterparty_node_id(): Uint8Array {
		const ret: number = bindings.ChannelMonitor_get_counterparty_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
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
	public broadcast_latest_holder_commitment_txn(broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): void {
		bindings.ChannelMonitor_broadcast_latest_holder_commitment_txn(this.ptr, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, fee_estimator);
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
	public block_connected(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] {
		const ret: number = bindings.ChannelMonitor_block_connected(this.ptr, bindings.encodeUint8Array(header), bindings.encodeUint64Array(txdata.map(txdata_conv_28 => CommonBase.get_ptr_of(txdata_conv_28))), height, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		const ret_conv_49_len: number = bindings.getArrayLength(ret);
		const ret_conv_49_arr: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] = new Array(ret_conv_49_len).fill(null);
		for (var x = 0; x < ret_conv_49_len; x++) {
			const ret_conv_49: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_49_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			CommonBase.add_ref_from(ret_conv_49_hu_conv, this);
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
		return ret_conv_49_arr;
	}

	/**
	 * Determines if the disconnected block contained any transactions of interest and updates
	 * appropriately.
	 */
	public blocks_disconnected(fork_point: BestBlock, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): void {
		bindings.ChannelMonitor_blocks_disconnected(this.ptr, CommonBase.get_ptr_of(fork_point), CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
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
	public transactions_confirmed(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] {
		const ret: number = bindings.ChannelMonitor_transactions_confirmed(this.ptr, bindings.encodeUint8Array(header), bindings.encodeUint64Array(txdata.map(txdata_conv_28 => CommonBase.get_ptr_of(txdata_conv_28))), height, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		const ret_conv_49_len: number = bindings.getArrayLength(ret);
		const ret_conv_49_arr: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] = new Array(ret_conv_49_len).fill(null);
		for (var x = 0; x < ret_conv_49_len; x++) {
			const ret_conv_49: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_49_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			CommonBase.add_ref_from(ret_conv_49_hu_conv, this);
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
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
	public transaction_unconfirmed(txid: Uint8Array, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): void {
		bindings.ChannelMonitor_transaction_unconfirmed(this.ptr, bindings.encodeUint8Array(txid), CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
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
	public best_block_updated(header: Uint8Array, height: number, broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] {
		const ret: number = bindings.ChannelMonitor_best_block_updated(this.ptr, bindings.encodeUint8Array(header), height, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		const ret_conv_49_len: number = bindings.getArrayLength(ret);
		const ret_conv_49_arr: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ[] = new Array(ret_conv_49_len).fill(null);
		for (var x = 0; x < ret_conv_49_len; x++) {
			const ret_conv_49: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_49_hu_conv: TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ = new TwoTuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ(null, ret_conv_49);
			CommonBase.add_ref_from(ret_conv_49_hu_conv, this);
			ret_conv_49_arr[x] = ret_conv_49_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
		return ret_conv_49_arr;
	}

	/**
	 * Returns the set of txids that should be monitored for re-organization out of the chain.
	 */
	public get_relevant_txids(): ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] {
		const ret: number = bindings.ChannelMonitor_get_relevant_txids(this.ptr);
		const ret_conv_54_len: number = bindings.getArrayLength(ret);
		const ret_conv_54_arr: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ[] = new Array(ret_conv_54_len).fill(null);
		for (var c = 0; c < ret_conv_54_len; c++) {
			const ret_conv_54: bigint = bindings.getU64ArrayElem(ret, c);
			const ret_conv_54_hu_conv: ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret_conv_54);
			CommonBase.add_ref_from(ret_conv_54_hu_conv, this);
			ret_conv_54_arr[c] = ret_conv_54_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_54_arr;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public current_best_block(): BestBlock {
		const ret: bigint = bindings.ChannelMonitor_current_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Triggers rebroadcasts/fee-bumps of pending claims from a force-closed channel. This is
	 * crucial in preventing certain classes of pinning attacks, detecting substantial mempool
	 * feerate changes between blocks, and ensuring reliability if broadcasting fails. We recommend
	 * invoking this every 30 seconds, or lower if running in an environment with spotty
	 * connections, like on mobile.
	 */
	public rebroadcast_pending_claims(broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): void {
		bindings.ChannelMonitor_rebroadcast_pending_claims(this.ptr, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
	}

	/**
	 * Returns true if the monitor has pending claim requests that are not fully confirmed yet.
	 */
	public has_pending_claims(): boolean {
		const ret: boolean = bindings.ChannelMonitor_has_pending_claims(this.ptr);
		return ret;
	}

	/**
	 * Triggers rebroadcasts of pending claims from a force-closed channel after a transaction
	 * signature generation failure.
	 */
	public signer_unblocked(broadcaster: BroadcasterInterface, fee_estimator: FeeEstimator, logger: Logger): void {
		bindings.ChannelMonitor_signer_unblocked(this.ptr, CommonBase.get_ptr_of(broadcaster), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(logger));
		CommonBase.add_ref_from(this, broadcaster);
		CommonBase.add_ref_from(this, fee_estimator);
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
	public get_spendable_outputs(tx: Uint8Array, confirmation_height: number): SpendableOutputDescriptor[] {
		const ret: number = bindings.ChannelMonitor_get_spendable_outputs(this.ptr, bindings.encodeUint8Array(tx), confirmation_height);
		const ret_conv_27_len: number = bindings.getArrayLength(ret);
		const ret_conv_27_arr: SpendableOutputDescriptor[] = new Array(ret_conv_27_len).fill(null);
		for (var b = 0; b < ret_conv_27_len; b++) {
			const ret_conv_27: bigint = bindings.getU64ArrayElem(ret, b);
			const ret_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(ret_conv_27);
			CommonBase.add_ref_from(ret_conv_27_hu_conv, this);
			ret_conv_27_arr[b] = ret_conv_27_hu_conv;
		}
		bindings.freeWasmMemory(ret)
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
	public check_and_update_full_resolution_status(logger: Logger): TwoTuple_boolboolZ {
		const ret: bigint = bindings.ChannelMonitor_check_and_update_full_resolution_status(this.ptr, CommonBase.get_ptr_of(logger));
		const ret_hu_conv: TwoTuple_boolboolZ = new TwoTuple_boolboolZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public get_claimable_balances(): Balance[] {
		const ret: number = bindings.ChannelMonitor_get_claimable_balances(this.ptr);
		const ret_conv_9_len: number = bindings.getArrayLength(ret);
		const ret_conv_9_arr: Balance[] = new Array(ret_conv_9_len).fill(null);
		for (var j = 0; j < ret_conv_9_len; j++) {
			const ret_conv_9: bigint = bindings.getU64ArrayElem(ret, j);
			const ret_conv_9_hu_conv: Balance = Balance.constr_from_ptr(ret_conv_9);
			CommonBase.add_ref_from(ret_conv_9_hu_conv, this);
			ret_conv_9_arr[j] = ret_conv_9_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_9_arr;
	}

}

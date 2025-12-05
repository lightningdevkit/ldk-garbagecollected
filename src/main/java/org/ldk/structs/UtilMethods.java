package org.ldk.structs;
import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class UtilMethods {
	/**
	 * Gets the 128-bit integer, as 16 little-endian bytes
	 */
	public static byte[] U128_le_bytes(org.ldk.util.UInt128 val) {
		byte[] ret = bindings.U128_le_bytes(val.getLEBytes());
		Reference.reachabilityFence(val);
		return ret;
	}

	/**
	 * Constructs a new U128 from 16 little-endian bytes
	 */
	public static UInt128 U128_new(byte[] le_bytes) {
		byte[] ret = bindings.U128_new(InternalUtils.check_arr_len(le_bytes, 16));
		Reference.reachabilityFence(le_bytes);
		org.ldk.util.UInt128 ret_conv = new org.ldk.util.UInt128(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new COption_NoneZ containing a
	 */
	public static COption_NoneZ COption_NoneZ_some() {
		COption_NoneZ ret = bindings.COption_NoneZ_some();
		return ret;
	}

	/**
	 * Constructs a new COption_NoneZ containing nothing
	 */
	public static COption_NoneZ COption_NoneZ_none() {
		COption_NoneZ ret = bindings.COption_NoneZ_none();
		return ret;
	}

	/**
	 * Returns the amount that needs to be maintained as a reserve per anchor channel.
	 * 
	 * This reserve currently needs to be allocated as a disjoint set of at least 1 UTXO per channel,
	 * as claims are not yet aggregated across channels.
	 * 
	 * To only require 1 UTXO per channel, it is assumed that, on average, transactions are able to
	 * get confirmed within 1 block with [ConfirmationTarget::UrgentOnChainSweep], or that only a
	 * portion of channels will go through unilateral closure at the same time, allowing UTXOs to be
	 * shared. Otherwise, multiple UTXOs would be needed per channel:
	 * - HTLC time-out transactions with different expiries cannot be aggregated. This could result in
	 * many individual transactions that need to be confirmed starting from different, but potentially
	 * sequential block heights.
	 * - If each transaction takes N blocks to confirm, at least N UTXOs per channel are needed to
	 * provide the necessary concurrency.
	 * 
	 * The returned amount includes the fee to spend a single UTXO of the type indicated by
	 * [AnchorChannelReserveContext::taproot_wallet]. Larger sets of UTXOs with more complex witnesses
	 * will need to include the corresponding fee required to spend them.
	 * 
	 * [ConfirmationTarget::UrgentOnChainSweep]: crate::chain::chaininterface::ConfirmationTarget::UrgentOnChainSweep
	 */
	public static long get_reserve_per_channel(org.ldk.structs.AnchorChannelReserveContext context) {
		long ret = bindings.get_reserve_per_channel(context.ptr);
		Reference.reachabilityFence(context);
		return ret;
	}

	/**
	 * Calculates the number of anchor channels that can be supported by the reserve provided
	 * by `utxos`.
	 */
	public static long get_supportable_anchor_channels(org.ldk.structs.AnchorChannelReserveContext context, Utxo[] utxos) {
		long ret = bindings.get_supportable_anchor_channels(context.ptr, utxos != null ? Arrays.stream(utxos).mapToLong(utxos_conv_6 -> utxos_conv_6.ptr).toArray() : null);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(utxos);
		return ret;
	}

	/**
	 * Verifies whether the anchor channel reserve provided by `utxos` is sufficient to support
	 * an additional anchor channel.
	 * 
	 * This should be verified:
	 * - Before opening a new outbound anchor channel with [ChannelManager::create_channel].
	 * - Before accepting a new inbound anchor channel while handling [Event::OpenChannelRequest].
	 * 
	 * [ChannelManager::create_channel]: crate::ln::channelmanager::ChannelManager::create_channel
	 * [Event::OpenChannelRequest]: crate::events::Event::OpenChannelRequest
	 */
	public static boolean can_support_additional_anchor_channel(org.ldk.structs.AnchorChannelReserveContext context, Utxo[] utxos, org.ldk.structs.ChannelManager a_channel_manager, org.ldk.structs.ChainMonitor chain_monitor) {
		boolean ret = bindings.can_support_additional_anchor_channel(context.ptr, utxos != null ? Arrays.stream(utxos).mapToLong(utxos_conv_6 -> utxos_conv_6.ptr).toArray() : null, a_channel_manager.ptr, chain_monitor.ptr);
		Reference.reachabilityFence(context);
		Reference.reachabilityFence(utxos);
		Reference.reachabilityFence(a_channel_manager);
		Reference.reachabilityFence(chain_monitor);
		return ret;
	}

	/**
	 * Read a APIError from a byte array, created by APIError_write
	 */
	public static Result_COption_APIErrorZDecodeErrorZ APIError_read(byte[] ser) {
		long ret = bindings.APIError_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_APIErrorZDecodeErrorZ ret_hu_conv = Result_COption_APIErrorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a digital signature of a message given a SecretKey, like the node's secret.
	 * A receiver knowing the PublicKey (e.g. the node's id) and the message can be sure that the signature was generated by the caller.
	 * Signatures are EC recoverable, meaning that given the message and the signature the PublicKey of the signer can be extracted.
	 */
	public static String sign(byte[] msg, byte[] sk) {
		String ret = bindings.sign(msg, InternalUtils.check_arr_len(sk, 32));
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(sk);
		return ret;
	}

	/**
	 * Recovers the PublicKey of the signer of the message given the message and the signature.
	 */
	public static Result_PublicKeySecp256k1ErrorZ recover_pk(byte[] msg, java.lang.String sig) {
		long ret = bindings.recover_pk(msg, sig);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(sig);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies a message was signed by a PrivateKey that derives to a given PublicKey, given a message, a signature,
	 * and the PublicKey.
	 */
	public static boolean verify(byte[] msg, java.lang.String sig, byte[] pk) {
		boolean ret = bindings.verify(msg, sig, InternalUtils.check_arr_len(pk, 33));
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(sig);
		Reference.reachabilityFence(pk);
		return ret;
	}

	/**
	 * Migrates all data from one store to another.
	 * 
	 * This operation assumes that `target_store` is empty, i.e., any data present under copied keys
	 * might get overriden. User must ensure `source_store` is not modified during operation,
	 * otherwise no consistency guarantees can be given.
	 * 
	 * Will abort and return an error if any IO operation fails. Note that in this case the
	 * `target_store` might get left in an intermediate state.
	 */
	public static Result_NoneIOErrorZ migrate_kv_store_data(org.ldk.structs.MigratableKVStore source_store, org.ldk.structs.MigratableKVStore target_store) {
		long ret = bindings.migrate_kv_store_data(source_store.ptr, target_store.ptr);
		Reference.reachabilityFence(source_store);
		Reference.reachabilityFence(target_store);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read previously persisted [`ChannelMonitor`]s from the store.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ read_channel_monitors(org.ldk.structs.KVStoreSync kv_store, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.SignerProvider signer_provider) {
		long ret = bindings.read_channel_monitors(kv_store.ptr, entropy_source.ptr, signer_provider.ptr);
		Reference.reachabilityFence(kv_store);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(signer_provider);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(kv_store); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(signer_provider); };
		return ret_hu_conv;
	}

	/**
	 * Extracts the block height (most significant 3-bytes) from the `short_channel_id`
	 */
	public static int block_from_scid(long short_channel_id) {
		int ret = bindings.block_from_scid(short_channel_id);
		Reference.reachabilityFence(short_channel_id);
		return ret;
	}

	/**
	 * Extracts the tx index (bytes [2..4]) from the `short_channel_id`
	 */
	public static int tx_index_from_scid(long short_channel_id) {
		int ret = bindings.tx_index_from_scid(short_channel_id);
		Reference.reachabilityFence(short_channel_id);
		return ret;
	}

	/**
	 * Extracts the vout (bytes [0..2]) from the `short_channel_id`
	 */
	public static short vout_from_scid(long short_channel_id) {
		short ret = bindings.vout_from_scid(short_channel_id);
		Reference.reachabilityFence(short_channel_id);
		return ret;
	}

	/**
	 * Constructs a `short_channel_id` using the components pieces. Results in an error
	 * if the block height, tx index, or vout index overflow the maximum sizes.
	 */
	public static Result_u64ShortChannelIdErrorZ scid_from_parts(long block, long tx_index, long vout_index) {
		long ret = bindings.scid_from_parts(block, tx_index, vout_index);
		Reference.reachabilityFence(block);
		Reference.reachabilityFence(tx_index);
		Reference.reachabilityFence(vout_index);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u64ShortChannelIdErrorZ ret_hu_conv = Result_u64ShortChannelIdErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_BestBlockOutputSweeperSyncZ from a byte array, created by C2Tuple_BestBlockOutputSweeperSyncZ_write
	 */
	public static Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ C2Tuple_BestBlockOutputSweeperSyncZ_read(byte[] ser, org.ldk.structs.BroadcasterInterface arg_a, org.ldk.structs.FeeEstimator arg_b, org.ldk.structs.Option_FilterZ arg_c, org.ldk.structs.OutputSpender arg_d, org.ldk.structs.ChangeDestinationSourceSync arg_e, org.ldk.structs.KVStoreSync arg_f, org.ldk.structs.Logger arg_g) {
		long ret = bindings.C2Tuple_BestBlockOutputSweeperSyncZ_read(ser, arg_a.ptr, arg_b.ptr, arg_c.ptr, arg_d.ptr, arg_e.ptr, arg_f.ptr, arg_g.ptr);
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg_a);
		Reference.reachabilityFence(arg_b);
		Reference.reachabilityFence(arg_c);
		Reference.reachabilityFence(arg_d);
		Reference.reachabilityFence(arg_e);
		Reference.reachabilityFence(arg_f);
		Reference.reachabilityFence(arg_g);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_c); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_d); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_e); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_f); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_g); };
		return ret_hu_conv;
	}

	/**
	 * Read a MonitorEvent from a byte array, created by MonitorEvent_write
	 */
	public static Result_COption_MonitorEventZDecodeErrorZ MonitorEvent_read(byte[] ser) {
		long ret = bindings.MonitorEvent_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_MonitorEventZDecodeErrorZ ret_hu_conv = Result_COption_MonitorEventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_ThirtyTwoBytesChannelMonitorZ from a byte array, created by C2Tuple_ThirtyTwoBytesChannelMonitorZ_write
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(byte[] ser, org.ldk.structs.EntropySource arg_a, org.ldk.structs.SignerProvider arg_b) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_read(ser, arg_a.ptr, arg_b.ptr);
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg_a);
		Reference.reachabilityFence(arg_b);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_b); };
		return ret_hu_conv;
	}

	/**
	 * Read a PathFailure from a byte array, created by PathFailure_write
	 */
	public static Result_COption_PathFailureZDecodeErrorZ PathFailure_read(byte[] ser) {
		long ret = bindings.PathFailure_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_PathFailureZDecodeErrorZ ret_hu_conv = Result_COption_PathFailureZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a ClosureReason from a byte array, created by ClosureReason_write
	 */
	public static Result_COption_ClosureReasonZDecodeErrorZ ClosureReason_read(byte[] ser) {
		long ret = bindings.ClosureReason_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_ClosureReasonZDecodeErrorZ ret_hu_conv = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a HTLCHandlingFailureType from a byte array, created by HTLCHandlingFailureType_write
	 */
	public static Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ HTLCHandlingFailureType_read(byte[] ser) {
		long ret = bindings.HTLCHandlingFailureType_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ ret_hu_conv = Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a PaymentFailureReason from a byte array, created by PaymentFailureReason_write
	 */
	public static Result_COption_PaymentFailureReasonZDecodeErrorZ PaymentFailureReason_read(byte[] ser) {
		long ret = bindings.PaymentFailureReason_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_PaymentFailureReasonZDecodeErrorZ ret_hu_conv = Result_COption_PaymentFailureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a Event from a byte array, created by Event_write
	 */
	public static Result_COption_EventZDecodeErrorZ Event_read(byte[] ser) {
		long ret = bindings.Event_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_EventZDecodeErrorZ ret_hu_conv = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Maximum number of in-flight HTLCs in each direction allowed by the lightning protocol.
	 * 
	 * 483 for non-zero-fee-commitment channels and 114 for zero-fee-commitment channels.
	 * 
	 * Actual maximums can be set equal to or below this value by each channel participant.
	 */
	public static short max_htlcs(org.ldk.structs.ChannelTypeFeatures channel_type) {
		short ret = bindings.max_htlcs(channel_type.ptr);
		Reference.reachabilityFence(channel_type);
		return ret;
	}

	/**
	 * Gets the weight for an HTLC-Success transaction.
	 */
	public static long htlc_success_tx_weight(org.ldk.structs.ChannelTypeFeatures channel_type_features) {
		long ret = bindings.htlc_success_tx_weight(channel_type_features.ptr);
		Reference.reachabilityFence(channel_type_features);
		return ret;
	}

	/**
	 * Gets the weight of a single input-output pair in externally funded HTLC-success transactions
	 */
	public static long aggregated_htlc_success_input_output_pair_weight(org.ldk.structs.ChannelTypeFeatures channel_type_features) {
		long ret = bindings.aggregated_htlc_success_input_output_pair_weight(channel_type_features.ptr);
		Reference.reachabilityFence(channel_type_features);
		return ret;
	}

	/**
	 * Gets the weight for an HTLC-Timeout transaction.
	 */
	public static long htlc_timeout_tx_weight(org.ldk.structs.ChannelTypeFeatures channel_type_features) {
		long ret = bindings.htlc_timeout_tx_weight(channel_type_features.ptr);
		Reference.reachabilityFence(channel_type_features);
		return ret;
	}

	/**
	 * Gets the weight of a single input-output pair in externally funded HTLC-timeout transactions
	 */
	public static long aggregated_htlc_timeout_input_output_pair_weight(org.ldk.structs.ChannelTypeFeatures channel_type_features) {
		long ret = bindings.aggregated_htlc_timeout_input_output_pair_weight(channel_type_features.ptr);
		Reference.reachabilityFence(channel_type_features);
		return ret;
	}

	/**
	 * Check if a given input witness attempts to claim a HTLC.
	 */
	public static Option_HTLCClaimZ HTLCClaim_from_witness(byte[] witness) {
		long ret = bindings.HTLCClaim_from_witness(witness);
		Reference.reachabilityFence(witness);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCClaimZ ret_hu_conv = org.ldk.structs.Option_HTLCClaimZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Build the commitment secret from the seed and the commitment number
	 */
	public static byte[] build_commitment_secret(byte[] commitment_seed, long idx) {
		byte[] ret = bindings.build_commitment_secret(InternalUtils.check_arr_len(commitment_seed, 32), idx);
		Reference.reachabilityFence(commitment_seed);
		Reference.reachabilityFence(idx);
		return ret;
	}

	/**
	 * Build a closing transaction
	 */
	public static byte[] build_closing_transaction(long to_holder_value_sat, long to_counterparty_value_sat, byte[] to_holder_script, byte[] to_counterparty_script, org.ldk.structs.OutPoint funding_outpoint) {
		byte[] ret = bindings.build_closing_transaction(to_holder_value_sat, to_counterparty_value_sat, to_holder_script, to_counterparty_script, funding_outpoint.ptr);
		Reference.reachabilityFence(to_holder_value_sat);
		Reference.reachabilityFence(to_counterparty_value_sat);
		Reference.reachabilityFence(to_holder_script);
		Reference.reachabilityFence(to_counterparty_script);
		Reference.reachabilityFence(funding_outpoint);
		return ret;
	}

	/**
	 * Derives a per-commitment-transaction private key (eg an htlc key or delayed_payment key)
	 * from the base secret and the per_commitment_point.
	 */
	public static byte[] derive_private_key(byte[] per_commitment_point, byte[] base_secret) {
		byte[] ret = bindings.derive_private_key(InternalUtils.check_arr_len(per_commitment_point, 33), InternalUtils.check_arr_len(base_secret, 32));
		Reference.reachabilityFence(per_commitment_point);
		Reference.reachabilityFence(base_secret);
		return ret;
	}

	/**
	 * Derives a per-commitment-transaction revocation key from its constituent parts.
	 * 
	 * Only the cheating participant owns a valid witness to propagate a revoked
	 * commitment transaction, thus per_commitment_secret always come from cheater
	 * and revocation_base_secret always come from punisher, which is the broadcaster
	 * of the transaction spending with this key knowledge.
	 */
	public static byte[] derive_private_revocation_key(byte[] per_commitment_secret, byte[] countersignatory_revocation_base_secret) {
		byte[] ret = bindings.derive_private_revocation_key(InternalUtils.check_arr_len(per_commitment_secret, 32), InternalUtils.check_arr_len(countersignatory_revocation_base_secret, 32));
		Reference.reachabilityFence(per_commitment_secret);
		Reference.reachabilityFence(countersignatory_revocation_base_secret);
		return ret;
	}

	/**
	 * A script either spendable by the revocation
	 * key or the broadcaster_delayed_payment_key and satisfying the relative-locktime OP_CSV constrain.
	 * Encumbering a `to_holder` output on a commitment transaction or 2nd-stage HTLC transactions.
	 */
	public static byte[] get_revokeable_redeemscript(org.ldk.structs.RevocationKey revocation_key, short contest_delay, org.ldk.structs.DelayedPaymentKey broadcaster_delayed_payment_key) {
		byte[] ret = bindings.get_revokeable_redeemscript(revocation_key.ptr, contest_delay, broadcaster_delayed_payment_key.ptr);
		Reference.reachabilityFence(revocation_key);
		Reference.reachabilityFence(contest_delay);
		Reference.reachabilityFence(broadcaster_delayed_payment_key);
		return ret;
	}

	/**
	 * Returns the script for the countersigner's (i.e. non-broadcaster's) output on a commitment
	 * transaction based on the channel type.
	 */
	public static byte[] get_countersigner_payment_script(org.ldk.structs.ChannelTypeFeatures channel_type_features, byte[] payment_key) {
		byte[] ret = bindings.get_countersigner_payment_script(channel_type_features.ptr, InternalUtils.check_arr_len(payment_key, 33));
		Reference.reachabilityFence(channel_type_features);
		Reference.reachabilityFence(payment_key);
		return ret;
	}

	/**
	 * Gets the witness redeemscript for an HTLC output in a commitment transaction. Note that htlc
	 * does not need to have its previous_output_index filled.
	 */
	public static byte[] get_htlc_redeemscript(org.ldk.structs.HTLCOutputInCommitment htlc, org.ldk.structs.ChannelTypeFeatures channel_type_features, org.ldk.structs.TxCreationKeys keys) {
		byte[] ret = bindings.get_htlc_redeemscript(htlc.ptr, channel_type_features.ptr, keys.ptr);
		Reference.reachabilityFence(htlc);
		Reference.reachabilityFence(channel_type_features);
		Reference.reachabilityFence(keys);
		return ret;
	}

	/**
	 * Gets the redeemscript for a funding output from the two funding public keys.
	 * Note that the order of funding public keys does not matter.
	 */
	public static byte[] make_funding_redeemscript(byte[] broadcaster, byte[] countersignatory) {
		byte[] ret = bindings.make_funding_redeemscript(InternalUtils.check_arr_len(broadcaster, 33), InternalUtils.check_arr_len(countersignatory, 33));
		Reference.reachabilityFence(broadcaster);
		Reference.reachabilityFence(countersignatory);
		return ret;
	}

	/**
	 * Builds an unsigned HTLC-Success or HTLC-Timeout transaction from the given channel and HTLC
	 * parameters. This is used by [`TrustedCommitmentTransaction::get_htlc_sigs`] to fetch the
	 * transaction which needs signing, and can be used to construct an HTLC transaction which is
	 * broadcastable given a counterparty HTLC signature.
	 * 
	 * Panics if htlc.transaction_output_index.is_none() (as such HTLCs do not appear in the
	 * commitment transaction).
	 */
	public static byte[] build_htlc_transaction(byte[] commitment_txid, int feerate_per_kw, short contest_delay, org.ldk.structs.HTLCOutputInCommitment htlc, org.ldk.structs.ChannelTypeFeatures channel_type_features, org.ldk.structs.DelayedPaymentKey broadcaster_delayed_payment_key, org.ldk.structs.RevocationKey revocation_key) {
		byte[] ret = bindings.build_htlc_transaction(InternalUtils.check_arr_len(commitment_txid, 32), feerate_per_kw, contest_delay, htlc.ptr, channel_type_features.ptr, broadcaster_delayed_payment_key.ptr, revocation_key.ptr);
		Reference.reachabilityFence(commitment_txid);
		Reference.reachabilityFence(feerate_per_kw);
		Reference.reachabilityFence(contest_delay);
		Reference.reachabilityFence(htlc);
		Reference.reachabilityFence(channel_type_features);
		Reference.reachabilityFence(broadcaster_delayed_payment_key);
		Reference.reachabilityFence(revocation_key);
		return ret;
	}

	/**
	 * Returns the witness required to satisfy and spend a HTLC input.
	 */
	public static byte[] build_htlc_input_witness(byte[] local_sig, byte[] remote_sig, org.ldk.structs.Option_ThirtyTwoBytesZ preimage, byte[] redeem_script, org.ldk.structs.ChannelTypeFeatures channel_type_features) {
		byte[] ret = bindings.build_htlc_input_witness(InternalUtils.check_arr_len(local_sig, 64), InternalUtils.check_arr_len(remote_sig, 64), preimage.ptr, redeem_script, channel_type_features.ptr);
		Reference.reachabilityFence(local_sig);
		Reference.reachabilityFence(remote_sig);
		Reference.reachabilityFence(preimage);
		Reference.reachabilityFence(redeem_script);
		Reference.reachabilityFence(channel_type_features);
		return ret;
	}

	/**
	 * Gets the witnessScript for the to_remote output when anchors are enabled.
	 */
	public static byte[] get_to_countersigner_keyed_anchor_redeemscript(byte[] payment_point) {
		byte[] ret = bindings.get_to_countersigner_keyed_anchor_redeemscript(InternalUtils.check_arr_len(payment_point, 33));
		Reference.reachabilityFence(payment_point);
		return ret;
	}

	/**
	 * Gets the script_pubkey for a shared anchor
	 */
	public static byte[] shared_anchor_script_pubkey() {
		byte[] ret = bindings.shared_anchor_script_pubkey();
		return ret;
	}

	/**
	 * Gets the witnessScript for a keyed anchor (non-zero-fee-commitments) output from the funding
	 * public key.
	 * 
	 * The witness in the spending input must be:
	 * <BIP 143 funding_signature>
	 * After 16 blocks of confirmation, an alternative satisfying witness could be:
	 * <>
	 * (empty vector required to satisfy compliance with MINIMALIF-standard rule)
	 */
	public static byte[] get_keyed_anchor_redeemscript(byte[] funding_pubkey) {
		byte[] ret = bindings.get_keyed_anchor_redeemscript(InternalUtils.check_arr_len(funding_pubkey, 33));
		Reference.reachabilityFence(funding_pubkey);
		return ret;
	}

	/**
	 * Returns the witness required to satisfy and spend a keyed anchor (non-zero-fee-commitments)
	 * input.
	 */
	public static byte[] build_keyed_anchor_input_witness(byte[] funding_key, byte[] funding_sig) {
		byte[] ret = bindings.build_keyed_anchor_input_witness(InternalUtils.check_arr_len(funding_key, 33), InternalUtils.check_arr_len(funding_sig, 64));
		Reference.reachabilityFence(funding_key);
		Reference.reachabilityFence(funding_sig);
		return ret;
	}

	/**
	 * Commitment transaction numbers which appear in the transactions themselves are XOR'd with a
	 * shared secret first. This prevents on-chain observers from discovering how many commitment
	 * transactions occurred in a channel before it was closed.
	 * 
	 * This function gets the shared secret from relevant channel public keys and can be used to
	 * \"decrypt\" the commitment transaction number given a commitment transaction on-chain.
	 */
	public static long get_commitment_transaction_number_obscure_factor(byte[] broadcaster_payment_basepoint, byte[] countersignatory_payment_basepoint, boolean outbound_from_broadcaster) {
		long ret = bindings.get_commitment_transaction_number_obscure_factor(InternalUtils.check_arr_len(broadcaster_payment_basepoint, 33), InternalUtils.check_arr_len(countersignatory_payment_basepoint, 33), outbound_from_broadcaster);
		Reference.reachabilityFence(broadcaster_payment_basepoint);
		Reference.reachabilityFence(countersignatory_payment_basepoint);
		Reference.reachabilityFence(outbound_from_broadcaster);
		return ret;
	}

	/**
	 * Adds a tweak to a public key to derive a new public key.
	 * 
	 * May panic if `tweak` is not the output of a SHA-256 hash.
	 */
	public static byte[] add_public_key_tweak(byte[] base_point, byte[] tweak) {
		byte[] ret = bindings.add_public_key_tweak(InternalUtils.check_arr_len(base_point, 33), InternalUtils.check_arr_len(tweak, 32));
		Reference.reachabilityFence(base_point);
		Reference.reachabilityFence(tweak);
		return ret;
	}

	/**
	 * Read a InboundHTLCStateDetails from a byte array, created by InboundHTLCStateDetails_write
	 */
	public static Result_COption_InboundHTLCStateDetailsZDecodeErrorZ InboundHTLCStateDetails_read(byte[] ser) {
		long ret = bindings.InboundHTLCStateDetails_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_InboundHTLCStateDetailsZDecodeErrorZ ret_hu_conv = Result_COption_InboundHTLCStateDetailsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Read a OutboundHTLCStateDetails from a byte array, created by OutboundHTLCStateDetails_write
	 */
	public static Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ OutboundHTLCStateDetails_read(byte[] ser) {
		long ret = bindings.OutboundHTLCStateDetails_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ ret_hu_conv = Result_COption_OutboundHTLCStateDetailsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public static InitFeatures provided_init_features(org.ldk.structs.UserConfig config) {
		long ret = bindings.provided_init_features(config.ptr);
		Reference.reachabilityFence(config);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Read a C2Tuple_ThirtyTwoBytesChannelManagerZ from a byte array, created by C2Tuple_ThirtyTwoBytesChannelManagerZ_write
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ C2Tuple_ThirtyTwoBytesChannelManagerZ_read(byte[] ser, EntropySource arg_entropy_source, NodeSigner arg_node_signer, SignerProvider arg_signer_provider, FeeEstimator arg_fee_estimator, Watch arg_chain_monitor, BroadcasterInterface arg_tx_broadcaster, Router arg_router, MessageRouter arg_message_router, Logger arg_logger, UserConfig arg_config, ChannelMonitor[] arg_channel_monitors) {
		long ret = bindings.C2Tuple_ThirtyTwoBytesChannelManagerZ_read(ser, bindings.ChannelManagerReadArgs_new(arg_entropy_source.ptr, arg_node_signer.ptr, arg_signer_provider.ptr, arg_fee_estimator.ptr, arg_chain_monitor.ptr, arg_tx_broadcaster.ptr, arg_router.ptr, arg_message_router.ptr, arg_logger.ptr, arg_config.ptr, arg_channel_monitors != null ? Arrays.stream(arg_channel_monitors).mapToLong(arg_channel_monitors_conv_16 -> arg_channel_monitors_conv_16.ptr).toArray() : null));
		Reference.reachabilityFence(ser);
		Reference.reachabilityFence(arg_entropy_source);
		Reference.reachabilityFence(arg_node_signer);
		Reference.reachabilityFence(arg_signer_provider);
		Reference.reachabilityFence(arg_fee_estimator);
		Reference.reachabilityFence(arg_chain_monitor);
		Reference.reachabilityFence(arg_tx_broadcaster);
		Reference.reachabilityFence(arg_router);
		Reference.reachabilityFence(arg_message_router);
		Reference.reachabilityFence(arg_logger);
		Reference.reachabilityFence(arg_config);
		Reference.reachabilityFence(arg_channel_monitors);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_logger); };
		;
		for (ChannelMonitor arg_channel_monitors_conv_16: arg_channel_monitors) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(arg_channel_monitors_conv_16); }; };
		return ret_hu_conv;
	}

	/**
	 * Equivalent to [`crate::ln::channelmanager::ChannelManager::create_inbound_payment`], but no
	 * `ChannelManager` is required. Useful for generating invoices for [phantom node payments] without
	 * a `ChannelManager`.
	 * 
	 * `keys` is generated by calling [`NodeSigner::get_expanded_key`]. It is recommended to
	 * cache this value and not regenerate it for each new inbound payment.
	 * 
	 * `current_time` is a Unix timestamp representing the current time.
	 * 
	 * Note that if `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 * [`NodeSigner::get_expanded_key`]: crate::sign::NodeSigner::get_expanded_key
	 */
	public static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ create(org.ldk.structs.ExpandedKey keys, org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs, org.ldk.structs.EntropySource entropy_source, long current_time, org.ldk.structs.Option_u16Z min_final_cltv_expiry_delta) {
		long ret = bindings.create(keys.ptr, min_value_msat.ptr, invoice_expiry_delta_secs, entropy_source.ptr, current_time, min_final_cltv_expiry_delta.ptr);
		Reference.reachabilityFence(keys);
		Reference.reachabilityFence(min_value_msat);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(current_time);
		Reference.reachabilityFence(min_final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		return ret_hu_conv;
	}

	/**
	 * Equivalent to [`crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash`],
	 * but no `ChannelManager` is required. Useful for generating invoices for [phantom node payments]
	 * without a `ChannelManager`.
	 * 
	 * See [`create`] for information on the `keys` and `current_time` parameters.
	 * 
	 * Note that if `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 */
	public static Result_ThirtyTwoBytesNoneZ create_from_hash(org.ldk.structs.ExpandedKey keys, org.ldk.structs.Option_u64Z min_value_msat, byte[] payment_hash, int invoice_expiry_delta_secs, long current_time, org.ldk.structs.Option_u16Z min_final_cltv_expiry_delta) {
		long ret = bindings.create_from_hash(keys.ptr, min_value_msat.ptr, InternalUtils.check_arr_len(payment_hash, 32), invoice_expiry_delta_secs, current_time, min_final_cltv_expiry_delta.ptr);
		Reference.reachabilityFence(keys);
		Reference.reachabilityFence(min_value_msat);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(current_time);
		Reference.reachabilityFence(min_final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Parses an OnionV3 host and port into a [`SocketAddress::OnionV3`].
	 * 
	 * The host part must end with \".onion\".
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ parse_onion_address(java.lang.String host, short port) {
		long ret = bindings.parse_onion_address(host, port);
		Reference.reachabilityFence(host);
		Reference.reachabilityFence(port);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Peel one layer off an incoming onion, returning a [`PendingHTLCInfo`] that contains information
	 * about the intended next-hop for the HTLC.
	 * 
	 * This does all the relevant context-free checks that LDK requires for payment relay or
	 * acceptance. If the payment is to be received, and the amount matches the expected amount for
	 * a given invoice, this indicates the [`msgs::UpdateAddHTLC`], once fully committed in the
	 * channel, will generate an [`Event::PaymentClaimable`].
	 * 
	 * [`Event::PaymentClaimable`]: crate::events::Event::PaymentClaimable
	 */
	public static Result_PendingHTLCInfoInboundHTLCErrZ peel_payment_onion(org.ldk.structs.UpdateAddHTLC msg, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, int cur_height, boolean allow_skimmed_fees) {
		long ret = bindings.peel_payment_onion(msg.ptr, node_signer.ptr, logger.ptr, cur_height, allow_skimmed_fees);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(cur_height);
		Reference.reachabilityFence(allow_skimmed_fees);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoInboundHTLCErrZ ret_hu_conv = Result_PendingHTLCInfoInboundHTLCErrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Utility to create an invoice that can be paid to one of multiple nodes, or a \"phantom invoice.\"
	 * See [`PhantomKeysManager`] for more information on phantom node payments.
	 * 
	 * `phantom_route_hints` parameter:
	 * Contains channel info for all nodes participating in the phantom invoice
	 * Entries are retrieved from a call to [`ChannelManager::get_phantom_route_hints`] on each
	 * participating node
	 * It is fine to cache `phantom_route_hints` and reuse it across invoices, as long as the data is
	 * updated when a channel becomes disabled or closes
	 * Note that if too many channels are included in [`PhantomRouteHints::channels`], the invoice
	 * may be too long for QR code scanning. To fix this, `PhantomRouteHints::channels` may be pared
	 * down
	 * 
	 * `payment_hash` can be specified if you have a specific need for a custom payment hash (see the difference
	 * between [`ChannelManager::create_inbound_payment`] and [`ChannelManager::create_inbound_payment_for_hash`]).
	 * If `None` is provided for `payment_hash`, then one will be created.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time.
	 * 
	 * `duration_since_epoch` is the current time since epoch in seconds.
	 * 
	 * You can specify a custom `min_final_cltv_expiry_delta`, or let LDK default it to
	 * [`MIN_FINAL_CLTV_EXPIRY_DELTA`]. The provided expiry must be at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`] - 3.
	 * Note that LDK will add a buffer of 3 blocks to the delta to allow for up to a few new block
	 * confirmations during routing.
	 * 
	 * Note that the provided `keys_manager`'s `NodeSigner` implementation must support phantom
	 * invoices in its `sign_invoice` implementation ([`PhantomKeysManager`] satisfies this
	 * requirement).
	 * 
	 * [`PhantomKeysManager`]: crate::sign::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: crate::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: crate::ln::channelmanager::PhantomRouteHints::channels
	 * [`MIN_FINAL_CLTV_EXPIRY_DETLA`]: crate::ln::channelmanager::MIN_FINAL_CLTV_EXPIRY_DELTA
	 * 
	 * This can be used in a `no_std` environment, where [`std::time::SystemTime`] is not available and the current time is supplied by the caller.
	 */
	public static Result_Bolt11InvoiceSignOrCreationErrorZ create_phantom_invoice(org.ldk.structs.Option_u64Z amt_msat, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash, java.lang.String description, int invoice_expiry_delta_secs, PhantomRouteHints[] phantom_route_hints, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.enums.Currency network, org.ldk.structs.Option_u16Z min_final_cltv_expiry_delta, long duration_since_epoch) {
		long ret = bindings.create_phantom_invoice(amt_msat.ptr, payment_hash.ptr, description, invoice_expiry_delta_secs, phantom_route_hints != null ? Arrays.stream(phantom_route_hints).mapToLong(phantom_route_hints_conv_19 -> phantom_route_hints_conv_19.ptr).toArray() : null, entropy_source.ptr, node_signer.ptr, logger.ptr, network, min_final_cltv_expiry_delta.ptr, duration_since_epoch);
		Reference.reachabilityFence(amt_msat);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(description);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(phantom_route_hints);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(network);
		Reference.reachabilityFence(min_final_cltv_expiry_delta);
		Reference.reachabilityFence(duration_since_epoch);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceSignOrCreationErrorZ ret_hu_conv = Result_Bolt11InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Utility to create an invoice that can be paid to one of multiple nodes, or a \"phantom invoice.\"
	 * See [`PhantomKeysManager`] for more information on phantom node payments.
	 * 
	 * `phantom_route_hints` parameter:
	 * Contains channel info for all nodes participating in the phantom invoice
	 * Entries are retrieved from a call to [`ChannelManager::get_phantom_route_hints`] on each
	 * participating node
	 * It is fine to cache `phantom_route_hints` and reuse it across invoices, as long as the data is
	 * updated when a channel becomes disabled or closes
	 * Note that the route hints generated from `phantom_route_hints` will be limited to a maximum
	 * of 3 hints to ensure that the invoice can be scanned in a QR code. These hints are selected
	 * in the order that the nodes in `PhantomRouteHints` are specified, selecting one hint per node
	 * until the maximum is hit. Callers may provide as many `PhantomRouteHints::channels` as
	 * desired, but note that some nodes will be trimmed if more than 3 nodes are provided.
	 * 
	 * `description_hash` is a SHA-256 hash of the description text
	 * 
	 * `payment_hash` can be specified if you have a specific need for a custom payment hash (see the difference
	 * between [`ChannelManager::create_inbound_payment`] and [`ChannelManager::create_inbound_payment_for_hash`]).
	 * If `None` is provided for `payment_hash`, then one will be created.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time.
	 * 
	 * `duration_since_epoch` is the current time since epoch in seconds.
	 * 
	 * Note that the provided `keys_manager`'s `NodeSigner` implementation must support phantom
	 * invoices in its `sign_invoice` implementation ([`PhantomKeysManager`] satisfies this
	 * requirement).
	 * 
	 * [`PhantomKeysManager`]: crate::sign::PhantomKeysManager
	 * [`ChannelManager::get_phantom_route_hints`]: crate::ln::channelmanager::ChannelManager::get_phantom_route_hints
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 * [`PhantomRouteHints::channels`]: crate::ln::channelmanager::PhantomRouteHints::channels
	 * 
	 * This version can be used in a `no_std` environment, where [`std::time::SystemTime`] is not available and the current time is supplied by the caller.
	 */
	public static Result_Bolt11InvoiceSignOrCreationErrorZ create_phantom_invoice_with_description_hash(org.ldk.structs.Option_u64Z amt_msat, org.ldk.structs.Option_ThirtyTwoBytesZ payment_hash, int invoice_expiry_delta_secs, org.ldk.structs.Sha256 description_hash, PhantomRouteHints[] phantom_route_hints, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.enums.Currency network, org.ldk.structs.Option_u16Z min_final_cltv_expiry_delta, long duration_since_epoch) {
		long ret = bindings.create_phantom_invoice_with_description_hash(amt_msat.ptr, payment_hash.ptr, invoice_expiry_delta_secs, description_hash.ptr, phantom_route_hints != null ? Arrays.stream(phantom_route_hints).mapToLong(phantom_route_hints_conv_19 -> phantom_route_hints_conv_19.ptr).toArray() : null, entropy_source.ptr, node_signer.ptr, logger.ptr, network, min_final_cltv_expiry_delta.ptr, duration_since_epoch);
		Reference.reachabilityFence(amt_msat);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(description_hash);
		Reference.reachabilityFence(phantom_route_hints);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(network);
		Reference.reachabilityFence(min_final_cltv_expiry_delta);
		Reference.reachabilityFence(duration_since_epoch);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceSignOrCreationErrorZ ret_hu_conv = Result_Bolt11InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Build a payment onion, returning the first hop msat and cltv values as well.
	 * 
	 * `cur_block_height` should be set to the best known block height + 1.
	 * 
	 * Note that invoice_request (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ create_payment_onion(org.ldk.structs.Path path, byte[] session_priv, long total_msat, org.ldk.structs.RecipientOnionFields recipient_onion, int cur_block_height, byte[] payment_hash, org.ldk.structs.Option_ThirtyTwoBytesZ keysend_preimage, @Nullable org.ldk.structs.InvoiceRequest invoice_request, byte[] prng_seed) {
		long ret = bindings.create_payment_onion(path.ptr, InternalUtils.check_arr_len(session_priv, 32), total_msat, recipient_onion.ptr, cur_block_height, InternalUtils.check_arr_len(payment_hash, 32), keysend_preimage.ptr, invoice_request == null ? 0 : invoice_request.ptr, InternalUtils.check_arr_len(prng_seed, 32));
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(session_priv);
		Reference.reachabilityFence(total_msat);
		Reference.reachabilityFence(recipient_onion);
		Reference.reachabilityFence(cur_block_height);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(keysend_preimage);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(prng_seed);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies the signature with a pubkey over the given message using a tagged hash as the message
	 * digest.
	 */
	public static Result_NoneSecp256k1ErrorZ verify_signature(byte[] signature, org.ldk.structs.TaggedHash message, byte[] pubkey) {
		long ret = bindings.verify_signature(InternalUtils.check_arr_len(signature, 64), message.ptr, InternalUtils.check_arr_len(pubkey, 33));
		Reference.reachabilityFence(signature);
		Reference.reachabilityFence(message);
		Reference.reachabilityFence(pubkey);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSecp256k1ErrorZ ret_hu_conv = Result_NoneSecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for async payment messages.
	 */
	public static boolean AsyncPaymentsMessage_is_known_type(long tlv_type) {
		boolean ret = bindings.AsyncPaymentsMessage_is_known_type(tlv_type);
		Reference.reachabilityFence(tlv_type);
		return ret;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for DNS Resolvers.
	 */
	public static boolean DNSResolverMessage_is_known_type(long tlv_type) {
		boolean ret = bindings.DNSResolverMessage_is_known_type(tlv_type);
		Reference.reachabilityFence(tlv_type);
		return ret;
	}

	/**
	 * Creates an [`OnionMessage`] with the given `contents` for sending to the destination of
	 * `path`, first calling [`Destination::resolve`] on `path.destination` with the given
	 * [`ReadOnlyNetworkGraph`].
	 * 
	 * Returns the node id of the peer to send the message to, the message itself, and any addresses
	 * needed to connect to the first node.
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ create_onion_message_resolving_destination(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.NodeIdLookUp node_id_lookup, org.ldk.structs.ReadOnlyNetworkGraph network_graph, org.ldk.structs.OnionMessagePath path, org.ldk.structs.OnionMessageContents contents, @Nullable org.ldk.structs.BlindedMessagePath reply_path) {
		long ret = bindings.create_onion_message_resolving_destination(entropy_source.ptr, node_signer.ptr, node_id_lookup.ptr, network_graph.ptr, path.ptr, contents.ptr, reply_path == null ? 0 : reply_path.ptr);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(node_id_lookup);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(contents);
		Reference.reachabilityFence(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_lookup); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(contents); };
		return ret_hu_conv;
	}

	/**
	 * Creates an [`OnionMessage`] with the given `contents` for sending to the destination of
	 * `path`.
	 * 
	 * Returns the node id of the peer to send the message to, the message itself, and any addresses
	 * needed to connect to the first node.
	 * 
	 * Returns [`SendError::UnresolvedIntroductionNode`] if:
	 * - `destination` contains a blinded path with an [`IntroductionNode::DirectedShortChannelId`],
	 * - unless it can be resolved by [`NodeIdLookUp::next_node_id`].
	 * Use [`create_onion_message_resolving_destination`] instead to resolve the introduction node
	 * first with a [`ReadOnlyNetworkGraph`].
	 * 
	 * Note that reply_path (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ create_onion_message(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.NodeIdLookUp node_id_lookup, org.ldk.structs.OnionMessagePath path, org.ldk.structs.OnionMessageContents contents, @Nullable org.ldk.structs.BlindedMessagePath reply_path) {
		long ret = bindings.create_onion_message(entropy_source.ptr, node_signer.ptr, node_id_lookup.ptr, path.ptr, contents.ptr, reply_path == null ? 0 : reply_path.ptr);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(node_id_lookup);
		Reference.reachabilityFence(path);
		Reference.reachabilityFence(contents);
		Reference.reachabilityFence(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_lookup); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(contents); };
		return ret_hu_conv;
	}

	/**
	 * Decode one layer of an incoming [`OnionMessage`].
	 * 
	 * Returns either the next layer of the onion for forwarding or the decrypted content for the
	 * receiver.
	 */
	public static Result_PeeledOnionNoneZ peel_onion_message(org.ldk.structs.OnionMessage msg, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.Logger logger, org.ldk.structs.CustomOnionMessageHandler custom_handler) {
		long ret = bindings.peel_onion_message(msg.ptr, node_signer.ptr, logger.ptr, custom_handler.ptr);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(custom_handler);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeeledOnionNoneZ ret_hu_conv = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(custom_handler); };
		return ret_hu_conv;
	}

	/**
	 * Returns whether `tlv_type` corresponds to a TLV record for Offers.
	 */
	public static boolean OffersMessage_is_known_type(long tlv_type) {
		boolean ret = bindings.OffersMessage_is_known_type(tlv_type);
		Reference.reachabilityFence(tlv_type);
		return ret;
	}

	/**
	 * Read a NetworkUpdate from a byte array, created by NetworkUpdate_write
	 */
	public static Result_COption_NetworkUpdateZDecodeErrorZ NetworkUpdate_read(byte[] ser) {
		long ret = bindings.NetworkUpdate_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_NetworkUpdateZDecodeErrorZ ret_hu_conv = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies the signature of a [`NodeAnnouncement`].
	 * 
	 * Returns an error if it is invalid.
	 */
	public static Result_NoneLightningErrorZ verify_node_announcement(org.ldk.structs.NodeAnnouncement msg) {
		long ret = bindings.verify_node_announcement(msg.ptr);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies all signatures included in a [`ChannelAnnouncement`].
	 * 
	 * Returns an error if one of the signatures is invalid.
	 */
	public static Result_NoneLightningErrorZ verify_channel_announcement(org.ldk.structs.ChannelAnnouncement msg) {
		long ret = bindings.verify_channel_announcement(msg.ptr);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Finds a route from us (payer) to the given target node (payee).
	 * 
	 * If the payee provided features in their invoice, they should be provided via the `payee` field
	 * in the given [`RouteParameters::payment_params`].
	 * Without this, MPP will only be used if the payee's features are available in the network graph.
	 * 
	 * Private routing paths between a public node and the target may be included in the `payee` field
	 * of [`RouteParameters::payment_params`].
	 * 
	 * If some channels aren't announced, it may be useful to fill in `first_hops` with the results
	 * from [`ChannelManager::list_usable_channels`]. If it is filled in, the view of these channels
	 * from `network_graph` will be ignored, and only those in `first_hops` will be used.
	 * 
	 * The fees on channels from us to the next hop are ignored as they are assumed to all be equal.
	 * However, the enabled/disabled bit on such channels as well as the `htlc_minimum_msat` /
	 * `htlc_maximum_msat` *are* checked as they may change based on the receiving node.
	 * 
	 * # Panics
	 * 
	 * Panics if first_hops contains channels without `short_channel_id`s;
	 * [`ChannelManager::list_usable_channels`] will never include such channels.
	 * 
	 * [`ChannelManager::list_usable_channels`]: crate::ln::channelmanager::ChannelManager::list_usable_channels
	 * [`Event::PaymentPathFailed`]: crate::events::Event::PaymentPathFailed
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 * 
	 * Note that first_hops (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static Result_RouteStrZ find_route(byte[] our_node_pubkey, org.ldk.structs.RouteParameters route_params, org.ldk.structs.NetworkGraph network_graph, @Nullable ChannelDetails[] first_hops, org.ldk.structs.Logger logger, org.ldk.structs.ScoreLookUp scorer, org.ldk.structs.ProbabilisticScoringFeeParameters score_params, byte[] random_seed_bytes) {
		long ret = bindings.find_route(InternalUtils.check_arr_len(our_node_pubkey, 33), route_params.ptr, network_graph.ptr, first_hops != null ? Arrays.stream(first_hops).mapToLong(first_hops_conv_16 -> first_hops_conv_16.ptr).toArray() : null, logger.ptr, scorer.ptr, score_params.ptr, InternalUtils.check_arr_len(random_seed_bytes, 32));
		Reference.reachabilityFence(our_node_pubkey);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(first_hops);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(scorer);
		Reference.reachabilityFence(score_params);
		Reference.reachabilityFence(random_seed_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_graph); };
		if (first_hops != null) { for (ChannelDetails first_hops_conv_16: first_hops) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(first_hops_conv_16); }; } };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(scorer); };
		return ret_hu_conv;
	}

	/**
	 * Construct a route from us (payer) to the target node (payee) via the given hops (which should
	 * exclude the payer, but include the payee). This may be useful, e.g., for probing the chosen path.
	 * 
	 * Re-uses logic from `find_route`, so the restrictions described there also apply here.
	 */
	public static Result_RouteStrZ build_route_from_hops(byte[] our_node_pubkey, byte[][] hops, org.ldk.structs.RouteParameters route_params, org.ldk.structs.NetworkGraph network_graph, org.ldk.structs.Logger logger, byte[] random_seed_bytes) {
		long ret = bindings.build_route_from_hops(InternalUtils.check_arr_len(our_node_pubkey, 33), hops != null ? Arrays.stream(hops).map(hops_conv_8 -> InternalUtils.check_arr_len(hops_conv_8, 33)).toArray(byte[][]::new) : null, route_params.ptr, network_graph.ptr, logger.ptr, InternalUtils.check_arr_len(random_seed_bytes, 32));
		Reference.reachabilityFence(our_node_pubkey);
		Reference.reachabilityFence(hops);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(network_graph);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(random_seed_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		return ret_hu_conv;
	}

	/**
	 * Creates an unsigned [`Psbt`] which spends the given descriptors to
	 * the given outputs, plus an output to the given change destination (if sufficient
	 * change value remains). The PSBT will have a feerate, at least, of the given value.
	 * 
	 * The `locktime` argument is used to set the transaction's locktime. If `None`, the
	 * transaction will have a locktime of 0. It it recommended to set this to the current block
	 * height to avoid fee sniping, unless you have some specific reason to use a different
	 * locktime.
	 * 
	 * Returns the PSBT and expected max transaction weight.
	 * 
	 * Returns `Err(())` if the output value is greater than the input value minus required fee,
	 * if a descriptor was duplicated, or if an output descriptor `script_pubkey`
	 * does not match the one we can spend.
	 * 
	 * We do not enforce that outputs meet the dust limit or that any output scripts are standard.
	 */
	public static Result_C2Tuple_CVec_u8Zu64ZNoneZ SpendableOutputDescriptor_create_spendable_outputs_psbt(SpendableOutputDescriptor[] descriptors, TxOut[] outputs, byte[] change_destination_script, int feerate_sat_per_1000_weight, org.ldk.structs.Option_u32Z locktime) {
		long ret = bindings.SpendableOutputDescriptor_create_spendable_outputs_psbt(descriptors != null ? Arrays.stream(descriptors).mapToLong(descriptors_conv_27 -> descriptors_conv_27.ptr).toArray() : null, outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_7 -> outputs_conv_7.ptr).toArray() : null, change_destination_script, feerate_sat_per_1000_weight, locktime.ptr);
		Reference.reachabilityFence(descriptors);
		Reference.reachabilityFence(outputs);
		Reference.reachabilityFence(change_destination_script);
		Reference.reachabilityFence(feerate_sat_per_1000_weight);
		Reference.reachabilityFence(locktime);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_CVec_u8Zu64ZNoneZ ret_hu_conv = Result_C2Tuple_CVec_u8Zu64ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Computes the tweak to apply to the base funding key of a channel.
	 * 
	 * The tweak is computed similar to existing tweaks used in
	 * [BOLT-3](https://github.com/lightning/bolts/blob/master/03-transactions.md#key-derivation):
	 * 
	 * 1. We use the txid of the funding transaction the splice transaction is spending instead of the
	 * `per_commitment_point` to guarantee uniqueness.
	 * 2. We include the private key instead of the public key to guarantee only those with knowledge
	 * of it can re-derive the new funding key.
	 * 
	 * tweak = SHA256(splice_parent_funding_txid || base_funding_secret_key)
	 * tweaked_funding_key = base_funding_key + tweak
	 * 
	 * While the use of this tweak is not required (signers may choose to compute a tweak of their
	 * choice), signers must ensure their tweak guarantees the two properties mentioned above:
	 * uniqueness and derivable only by one or both of the channel participants.
	 */
	public static BigEndianScalar compute_funding_key_tweak(byte[] base_funding_secret_key, byte[] splice_parent_funding_txid) {
		long ret = bindings.compute_funding_key_tweak(InternalUtils.check_arr_len(base_funding_secret_key, 32), InternalUtils.check_arr_len(splice_parent_funding_txid, 32));
		Reference.reachabilityFence(base_funding_secret_key);
		Reference.reachabilityFence(splice_parent_funding_txid);
		if (ret >= 0 && ret <= 4096) { return null; }
		BigEndianScalar ret_conv = new BigEndianScalar(null, ret);
		return ret_conv;
	}

}
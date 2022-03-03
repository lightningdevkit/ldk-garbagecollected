package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Details of a channel, as returned by ChannelManager::list_channels and ChannelManager::list_usable_channels
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelDetails extends CommonBase {
	ChannelDetails(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelDetails_free(ptr); }
	}

	/**
	 * The channel's ID (prior to funding transaction generation, this is a random 32 bytes,
	 * thereafter this is the txid of the funding transaction xor the funding transaction output).
	 * Note that this means this value is *not* persistent - it can change once during the
	 * lifetime of the channel.
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelDetails_get_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel's ID (prior to funding transaction generation, this is a random 32 bytes,
	 * thereafter this is the txid of the funding transaction xor the funding transaction output).
	 * Note that this means this value is *not* persistent - it can change once during the
	 * lifetime of the channel.
	 */
	public void set_channel_id(byte[] val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Parameters which apply to our counterparty. See individual fields for more information.
	 */
	public ChannelCounterparty get_counterparty() {
		long ret = bindings.ChannelDetails_get_counterparty(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelCounterparty ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelCounterparty(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Parameters which apply to our counterparty. See individual fields for more information.
	 */
	public void set_counterparty(ChannelCounterparty val) {
		bindings.ChannelDetails_set_counterparty(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * Note that, if this has been set, `channel_id` will be equivalent to
	 * `funding_txo.unwrap().to_channel_id()`.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public OutPoint get_funding_txo() {
		long ret = bindings.ChannelDetails_get_funding_txo(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * Note that, if this has been set, `channel_id` will be equivalent to
	 * `funding_txo.unwrap().to_channel_id()`.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_funding_txo(@Nullable OutPoint val) {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 */
	public Option_u64Z get_short_channel_id() {
		long ret = bindings.ChannelDetails_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 */
	public void set_short_channel_id(Option_u64Z val) {
		bindings.ChannelDetails_set_short_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for us. This value ensures
	 * that if we broadcast a revoked state, our counterparty can punish us by claiming at least
	 * this value on chain.
	 * 
	 * This value is not included in [`outbound_capacity_msat`] as it can never be spent.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`outbound_capacity_msat`]: ChannelDetails::outbound_capacity_msat
	 */
	public Option_u64Z get_unspendable_punishment_reserve() {
		long ret = bindings.ChannelDetails_get_unspendable_punishment_reserve(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u64Z ret_hu_conv = Option_u64Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The value, in satoshis, that must always be held in the channel for us. This value ensures
	 * that if we broadcast a revoked state, our counterparty can punish us by claiming at least
	 * this value on chain.
	 * 
	 * This value is not included in [`outbound_capacity_msat`] as it can never be spent.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`outbound_capacity_msat`]: ChannelDetails::outbound_capacity_msat
	 */
	public void set_unspendable_punishment_reserve(Option_u64Z val) {
		bindings.ChannelDetails_set_unspendable_punishment_reserve(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The `user_channel_id` passed in to create_channel, or 0 if the channel was inbound.
	 */
	public long get_user_channel_id() {
		long ret = bindings.ChannelDetails_get_user_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The `user_channel_id` passed in to create_channel, or 0 if the channel was inbound.
	 */
	public void set_user_channel_id(long val) {
		bindings.ChannelDetails_set_user_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Our total balance.  This is the amount we would get if we close the channel.
	 * This value is not exact. Due to various in-flight changes and feerate changes, exactly this
	 * amount is not likely to be recoverable on close.
	 * 
	 * This does not include any pending HTLCs which are not yet fully resolved (and, thus, whose
	 * balance is not available for inclusion in new outbound HTLCs). This further does not include
	 * any pending outgoing HTLCs which are awaiting some other resolution to be sent.
	 * This does not consider any on-chain fees.
	 * 
	 * See also [`ChannelDetails::outbound_capacity_msat`]
	 */
	public long get_balance_msat() {
		long ret = bindings.ChannelDetails_get_balance_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Our total balance.  This is the amount we would get if we close the channel.
	 * This value is not exact. Due to various in-flight changes and feerate changes, exactly this
	 * amount is not likely to be recoverable on close.
	 * 
	 * This does not include any pending HTLCs which are not yet fully resolved (and, thus, whose
	 * balance is not available for inclusion in new outbound HTLCs). This further does not include
	 * any pending outgoing HTLCs which are awaiting some other resolution to be sent.
	 * This does not consider any on-chain fees.
	 * 
	 * See also [`ChannelDetails::outbound_capacity_msat`]
	 */
	public void set_balance_msat(long val) {
		bindings.ChannelDetails_set_balance_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 * 
	 * See also [`ChannelDetails::balance_msat`]
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * conflict-avoidance policy, exactly this amount is not likely to be spendable. However, we
	 * should be able to spend nearly this amount.
	 */
	public long get_outbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 * 
	 * See also [`ChannelDetails::balance_msat`]
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * conflict-avoidance policy, exactly this amount is not likely to be spendable. However, we
	 * should be able to spend nearly this amount.
	 */
	public void set_outbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * counterparty's conflict-avoidance policy, exactly this amount is not likely to be spendable.
	 * However, our counterparty should be able to spend nearly this amount.
	 */
	public long get_inbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, whose balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 * 
	 * This value is not exact. Due to various in-flight changes, feerate changes, and our
	 * counterparty's conflict-avoidance policy, exactly this amount is not likely to be spendable.
	 * However, our counterparty should be able to spend nearly this amount.
	 */
	public void set_inbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of required confirmations on the funding transaction before the funding will be
	 * considered \"locked\". This number is selected by the channel fundee (i.e. us if
	 * [`is_outbound`] is *not* set), and can be selected for inbound channels with
	 * [`ChannelHandshakeConfig::minimum_depth`] or limited for outbound channels with
	 * [`ChannelHandshakeLimits::max_minimum_depth`].
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`is_outbound`]: ChannelDetails::is_outbound
	 * [`ChannelHandshakeConfig::minimum_depth`]: crate::util::config::ChannelHandshakeConfig::minimum_depth
	 * [`ChannelHandshakeLimits::max_minimum_depth`]: crate::util::config::ChannelHandshakeLimits::max_minimum_depth
	 */
	public Option_u32Z get_confirmations_required() {
		long ret = bindings.ChannelDetails_get_confirmations_required(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u32Z ret_hu_conv = Option_u32Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The number of required confirmations on the funding transaction before the funding will be
	 * considered \"locked\". This number is selected by the channel fundee (i.e. us if
	 * [`is_outbound`] is *not* set), and can be selected for inbound channels with
	 * [`ChannelHandshakeConfig::minimum_depth`] or limited for outbound channels with
	 * [`ChannelHandshakeLimits::max_minimum_depth`].
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 * 
	 * [`is_outbound`]: ChannelDetails::is_outbound
	 * [`ChannelHandshakeConfig::minimum_depth`]: crate::util::config::ChannelHandshakeConfig::minimum_depth
	 * [`ChannelHandshakeLimits::max_minimum_depth`]: crate::util::config::ChannelHandshakeLimits::max_minimum_depth
	 */
	public void set_confirmations_required(Option_u32Z val) {
		bindings.ChannelDetails_set_confirmations_required(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks (after our commitment transaction confirms) that we will need to wait
	 * until we can claim our funds after we force-close the channel. During this time our
	 * counterparty is allowed to punish us if we broadcasted a stale state. If our counterparty
	 * force-closes the channel and broadcasts a commitment transaction we do not have to wait any
	 * time to claim our non-HTLC-encumbered funds.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 */
	public Option_u16Z get_force_close_spend_delay() {
		long ret = bindings.ChannelDetails_get_force_close_spend_delay(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_u16Z ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The number of blocks (after our commitment transaction confirms) that we will need to wait
	 * until we can claim our funds after we force-close the channel. During this time our
	 * counterparty is allowed to punish us if we broadcasted a stale state. If our counterparty
	 * force-closes the channel and broadcasts a commitment transaction we do not have to wait any
	 * time to claim our non-HTLC-encumbered funds.
	 * 
	 * This value will be `None` for outbound channels until the counterparty accepts the channel.
	 */
	public void set_force_close_spend_delay(Option_u16Z val) {
		bindings.ChannelDetails_set_force_close_spend_delay(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public boolean get_is_outbound() {
		boolean ret = bindings.ChannelDetails_get_is_outbound(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public void set_is_outbound(boolean val) {
		bindings.ChannelDetails_set_is_outbound(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True if the channel is confirmed, funding_locked messages have been exchanged, and the
	 * channel is not currently being shut down. `funding_locked` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public boolean get_is_funding_locked() {
		boolean ret = bindings.ChannelDetails_get_is_funding_locked(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if the channel is confirmed, funding_locked messages have been exchanged, and the
	 * channel is not currently being shut down. `funding_locked` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public void set_is_funding_locked(boolean val) {
		bindings.ChannelDetails_set_is_funding_locked(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True if the channel is (a) confirmed and funding_locked messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_funding_locked`.
	 */
	public boolean get_is_usable() {
		boolean ret = bindings.ChannelDetails_get_is_usable(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if the channel is (a) confirmed and funding_locked messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_funding_locked`.
	 */
	public void set_is_usable(boolean val) {
		bindings.ChannelDetails_set_is_usable(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public boolean get_is_public() {
		boolean ret = bindings.ChannelDetails_get_is_public(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public void set_is_public(boolean val) {
		bindings.ChannelDetails_set_is_public(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChannelDetails given each field
	 */
	public static ChannelDetails of(byte[] channel_id_arg, ChannelCounterparty counterparty_arg, OutPoint funding_txo_arg, Option_u64Z short_channel_id_arg, long channel_value_satoshis_arg, Option_u64Z unspendable_punishment_reserve_arg, long user_channel_id_arg, long balance_msat_arg, long outbound_capacity_msat_arg, long inbound_capacity_msat_arg, Option_u32Z confirmations_required_arg, Option_u16Z force_close_spend_delay_arg, boolean is_outbound_arg, boolean is_funding_locked_arg, boolean is_usable_arg, boolean is_public_arg) {
		long ret = bindings.ChannelDetails_new(InternalUtils.check_arr_len(channel_id_arg, 32), counterparty_arg == null ? 0 : counterparty_arg.ptr & ~1, funding_txo_arg == null ? 0 : funding_txo_arg.ptr & ~1, short_channel_id_arg.ptr, channel_value_satoshis_arg, unspendable_punishment_reserve_arg.ptr, user_channel_id_arg, balance_msat_arg, outbound_capacity_msat_arg, inbound_capacity_msat_arg, confirmations_required_arg.ptr, force_close_spend_delay_arg.ptr, is_outbound_arg, is_funding_locked_arg, is_usable_arg, is_public_arg);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(counterparty_arg);
		Reference.reachabilityFence(funding_txo_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(channel_value_satoshis_arg);
		Reference.reachabilityFence(unspendable_punishment_reserve_arg);
		Reference.reachabilityFence(user_channel_id_arg);
		Reference.reachabilityFence(balance_msat_arg);
		Reference.reachabilityFence(outbound_capacity_msat_arg);
		Reference.reachabilityFence(inbound_capacity_msat_arg);
		Reference.reachabilityFence(confirmations_required_arg);
		Reference.reachabilityFence(force_close_spend_delay_arg);
		Reference.reachabilityFence(is_outbound_arg);
		Reference.reachabilityFence(is_funding_locked_arg);
		Reference.reachabilityFence(is_usable_arg);
		Reference.reachabilityFence(is_public_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelDetails ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelDetails(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelDetails_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelDetails
	 */
	public ChannelDetails clone() {
		long ret = bindings.ChannelDetails_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelDetails ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelDetails(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelDetails object into a byte array which can be read by ChannelDetails_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelDetails_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a ChannelDetails from a byte array, created by ChannelDetails_write
	 */
	public static Result_ChannelDetailsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelDetails_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelDetailsDecodeErrorZ ret_hu_conv = Result_ChannelDetailsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

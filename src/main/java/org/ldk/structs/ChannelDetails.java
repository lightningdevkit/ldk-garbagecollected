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
		org.ldk.structs.ChannelCounterparty ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelCounterparty(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Parameters which apply to our counterparty. See individual fields for more information.
	 */
	public void set_counterparty(org.ldk.structs.ChannelCounterparty val) {
		bindings.ChannelDetails_set_counterparty(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
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
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_funding_txo(@Nullable org.ldk.structs.OutPoint val) {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The features which this channel operates with. See individual features for more info.
	 * 
	 * `None` until negotiation completes and the channel type is finalized.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTypeFeatures get_channel_type() {
		long ret = bindings.ChannelDetails_get_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The features which this channel operates with. See individual features for more info.
	 * 
	 * `None` until negotiation completes and the channel type is finalized.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_type(@Nullable org.ldk.structs.ChannelTypeFeatures val) {
		bindings.ChannelDetails_set_channel_type(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 * 
	 * Note that if [`inbound_scid_alias`] is set, it must be used for invoices and inbound
	 * payments instead of this. See [`get_inbound_payment_scid`].
	 * 
	 * For channels with [`confirmations_required`] set to `Some(0)`, [`outbound_scid_alias`] may
	 * be used in place of this in outbound routes. See [`get_outbound_payment_scid`].
	 * 
	 * [`inbound_scid_alias`]: Self::inbound_scid_alias
	 * [`outbound_scid_alias`]: Self::outbound_scid_alias
	 * [`get_inbound_payment_scid`]: Self::get_inbound_payment_scid
	 * [`get_outbound_payment_scid`]: Self::get_outbound_payment_scid
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public Option_u64Z get_short_channel_id() {
		long ret = bindings.ChannelDetails_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 * 
	 * Note that if [`inbound_scid_alias`] is set, it must be used for invoices and inbound
	 * payments instead of this. See [`get_inbound_payment_scid`].
	 * 
	 * For channels with [`confirmations_required`] set to `Some(0)`, [`outbound_scid_alias`] may
	 * be used in place of this in outbound routes. See [`get_outbound_payment_scid`].
	 * 
	 * [`inbound_scid_alias`]: Self::inbound_scid_alias
	 * [`outbound_scid_alias`]: Self::outbound_scid_alias
	 * [`get_inbound_payment_scid`]: Self::get_inbound_payment_scid
	 * [`get_outbound_payment_scid`]: Self::get_outbound_payment_scid
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public void set_short_channel_id(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_short_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by us and
	 * usable in place of [`short_channel_id`] to reference the channel in outbound routes when
	 * the channel has not yet been confirmed (as long as [`confirmations_required`] is
	 * `Some(0)`).
	 * 
	 * This will be `None` as long as the channel is not available for routing outbound payments.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public Option_u64Z get_outbound_scid_alias() {
		long ret = bindings.ChannelDetails_get_outbound_scid_alias(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by us and
	 * usable in place of [`short_channel_id`] to reference the channel in outbound routes when
	 * the channel has not yet been confirmed (as long as [`confirmations_required`] is
	 * `Some(0)`).
	 * 
	 * This will be `None` as long as the channel is not available for routing outbound payments.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 * [`confirmations_required`]: Self::confirmations_required
	 */
	public void set_outbound_scid_alias(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_outbound_scid_alias(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by our
	 * counterparty and usable in place of [`short_channel_id`] in invoice route hints. Our
	 * counterparty will recognize the alias provided here in place of the [`short_channel_id`]
	 * when they see a payment to be routed to us.
	 * 
	 * Our counterparty may choose to rotate this value at any time, though will always recognize
	 * previous values for inbound payment forwarding.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 */
	public Option_u64Z get_inbound_scid_alias() {
		long ret = bindings.ChannelDetails_get_inbound_scid_alias(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * An optional [`short_channel_id`] alias for this channel, randomly generated by our
	 * counterparty and usable in place of [`short_channel_id`] in invoice route hints. Our
	 * counterparty will recognize the alias provided here in place of the [`short_channel_id`]
	 * when they see a payment to be routed to us.
	 * 
	 * Our counterparty may choose to rotate this value at any time, though will always recognize
	 * previous values for inbound payment forwarding.
	 * 
	 * [`short_channel_id`]: Self::short_channel_id
	 */
	public void set_inbound_scid_alias(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_inbound_scid_alias(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
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
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_unspendable_punishment_reserve(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_unspendable_punishment_reserve(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The `user_channel_id` passed in to create_channel, or a random value if the channel was
	 * inbound. This may be zero for inbound channels serialized with LDK versions prior to
	 * 0.0.113.
	 */
	public UInt128 get_user_channel_id() {
		byte[] ret = bindings.ChannelDetails_get_user_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		org.ldk.util.UInt128 ret_conv = new org.ldk.util.UInt128(ret);
		return ret_conv;
	}

	/**
	 * The `user_channel_id` passed in to create_channel, or a random value if the channel was
	 * inbound. This may be zero for inbound channels serialized with LDK versions prior to
	 * 0.0.113.
	 */
	public void set_user_channel_id(org.ldk.util.UInt128 val) {
		bindings.ChannelDetails_set_user_channel_id(this.ptr, val.getLEBytes());
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
	 * The available outbound capacity for sending a single HTLC to the remote peer. This is
	 * similar to [`ChannelDetails::outbound_capacity_msat`] but it may be further restricted by
	 * the current state and per-HTLC limit(s). This is intended for use when routing, allowing us
	 * to use a limit as close as possible to the HTLC limit we can currently send.
	 * 
	 * See also [`ChannelDetails::balance_msat`] and [`ChannelDetails::outbound_capacity_msat`].
	 */
	public long get_next_outbound_htlc_limit_msat() {
		long ret = bindings.ChannelDetails_get_next_outbound_htlc_limit_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The available outbound capacity for sending a single HTLC to the remote peer. This is
	 * similar to [`ChannelDetails::outbound_capacity_msat`] but it may be further restricted by
	 * the current state and per-HTLC limit(s). This is intended for use when routing, allowing us
	 * to use a limit as close as possible to the HTLC limit we can currently send.
	 * 
	 * See also [`ChannelDetails::balance_msat`] and [`ChannelDetails::outbound_capacity_msat`].
	 */
	public void set_next_outbound_htlc_limit_msat(long val) {
		bindings.ChannelDetails_set_next_outbound_htlc_limit_msat(this.ptr, val);
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
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_confirmations_required(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelDetails_set_confirmations_required(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The current number of confirmations on the funding transaction.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.113.
	 */
	public Option_u32Z get_confirmations() {
		long ret = bindings.ChannelDetails_get_confirmations(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u32Z ret_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The current number of confirmations on the funding transaction.
	 * 
	 * This value will be `None` for objects serialized with LDK versions prior to 0.0.113.
	 */
	public void set_confirmations(org.ldk.structs.Option_u32Z val) {
		bindings.ChannelDetails_set_confirmations(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
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
		org.ldk.structs.Option_u16Z ret_hu_conv = org.ldk.structs.Option_u16Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_force_close_spend_delay(org.ldk.structs.Option_u16Z val) {
		bindings.ChannelDetails_set_force_close_spend_delay(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
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
	 * True if the channel is confirmed, channel_ready messages have been exchanged, and the
	 * channel is not currently being shut down. `channel_ready` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public boolean get_is_channel_ready() {
		boolean ret = bindings.ChannelDetails_get_is_channel_ready(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if the channel is confirmed, channel_ready messages have been exchanged, and the
	 * channel is not currently being shut down. `channel_ready` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations). The required
	 * confirmation count is provided in [`confirmations_required`].
	 * 
	 * [`confirmations_required`]: ChannelDetails::confirmations_required
	 */
	public void set_is_channel_ready(boolean val) {
		bindings.ChannelDetails_set_is_channel_ready(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * True if the channel is (a) confirmed and channel_ready messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_channel_ready`.
	 */
	public boolean get_is_usable() {
		boolean ret = bindings.ChannelDetails_get_is_usable(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * True if the channel is (a) confirmed and channel_ready messages have been exchanged, (b)
	 * the peer is connected, and (c) the channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_channel_ready`.
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
	 * The smallest value HTLC (in msat) we will accept, for this channel. This field
	 * is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.107
	 */
	public Option_u64Z get_inbound_htlc_minimum_msat() {
		long ret = bindings.ChannelDetails_get_inbound_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The smallest value HTLC (in msat) we will accept, for this channel. This field
	 * is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.107
	 */
	public void set_inbound_htlc_minimum_msat(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_inbound_htlc_minimum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The largest value HTLC (in msat) we currently will accept, for this channel.
	 */
	public Option_u64Z get_inbound_htlc_maximum_msat() {
		long ret = bindings.ChannelDetails_get_inbound_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The largest value HTLC (in msat) we currently will accept, for this channel.
	 */
	public void set_inbound_htlc_maximum_msat(org.ldk.structs.Option_u64Z val) {
		bindings.ChannelDetails_set_inbound_htlc_maximum_msat(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Set of configurable parameters that affect channel operation.
	 * 
	 * This field is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.109.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelConfig get_config() {
		long ret = bindings.ChannelDetails_get_config(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Set of configurable parameters that affect channel operation.
	 * 
	 * This field is only `None` for `ChannelDetails` objects serialized prior to LDK 0.0.109.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_config(@Nullable org.ldk.structs.ChannelConfig val) {
		bindings.ChannelDetails_set_config(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ChannelDetails given each field
	 */
	public static ChannelDetails of(byte[] channel_id_arg, org.ldk.structs.ChannelCounterparty counterparty_arg, org.ldk.structs.OutPoint funding_txo_arg, org.ldk.structs.ChannelTypeFeatures channel_type_arg, org.ldk.structs.Option_u64Z short_channel_id_arg, org.ldk.structs.Option_u64Z outbound_scid_alias_arg, org.ldk.structs.Option_u64Z inbound_scid_alias_arg, long channel_value_satoshis_arg, org.ldk.structs.Option_u64Z unspendable_punishment_reserve_arg, org.ldk.util.UInt128 user_channel_id_arg, long balance_msat_arg, long outbound_capacity_msat_arg, long next_outbound_htlc_limit_msat_arg, long inbound_capacity_msat_arg, org.ldk.structs.Option_u32Z confirmations_required_arg, org.ldk.structs.Option_u32Z confirmations_arg, org.ldk.structs.Option_u16Z force_close_spend_delay_arg, boolean is_outbound_arg, boolean is_channel_ready_arg, boolean is_usable_arg, boolean is_public_arg, org.ldk.structs.Option_u64Z inbound_htlc_minimum_msat_arg, org.ldk.structs.Option_u64Z inbound_htlc_maximum_msat_arg, org.ldk.structs.ChannelConfig config_arg) {
		long ret = bindings.ChannelDetails_new(InternalUtils.check_arr_len(channel_id_arg, 32), counterparty_arg == null ? 0 : counterparty_arg.ptr, funding_txo_arg == null ? 0 : funding_txo_arg.ptr, channel_type_arg == null ? 0 : channel_type_arg.ptr, short_channel_id_arg.ptr, outbound_scid_alias_arg.ptr, inbound_scid_alias_arg.ptr, channel_value_satoshis_arg, unspendable_punishment_reserve_arg.ptr, user_channel_id_arg.getLEBytes(), balance_msat_arg, outbound_capacity_msat_arg, next_outbound_htlc_limit_msat_arg, inbound_capacity_msat_arg, confirmations_required_arg.ptr, confirmations_arg.ptr, force_close_spend_delay_arg.ptr, is_outbound_arg, is_channel_ready_arg, is_usable_arg, is_public_arg, inbound_htlc_minimum_msat_arg.ptr, inbound_htlc_maximum_msat_arg.ptr, config_arg == null ? 0 : config_arg.ptr);
		Reference.reachabilityFence(channel_id_arg);
		Reference.reachabilityFence(counterparty_arg);
		Reference.reachabilityFence(funding_txo_arg);
		Reference.reachabilityFence(channel_type_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(outbound_scid_alias_arg);
		Reference.reachabilityFence(inbound_scid_alias_arg);
		Reference.reachabilityFence(channel_value_satoshis_arg);
		Reference.reachabilityFence(unspendable_punishment_reserve_arg);
		Reference.reachabilityFence(user_channel_id_arg);
		Reference.reachabilityFence(balance_msat_arg);
		Reference.reachabilityFence(outbound_capacity_msat_arg);
		Reference.reachabilityFence(next_outbound_htlc_limit_msat_arg);
		Reference.reachabilityFence(inbound_capacity_msat_arg);
		Reference.reachabilityFence(confirmations_required_arg);
		Reference.reachabilityFence(confirmations_arg);
		Reference.reachabilityFence(force_close_spend_delay_arg);
		Reference.reachabilityFence(is_outbound_arg);
		Reference.reachabilityFence(is_channel_ready_arg);
		Reference.reachabilityFence(is_usable_arg);
		Reference.reachabilityFence(is_public_arg);
		Reference.reachabilityFence(inbound_htlc_minimum_msat_arg);
		Reference.reachabilityFence(inbound_htlc_maximum_msat_arg);
		Reference.reachabilityFence(config_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDetails ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDetails(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(counterparty_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(funding_txo_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_type_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(short_channel_id_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outbound_scid_alias_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(inbound_scid_alias_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(unspendable_punishment_reserve_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(confirmations_required_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(confirmations_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(force_close_spend_delay_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(inbound_htlc_minimum_msat_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(inbound_htlc_maximum_msat_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(config_arg); };
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
		org.ldk.structs.ChannelDetails ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDetails(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the current SCID which should be used to identify this channel for inbound payments.
	 * This should be used for providing invoice hints or in any other context where our
	 * counterparty will forward a payment to us.
	 * 
	 * This is either the [`ChannelDetails::inbound_scid_alias`], if set, or the
	 * [`ChannelDetails::short_channel_id`]. See those for more information.
	 */
	public Option_u64Z get_inbound_payment_scid() {
		long ret = bindings.ChannelDetails_get_inbound_payment_scid(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the current SCID which should be used to identify this channel for outbound payments.
	 * This should be used in [`Route`]s to describe the first hop or in other contexts where
	 * we're sending or forwarding a payment outbound over this channel.
	 * 
	 * This is either the [`ChannelDetails::short_channel_id`], if set, or the
	 * [`ChannelDetails::outbound_scid_alias`]. See those for more information.
	 */
	public Option_u64Z get_outbound_payment_scid() {
		long ret = bindings.ChannelDetails_get_outbound_payment_scid(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`open_channel`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`open_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OpenChannel extends CommonBase {
	OpenChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OpenChannel_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.OpenChannel_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.OpenChannel_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.OpenChannel_get_temporary_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public void set_temporary_channel_id(byte[] val) {
		bindings.OpenChannel_set_temporary_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel value
	 */
	public long get_funding_satoshis() {
		long ret = bindings.OpenChannel_get_funding_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel value
	 */
	public void set_funding_satoshis(long val) {
		bindings.OpenChannel_set_funding_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public long get_push_msat() {
		long ret = bindings.OpenChannel_get_push_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public void set_push_msat(long val) {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.OpenChannel_get_dust_limit_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.OpenChannel_set_dust_limit_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.OpenChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.OpenChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public long get_channel_reserve_satoshis() {
		long ret = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public void set_channel_reserve_satoshis(long val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.OpenChannel_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.OpenChannel_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate per 1000-weight of sender generated transactions, until updated by
	 * [`UpdateFee`]
	 */
	public int get_feerate_per_kw() {
		int ret = bindings.OpenChannel_get_feerate_per_kw(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate per 1000-weight of sender generated transactions, until updated by
	 * [`UpdateFee`]
	 */
	public void set_feerate_per_kw(int val) {
		bindings.OpenChannel_set_feerate_per_kw(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if
	 * they broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.OpenChannel_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if
	 * they broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.OpenChannel_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.OpenChannel_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.OpenChannel_set_max_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.OpenChannel_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.OpenChannel_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.OpenChannel_get_revocation_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.OpenChannel_set_revocation_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public byte[] get_payment_point() {
		byte[] ret = bindings.OpenChannel_get_payment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public void set_payment_point(byte[] val) {
		bindings.OpenChannel_set_payment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.OpenChannel_get_delayed_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.OpenChannel_set_delayed_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive an HTLC payment key to sender
	 */
	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.OpenChannel_get_htlc_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive an HTLC payment key to sender
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.OpenChannel_set_htlc_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.OpenChannel_get_first_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.OpenChannel_set_first_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel flags to be used
	 */
	public byte get_channel_flags() {
		byte ret = bindings.OpenChannel_get_channel_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel flags to be used
	 */
	public void set_channel_flags(byte val) {
		bindings.OpenChannel_set_channel_flags(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A request to pre-set the to-sender output's `scriptPubkey` for when we collaboratively close
	 */
	public Option_CVec_u8ZZ get_shutdown_scriptpubkey() {
		long ret = bindings.OpenChannel_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A request to pre-set the to-sender output's `scriptPubkey` for when we collaboratively close
	 */
	public void set_shutdown_scriptpubkey(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.OpenChannel_set_shutdown_scriptpubkey(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The channel type that this channel will represent
	 * 
	 * If this is `None`, we derive the channel type from the intersection of our
	 * feature bits with our counterparty's feature bits from the [`Init`] message.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTypeFeatures get_channel_type() {
		long ret = bindings.OpenChannel_get_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel type that this channel will represent
	 * 
	 * If this is `None`, we derive the channel type from the intersection of our
	 * feature bits with our counterparty's feature bits from the [`Init`] message.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_type(@Nullable org.ldk.structs.ChannelTypeFeatures val) {
		bindings.OpenChannel_set_channel_type(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new OpenChannel given each field
	 * 
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static OpenChannel of(byte[] chain_hash_arg, byte[] temporary_channel_id_arg, long funding_satoshis_arg, long push_msat_arg, long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long channel_reserve_satoshis_arg, long htlc_minimum_msat_arg, int feerate_per_kw_arg, short to_self_delay_arg, short max_accepted_htlcs_arg, byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_point_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg, byte[] first_per_commitment_point_arg, byte channel_flags_arg, org.ldk.structs.Option_CVec_u8ZZ shutdown_scriptpubkey_arg, @Nullable org.ldk.structs.ChannelTypeFeatures channel_type_arg) {
		long ret = bindings.OpenChannel_new(InternalUtils.check_arr_len(chain_hash_arg, 32), InternalUtils.check_arr_len(temporary_channel_id_arg, 32), funding_satoshis_arg, push_msat_arg, dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, channel_reserve_satoshis_arg, htlc_minimum_msat_arg, feerate_per_kw_arg, to_self_delay_arg, max_accepted_htlcs_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33), InternalUtils.check_arr_len(revocation_basepoint_arg, 33), InternalUtils.check_arr_len(payment_point_arg, 33), InternalUtils.check_arr_len(delayed_payment_basepoint_arg, 33), InternalUtils.check_arr_len(htlc_basepoint_arg, 33), InternalUtils.check_arr_len(first_per_commitment_point_arg, 33), channel_flags_arg, shutdown_scriptpubkey_arg.ptr, channel_type_arg == null ? 0 : channel_type_arg.ptr);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(temporary_channel_id_arg);
		Reference.reachabilityFence(funding_satoshis_arg);
		Reference.reachabilityFence(push_msat_arg);
		Reference.reachabilityFence(dust_limit_satoshis_arg);
		Reference.reachabilityFence(max_htlc_value_in_flight_msat_arg);
		Reference.reachabilityFence(channel_reserve_satoshis_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(feerate_per_kw_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(max_accepted_htlcs_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		Reference.reachabilityFence(revocation_basepoint_arg);
		Reference.reachabilityFence(payment_point_arg);
		Reference.reachabilityFence(delayed_payment_basepoint_arg);
		Reference.reachabilityFence(htlc_basepoint_arg);
		Reference.reachabilityFence(first_per_commitment_point_arg);
		Reference.reachabilityFence(channel_flags_arg);
		Reference.reachabilityFence(shutdown_scriptpubkey_arg);
		Reference.reachabilityFence(channel_type_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannel(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(shutdown_scriptpubkey_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_type_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OpenChannel_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OpenChannel
	 */
	public OpenChannel clone() {
		long ret = bindings.OpenChannel_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OpenChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OpenChannel(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OpenChannel.
	 */
	public long hash() {
		long ret = bindings.OpenChannel_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two OpenChannels contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.OpenChannel b) {
		boolean ret = bindings.OpenChannel_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof OpenChannel)) return false;
		return this.eq((OpenChannel)o);
	}
	/**
	 * Serialize the OpenChannel object into a byte array which can be read by OpenChannel_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OpenChannel_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OpenChannel from a byte array, created by OpenChannel_write
	 */
	public static Result_OpenChannelDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OpenChannel_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelDecodeErrorZ ret_hu_conv = Result_OpenChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Contains fields that are both common to [`open_channel`] and [`open_channel2`] messages.
 * 
 * [`open_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel-message
 * [`open_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel2-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommonOpenChannelFields extends CommonBase {
	CommonOpenChannelFields(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommonOpenChannelFields_free(ptr); }
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.CommonOpenChannelFields_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.CommonOpenChannelFields_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A temporary channel ID
	 * For V2 channels: derived using a zeroed out value for the channel acceptor's revocation basepoint
	 * For V1 channels: a temporary channel ID, until the funding outpoint is announced
	 */
	public ChannelId get_temporary_channel_id() {
		long ret = bindings.CommonOpenChannelFields_get_temporary_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * A temporary channel ID
	 * For V2 channels: derived using a zeroed out value for the channel acceptor's revocation basepoint
	 * For V1 channels: a temporary channel ID, until the funding outpoint is announced
	 */
	public void set_temporary_channel_id(org.ldk.structs.ChannelId val) {
		bindings.CommonOpenChannelFields_set_temporary_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * For V1 channels: The channel value
	 * For V2 channels: Part of the channel value contributed by the channel initiator
	 */
	public long get_funding_satoshis() {
		long ret = bindings.CommonOpenChannelFields_get_funding_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * For V1 channels: The channel value
	 * For V2 channels: Part of the channel value contributed by the channel initiator
	 */
	public void set_funding_satoshis(long val) {
		bindings.CommonOpenChannelFields_set_funding_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.CommonOpenChannelFields_get_dust_limit_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel initiator will be
	 * omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.CommonOpenChannelFields_set_dust_limit_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.CommonOpenChannelFields_get_max_htlc_value_in_flight_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards channel initiator, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.CommonOpenChannelFields_set_max_htlc_value_in_flight_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size incoming to channel initiator, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.CommonOpenChannelFields_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to channel initiator, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.CommonOpenChannelFields_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public int get_commitment_feerate_sat_per_1000_weight() {
		int ret = bindings.CommonOpenChannelFields_get_commitment_feerate_sat_per_1000_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The feerate for the commitment transaction set by the channel initiator until updated by
	 * [`UpdateFee`]
	 */
	public void set_commitment_feerate_sat_per_1000_weight(int val) {
		bindings.CommonOpenChannelFields_set_commitment_feerate_sat_per_1000_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.CommonOpenChannelFields_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.CommonOpenChannelFields_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of inbound HTLCs towards channel initiator
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.CommonOpenChannelFields_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards channel initiator
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.CommonOpenChannelFields_set_max_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel initiator's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.CommonOpenChannelFields_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel initiator's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.CommonOpenChannelFields_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.CommonOpenChannelFields_get_revocation_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.CommonOpenChannelFields_set_revocation_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A payment key to channel initiator for transactions broadcast by counterparty
	 */
	public byte[] get_payment_basepoint() {
		byte[] ret = bindings.CommonOpenChannelFields_get_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payment key to channel initiator for transactions broadcast by counterparty
	 */
	public void set_payment_basepoint(byte[] val) {
		bindings.CommonOpenChannelFields_set_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a payment key to channel initiator for transactions broadcast by channel
	 * initiator
	 */
	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.CommonOpenChannelFields_get_delayed_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a payment key to channel initiator for transactions broadcast by channel
	 * initiator
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.CommonOpenChannelFields_set_delayed_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive an HTLC payment key to channel initiator
	 */
	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.CommonOpenChannelFields_get_htlc_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive an HTLC payment key to channel initiator
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.CommonOpenChannelFields_set_htlc_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The first to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.CommonOpenChannelFields_get_first_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The first to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.CommonOpenChannelFields_set_first_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel flags to be used
	 */
	public byte get_channel_flags() {
		byte ret = bindings.CommonOpenChannelFields_get_channel_flags(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel flags to be used
	 */
	public void set_channel_flags(byte val) {
		bindings.CommonOpenChannelFields_set_channel_flags(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Optionally, a request to pre-set the to-channel-initiator output's scriptPubkey for when we
	 * collaboratively close
	 */
	public Option_CVec_u8ZZ get_shutdown_scriptpubkey() {
		long ret = bindings.CommonOpenChannelFields_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Optionally, a request to pre-set the to-channel-initiator output's scriptPubkey for when we
	 * collaboratively close
	 */
	public void set_shutdown_scriptpubkey(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.CommonOpenChannelFields_set_shutdown_scriptpubkey(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel type that this channel will represent. As defined in the latest
	 * specification, this field is required. However, it is an `Option` for legacy reasons.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTypeFeatures get_channel_type() {
		long ret = bindings.CommonOpenChannelFields_get_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel type that this channel will represent. As defined in the latest
	 * specification, this field is required. However, it is an `Option` for legacy reasons.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_type(@Nullable org.ldk.structs.ChannelTypeFeatures val) {
		bindings.CommonOpenChannelFields_set_channel_type(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new CommonOpenChannelFields given each field
	 * 
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static CommonOpenChannelFields of(byte[] chain_hash_arg, org.ldk.structs.ChannelId temporary_channel_id_arg, long funding_satoshis_arg, long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long htlc_minimum_msat_arg, int commitment_feerate_sat_per_1000_weight_arg, short to_self_delay_arg, short max_accepted_htlcs_arg, byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_basepoint_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg, byte[] first_per_commitment_point_arg, byte channel_flags_arg, org.ldk.structs.Option_CVec_u8ZZ shutdown_scriptpubkey_arg, @Nullable org.ldk.structs.ChannelTypeFeatures channel_type_arg) {
		long ret = bindings.CommonOpenChannelFields_new(InternalUtils.check_arr_len(chain_hash_arg, 32), temporary_channel_id_arg.ptr, funding_satoshis_arg, dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, commitment_feerate_sat_per_1000_weight_arg, to_self_delay_arg, max_accepted_htlcs_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33), InternalUtils.check_arr_len(revocation_basepoint_arg, 33), InternalUtils.check_arr_len(payment_basepoint_arg, 33), InternalUtils.check_arr_len(delayed_payment_basepoint_arg, 33), InternalUtils.check_arr_len(htlc_basepoint_arg, 33), InternalUtils.check_arr_len(first_per_commitment_point_arg, 33), channel_flags_arg, shutdown_scriptpubkey_arg.ptr, channel_type_arg == null ? 0 : channel_type_arg.ptr);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(temporary_channel_id_arg);
		Reference.reachabilityFence(funding_satoshis_arg);
		Reference.reachabilityFence(dust_limit_satoshis_arg);
		Reference.reachabilityFence(max_htlc_value_in_flight_msat_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(commitment_feerate_sat_per_1000_weight_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(max_accepted_htlcs_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		Reference.reachabilityFence(revocation_basepoint_arg);
		Reference.reachabilityFence(payment_basepoint_arg);
		Reference.reachabilityFence(delayed_payment_basepoint_arg);
		Reference.reachabilityFence(htlc_basepoint_arg);
		Reference.reachabilityFence(first_per_commitment_point_arg);
		Reference.reachabilityFence(channel_flags_arg);
		Reference.reachabilityFence(shutdown_scriptpubkey_arg);
		Reference.reachabilityFence(channel_type_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonOpenChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonOpenChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.CommonOpenChannelFields_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommonOpenChannelFields
	 */
	public CommonOpenChannelFields clone() {
		long ret = bindings.CommonOpenChannelFields_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonOpenChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonOpenChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommonOpenChannelFields.
	 */
	public long hash() {
		long ret = bindings.CommonOpenChannelFields_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two CommonOpenChannelFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.CommonOpenChannelFields b) {
		boolean ret = bindings.CommonOpenChannelFields_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof CommonOpenChannelFields)) return false;
		return this.eq((CommonOpenChannelFields)o);
	}
	/**
	 * The [`ChannelParameters`] for this channel.
	 */
	public ChannelParameters channel_parameters() {
		long ret = bindings.CommonOpenChannelFields_channel_parameters(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

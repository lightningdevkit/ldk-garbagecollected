package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Contains fields that are both common to [`accept_channel`] and [`accept_channel2`] messages.
 * 
 * [`accept_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel-message
 * [`accept_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel2-message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommonAcceptChannelFields extends CommonBase {
	CommonAcceptChannelFields(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommonAcceptChannelFields_free(ptr); }
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public ChannelId get_temporary_channel_id() {
		long ret = bindings.CommonAcceptChannelFields_get_temporary_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public void set_temporary_channel_id(org.ldk.structs.ChannelId val) {
		bindings.CommonAcceptChannelFields_set_temporary_channel_id(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.CommonAcceptChannelFields_get_dust_limit_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.CommonAcceptChannelFields_set_dust_limit_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.CommonAcceptChannelFields_get_max_htlc_value_in_flight_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.CommonAcceptChannelFields_set_max_htlc_value_in_flight_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.CommonAcceptChannelFields_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.CommonAcceptChannelFields_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public int get_minimum_depth() {
		int ret = bindings.CommonAcceptChannelFields_get_minimum_depth(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public void set_minimum_depth(int val) {
		bindings.CommonAcceptChannelFields_set_minimum_depth(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.CommonAcceptChannelFields_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.CommonAcceptChannelFields_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.CommonAcceptChannelFields_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.CommonAcceptChannelFields_set_max_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.CommonAcceptChannelFields_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_revocation_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_revocation_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public byte[] get_payment_basepoint() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public void set_payment_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_delayed_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_delayed_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_htlc_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_htlc_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.CommonAcceptChannelFields_get_first_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.CommonAcceptChannelFields_set_first_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public Option_CVec_u8ZZ get_shutdown_scriptpubkey() {
		long ret = bindings.CommonAcceptChannelFields_get_shutdown_scriptpubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public void set_shutdown_scriptpubkey(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.CommonAcceptChannelFields_set_shutdown_scriptpubkey(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel type that this channel will represent. As defined in the latest
	 * specification, this field is required. However, it is an `Option` for legacy reasons.
	 * 
	 * This is required to match the equivalent field in [`OpenChannel`] or [`OpenChannelV2`]'s
	 * [`CommonOpenChannelFields::channel_type`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTypeFeatures get_channel_type() {
		long ret = bindings.CommonAcceptChannelFields_get_channel_type(this.ptr);
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
	 * This is required to match the equivalent field in [`OpenChannel`] or [`OpenChannelV2`]'s
	 * [`CommonOpenChannelFields::channel_type`].
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_type(@Nullable org.ldk.structs.ChannelTypeFeatures val) {
		bindings.CommonAcceptChannelFields_set_channel_type(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new CommonAcceptChannelFields given each field
	 * 
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static CommonAcceptChannelFields of(org.ldk.structs.ChannelId temporary_channel_id_arg, long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long htlc_minimum_msat_arg, int minimum_depth_arg, short to_self_delay_arg, short max_accepted_htlcs_arg, byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_basepoint_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg, byte[] first_per_commitment_point_arg, org.ldk.structs.Option_CVec_u8ZZ shutdown_scriptpubkey_arg, @Nullable org.ldk.structs.ChannelTypeFeatures channel_type_arg) {
		long ret = bindings.CommonAcceptChannelFields_new(temporary_channel_id_arg.ptr, dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, minimum_depth_arg, to_self_delay_arg, max_accepted_htlcs_arg, InternalUtils.check_arr_len(funding_pubkey_arg, 33), InternalUtils.check_arr_len(revocation_basepoint_arg, 33), InternalUtils.check_arr_len(payment_basepoint_arg, 33), InternalUtils.check_arr_len(delayed_payment_basepoint_arg, 33), InternalUtils.check_arr_len(htlc_basepoint_arg, 33), InternalUtils.check_arr_len(first_per_commitment_point_arg, 33), shutdown_scriptpubkey_arg.ptr, channel_type_arg == null ? 0 : channel_type_arg.ptr);
		Reference.reachabilityFence(temporary_channel_id_arg);
		Reference.reachabilityFence(dust_limit_satoshis_arg);
		Reference.reachabilityFence(max_htlc_value_in_flight_msat_arg);
		Reference.reachabilityFence(htlc_minimum_msat_arg);
		Reference.reachabilityFence(minimum_depth_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(max_accepted_htlcs_arg);
		Reference.reachabilityFence(funding_pubkey_arg);
		Reference.reachabilityFence(revocation_basepoint_arg);
		Reference.reachabilityFence(payment_basepoint_arg);
		Reference.reachabilityFence(delayed_payment_basepoint_arg);
		Reference.reachabilityFence(htlc_basepoint_arg);
		Reference.reachabilityFence(first_per_commitment_point_arg);
		Reference.reachabilityFence(shutdown_scriptpubkey_arg);
		Reference.reachabilityFence(channel_type_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonAcceptChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonAcceptChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.CommonAcceptChannelFields_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommonAcceptChannelFields
	 */
	public CommonAcceptChannelFields clone() {
		long ret = bindings.CommonAcceptChannelFields_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonAcceptChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonAcceptChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommonAcceptChannelFields.
	 */
	public long hash() {
		long ret = bindings.CommonAcceptChannelFields_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two CommonAcceptChannelFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.CommonAcceptChannelFields b) {
		boolean ret = bindings.CommonAcceptChannelFields_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof CommonAcceptChannelFields)) return false;
		return this.eq((CommonAcceptChannelFields)o);
	}
}

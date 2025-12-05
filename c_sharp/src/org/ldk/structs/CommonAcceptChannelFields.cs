using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Contains fields that are both common to [`accept_channel`] and [`accept_channel2`] messages.
 * 
 * [`accept_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel-message
 * [`accept_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel2-message
 */
public class CommonAcceptChannelFields : CommonBase {
	internal CommonAcceptChannelFields(object _dummy, long ptr) : base(ptr) { }
	~CommonAcceptChannelFields() {
		if (ptr != 0) { bindings.CommonAcceptChannelFields_free(ptr); }
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public org.ldk.structs.ChannelId get_temporary_channel_id() {
		long ret = bindings.CommonAcceptChannelFields_get_temporary_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The same `temporary_channel_id` received from the initiator's `open_channel2` or `open_channel` message.
	 */
	public void set_temporary_channel_id(org.ldk.structs.ChannelId val) {
		bindings.CommonAcceptChannelFields_set_temporary_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.CommonAcceptChannelFields_get_dust_limit_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by the channel acceptor will be
	 * omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.CommonAcceptChannelFields_set_dust_limit_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.CommonAcceptChannelFields_get_max_htlc_value_in_flight_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.CommonAcceptChannelFields_set_max_htlc_value_in_flight_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.CommonAcceptChannelFields_get_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to channel acceptor, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.CommonAcceptChannelFields_set_htlc_minimum_msat(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public int get_minimum_depth() {
		int ret = bindings.CommonAcceptChannelFields_get_minimum_depth(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public void set_minimum_depth(int val) {
		bindings.CommonAcceptChannelFields_set_minimum_depth(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.CommonAcceptChannelFields_get_to_self_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they
	 * broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.CommonAcceptChannelFields_set_to_self_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.CommonAcceptChannelFields_get_max_accepted_htlcs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards channel acceptor
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.CommonAcceptChannelFields_set_max_accepted_htlcs(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		long ret = bindings.CommonAcceptChannelFields_get_funding_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel acceptor's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.CommonAcceptChannelFields_set_funding_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		long ret = bindings.CommonAcceptChannelFields_get_revocation_basepoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_revocation_basepoint(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public byte[] get_payment_basepoint() {
		long ret = bindings.CommonAcceptChannelFields_get_payment_basepoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public void set_payment_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_payment_basepoint(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public byte[] get_delayed_payment_basepoint() {
		long ret = bindings.CommonAcceptChannelFields_get_delayed_payment_basepoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive a payment key to channel acceptor for transactions broadcast by channel
	 * acceptor
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_delayed_payment_basepoint(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public byte[] get_htlc_basepoint() {
		long ret = bindings.CommonAcceptChannelFields_get_htlc_basepoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used to derive an HTLC payment key to channel acceptor for transactions broadcast by counterparty
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.CommonAcceptChannelFields_set_htlc_basepoint(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		long ret = bindings.CommonAcceptChannelFields_get_first_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The first to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.CommonAcceptChannelFields_set_first_per_commitment_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public org.ldk.structs.Option_CVec_u8ZZ get_shutdown_scriptpubkey() {
		long ret = bindings.CommonAcceptChannelFields_get_shutdown_scriptpubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Optionally, a request to pre-set the to-channel-acceptor output's scriptPubkey for when we
	 * collaboratively close
	 */
	public void set_shutdown_scriptpubkey(org.ldk.structs.Option_CVec_u8ZZ val) {
		bindings.CommonAcceptChannelFields_set_shutdown_scriptpubkey(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
	public org.ldk.structs.ChannelTypeFeatures get_channel_type() {
		long ret = bindings.CommonAcceptChannelFields_get_channel_type(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public void set_channel_type(org.ldk.structs.ChannelTypeFeatures val) {
		bindings.CommonAcceptChannelFields_set_channel_type(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new CommonAcceptChannelFields given each field
	 * 
	 * Note that channel_type_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.CommonAcceptChannelFields of(org.ldk.structs.ChannelId temporary_channel_id_arg, long dust_limit_satoshis_arg, long max_htlc_value_in_flight_msat_arg, long htlc_minimum_msat_arg, int minimum_depth_arg, short to_self_delay_arg, short max_accepted_htlcs_arg, byte[] funding_pubkey_arg, byte[] revocation_basepoint_arg, byte[] payment_basepoint_arg, byte[] delayed_payment_basepoint_arg, byte[] htlc_basepoint_arg, byte[] first_per_commitment_point_arg, org.ldk.structs.Option_CVec_u8ZZ shutdown_scriptpubkey_arg, org.ldk.structs.ChannelTypeFeatures channel_type_arg) {
		long ret = bindings.CommonAcceptChannelFields_new(temporary_channel_id_arg.ptr, dust_limit_satoshis_arg, max_htlc_value_in_flight_msat_arg, htlc_minimum_msat_arg, minimum_depth_arg, to_self_delay_arg, max_accepted_htlcs_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_pubkey_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(revocation_basepoint_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_basepoint_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(delayed_payment_basepoint_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(htlc_basepoint_arg, 33)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(first_per_commitment_point_arg, 33)), shutdown_scriptpubkey_arg.ptr, channel_type_arg == null ? 0 : channel_type_arg.ptr);
		GC.KeepAlive(temporary_channel_id_arg);
		GC.KeepAlive(dust_limit_satoshis_arg);
		GC.KeepAlive(max_htlc_value_in_flight_msat_arg);
		GC.KeepAlive(htlc_minimum_msat_arg);
		GC.KeepAlive(minimum_depth_arg);
		GC.KeepAlive(to_self_delay_arg);
		GC.KeepAlive(max_accepted_htlcs_arg);
		GC.KeepAlive(funding_pubkey_arg);
		GC.KeepAlive(revocation_basepoint_arg);
		GC.KeepAlive(payment_basepoint_arg);
		GC.KeepAlive(delayed_payment_basepoint_arg);
		GC.KeepAlive(htlc_basepoint_arg);
		GC.KeepAlive(first_per_commitment_point_arg);
		GC.KeepAlive(shutdown_scriptpubkey_arg);
		GC.KeepAlive(channel_type_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonAcceptChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonAcceptChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.CommonAcceptChannelFields_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CommonAcceptChannelFields
	 */
	public org.ldk.structs.CommonAcceptChannelFields clone() {
		long ret = bindings.CommonAcceptChannelFields_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CommonAcceptChannelFields ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CommonAcceptChannelFields(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommonAcceptChannelFields.
	 */
	public long hash() {
		long ret = bindings.CommonAcceptChannelFields_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two CommonAcceptChannelFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.CommonAcceptChannelFields b) {
		bool ret = bindings.CommonAcceptChannelFields_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is CommonAcceptChannelFields)) return false;
		return this.eq((CommonAcceptChannelFields)o);
	}
}
} } }

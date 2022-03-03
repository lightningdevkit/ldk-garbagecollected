package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An accept_channel message to be sent or received from a peer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AcceptChannel extends CommonBase {
	AcceptChannel(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AcceptChannel_free(ptr); }
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.AcceptChannel_get_temporary_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public void set_temporary_channel_id(byte[] val) {
		bindings.AcceptChannel_set_temporary_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.AcceptChannel_get_dust_limit_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.AcceptChannel_set_dust_limit_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.AcceptChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.AcceptChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public long get_channel_reserve_satoshis() {
		long ret = bindings.AcceptChannel_get_channel_reserve_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public void set_channel_reserve_satoshis(long val) {
		bindings.AcceptChannel_set_channel_reserve_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.AcceptChannel_get_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.AcceptChannel_set_htlc_minimum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public int get_minimum_depth() {
		int ret = bindings.AcceptChannel_get_minimum_depth(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Minimum depth of the funding transaction before the channel is considered open
	 */
	public void set_minimum_depth(int val) {
		bindings.AcceptChannel_set_minimum_depth(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.AcceptChannel_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.AcceptChannel_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.AcceptChannel_get_max_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.AcceptChannel_set_max_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.AcceptChannel_get_funding_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.AcceptChannel_set_funding_pubkey(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_revocation_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.AcceptChannel_set_revocation_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public byte[] get_payment_point() {
		byte[] ret = bindings.AcceptChannel_get_payment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public void set_payment_point(byte[] val) {
		bindings.AcceptChannel_set_payment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_delayed_payment_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.AcceptChannel_set_delayed_payment_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Used to derive an HTLC payment key to sender for transactions broadcast by counterparty
	 */
	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.AcceptChannel_get_htlc_basepoint(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used to derive an HTLC payment key to sender for transactions broadcast by counterparty
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.AcceptChannel_set_htlc_basepoint(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.AcceptChannel_get_first_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.AcceptChannel_set_first_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The channel type that this channel will represent. If none is set, we derive the channel
	 * type from the intersection of our feature bits with our counterparty's feature bits from
	 * the Init message.
	 * 
	 * This is required to match the equivalent field in [`OpenChannel::channel_type`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTypeFeatures get_channel_type() {
		long ret = bindings.AcceptChannel_get_channel_type(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelTypeFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The channel type that this channel will represent. If none is set, we derive the channel
	 * type from the intersection of our feature bits with our counterparty's feature bits from
	 * the Init message.
	 * 
	 * This is required to match the equivalent field in [`OpenChannel::channel_type`].
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_type(@Nullable ChannelTypeFeatures val) {
		bindings.AcceptChannel_set_channel_type(this.ptr, val == null ? 0 : val.ptr & ~1);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.AcceptChannel_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AcceptChannel
	 */
	public AcceptChannel clone() {
		long ret = bindings.AcceptChannel_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		AcceptChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new AcceptChannel(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the AcceptChannel object into a byte array which can be read by AcceptChannel_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AcceptChannel_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a AcceptChannel from a byte array, created by AcceptChannel_write
	 */
	public static Result_AcceptChannelDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AcceptChannel_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AcceptChannelDecodeErrorZ ret_hu_conv = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * An open_channel message to be sent or received from a peer
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
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.OpenChannel_set_chain_hash(this.ptr, val);
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public byte[] get_temporary_channel_id() {
		byte[] ret = bindings.OpenChannel_get_temporary_channel_id(this.ptr);
		return ret;
	}

	/**
	 * A temporary channel ID, until the funding outpoint is announced
	 */
	public void set_temporary_channel_id(byte[] val) {
		bindings.OpenChannel_set_temporary_channel_id(this.ptr, val);
	}

	/**
	 * The channel value
	 */
	public long get_funding_satoshis() {
		long ret = bindings.OpenChannel_get_funding_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The channel value
	 */
	public void set_funding_satoshis(long val) {
		bindings.OpenChannel_set_funding_satoshis(this.ptr, val);
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public long get_push_msat() {
		long ret = bindings.OpenChannel_get_push_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public void set_push_msat(long val) {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public long get_dust_limit_satoshis() {
		long ret = bindings.OpenChannel_get_dust_limit_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The threshold below which outputs on transactions broadcast by sender will be omitted
	 */
	public void set_dust_limit_satoshis(long val) {
		bindings.OpenChannel_set_dust_limit_satoshis(this.ptr, val);
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public long get_max_htlc_value_in_flight_msat() {
		long ret = bindings.OpenChannel_get_max_htlc_value_in_flight_msat(this.ptr);
		return ret;
	}

	/**
	 * The maximum inbound HTLC value in flight towards sender, in milli-satoshi
	 */
	public void set_max_htlc_value_in_flight_msat(long val) {
		bindings.OpenChannel_set_max_htlc_value_in_flight_msat(this.ptr, val);
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public long get_channel_reserve_satoshis() {
		long ret = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public void set_channel_reserve_satoshis(long val) {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public long get_htlc_minimum_msat() {
		long ret = bindings.OpenChannel_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * The minimum HTLC size incoming to sender, in milli-satoshi
	 */
	public void set_htlc_minimum_msat(long val) {
		bindings.OpenChannel_set_htlc_minimum_msat(this.ptr, val);
	}

	/**
	 * The feerate per 1000-weight of sender generated transactions, until updated by update_fee
	 */
	public int get_feerate_per_kw() {
		int ret = bindings.OpenChannel_get_feerate_per_kw(this.ptr);
		return ret;
	}

	/**
	 * The feerate per 1000-weight of sender generated transactions, until updated by update_fee
	 */
	public void set_feerate_per_kw(int val) {
		bindings.OpenChannel_set_feerate_per_kw(this.ptr, val);
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they broadcast a commitment transaction
	 */
	public short get_to_self_delay() {
		short ret = bindings.OpenChannel_get_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * The number of blocks which the counterparty will have to wait to claim on-chain funds if they broadcast a commitment transaction
	 */
	public void set_to_self_delay(short val) {
		bindings.OpenChannel_set_to_self_delay(this.ptr, val);
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public short get_max_accepted_htlcs() {
		short ret = bindings.OpenChannel_get_max_accepted_htlcs(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of inbound HTLCs towards sender
	 */
	public void set_max_accepted_htlcs(short val) {
		bindings.OpenChannel_set_max_accepted_htlcs(this.ptr, val);
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public byte[] get_funding_pubkey() {
		byte[] ret = bindings.OpenChannel_get_funding_pubkey(this.ptr);
		return ret;
	}

	/**
	 * The sender's key controlling the funding transaction
	 */
	public void set_funding_pubkey(byte[] val) {
		bindings.OpenChannel_set_funding_pubkey(this.ptr, val);
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public byte[] get_revocation_basepoint() {
		byte[] ret = bindings.OpenChannel_get_revocation_basepoint(this.ptr);
		return ret;
	}

	/**
	 * Used to derive a revocation key for transactions broadcast by counterparty
	 */
	public void set_revocation_basepoint(byte[] val) {
		bindings.OpenChannel_set_revocation_basepoint(this.ptr, val);
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public byte[] get_payment_point() {
		byte[] ret = bindings.OpenChannel_get_payment_point(this.ptr);
		return ret;
	}

	/**
	 * A payment key to sender for transactions broadcast by counterparty
	 */
	public void set_payment_point(byte[] val) {
		bindings.OpenChannel_set_payment_point(this.ptr, val);
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public byte[] get_delayed_payment_basepoint() {
		byte[] ret = bindings.OpenChannel_get_delayed_payment_basepoint(this.ptr);
		return ret;
	}

	/**
	 * Used to derive a payment key to sender for transactions broadcast by sender
	 */
	public void set_delayed_payment_basepoint(byte[] val) {
		bindings.OpenChannel_set_delayed_payment_basepoint(this.ptr, val);
	}

	/**
	 * Used to derive an HTLC payment key to sender
	 */
	public byte[] get_htlc_basepoint() {
		byte[] ret = bindings.OpenChannel_get_htlc_basepoint(this.ptr);
		return ret;
	}

	/**
	 * Used to derive an HTLC payment key to sender
	 */
	public void set_htlc_basepoint(byte[] val) {
		bindings.OpenChannel_set_htlc_basepoint(this.ptr, val);
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public byte[] get_first_per_commitment_point() {
		byte[] ret = bindings.OpenChannel_get_first_per_commitment_point(this.ptr);
		return ret;
	}

	/**
	 * The first to-be-broadcast-by-sender transaction's per commitment point
	 */
	public void set_first_per_commitment_point(byte[] val) {
		bindings.OpenChannel_set_first_per_commitment_point(this.ptr, val);
	}

	/**
	 * Channel flags
	 */
	public byte get_channel_flags() {
		byte ret = bindings.OpenChannel_get_channel_flags(this.ptr);
		return ret;
	}

	/**
	 * Channel flags
	 */
	public void set_channel_flags(byte val) {
		bindings.OpenChannel_set_channel_flags(this.ptr, val);
	}

	/**
	 * Creates a copy of the OpenChannel
	 */
	public OpenChannel clone() {
		long ret = bindings.OpenChannel_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		OpenChannel ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OpenChannel(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OpenChannel object into a byte array which can be read by OpenChannel_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OpenChannel_write(this.ptr);
		return ret;
	}

	/**
	 * Read a OpenChannel from a byte array, created by OpenChannel_write
	 */
	public static Result_OpenChannelDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OpenChannel_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelDecodeErrorZ ret_hu_conv = Result_OpenChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

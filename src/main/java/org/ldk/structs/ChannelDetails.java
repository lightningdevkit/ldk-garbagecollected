package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


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
		return ret;
	}

	/**
	 * The channel's ID (prior to funding transaction generation, this is a random 32 bytes,
	 * thereafter this is the txid of the funding transaction xor the funding transaction output).
	 * Note that this means this value is *not* persistent - it can change once during the
	 * lifetime of the channel.
	 */
	public void set_channel_id(byte[] val) {
		bindings.ChannelDetails_set_channel_id(this.ptr, val);
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * Note that, if this has been set, `channel_id` will be equivalent to
	 * `funding_txo.unwrap().to_channel_id()`.
	 */
	public OutPoint get_funding_txo() {
		long ret = bindings.ChannelDetails_get_funding_txo(this.ptr);
		OutPoint ret_hu_conv = new OutPoint(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The Channel's funding transaction output, if we've negotiated the funding transaction with
	 * our counterparty already.
	 * 
	 * Note that, if this has been set, `channel_id` will be equivalent to
	 * `funding_txo.unwrap().to_channel_id()`.
	 */
	public void set_funding_txo(OutPoint val) {
		bindings.ChannelDetails_set_funding_txo(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * The position of the funding transaction in the chain. None if the funding transaction has
	 * not yet been confirmed and the channel fully opened.
	 */
	public Option_u64Z get_short_channel_id() {
		long ret = bindings.ChannelDetails_get_short_channel_id(this.ptr);
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
	}

	/**
	 * The node_id of our counterparty
	 */
	public byte[] get_remote_network_id() {
		byte[] ret = bindings.ChannelDetails_get_remote_network_id(this.ptr);
		return ret;
	}

	/**
	 * The node_id of our counterparty
	 */
	public void set_remote_network_id(byte[] val) {
		bindings.ChannelDetails_set_remote_network_id(this.ptr, val);
	}

	/**
	 * The Features the channel counterparty provided upon last connection.
	 * Useful for routing as it is the most up-to-date copy of the counterparty's features and
	 * many routing-relevant features are present in the init context.
	 */
	public InitFeatures get_counterparty_features() {
		long ret = bindings.ChannelDetails_get_counterparty_features(this.ptr);
		InitFeatures ret_hu_conv = new InitFeatures(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The Features the channel counterparty provided upon last connection.
	 * Useful for routing as it is the most up-to-date copy of the counterparty's features and
	 * many routing-relevant features are present in the init context.
	 */
	public void set_counterparty_features(InitFeatures val) {
		bindings.ChannelDetails_set_counterparty_features(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.ChannelDetails_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value, in satoshis, of this channel as appears in the funding output
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.ChannelDetails_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * The user_id passed in to create_channel, or 0 if the channel was inbound.
	 */
	public long get_user_id() {
		long ret = bindings.ChannelDetails_get_user_id(this.ptr);
		return ret;
	}

	/**
	 * The user_id passed in to create_channel, or 0 if the channel was inbound.
	 */
	public void set_user_id(long val) {
		bindings.ChannelDetails_set_user_id(this.ptr, val);
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, who's balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 */
	public long get_outbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_outbound_capacity_msat(this.ptr);
		return ret;
	}

	/**
	 * The available outbound capacity for sending HTLCs to the remote peer. This does not include
	 * any pending HTLCs which are not yet fully resolved (and, thus, who's balance is not
	 * available for inclusion in new outbound HTLCs). This further does not include any pending
	 * outgoing HTLCs which are awaiting some other resolution to be sent.
	 */
	public void set_outbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_outbound_capacity_msat(this.ptr, val);
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, who's balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 */
	public long get_inbound_capacity_msat() {
		long ret = bindings.ChannelDetails_get_inbound_capacity_msat(this.ptr);
		return ret;
	}

	/**
	 * The available inbound capacity for the remote peer to send HTLCs to us. This does not
	 * include any pending HTLCs which are not yet fully resolved (and, thus, who's balance is not
	 * available for inclusion in new inbound HTLCs).
	 * Note that there are some corner cases not fully handled here, so the actual available
	 * inbound capacity may be slightly higher than this.
	 */
	public void set_inbound_capacity_msat(long val) {
		bindings.ChannelDetails_set_inbound_capacity_msat(this.ptr, val);
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public boolean get_is_outbound() {
		boolean ret = bindings.ChannelDetails_get_is_outbound(this.ptr);
		return ret;
	}

	/**
	 * True if the channel was initiated (and thus funded) by us.
	 */
	public void set_is_outbound(boolean val) {
		bindings.ChannelDetails_set_is_outbound(this.ptr, val);
	}

	/**
	 * True if the channel is confirmed, funding_locked messages have been exchanged, and the
	 * channel is not currently being shut down. `funding_locked` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations).
	 */
	public boolean get_is_funding_locked() {
		boolean ret = bindings.ChannelDetails_get_is_funding_locked(this.ptr);
		return ret;
	}

	/**
	 * True if the channel is confirmed, funding_locked messages have been exchanged, and the
	 * channel is not currently being shut down. `funding_locked` message exchange implies the
	 * required confirmation count has been reached (and we were connected to the peer at some
	 * point after the funding transaction received enough confirmations).
	 */
	public void set_is_funding_locked(boolean val) {
		bindings.ChannelDetails_set_is_funding_locked(this.ptr, val);
	}

	/**
	 * True if the channel is (a) confirmed and funding_locked messages have been exchanged, (b)
	 * the peer is connected, (c) no monitor update failure is pending resolution, and (d) the
	 * channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_funding_locked`.
	 */
	public boolean get_is_usable() {
		boolean ret = bindings.ChannelDetails_get_is_usable(this.ptr);
		return ret;
	}

	/**
	 * True if the channel is (a) confirmed and funding_locked messages have been exchanged, (b)
	 * the peer is connected, (c) no monitor update failure is pending resolution, and (d) the
	 * channel is not currently negotiating a shutdown.
	 * 
	 * This is a strict superset of `is_funding_locked`.
	 */
	public void set_is_usable(boolean val) {
		bindings.ChannelDetails_set_is_usable(this.ptr, val);
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public boolean get_is_public() {
		boolean ret = bindings.ChannelDetails_get_is_public(this.ptr);
		return ret;
	}

	/**
	 * True if this channel is (or will be) publicly-announced.
	 */
	public void set_is_public(boolean val) {
		bindings.ChannelDetails_set_is_public(this.ptr, val);
	}

	/**
	 * Creates a copy of the ChannelDetails
	 */
	public ChannelDetails clone() {
		long ret = bindings.ChannelDetails_clone(this.ptr);
		ChannelDetails ret_hu_conv = new ChannelDetails(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

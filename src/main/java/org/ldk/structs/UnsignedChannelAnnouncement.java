package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * The unsigned part of a channel_announcement
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedChannelAnnouncement extends CommonBase {
	UnsignedChannelAnnouncement(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedChannelAnnouncement_free(ptr); }
	}

	/**
	 * The advertised channel features
	 */
	public ChannelFeatures get_features() {
		long ret = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelFeatures(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The advertised channel features
	 */
	public void set_features(ChannelFeatures val) {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr & ~1);
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
	}

	/**
	 * The short channel ID
	 */
	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
	}

	/**
	 * One of the two node_ids which are endpoints of this channel
	 */
	public byte[] get_node_id_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		return ret;
	}

	/**
	 * One of the two node_ids which are endpoints of this channel
	 */
	public void set_node_id_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	/**
	 * The other of the two node_ids which are endpoints of this channel
	 */
	public byte[] get_node_id_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		return ret;
	}

	/**
	 * The other of the two node_ids which are endpoints of this channel
	 */
	public void set_node_id_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	/**
	 * The funding key for the first node
	 */
	public byte[] get_bitcoin_key_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		return ret;
	}

	/**
	 * The funding key for the first node
	 */
	public void set_bitcoin_key_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	/**
	 * The funding key for the second node
	 */
	public byte[] get_bitcoin_key_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		return ret;
	}

	/**
	 * The funding key for the second node
	 */
	public void set_bitcoin_key_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, InternalUtils.check_arr_len(val, 33));
	}

	long clone_ptr() {
		long ret = bindings.UnsignedChannelAnnouncement_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelAnnouncement
	 */
	public UnsignedChannelAnnouncement clone() {
		long ret = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UnsignedChannelAnnouncement(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnsignedChannelAnnouncement object into a byte array which can be read by UnsignedChannelAnnouncement_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		return ret;
	}

	/**
	 * Read a UnsignedChannelAnnouncement from a byte array, created by UnsignedChannelAnnouncement_write
	 */
	public static Result_UnsignedChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

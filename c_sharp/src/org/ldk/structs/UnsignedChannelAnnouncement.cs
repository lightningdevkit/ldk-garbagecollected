using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The unsigned part of a channel_announcement
 */
public class UnsignedChannelAnnouncement : CommonBase {
	internal UnsignedChannelAnnouncement(object _dummy, long ptr) : base(ptr) { }
	~UnsignedChannelAnnouncement() {
		if (ptr != 0) { bindings.UnsignedChannelAnnouncement_free(ptr); }
	}

	/**
	 * The advertised channel features
	 */
	public ChannelFeatures get_features() {
		long ret = bindings.UnsignedChannelAnnouncement_get_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The advertised channel features
	 */
	public void set_features(org.ldk.structs.ChannelFeatures val) {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The short channel ID
	 */
	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * One of the two node_ids which are endpoints of this channel
	 */
	public byte[] get_node_id_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * One of the two node_ids which are endpoints of this channel
	 */
	public void set_node_id_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The other of the two node_ids which are endpoints of this channel
	 */
	public byte[] get_node_id_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The other of the two node_ids which are endpoints of this channel
	 */
	public void set_node_id_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The funding key for the first node
	 */
	public byte[] get_bitcoin_key_1() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The funding key for the first node
	 */
	public void set_bitcoin_key_1(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The funding key for the second node
	 */
	public byte[] get_bitcoin_key_2() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The funding key for the second node
	 */
	public void set_bitcoin_key_2(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.UnsignedChannelAnnouncement_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelAnnouncement
	 */
	public UnsignedChannelAnnouncement clone() {
		long ret = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UnsignedChannelAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.UnsignedChannelAnnouncement b) {
		bool ret = bindings.UnsignedChannelAnnouncement_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is UnsignedChannelAnnouncement)) return false;
		return this.eq((UnsignedChannelAnnouncement)o);
	}
	/**
	 * Serialize the UnsignedChannelAnnouncement object into a byte array which can be read by UnsignedChannelAnnouncement_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a UnsignedChannelAnnouncement from a byte array, created by UnsignedChannelAnnouncement_write
	 */
	public static Result_UnsignedChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

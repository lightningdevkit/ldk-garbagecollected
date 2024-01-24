using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The unsigned part of a [`channel_announcement`] message.
 * 
 * [`channel_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_announcement-message
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
		long ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
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
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public NodeId get_node_id_1() {
		long ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public void set_node_id_1(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public NodeId get_node_id_2() {
		long ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public void set_node_id_2(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The funding key for the first node
	 */
	public NodeId get_bitcoin_key_1() {
		long ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The funding key for the first node
	 */
	public void set_bitcoin_key_1(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The funding key for the second node
	 */
	public NodeId get_bitcoin_key_2() {
		long ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The funding key for the second node
	 */
	public void set_bitcoin_key_2(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new fields are added to the lightning gossip protocol.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_excess_data() {
		long ret = bindings.UnsignedChannelAnnouncement_get_excess_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new fields are added to the lightning gossip protocol.
	 */
	public void set_excess_data(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_excess_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new UnsignedChannelAnnouncement given each field
	 */
	public static UnsignedChannelAnnouncement of(org.ldk.structs.ChannelFeatures features_arg, byte[] chain_hash_arg, long short_channel_id_arg, org.ldk.structs.NodeId node_id_1_arg, org.ldk.structs.NodeId node_id_2_arg, org.ldk.structs.NodeId bitcoin_key_1_arg, org.ldk.structs.NodeId bitcoin_key_2_arg, byte[] excess_data_arg) {
		long ret = bindings.UnsignedChannelAnnouncement_new(features_arg == null ? 0 : features_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(chain_hash_arg, 32)), short_channel_id_arg, node_id_1_arg == null ? 0 : node_id_1_arg.ptr, node_id_2_arg == null ? 0 : node_id_2_arg.ptr, bitcoin_key_1_arg == null ? 0 : bitcoin_key_1_arg.ptr, bitcoin_key_2_arg == null ? 0 : bitcoin_key_2_arg.ptr, InternalUtils.encodeUint8Array(excess_data_arg));
		GC.KeepAlive(features_arg);
		GC.KeepAlive(chain_hash_arg);
		GC.KeepAlive(short_channel_id_arg);
		GC.KeepAlive(node_id_1_arg);
		GC.KeepAlive(node_id_2_arg);
		GC.KeepAlive(bitcoin_key_1_arg);
		GC.KeepAlive(bitcoin_key_2_arg);
		GC.KeepAlive(excess_data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(node_id_1_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(node_id_2_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(bitcoin_key_1_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(bitcoin_key_2_arg); };
		return ret_hu_conv;
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
	 * Generates a non-cryptographic 64-bit hash of the UnsignedChannelAnnouncement.
	 */
	public long hash() {
		long ret = bindings.UnsignedChannelAnnouncement_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
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
		long ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UnsignedChannelAnnouncement from a byte array, created by UnsignedChannelAnnouncement_write
	 */
	public static Result_UnsignedChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

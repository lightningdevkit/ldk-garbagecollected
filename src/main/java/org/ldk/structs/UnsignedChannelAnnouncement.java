package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The unsigned part of a [`channel_announcement`] message.
 * 
 * [`channel_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_announcement-message
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The advertised channel features
	 */
	public void set_features(org.ldk.structs.ChannelFeatures val) {
		bindings.UnsignedChannelAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_chain_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The genesis hash of the blockchain where the channel is to be opened
	 */
	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_chain_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The short channel ID
	 */
	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelAnnouncement_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The short channel ID
	 */
	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelAnnouncement_set_short_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public NodeId get_node_id_1() {
		long ret = bindings.UnsignedChannelAnnouncement_get_node_id_1(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * One of the two `node_id`s which are endpoints of this channel
	 */
	public void set_node_id_1(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_1(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public NodeId get_node_id_2() {
		long ret = bindings.UnsignedChannelAnnouncement_get_node_id_2(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The other of the two `node_id`s which are endpoints of this channel
	 */
	public void set_node_id_2(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_node_id_2(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The funding key for the first node
	 */
	public NodeId get_bitcoin_key_1() {
		long ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_1(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The funding key for the first node
	 */
	public void set_bitcoin_key_1(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_1(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The funding key for the second node
	 */
	public NodeId get_bitcoin_key_2() {
		long ret = bindings.UnsignedChannelAnnouncement_get_bitcoin_key_2(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The funding key for the second node
	 */
	public void set_bitcoin_key_2(org.ldk.structs.NodeId val) {
		bindings.UnsignedChannelAnnouncement_set_bitcoin_key_2(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
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
		byte[] ret = bindings.UnsignedChannelAnnouncement_get_excess_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Excess data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new fields are added to the lightning gossip protocol.
	 */
	public void set_excess_data(byte[] val) {
		bindings.UnsignedChannelAnnouncement_set_excess_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new UnsignedChannelAnnouncement given each field
	 */
	public static UnsignedChannelAnnouncement of(org.ldk.structs.ChannelFeatures features_arg, byte[] chain_hash_arg, long short_channel_id_arg, org.ldk.structs.NodeId node_id_1_arg, org.ldk.structs.NodeId node_id_2_arg, org.ldk.structs.NodeId bitcoin_key_1_arg, org.ldk.structs.NodeId bitcoin_key_2_arg, byte[] excess_data_arg) {
		long ret = bindings.UnsignedChannelAnnouncement_new(features_arg == null ? 0 : features_arg.ptr, InternalUtils.check_arr_len(chain_hash_arg, 32), short_channel_id_arg, node_id_1_arg == null ? 0 : node_id_1_arg.ptr, node_id_2_arg == null ? 0 : node_id_2_arg.ptr, bitcoin_key_1_arg == null ? 0 : bitcoin_key_1_arg.ptr, bitcoin_key_2_arg == null ? 0 : bitcoin_key_2_arg.ptr, excess_data_arg);
		Reference.reachabilityFence(features_arg);
		Reference.reachabilityFence(chain_hash_arg);
		Reference.reachabilityFence(short_channel_id_arg);
		Reference.reachabilityFence(node_id_1_arg);
		Reference.reachabilityFence(node_id_2_arg);
		Reference.reachabilityFence(bitcoin_key_1_arg);
		Reference.reachabilityFence(bitcoin_key_2_arg);
		Reference.reachabilityFence(excess_data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(features_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_1_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_id_2_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(bitcoin_key_1_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(bitcoin_key_2_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.UnsignedChannelAnnouncement_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedChannelAnnouncement
	 */
	public UnsignedChannelAnnouncement clone() {
		long ret = bindings.UnsignedChannelAnnouncement_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UnsignedChannelAnnouncement.
	 */
	public long hash() {
		long ret = bindings.UnsignedChannelAnnouncement_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two UnsignedChannelAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.UnsignedChannelAnnouncement b) {
		boolean ret = bindings.UnsignedChannelAnnouncement_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof UnsignedChannelAnnouncement)) return false;
		return this.eq((UnsignedChannelAnnouncement)o);
	}
	/**
	 * Serialize the UnsignedChannelAnnouncement object into a byte array which can be read by UnsignedChannelAnnouncement_read
	 */
	public byte[] write() {
		byte[] ret = bindings.UnsignedChannelAnnouncement_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a UnsignedChannelAnnouncement from a byte array, created by UnsignedChannelAnnouncement_write
	 */
	public static Result_UnsignedChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedChannelAnnouncement_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

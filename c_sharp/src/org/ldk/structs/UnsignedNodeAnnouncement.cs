using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The unsigned part of a [`node_announcement`] message.
 * 
 * [`node_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-node_announcement-message
 */
public class UnsignedNodeAnnouncement : CommonBase {
	internal UnsignedNodeAnnouncement(object _dummy, long ptr) : base(ptr) { }
	~UnsignedNodeAnnouncement() {
		if (ptr != 0) { bindings.UnsignedNodeAnnouncement_free(ptr); }
	}

	/**
	 * The advertised features
	 */
	public org.ldk.structs.NodeFeatures get_features() {
		long ret = bindings.UnsignedNodeAnnouncement_get_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The advertised features
	 */
	public void set_features(org.ldk.structs.NodeFeatures val) {
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed
	 */
	public int get_timestamp() {
		int ret = bindings.UnsignedNodeAnnouncement_get_timestamp(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A strictly monotonic announcement counter, with gaps allowed
	 */
	public void set_timestamp(int val) {
		bindings.UnsignedNodeAnnouncement_set_timestamp(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The `node_id` this announcement originated from (don't rebroadcast the `node_announcement` back
	 * to this node).
	 */
	public org.ldk.structs.NodeId get_node_id() {
		long ret = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The `node_id` this announcement originated from (don't rebroadcast the `node_announcement` back
	 * to this node).
	 */
	public void set_node_id(org.ldk.structs.NodeId val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * An RGB color for UI purposes
	 */
	public byte[] get_rgb() {
		long ret = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An RGB color for UI purposes
	 */
	public void set_rgb(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 3)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * An alias, for UI purposes.
	 * 
	 * This should be sanitized before use. There is no guarantee of uniqueness.
	 */
	public org.ldk.structs.NodeAlias get_alias() {
		long ret = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeAlias ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeAlias(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * An alias, for UI purposes.
	 * 
	 * This should be sanitized before use. There is no guarantee of uniqueness.
	 */
	public void set_alias(org.ldk.structs.NodeAlias val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * List of addresses on which this node is reachable
	 * 
	 * Returns a copy of the field.
	 */
	public SocketAddress[] get_addresses() {
		long ret = bindings.UnsignedNodeAnnouncement_get_addresses(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_15_len = InternalUtils.getArrayLength(ret);
		SocketAddress[] ret_conv_15_arr = new SocketAddress[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = InternalUtils.getU64ArrayElem(ret, p);
			org.ldk.structs.SocketAddress ret_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret_conv_15);
			if (ret_conv_15_hu_conv != null) { ret_conv_15_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_15_arr;
	}

	/**
	 * List of addresses on which this node is reachable
	 */
	public void set_addresses(SocketAddress[] val) {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(val, val_conv_15 => val_conv_15.ptr)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Excess address data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new address types are added to the lightning gossip protocol.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_excess_address_data() {
		long ret = bindings.UnsignedNodeAnnouncement_get_excess_address_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Excess address data which was signed as a part of the message which we do not (yet) understand how
	 * to decode.
	 * 
	 * This is stored to ensure forward-compatibility as new address types are added to the lightning gossip protocol.
	 */
	public void set_excess_address_data(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_excess_address_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
		long ret = bindings.UnsignedNodeAnnouncement_get_excess_data(this.ptr);
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
		bindings.UnsignedNodeAnnouncement_set_excess_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new UnsignedNodeAnnouncement given each field
	 */
	public static org.ldk.structs.UnsignedNodeAnnouncement of(org.ldk.structs.NodeFeatures features_arg, int timestamp_arg, org.ldk.structs.NodeId node_id_arg, byte[] rgb_arg, org.ldk.structs.NodeAlias alias_arg, SocketAddress[] addresses_arg, byte[] excess_address_data_arg, byte[] excess_data_arg) {
		long ret = bindings.UnsignedNodeAnnouncement_new(features_arg.ptr, timestamp_arg, node_id_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(rgb_arg, 3)), alias_arg.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(addresses_arg, addresses_arg_conv_15 => addresses_arg_conv_15.ptr)), InternalUtils.encodeUint8Array(excess_address_data_arg), InternalUtils.encodeUint8Array(excess_data_arg));
		GC.KeepAlive(features_arg);
		GC.KeepAlive(timestamp_arg);
		GC.KeepAlive(node_id_arg);
		GC.KeepAlive(rgb_arg);
		GC.KeepAlive(alias_arg);
		GC.KeepAlive(addresses_arg);
		GC.KeepAlive(excess_address_data_arg);
		GC.KeepAlive(excess_data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedNodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.UnsignedNodeAnnouncement_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedNodeAnnouncement
	 */
	public org.ldk.structs.UnsignedNodeAnnouncement clone() {
		long ret = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedNodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UnsignedNodeAnnouncement.
	 */
	public long hash() {
		long ret = bindings.UnsignedNodeAnnouncement_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two UnsignedNodeAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.UnsignedNodeAnnouncement b) {
		bool ret = bindings.UnsignedNodeAnnouncement_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is UnsignedNodeAnnouncement)) return false;
		return this.eq((UnsignedNodeAnnouncement)o);
	}
	/**
	 * Serialize the UnsignedNodeAnnouncement object into a byte array which can be read by UnsignedNodeAnnouncement_read
	 */
	public byte[] write() {
		long ret = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UnsignedNodeAnnouncement from a byte array, created by UnsignedNodeAnnouncement_write
	 */
	public static org.ldk.structs.Result_UnsignedNodeAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedNodeAnnouncement_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedNodeAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

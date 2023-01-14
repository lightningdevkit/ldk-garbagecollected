using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The unsigned part of a node_announcement
 */
public class UnsignedNodeAnnouncement : CommonBase {
	internal UnsignedNodeAnnouncement(object _dummy, long ptr) : base(ptr) { }
	~UnsignedNodeAnnouncement() {
		if (ptr != 0) { bindings.UnsignedNodeAnnouncement_free(ptr); }
	}

	/**
	 * The advertised features
	 */
	public NodeFeatures get_features() {
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
		bindings.UnsignedNodeAnnouncement_set_features(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
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
	 * The node_id this announcement originated from (don't rebroadcast the node_announcement back
	 * to this node).
	 */
	public byte[] get_node_id() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_node_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The node_id this announcement originated from (don't rebroadcast the node_announcement back
	 * to this node).
	 */
	public void set_node_id(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * An RGB color for UI purposes
	 */
	public byte[] get_rgb() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_rgb(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * An RGB color for UI purposes
	 */
	public void set_rgb(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_rgb(this.ptr, InternalUtils.check_arr_len(val, 3));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * An alias, for UI purposes.  This should be sanitized before use.  There is no guarantee
	 * of uniqueness.
	 */
	public byte[] get_alias() {
		byte[] ret = bindings.UnsignedNodeAnnouncement_get_alias(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * An alias, for UI purposes.  This should be sanitized before use.  There is no guarantee
	 * of uniqueness.
	 */
	public void set_alias(byte[] val) {
		bindings.UnsignedNodeAnnouncement_set_alias(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * List of addresses on which this node is reachable
	 * 
	 * Returns a copy of the field.
	 */
	public NetAddress[] get_addresses() {
		long[] ret = bindings.UnsignedNodeAnnouncement_get_addresses(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_12_len = ret.Length;
		NetAddress[] ret_conv_12_arr = new NetAddress[ret_conv_12_len];
		for (int m = 0; m < ret_conv_12_len; m++) {
			long ret_conv_12 = ret[m];
			org.ldk.structs.NetAddress ret_conv_12_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(ret_conv_12);
			if (ret_conv_12_hu_conv != null) { ret_conv_12_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		return ret_conv_12_arr;
	}

	/**
	 * List of addresses on which this node is reachable
	 */
	public void set_addresses(NetAddress[] val) {
		bindings.UnsignedNodeAnnouncement_set_addresses(this.ptr, val != null ? InternalUtils.mapArray(val, val_conv_12 => val_conv_12.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.UnsignedNodeAnnouncement_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedNodeAnnouncement
	 */
	public UnsignedNodeAnnouncement clone() {
		long ret = bindings.UnsignedNodeAnnouncement_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedNodeAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedNodeAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two UnsignedNodeAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.UnsignedNodeAnnouncement b) {
		bool ret = bindings.UnsignedNodeAnnouncement_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
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
		byte[] ret = bindings.UnsignedNodeAnnouncement_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a UnsignedNodeAnnouncement from a byte array, created by UnsignedNodeAnnouncement_write
	 */
	public static Result_UnsignedNodeAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.UnsignedNodeAnnouncement_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_UnsignedNodeAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedNodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

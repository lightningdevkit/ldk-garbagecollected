using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`channel_announcement`] message to be sent to or received from a peer.
 * 
 * [`channel_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_announcement-message
 */
public class ChannelAnnouncement : CommonBase {
	internal ChannelAnnouncement(object _dummy, long ptr) : base(ptr) { }
	~ChannelAnnouncement() {
		if (ptr != 0) { bindings.ChannelAnnouncement_free(ptr); }
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public byte[] get_node_signature_1() {
		long ret = bindings.ChannelAnnouncement_get_node_signature_1(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authentication of the announcement by the first public node
	 */
	public void set_node_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_1(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public byte[] get_node_signature_2() {
		long ret = bindings.ChannelAnnouncement_get_node_signature_2(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Authentication of the announcement by the second public node
	 */
	public void set_node_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_node_signature_2(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public byte[] get_bitcoin_signature_1() {
		long ret = bindings.ChannelAnnouncement_get_bitcoin_signature_1(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof of funding UTXO ownership by the first public node
	 */
	public void set_bitcoin_signature_1(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_1(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public byte[] get_bitcoin_signature_2() {
		long ret = bindings.ChannelAnnouncement_get_bitcoin_signature_2(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Proof of funding UTXO ownership by the second public node
	 */
	public void set_bitcoin_signature_2(byte[] val) {
		bindings.ChannelAnnouncement_set_bitcoin_signature_2(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The actual announcement
	 */
	public UnsignedChannelAnnouncement get_contents() {
		long ret = bindings.ChannelAnnouncement_get_contents(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UnsignedChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The actual announcement
	 */
	public void set_contents(org.ldk.structs.UnsignedChannelAnnouncement val) {
		bindings.ChannelAnnouncement_set_contents(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new ChannelAnnouncement given each field
	 */
	public static ChannelAnnouncement of(byte[] node_signature_1_arg, byte[] node_signature_2_arg, byte[] bitcoin_signature_1_arg, byte[] bitcoin_signature_2_arg, org.ldk.structs.UnsignedChannelAnnouncement contents_arg) {
		long ret = bindings.ChannelAnnouncement_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_signature_1_arg, 64)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_signature_2_arg, 64)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(bitcoin_signature_1_arg, 64)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(bitcoin_signature_2_arg, 64)), contents_arg == null ? 0 : contents_arg.ptr);
		GC.KeepAlive(node_signature_1_arg);
		GC.KeepAlive(node_signature_2_arg);
		GC.KeepAlive(bitcoin_signature_1_arg);
		GC.KeepAlive(bitcoin_signature_2_arg);
		GC.KeepAlive(contents_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(contents_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ChannelAnnouncement_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelAnnouncement
	 */
	public ChannelAnnouncement clone() {
		long ret = bindings.ChannelAnnouncement_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelAnnouncement.
	 */
	public long hash() {
		long ret = bindings.ChannelAnnouncement_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two ChannelAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.ChannelAnnouncement b) {
		bool ret = bindings.ChannelAnnouncement_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ChannelAnnouncement)) return false;
		return this.eq((ChannelAnnouncement)o);
	}
	/**
	 * Serialize the ChannelAnnouncement object into a byte array which can be read by ChannelAnnouncement_read
	 */
	public byte[] write() {
		long ret = bindings.ChannelAnnouncement_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelAnnouncement from a byte array, created by ChannelAnnouncement_write
	 */
	public static Result_ChannelAnnouncementDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ChannelAnnouncement_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An onion message to be sent to or received from a peer.
 */
public class OnionMessage : CommonBase {
	internal OnionMessage(object _dummy, long ptr) : base(ptr) { }
	~OnionMessage() {
		if (ptr != 0) { bindings.OnionMessage_free(ptr); }
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public byte[] get_blinding_point() {
		long ret = bindings.OnionMessage_get_blinding_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public void set_blinding_point(byte[] val) {
		bindings.OnionMessage_set_blinding_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public Packet get_onion_routing_packet() {
		long ret = bindings.OnionMessage_get_onion_routing_packet(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Packet ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Packet(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public void set_onion_routing_packet(org.ldk.structs.Packet val) {
		bindings.OnionMessage_set_onion_routing_packet(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new OnionMessage given each field
	 */
	public static OnionMessage of(byte[] blinding_point_arg, org.ldk.structs.Packet onion_routing_packet_arg) {
		long ret = bindings.OnionMessage_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(blinding_point_arg, 33)), onion_routing_packet_arg == null ? 0 : onion_routing_packet_arg.ptr);
		GC.KeepAlive(blinding_point_arg);
		GC.KeepAlive(onion_routing_packet_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(onion_routing_packet_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OnionMessage_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessage
	 */
	public OnionMessage clone() {
		long ret = bindings.OnionMessage_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OnionMessage.
	 */
	public long hash() {
		long ret = bindings.OnionMessage_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two OnionMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.OnionMessage b) {
		bool ret = bindings.OnionMessage_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is OnionMessage)) return false;
		return this.eq((OnionMessage)o);
	}
	/**
	 * Read a OnionMessage from a byte array, created by OnionMessage_write
	 */
	public static Result_OnionMessageDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OnionMessage_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OnionMessage object into a byte array which can be read by OnionMessage_read
	 */
	public byte[] write() {
		long ret = bindings.OnionMessage_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

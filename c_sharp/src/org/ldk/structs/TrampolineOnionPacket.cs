using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * BOLT 4 onion packet including hop data for the next peer.
 */
public class TrampolineOnionPacket : CommonBase {
	internal TrampolineOnionPacket(object _dummy, long ptr) : base(ptr) { }
	~TrampolineOnionPacket() {
		if (ptr != 0) { bindings.TrampolineOnionPacket_free(ptr); }
	}

	/**
	 * Bolt 04 version number
	 */
	public byte get_version() {
		byte ret = bindings.TrampolineOnionPacket_get_version(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Bolt 04 version number
	 */
	public void set_version(byte val) {
		bindings.TrampolineOnionPacket_set_version(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public byte[] get_public_key() {
		long ret = bindings.TrampolineOnionPacket_get_public_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public void set_public_key(byte[] val) {
		bindings.TrampolineOnionPacket_set_public_key(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Encrypted payload for the next hop
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_hop_data() {
		long ret = bindings.TrampolineOnionPacket_get_hop_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Encrypted payload for the next hop
	 */
	public void set_hop_data(byte[] val) {
		bindings.TrampolineOnionPacket_set_hop_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public byte[] get_hmac() {
		long ret = bindings.TrampolineOnionPacket_get_hmac(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public void set_hmac(byte[] val) {
		bindings.TrampolineOnionPacket_set_hmac(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TrampolineOnionPacket given each field
	 */
	public static org.ldk.structs.TrampolineOnionPacket of(byte version_arg, byte[] public_key_arg, byte[] hop_data_arg, byte[] hmac_arg) {
		long ret = bindings.TrampolineOnionPacket_new(version_arg, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(public_key_arg, 33)), InternalUtils.encodeUint8Array(hop_data_arg), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(hmac_arg, 32)));
		GC.KeepAlive(version_arg);
		GC.KeepAlive(public_key_arg);
		GC.KeepAlive(hop_data_arg);
		GC.KeepAlive(hmac_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineOnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TrampolineOnionPacket_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineOnionPacket
	 */
	public org.ldk.structs.TrampolineOnionPacket clone() {
		long ret = bindings.TrampolineOnionPacket_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineOnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TrampolineOnionPacket.
	 */
	public long hash() {
		long ret = bindings.TrampolineOnionPacket_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TrampolineOnionPackets contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TrampolineOnionPacket b) {
		bool ret = bindings.TrampolineOnionPacket_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TrampolineOnionPacket)) return false;
		return this.eq((TrampolineOnionPacket)o);
	}
	/**
	 * Serialize the TrampolineOnionPacket object into a byte array which can be read by TrampolineOnionPacket_read
	 */
	public byte[] write() {
		long ret = bindings.TrampolineOnionPacket_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TrampolineOnionPacket from a byte array, created by TrampolineOnionPacket_write
	 */
	public static org.ldk.structs.Result_TrampolineOnionPacketDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TrampolineOnionPacket_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrampolineOnionPacketDecodeErrorZ ret_hu_conv = Result_TrampolineOnionPacketDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

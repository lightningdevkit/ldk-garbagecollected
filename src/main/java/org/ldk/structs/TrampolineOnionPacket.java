package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * BOLT 4 onion packet including hop data for the next peer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TrampolineOnionPacket extends CommonBase {
	TrampolineOnionPacket(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TrampolineOnionPacket_free(ptr); }
	}

	/**
	 * Bolt 04 version number
	 */
	public byte get_version() {
		byte ret = bindings.TrampolineOnionPacket_get_version(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Bolt 04 version number
	 */
	public void set_version(byte val) {
		bindings.TrampolineOnionPacket_set_version(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public byte[] get_public_key() {
		byte[] ret = bindings.TrampolineOnionPacket_get_public_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * A random sepc256k1 point, used to build the ECDH shared secret to decrypt hop_data
	 */
	public void set_public_key(byte[] val) {
		bindings.TrampolineOnionPacket_set_public_key(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Encrypted payload for the next hop
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_hop_data() {
		byte[] ret = bindings.TrampolineOnionPacket_get_hop_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Encrypted payload for the next hop
	 */
	public void set_hop_data(byte[] val) {
		bindings.TrampolineOnionPacket_set_hop_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public byte[] get_hmac() {
		byte[] ret = bindings.TrampolineOnionPacket_get_hmac(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * HMAC to verify the integrity of hop_data
	 */
	public void set_hmac(byte[] val) {
		bindings.TrampolineOnionPacket_set_hmac(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new TrampolineOnionPacket given each field
	 */
	public static TrampolineOnionPacket of(byte version_arg, byte[] public_key_arg, byte[] hop_data_arg, byte[] hmac_arg) {
		long ret = bindings.TrampolineOnionPacket_new(version_arg, InternalUtils.check_arr_len(public_key_arg, 33), hop_data_arg, InternalUtils.check_arr_len(hmac_arg, 32));
		Reference.reachabilityFence(version_arg);
		Reference.reachabilityFence(public_key_arg);
		Reference.reachabilityFence(hop_data_arg);
		Reference.reachabilityFence(hmac_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineOnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.TrampolineOnionPacket_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the TrampolineOnionPacket
	 */
	public TrampolineOnionPacket clone() {
		long ret = bindings.TrampolineOnionPacket_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TrampolineOnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TrampolineOnionPacket.
	 */
	public long hash() {
		long ret = bindings.TrampolineOnionPacket_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TrampolineOnionPackets contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.TrampolineOnionPacket b) {
		boolean ret = bindings.TrampolineOnionPacket_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof TrampolineOnionPacket)) return false;
		return this.eq((TrampolineOnionPacket)o);
	}
	/**
	 * Serialize the TrampolineOnionPacket object into a byte array which can be read by TrampolineOnionPacket_read
	 */
	public byte[] write() {
		byte[] ret = bindings.TrampolineOnionPacket_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a TrampolineOnionPacket from a byte array, created by TrampolineOnionPacket_write
	 */
	public static Result_TrampolineOnionPacketDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TrampolineOnionPacket_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TrampolineOnionPacketDecodeErrorZ ret_hu_conv = Result_TrampolineOnionPacketDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

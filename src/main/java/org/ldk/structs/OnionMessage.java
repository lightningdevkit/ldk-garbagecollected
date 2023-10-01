package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An onion message to be sent to or received from a peer.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OnionMessage extends CommonBase {
	OnionMessage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OnionMessage_free(ptr); }
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public byte[] get_blinding_point() {
		byte[] ret = bindings.OnionMessage_get_blinding_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public void set_blinding_point(byte[] val) {
		bindings.OnionMessage_set_blinding_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public Packet get_onion_routing_packet() {
		long ret = bindings.OnionMessage_get_onion_routing_packet(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Packet ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Packet(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public void set_onion_routing_packet(org.ldk.structs.Packet val) {
		bindings.OnionMessage_set_onion_routing_packet(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new OnionMessage given each field
	 */
	public static OnionMessage of(byte[] blinding_point_arg, org.ldk.structs.Packet onion_routing_packet_arg) {
		long ret = bindings.OnionMessage_new(InternalUtils.check_arr_len(blinding_point_arg, 33), onion_routing_packet_arg == null ? 0 : onion_routing_packet_arg.ptr);
		Reference.reachabilityFence(blinding_point_arg);
		Reference.reachabilityFence(onion_routing_packet_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(onion_routing_packet_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OnionMessage_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessage
	 */
	public OnionMessage clone() {
		long ret = bindings.OnionMessage_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two OnionMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.OnionMessage b) {
		boolean ret = bindings.OnionMessage_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof OnionMessage)) return false;
		return this.eq((OnionMessage)o);
	}
	/**
	 * Read a OnionMessage from a byte array, created by OnionMessage_write
	 */
	public static Result_OnionMessageDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OnionMessage_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OnionMessage object into a byte array which can be read by OnionMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OnionMessage_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

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
		byte[] ret = bindings.OnionMessage_get_blinding_point(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public void set_blinding_point(byte[] val) {
		bindings.OnionMessage_set_blinding_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
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
		long ret = bindings.OnionMessage_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OnionMessage object into a byte array which can be read by OnionMessage_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OnionMessage_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

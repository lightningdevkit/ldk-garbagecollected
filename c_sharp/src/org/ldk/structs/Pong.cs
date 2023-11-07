using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`pong`] message to be sent to or received from a peer.
 * 
 * [`pong`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-ping-and-pong-messages
 */
public class Pong : CommonBase {
	internal Pong(object _dummy, long ptr) : base(ptr) { }
	~Pong() {
		if (ptr != 0) { bindings.Pong_free(ptr); }
	}

	/**
	 * The pong packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public short get_byteslen() {
		short ret = bindings.Pong_get_byteslen(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The pong packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public void set_byteslen(short val) {
		bindings.Pong_set_byteslen(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Pong given each field
	 */
	public static Pong of(short byteslen_arg) {
		long ret = bindings.Pong_new(byteslen_arg);
		GC.KeepAlive(byteslen_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Pong ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Pong(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Pong_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Pong
	 */
	public Pong clone() {
		long ret = bindings.Pong_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Pong ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Pong(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Pongs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Pong b) {
		bool ret = bindings.Pong_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Pong)) return false;
		return this.eq((Pong)o);
	}
	/**
	 * Serialize the Pong object into a byte array which can be read by Pong_read
	 */
	public byte[] write() {
		long ret = bindings.Pong_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Pong from a byte array, created by Pong_write
	 */
	public static Result_PongDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Pong_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

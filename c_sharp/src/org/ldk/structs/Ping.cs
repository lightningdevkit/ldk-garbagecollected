using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`ping`] message to be sent to or received from a peer.
 * 
 * [`ping`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-ping-and-pong-messages
 */
public class Ping : CommonBase {
	internal Ping(object _dummy, long ptr) : base(ptr) { }
	~Ping() {
		if (ptr != 0) { bindings.Ping_free(ptr); }
	}

	/**
	 * The desired response length.
	 */
	public short get_ponglen() {
		short ret = bindings.Ping_get_ponglen(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The desired response length.
	 */
	public void set_ponglen(short val) {
		bindings.Ping_set_ponglen(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The ping packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public short get_byteslen() {
		short ret = bindings.Ping_get_byteslen(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The ping packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public void set_byteslen(short val) {
		bindings.Ping_set_byteslen(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Ping given each field
	 */
	public static Ping of(short ponglen_arg, short byteslen_arg) {
		long ret = bindings.Ping_new(ponglen_arg, byteslen_arg);
		GC.KeepAlive(ponglen_arg);
		GC.KeepAlive(byteslen_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Ping ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Ping(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Ping_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Ping
	 */
	public Ping clone() {
		long ret = bindings.Ping_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Ping ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Ping(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Pings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Ping b) {
		bool ret = bindings.Ping_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Ping)) return false;
		return this.eq((Ping)o);
	}
	/**
	 * Serialize the Ping object into a byte array which can be read by Ping_read
	 */
	public byte[] write() {
		long ret = bindings.Ping_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Ping from a byte array, created by Ping_write
	 */
	public static Result_PingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Ping_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

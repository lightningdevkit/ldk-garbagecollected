using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`shutdown`] message to be sent to or received from a peer.
 * 
 * [`shutdown`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-initiation-shutdown
 */
public class Shutdown : CommonBase {
	internal Shutdown(object _dummy, long ptr) : base(ptr) { }
	~Shutdown() {
		if (ptr != 0) { bindings.Shutdown_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		byte[] ret = bindings.Shutdown_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.Shutdown_set_channel_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The destination of this peer's funds on closing.
	 * 
	 * Must be in one of these forms: P2PKH, P2SH, P2WPKH, P2WSH, P2TR.
	 */
	public byte[] get_scriptpubkey() {
		byte[] ret = bindings.Shutdown_get_scriptpubkey(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The destination of this peer's funds on closing.
	 * 
	 * Must be in one of these forms: P2PKH, P2SH, P2WPKH, P2WSH, P2TR.
	 */
	public void set_scriptpubkey(byte[] val) {
		bindings.Shutdown_set_scriptpubkey(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Shutdown given each field
	 */
	public static Shutdown of(byte[] channel_id_arg, byte[] scriptpubkey_arg) {
		long ret = bindings.Shutdown_new(InternalUtils.check_arr_len(channel_id_arg, 32), scriptpubkey_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(scriptpubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Shutdown ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Shutdown(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Shutdown_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Shutdown
	 */
	public Shutdown clone() {
		long ret = bindings.Shutdown_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Shutdown ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Shutdown(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Shutdowns contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Shutdown b) {
		bool ret = bindings.Shutdown_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Shutdown)) return false;
		return this.eq((Shutdown)o);
	}
	/**
	 * Serialize the Shutdown object into a byte array which can be read by Shutdown_read
	 */
	public byte[] write() {
		byte[] ret = bindings.Shutdown_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a Shutdown from a byte array, created by Shutdown_write
	 */
	public static Result_ShutdownDecodeErrorZ read(byte[] ser) {
		long ret = bindings.Shutdown_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

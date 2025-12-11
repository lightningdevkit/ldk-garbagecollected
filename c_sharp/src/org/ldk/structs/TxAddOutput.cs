using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`tx_add_output`] message for adding an output during interactive transaction construction.
 * 
 * [`tx_add_output`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_add_output-message
 */
public class TxAddOutput : CommonBase {
	internal TxAddOutput(object _dummy, long ptr) : base(ptr) { }
	~TxAddOutput() {
		if (ptr != 0) { bindings.TxAddOutput_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public org.ldk.structs.ChannelId get_channel_id() {
		long ret = bindings.TxAddOutput_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(org.ldk.structs.ChannelId val) {
		bindings.TxAddOutput_set_channel_id(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public long get_serial_id() {
		long ret = bindings.TxAddOutput_get_serial_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public void set_serial_id(long val) {
		bindings.TxAddOutput_set_serial_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The satoshi value of the output
	 */
	public long get_sats() {
		long ret = bindings.TxAddOutput_get_sats(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The satoshi value of the output
	 */
	public void set_sats(long val) {
		bindings.TxAddOutput_set_sats(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The scriptPubKey for the output
	 */
	public byte[] get_script() {
		long ret = bindings.TxAddOutput_get_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The scriptPubKey for the output
	 */
	public void set_script(byte[] val) {
		bindings.TxAddOutput_set_script(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TxAddOutput given each field
	 */
	public static org.ldk.structs.TxAddOutput of(org.ldk.structs.ChannelId channel_id_arg, long serial_id_arg, long sats_arg, byte[] script_arg) {
		long ret = bindings.TxAddOutput_new(channel_id_arg.ptr, serial_id_arg, sats_arg, InternalUtils.encodeUint8Array(script_arg));
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(serial_id_arg);
		GC.KeepAlive(sats_arg);
		GC.KeepAlive(script_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TxAddOutput_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxAddOutput
	 */
	public org.ldk.structs.TxAddOutput clone() {
		long ret = bindings.TxAddOutput_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAddOutput.
	 */
	public long hash() {
		long ret = bindings.TxAddOutput_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxAddOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TxAddOutput b) {
		bool ret = bindings.TxAddOutput_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TxAddOutput)) return false;
		return this.eq((TxAddOutput)o);
	}
	/**
	 * Serialize the TxAddOutput object into a byte array which can be read by TxAddOutput_read
	 */
	public byte[] write() {
		long ret = bindings.TxAddOutput_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAddOutput from a byte array, created by TxAddOutput_write
	 */
	public static org.ldk.structs.Result_TxAddOutputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxAddOutput_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxAddOutputDecodeErrorZ ret_hu_conv = Result_TxAddOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

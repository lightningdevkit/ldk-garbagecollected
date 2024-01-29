using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A tx_remove_input message for removing an input during interactive transaction construction.
 */
public class TxRemoveInput : CommonBase {
	internal TxRemoveInput(object _dummy, long ptr) : base(ptr) { }
	~TxRemoveInput() {
		if (ptr != 0) { bindings.TxRemoveInput_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		long ret = bindings.TxRemoveInput_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxRemoveInput_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The serial ID of the input to be removed
	 */
	public long get_serial_id() {
		long ret = bindings.TxRemoveInput_get_serial_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The serial ID of the input to be removed
	 */
	public void set_serial_id(long val) {
		bindings.TxRemoveInput_set_serial_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TxRemoveInput given each field
	 */
	public static TxRemoveInput of(byte[] channel_id_arg, long serial_id_arg) {
		long ret = bindings.TxRemoveInput_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), serial_id_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(serial_id_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxRemoveInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxRemoveInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TxRemoveInput_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxRemoveInput
	 */
	public TxRemoveInput clone() {
		long ret = bindings.TxRemoveInput_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxRemoveInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxRemoveInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxRemoveInput.
	 */
	public long hash() {
		long ret = bindings.TxRemoveInput_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxRemoveInputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TxRemoveInput b) {
		bool ret = bindings.TxRemoveInput_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TxRemoveInput)) return false;
		return this.eq((TxRemoveInput)o);
	}
	/**
	 * Serialize the TxRemoveInput object into a byte array which can be read by TxRemoveInput_read
	 */
	public byte[] write() {
		long ret = bindings.TxRemoveInput_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxRemoveInput from a byte array, created by TxRemoveInput_write
	 */
	public static Result_TxRemoveInputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxRemoveInput_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxRemoveInputDecodeErrorZ ret_hu_conv = Result_TxRemoveInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

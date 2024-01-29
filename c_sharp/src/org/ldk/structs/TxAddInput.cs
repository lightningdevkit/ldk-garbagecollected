using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A tx_add_input message for adding an input during interactive transaction construction
 */
public class TxAddInput : CommonBase {
	internal TxAddInput(object _dummy, long ptr) : base(ptr) { }
	~TxAddInput() {
		if (ptr != 0) { bindings.TxAddInput_free(ptr); }
	}

	/**
	 * The channel ID
	 */
	public byte[] get_channel_id() {
		long ret = bindings.TxAddInput_get_channel_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The channel ID
	 */
	public void set_channel_id(byte[] val) {
		bindings.TxAddInput_set_channel_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * A randomly chosen unique identifier for this input, which is even for initiators and odd for
	 * non-initiators.
	 */
	public long get_serial_id() {
		long ret = bindings.TxAddInput_get_serial_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * A randomly chosen unique identifier for this input, which is even for initiators and odd for
	 * non-initiators.
	 */
	public void set_serial_id(long val) {
		bindings.TxAddInput_set_serial_id(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Serialized transaction that contains the output this input spends to verify that it is non
	 * malleable.
	 */
	public TransactionU16LenLimited get_prevtx() {
		long ret = bindings.TxAddInput_get_prevtx(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TransactionU16LenLimited ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TransactionU16LenLimited(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialized transaction that contains the output this input spends to verify that it is non
	 * malleable.
	 */
	public void set_prevtx(org.ldk.structs.TransactionU16LenLimited val) {
		bindings.TxAddInput_set_prevtx(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The index of the output being spent
	 */
	public int get_prevtx_out() {
		int ret = bindings.TxAddInput_get_prevtx_out(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The index of the output being spent
	 */
	public void set_prevtx_out(int val) {
		bindings.TxAddInput_set_prevtx_out(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The sequence number of this input
	 */
	public int get_sequence() {
		int ret = bindings.TxAddInput_get_sequence(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The sequence number of this input
	 */
	public void set_sequence(int val) {
		bindings.TxAddInput_set_sequence(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new TxAddInput given each field
	 */
	public static TxAddInput of(byte[] channel_id_arg, long serial_id_arg, org.ldk.structs.TransactionU16LenLimited prevtx_arg, int prevtx_out_arg, int sequence_arg) {
		long ret = bindings.TxAddInput_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_id_arg, 32)), serial_id_arg, prevtx_arg == null ? 0 : prevtx_arg.ptr, prevtx_out_arg, sequence_arg);
		GC.KeepAlive(channel_id_arg);
		GC.KeepAlive(serial_id_arg);
		GC.KeepAlive(prevtx_arg);
		GC.KeepAlive(prevtx_out_arg);
		GC.KeepAlive(sequence_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(prevtx_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.TxAddInput_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the TxAddInput
	 */
	public TxAddInput clone() {
		long ret = bindings.TxAddInput_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.TxAddInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.TxAddInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAddInput.
	 */
	public long hash() {
		long ret = bindings.TxAddInput_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two TxAddInputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.TxAddInput b) {
		bool ret = bindings.TxAddInput_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is TxAddInput)) return false;
		return this.eq((TxAddInput)o);
	}
	/**
	 * Serialize the TxAddInput object into a byte array which can be read by TxAddInput_read
	 */
	public byte[] write() {
		long ret = bindings.TxAddInput_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAddInput from a byte array, created by TxAddInput_write
	 */
	public static Result_TxAddInputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.TxAddInput_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxAddInputDecodeErrorZ ret_hu_conv = Result_TxAddInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

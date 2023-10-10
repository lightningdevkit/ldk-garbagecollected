using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information about a spendable output to our \"payment key\".
 * 
 * See [`SpendableOutputDescriptor::StaticPaymentOutput`] for more details on how to spend this.
 */
public class StaticPaymentOutputDescriptor : CommonBase {
	internal StaticPaymentOutputDescriptor(object _dummy, long ptr) : base(ptr) { }
	~StaticPaymentOutputDescriptor() {
		if (ptr != 0) { bindings.StaticPaymentOutputDescriptor_free(ptr); }
	}

	/**
	 * The outpoint which is spendable.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The outpoint which is spendable.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.StaticPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public TxOut get_output() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_output(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.StaticPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public byte[] get_channel_keys_id() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public void set_channel_keys_id(byte[] val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new StaticPaymentOutputDescriptor given each field
	 */
	public static StaticPaymentOutputDescriptor of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut output_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg) {
		long ret = bindings.StaticPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, output_arg.ptr, InternalUtils.check_arr_len(channel_keys_id_arg, 32), channel_value_satoshis_arg);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(output_arg);
		GC.KeepAlive(channel_keys_id_arg);
		GC.KeepAlive(channel_value_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(outpoint_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.StaticPaymentOutputDescriptor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the StaticPaymentOutputDescriptor
	 */
	public StaticPaymentOutputDescriptor clone() {
		long ret = bindings.StaticPaymentOutputDescriptor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two StaticPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.StaticPaymentOutputDescriptor b) {
		bool ret = bindings.StaticPaymentOutputDescriptor_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is StaticPaymentOutputDescriptor)) return false;
		return this.eq((StaticPaymentOutputDescriptor)o);
	}
	/**
	 * Serialize the StaticPaymentOutputDescriptor object into a byte array which can be read by StaticPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a StaticPaymentOutputDescriptor from a byte array, created by StaticPaymentOutputDescriptor_write
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticPaymentOutputDescriptor_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

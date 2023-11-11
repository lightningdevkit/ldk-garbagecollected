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
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public void set_channel_keys_id(byte[] val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
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
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.117 or later.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public ChannelTransactionParameters get_channel_transaction_parameters() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_transaction_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.117 or later.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_transaction_parameters(org.ldk.structs.ChannelTransactionParameters val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_transaction_parameters(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Constructs a new StaticPaymentOutputDescriptor given each field
	 * 
	 * Note that channel_transaction_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static StaticPaymentOutputDescriptor of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut output_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg, org.ldk.structs.ChannelTransactionParameters channel_transaction_parameters_arg) {
		long ret = bindings.StaticPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, output_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_keys_id_arg, 32)), channel_value_satoshis_arg, channel_transaction_parameters_arg == null ? 0 : channel_transaction_parameters_arg.ptr);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(output_arg);
		GC.KeepAlive(channel_keys_id_arg);
		GC.KeepAlive(channel_value_satoshis_arg);
		GC.KeepAlive(channel_transaction_parameters_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(outpoint_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(channel_transaction_parameters_arg); };
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
	 * Generates a non-cryptographic 64-bit hash of the StaticPaymentOutputDescriptor.
	 */
	public long hash() {
		long ret = bindings.StaticPaymentOutputDescriptor_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
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
	 * Returns the `witness_script` of the spendable output.
	 * 
	 * Note that this will only return `Some` for [`StaticPaymentOutputDescriptor`]s that
	 * originated from an anchor outputs channel, as they take the form of a P2WSH script.
	 */
	public Option_CVec_u8ZZ witness_script() {
		long ret = bindings.StaticPaymentOutputDescriptor_witness_script(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum length a well-formed witness spending one of these should have.
	 * Note: If you have the grind_signatures feature enabled, this will be at least 1 byte
	 * shorter.
	 */
	public long max_witness_length() {
		long ret = bindings.StaticPaymentOutputDescriptor_max_witness_length(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Serialize the StaticPaymentOutputDescriptor object into a byte array which can be read by StaticPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		long ret = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StaticPaymentOutputDescriptor from a byte array, created by StaticPaymentOutputDescriptor_write
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticPaymentOutputDescriptor_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

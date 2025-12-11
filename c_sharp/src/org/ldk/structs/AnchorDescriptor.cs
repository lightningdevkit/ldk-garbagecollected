using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A descriptor used to sign for a commitment transaction's anchor output.
 */
public class AnchorDescriptor : CommonBase {
	internal AnchorDescriptor(object _dummy, long ptr) : base(ptr) { }
	~AnchorDescriptor() {
		if (ptr != 0) { bindings.AnchorDescriptor_free(ptr); }
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public org.ldk.structs.ChannelDerivationParameters get_channel_derivation_parameters() {
		long ret = bindings.AnchorDescriptor_get_channel_derivation_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public void set_channel_derivation_parameters(org.ldk.structs.ChannelDerivationParameters val) {
		bindings.AnchorDescriptor_set_channel_derivation_parameters(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public org.ldk.structs.OutPoint get_outpoint() {
		long ret = bindings.AnchorDescriptor_get_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.AnchorDescriptor_set_outpoint(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Zero-fee-commitment anchors have variable value, which is tracked here.
	 */
	public long get_value() {
		long ret = bindings.AnchorDescriptor_get_value(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Zero-fee-commitment anchors have variable value, which is tracked here.
	 */
	public void set_value(long val) {
		bindings.AnchorDescriptor_set_value(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new AnchorDescriptor given each field
	 */
	public static org.ldk.structs.AnchorDescriptor of(org.ldk.structs.ChannelDerivationParameters channel_derivation_parameters_arg, org.ldk.structs.OutPoint outpoint_arg, long value_arg) {
		long ret = bindings.AnchorDescriptor_new(channel_derivation_parameters_arg.ptr, outpoint_arg.ptr, value_arg);
		GC.KeepAlive(channel_derivation_parameters_arg);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(value_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.AnchorDescriptor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the AnchorDescriptor
	 */
	public org.ldk.structs.AnchorDescriptor clone() {
		long ret = bindings.AnchorDescriptor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two AnchorDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.AnchorDescriptor b) {
		bool ret = bindings.AnchorDescriptor_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is AnchorDescriptor)) return false;
		return this.eq((AnchorDescriptor)o);
	}
	/**
	 * Returns the UTXO to be spent by the anchor input, which can be obtained via
	 * [`Self::unsigned_tx_input`].
	 */
	public org.ldk.structs.TxOut previous_utxo() {
		long ret = bindings.AnchorDescriptor_previous_utxo(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the unsigned transaction input spending the anchor output in the commitment
	 * transaction.
	 */
	public org.ldk.structs.TxIn unsigned_tx_input() {
		long ret = bindings.AnchorDescriptor_unsigned_tx_input(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxIn ret_conv = new TxIn(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the fully signed witness required to spend the anchor output in the commitment
	 * transaction.
	 */
	public byte[] tx_input_witness(byte[] signature) {
		long ret = bindings.AnchorDescriptor_tx_input_witness(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(signature, 64)));
		GC.KeepAlive(this);
		GC.KeepAlive(signature);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

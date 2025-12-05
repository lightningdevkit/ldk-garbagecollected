using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information about a spendable output to a P2WSH script.
 * 
 * See [`SpendableOutputDescriptor::DelayedPaymentOutput`] for more details on how to spend this.
 */
public class DelayedPaymentOutputDescriptor : CommonBase {
	internal DelayedPaymentOutputDescriptor(object _dummy, long ptr) : base(ptr) { }
	~DelayedPaymentOutputDescriptor() {
		if (ptr != 0) { bindings.DelayedPaymentOutputDescriptor_free(ptr); }
	}

	/**
	 * The outpoint which is spendable.
	 */
	public org.ldk.structs.OutPoint get_outpoint() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_outpoint(this.ptr);
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
		bindings.DelayedPaymentOutputDescriptor_set_outpoint(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public byte[] get_per_commitment_point() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_per_commitment_point(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public void set_per_commitment_point(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_per_commitment_point(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 33)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public short get_to_self_delay() {
		short ret = bindings.DelayedPaymentOutputDescriptor_get_to_self_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public void set_to_self_delay(short val) {
		bindings.DelayedPaymentOutputDescriptor_set_to_self_delay(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public org.ldk.structs.TxOut get_output() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_output(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.DelayedPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public org.ldk.structs.RevocationKey get_revocation_pubkey() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public void set_revocation_pubkey(org.ldk.structs.RevocationKey val) {
		bindings.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public byte[] get_channel_keys_id() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
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
		bindings.DelayedPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The channel public keys and other parameters needed to generate a spending transaction or
	 * to provide to a signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.123 or later.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public org.ldk.structs.ChannelTransactionParameters get_channel_transaction_parameters() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_channel_transaction_parameters(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The channel public keys and other parameters needed to generate a spending transaction or
	 * to provide to a signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.123 or later.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public void set_channel_transaction_parameters(org.ldk.structs.ChannelTransactionParameters val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_transaction_parameters(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new DelayedPaymentOutputDescriptor given each field
	 * 
	 * Note that channel_transaction_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static org.ldk.structs.DelayedPaymentOutputDescriptor of(org.ldk.structs.OutPoint outpoint_arg, byte[] per_commitment_point_arg, short to_self_delay_arg, org.ldk.structs.TxOut output_arg, org.ldk.structs.RevocationKey revocation_pubkey_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg, org.ldk.structs.ChannelTransactionParameters channel_transaction_parameters_arg) {
		long ret = bindings.DelayedPaymentOutputDescriptor_new(outpoint_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(per_commitment_point_arg, 33)), to_self_delay_arg, output_arg.ptr, revocation_pubkey_arg.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(channel_keys_id_arg, 32)), channel_value_satoshis_arg, channel_transaction_parameters_arg == null ? 0 : channel_transaction_parameters_arg.ptr);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(per_commitment_point_arg);
		GC.KeepAlive(to_self_delay_arg);
		GC.KeepAlive(output_arg);
		GC.KeepAlive(revocation_pubkey_arg);
		GC.KeepAlive(channel_keys_id_arg);
		GC.KeepAlive(channel_value_satoshis_arg);
		GC.KeepAlive(channel_transaction_parameters_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.DelayedPaymentOutputDescriptor_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentOutputDescriptor
	 */
	public org.ldk.structs.DelayedPaymentOutputDescriptor clone() {
		long ret = bindings.DelayedPaymentOutputDescriptor_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DelayedPaymentOutputDescriptor.
	 */
	public long hash() {
		long ret = bindings.DelayedPaymentOutputDescriptor_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DelayedPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.DelayedPaymentOutputDescriptor b) {
		bool ret = bindings.DelayedPaymentOutputDescriptor_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is DelayedPaymentOutputDescriptor)) return false;
		return this.eq((DelayedPaymentOutputDescriptor)o);
	}
	/**
	 * Serialize the DelayedPaymentOutputDescriptor object into a byte array which can be read by DelayedPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		long ret = bindings.DelayedPaymentOutputDescriptor_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DelayedPaymentOutputDescriptor from a byte array, created by DelayedPaymentOutputDescriptor_write
	 */
	public static org.ldk.structs.Result_DelayedPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DelayedPaymentOutputDescriptor_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

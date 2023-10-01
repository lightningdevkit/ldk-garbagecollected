package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information about a spendable output to our \"payment key\".
 * 
 * See [`SpendableOutputDescriptor::StaticPaymentOutput`] for more details on how to spend this.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class StaticPaymentOutputDescriptor extends CommonBase {
	StaticPaymentOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.StaticPaymentOutputDescriptor_free(ptr); }
	}

	/**
	 * The outpoint which is spendable.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The outpoint which is spendable.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.StaticPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public TxOut get_output() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_output(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.StaticPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public byte[] get_channel_keys_id() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public void set_channel_keys_id(byte[] val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The necessary channel parameters that need to be provided to the re-derived signer through
	 * [`ChannelSigner::provide_channel_parameters`].
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.117 or later.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelTransactionParameters get_channel_transaction_parameters() {
		long ret = bindings.StaticPaymentOutputDescriptor_get_channel_transaction_parameters(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTransactionParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public void set_channel_transaction_parameters(@Nullable org.ldk.structs.ChannelTransactionParameters val) {
		bindings.StaticPaymentOutputDescriptor_set_channel_transaction_parameters(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new StaticPaymentOutputDescriptor given each field
	 * 
	 * Note that channel_transaction_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static StaticPaymentOutputDescriptor of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut output_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg, @Nullable org.ldk.structs.ChannelTransactionParameters channel_transaction_parameters_arg) {
		long ret = bindings.StaticPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, output_arg.ptr, InternalUtils.check_arr_len(channel_keys_id_arg, 32), channel_value_satoshis_arg, channel_transaction_parameters_arg == null ? 0 : channel_transaction_parameters_arg.ptr);
		Reference.reachabilityFence(outpoint_arg);
		Reference.reachabilityFence(output_arg);
		Reference.reachabilityFence(channel_keys_id_arg);
		Reference.reachabilityFence(channel_value_satoshis_arg);
		Reference.reachabilityFence(channel_transaction_parameters_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_transaction_parameters_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.StaticPaymentOutputDescriptor_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the StaticPaymentOutputDescriptor
	 */
	public StaticPaymentOutputDescriptor clone() {
		long ret = bindings.StaticPaymentOutputDescriptor_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StaticPaymentOutputDescriptor.
	 */
	public long hash() {
		long ret = bindings.StaticPaymentOutputDescriptor_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two StaticPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.StaticPaymentOutputDescriptor b) {
		boolean ret = bindings.StaticPaymentOutputDescriptor_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof StaticPaymentOutputDescriptor)) return false;
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
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The maximum length a well-formed witness spending one of these should have.
	 * Note: If you have the grind_signatures feature enabled, this will be at least 1 byte
	 * shorter.
	 */
	public long max_witness_length() {
		long ret = bindings.StaticPaymentOutputDescriptor_max_witness_length(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Serialize the StaticPaymentOutputDescriptor object into a byte array which can be read by StaticPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a StaticPaymentOutputDescriptor from a byte array, created by StaticPaymentOutputDescriptor_write
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticPaymentOutputDescriptor_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

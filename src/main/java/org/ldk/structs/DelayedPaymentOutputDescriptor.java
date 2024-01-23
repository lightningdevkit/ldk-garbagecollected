package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information about a spendable output to a P2WSH script.
 * 
 * See [`SpendableOutputDescriptor::DelayedPaymentOutput`] for more details on how to spend this.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DelayedPaymentOutputDescriptor extends CommonBase {
	DelayedPaymentOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DelayedPaymentOutputDescriptor_free(ptr); }
	}

	/**
	 * The outpoint which is spendable.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_outpoint(this.ptr);
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
		bindings.DelayedPaymentOutputDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public byte[] get_per_commitment_point() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_get_per_commitment_point(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public void set_per_commitment_point(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_per_commitment_point(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public short get_to_self_delay() {
		short ret = bindings.DelayedPaymentOutputDescriptor_get_to_self_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public void set_to_self_delay(short val) {
		bindings.DelayedPaymentOutputDescriptor_set_to_self_delay(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public TxOut get_output() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_output(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.DelayedPaymentOutputDescriptor_set_output(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public RevocationKey get_revocation_pubkey() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RevocationKey ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RevocationKey(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public void set_revocation_pubkey(org.ldk.structs.RevocationKey val) {
		bindings.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public byte[] get_channel_keys_id() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public void set_channel_keys_id(byte[] val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_keys_id(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public long get_channel_value_satoshis() {
		long ret = bindings.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public void set_channel_value_satoshis(long val) {
		bindings.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new DelayedPaymentOutputDescriptor given each field
	 */
	public static DelayedPaymentOutputDescriptor of(org.ldk.structs.OutPoint outpoint_arg, byte[] per_commitment_point_arg, short to_self_delay_arg, org.ldk.structs.TxOut output_arg, org.ldk.structs.RevocationKey revocation_pubkey_arg, byte[] channel_keys_id_arg, long channel_value_satoshis_arg) {
		long ret = bindings.DelayedPaymentOutputDescriptor_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, InternalUtils.check_arr_len(per_commitment_point_arg, 33), to_self_delay_arg, output_arg.ptr, revocation_pubkey_arg == null ? 0 : revocation_pubkey_arg.ptr, InternalUtils.check_arr_len(channel_keys_id_arg, 32), channel_value_satoshis_arg);
		Reference.reachabilityFence(outpoint_arg);
		Reference.reachabilityFence(per_commitment_point_arg);
		Reference.reachabilityFence(to_self_delay_arg);
		Reference.reachabilityFence(output_arg);
		Reference.reachabilityFence(revocation_pubkey_arg);
		Reference.reachabilityFence(channel_keys_id_arg);
		Reference.reachabilityFence(channel_value_satoshis_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(revocation_pubkey_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.DelayedPaymentOutputDescriptor_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentOutputDescriptor
	 */
	public DelayedPaymentOutputDescriptor clone() {
		long ret = bindings.DelayedPaymentOutputDescriptor_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DelayedPaymentOutputDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DelayedPaymentOutputDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DelayedPaymentOutputDescriptor.
	 */
	public long hash() {
		long ret = bindings.DelayedPaymentOutputDescriptor_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two DelayedPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.DelayedPaymentOutputDescriptor b) {
		boolean ret = bindings.DelayedPaymentOutputDescriptor_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof DelayedPaymentOutputDescriptor)) return false;
		return this.eq((DelayedPaymentOutputDescriptor)o);
	}
	/**
	 * Serialize the DelayedPaymentOutputDescriptor object into a byte array which can be read by DelayedPaymentOutputDescriptor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.DelayedPaymentOutputDescriptor_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a DelayedPaymentOutputDescriptor from a byte array, created by DelayedPaymentOutputDescriptor_write
	 */
	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.DelayedPaymentOutputDescriptor_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

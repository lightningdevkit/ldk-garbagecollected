package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A descriptor used to sign for a commitment transaction's anchor output.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AnchorDescriptor extends CommonBase {
	AnchorDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AnchorDescriptor_free(ptr); }
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public ChannelDerivationParameters get_channel_derivation_parameters() {
		long ret = bindings.AnchorDescriptor_get_channel_derivation_parameters(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelDerivationParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelDerivationParameters(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The parameters required to derive the signer for the anchor input.
	 */
	public void set_channel_derivation_parameters(org.ldk.structs.ChannelDerivationParameters val) {
		bindings.AnchorDescriptor_set_channel_derivation_parameters(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.AnchorDescriptor_get_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The transaction input's outpoint corresponding to the commitment transaction's anchor
	 * output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.AnchorDescriptor_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new AnchorDescriptor given each field
	 */
	public static AnchorDescriptor of(org.ldk.structs.ChannelDerivationParameters channel_derivation_parameters_arg, org.ldk.structs.OutPoint outpoint_arg) {
		long ret = bindings.AnchorDescriptor_new(channel_derivation_parameters_arg == null ? 0 : channel_derivation_parameters_arg.ptr, outpoint_arg == null ? 0 : outpoint_arg.ptr);
		Reference.reachabilityFence(channel_derivation_parameters_arg);
		Reference.reachabilityFence(outpoint_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(channel_derivation_parameters_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.AnchorDescriptor_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AnchorDescriptor
	 */
	public AnchorDescriptor clone() {
		long ret = bindings.AnchorDescriptor_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorDescriptor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorDescriptor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two AnchorDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.AnchorDescriptor b) {
		boolean ret = bindings.AnchorDescriptor_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof AnchorDescriptor)) return false;
		return this.eq((AnchorDescriptor)o);
	}
	/**
	 * Returns the UTXO to be spent by the anchor input, which can be obtained via
	 * [`Self::unsigned_tx_input`].
	 */
	public TxOut previous_utxo() {
		long ret = bindings.AnchorDescriptor_previous_utxo(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the unsigned transaction input spending the anchor output in the commitment
	 * transaction.
	 */
	public TxIn unsigned_tx_input() {
		long ret = bindings.AnchorDescriptor_unsigned_tx_input(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxIn ret_conv = new TxIn(null, ret);
		return ret_conv;
	}

	/**
	 * Returns the witness script of the anchor output in the commitment transaction.
	 */
	public byte[] witness_script() {
		byte[] ret = bindings.AnchorDescriptor_witness_script(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the fully signed witness required to spend the anchor output in the commitment
	 * transaction.
	 */
	public byte[] tx_input_witness(byte[] signature) {
		byte[] ret = bindings.AnchorDescriptor_tx_input_witness(this.ptr, InternalUtils.check_arr_len(signature, 64));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(signature);
		return ret;
	}

	/**
	 * Derives the channel signer required to sign the anchor input.
	 */
	public WriteableEcdsaChannelSigner derive_channel_signer(org.ldk.structs.SignerProvider signer_provider) {
		long ret = bindings.AnchorDescriptor_derive_channel_signer(this.ptr, signer_provider.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(signer_provider);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableEcdsaChannelSigner ret_hu_conv = new WriteableEcdsaChannelSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		if (this != null) { this.ptrs_to.add(signer_provider); };
		return ret_hu_conv;
	}

}

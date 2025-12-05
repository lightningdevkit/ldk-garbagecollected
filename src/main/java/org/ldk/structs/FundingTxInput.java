package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An input to contribute to a channel's funding transaction either when using the v2 channel
 * establishment protocol or when splicing.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FundingTxInput extends CommonBase {
	FundingTxInput(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.FundingTxInput_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.FundingTxInput_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the FundingTxInput
	 */
	public FundingTxInput clone() {
		long ret = bindings.FundingTxInput_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.FundingTxInput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.FundingTxInput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the FundingTxInput object into a byte array which can be read by FundingTxInput_read
	 */
	public byte[] write() {
		byte[] ret = bindings.FundingTxInput_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a FundingTxInput from a byte array, created by FundingTxInput_write
	 */
	public static Result_FundingTxInputDecodeErrorZ read(byte[] ser) {
		long ret = bindings.FundingTxInput_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputDecodeErrorZ ret_hu_conv = Result_FundingTxInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2WPKH output from the given `prevtx` at index `vout`.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static Result_FundingTxInputNoneZ new_p2wpkh(byte[] prevtx, int vout) {
		long ret = bindings.FundingTxInput_new_p2wpkh(prevtx, vout);
		Reference.reachabilityFence(prevtx);
		Reference.reachabilityFence(vout);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2WSH output from the given `prevtx` at index `vout`.
	 * 
	 * Requires passing the weight of witness needed to satisfy the output's script.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static Result_FundingTxInputNoneZ new_p2wsh(byte[] prevtx, int vout, long witness_weight) {
		long ret = bindings.FundingTxInput_new_p2wsh(prevtx, vout, witness_weight);
		Reference.reachabilityFence(prevtx);
		Reference.reachabilityFence(vout);
		Reference.reachabilityFence(witness_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2TR output from the given `prevtx` at index `vout`.
	 * 
	 * This is meant for inputs spending a taproot output using the key path. See
	 * [`new_p2tr_script_spend`] for when spending using a script path.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`new_p2tr_script_spend`]: Self::new_p2tr_script_spend
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static Result_FundingTxInputNoneZ new_p2tr_key_spend(byte[] prevtx, int vout) {
		long ret = bindings.FundingTxInput_new_p2tr_key_spend(prevtx, vout);
		Reference.reachabilityFence(prevtx);
		Reference.reachabilityFence(vout);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2TR output from the given `prevtx` at index `vout`.
	 * 
	 * Requires passing the weight of witness needed to satisfy a script path of the taproot
	 * output. See [`new_p2tr_key_spend`] for when spending using the key path.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`new_p2tr_key_spend`]: Self::new_p2tr_key_spend
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static Result_FundingTxInputNoneZ new_p2tr_script_spend(byte[] prevtx, int vout, long witness_weight) {
		long ret = bindings.FundingTxInput_new_p2tr_script_spend(prevtx, vout, witness_weight);
		Reference.reachabilityFence(prevtx);
		Reference.reachabilityFence(vout);
		Reference.reachabilityFence(witness_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * The outpoint of the UTXO being spent.
	 */
	public OutPoint outpoint() {
		long ret = bindings.FundingTxInput_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The sequence number to use in the [`TxIn`].
	 * 
	 * [`TxIn`]: bitcoin::TxIn
	 */
	public int sequence() {
		int ret = bindings.FundingTxInput_sequence(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Sets the sequence number to use in the [`TxIn`].
	 * 
	 * [`TxIn`]: bitcoin::TxIn
	 */
	public void set_sequence(int sequence) {
		bindings.FundingTxInput_set_sequence(this.ptr, sequence);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(sequence);
	}

	/**
	 * Converts the [`FundingTxInput`] into a [`Utxo`] for coin selection.
	 */
	public Utxo into_utxo() {
		long ret = bindings.FundingTxInput_into_utxo(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		;
		return ret_hu_conv;
	}

}

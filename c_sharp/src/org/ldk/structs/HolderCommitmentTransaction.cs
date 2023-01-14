using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Information needed to build and sign a holder's commitment transaction.
 * 
 * The transaction is only signed once we are ready to broadcast.
 */
public class HolderCommitmentTransaction : CommonBase {
	internal HolderCommitmentTransaction(object _dummy, long ptr) : base(ptr) { }
	~HolderCommitmentTransaction() {
		if (ptr != 0) { bindings.HolderCommitmentTransaction_free(ptr); }
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public byte[] get_counterparty_sig() {
		byte[] ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public void set_counterparty_sig(byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, InternalUtils.check_arr_len(val, 64));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 * 
	 * Returns a copy of the field.
	 */
	public byte[][] get_counterparty_htlc_sigs() {
		byte[][] ret = bindings.HolderCommitmentTransaction_get_counterparty_htlc_sigs(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 */
	public void set_counterparty_htlc_sigs(byte[][] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val != null ? InternalUtils.mapArray(val, val_conv_8 => InternalUtils.check_arr_len(val_conv_8, 64)) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	internal long clone_ptr() {
		long ret = bindings.HolderCommitmentTransaction_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HolderCommitmentTransaction
	 */
	public HolderCommitmentTransaction clone() {
		long ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HolderCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the HolderCommitmentTransaction object into a byte array which can be read by HolderCommitmentTransaction_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a HolderCommitmentTransaction from a byte array, created by HolderCommitmentTransaction_write
	 */
	public static Result_HolderCommitmentTransactionDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HolderCommitmentTransaction_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new holder transaction with the given counterparty signatures.
	 * The funding keys are used to figure out which signature should go first when building the transaction for broadcast.
	 */
	public static HolderCommitmentTransaction of(org.ldk.structs.CommitmentTransaction commitment_tx, byte[] counterparty_sig, byte[][] counterparty_htlc_sigs, byte[] holder_funding_key, byte[] counterparty_funding_key) {
		long ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr, InternalUtils.check_arr_len(counterparty_sig, 64), counterparty_htlc_sigs != null ? InternalUtils.mapArray(counterparty_htlc_sigs, counterparty_htlc_sigs_conv_8 => InternalUtils.check_arr_len(counterparty_htlc_sigs_conv_8, 64)) : null, InternalUtils.check_arr_len(holder_funding_key, 33), InternalUtils.check_arr_len(counterparty_funding_key, 33));
		GC.KeepAlive(commitment_tx);
		GC.KeepAlive(counterparty_sig);
		GC.KeepAlive(counterparty_htlc_sigs);
		GC.KeepAlive(holder_funding_key);
		GC.KeepAlive(counterparty_funding_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HolderCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(commitment_tx); };
		return ret_hu_conv;
	}

}
} } }

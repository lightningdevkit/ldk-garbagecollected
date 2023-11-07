using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A pre-built Bitcoin commitment transaction and its txid.
 */
public class BuiltCommitmentTransaction : CommonBase {
	internal BuiltCommitmentTransaction(object _dummy, long ptr) : base(ptr) { }
	~BuiltCommitmentTransaction() {
		if (ptr != 0) { bindings.BuiltCommitmentTransaction_free(ptr); }
	}

	/**
	 * The commitment transaction
	 */
	public byte[] get_transaction() {
		long ret = bindings.BuiltCommitmentTransaction_get_transaction(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The commitment transaction
	 */
	public void set_transaction(byte[] val) {
		bindings.BuiltCommitmentTransaction_set_transaction(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The txid for the commitment transaction.
	 * 
	 * This is provided as a performance optimization, instead of calling transaction.txid()
	 * multiple times.
	 */
	public byte[] get_txid() {
		long ret = bindings.BuiltCommitmentTransaction_get_txid(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The txid for the commitment transaction.
	 * 
	 * This is provided as a performance optimization, instead of calling transaction.txid()
	 * multiple times.
	 */
	public void set_txid(byte[] val) {
		bindings.BuiltCommitmentTransaction_set_txid(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new BuiltCommitmentTransaction given each field
	 */
	public static BuiltCommitmentTransaction of(byte[] transaction_arg, byte[] txid_arg) {
		long ret = bindings.BuiltCommitmentTransaction_new(InternalUtils.encodeUint8Array(transaction_arg), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(txid_arg, 32)));
		GC.KeepAlive(transaction_arg);
		GC.KeepAlive(txid_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BuiltCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BuiltCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.BuiltCommitmentTransaction_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BuiltCommitmentTransaction
	 */
	public BuiltCommitmentTransaction clone() {
		long ret = bindings.BuiltCommitmentTransaction_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BuiltCommitmentTransaction ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BuiltCommitmentTransaction(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BuiltCommitmentTransaction object into a byte array which can be read by BuiltCommitmentTransaction_read
	 */
	public byte[] write() {
		long ret = bindings.BuiltCommitmentTransaction_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BuiltCommitmentTransaction from a byte array, created by BuiltCommitmentTransaction_write
	 */
	public static Result_BuiltCommitmentTransactionDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BuiltCommitmentTransaction_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the SIGHASH_ALL sighash value of the transaction.
	 * 
	 * This can be used to verify a signature.
	 */
	public byte[] get_sighash_all(byte[] funding_redeemscript, long channel_value_satoshis) {
		long ret = bindings.BuiltCommitmentTransaction_get_sighash_all(this.ptr, InternalUtils.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		GC.KeepAlive(this);
		GC.KeepAlive(funding_redeemscript);
		GC.KeepAlive(channel_value_satoshis);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signs the counterparty's commitment transaction.
	 */
	public byte[] sign_counterparty_commitment(byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis) {
		long ret = bindings.BuiltCommitmentTransaction_sign_counterparty_commitment(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_key, 32)), InternalUtils.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		GC.KeepAlive(this);
		GC.KeepAlive(funding_key);
		GC.KeepAlive(funding_redeemscript);
		GC.KeepAlive(channel_value_satoshis);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signs the holder commitment transaction because we are about to broadcast it.
	 */
	public byte[] sign_holder_commitment(byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.BuiltCommitmentTransaction_sign_holder_commitment(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(funding_key, 32)), InternalUtils.encodeUint8Array(funding_redeemscript), channel_value_satoshis, entropy_source.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(funding_key);
		GC.KeepAlive(funding_redeemscript);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		if (this != null) { this.ptrs_to.AddLast(entropy_source); };
		return ret_conv;
	}

}
} } }

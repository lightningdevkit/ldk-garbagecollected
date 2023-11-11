using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Implements the per-commitment secret storage scheme from
 * [BOLT 3](https://github.com/lightning/bolts/blob/dcbf8583976df087c79c3ce0b535311212e6812d/03-transactions.md#efficient-per-commitment-secret-storage).
 * 
 * Allows us to keep track of all of the revocation secrets of our counterparty in just 50*32 bytes
 * or so.
 */
public class CounterpartyCommitmentSecrets : CommonBase {
	internal CounterpartyCommitmentSecrets(object _dummy, long ptr) : base(ptr) { }
	~CounterpartyCommitmentSecrets() {
		if (ptr != 0) { bindings.CounterpartyCommitmentSecrets_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.CounterpartyCommitmentSecrets_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyCommitmentSecrets
	 */
	public CounterpartyCommitmentSecrets clone() {
		long ret = bindings.CounterpartyCommitmentSecrets_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CounterpartyCommitmentSecrets ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CounterpartyCommitmentSecrets(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new empty `CounterpartyCommitmentSecrets` structure.
	 */
	public static CounterpartyCommitmentSecrets of() {
		long ret = bindings.CounterpartyCommitmentSecrets_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CounterpartyCommitmentSecrets ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.CounterpartyCommitmentSecrets(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the minimum index of all stored secrets. Note that indexes start
	 * at 1 << 48 and get decremented by one for each new secret.
	 */
	public long get_min_seen_secret() {
		long ret = bindings.CounterpartyCommitmentSecrets_get_min_seen_secret(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Inserts the `secret` at `idx`. Returns `Ok(())` if the secret
	 * was generated in accordance with BOLT 3 and is consistent with previous secrets.
	 */
	public Result_NoneNoneZ provide_secret(long idx, byte[] secret) {
		long ret = bindings.CounterpartyCommitmentSecrets_provide_secret(this.ptr, idx, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(secret, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		GC.KeepAlive(secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the secret at `idx`.
	 * Returns `None` if `idx` is < [`CounterpartyCommitmentSecrets::get_min_seen_secret`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public byte[] get_secret(long idx) {
		long ret = bindings.CounterpartyCommitmentSecrets_get_secret(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Serialize the CounterpartyCommitmentSecrets object into a byte array which can be read by CounterpartyCommitmentSecrets_read
	 */
	public byte[] write() {
		long ret = bindings.CounterpartyCommitmentSecrets_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CounterpartyCommitmentSecrets from a byte array, created by CounterpartyCommitmentSecrets_write
	 */
	public static Result_CounterpartyCommitmentSecretsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CounterpartyCommitmentSecrets_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyCommitmentSecretsDecodeErrorZ ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

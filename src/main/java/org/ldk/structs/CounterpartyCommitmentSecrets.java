package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Implements the per-commitment secret storage scheme from
 * [BOLT 3](https://github.com/lightningnetwork/lightning-rfc/blob/dcbf8583976df087c79c3ce0b535311212e6812d/03-transactions.md#efficient-per-commitment-secret-storage).
 * 
 * Allows us to keep track of all of the revocation secrets of our counterparty in just 50*32 bytes
 * or so.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CounterpartyCommitmentSecrets extends CommonBase {
	CounterpartyCommitmentSecrets(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CounterpartyCommitmentSecrets_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.CounterpartyCommitmentSecrets_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyCommitmentSecrets
	 */
	public CounterpartyCommitmentSecrets clone() {
		long ret = bindings.CounterpartyCommitmentSecrets_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		CounterpartyCommitmentSecrets ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new CounterpartyCommitmentSecrets(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new empty `CounterpartyCommitmentSecrets` structure.
	 */
	public static CounterpartyCommitmentSecrets of() {
		long ret = bindings.CounterpartyCommitmentSecrets_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		CounterpartyCommitmentSecrets ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new CounterpartyCommitmentSecrets(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the minimum index of all stored secrets. Note that indexes start
	 * at 1 << 48 and get decremented by one for each new secret.
	 */
	public long get_min_seen_secret() {
		long ret = bindings.CounterpartyCommitmentSecrets_get_min_seen_secret(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Inserts the `secret` at `idx`. Returns `Ok(())` if the secret
	 * was generated in accordance with BOLT 3 and is consistent with previous secrets.
	 */
	public Result_NoneNoneZ provide_secret(long idx, byte[] secret) {
		long ret = bindings.CounterpartyCommitmentSecrets_provide_secret(this.ptr, idx, InternalUtils.check_arr_len(secret, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
		Reference.reachabilityFence(secret);
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
	@Nullable
	public byte[] get_secret(long idx) {
		byte[] ret = bindings.CounterpartyCommitmentSecrets_get_secret(this.ptr, idx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
		return ret;
	}

	/**
	 * Serialize the CounterpartyCommitmentSecrets object into a byte array which can be read by CounterpartyCommitmentSecrets_read
	 */
	public byte[] write() {
		byte[] ret = bindings.CounterpartyCommitmentSecrets_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a CounterpartyCommitmentSecrets from a byte array, created by CounterpartyCommitmentSecrets_write
	 */
	public static Result_CounterpartyCommitmentSecretsDecodeErrorZ read(byte[] ser) {
		long ret = bindings.CounterpartyCommitmentSecrets_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CounterpartyCommitmentSecretsDecodeErrorZ ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

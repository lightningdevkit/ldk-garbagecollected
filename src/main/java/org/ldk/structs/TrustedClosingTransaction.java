package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper on ClosingTransaction indicating that the built bitcoin
 * transaction is trusted.
 * 
 * See trust() and verify() functions on CommitmentTransaction.
 * 
 * This structure implements Deref.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TrustedClosingTransaction extends CommonBase {
	TrustedClosingTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TrustedClosingTransaction_free(ptr); }
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public byte[] built_transaction() {
		byte[] ret = bindings.TrustedClosingTransaction_built_transaction(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Get the SIGHASH_ALL sighash value of the transaction.
	 * 
	 * This can be used to verify a signature.
	 */
	public byte[] get_sighash_all(byte[] funding_redeemscript, long channel_value_satoshis) {
		byte[] ret = bindings.TrustedClosingTransaction_get_sighash_all(this.ptr, funding_redeemscript, channel_value_satoshis);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_redeemscript);
		Reference.reachabilityFence(channel_value_satoshis);
		return ret;
	}

	/**
	 * Sign a transaction, either because we are counter-signing the counterparty's transaction or
	 * because we are about to broadcast a holder transaction.
	 */
	public byte[] sign(byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis) {
		byte[] ret = bindings.TrustedClosingTransaction_sign(this.ptr, InternalUtils.check_arr_len(funding_key, 32), funding_redeemscript, channel_value_satoshis);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(funding_key);
		Reference.reachabilityFence(funding_redeemscript);
		Reference.reachabilityFence(channel_value_satoshis);
		return ret;
	}

}

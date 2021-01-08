package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BuiltCommitmentTransaction extends CommonBase {
	BuiltCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BuiltCommitmentTransaction_free(ptr); }
	}

	public BuiltCommitmentTransaction clone() {
		long ret = bindings.BuiltCommitmentTransaction_clone(this.ptr);
		BuiltCommitmentTransaction ret_hu_conv = new BuiltCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_transaction() {
		byte[] ret = bindings.BuiltCommitmentTransaction_get_transaction(this.ptr);
		return ret;
	}

	public void set_transaction(byte[] val) {
		bindings.BuiltCommitmentTransaction_set_transaction(this.ptr, val);
	}

	public byte[] get_txid() {
		byte[] ret = bindings.BuiltCommitmentTransaction_get_txid(this.ptr);
		return ret;
	}

	public void set_txid(byte[] val) {
		bindings.BuiltCommitmentTransaction_set_txid(this.ptr, val);
	}

	public static BuiltCommitmentTransaction constructor_new(byte[] transaction_arg, byte[] txid_arg) {
		long ret = bindings.BuiltCommitmentTransaction_new(transaction_arg, txid_arg);
		BuiltCommitmentTransaction ret_hu_conv = new BuiltCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.BuiltCommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static BuiltCommitmentTransaction constructor_read(byte[] ser) {
		long ret = bindings.BuiltCommitmentTransaction_read(ser);
		BuiltCommitmentTransaction ret_hu_conv = new BuiltCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_sighash_all(byte[] funding_redeemscript, long channel_value_satoshis) {
		byte[] ret = bindings.BuiltCommitmentTransaction_get_sighash_all(this.ptr, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

	public byte[] sign(byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis) {
		byte[] ret = bindings.BuiltCommitmentTransaction_sign(this.ptr, funding_key, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

}

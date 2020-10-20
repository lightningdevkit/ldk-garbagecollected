package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HolderCommitmentTransaction extends CommonBase {
	HolderCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.HolderCommitmentTransaction_free(ptr);
	}

	public static HolderCommitmentTransaction constructor_clone(HolderCommitmentTransaction orig) {
		long ret = bindings.HolderCommitmentTransaction_clone(orig == null ? 0 : orig.ptr & ~1);
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	// Skipped HolderCommitmentTransaction_get_unsigned_tx
	// Skipped HolderCommitmentTransaction_set_unsigned_tx
	public byte[] get_counterparty_sig() {
		byte[] ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		return ret;
	}

	public void set_counterparty_sig(byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, val);
	}

	public int get_feerate_per_kw() {
		int ret = bindings.HolderCommitmentTransaction_get_feerate_per_kw(this.ptr);
		return ret;
	}

	public void set_feerate_per_kw(int val) {
		bindings.HolderCommitmentTransaction_set_feerate_per_kw(this.ptr, val);
	}

	public void set_per_htlc(TwoTuple<HTLCOutputInCommitment, byte[]>[] val) {
		bindings.HolderCommitmentTransaction_set_per_htlc(this.ptr, Arrays.stream(val).mapToLong(arr_conv_42 -> /*TODO b*/0).toArray());
		/* TODO 2 TwoTuple<HTLCOutputInCommitment, byte[]>  */;
	}

	// Skipped HolderCommitmentTransaction_new_missing_holder_sig
	public TxCreationKeys trust_key_derivation() {
		long ret = bindings.HolderCommitmentTransaction_trust_key_derivation(this.ptr);
		TxCreationKeys ret_hu_conv = new TxCreationKeys(null, ret);
		return ret_hu_conv;
	}

	public byte[] txid() {
		byte[] ret = bindings.HolderCommitmentTransaction_txid(this.ptr);
		return ret;
	}

	public byte[] get_holder_sig(byte[] funding_key, byte[] funding_redeemscript, long channel_value_satoshis) {
		byte[] ret = bindings.HolderCommitmentTransaction_get_holder_sig(this.ptr, funding_key, funding_redeemscript, channel_value_satoshis);
		return ret;
	}

	// Skipped HolderCommitmentTransaction_get_htlc_sigs
	public byte[] write(HolderCommitmentTransaction obj) {
		byte[] ret = bindings.HolderCommitmentTransaction_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static HolderCommitmentTransaction constructor_read(byte[] ser) {
		long ret = bindings.HolderCommitmentTransaction_read(ser);
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

}

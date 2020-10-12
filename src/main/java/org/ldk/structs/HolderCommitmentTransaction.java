package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class HolderCommitmentTransaction extends CommonBase {
	HolderCommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.HolderCommitmentTransaction_free(ptr); super.finalize();
	}

	public HolderCommitmentTransaction(HolderCommitmentTransaction orig) {
		super(bindings.HolderCommitmentTransaction_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	// Skipped HolderCommitmentTransaction_get_unsigned_tx
	// Skipped HolderCommitmentTransaction_set_unsigned_tx
	public byte[] get_counterparty_sig(HolderCommitmentTransaction this_ptr) {
		byte[] ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_counterparty_sig(HolderCommitmentTransaction this_ptr, byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_feerate_per_kw(HolderCommitmentTransaction this_ptr) {
		int ret = bindings.HolderCommitmentTransaction_get_feerate_per_kw(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_feerate_per_kw(HolderCommitmentTransaction this_ptr, int val) {
		bindings.HolderCommitmentTransaction_set_feerate_per_kw(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped HolderCommitmentTransaction_set_per_htlc
	// Skipped HolderCommitmentTransaction_new_missing_holder_sig
	public TxCreationKeys trust_key_derivation() {
		TxCreationKeys ret = new TxCreationKeys(null, bindings.HolderCommitmentTransaction_trust_key_derivation(this.ptr));
		return ret;
	}

	public byte[] txid() {
		byte[] ret = bindings.HolderCommitmentTransaction_txid(this.ptr);
		return ret;
	}

	// Skipped HolderCommitmentTransaction_get_holder_sig
	// Skipped HolderCommitmentTransaction_get_htlc_sigs
	// Skipped HolderCommitmentTransaction_write
	// Skipped HolderCommitmentTransaction_read
}

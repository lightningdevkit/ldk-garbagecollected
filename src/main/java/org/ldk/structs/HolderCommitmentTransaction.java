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
		if (ptr != 0) { bindings.HolderCommitmentTransaction_free(ptr); }
	}

	public HolderCommitmentTransaction clone() {
		long ret = bindings.HolderCommitmentTransaction_clone(this.ptr);
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public byte[] get_counterparty_sig() {
		byte[] ret = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		return ret;
	}

	public void set_counterparty_sig(byte[] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, val);
	}

	public void set_counterparty_htlc_sigs(byte[][] val) {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, val);
	}

	public byte[] write() {
		byte[] ret = bindings.HolderCommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static HolderCommitmentTransaction constructor_read(byte[] ser) {
		long ret = bindings.HolderCommitmentTransaction_read(ser);
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		return ret_hu_conv;
	}

	public static HolderCommitmentTransaction constructor_new(CommitmentTransaction commitment_tx, byte[] counterparty_sig, byte[][] counterparty_htlc_sigs, byte[] holder_funding_key, byte[] counterparty_funding_key) {
		long ret = bindings.HolderCommitmentTransaction_new(commitment_tx == null ? 0 : commitment_tx.ptr & ~1, counterparty_sig, counterparty_htlc_sigs, holder_funding_key, counterparty_funding_key);
		HolderCommitmentTransaction ret_hu_conv = new HolderCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

}

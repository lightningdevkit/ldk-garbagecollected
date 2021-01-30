package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CommitmentTransaction extends CommonBase {
	CommitmentTransaction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CommitmentTransaction_free(ptr); }
	}

	public CommitmentTransaction clone() {
		long ret = bindings.CommitmentTransaction_clone(this.ptr);
		CommitmentTransaction ret_hu_conv = new CommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.CommitmentTransaction_write(this.ptr);
		return ret;
	}

	public static CommitmentTransaction constructor_read(byte[] ser) {
		long ret = bindings.CommitmentTransaction_read(ser);
		CommitmentTransaction ret_hu_conv = new CommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public long commitment_number() {
		long ret = bindings.CommitmentTransaction_commitment_number(this.ptr);
		return ret;
	}

	public long to_broadcaster_value_sat() {
		long ret = bindings.CommitmentTransaction_to_broadcaster_value_sat(this.ptr);
		return ret;
	}

	public long to_countersignatory_value_sat() {
		long ret = bindings.CommitmentTransaction_to_countersignatory_value_sat(this.ptr);
		return ret;
	}

	public int feerate_per_kw() {
		int ret = bindings.CommitmentTransaction_feerate_per_kw(this.ptr);
		return ret;
	}

	public TrustedCommitmentTransaction trust() {
		long ret = bindings.CommitmentTransaction_trust(this.ptr);
		TrustedCommitmentTransaction ret_hu_conv = new TrustedCommitmentTransaction(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Result_TrustedCommitmentTransactionNoneZ verify(DirectedChannelTransactionParameters channel_parameters, ChannelPublicKeys broadcaster_keys, ChannelPublicKeys countersignatory_keys) {
		long ret = bindings.CommitmentTransaction_verify(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr & ~1, broadcaster_keys == null ? 0 : broadcaster_keys.ptr & ~1, countersignatory_keys == null ? 0 : countersignatory_keys.ptr & ~1);
		Result_TrustedCommitmentTransactionNoneZ ret_hu_conv = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(channel_parameters);
		this.ptrs_to.add(broadcaster_keys);
		this.ptrs_to.add(countersignatory_keys);
		return ret_hu_conv;
	}

}

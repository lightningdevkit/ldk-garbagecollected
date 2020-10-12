package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

public class FeeEstimator extends CommonBase {
	FeeEstimator(Object _dummy, long ptr) { super(ptr); }
	public FeeEstimator(bindings.LDKFeeEstimator arg) {
		super(bindings.LDKFeeEstimator_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.FeeEstimator_free(ptr); super.finalize();
	}

	public int call_get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target) {
		int ret = bindings.FeeEstimator_call_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		return ret;
	}

}

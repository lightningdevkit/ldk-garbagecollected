package org.ldk.structs;

import org.ldk.impl.bindings;

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

}

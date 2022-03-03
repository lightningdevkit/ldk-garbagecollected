package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

/**
 * A trait which should be implemented to provide feerate information on a number of time
 * horizons.
 * 
 * Note that all of the functions implemented here *must* be reentrant-safe (obviously - they're
 * called from inside the library in response to chain events, P2P events, or timer events).
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class FeeEstimator extends CommonBase {
	final bindings.LDKFeeEstimator bindings_instance;
	FeeEstimator(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private FeeEstimator(bindings.LDKFeeEstimator arg) {
		super(bindings.LDKFeeEstimator_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.FeeEstimator_free(ptr); } super.finalize();
	}

	public static interface FeeEstimatorInterface {
		/**
		 * Gets estimated satoshis of fee required per 1000 Weight-Units.
		 * 
		 * Must return a value no smaller than 253 (ie 1 satoshi-per-byte rounded up to ensure later
		 * round-downs don't put us below 1 satoshi-per-byte).
		 * 
		 * This method can be implemented with the following unit conversions:
		 * max(satoshis-per-byte * 250, 253)
		 * max(satoshis-per-kbyte / 4, 253)
		 */
		int get_est_sat_per_1000_weight(ConfirmationTarget confirmation_target);
	}
	private static class LDKFeeEstimatorHolder { FeeEstimator held; }
	public static FeeEstimator new_impl(FeeEstimatorInterface arg) {
		final LDKFeeEstimatorHolder impl_holder = new LDKFeeEstimatorHolder();
		impl_holder.held = new FeeEstimator(new bindings.LDKFeeEstimator() {
			@Override public int get_est_sat_per_1000_weight(ConfirmationTarget confirmation_target) {
				int ret = arg.get_est_sat_per_1000_weight(confirmation_target);
				Reference.reachabilityFence(arg);
				return ret;
			}
		});
		return impl_holder.held;
	}
	/**
	 * Gets estimated satoshis of fee required per 1000 Weight-Units.
	 * 
	 * Must return a value no smaller than 253 (ie 1 satoshi-per-byte rounded up to ensure later
	 * round-downs don't put us below 1 satoshi-per-byte).
	 * 
	 * This method can be implemented with the following unit conversions:
	 * max(satoshis-per-byte * 250, 253)
	 * max(satoshis-per-kbyte / 4, 253)
	 */
	public int get_est_sat_per_1000_weight(org.ldk.enums.ConfirmationTarget confirmation_target) {
		int ret = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(confirmation_target);
		return ret;
	}

}

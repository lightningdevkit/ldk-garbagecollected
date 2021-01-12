
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		int get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target);
	}
	private static class LDKFeeEstimatorHolder { FeeEstimator held; }
	public static FeeEstimator new_impl(FeeEstimatorInterface arg) {
		final LDKFeeEstimatorHolder impl_holder = new LDKFeeEstimatorHolder();
		impl_holder.held = new FeeEstimator(new bindings.LDKFeeEstimator() {
			@Override public int get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target) {
				int ret = arg.get_est_sat_per_1000_weight(confirmation_target);
				return ret;
			}
		});
		return impl_holder.held;
	}
	public int get_est_sat_per_1000_weight(LDKConfirmationTarget confirmation_target) {
		int ret = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		return ret;
	}

}

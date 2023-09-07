using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait which should be implemented to provide feerate information on a number of time
 * horizons.
 * 
 * If access to a local mempool is not feasible, feerate estimates should be fetched from a set of
 * third-parties hosting them. Note that this enables them to affect the propagation of your
 * pre-signed transactions at any time and therefore endangers the safety of channels funds. It
 * should be considered carefully as a deployment.
 * 
 * Note that all of the functions implemented here *must* be reentrant-safe (obviously - they're
 * called from inside the library in response to chain events, P2P events, or timer events).
 */
public class FeeEstimator : CommonBase {
	internal readonly bindings.LDKFeeEstimator bindings_instance;
	internal FeeEstimator(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private FeeEstimator(bindings.LDKFeeEstimator arg) : base(bindings.LDKFeeEstimator_new(arg)) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~FeeEstimator() {
		if (ptr != 0) { bindings.FeeEstimator_free(ptr); }
	}

	public interface FeeEstimatorInterface {
		/**
		 * Gets estimated satoshis of fee required per 1000 Weight-Units.
		 * 
		 * LDK will wrap this method and ensure that the value returned is no smaller than 253
		 * (ie 1 satoshi-per-byte rounded up to ensure later round-downs don't put us below 1 satoshi-per-byte).
		 * 
		 * The following unit conversions can be used to convert to sats/KW:
		 * satoshis-per-byte * 250
		 * satoshis-per-kbyte / 4
		 */
		int get_est_sat_per_1000_weight(ConfirmationTarget _confirmation_target);
	}
	private class LDKFeeEstimatorHolder { internal FeeEstimator held; }
	private class LDKFeeEstimatorImpl : bindings.LDKFeeEstimator {
		internal LDKFeeEstimatorImpl(FeeEstimatorInterface arg, LDKFeeEstimatorHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private FeeEstimatorInterface arg;
		private LDKFeeEstimatorHolder impl_holder;
		public int get_est_sat_per_1000_weight(ConfirmationTarget _confirmation_target) {
			int ret = arg.get_est_sat_per_1000_weight(_confirmation_target);
				GC.KeepAlive(arg);
			return ret;
		}
	}
	public static FeeEstimator new_impl(FeeEstimatorInterface arg) {
		LDKFeeEstimatorHolder impl_holder = new LDKFeeEstimatorHolder();
		impl_holder.held = new FeeEstimator(new LDKFeeEstimatorImpl(arg, impl_holder));
		return impl_holder.held;
	}
	/**
	 * Gets estimated satoshis of fee required per 1000 Weight-Units.
	 * 
	 * LDK will wrap this method and ensure that the value returned is no smaller than 253
	 * (ie 1 satoshi-per-byte rounded up to ensure later round-downs don't put us below 1 satoshi-per-byte).
	 * 
	 * The following unit conversions can be used to convert to sats/KW:
	 * satoshis-per-byte * 250
	 * satoshis-per-kbyte / 4
	 */
	public int get_est_sat_per_1000_weight(ConfirmationTarget confirmation_target) {
		int ret = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		GC.KeepAlive(this);
		GC.KeepAlive(confirmation_target);
		return ret;
	}

}
} } }

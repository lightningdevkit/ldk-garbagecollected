

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of FeeEstimator */
export interface FeeEstimatorInterface {
	/**Gets estimated satoshis of fee required per 1000 Weight-Units.
	 * 
	 * LDK will wrap this method and ensure that the value returned is no smaller than 253
	 * (ie 1 satoshi-per-byte rounded up to ensure later round-downs don't put us below 1 satoshi-per-byte).
	 * 
	 * The following unit conversions can be used to convert to sats/KW:
	 * satoshis-per-byte * 250
	 * satoshis-per-kbyte / 4
	 */
	get_est_sat_per_1000_weight(confirmation_target: ConfirmationTarget): number;
}

class LDKFeeEstimatorHolder {
	held: FeeEstimator|null = null;
}

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
 * 
 * LDK may generate a substantial number of fee-estimation calls in some cases. You should
 * pre-calculate and cache the fee estimate results to ensure you don't substantially slow HTLC
 * handling.
 */
export class FeeEstimator extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKFeeEstimator|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FeeEstimator_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of FeeEstimator from a given implementation */
	public static new_impl(arg: FeeEstimatorInterface): FeeEstimator {
		const impl_holder: LDKFeeEstimatorHolder = new LDKFeeEstimatorHolder();
		let structImplementation = {
			get_est_sat_per_1000_weight (confirmation_target: ConfirmationTarget): number {
				const ret: number = arg.get_est_sat_per_1000_weight(confirmation_target);
				return ret;
			},
		} as bindings.LDKFeeEstimator;
		const ptr_idx: [bigint, number] = bindings.LDKFeeEstimator_new(structImplementation);

		impl_holder.held = new FeeEstimator(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
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
	public get_est_sat_per_1000_weight(confirmation_target: ConfirmationTarget): number {
		const ret: number = bindings.FeeEstimator_get_est_sat_per_1000_weight(this.ptr, confirmation_target);
		return ret;
	}

}

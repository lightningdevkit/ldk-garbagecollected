
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`ScoreLookUp`] implementation that factors in in-flight HTLC liquidity.
 * 
 * Useful for custom [`Router`] implementations to wrap their [`ScoreLookUp`] on-the-fly when calling
 * [`find_route`].
 * 
 * [`ScoreLookUp`]: crate::routing::scoring::ScoreLookUp
 */
export class ScorerAccountingForInFlightHtlcs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ScorerAccountingForInFlightHtlcs_free);
	}

	/**
	 * Initialize a new `ScorerAccountingForInFlightHtlcs`.
	 */
	public static constructor_new(scorer: ScoreLookUp, inflight_htlcs: InFlightHtlcs): ScorerAccountingForInFlightHtlcs {
		const ret: bigint = bindings.ScorerAccountingForInFlightHtlcs_new(CommonBase.get_ptr_of(scorer), CommonBase.get_ptr_of(inflight_htlcs));
		const ret_hu_conv: ScorerAccountingForInFlightHtlcs = new ScorerAccountingForInFlightHtlcs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, scorer);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public as_ScoreLookUp(): ScoreLookUp {
		const ret: bigint = bindings.ScorerAccountingForInFlightHtlcs_as_ScoreLookUp(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

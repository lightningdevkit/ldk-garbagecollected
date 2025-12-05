
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`CandidateRouteHop::OneHopBlinded`] entry.
 */
export class OneHopBlindedPathCandidate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OneHopBlindedPathCandidate_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OneHopBlindedPathCandidate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OneHopBlindedPathCandidate
	 */
	public clone(): OneHopBlindedPathCandidate {
		const ret: bigint = bindings.OneHopBlindedPathCandidate_clone(this.ptr);
		const ret_hu_conv: OneHopBlindedPathCandidate = new OneHopBlindedPathCandidate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

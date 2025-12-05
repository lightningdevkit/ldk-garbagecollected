
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`CandidateRouteHop::Blinded`] entry.
 */
export class BlindedPathCandidate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedPathCandidate_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedPathCandidate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedPathCandidate
	 */
	public clone(): BlindedPathCandidate {
		const ret: bigint = bindings.BlindedPathCandidate_clone(this.ptr);
		const ret_hu_conv: BlindedPathCandidate = new BlindedPathCandidate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

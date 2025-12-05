
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`CandidateRouteHop::FirstHop`] entry.
 */
export class FirstHopCandidate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FirstHopCandidate_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FirstHopCandidate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FirstHopCandidate
	 */
	public clone(): FirstHopCandidate {
		const ret: bigint = bindings.FirstHopCandidate_clone(this.ptr);
		const ret_hu_conv: FirstHopCandidate = new FirstHopCandidate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`CandidateRouteHop::PrivateHop`] entry.
 */
export class PrivateHopCandidate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PrivateHopCandidate_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PrivateHopCandidate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PrivateHopCandidate
	 */
	public clone(): PrivateHopCandidate {
		const ret: bigint = bindings.PrivateHopCandidate_clone(this.ptr);
		const ret_hu_conv: PrivateHopCandidate = new PrivateHopCandidate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

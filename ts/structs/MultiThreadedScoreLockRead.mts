
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A locked `MultiThreadedLockableScore`.
 */
export class MultiThreadedScoreLockRead extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MultiThreadedScoreLockRead_free);
	}

	/**
	 * Constructs a new ScoreLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreLookUp must be freed before this_arg is
	 */
	public as_ScoreLookUp(): ScoreLookUp {
		const ret: bigint = bindings.MultiThreadedScoreLockRead_as_ScoreLookUp(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

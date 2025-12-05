
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A locked `MultiThreadedLockableScore`.
 */
export class MultiThreadedScoreLockWrite extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MultiThreadedScoreLockWrite_free);
	}

	/**
	 * Serialize the MultiThreadedScoreLockWrite object into a byte array which can be read by MultiThreadedScoreLockWrite_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.MultiThreadedScoreLockWrite_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public as_ScoreUpdate(): ScoreUpdate {
		const ret: bigint = bindings.MultiThreadedScoreLockWrite_as_ScoreUpdate(this.ptr);
		const ret_hu_conv: ScoreUpdate = new ScoreUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

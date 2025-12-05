

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of LockableScore */
export interface LockableScoreInterface {
	/**Returns read locked scorer.
	 */
	read_lock(): ScoreLookUp;
	/**Returns write locked scorer.
	 */
	write_lock(): ScoreUpdate;
}

class LDKLockableScoreHolder {
	held: LockableScore|null = null;
}

/**
 * A scorer that is accessed under a lock.
 * 
 * Needed so that calls to [`ScoreLookUp::channel_penalty_msat`] in [`find_route`] can be made while
 * having shared ownership of a scorer but without requiring internal locking in [`ScoreUpdate`]
 * implementations. Internal locking would be detrimental to route finding performance and could
 * result in [`ScoreLookUp::channel_penalty_msat`] returning a different value for the same channel.
 * 
 * [`find_route`]: crate::routing::router::find_route
 */
export class LockableScore extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKLockableScore|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.LockableScore_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of LockableScore from a given implementation */
	public static new_impl(arg: LockableScoreInterface): LockableScore {
		const impl_holder: LDKLockableScoreHolder = new LDKLockableScoreHolder();
		let structImplementation = {
			read_lock (): bigint {
				const ret: ScoreLookUp = arg.read_lock();
				const result: bigint = CommonBase.get_ptr_of(ret);
				CommonBase.add_ref_from(impl_holder.held, ret);
				return result;
			},
			write_lock (): bigint {
				const ret: ScoreUpdate = arg.write_lock();
				const result: bigint = CommonBase.get_ptr_of(ret);
				CommonBase.add_ref_from(impl_holder.held, ret);
				return result;
			},
		} as bindings.LDKLockableScore;
		const ptr_idx: [bigint, number] = bindings.LDKLockableScore_new(structImplementation);

		impl_holder.held = new LockableScore(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns read locked scorer.
	 */
	public read_lock(): ScoreLookUp {
		const ret: bigint = bindings.LockableScore_read_lock(this.ptr);
		const ret_hu_conv: ScoreLookUp = new ScoreLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns write locked scorer.
	 */
	public write_lock(): ScoreUpdate {
		const ret: bigint = bindings.LockableScore_write_lock(this.ptr);
		const ret_hu_conv: ScoreUpdate = new ScoreUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

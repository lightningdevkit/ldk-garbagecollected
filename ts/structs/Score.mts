

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Score */
export interface ScoreInterface {
	/**Serialize the object into a byte array
	 */
	write(): Uint8Array;
}

class LDKScoreHolder {
	held: Score|null = null;
}

/**
 * A trait which can both lookup and update routing channel penalty scores.
 * 
 * This is used in places where both bounds are required and implemented for all types which
 * implement [`ScoreLookUp`] and [`ScoreUpdate`].
 * 
 * Bindings users may need to manually implement this for their custom scoring implementations.
 */
export class Score extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKScore|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Score_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Score from a given implementation */
	public static new_impl(arg: ScoreInterface, scoreLookUp_impl: ScoreLookUpInterface, scoreUpdate_impl: ScoreUpdateInterface): Score {
		const impl_holder: LDKScoreHolder = new LDKScoreHolder();
		let structImplementation = {
			write (): number {
				const ret: Uint8Array = arg.write();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKScore;
		const scoreLookUp = ScoreLookUp.new_impl(scoreLookUp_impl);
		const scoreUpdate = ScoreUpdate.new_impl(scoreUpdate_impl);
		const ptr_idx: [bigint, number] = bindings.LDKScore_new(structImplementation, scoreLookUp.instance_idx!, scoreUpdate.instance_idx!);

		impl_holder.held = new Score(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(scoreLookUp);
		impl_holder.held.ptrs_to.push(scoreUpdate);
		return impl_holder.held!;
	}

	/**
	 * Serialize the object into a byte array
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Score_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}

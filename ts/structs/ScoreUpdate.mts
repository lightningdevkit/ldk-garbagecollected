

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of ScoreUpdate */
export interface ScoreUpdateInterface {
	/**Handles updating channel penalties after failing to route through a channel.
	 */
	payment_path_failed(path: Path, short_channel_id: bigint, duration_since_epoch: bigint): void;
	/**Handles updating channel penalties after successfully routing along a path.
	 */
	payment_path_successful(path: Path, duration_since_epoch: bigint): void;
	/**Handles updating channel penalties after a probe over the given path failed.
	 */
	probe_failed(path: Path, short_channel_id: bigint, duration_since_epoch: bigint): void;
	/**Handles updating channel penalties after a probe over the given path succeeded.
	 */
	probe_successful(path: Path, duration_since_epoch: bigint): void;
	/**Scorers may wish to reduce their certainty of channel liquidity information over time.
	 * Thus, this method is provided to allow scorers to observe the passage of time - the holder
	 * of this object should call this method regularly (generally via the
	 * `lightning-background-processor` crate).
	 */
	time_passed(duration_since_epoch: bigint): void;
}

class LDKScoreUpdateHolder {
	held: ScoreUpdate|null = null;
}

/**
 * `ScoreUpdate` is used to update the scorer's internal state after a payment attempt.
 */
export class ScoreUpdate extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKScoreUpdate|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ScoreUpdate_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of ScoreUpdate from a given implementation */
	public static new_impl(arg: ScoreUpdateInterface): ScoreUpdate {
		const impl_holder: LDKScoreUpdateHolder = new LDKScoreUpdateHolder();
		let structImplementation = {
			payment_path_failed (path: bigint, short_channel_id: bigint, duration_since_epoch: bigint): void {
				const path_hu_conv: Path = new Path(null, path);
				arg.payment_path_failed(path_hu_conv, short_channel_id, duration_since_epoch);
			},
			payment_path_successful (path: bigint, duration_since_epoch: bigint): void {
				const path_hu_conv: Path = new Path(null, path);
				arg.payment_path_successful(path_hu_conv, duration_since_epoch);
			},
			probe_failed (path: bigint, short_channel_id: bigint, duration_since_epoch: bigint): void {
				const path_hu_conv: Path = new Path(null, path);
				arg.probe_failed(path_hu_conv, short_channel_id, duration_since_epoch);
			},
			probe_successful (path: bigint, duration_since_epoch: bigint): void {
				const path_hu_conv: Path = new Path(null, path);
				arg.probe_successful(path_hu_conv, duration_since_epoch);
			},
			time_passed (duration_since_epoch: bigint): void {
				arg.time_passed(duration_since_epoch);
			},
		} as bindings.LDKScoreUpdate;
		const ptr_idx: [bigint, number] = bindings.LDKScoreUpdate_new(structImplementation);

		impl_holder.held = new ScoreUpdate(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Handles updating channel penalties after failing to route through a channel.
	 */
	public payment_path_failed(path: Path, short_channel_id: bigint, duration_since_epoch: bigint): void {
		bindings.ScoreUpdate_payment_path_failed(this.ptr, CommonBase.get_ptr_of(path), short_channel_id, duration_since_epoch);
	}

	/**
	 * Handles updating channel penalties after successfully routing along a path.
	 */
	public payment_path_successful(path: Path, duration_since_epoch: bigint): void {
		bindings.ScoreUpdate_payment_path_successful(this.ptr, CommonBase.get_ptr_of(path), duration_since_epoch);
	}

	/**
	 * Handles updating channel penalties after a probe over the given path failed.
	 */
	public probe_failed(path: Path, short_channel_id: bigint, duration_since_epoch: bigint): void {
		bindings.ScoreUpdate_probe_failed(this.ptr, CommonBase.get_ptr_of(path), short_channel_id, duration_since_epoch);
	}

	/**
	 * Handles updating channel penalties after a probe over the given path succeeded.
	 */
	public probe_successful(path: Path, duration_since_epoch: bigint): void {
		bindings.ScoreUpdate_probe_successful(this.ptr, CommonBase.get_ptr_of(path), duration_since_epoch);
	}

	/**
	 * Scorers may wish to reduce their certainty of channel liquidity information over time.
	 * Thus, this method is provided to allow scorers to observe the passage of time - the holder
	 * of this object should call this method regularly (generally via the
	 * `lightning-background-processor` crate).
	 */
	public time_passed(duration_since_epoch: bigint): void {
		bindings.ScoreUpdate_time_passed(this.ptr, duration_since_epoch);
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A concrete implementation of [`LockableScore`] which supports multi-threading.
 */
export class MultiThreadedLockableScore extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.MultiThreadedLockableScore_free);
	}

	/**
	 * Constructs a new LockableScore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned LockableScore must be freed before this_arg is
	 */
	public as_LockableScore(): LockableScore {
		const ret: bigint = bindings.MultiThreadedLockableScore_as_LockableScore(this.ptr);
		const ret_hu_conv: LockableScore = new LockableScore(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the MultiThreadedLockableScore object into a byte array which can be read by MultiThreadedLockableScore_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.MultiThreadedLockableScore_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Constructs a new WriteableScore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned WriteableScore must be freed before this_arg is
	 */
	public as_WriteableScore(): WriteableScore {
		const ret: bigint = bindings.MultiThreadedLockableScore_as_WriteableScore(this.ptr);
		const ret_hu_conv: WriteableScore = new WriteableScore(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`MultiThreadedLockableScore`] given an underlying [`Score`].
	 */
	public static constructor_new(score: Score): MultiThreadedLockableScore {
		const ret: bigint = bindings.MultiThreadedLockableScore_new(CommonBase.get_ptr_of(score));
		const ret_hu_conv: MultiThreadedLockableScore = new MultiThreadedLockableScore(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, score);
		return ret_hu_conv;
	}

}

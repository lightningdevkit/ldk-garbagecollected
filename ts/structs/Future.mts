
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A simple future which can complete once, and calls some callback(s) when it does so.
 */
export class Future extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Future_free);
	}

	/**
	 * Registers a callback to be called upon completion of this future. If the future has already
	 * completed, the callback will be called immediately.
	 */
	public register_callback_fn(callback: FutureCallback): void {
		bindings.Future_register_callback_fn(this.ptr, CommonBase.get_ptr_of(callback));
		CommonBase.add_ref_from(this, callback);
	}

}

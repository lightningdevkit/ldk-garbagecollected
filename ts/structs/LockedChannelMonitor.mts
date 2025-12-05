
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * This type represents a lock and MUST BE MANUALLY FREE'd!
 * A read-only reference to a current ChannelMonitor.
 * 
 * Note that this holds a mutex in [`ChainMonitor`] and may block other events until it is
 * released.
 */
export class LockedChannelMonitor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, () => { throw new Error("Locks must be manually freed with free()"); });
	}
	/** Releases this lock */
	public free() {
		bindings.LockedChannelMonitor_free(this.ptr);
		CommonBase.set_null_skip_free(this);
	}

}

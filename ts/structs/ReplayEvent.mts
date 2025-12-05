
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An error type that may be returned to LDK in order to safely abort event handling if it can't
 * currently succeed (e.g., due to a persistence failure).
 * 
 * Depending on the type, LDK may ensure the event is persisted and will eventually be replayed.
 * Please refer to the documentation of each [`Event`] variant for more details.
 */
export class ReplayEvent extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReplayEvent_free);
	}

	/**
	 * Constructs a new ReplayEvent given each field
	 */
	public static constructor_new(): ReplayEvent {
		const ret: bigint = bindings.ReplayEvent_new();
		const ret_hu_conv: ReplayEvent = new ReplayEvent(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReplayEvent_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReplayEvent
	 */
	public clone(): ReplayEvent {
		const ret: bigint = bindings.ReplayEvent_clone(this.ptr);
		const ret_hu_conv: ReplayEvent = new ReplayEvent(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

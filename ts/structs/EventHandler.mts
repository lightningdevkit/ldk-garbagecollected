

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of EventHandler */
export interface EventHandlerInterface {
	/**Handles the given [`Event`].
	 * 
	 * See [`EventsProvider`] for details that must be considered when implementing this method.
	 */
	handle_event(event: Event): Result_NoneReplayEventZ;
}

class LDKEventHandlerHolder {
	held: EventHandler|null = null;
}

/**
 * A trait implemented for objects handling events from [`EventsProvider`].
 * 
 * An async variation also exists for implementations of [`EventsProvider`] that support async
 * event handling. The async event handler should satisfy the generic bounds: `F:
 * core::future::Future<Output = Result<(), ReplayEvent>>, H: Fn(Event) -> F`.
 */
export class EventHandler extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKEventHandler|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.EventHandler_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of EventHandler from a given implementation */
	public static new_impl(arg: EventHandlerInterface): EventHandler {
		const impl_holder: LDKEventHandlerHolder = new LDKEventHandlerHolder();
		let structImplementation = {
			handle_event (event: bigint): bigint {
				const event_hu_conv: Event = Event.constr_from_ptr(event);
				CommonBase.add_ref_from(event_hu_conv, this);
				const ret: Result_NoneReplayEventZ = arg.handle_event(event_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKEventHandler;
		const ptr_idx: [bigint, number] = bindings.LDKEventHandler_new(structImplementation);

		impl_holder.held = new EventHandler(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Handles the given [`Event`].
	 * 
	 * See [`EventsProvider`] for details that must be considered when implementing this method.
	 */
	public handle_event(event: Event): Result_NoneReplayEventZ {
		const ret: bigint = bindings.EventHandler_handle_event(this.ptr, CommonBase.get_ptr_of(event));
		const ret_hu_conv: Result_NoneReplayEventZ = Result_NoneReplayEventZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

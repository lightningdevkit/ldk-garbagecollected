

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of FutureCallback */
export interface FutureCallbackInterface {
	/**The method which is called.
	 */
	call(): void;
}

class LDKFutureCallbackHolder {
	held: FutureCallback|null = null;
}

/**
 * A callback which is called when a [`Future`] completes.
 * 
 * Note that this MUST NOT call back into LDK directly, it must instead schedule actions to be
 * taken later.
 */
export class FutureCallback extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKFutureCallback|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FutureCallback_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of FutureCallback from a given implementation */
	public static new_impl(arg: FutureCallbackInterface): FutureCallback {
		const impl_holder: LDKFutureCallbackHolder = new LDKFutureCallbackHolder();
		let structImplementation = {
			call (): void {
				arg.call();
			},
		} as bindings.LDKFutureCallback;
		const ptr_idx: [bigint, number] = bindings.LDKFutureCallback_new(structImplementation);

		impl_holder.held = new FutureCallback(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * The method which is called.
	 */
	public call(): void {
		bindings.FutureCallback_call(this.ptr);
	}

}

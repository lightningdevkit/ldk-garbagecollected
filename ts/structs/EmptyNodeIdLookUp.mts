
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`NodeIdLookUp`] that always returns `None`.
 */
export class EmptyNodeIdLookUp extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.EmptyNodeIdLookUp_free);
	}

	/**
	 * Constructs a new EmptyNodeIdLookUp given each field
	 */
	public static constructor_new(): EmptyNodeIdLookUp {
		const ret: bigint = bindings.EmptyNodeIdLookUp_new();
		const ret_hu_conv: EmptyNodeIdLookUp = new EmptyNodeIdLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeIdLookUp which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeIdLookUp must be freed before this_arg is
	 */
	public as_NodeIdLookUp(): NodeIdLookUp {
		const ret: bigint = bindings.EmptyNodeIdLookUp_as_NodeIdLookUp(this.ptr);
		const ret_hu_conv: NodeIdLookUp = new NodeIdLookUp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

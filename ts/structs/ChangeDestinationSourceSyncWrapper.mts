
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper around [`ChangeDestinationSource`] to allow for async calls.
 * 
 * You should likely never use this directly but rather allow LDK to build this when required to
 * build higher-level sync wrappers.
 */
export class ChangeDestinationSourceSyncWrapper extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChangeDestinationSourceSyncWrapper_free);
	}

	/**
	 * Creates a new [`ChangeDestinationSourceSyncWrapper`].
	 */
	public static constructor_new(source: ChangeDestinationSourceSync): ChangeDestinationSourceSyncWrapper {
		const ret: bigint = bindings.ChangeDestinationSourceSyncWrapper_new(CommonBase.get_ptr_of(source));
		const ret_hu_conv: ChangeDestinationSourceSyncWrapper = new ChangeDestinationSourceSyncWrapper(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, source);
		return ret_hu_conv;
	}

}

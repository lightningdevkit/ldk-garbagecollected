

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of ChangeDestinationSourceSync */
export interface ChangeDestinationSourceSyncInterface {
	/**Returns a script pubkey which can be used as a change destination for
	 * [`OutputSpender::spend_spendable_outputs`].
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds controlled to the same user.
	 */
	get_change_destination_script(): Result_CVec_u8ZNoneZ;
}

class LDKChangeDestinationSourceSyncHolder {
	held: ChangeDestinationSourceSync|null = null;
}

/**
 * A synchronous helper trait that describes an on-chain wallet capable of returning a (change) destination script.
 */
export class ChangeDestinationSourceSync extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKChangeDestinationSourceSync|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChangeDestinationSourceSync_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of ChangeDestinationSourceSync from a given implementation */
	public static new_impl(arg: ChangeDestinationSourceSyncInterface): ChangeDestinationSourceSync {
		const impl_holder: LDKChangeDestinationSourceSyncHolder = new LDKChangeDestinationSourceSyncHolder();
		let structImplementation = {
			get_change_destination_script (): bigint {
				const ret: Result_CVec_u8ZNoneZ = arg.get_change_destination_script();
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKChangeDestinationSourceSync;
		const ptr_idx: [bigint, number] = bindings.LDKChangeDestinationSourceSync_new(structImplementation);

		impl_holder.held = new ChangeDestinationSourceSync(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Returns a script pubkey which can be used as a change destination for
	 * [`OutputSpender::spend_spendable_outputs`].
	 * 
	 * This method should return a different value each time it is called, to avoid linking
	 * on-chain funds controlled to the same user.
	 */
	public get_change_destination_script(): Result_CVec_u8ZNoneZ {
		const ret: bigint = bindings.ChangeDestinationSourceSync_get_change_destination_script(this.ptr);
		const ret_hu_conv: Result_CVec_u8ZNoneZ = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

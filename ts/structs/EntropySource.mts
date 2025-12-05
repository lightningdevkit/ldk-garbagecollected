

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of EntropySource */
export interface EntropySourceInterface {
	/**Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	get_secure_random_bytes(): Uint8Array;
}

class LDKEntropySourceHolder {
	held: EntropySource|null = null;
}

/**
 * A trait that describes a source of entropy.
 */
export class EntropySource extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKEntropySource|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.EntropySource_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of EntropySource from a given implementation */
	public static new_impl(arg: EntropySourceInterface): EntropySource {
		const impl_holder: LDKEntropySourceHolder = new LDKEntropySourceHolder();
		let structImplementation = {
			get_secure_random_bytes (): number {
				const ret: Uint8Array = arg.get_secure_random_bytes();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKEntropySource;
		const ptr_idx: [bigint, number] = bindings.LDKEntropySource_new(structImplementation);

		impl_holder.held = new EntropySource(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Gets a unique, cryptographically-secure, random 32-byte value. This method must return a
	 * different value each time it is called.
	 */
	public get_secure_random_bytes(): Uint8Array {
		const ret: number = bindings.EntropySource_get_secure_random_bytes(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}

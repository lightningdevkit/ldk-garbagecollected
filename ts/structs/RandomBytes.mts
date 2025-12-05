
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An implementation of [`EntropySource`] using ChaCha20.
 */
export class RandomBytes extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RandomBytes_free);
	}

	/**
	 * Creates a new instance using the given seed.
	 */
	public static constructor_new(seed: Uint8Array): RandomBytes {
		const ret: bigint = bindings.RandomBytes_new(bindings.encodeUint8Array(seed));
		const ret_hu_conv: RandomBytes = new RandomBytes(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public as_EntropySource(): EntropySource {
		const ret: bigint = bindings.RandomBytes_as_EntropySource(this.ptr);
		const ret_hu_conv: EntropySource = new EntropySource(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

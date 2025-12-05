
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A message which is sent to a DNSSEC prover requesting a DNSSEC proof for the given name.
 */
export class DNSSECQuery extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DNSSECQuery_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DNSSECQuery_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECQuery
	 */
	public clone(): DNSSECQuery {
		const ret: bigint = bindings.DNSSECQuery_clone(this.ptr);
		const ret_hu_conv: DNSSECQuery = new DNSSECQuery(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECQuery.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DNSSECQuery_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DNSSECQuerys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DNSSECQuery): boolean {
		const ret: boolean = bindings.DNSSECQuery_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}

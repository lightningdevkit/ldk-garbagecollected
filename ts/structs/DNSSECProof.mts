
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A message which is sent in response to [`DNSSECQuery`] containing a DNSSEC proof.
 */
export class DNSSECProof extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DNSSECProof_free);
	}

	/**
	 * An [RFC 9102 DNSSEC AuthenticationChain] providing a DNSSEC proof.
	 * 
	 * [RFC 9102 DNSSEC AuthenticationChain]: https://www.rfc-editor.org/rfc/rfc9102.html#name-dnssec-authentication-chain
	 * 
	 * Returns a copy of the field.
	 */
	public get_proof(): Uint8Array {
		const ret: number = bindings.DNSSECProof_get_proof(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An [RFC 9102 DNSSEC AuthenticationChain] providing a DNSSEC proof.
	 * 
	 * [RFC 9102 DNSSEC AuthenticationChain]: https://www.rfc-editor.org/rfc/rfc9102.html#name-dnssec-authentication-chain
	 */
	public set_proof(val: Uint8Array): void {
		bindings.DNSSECProof_set_proof(this.ptr, bindings.encodeUint8Array(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DNSSECProof_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DNSSECProof
	 */
	public clone(): DNSSECProof {
		const ret: bigint = bindings.DNSSECProof_clone(this.ptr);
		const ret_hu_conv: DNSSECProof = new DNSSECProof(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSSECProof.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DNSSECProof_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DNSSECProofs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DNSSECProof): boolean {
		const ret: boolean = bindings.DNSSECProof_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}

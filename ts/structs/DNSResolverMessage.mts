
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum containing the possible onion messages which are used uses to request and receive
 * DNSSEC proofs.
 */
export class DNSResolverMessage extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.DNSResolverMessage_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): DNSResolverMessage {
		const raw_ty: number = bindings.LDKDNSResolverMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new DNSResolverMessage_DNSSECQuery(ptr);
			case 1: return new DNSResolverMessage_DNSSECProof(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DNSResolverMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DNSResolverMessage
	 */
	public clone(): DNSResolverMessage {
		const ret: bigint = bindings.DNSResolverMessage_clone(this.ptr);
		const ret_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSSECQuery-variant DNSResolverMessage
	 */
	public static constructor_dnssecquery(a: DNSSECQuery): DNSResolverMessage {
		const ret: bigint = bindings.DNSResolverMessage_dnssecquery(CommonBase.get_ptr_of(a));
		const ret_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSSECProof-variant DNSResolverMessage
	 */
	public static constructor_dnssecproof(a: DNSSECProof): DNSResolverMessage {
		const ret: bigint = bindings.DNSResolverMessage_dnssecproof(CommonBase.get_ptr_of(a));
		const ret_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DNSResolverMessage.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DNSResolverMessage_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DNSResolverMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: DNSResolverMessage): boolean {
		const ret: boolean = bindings.DNSResolverMessage_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the DNSResolverMessage object into a byte array which can be read by DNSResolverMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.DNSResolverMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DNSResolverMessage from a byte array, created by DNSResolverMessage_write
	 */
	public static constructor_read(ser: Uint8Array, arg: bigint): Result_DNSResolverMessageDecodeErrorZ {
		const ret: bigint = bindings.DNSResolverMessage_read(bindings.encodeUint8Array(ser), arg);
		const ret_hu_conv: Result_DNSResolverMessageDecodeErrorZ = Result_DNSResolverMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.DNSResolverMessage_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A DNSResolverMessage of type DNSSECQuery */
export class DNSResolverMessage_DNSSECQuery extends DNSResolverMessage {
	public dnssec_query: DNSSECQuery;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const dnssec_query: bigint = bindings.LDKDNSResolverMessage_DNSSECQuery_get_dnssec_query(ptr);
		const dnssec_query_hu_conv: DNSSECQuery = new DNSSECQuery(null, dnssec_query);
			CommonBase.add_ref_from(dnssec_query_hu_conv, this);
		this.dnssec_query = dnssec_query_hu_conv;
	}
}
/** A DNSResolverMessage of type DNSSECProof */
export class DNSResolverMessage_DNSSECProof extends DNSResolverMessage {
	public dnssec_proof: DNSSECProof;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const dnssec_proof: bigint = bindings.LDKDNSResolverMessage_DNSSECProof_get_dnssec_proof(ptr);
		const dnssec_proof_hu_conv: DNSSECProof = new DNSSECProof(null, dnssec_proof);
			CommonBase.add_ref_from(dnssec_proof_hu_conv, this);
		this.dnssec_proof = dnssec_proof_hu_conv;
	}
}

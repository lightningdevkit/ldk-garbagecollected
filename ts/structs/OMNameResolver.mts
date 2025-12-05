
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A stateful resolver which maps BIP 353 Human Readable Names to URIs and BOLT12 [`Offer`]s.
 * 
 * It does not directly implement [`DNSResolverMessageHandler`] but implements all the core logic
 * which is required in a client which intends to.
 * 
 * It relies on being made aware of the passage of time with regular calls to
 * [`Self::new_best_block`] in order to time out existing queries. Queries time out after two
 * blocks.
 */
export class OMNameResolver extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OMNameResolver_free);
	}

	/**
	 * Builds a new [`OMNameResolver`].
	 */
	public static constructor_new(latest_block_time: number, latest_block_height: number): OMNameResolver {
		const ret: bigint = bindings.OMNameResolver_new(latest_block_time, latest_block_height);
		const ret_hu_conv: OMNameResolver = new OMNameResolver(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Builds a new [`OMNameResolver`] which will not validate the time limits on DNSSEC proofs
	 * (for builds without the \"std\" feature and until [`Self::new_best_block`] is called).
	 * 
	 * If possible, you should prefer [`Self::new`] so that providing stale proofs is not
	 * possible, however in no-std environments where there is some trust in the resolver used and
	 * no time source is available, this may be acceptable.
	 * 
	 * Note that not calling [`Self::new_best_block`] will result in requests not timing out and
	 * unresolved requests leaking memory. You must instead call
	 * [`Self::expire_pending_resolution`] as unresolved requests expire.
	 */
	public static constructor_new_without_no_std_expiry_validation(): OMNameResolver {
		const ret: bigint = bindings.OMNameResolver_new_without_no_std_expiry_validation();
		const ret_hu_conv: OMNameResolver = new OMNameResolver(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Informs the [`OMNameResolver`] of the passage of time in the form of a new best Bitcoin
	 * block.
	 * 
	 * This is used to prune stale requests (by block height) and keep track of the current time
	 * to validate that DNSSEC proofs are current.
	 */
	public new_best_block(height: number, time: number): void {
		bindings.OMNameResolver_new_best_block(this.ptr, height, time);
	}

	/**
	 * Removes any pending resolutions for the given `name` and `payment_id`.
	 * 
	 * Any future calls to [`Self::handle_dnssec_proof_for_offer`] or
	 * [`Self::handle_dnssec_proof_for_uri`] will no longer return a result for the given
	 * resolution.
	 */
	public expire_pending_resolution(name: HumanReadableName, payment_id: Uint8Array): void {
		bindings.OMNameResolver_expire_pending_resolution(this.ptr, CommonBase.get_ptr_of(name), bindings.encodeUint8Array(payment_id));
	}

	/**
	 * Begins the process of resolving a BIP 353 Human Readable Name.
	 * 
	 * Returns a [`DNSSECQuery`] onion message and a [`DNSResolverContext`] which should be sent
	 * to a resolver (with the context used to generate the blinded response path) on success.
	 */
	public resolve_name(payment_id: Uint8Array, name: HumanReadableName, entropy_source: EntropySource): Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ {
		const ret: bigint = bindings.OMNameResolver_resolve_name(this.ptr, bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(name), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ = Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Handles a [`DNSSECProof`] message, attempting to verify it and match it against a pending
	 * query.
	 * 
	 * If verification succeeds, the resulting bitcoin: URI is parsed to find a contained
	 * [`Offer`].
	 * 
	 * Note that a single proof for a wildcard DNS entry may complete several requests for
	 * different [`HumanReadableName`]s.
	 * 
	 * If an [`Offer`] is found, it, as well as the [`PaymentId`] and original `name` passed to
	 * [`Self::resolve_name`] are returned.
	 */
	public handle_dnssec_proof_for_offer(msg: DNSSECProof, context: DNSResolverContext): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ {
		const ret: bigint = bindings.OMNameResolver_handle_dnssec_proof_for_offer(this.ptr, CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ = Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Handles a [`DNSSECProof`] message, attempting to verify it and match it against any pending
	 * queries.
	 * 
	 * If verification succeeds, all matching [`PaymentId`] and [`HumanReadableName`]s passed to
	 * [`Self::resolve_name`], as well as the resolved bitcoin: URI are returned.
	 * 
	 * Note that a single proof for a wildcard DNS entry may complete several requests for
	 * different [`HumanReadableName`]s.
	 * 
	 * This method is useful for those who handle bitcoin: URIs already, handling more than just
	 * BOLT12 [`Offer`]s.
	 */
	public handle_dnssec_proof_for_uri(msg: DNSSECProof, context: DNSResolverContext): Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ {
		const ret: bigint = bindings.OMNameResolver_handle_dnssec_proof_for_uri(this.ptr, CommonBase.get_ptr_of(msg), CommonBase.get_ptr_of(context));
		const ret_hu_conv: Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ = Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

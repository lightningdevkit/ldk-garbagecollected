package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OMNameResolver extends CommonBase {
	OMNameResolver(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OMNameResolver_free(ptr); }
	}

	/**
	 * Builds a new [`OMNameResolver`].
	 */
	public static OMNameResolver of(int latest_block_time, int latest_block_height) {
		long ret = bindings.OMNameResolver_new(latest_block_time, latest_block_height);
		Reference.reachabilityFence(latest_block_time);
		Reference.reachabilityFence(latest_block_height);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OMNameResolver ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OMNameResolver(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
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
	public static OMNameResolver new_without_no_std_expiry_validation() {
		long ret = bindings.OMNameResolver_new_without_no_std_expiry_validation();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OMNameResolver ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OMNameResolver(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Informs the [`OMNameResolver`] of the passage of time in the form of a new best Bitcoin
	 * block.
	 * 
	 * This is used to prune stale requests (by block height) and keep track of the current time
	 * to validate that DNSSEC proofs are current.
	 */
	public void new_best_block(int height, int time) {
		bindings.OMNameResolver_new_best_block(this.ptr, height, time);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(height);
		Reference.reachabilityFence(time);
	}

	/**
	 * Removes any pending resolutions for the given `name` and `payment_id`.
	 * 
	 * Any future calls to [`Self::handle_dnssec_proof_for_offer`] or
	 * [`Self::handle_dnssec_proof_for_uri`] will no longer return a result for the given
	 * resolution.
	 */
	public void expire_pending_resolution(org.ldk.structs.HumanReadableName name, byte[] payment_id) {
		bindings.OMNameResolver_expire_pending_resolution(this.ptr, name.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(name);
		Reference.reachabilityFence(payment_id);
	}

	/**
	 * Begins the process of resolving a BIP 353 Human Readable Name.
	 * 
	 * Returns a [`DNSSECQuery`] onion message and a [`DNSResolverContext`] which should be sent
	 * to a resolver (with the context used to generate the blinded response path) on success.
	 */
	public Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ resolve_name(byte[] payment_id, org.ldk.structs.HumanReadableName name, org.ldk.structs.EntropySource entropy_source) {
		long ret = bindings.OMNameResolver_resolve_name(this.ptr, InternalUtils.check_arr_len(payment_id, 32), name.ptr, entropy_source.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(name);
		Reference.reachabilityFence(entropy_source);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ ret_hu_conv = Result_C2Tuple_DNSSECQueryDNSResolverContextZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(entropy_source); };
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
	public Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ handle_dnssec_proof_for_offer(org.ldk.structs.DNSSECProof msg, org.ldk.structs.DNSResolverContext context) {
		long ret = bindings.OMNameResolver_handle_dnssec_proof_for_offer(this.ptr, msg.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ handle_dnssec_proof_for_uri(org.ldk.structs.DNSSECProof msg, org.ldk.structs.DNSResolverContext context) {
		long ret = bindings.OMNameResolver_handle_dnssec_proof_for_uri(this.ptr, msg.ptr, context.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZStrZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

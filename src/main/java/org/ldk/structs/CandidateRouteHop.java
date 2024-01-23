package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper around the various hop representations.
 * 
 * Can be used to examine the properties of a hop,
 * potentially to decide whether to include it in a route.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class CandidateRouteHop extends CommonBase {
	private CandidateRouteHop(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.CandidateRouteHop_free(ptr); }
	}
	static CandidateRouteHop constr_from_ptr(long ptr) {
		bindings.LDKCandidateRouteHop raw_val = bindings.LDKCandidateRouteHop_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCandidateRouteHop.FirstHop.class) {
			return new FirstHop(ptr, (bindings.LDKCandidateRouteHop.FirstHop)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCandidateRouteHop.PublicHop.class) {
			return new PublicHop(ptr, (bindings.LDKCandidateRouteHop.PublicHop)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCandidateRouteHop.PrivateHop.class) {
			return new PrivateHop(ptr, (bindings.LDKCandidateRouteHop.PrivateHop)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCandidateRouteHop.Blinded.class) {
			return new Blinded(ptr, (bindings.LDKCandidateRouteHop.Blinded)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCandidateRouteHop.OneHopBlinded.class) {
			return new OneHopBlinded(ptr, (bindings.LDKCandidateRouteHop.OneHopBlinded)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A hop from the payer, where the outbound liquidity is known.
	 */
	public final static class FirstHop extends CandidateRouteHop {
		public final org.ldk.structs.FirstHopCandidate first_hop;
		private FirstHop(long ptr, bindings.LDKCandidateRouteHop.FirstHop obj) {
			super(null, ptr);
			long first_hop = obj.first_hop;
			org.ldk.structs.FirstHopCandidate first_hop_hu_conv = null; if (first_hop < 0 || first_hop > 4096) { first_hop_hu_conv = new org.ldk.structs.FirstHopCandidate(null, first_hop); }
			if (first_hop_hu_conv != null) { first_hop_hu_conv.ptrs_to.add(this); };
			this.first_hop = first_hop_hu_conv;
		}
	}
	/**
	 * A hop found in the [`ReadOnlyNetworkGraph`].
	 */
	public final static class PublicHop extends CandidateRouteHop {
		public final org.ldk.structs.PublicHopCandidate public_hop;
		private PublicHop(long ptr, bindings.LDKCandidateRouteHop.PublicHop obj) {
			super(null, ptr);
			long public_hop = obj.public_hop;
			org.ldk.structs.PublicHopCandidate public_hop_hu_conv = null; if (public_hop < 0 || public_hop > 4096) { public_hop_hu_conv = new org.ldk.structs.PublicHopCandidate(null, public_hop); }
			if (public_hop_hu_conv != null) { public_hop_hu_conv.ptrs_to.add(this); };
			this.public_hop = public_hop_hu_conv;
		}
	}
	/**
	 * A private hop communicated by the payee, generally via a BOLT 11 invoice.
	 * 
	 * Because BOLT 11 route hints can take multiple hops to get to the destination, this may not
	 * terminate at the payee.
	 */
	public final static class PrivateHop extends CandidateRouteHop {
		public final org.ldk.structs.PrivateHopCandidate private_hop;
		private PrivateHop(long ptr, bindings.LDKCandidateRouteHop.PrivateHop obj) {
			super(null, ptr);
			long private_hop = obj.private_hop;
			org.ldk.structs.PrivateHopCandidate private_hop_hu_conv = null; if (private_hop < 0 || private_hop > 4096) { private_hop_hu_conv = new org.ldk.structs.PrivateHopCandidate(null, private_hop); }
			if (private_hop_hu_conv != null) { private_hop_hu_conv.ptrs_to.add(this); };
			this.private_hop = private_hop_hu_conv;
		}
	}
	/**
	 * A blinded path which starts with an introduction point and ultimately terminates with the
	 * payee.
	 * 
	 * Because we don't know the payee's identity, [`CandidateRouteHop::target`] will return
	 * `None` in this state.
	 * 
	 * Because blinded paths are \"all or nothing\", and we cannot use just one part of a blinded
	 * path, the full path is treated as a single [`CandidateRouteHop`].
	 */
	public final static class Blinded extends CandidateRouteHop {
		public final org.ldk.structs.BlindedPathCandidate blinded;
		private Blinded(long ptr, bindings.LDKCandidateRouteHop.Blinded obj) {
			super(null, ptr);
			long blinded = obj.blinded;
			org.ldk.structs.BlindedPathCandidate blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedPathCandidate(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.add(this); };
			this.blinded = blinded_hu_conv;
		}
	}
	/**
	 * Similar to [`Self::Blinded`], but the path here only has one hop.
	 * 
	 * While we treat this similarly to [`CandidateRouteHop::Blinded`] in many respects (e.g.
	 * returning `None` from [`CandidateRouteHop::target`]), in this case we do actually know the
	 * payee's identity - it's the introduction point!
	 * 
	 * [`BlindedPayInfo`] provided for 1-hop blinded paths is ignored because it is meant to apply
	 * to the hops *between* the introduction node and the destination.
	 * 
	 * This primarily exists to track that we need to included a blinded path at the end of our
	 * [`Route`], even though it doesn't actually add an additional hop in the payment.
	 */
	public final static class OneHopBlinded extends CandidateRouteHop {
		public final org.ldk.structs.OneHopBlindedPathCandidate one_hop_blinded;
		private OneHopBlinded(long ptr, bindings.LDKCandidateRouteHop.OneHopBlinded obj) {
			super(null, ptr);
			long one_hop_blinded = obj.one_hop_blinded;
			org.ldk.structs.OneHopBlindedPathCandidate one_hop_blinded_hu_conv = null; if (one_hop_blinded < 0 || one_hop_blinded > 4096) { one_hop_blinded_hu_conv = new org.ldk.structs.OneHopBlindedPathCandidate(null, one_hop_blinded); }
			if (one_hop_blinded_hu_conv != null) { one_hop_blinded_hu_conv.ptrs_to.add(this); };
			this.one_hop_blinded = one_hop_blinded_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.CandidateRouteHop_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the CandidateRouteHop
	 */
	public CandidateRouteHop clone() {
		long ret = bindings.CandidateRouteHop_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FirstHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop first_hop(org.ldk.structs.FirstHopCandidate a) {
		long ret = bindings.CandidateRouteHop_first_hop(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PublicHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop public_hop(org.ldk.structs.PublicHopCandidate a) {
		long ret = bindings.CandidateRouteHop_public_hop(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop private_hop(org.ldk.structs.PrivateHopCandidate a) {
		long ret = bindings.CandidateRouteHop_private_hop(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant CandidateRouteHop
	 */
	public static CandidateRouteHop blinded(org.ldk.structs.BlindedPathCandidate a) {
		long ret = bindings.CandidateRouteHop_blinded(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OneHopBlinded-variant CandidateRouteHop
	 */
	public static CandidateRouteHop one_hop_blinded(org.ldk.structs.OneHopBlindedPathCandidate a) {
		long ret = bindings.CandidateRouteHop_one_hop_blinded(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Returns the globally unique short channel ID for this hop, if one is known.
	 * 
	 * This only returns `Some` if the channel is public (either our own, or one we've learned
	 * from the public network graph), and thus the short channel ID we have for this channel is
	 * globally unique and identifies this channel in a global namespace.
	 */
	public Option_u64Z globally_unique_short_channel_id() {
		long ret = bindings.CandidateRouteHop_globally_unique_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the required difference in HTLC CLTV expiry between the [`Self::source`] and the
	 * next-hop for an HTLC taking this hop.
	 * 
	 * This is the time that the node(s) in this hop have to claim the HTLC on-chain if the
	 * next-hop goes on chain with a payment preimage.
	 */
	public int cltv_expiry_delta() {
		int ret = bindings.CandidateRouteHop_cltv_expiry_delta(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the minimum amount that can be sent over this hop, in millisatoshis.
	 */
	public long htlc_minimum_msat() {
		long ret = bindings.CandidateRouteHop_htlc_minimum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the fees that must be paid to route an HTLC over this channel.
	 */
	public RoutingFees fees() {
		long ret = bindings.CandidateRouteHop_fees(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the source node id of current hop.
	 * 
	 * Source node id refers to the node forwarding the HTLC through this hop.
	 * 
	 * For [`Self::FirstHop`] we return payer's node id.
	 */
	public NodeId source() {
		long ret = bindings.CandidateRouteHop_source(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the target node id of this hop, if known.
	 * 
	 * Target node id refers to the node receiving the HTLC after this hop.
	 * 
	 * For [`Self::Blinded`] we return `None` because the ultimate destination after the blinded
	 * path is unknown.
	 * 
	 * For [`Self::OneHopBlinded`] we return `None` because the target is the same as the source,
	 * and such a return value would be somewhat nonsensical.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public NodeId target() {
		long ret = bindings.CandidateRouteHop_target(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

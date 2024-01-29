using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A wrapper around the various hop representations.
 * 
 * Can be used to examine the properties of a hop,
 * potentially to decide whether to include it in a route.
 */
public class CandidateRouteHop : CommonBase {
	protected CandidateRouteHop(object _dummy, long ptr) : base(ptr) { }
	~CandidateRouteHop() {
		if (ptr != 0) { bindings.CandidateRouteHop_free(ptr); }
	}

	internal static CandidateRouteHop constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCandidateRouteHop_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new CandidateRouteHop_FirstHop(ptr);
			case 1: return new CandidateRouteHop_PublicHop(ptr);
			case 2: return new CandidateRouteHop_PrivateHop(ptr);
			case 3: return new CandidateRouteHop_Blinded(ptr);
			case 4: return new CandidateRouteHop_OneHopBlinded(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A CandidateRouteHop of type FirstHop */
	public class CandidateRouteHop_FirstHop : CandidateRouteHop {
		public FirstHopCandidate first_hop;
		internal CandidateRouteHop_FirstHop(long ptr) : base(null, ptr) {
			long first_hop = bindings.LDKCandidateRouteHop_FirstHop_get_first_hop(ptr);
			org.ldk.structs.FirstHopCandidate first_hop_hu_conv = null; if (first_hop < 0 || first_hop > 4096) { first_hop_hu_conv = new org.ldk.structs.FirstHopCandidate(null, first_hop); }
			if (first_hop_hu_conv != null) { first_hop_hu_conv.ptrs_to.AddLast(this); };
			this.first_hop = first_hop_hu_conv;
		}
	}
	/** A CandidateRouteHop of type PublicHop */
	public class CandidateRouteHop_PublicHop : CandidateRouteHop {
		public PublicHopCandidate public_hop;
		internal CandidateRouteHop_PublicHop(long ptr) : base(null, ptr) {
			long public_hop = bindings.LDKCandidateRouteHop_PublicHop_get_public_hop(ptr);
			org.ldk.structs.PublicHopCandidate public_hop_hu_conv = null; if (public_hop < 0 || public_hop > 4096) { public_hop_hu_conv = new org.ldk.structs.PublicHopCandidate(null, public_hop); }
			if (public_hop_hu_conv != null) { public_hop_hu_conv.ptrs_to.AddLast(this); };
			this.public_hop = public_hop_hu_conv;
		}
	}
	/** A CandidateRouteHop of type PrivateHop */
	public class CandidateRouteHop_PrivateHop : CandidateRouteHop {
		public PrivateHopCandidate private_hop;
		internal CandidateRouteHop_PrivateHop(long ptr) : base(null, ptr) {
			long private_hop = bindings.LDKCandidateRouteHop_PrivateHop_get_private_hop(ptr);
			org.ldk.structs.PrivateHopCandidate private_hop_hu_conv = null; if (private_hop < 0 || private_hop > 4096) { private_hop_hu_conv = new org.ldk.structs.PrivateHopCandidate(null, private_hop); }
			if (private_hop_hu_conv != null) { private_hop_hu_conv.ptrs_to.AddLast(this); };
			this.private_hop = private_hop_hu_conv;
		}
	}
	/** A CandidateRouteHop of type Blinded */
	public class CandidateRouteHop_Blinded : CandidateRouteHop {
		public BlindedPathCandidate blinded;
		internal CandidateRouteHop_Blinded(long ptr) : base(null, ptr) {
			long blinded = bindings.LDKCandidateRouteHop_Blinded_get_blinded(ptr);
			org.ldk.structs.BlindedPathCandidate blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedPathCandidate(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.AddLast(this); };
			this.blinded = blinded_hu_conv;
		}
	}
	/** A CandidateRouteHop of type OneHopBlinded */
	public class CandidateRouteHop_OneHopBlinded : CandidateRouteHop {
		public OneHopBlindedPathCandidate one_hop_blinded;
		internal CandidateRouteHop_OneHopBlinded(long ptr) : base(null, ptr) {
			long one_hop_blinded = bindings.LDKCandidateRouteHop_OneHopBlinded_get_one_hop_blinded(ptr);
			org.ldk.structs.OneHopBlindedPathCandidate one_hop_blinded_hu_conv = null; if (one_hop_blinded < 0 || one_hop_blinded > 4096) { one_hop_blinded_hu_conv = new org.ldk.structs.OneHopBlindedPathCandidate(null, one_hop_blinded); }
			if (one_hop_blinded_hu_conv != null) { one_hop_blinded_hu_conv.ptrs_to.AddLast(this); };
			this.one_hop_blinded = one_hop_blinded_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.CandidateRouteHop_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the CandidateRouteHop
	 */
	public CandidateRouteHop clone() {
		long ret = bindings.CandidateRouteHop_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FirstHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop first_hop(org.ldk.structs.FirstHopCandidate a) {
		long ret = bindings.CandidateRouteHop_first_hop(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PublicHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop public_hop(org.ldk.structs.PublicHopCandidate a) {
		long ret = bindings.CandidateRouteHop_public_hop(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateHop-variant CandidateRouteHop
	 */
	public static CandidateRouteHop private_hop(org.ldk.structs.PrivateHopCandidate a) {
		long ret = bindings.CandidateRouteHop_private_hop(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant CandidateRouteHop
	 */
	public static CandidateRouteHop blinded(org.ldk.structs.BlindedPathCandidate a) {
		long ret = bindings.CandidateRouteHop_blinded(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OneHopBlinded-variant CandidateRouteHop
	 */
	public static CandidateRouteHop one_hop_blinded(org.ldk.structs.OneHopBlindedPathCandidate a) {
		long ret = bindings.CandidateRouteHop_one_hop_blinded(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.CandidateRouteHop ret_hu_conv = org.ldk.structs.CandidateRouteHop.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u64Z ret_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the minimum amount that can be sent over this hop, in millisatoshis.
	 */
	public long htlc_minimum_msat() {
		long ret = bindings.CandidateRouteHop_htlc_minimum_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the fees that must be paid to route an HTLC over this channel.
	 */
	public RoutingFees fees() {
		long ret = bindings.CandidateRouteHop_fees(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RoutingFees ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RoutingFees(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public NodeId target() {
		long ret = bindings.CandidateRouteHop_target(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

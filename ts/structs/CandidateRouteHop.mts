
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * A wrapper around the various hop representations.
 * 
 * Can be used to examine the properties of a hop,
 * potentially to decide whether to include it in a route.
 */
export class CandidateRouteHop extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.CandidateRouteHop_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): CandidateRouteHop {
		const raw_ty: number = bindings.LDKCandidateRouteHop_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new CandidateRouteHop_FirstHop(ptr);
			case 1: return new CandidateRouteHop_PublicHop(ptr);
			case 2: return new CandidateRouteHop_PrivateHop(ptr);
			case 3: return new CandidateRouteHop_Blinded(ptr);
			case 4: return new CandidateRouteHop_OneHopBlinded(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CandidateRouteHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CandidateRouteHop
	 */
	public clone(): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_clone(this.ptr);
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FirstHop-variant CandidateRouteHop
	 */
	public static constructor_first_hop(a: FirstHopCandidate): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_first_hop(CommonBase.get_ptr_of(a));
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PublicHop-variant CandidateRouteHop
	 */
	public static constructor_public_hop(a: PublicHopCandidate): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_public_hop(CommonBase.get_ptr_of(a));
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateHop-variant CandidateRouteHop
	 */
	public static constructor_private_hop(a: PrivateHopCandidate): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_private_hop(CommonBase.get_ptr_of(a));
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Blinded-variant CandidateRouteHop
	 */
	public static constructor_blinded(a: BlindedPathCandidate): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_blinded(CommonBase.get_ptr_of(a));
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OneHopBlinded-variant CandidateRouteHop
	 */
	public static constructor_one_hop_blinded(a: OneHopBlindedPathCandidate): CandidateRouteHop {
		const ret: bigint = bindings.CandidateRouteHop_one_hop_blinded(CommonBase.get_ptr_of(a));
		const ret_hu_conv: CandidateRouteHop = CandidateRouteHop.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the globally unique short channel ID for this hop, if one is known.
	 * 
	 * This only returns `Some` if the channel is public (either our own, or one we've learned
	 * from the public network graph), and thus the short channel ID we have for this channel is
	 * globally unique and identifies this channel in a global namespace.
	 */
	public globally_unique_short_channel_id(): Option_u64Z {
		const ret: bigint = bindings.CandidateRouteHop_globally_unique_short_channel_id(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the required difference in HTLC CLTV expiry between the [`Self::source`] and the
	 * next-hop for an HTLC taking this hop.
	 * 
	 * This is the time that the node(s) in this hop have to claim the HTLC on-chain if the
	 * next-hop goes on chain with a payment preimage.
	 */
	public cltv_expiry_delta(): number {
		const ret: number = bindings.CandidateRouteHop_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * Returns the minimum amount that can be sent over this hop, in millisatoshis.
	 */
	public htlc_minimum_msat(): bigint {
		const ret: bigint = bindings.CandidateRouteHop_htlc_minimum_msat(this.ptr);
		return ret;
	}

	/**
	 * Returns the fees that must be paid to route an HTLC over this channel.
	 */
	public fees(): RoutingFees {
		const ret: bigint = bindings.CandidateRouteHop_fees(this.ptr);
		const ret_hu_conv: RoutingFees = new RoutingFees(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the source node id of current hop.
	 * 
	 * Source node id refers to the node forwarding the HTLC through this hop.
	 * 
	 * For [`Self::FirstHop`] we return payer's node id.
	 */
	public source(): NodeId {
		const ret: bigint = bindings.CandidateRouteHop_source(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public target(): NodeId {
		const ret: bigint = bindings.CandidateRouteHop_target(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A CandidateRouteHop of type FirstHop */
export class CandidateRouteHop_FirstHop extends CandidateRouteHop {
	public first_hop: FirstHopCandidate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const first_hop: bigint = bindings.LDKCandidateRouteHop_FirstHop_get_first_hop(ptr);
		const first_hop_hu_conv: FirstHopCandidate = new FirstHopCandidate(null, first_hop);
			CommonBase.add_ref_from(first_hop_hu_conv, this);
		this.first_hop = first_hop_hu_conv;
	}
}
/** A CandidateRouteHop of type PublicHop */
export class CandidateRouteHop_PublicHop extends CandidateRouteHop {
	public public_hop: PublicHopCandidate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const public_hop: bigint = bindings.LDKCandidateRouteHop_PublicHop_get_public_hop(ptr);
		const public_hop_hu_conv: PublicHopCandidate = new PublicHopCandidate(null, public_hop);
			CommonBase.add_ref_from(public_hop_hu_conv, this);
		this.public_hop = public_hop_hu_conv;
	}
}
/** A CandidateRouteHop of type PrivateHop */
export class CandidateRouteHop_PrivateHop extends CandidateRouteHop {
	public private_hop: PrivateHopCandidate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const private_hop: bigint = bindings.LDKCandidateRouteHop_PrivateHop_get_private_hop(ptr);
		const private_hop_hu_conv: PrivateHopCandidate = new PrivateHopCandidate(null, private_hop);
			CommonBase.add_ref_from(private_hop_hu_conv, this);
		this.private_hop = private_hop_hu_conv;
	}
}
/** A CandidateRouteHop of type Blinded */
export class CandidateRouteHop_Blinded extends CandidateRouteHop {
	public blinded: BlindedPathCandidate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const blinded: bigint = bindings.LDKCandidateRouteHop_Blinded_get_blinded(ptr);
		const blinded_hu_conv: BlindedPathCandidate = new BlindedPathCandidate(null, blinded);
			CommonBase.add_ref_from(blinded_hu_conv, this);
		this.blinded = blinded_hu_conv;
	}
}
/** A CandidateRouteHop of type OneHopBlinded */
export class CandidateRouteHop_OneHopBlinded extends CandidateRouteHop {
	public one_hop_blinded: OneHopBlindedPathCandidate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const one_hop_blinded: bigint = bindings.LDKCandidateRouteHop_OneHopBlinded_get_one_hop_blinded(ptr);
		const one_hop_blinded_hu_conv: OneHopBlindedPathCandidate = new OneHopBlindedPathCandidate(null, one_hop_blinded);
			CommonBase.add_ref_from(one_hop_blinded_hu_conv, this);
		this.one_hop_blinded = one_hop_blinded_hu_conv;
	}
}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Either [`P2PGossipSync`] or [`RapidGossipSync`].
 */
export class GossipSync extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.GossipSync_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): GossipSync {
		const raw_ty: number = bindings.LDKGossipSync_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new GossipSync_P2P(ptr);
			case 1: return new GossipSync_Rapid(ptr);
			case 2: return new GossipSync_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Utility method to constructs a new P2P-variant GossipSync
	 */
	public static constructor_p2_p(a: P2PGossipSync): GossipSync {
		const ret: bigint = bindings.GossipSync_p2_p(CommonBase.get_ptr_of(a));
		const ret_hu_conv: GossipSync = GossipSync.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Rapid-variant GossipSync
	 */
	public static constructor_rapid(a: RapidGossipSync): GossipSync {
		const ret: bigint = bindings.GossipSync_rapid(CommonBase.get_ptr_of(a));
		const ret_hu_conv: GossipSync = GossipSync.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new None-variant GossipSync
	 */
	public static constructor_none(): GossipSync {
		const ret: bigint = bindings.GossipSync_none();
		const ret_hu_conv: GossipSync = GossipSync.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A GossipSync of type P2P */
export class GossipSync_P2P extends GossipSync {
	public p2p: P2PGossipSync;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const p2p: bigint = bindings.LDKGossipSync_P2P_get_p2p(ptr);
		const p2p_hu_conv: P2PGossipSync = new P2PGossipSync(null, p2p);
			CommonBase.add_ref_from(p2p_hu_conv, this);
		this.p2p = p2p_hu_conv;
	}
}
/** A GossipSync of type Rapid */
export class GossipSync_Rapid extends GossipSync {
	public rapid: RapidGossipSync;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const rapid: bigint = bindings.LDKGossipSync_Rapid_get_rapid(ptr);
		const rapid_hu_conv: RapidGossipSync = new RapidGossipSync(null, rapid);
			CommonBase.add_ref_from(rapid_hu_conv, this);
		this.rapid = rapid_hu_conv;
	}
}
/** A GossipSync of type None */
export class GossipSync_None extends GossipSync {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

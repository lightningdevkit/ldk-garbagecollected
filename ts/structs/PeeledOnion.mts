
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * A processed incoming onion message, containing either a Forward (another onion message)
 * or a Receive payload with decrypted contents.
 */
export class PeeledOnion extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PeeledOnion_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PeeledOnion {
		const raw_ty: number = bindings.LDKPeeledOnion_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PeeledOnion_Forward(ptr);
			case 1: return new PeeledOnion_Offers(ptr);
			case 2: return new PeeledOnion_AsyncPayments(ptr);
			case 3: return new PeeledOnion_DNSResolver(ptr);
			case 4: return new PeeledOnion_Custom(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PeeledOnion_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PeeledOnion
	 */
	public clone(): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_clone(this.ptr);
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PeeledOnion
	 */
	public static constructor_forward(a: NextMessageHop, b: OnionMessage): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_forward(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant PeeledOnion
	 */
	public static constructor_offers(a: OffersMessage, b: Option_OffersContextZ, c: BlindedMessagePath): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_offers(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant PeeledOnion
	 */
	public static constructor_async_payments(a: AsyncPaymentsMessage, b: AsyncPaymentsContext, c: BlindedMessagePath): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_async_payments(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant PeeledOnion
	 */
	public static constructor_dnsresolver(a: DNSResolverMessage, b: DNSResolverContext, c: BlindedMessagePath): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_dnsresolver(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant PeeledOnion
	 */
	public static constructor_custom(a: OnionMessageContents, b: Option_CVec_u8ZZ, c: BlindedMessagePath): PeeledOnion {
		const ret: bigint = bindings.PeeledOnion_custom(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), CommonBase.get_ptr_of(c));
		const ret_hu_conv: PeeledOnion = PeeledOnion.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

}
/** A PeeledOnion of type Forward */
export class PeeledOnion_Forward extends PeeledOnion {
	public _0: NextMessageHop;
	public _1: OnionMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const _0: bigint = bindings.LDKPeeledOnion_Forward_get__0(ptr);
		const _0_hu_conv: NextMessageHop = NextMessageHop.constr_from_ptr(_0);
			CommonBase.add_ref_from(_0_hu_conv, this);
		this._0 = _0_hu_conv;
		const _1: bigint = bindings.LDKPeeledOnion_Forward_get__1(ptr);
		const _1_hu_conv: OnionMessage = new OnionMessage(null, _1);
			CommonBase.add_ref_from(_1_hu_conv, this);
		this._1 = _1_hu_conv;
	}
}
/** A PeeledOnion of type Offers */
export class PeeledOnion_Offers extends PeeledOnion {
	public _0: OffersMessage;
	public _1: Option_OffersContextZ;
	/**
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public _2: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const _0: bigint = bindings.LDKPeeledOnion_Offers_get__0(ptr);
		const _0_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(_0);
			CommonBase.add_ref_from(_0_hu_conv, this);
		this._0 = _0_hu_conv;
		const _1: bigint = bindings.LDKPeeledOnion_Offers_get__1(ptr);
		const _1_hu_conv: Option_OffersContextZ = Option_OffersContextZ.constr_from_ptr(_1);
			CommonBase.add_ref_from(_1_hu_conv, this);
		this._1 = _1_hu_conv;
		const _2: bigint = bindings.LDKPeeledOnion_Offers_get__2(ptr);
		const _2_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, _2);
			CommonBase.add_ref_from(_2_hu_conv, this);
		this._2 = _2_hu_conv;
	}
}
/** A PeeledOnion of type AsyncPayments */
export class PeeledOnion_AsyncPayments extends PeeledOnion {
	public _0: AsyncPaymentsMessage;
	public _1: AsyncPaymentsContext;
	/**
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public _2: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const _0: bigint = bindings.LDKPeeledOnion_AsyncPayments_get__0(ptr);
		const _0_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(_0);
			CommonBase.add_ref_from(_0_hu_conv, this);
		this._0 = _0_hu_conv;
		const _1: bigint = bindings.LDKPeeledOnion_AsyncPayments_get__1(ptr);
		const _1_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(_1);
			CommonBase.add_ref_from(_1_hu_conv, this);
		this._1 = _1_hu_conv;
		const _2: bigint = bindings.LDKPeeledOnion_AsyncPayments_get__2(ptr);
		const _2_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, _2);
			CommonBase.add_ref_from(_2_hu_conv, this);
		this._2 = _2_hu_conv;
	}
}
/** A PeeledOnion of type DNSResolver */
export class PeeledOnion_DNSResolver extends PeeledOnion {
	public _0: DNSResolverMessage;
	/**
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public _1: DNSResolverContext;
	/**
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public _2: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const _0: bigint = bindings.LDKPeeledOnion_DNSResolver_get__0(ptr);
		const _0_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(_0);
			CommonBase.add_ref_from(_0_hu_conv, this);
		this._0 = _0_hu_conv;
		const _1: bigint = bindings.LDKPeeledOnion_DNSResolver_get__1(ptr);
		const _1_hu_conv: DNSResolverContext = new DNSResolverContext(null, _1);
			CommonBase.add_ref_from(_1_hu_conv, this);
		this._1 = _1_hu_conv;
		const _2: bigint = bindings.LDKPeeledOnion_DNSResolver_get__2(ptr);
		const _2_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, _2);
			CommonBase.add_ref_from(_2_hu_conv, this);
		this._2 = _2_hu_conv;
	}
}
/** A PeeledOnion of type Custom */
export class PeeledOnion_Custom extends PeeledOnion {
	public _0: OnionMessageContents;
	public _1: Option_CVec_u8ZZ;
	/**
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public _2: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const _0: bigint = bindings.LDKPeeledOnion_Custom_get__0(ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, _0);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this._0 = ret_hu_conv;
		const _1: bigint = bindings.LDKPeeledOnion_Custom_get__1(ptr);
		const _1_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(_1);
			CommonBase.add_ref_from(_1_hu_conv, this);
		this._1 = _1_hu_conv;
		const _2: bigint = bindings.LDKPeeledOnion_Custom_get__2(ptr);
		const _2_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, _2);
			CommonBase.add_ref_from(_2_hu_conv, this);
		this._2 = _2_hu_conv;
	}
}

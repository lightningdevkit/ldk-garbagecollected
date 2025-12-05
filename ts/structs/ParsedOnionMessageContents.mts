
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The contents of an [`OnionMessage`] as read from the wire.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
export class ParsedOnionMessageContents extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.ParsedOnionMessageContents_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): ParsedOnionMessageContents {
		const raw_ty: number = bindings.LDKParsedOnionMessageContents_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ParsedOnionMessageContents_Offers(ptr);
			case 1: return new ParsedOnionMessageContents_AsyncPayments(ptr);
			case 2: return new ParsedOnionMessageContents_DNSResolver(ptr);
			case 3: return new ParsedOnionMessageContents_Custom(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ParsedOnionMessageContents_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ParsedOnionMessageContents
	 */
	public clone(): ParsedOnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_clone(this.ptr);
		const ret_hu_conv: ParsedOnionMessageContents = ParsedOnionMessageContents.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant ParsedOnionMessageContents
	 */
	public static constructor_offers(a: OffersMessage): ParsedOnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_offers(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ParsedOnionMessageContents = ParsedOnionMessageContents.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant ParsedOnionMessageContents
	 */
	public static constructor_async_payments(a: AsyncPaymentsMessage): ParsedOnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_async_payments(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ParsedOnionMessageContents = ParsedOnionMessageContents.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant ParsedOnionMessageContents
	 */
	public static constructor_dnsresolver(a: DNSResolverMessage): ParsedOnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_dnsresolver(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ParsedOnionMessageContents = ParsedOnionMessageContents.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant ParsedOnionMessageContents
	 */
	public static constructor_custom(a: OnionMessageContents): ParsedOnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_custom(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ParsedOnionMessageContents = ParsedOnionMessageContents.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, a);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.ParsedOnionMessageContents_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ParsedOnionMessageContents object into a byte array which can be read by ParsedOnionMessageContents_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ParsedOnionMessageContents_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A ParsedOnionMessageContents of type Offers */
export class ParsedOnionMessageContents_Offers extends ParsedOnionMessageContents {
	public offers: OffersMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const offers: bigint = bindings.LDKParsedOnionMessageContents_Offers_get_offers(ptr);
		const offers_hu_conv: OffersMessage = OffersMessage.constr_from_ptr(offers);
			CommonBase.add_ref_from(offers_hu_conv, this);
		this.offers = offers_hu_conv;
	}
}
/** A ParsedOnionMessageContents of type AsyncPayments */
export class ParsedOnionMessageContents_AsyncPayments extends ParsedOnionMessageContents {
	public async_payments: AsyncPaymentsMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const async_payments: bigint = bindings.LDKParsedOnionMessageContents_AsyncPayments_get_async_payments(ptr);
		const async_payments_hu_conv: AsyncPaymentsMessage = AsyncPaymentsMessage.constr_from_ptr(async_payments);
			CommonBase.add_ref_from(async_payments_hu_conv, this);
		this.async_payments = async_payments_hu_conv;
	}
}
/** A ParsedOnionMessageContents of type DNSResolver */
export class ParsedOnionMessageContents_DNSResolver extends ParsedOnionMessageContents {
	public dns_resolver: DNSResolverMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const dns_resolver: bigint = bindings.LDKParsedOnionMessageContents_DNSResolver_get_dns_resolver(ptr);
		const dns_resolver_hu_conv: DNSResolverMessage = DNSResolverMessage.constr_from_ptr(dns_resolver);
			CommonBase.add_ref_from(dns_resolver_hu_conv, this);
		this.dns_resolver = dns_resolver_hu_conv;
	}
}
/** A ParsedOnionMessageContents of type Custom */
export class ParsedOnionMessageContents_Custom extends ParsedOnionMessageContents {
	public custom: OnionMessageContents;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const custom: bigint = bindings.LDKParsedOnionMessageContents_Custom_get_custom(ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, custom);
			CommonBase.add_ref_from(ret_hu_conv, this);
		this.custom = ret_hu_conv;
	}
}

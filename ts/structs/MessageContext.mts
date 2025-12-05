
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Additional data included by the recipient in a [`BlindedMessagePath`].
 * 
 * This data is encrypted by the recipient and will be given to the corresponding message handler
 * when handling a message sent over the [`BlindedMessagePath`]. The recipient can use this data to
 * authenticate the message or for further processing if needed.
 */
export class MessageContext extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MessageContext_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MessageContext {
		const raw_ty: number = bindings.LDKMessageContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MessageContext_Offers(ptr);
			case 1: return new MessageContext_AsyncPayments(ptr);
			case 2: return new MessageContext_DNSResolver(ptr);
			case 3: return new MessageContext_Custom(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MessageContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MessageContext
	 */
	public clone(): MessageContext {
		const ret: bigint = bindings.MessageContext_clone(this.ptr);
		const ret_hu_conv: MessageContext = MessageContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant MessageContext
	 */
	public static constructor_offers(a: OffersContext): MessageContext {
		const ret: bigint = bindings.MessageContext_offers(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MessageContext = MessageContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant MessageContext
	 */
	public static constructor_async_payments(a: AsyncPaymentsContext): MessageContext {
		const ret: bigint = bindings.MessageContext_async_payments(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MessageContext = MessageContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant MessageContext
	 */
	public static constructor_dnsresolver(a: DNSResolverContext): MessageContext {
		const ret: bigint = bindings.MessageContext_dnsresolver(CommonBase.get_ptr_of(a));
		const ret_hu_conv: MessageContext = MessageContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant MessageContext
	 */
	public static constructor_custom(a: Uint8Array): MessageContext {
		const ret: bigint = bindings.MessageContext_custom(bindings.encodeUint8Array(a));
		const ret_hu_conv: MessageContext = MessageContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the MessageContext object into a byte array which can be read by MessageContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.MessageContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a MessageContext from a byte array, created by MessageContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_MessageContextDecodeErrorZ {
		const ret: bigint = bindings.MessageContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_MessageContextDecodeErrorZ = Result_MessageContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A MessageContext of type Offers */
export class MessageContext_Offers extends MessageContext {
	public offers: OffersContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const offers: bigint = bindings.LDKMessageContext_Offers_get_offers(ptr);
		const offers_hu_conv: OffersContext = OffersContext.constr_from_ptr(offers);
			CommonBase.add_ref_from(offers_hu_conv, this);
		this.offers = offers_hu_conv;
	}
}
/** A MessageContext of type AsyncPayments */
export class MessageContext_AsyncPayments extends MessageContext {
	public async_payments: AsyncPaymentsContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const async_payments: bigint = bindings.LDKMessageContext_AsyncPayments_get_async_payments(ptr);
		const async_payments_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(async_payments);
			CommonBase.add_ref_from(async_payments_hu_conv, this);
		this.async_payments = async_payments_hu_conv;
	}
}
/** A MessageContext of type DNSResolver */
export class MessageContext_DNSResolver extends MessageContext {
	public dns_resolver: DNSResolverContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const dns_resolver: bigint = bindings.LDKMessageContext_DNSResolver_get_dns_resolver(ptr);
		const dns_resolver_hu_conv: DNSResolverContext = new DNSResolverContext(null, dns_resolver);
			CommonBase.add_ref_from(dns_resolver_hu_conv, this);
		this.dns_resolver = dns_resolver_hu_conv;
	}
}
/** A MessageContext of type Custom */
export class MessageContext_Custom extends MessageContext {
	public custom: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const custom: number = bindings.LDKMessageContext_Custom_get_custom(ptr);
		const custom_conv: Uint8Array = bindings.decodeUint8Array(custom);
		this.custom = custom_conv;
	}
}

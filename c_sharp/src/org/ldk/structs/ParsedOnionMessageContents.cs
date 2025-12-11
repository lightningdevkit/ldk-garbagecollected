using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The contents of an [`OnionMessage`] as read from the wire.
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class ParsedOnionMessageContents : CommonBase {
	protected ParsedOnionMessageContents(object _dummy, long ptr) : base(ptr) { }
	~ParsedOnionMessageContents() {
		if (ptr != 0) { bindings.ParsedOnionMessageContents_free(ptr); }
	}

	internal static ParsedOnionMessageContents constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKParsedOnionMessageContents_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ParsedOnionMessageContents_Offers(ptr);
			case 1: return new ParsedOnionMessageContents_AsyncPayments(ptr);
			case 2: return new ParsedOnionMessageContents_DNSResolver(ptr);
			case 3: return new ParsedOnionMessageContents_Custom(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ParsedOnionMessageContents of type Offers */
	public class ParsedOnionMessageContents_Offers : ParsedOnionMessageContents {
		public org.ldk.structs.OffersMessage offers;
		internal ParsedOnionMessageContents_Offers(long ptr) : base(null, ptr) {
			long offers = bindings.LDKParsedOnionMessageContents_Offers_get_offers(ptr);
			org.ldk.structs.OffersMessage offers_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(offers);
			if (offers_hu_conv != null) { offers_hu_conv.ptrs_to.AddLast(this); };
			this.offers = offers_hu_conv;
		}
	}
	/** A ParsedOnionMessageContents of type AsyncPayments */
	public class ParsedOnionMessageContents_AsyncPayments : ParsedOnionMessageContents {
		public org.ldk.structs.AsyncPaymentsMessage async_payments;
		internal ParsedOnionMessageContents_AsyncPayments(long ptr) : base(null, ptr) {
			long async_payments = bindings.LDKParsedOnionMessageContents_AsyncPayments_get_async_payments(ptr);
			org.ldk.structs.AsyncPaymentsMessage async_payments_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(async_payments);
			if (async_payments_hu_conv != null) { async_payments_hu_conv.ptrs_to.AddLast(this); };
			this.async_payments = async_payments_hu_conv;
		}
	}
	/** A ParsedOnionMessageContents of type DNSResolver */
	public class ParsedOnionMessageContents_DNSResolver : ParsedOnionMessageContents {
		public org.ldk.structs.DNSResolverMessage dns_resolver;
		internal ParsedOnionMessageContents_DNSResolver(long ptr) : base(null, ptr) {
			long dns_resolver = bindings.LDKParsedOnionMessageContents_DNSResolver_get_dns_resolver(ptr);
			org.ldk.structs.DNSResolverMessage dns_resolver_hu_conv = org.ldk.structs.DNSResolverMessage.constr_from_ptr(dns_resolver);
			if (dns_resolver_hu_conv != null) { dns_resolver_hu_conv.ptrs_to.AddLast(this); };
			this.dns_resolver = dns_resolver_hu_conv;
		}
	}
	/** A ParsedOnionMessageContents of type Custom */
	public class ParsedOnionMessageContents_Custom : ParsedOnionMessageContents {
		public org.ldk.structs.OnionMessageContents custom;
		internal ParsedOnionMessageContents_Custom(long ptr) : base(null, ptr) {
			long custom = bindings.LDKParsedOnionMessageContents_Custom_get_custom(ptr);
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, custom);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.custom = ret_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ParsedOnionMessageContents_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ParsedOnionMessageContents
	 */
	public org.ldk.structs.ParsedOnionMessageContents clone() {
		long ret = bindings.ParsedOnionMessageContents_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant ParsedOnionMessageContents
	 */
	public static org.ldk.structs.ParsedOnionMessageContents offers(org.ldk.structs.OffersMessage a) {
		long ret = bindings.ParsedOnionMessageContents_offers(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant ParsedOnionMessageContents
	 */
	public static org.ldk.structs.ParsedOnionMessageContents async_payments(org.ldk.structs.AsyncPaymentsMessage a) {
		long ret = bindings.ParsedOnionMessageContents_async_payments(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant ParsedOnionMessageContents
	 */
	public static org.ldk.structs.ParsedOnionMessageContents dnsresolver(org.ldk.structs.DNSResolverMessage a) {
		long ret = bindings.ParsedOnionMessageContents_dnsresolver(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant ParsedOnionMessageContents
	 */
	public static org.ldk.structs.ParsedOnionMessageContents custom(org.ldk.structs.OnionMessageContents a) {
		long ret = bindings.ParsedOnionMessageContents_custom(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ParsedOnionMessageContents ret_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public org.ldk.structs.OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.ParsedOnionMessageContents_as_OnionMessageContents(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ParsedOnionMessageContents object into a byte array which can be read by ParsedOnionMessageContents_read
	 */
	public byte[] write() {
		long ret = bindings.ParsedOnionMessageContents_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

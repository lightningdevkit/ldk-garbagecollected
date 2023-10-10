using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The contents of an onion message. In the context of offers, this would be the invoice, invoice
 * request, or invoice error.
 */
public class OnionMessageContents : CommonBase {
	protected OnionMessageContents(object _dummy, long ptr) : base(ptr) { }
	~OnionMessageContents() {
		if (ptr != 0) { bindings.OnionMessageContents_free(ptr); }
	}

	internal static OnionMessageContents constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKOnionMessageContents_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new OnionMessageContents_Offers(ptr);
			case 1: return new OnionMessageContents_Custom(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A OnionMessageContents of type Offers */
	public class OnionMessageContents_Offers : OnionMessageContents {
		public OffersMessage offers;
		internal OnionMessageContents_Offers(long ptr) : base(null, ptr) {
			long offers = bindings.LDKOnionMessageContents_Offers_get_offers(ptr);
			org.ldk.structs.OffersMessage offers_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(offers);
			if (offers_hu_conv != null) { offers_hu_conv.ptrs_to.AddLast(this); };
			this.offers = offers_hu_conv;
		}
	}
	/** A OnionMessageContents of type Custom */
	public class OnionMessageContents_Custom : OnionMessageContents {
		public CustomOnionMessageContents custom;
		internal OnionMessageContents_Custom(long ptr) : base(null, ptr) {
			long custom = bindings.LDKOnionMessageContents_Custom_get_custom(ptr);
			CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, custom);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.custom = ret_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.OnionMessageContents_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessageContents
	 */
	public OnionMessageContents clone() {
		long ret = bindings.OnionMessageContents_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessageContents ret_hu_conv = org.ldk.structs.OnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant OnionMessageContents
	 */
	public static OnionMessageContents offers(org.ldk.structs.OffersMessage a) {
		long ret = bindings.OnionMessageContents_offers(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessageContents ret_hu_conv = org.ldk.structs.OnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant OnionMessageContents
	 */
	public static OnionMessageContents custom(org.ldk.structs.CustomOnionMessageContents a) {
		long ret = bindings.OnionMessageContents_custom(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessageContents ret_hu_conv = org.ldk.structs.OnionMessageContents.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

}
} } }

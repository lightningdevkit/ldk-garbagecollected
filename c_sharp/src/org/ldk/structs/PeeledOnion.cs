using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A processed incoming onion message, containing either a Forward (another onion message)
 * or a Receive payload with decrypted contents.
 */
public class PeeledOnion : CommonBase {
	protected PeeledOnion(object _dummy, long ptr) : base(ptr) { }
	~PeeledOnion() {
		if (ptr != 0) { bindings.PeeledOnion_free(ptr); }
	}

	internal static PeeledOnion constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPeeledOnion_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PeeledOnion_Forward(ptr);
			case 1: return new PeeledOnion_Offers(ptr);
			case 2: return new PeeledOnion_AsyncPayments(ptr);
			case 3: return new PeeledOnion_DNSResolver(ptr);
			case 4: return new PeeledOnion_Custom(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PeeledOnion of type Forward */
	public class PeeledOnion_Forward : PeeledOnion {
		public org.ldk.structs.NextMessageHop _0;
		public org.ldk.structs.OnionMessage _1;
		internal PeeledOnion_Forward(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_Forward_get__0(ptr);
			org.ldk.structs.NextMessageHop _0_hu_conv = org.ldk.structs.NextMessageHop.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.AddLast(this); };
			this._0 = _0_hu_conv;
			long _1 = bindings.LDKPeeledOnion_Forward_get__1(ptr);
			org.ldk.structs.OnionMessage _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.OnionMessage(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
		}
	}
	/** A PeeledOnion of type Offers */
	public class PeeledOnion_Offers : PeeledOnion {
		public org.ldk.structs.OffersMessage _0;
		public org.ldk.structs.Option_OffersContextZ _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedMessagePath _2;
		internal PeeledOnion_Offers(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_Offers_get__0(ptr);
			org.ldk.structs.OffersMessage _0_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.AddLast(this); };
			this._0 = _0_hu_conv;
			long _1 = bindings.LDKPeeledOnion_Offers_get__1(ptr);
			org.ldk.structs.Option_OffersContextZ _1_hu_conv = org.ldk.structs.Option_OffersContextZ.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
			long _2 = bindings.LDKPeeledOnion_Offers_get__2(ptr);
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.AddLast(this); };
			this._2 = _2_hu_conv;
		}
	}
	/** A PeeledOnion of type AsyncPayments */
	public class PeeledOnion_AsyncPayments : PeeledOnion {
		public org.ldk.structs.AsyncPaymentsMessage _0;
		public org.ldk.structs.AsyncPaymentsContext _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedMessagePath _2;
		internal PeeledOnion_AsyncPayments(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_AsyncPayments_get__0(ptr);
			org.ldk.structs.AsyncPaymentsMessage _0_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.AddLast(this); };
			this._0 = _0_hu_conv;
			long _1 = bindings.LDKPeeledOnion_AsyncPayments_get__1(ptr);
			org.ldk.structs.AsyncPaymentsContext _1_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
			long _2 = bindings.LDKPeeledOnion_AsyncPayments_get__2(ptr);
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.AddLast(this); };
			this._2 = _2_hu_conv;
		}
	}
	/** A PeeledOnion of type DNSResolver */
	public class PeeledOnion_DNSResolver : PeeledOnion {
		public org.ldk.structs.DNSResolverMessage _0;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.DNSResolverContext _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedMessagePath _2;
		internal PeeledOnion_DNSResolver(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_DNSResolver_get__0(ptr);
			org.ldk.structs.DNSResolverMessage _0_hu_conv = org.ldk.structs.DNSResolverMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.AddLast(this); };
			this._0 = _0_hu_conv;
			long _1 = bindings.LDKPeeledOnion_DNSResolver_get__1(ptr);
			org.ldk.structs.DNSResolverContext _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.DNSResolverContext(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
			long _2 = bindings.LDKPeeledOnion_DNSResolver_get__2(ptr);
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.AddLast(this); };
			this._2 = _2_hu_conv;
		}
	}
	/** A PeeledOnion of type Custom */
	public class PeeledOnion_Custom : PeeledOnion {
		public org.ldk.structs.OnionMessageContents _0;
		public org.ldk.structs.Option_CVec_u8ZZ _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedMessagePath _2;
		internal PeeledOnion_Custom(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_Custom_get__0(ptr);
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, _0);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this._0 = ret_hu_conv;
			long _1 = bindings.LDKPeeledOnion_Custom_get__1(ptr);
			org.ldk.structs.Option_CVec_u8ZZ _1_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
			long _2 = bindings.LDKPeeledOnion_Custom_get__2(ptr);
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.AddLast(this); };
			this._2 = _2_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PeeledOnion_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeeledOnion
	 */
	public org.ldk.structs.PeeledOnion clone() {
		long ret = bindings.PeeledOnion_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PeeledOnion
	 */
	public static org.ldk.structs.PeeledOnion forward(org.ldk.structs.NextMessageHop a, org.ldk.structs.OnionMessage b) {
		long ret = bindings.PeeledOnion_forward(a.ptr, b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant PeeledOnion
	 */
	public static org.ldk.structs.PeeledOnion offers(org.ldk.structs.OffersMessage a, org.ldk.structs.Option_OffersContextZ b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_offers(a.ptr, b.ptr, c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant PeeledOnion
	 */
	public static org.ldk.structs.PeeledOnion async_payments(org.ldk.structs.AsyncPaymentsMessage a, org.ldk.structs.AsyncPaymentsContext b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_async_payments(a.ptr, b.ptr, c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant PeeledOnion
	 */
	public static org.ldk.structs.PeeledOnion dnsresolver(org.ldk.structs.DNSResolverMessage a, org.ldk.structs.DNSResolverContext b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_dnsresolver(a.ptr, b.ptr, c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant PeeledOnion
	 */
	public static org.ldk.structs.PeeledOnion custom(org.ldk.structs.OnionMessageContents a, org.ldk.structs.Option_CVec_u8ZZ b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_custom(a.ptr, b.ptr, c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

}
} } }

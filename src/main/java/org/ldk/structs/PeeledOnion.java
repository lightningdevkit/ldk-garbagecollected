package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A processed incoming onion message, containing either a Forward (another onion message)
 * or a Receive payload with decrypted contents.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeeledOnion extends CommonBase {
	private PeeledOnion(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeeledOnion_free(ptr); }
	}
	static PeeledOnion constr_from_ptr(long ptr) {
		bindings.LDKPeeledOnion raw_val = bindings.LDKPeeledOnion_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPeeledOnion.Forward.class) {
			return new Forward(ptr, (bindings.LDKPeeledOnion.Forward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPeeledOnion.Offers.class) {
			return new Offers(ptr, (bindings.LDKPeeledOnion.Offers)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPeeledOnion.AsyncPayments.class) {
			return new AsyncPayments(ptr, (bindings.LDKPeeledOnion.AsyncPayments)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPeeledOnion.DNSResolver.class) {
			return new DNSResolver(ptr, (bindings.LDKPeeledOnion.DNSResolver)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPeeledOnion.Custom.class) {
			return new Custom(ptr, (bindings.LDKPeeledOnion.Custom)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Forwarded onion, with the next node id and a new onion
	 */
	public final static class Forward extends PeeledOnion {
		public final org.ldk.structs.NextMessageHop _0;
		public final org.ldk.structs.OnionMessage _1;
		private Forward(long ptr, bindings.LDKPeeledOnion.Forward obj) {
			super(null, ptr);
			long _0 = obj._0;
			org.ldk.structs.NextMessageHop _0_hu_conv = org.ldk.structs.NextMessageHop.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.add(this); };
			this._0 = _0_hu_conv;
			long _1 = obj._1;
			org.ldk.structs.OnionMessage _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.OnionMessage(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
		}
	}
	/**
	 * Received offers onion message, with decrypted contents, context, and reply path
	 */
	public final static class Offers extends PeeledOnion {
		public final org.ldk.structs.OffersMessage _0;
		public final org.ldk.structs.Option_OffersContextZ _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedMessagePath _2;
		private Offers(long ptr, bindings.LDKPeeledOnion.Offers obj) {
			super(null, ptr);
			long _0 = obj._0;
			org.ldk.structs.OffersMessage _0_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.add(this); };
			this._0 = _0_hu_conv;
			long _1 = obj._1;
			org.ldk.structs.Option_OffersContextZ _1_hu_conv = org.ldk.structs.Option_OffersContextZ.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
			long _2 = obj._2;
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.add(this); };
			this._2 = _2_hu_conv;
		}
	}
	/**
	 * Received async payments onion message, with decrypted contents, context, and reply path
	 */
	public final static class AsyncPayments extends PeeledOnion {
		public final org.ldk.structs.AsyncPaymentsMessage _0;
		public final org.ldk.structs.AsyncPaymentsContext _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedMessagePath _2;
		private AsyncPayments(long ptr, bindings.LDKPeeledOnion.AsyncPayments obj) {
			super(null, ptr);
			long _0 = obj._0;
			org.ldk.structs.AsyncPaymentsMessage _0_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.add(this); };
			this._0 = _0_hu_conv;
			long _1 = obj._1;
			org.ldk.structs.AsyncPaymentsContext _1_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
			long _2 = obj._2;
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.add(this); };
			this._2 = _2_hu_conv;
		}
	}
	/**
	 * Received DNS resolver onion message, with decrypted contents, context, and reply path
	 */
	public final static class DNSResolver extends PeeledOnion {
		public final org.ldk.structs.DNSResolverMessage _0;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.DNSResolverContext _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedMessagePath _2;
		private DNSResolver(long ptr, bindings.LDKPeeledOnion.DNSResolver obj) {
			super(null, ptr);
			long _0 = obj._0;
			org.ldk.structs.DNSResolverMessage _0_hu_conv = org.ldk.structs.DNSResolverMessage.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.add(this); };
			this._0 = _0_hu_conv;
			long _1 = obj._1;
			org.ldk.structs.DNSResolverContext _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.DNSResolverContext(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
			long _2 = obj._2;
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.add(this); };
			this._2 = _2_hu_conv;
		}
	}
	/**
	 * Received custom onion message, with decrypted contents, context, and reply path
	 */
	public final static class Custom extends PeeledOnion {
		public final org.ldk.structs.OnionMessageContents _0;
		public final org.ldk.structs.Option_CVec_u8ZZ _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedMessagePath _2;
		private Custom(long ptr, bindings.LDKPeeledOnion.Custom obj) {
			super(null, ptr);
			long _0 = obj._0;
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, _0);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this._0 = ret_hu_conv;
			long _1 = obj._1;
			org.ldk.structs.Option_CVec_u8ZZ _1_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(_1);
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
			long _2 = obj._2;
			org.ldk.structs.BlindedMessagePath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedMessagePath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.add(this); };
			this._2 = _2_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PeeledOnion_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeeledOnion
	 */
	public PeeledOnion clone() {
		long ret = bindings.PeeledOnion_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PeeledOnion
	 */
	public static PeeledOnion forward(org.ldk.structs.NextMessageHop a, org.ldk.structs.OnionMessage b) {
		long ret = bindings.PeeledOnion_forward(a.ptr, b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Offers-variant PeeledOnion
	 */
	public static PeeledOnion offers(org.ldk.structs.OffersMessage a, org.ldk.structs.Option_OffersContextZ b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_offers(a.ptr, b.ptr, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AsyncPayments-variant PeeledOnion
	 */
	public static PeeledOnion async_payments(org.ldk.structs.AsyncPaymentsMessage a, org.ldk.structs.AsyncPaymentsContext b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_async_payments(a.ptr, b.ptr, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DNSResolver-variant PeeledOnion
	 */
	public static PeeledOnion dnsresolver(org.ldk.structs.DNSResolverMessage a, org.ldk.structs.DNSResolverContext b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_dnsresolver(a.ptr, b.ptr, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Custom-variant PeeledOnion
	 */
	public static PeeledOnion custom(org.ldk.structs.OnionMessageContents a, org.ldk.structs.Option_CVec_u8ZZ b, org.ldk.structs.BlindedMessagePath c) {
		long ret = bindings.PeeledOnion_custom(a.ptr, b.ptr, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

}

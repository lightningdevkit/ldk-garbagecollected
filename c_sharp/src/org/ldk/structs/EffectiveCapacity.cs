using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The effective capacity of a channel for routing purposes.
 * 
 * While this may be smaller than the actual channel capacity, amounts greater than
 * [`Self::as_msat`] should not be routed through the channel.
 */
public class EffectiveCapacity : CommonBase {
	protected EffectiveCapacity(object _dummy, long ptr) : base(ptr) { }
	~EffectiveCapacity() {
		if (ptr != 0) { bindings.EffectiveCapacity_free(ptr); }
	}

	internal static EffectiveCapacity constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKEffectiveCapacity_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new EffectiveCapacity_ExactLiquidity(ptr);
			case 1: return new EffectiveCapacity_AdvertisedMaxHTLC(ptr);
			case 2: return new EffectiveCapacity_Total(ptr);
			case 3: return new EffectiveCapacity_Infinite(ptr);
			case 4: return new EffectiveCapacity_HintMaxHTLC(ptr);
			case 5: return new EffectiveCapacity_Unknown(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A EffectiveCapacity of type ExactLiquidity */
	public class EffectiveCapacity_ExactLiquidity : EffectiveCapacity {
		/**
		 * Either the inbound or outbound liquidity depending on the direction, denominated in
		 * millisatoshi.
		 */
		public long liquidity_msat;
		internal EffectiveCapacity_ExactLiquidity(long ptr) : base(null, ptr) {
			this.liquidity_msat = bindings.LDKEffectiveCapacity_ExactLiquidity_get_liquidity_msat(ptr);
		}
	}
	/** A EffectiveCapacity of type AdvertisedMaxHTLC */
	public class EffectiveCapacity_AdvertisedMaxHTLC : EffectiveCapacity {
		/**
		 * The maximum HTLC amount denominated in millisatoshi.
		 */
		public long amount_msat;
		internal EffectiveCapacity_AdvertisedMaxHTLC(long ptr) : base(null, ptr) {
			this.amount_msat = bindings.LDKEffectiveCapacity_AdvertisedMaxHTLC_get_amount_msat(ptr);
		}
	}
	/** A EffectiveCapacity of type Total */
	public class EffectiveCapacity_Total : EffectiveCapacity {
		/**
		 * The funding amount denominated in millisatoshi.
		 */
		public long capacity_msat;
		/**
		 * The maximum HTLC amount denominated in millisatoshi.
		 */
		public long htlc_maximum_msat;
		internal EffectiveCapacity_Total(long ptr) : base(null, ptr) {
			this.capacity_msat = bindings.LDKEffectiveCapacity_Total_get_capacity_msat(ptr);
			this.htlc_maximum_msat = bindings.LDKEffectiveCapacity_Total_get_htlc_maximum_msat(ptr);
		}
	}
	/** A EffectiveCapacity of type Infinite */
	public class EffectiveCapacity_Infinite : EffectiveCapacity {
		internal EffectiveCapacity_Infinite(long ptr) : base(null, ptr) {
		}
	}
	/** A EffectiveCapacity of type HintMaxHTLC */
	public class EffectiveCapacity_HintMaxHTLC : EffectiveCapacity {
		/**
		 * The maximum HTLC amount denominated in millisatoshi.
		 */
		public long amount_msat;
		internal EffectiveCapacity_HintMaxHTLC(long ptr) : base(null, ptr) {
			this.amount_msat = bindings.LDKEffectiveCapacity_HintMaxHTLC_get_amount_msat(ptr);
		}
	}
	/** A EffectiveCapacity of type Unknown */
	public class EffectiveCapacity_Unknown : EffectiveCapacity {
		internal EffectiveCapacity_Unknown(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.EffectiveCapacity_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the EffectiveCapacity
	 */
	public EffectiveCapacity clone() {
		long ret = bindings.EffectiveCapacity_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ExactLiquidity-variant EffectiveCapacity
	 */
	public static EffectiveCapacity exact_liquidity(long liquidity_msat) {
		long ret = bindings.EffectiveCapacity_exact_liquidity(liquidity_msat);
		GC.KeepAlive(liquidity_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AdvertisedMaxHTLC-variant EffectiveCapacity
	 */
	public static EffectiveCapacity advertised_max_htlc(long amount_msat) {
		long ret = bindings.EffectiveCapacity_advertised_max_htlc(amount_msat);
		GC.KeepAlive(amount_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Total-variant EffectiveCapacity
	 */
	public static EffectiveCapacity total(long capacity_msat, long htlc_maximum_msat) {
		long ret = bindings.EffectiveCapacity_total(capacity_msat, htlc_maximum_msat);
		GC.KeepAlive(capacity_msat);
		GC.KeepAlive(htlc_maximum_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Infinite-variant EffectiveCapacity
	 */
	public static EffectiveCapacity infinite() {
		long ret = bindings.EffectiveCapacity_infinite();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HintMaxHTLC-variant EffectiveCapacity
	 */
	public static EffectiveCapacity hint_max_htlc(long amount_msat) {
		long ret = bindings.EffectiveCapacity_hint_max_htlc(amount_msat);
		GC.KeepAlive(amount_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Unknown-variant EffectiveCapacity
	 */
	public static EffectiveCapacity unknown() {
		long ret = bindings.EffectiveCapacity_unknown();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the effective capacity denominated in millisatoshi.
	 */
	public long as_msat() {
		long ret = bindings.EffectiveCapacity_as_msat(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

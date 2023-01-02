using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::ln::chan_utils::HTLCClaim or not
 */
public class Option_HTLCClaimZ : CommonBase {
	protected Option_HTLCClaimZ(object _dummy, long ptr) : base(ptr) { }
	~Option_HTLCClaimZ() {
		if (ptr != 0) { bindings.COption_HTLCClaimZ_free(ptr); }
	}

	internal static Option_HTLCClaimZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_HTLCClaimZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCClaimZ_Some(ptr);
			case 1: return new Option_HTLCClaimZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_HTLCClaimZ of type Some */
	public class Option_HTLCClaimZ_Some : Option_HTLCClaimZ {
		public HTLCClaim some;
		internal Option_HTLCClaimZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_HTLCClaimZ_Some_get_some(ptr);
		}
	}
	/** A Option_HTLCClaimZ of type None */
	public class Option_HTLCClaimZ_None : Option_HTLCClaimZ {
		internal Option_HTLCClaimZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_HTLCClaimZ containing a crate::lightning::ln::chan_utils::HTLCClaim
	 */
	public static Option_HTLCClaimZ some(HTLCClaim o) {
		long ret = bindings.COption_HTLCClaimZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCClaimZ ret_hu_conv = org.ldk.structs.Option_HTLCClaimZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCClaimZ containing nothing
	 */
	public static Option_HTLCClaimZ none() {
		long ret = bindings.COption_HTLCClaimZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCClaimZ ret_hu_conv = org.ldk.structs.Option_HTLCClaimZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

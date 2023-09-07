using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::routing::scoring::WriteableScore or not
 */
public class Option_WriteableScoreZ : CommonBase {
	protected Option_WriteableScoreZ(object _dummy, long ptr) : base(ptr) { }
	~Option_WriteableScoreZ() {
		if (ptr != 0) { bindings.COption_WriteableScoreZ_free(ptr); }
	}

	internal static Option_WriteableScoreZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_WriteableScoreZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_WriteableScoreZ_Some(ptr);
			case 1: return new Option_WriteableScoreZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_WriteableScoreZ of type Some */
	public class Option_WriteableScoreZ_Some : Option_WriteableScoreZ {
		public WriteableScore some;
		internal Option_WriteableScoreZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_WriteableScoreZ_Some_get_some(ptr);
			WriteableScore ret_hu_conv = new WriteableScore(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_WriteableScoreZ of type None */
	public class Option_WriteableScoreZ_None : Option_WriteableScoreZ {
		internal Option_WriteableScoreZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_WriteableScoreZ containing a crate::lightning::routing::scoring::WriteableScore
	 */
	public static Option_WriteableScoreZ some(org.ldk.structs.WriteableScore o) {
		long ret = bindings.COption_WriteableScoreZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_WriteableScoreZ ret_hu_conv = org.ldk.structs.Option_WriteableScoreZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_WriteableScoreZ containing nothing
	 */
	public static Option_WriteableScoreZ none() {
		long ret = bindings.COption_WriteableScoreZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_WriteableScoreZ ret_hu_conv = org.ldk.structs.Option_WriteableScoreZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

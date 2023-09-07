using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::chain::Filter or not
 */
public class Option_FilterZ : CommonBase {
	protected Option_FilterZ(object _dummy, long ptr) : base(ptr) { }
	~Option_FilterZ() {
		if (ptr != 0) { bindings.COption_FilterZ_free(ptr); }
	}

	internal static Option_FilterZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_FilterZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_FilterZ_Some(ptr);
			case 1: return new Option_FilterZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_FilterZ of type Some */
	public class Option_FilterZ_Some : Option_FilterZ {
		public Filter some;
		internal Option_FilterZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_FilterZ_Some_get_some(ptr);
			Filter ret_hu_conv = new Filter(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_FilterZ of type None */
	public class Option_FilterZ_None : Option_FilterZ {
		internal Option_FilterZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_FilterZ containing a crate::lightning::chain::Filter
	 */
	public static Option_FilterZ some(org.ldk.structs.Filter o) {
		long ret = bindings.COption_FilterZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_FilterZ ret_hu_conv = org.ldk.structs.Option_FilterZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_FilterZ containing nothing
	 */
	public static Option_FilterZ none() {
		long ret = bindings.COption_FilterZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_FilterZ ret_hu_conv = org.ldk.structs.Option_FilterZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

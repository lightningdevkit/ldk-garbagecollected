using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::chain::Access or not
 */
public class Option_AccessZ : CommonBase {
	protected Option_AccessZ(object _dummy, long ptr) : base(ptr) { }
	~Option_AccessZ() {
		if (ptr != 0) { bindings.COption_AccessZ_free(ptr); }
	}

	internal static Option_AccessZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_AccessZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_AccessZ_Some(ptr);
			case 1: return new Option_AccessZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_AccessZ of type Some */
	public class Option_AccessZ_Some : Option_AccessZ {
		public Access some;
		internal Option_AccessZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_AccessZ_Some_get_some(ptr);
			Access ret_hu_conv = new Access(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_AccessZ of type None */
	public class Option_AccessZ_None : Option_AccessZ {
		internal Option_AccessZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_AccessZ containing a crate::lightning::chain::Access
	 */
	public static Option_AccessZ some(org.ldk.structs.Access o) {
		long ret = bindings.COption_AccessZ_some(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AccessZ ret_hu_conv = org.ldk.structs.Option_AccessZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_AccessZ containing nothing
	 */
	public static Option_AccessZ none() {
		long ret = bindings.COption_AccessZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_AccessZ ret_hu_conv = org.ldk.structs.Option_AccessZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

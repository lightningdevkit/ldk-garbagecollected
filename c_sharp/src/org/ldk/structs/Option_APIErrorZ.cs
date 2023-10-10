using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::util::errors::APIError or not
 */
public class Option_APIErrorZ : CommonBase {
	protected Option_APIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Option_APIErrorZ() {
		if (ptr != 0) { bindings.COption_APIErrorZ_free(ptr); }
	}

	internal static Option_APIErrorZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_APIErrorZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_APIErrorZ_Some(ptr);
			case 1: return new Option_APIErrorZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_APIErrorZ of type Some */
	public class Option_APIErrorZ_Some : Option_APIErrorZ {
		public APIError some;
		internal Option_APIErrorZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_APIErrorZ_Some_get_some(ptr);
			org.ldk.structs.APIError some_hu_conv = org.ldk.structs.APIError.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_APIErrorZ of type None */
	public class Option_APIErrorZ_None : Option_APIErrorZ {
		internal Option_APIErrorZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_APIErrorZ containing a crate::lightning::util::errors::APIError
	 */
	public static Option_APIErrorZ some(org.ldk.structs.APIError o) {
		long ret = bindings.COption_APIErrorZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_APIErrorZ containing nothing
	 */
	public static Option_APIErrorZ none() {
		long ret = bindings.COption_APIErrorZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_APIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_APIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_APIErrorZ clone() {
		long ret = bindings.COption_APIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

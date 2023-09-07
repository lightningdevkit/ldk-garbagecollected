using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::PathFailure or not
 */
public class Option_PathFailureZ : CommonBase {
	protected Option_PathFailureZ(object _dummy, long ptr) : base(ptr) { }
	~Option_PathFailureZ() {
		if (ptr != 0) { bindings.COption_PathFailureZ_free(ptr); }
	}

	internal static Option_PathFailureZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_PathFailureZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PathFailureZ_Some(ptr);
			case 1: return new Option_PathFailureZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_PathFailureZ of type Some */
	public class Option_PathFailureZ_Some : Option_PathFailureZ {
		public PathFailure some;
		internal Option_PathFailureZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_PathFailureZ_Some_get_some(ptr);
			org.ldk.structs.PathFailure some_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_PathFailureZ of type None */
	public class Option_PathFailureZ_None : Option_PathFailureZ {
		internal Option_PathFailureZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_PathFailureZ containing a crate::lightning::events::PathFailure
	 */
	public static Option_PathFailureZ some(org.ldk.structs.PathFailure o) {
		long ret = bindings.COption_PathFailureZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PathFailureZ containing nothing
	 */
	public static Option_PathFailureZ none() {
		long ret = bindings.COption_PathFailureZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_PathFailureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_PathFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PathFailureZ clone() {
		long ret = bindings.COption_PathFailureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

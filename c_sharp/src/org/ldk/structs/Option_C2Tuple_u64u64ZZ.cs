using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_u64u64Z or not
 */
public class Option_C2Tuple_u64u64ZZ : CommonBase {
	protected Option_C2Tuple_u64u64ZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_C2Tuple_u64u64ZZ() {
		if (ptr != 0) { bindings.COption_C2Tuple_u64u64ZZ_free(ptr); }
	}

	internal static Option_C2Tuple_u64u64ZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_C2Tuple_u64u64ZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_u64u64ZZ_Some(ptr);
			case 1: return new Option_C2Tuple_u64u64ZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_C2Tuple_u64u64ZZ of type Some */
	public class Option_C2Tuple_u64u64ZZ_Some : Option_C2Tuple_u64u64ZZ {
		public TwoTuple_u64u64Z some;
		internal Option_C2Tuple_u64u64ZZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_C2Tuple_u64u64ZZ_Some_get_some(ptr);
			TwoTuple_u64u64Z some_hu_conv = new TwoTuple_u64u64Z(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_C2Tuple_u64u64ZZ of type None */
	public class Option_C2Tuple_u64u64ZZ_None : Option_C2Tuple_u64u64ZZ {
		internal Option_C2Tuple_u64u64ZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_u64u64ZZ containing a crate::c_types::derived::C2Tuple_u64u64Z
	 */
	public static Option_C2Tuple_u64u64ZZ some(org.ldk.structs.TwoTuple_u64u64Z o) {
		long ret = bindings.COption_C2Tuple_u64u64ZZ_some(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_u64u64ZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_u64u64ZZ containing nothing
	 */
	public static Option_C2Tuple_u64u64ZZ none() {
		long ret = bindings.COption_C2Tuple_u64u64ZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_u64u64ZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_C2Tuple_u64u64ZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_u64u64ZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C2Tuple_u64u64ZZ clone() {
		long ret = bindings.COption_C2Tuple_u64u64ZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_u64u64ZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_u64u64ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

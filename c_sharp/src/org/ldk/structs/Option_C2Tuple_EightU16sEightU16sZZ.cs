using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple__u168_u168Z or not
 */
public class Option_C2Tuple_EightU16sEightU16sZZ : CommonBase {
	protected Option_C2Tuple_EightU16sEightU16sZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_C2Tuple_EightU16sEightU16sZZ() {
		if (ptr != 0) { bindings.COption_C2Tuple_EightU16sEightU16sZZ_free(ptr); }
	}

	internal static Option_C2Tuple_EightU16sEightU16sZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_C2Tuple_EightU16sEightU16sZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C2Tuple_EightU16sEightU16sZZ_Some(ptr);
			case 1: return new Option_C2Tuple_EightU16sEightU16sZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_C2Tuple_EightU16sEightU16sZZ of type Some */
	public class Option_C2Tuple_EightU16sEightU16sZZ_Some : Option_C2Tuple_EightU16sEightU16sZZ {
		public TwoTuple__u168_u168Z some;
		internal Option_C2Tuple_EightU16sEightU16sZZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_C2Tuple_EightU16sEightU16sZZ_Some_get_some(ptr);
			TwoTuple__u168_u168Z some_hu_conv = new TwoTuple__u168_u168Z(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_C2Tuple_EightU16sEightU16sZZ of type None */
	public class Option_C2Tuple_EightU16sEightU16sZZ_None : Option_C2Tuple_EightU16sEightU16sZZ {
		internal Option_C2Tuple_EightU16sEightU16sZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_EightU16sEightU16sZZ containing a crate::c_types::derived::C2Tuple__u168_u168Z
	 */
	public static Option_C2Tuple_EightU16sEightU16sZZ some(org.ldk.structs.TwoTuple__u168_u168Z o) {
		long ret = bindings.COption_C2Tuple_EightU16sEightU16sZZ_some(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_EightU16sEightU16sZZ containing nothing
	 */
	public static Option_C2Tuple_EightU16sEightU16sZZ none() {
		long ret = bindings.COption_C2Tuple_EightU16sEightU16sZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_C2Tuple_EightU16sEightU16sZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_EightU16sEightU16sZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C2Tuple_EightU16sEightU16sZZ clone() {
		long ret = bindings.COption_C2Tuple_EightU16sEightU16sZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_EightU16sEightU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

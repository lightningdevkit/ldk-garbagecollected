using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a usize or not
 */
public class Option_usizeZ : CommonBase {
	protected Option_usizeZ(object _dummy, long ptr) : base(ptr) { }
	~Option_usizeZ() {
		if (ptr != 0) { bindings.COption_usizeZ_free(ptr); }
	}

	internal static Option_usizeZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_usizeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_usizeZ_Some(ptr);
			case 1: return new Option_usizeZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_usizeZ of type Some */
	public class Option_usizeZ_Some : Option_usizeZ {
		public long some;
		internal Option_usizeZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_usizeZ_Some_get_some(ptr);
		}
	}
	/** A Option_usizeZ of type None */
	public class Option_usizeZ_None : Option_usizeZ {
		internal Option_usizeZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_usizeZ containing a usize
	 */
	public static Option_usizeZ some(long o) {
		long ret = bindings.COption_usizeZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_usizeZ containing nothing
	 */
	public static Option_usizeZ none() {
		long ret = bindings.COption_usizeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_usizeZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_usizeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_usizeZ clone() {
		long ret = bindings.COption_usizeZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

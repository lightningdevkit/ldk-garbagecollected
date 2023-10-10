using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::CVec_u8Z or not
 */
public class Option_CVec_u8ZZ : CommonBase {
	protected Option_CVec_u8ZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_CVec_u8ZZ() {
		if (ptr != 0) { bindings.COption_CVec_u8ZZ_free(ptr); }
	}

	internal static Option_CVec_u8ZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_CVec_u8ZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_u8ZZ_Some(ptr);
			case 1: return new Option_CVec_u8ZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_CVec_u8ZZ of type Some */
	public class Option_CVec_u8ZZ_Some : Option_CVec_u8ZZ {
		public byte[] some;
		internal Option_CVec_u8ZZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_CVec_u8ZZ_Some_get_some(ptr);
		}
	}
	/** A Option_CVec_u8ZZ of type None */
	public class Option_CVec_u8ZZ_None : Option_CVec_u8ZZ {
		internal Option_CVec_u8ZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_CVec_u8ZZ containing a crate::c_types::derived::CVec_u8Z
	 */
	public static Option_CVec_u8ZZ some(byte[] o) {
		long ret = bindings.COption_CVec_u8ZZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_u8ZZ containing nothing
	 */
	public static Option_CVec_u8ZZ none() {
		long ret = bindings.COption_CVec_u8ZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_CVec_u8ZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_u8ZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_u8ZZ clone() {
		long ret = bindings.COption_CVec_u8ZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

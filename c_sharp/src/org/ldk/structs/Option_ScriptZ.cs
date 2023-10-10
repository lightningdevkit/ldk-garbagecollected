using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::CVec_u8Z or not
 */
public class Option_ScriptZ : CommonBase {
	protected Option_ScriptZ(object _dummy, long ptr) : base(ptr) { }
	~Option_ScriptZ() {
		if (ptr != 0) { bindings.COption_ScriptZ_free(ptr); }
	}

	internal static Option_ScriptZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_ScriptZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ScriptZ_Some(ptr);
			case 1: return new Option_ScriptZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_ScriptZ of type Some */
	public class Option_ScriptZ_Some : Option_ScriptZ {
		public byte[] some;
		internal Option_ScriptZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_ScriptZ_Some_get_some(ptr);
		}
	}
	/** A Option_ScriptZ of type None */
	public class Option_ScriptZ_None : Option_ScriptZ {
		internal Option_ScriptZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_ScriptZ containing a crate::c_types::derived::CVec_u8Z
	 */
	public static Option_ScriptZ some(byte[] o) {
		long ret = bindings.COption_ScriptZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ScriptZ containing nothing
	 */
	public static Option_ScriptZ none() {
		long ret = bindings.COption_ScriptZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_ScriptZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_ScriptZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ScriptZ clone() {
		long ret = bindings.COption_ScriptZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScriptZ ret_hu_conv = org.ldk.structs.Option_ScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

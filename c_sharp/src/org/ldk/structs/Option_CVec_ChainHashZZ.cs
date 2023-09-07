using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::CVec_ChainHashZ or not
 */
public class Option_CVec_ChainHashZZ : CommonBase {
	protected Option_CVec_ChainHashZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_CVec_ChainHashZZ() {
		if (ptr != 0) { bindings.COption_CVec_ChainHashZZ_free(ptr); }
	}

	internal static Option_CVec_ChainHashZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_CVec_ChainHashZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_ChainHashZZ_Some(ptr);
			case 1: return new Option_CVec_ChainHashZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_CVec_ChainHashZZ of type Some */
	public class Option_CVec_ChainHashZZ_Some : Option_CVec_ChainHashZZ {
		public byte[][] some;
		internal Option_CVec_ChainHashZZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_CVec_ChainHashZZ_Some_get_some(ptr);
		}
	}
	/** A Option_CVec_ChainHashZZ of type None */
	public class Option_CVec_ChainHashZZ_None : Option_CVec_ChainHashZZ {
		internal Option_CVec_ChainHashZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_CVec_ChainHashZZ containing a crate::c_types::derived::CVec_ChainHashZ
	 */
	public static Option_CVec_ChainHashZZ some(byte[][] o) {
		long ret = bindings.COption_CVec_ChainHashZZ_some(o != null ? InternalUtils.mapArray(o, o_conv_8 => InternalUtils.check_arr_len(o_conv_8, 32)) : null);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_ChainHashZZ containing nothing
	 */
	public static Option_CVec_ChainHashZZ none() {
		long ret = bindings.COption_CVec_ChainHashZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_CVec_ChainHashZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_ChainHashZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_ChainHashZZ clone() {
		long ret = bindings.COption_CVec_ChainHashZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

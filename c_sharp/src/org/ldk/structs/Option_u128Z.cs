using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::U128 or not
 */
public class Option_u128Z : CommonBase {
	protected Option_u128Z(object _dummy, long ptr) : base(ptr) { }
	~Option_u128Z() {
		if (ptr != 0) { bindings.COption_u128Z_free(ptr); }
	}

	internal static Option_u128Z constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_u128Z_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_u128Z_Some(ptr);
			case 1: return new Option_u128Z_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_u128Z of type Some */
	public class Option_u128Z_Some : Option_u128Z {
		public UInt128 some;
		internal Option_u128Z_Some(long ptr) : base(null, ptr) {
			byte[] some = bindings.LDKCOption_u128Z_Some_get_some(ptr);
			org.ldk.util.UInt128 some_conv = new org.ldk.util.UInt128(some);
			this.some = some_conv;
		}
	}
	/** A Option_u128Z of type None */
	public class Option_u128Z_None : Option_u128Z {
		internal Option_u128Z_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_u128Z containing a crate::c_types::U128
	 */
	public static Option_u128Z some(org.ldk.util.UInt128 o) {
		long ret = bindings.COption_u128Z_some(o.getLEBytes());
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u128Z containing nothing
	 */
	public static Option_u128Z none() {
		long ret = bindings.COption_u128Z_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_u128Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_u128Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u128Z clone() {
		long ret = bindings.COption_u128Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

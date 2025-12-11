using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a u8 or not
 */
public class Option_u8Z : CommonBase {
	protected Option_u8Z(object _dummy, long ptr) : base(ptr) { }
	~Option_u8Z() {
		if (ptr != 0) { bindings.COption_u8Z_free(ptr); }
	}

	internal static Option_u8Z constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_u8Z_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_u8Z_Some(ptr);
			case 1: return new Option_u8Z_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_u8Z of type Some */
	public class Option_u8Z_Some : Option_u8Z {
		public byte some;
		internal Option_u8Z_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_u8Z_Some_get_some(ptr);
		}
	}
	/** A Option_u8Z of type None */
	public class Option_u8Z_None : Option_u8Z {
		internal Option_u8Z_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_u8Z containing a u8
	 */
	public static org.ldk.structs.Option_u8Z some(byte o) {
		long ret = bindings.COption_u8Z_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u8Z ret_hu_conv = org.ldk.structs.Option_u8Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u8Z containing nothing
	 */
	public static org.ldk.structs.Option_u8Z none() {
		long ret = bindings.COption_u8Z_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u8Z ret_hu_conv = org.ldk.structs.Option_u8Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_u8Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_u8Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_u8Z clone() {
		long ret = bindings.COption_u8Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u8Z ret_hu_conv = org.ldk.structs.Option_u8Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

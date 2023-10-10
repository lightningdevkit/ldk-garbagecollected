using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a i64 or not
 */
public class Option_i64Z : CommonBase {
	protected Option_i64Z(object _dummy, long ptr) : base(ptr) { }
	~Option_i64Z() {
		if (ptr != 0) { bindings.COption_i64Z_free(ptr); }
	}

	internal static Option_i64Z constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_i64Z_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_i64Z_Some(ptr);
			case 1: return new Option_i64Z_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_i64Z of type Some */
	public class Option_i64Z_Some : Option_i64Z {
		public long some;
		internal Option_i64Z_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_i64Z_Some_get_some(ptr);
		}
	}
	/** A Option_i64Z of type None */
	public class Option_i64Z_None : Option_i64Z {
		internal Option_i64Z_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_i64Z containing a i64
	 */
	public static Option_i64Z some(long o) {
		long ret = bindings.COption_i64Z_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_i64Z ret_hu_conv = org.ldk.structs.Option_i64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_i64Z containing nothing
	 */
	public static Option_i64Z none() {
		long ret = bindings.COption_i64Z_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_i64Z ret_hu_conv = org.ldk.structs.Option_i64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_i64Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_i64Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_i64Z clone() {
		long ret = bindings.COption_i64Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_i64Z ret_hu_conv = org.ldk.structs.Option_i64Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

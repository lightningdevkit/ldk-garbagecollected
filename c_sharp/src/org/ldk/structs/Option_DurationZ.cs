using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a u64 or not
 */
public class Option_DurationZ : CommonBase {
	protected Option_DurationZ(object _dummy, long ptr) : base(ptr) { }
	~Option_DurationZ() {
		if (ptr != 0) { bindings.COption_DurationZ_free(ptr); }
	}

	internal static Option_DurationZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_DurationZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_DurationZ_Some(ptr);
			case 1: return new Option_DurationZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_DurationZ of type Some */
	public class Option_DurationZ_Some : Option_DurationZ {
		public long some;
		internal Option_DurationZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_DurationZ_Some_get_some(ptr);
		}
	}
	/** A Option_DurationZ of type None */
	public class Option_DurationZ_None : Option_DurationZ {
		internal Option_DurationZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_DurationZ containing a u64
	 */
	public static Option_DurationZ some(long o) {
		long ret = bindings.COption_DurationZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_DurationZ containing nothing
	 */
	public static Option_DurationZ none() {
		long ret = bindings.COption_DurationZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_DurationZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_DurationZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_DurationZ clone() {
		long ret = bindings.COption_DurationZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a u32 or not
 */
public class Option_PackedLockTimeZ : CommonBase {
	protected Option_PackedLockTimeZ(object _dummy, long ptr) : base(ptr) { }
	~Option_PackedLockTimeZ() {
		if (ptr != 0) { bindings.COption_PackedLockTimeZ_free(ptr); }
	}

	internal static Option_PackedLockTimeZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_PackedLockTimeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PackedLockTimeZ_Some(ptr);
			case 1: return new Option_PackedLockTimeZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_PackedLockTimeZ of type Some */
	public class Option_PackedLockTimeZ_Some : Option_PackedLockTimeZ {
		public int some;
		internal Option_PackedLockTimeZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_PackedLockTimeZ_Some_get_some(ptr);
		}
	}
	/** A Option_PackedLockTimeZ of type None */
	public class Option_PackedLockTimeZ_None : Option_PackedLockTimeZ {
		internal Option_PackedLockTimeZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_PackedLockTimeZ containing a u32
	 */
	public static Option_PackedLockTimeZ some(int o) {
		long ret = bindings.COption_PackedLockTimeZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PackedLockTimeZ containing nothing
	 */
	public static Option_PackedLockTimeZ none() {
		long ret = bindings.COption_PackedLockTimeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_PackedLockTimeZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_PackedLockTimeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PackedLockTimeZ clone() {
		long ret = bindings.COption_PackedLockTimeZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PackedLockTimeZ ret_hu_conv = org.ldk.structs.Option_PackedLockTimeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::util::config::MaxDustHTLCExposure or not
 */
public class Option_MaxDustHTLCExposureZ : CommonBase {
	protected Option_MaxDustHTLCExposureZ(object _dummy, long ptr) : base(ptr) { }
	~Option_MaxDustHTLCExposureZ() {
		if (ptr != 0) { bindings.COption_MaxDustHTLCExposureZ_free(ptr); }
	}

	internal static Option_MaxDustHTLCExposureZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_MaxDustHTLCExposureZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_MaxDustHTLCExposureZ_Some(ptr);
			case 1: return new Option_MaxDustHTLCExposureZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_MaxDustHTLCExposureZ of type Some */
	public class Option_MaxDustHTLCExposureZ_Some : Option_MaxDustHTLCExposureZ {
		public MaxDustHTLCExposure some;
		internal Option_MaxDustHTLCExposureZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_MaxDustHTLCExposureZ_Some_get_some(ptr);
			org.ldk.structs.MaxDustHTLCExposure some_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_MaxDustHTLCExposureZ of type None */
	public class Option_MaxDustHTLCExposureZ_None : Option_MaxDustHTLCExposureZ {
		internal Option_MaxDustHTLCExposureZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing a crate::lightning::util::config::MaxDustHTLCExposure
	 */
	public static Option_MaxDustHTLCExposureZ some(org.ldk.structs.MaxDustHTLCExposure o) {
		long ret = bindings.COption_MaxDustHTLCExposureZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing nothing
	 */
	public static Option_MaxDustHTLCExposureZ none() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_MaxDustHTLCExposureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_MaxDustHTLCExposureZ clone() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

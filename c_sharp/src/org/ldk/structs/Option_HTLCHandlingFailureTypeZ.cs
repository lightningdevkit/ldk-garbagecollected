using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureType or not
 */
public class Option_HTLCHandlingFailureTypeZ : CommonBase {
	protected Option_HTLCHandlingFailureTypeZ(object _dummy, long ptr) : base(ptr) { }
	~Option_HTLCHandlingFailureTypeZ() {
		if (ptr != 0) { bindings.COption_HTLCHandlingFailureTypeZ_free(ptr); }
	}

	internal static Option_HTLCHandlingFailureTypeZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_HTLCHandlingFailureTypeZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCHandlingFailureTypeZ_Some(ptr);
			case 1: return new Option_HTLCHandlingFailureTypeZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_HTLCHandlingFailureTypeZ of type Some */
	public class Option_HTLCHandlingFailureTypeZ_Some : Option_HTLCHandlingFailureTypeZ {
		public org.ldk.structs.HTLCHandlingFailureType some;
		internal Option_HTLCHandlingFailureTypeZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_HTLCHandlingFailureTypeZ_Some_get_some(ptr);
			org.ldk.structs.HTLCHandlingFailureType some_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_HTLCHandlingFailureTypeZ of type None */
	public class Option_HTLCHandlingFailureTypeZ_None : Option_HTLCHandlingFailureTypeZ {
		internal Option_HTLCHandlingFailureTypeZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing a crate::lightning::events::HTLCHandlingFailureType
	 */
	public static org.ldk.structs.Option_HTLCHandlingFailureTypeZ some(org.ldk.structs.HTLCHandlingFailureType o) {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing nothing
	 */
	public static org.ldk.structs.Option_HTLCHandlingFailureTypeZ none() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureTypeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_HTLCHandlingFailureTypeZ clone() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

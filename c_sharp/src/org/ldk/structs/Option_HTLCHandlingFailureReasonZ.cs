using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureReason or not
 */
public class Option_HTLCHandlingFailureReasonZ : CommonBase {
	protected Option_HTLCHandlingFailureReasonZ(object _dummy, long ptr) : base(ptr) { }
	~Option_HTLCHandlingFailureReasonZ() {
		if (ptr != 0) { bindings.COption_HTLCHandlingFailureReasonZ_free(ptr); }
	}

	internal static Option_HTLCHandlingFailureReasonZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_HTLCHandlingFailureReasonZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCHandlingFailureReasonZ_Some(ptr);
			case 1: return new Option_HTLCHandlingFailureReasonZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_HTLCHandlingFailureReasonZ of type Some */
	public class Option_HTLCHandlingFailureReasonZ_Some : Option_HTLCHandlingFailureReasonZ {
		public org.ldk.structs.HTLCHandlingFailureReason some;
		internal Option_HTLCHandlingFailureReasonZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_HTLCHandlingFailureReasonZ_Some_get_some(ptr);
			org.ldk.structs.HTLCHandlingFailureReason some_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_HTLCHandlingFailureReasonZ of type None */
	public class Option_HTLCHandlingFailureReasonZ_None : Option_HTLCHandlingFailureReasonZ {
		internal Option_HTLCHandlingFailureReasonZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing a crate::lightning::events::HTLCHandlingFailureReason
	 */
	public static org.ldk.structs.Option_HTLCHandlingFailureReasonZ some(org.ldk.structs.HTLCHandlingFailureReason o) {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing nothing
	 */
	public static org.ldk.structs.Option_HTLCHandlingFailureReasonZ none() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_HTLCHandlingFailureReasonZ clone() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

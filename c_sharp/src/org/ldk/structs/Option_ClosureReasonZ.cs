using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::ClosureReason or not
 */
public class Option_ClosureReasonZ : CommonBase {
	protected Option_ClosureReasonZ(object _dummy, long ptr) : base(ptr) { }
	~Option_ClosureReasonZ() {
		if (ptr != 0) { bindings.COption_ClosureReasonZ_free(ptr); }
	}

	internal static Option_ClosureReasonZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_ClosureReasonZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ClosureReasonZ_Some(ptr);
			case 1: return new Option_ClosureReasonZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_ClosureReasonZ of type Some */
	public class Option_ClosureReasonZ_Some : Option_ClosureReasonZ {
		public ClosureReason some;
		internal Option_ClosureReasonZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_ClosureReasonZ_Some_get_some(ptr);
			org.ldk.structs.ClosureReason some_hu_conv = org.ldk.structs.ClosureReason.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_ClosureReasonZ of type None */
	public class Option_ClosureReasonZ_None : Option_ClosureReasonZ {
		internal Option_ClosureReasonZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_ClosureReasonZ containing a crate::lightning::events::ClosureReason
	 */
	public static Option_ClosureReasonZ some(org.ldk.structs.ClosureReason o) {
		long ret = bindings.COption_ClosureReasonZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ClosureReasonZ ret_hu_conv = org.ldk.structs.Option_ClosureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ClosureReasonZ containing nothing
	 */
	public static Option_ClosureReasonZ none() {
		long ret = bindings.COption_ClosureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ClosureReasonZ ret_hu_conv = org.ldk.structs.Option_ClosureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_ClosureReasonZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_ClosureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ClosureReasonZ clone() {
		long ret = bindings.COption_ClosureReasonZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ClosureReasonZ ret_hu_conv = org.ldk.structs.Option_ClosureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

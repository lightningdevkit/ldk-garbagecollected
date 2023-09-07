using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::Event or not
 */
public class Option_EventZ : CommonBase {
	protected Option_EventZ(object _dummy, long ptr) : base(ptr) { }
	~Option_EventZ() {
		if (ptr != 0) { bindings.COption_EventZ_free(ptr); }
	}

	internal static Option_EventZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_EventZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_EventZ_Some(ptr);
			case 1: return new Option_EventZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_EventZ of type Some */
	public class Option_EventZ_Some : Option_EventZ {
		public Event some;
		internal Option_EventZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_EventZ_Some_get_some(ptr);
			org.ldk.structs.Event some_hu_conv = org.ldk.structs.Event.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_EventZ of type None */
	public class Option_EventZ_None : Option_EventZ {
		internal Option_EventZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_EventZ containing a crate::lightning::events::Event
	 */
	public static Option_EventZ some(org.ldk.structs.Event o) {
		long ret = bindings.COption_EventZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_EventZ ret_hu_conv = org.ldk.structs.Option_EventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_EventZ containing nothing
	 */
	public static Option_EventZ none() {
		long ret = bindings.COption_EventZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_EventZ ret_hu_conv = org.ldk.structs.Option_EventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_EventZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_EventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_EventZ clone() {
		long ret = bindings.COption_EventZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_EventZ ret_hu_conv = org.ldk.structs.Option_EventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

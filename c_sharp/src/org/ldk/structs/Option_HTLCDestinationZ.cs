using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::HTLCDestination or not
 */
public class Option_HTLCDestinationZ : CommonBase {
	protected Option_HTLCDestinationZ(object _dummy, long ptr) : base(ptr) { }
	~Option_HTLCDestinationZ() {
		if (ptr != 0) { bindings.COption_HTLCDestinationZ_free(ptr); }
	}

	internal static Option_HTLCDestinationZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_HTLCDestinationZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_HTLCDestinationZ_Some(ptr);
			case 1: return new Option_HTLCDestinationZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_HTLCDestinationZ of type Some */
	public class Option_HTLCDestinationZ_Some : Option_HTLCDestinationZ {
		public HTLCDestination some;
		internal Option_HTLCDestinationZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_HTLCDestinationZ_Some_get_some(ptr);
			org.ldk.structs.HTLCDestination some_hu_conv = org.ldk.structs.HTLCDestination.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_HTLCDestinationZ of type None */
	public class Option_HTLCDestinationZ_None : Option_HTLCDestinationZ {
		internal Option_HTLCDestinationZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_HTLCDestinationZ containing a crate::lightning::events::HTLCDestination
	 */
	public static Option_HTLCDestinationZ some(org.ldk.structs.HTLCDestination o) {
		long ret = bindings.COption_HTLCDestinationZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCDestinationZ containing nothing
	 */
	public static Option_HTLCDestinationZ none() {
		long ret = bindings.COption_HTLCDestinationZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_HTLCDestinationZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCDestinationZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_HTLCDestinationZ clone() {
		long ret = bindings.COption_HTLCDestinationZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

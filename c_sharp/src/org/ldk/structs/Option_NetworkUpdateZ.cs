using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::routing::gossip::NetworkUpdate or not
 */
public class Option_NetworkUpdateZ : CommonBase {
	protected Option_NetworkUpdateZ(object _dummy, long ptr) : base(ptr) { }
	~Option_NetworkUpdateZ() {
		if (ptr != 0) { bindings.COption_NetworkUpdateZ_free(ptr); }
	}

	internal static Option_NetworkUpdateZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_NetworkUpdateZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_NetworkUpdateZ_Some(ptr);
			case 1: return new Option_NetworkUpdateZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_NetworkUpdateZ of type Some */
	public class Option_NetworkUpdateZ_Some : Option_NetworkUpdateZ {
		public NetworkUpdate some;
		internal Option_NetworkUpdateZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_NetworkUpdateZ_Some_get_some(ptr);
			org.ldk.structs.NetworkUpdate some_hu_conv = org.ldk.structs.NetworkUpdate.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_NetworkUpdateZ of type None */
	public class Option_NetworkUpdateZ_None : Option_NetworkUpdateZ {
		internal Option_NetworkUpdateZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_NetworkUpdateZ containing a crate::lightning::routing::gossip::NetworkUpdate
	 */
	public static Option_NetworkUpdateZ some(org.ldk.structs.NetworkUpdate o) {
		long ret = bindings.COption_NetworkUpdateZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetworkUpdateZ ret_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_NetworkUpdateZ containing nothing
	 */
	public static Option_NetworkUpdateZ none() {
		long ret = bindings.COption_NetworkUpdateZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetworkUpdateZ ret_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_NetworkUpdateZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_NetworkUpdateZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_NetworkUpdateZ clone() {
		long ret = bindings.COption_NetworkUpdateZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetworkUpdateZ ret_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

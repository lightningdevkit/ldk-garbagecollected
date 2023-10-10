using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::ln::msgs::NetAddress or not
 */
public class Option_NetAddressZ : CommonBase {
	protected Option_NetAddressZ(object _dummy, long ptr) : base(ptr) { }
	~Option_NetAddressZ() {
		if (ptr != 0) { bindings.COption_NetAddressZ_free(ptr); }
	}

	internal static Option_NetAddressZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_NetAddressZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_NetAddressZ_Some(ptr);
			case 1: return new Option_NetAddressZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_NetAddressZ of type Some */
	public class Option_NetAddressZ_Some : Option_NetAddressZ {
		public NetAddress some;
		internal Option_NetAddressZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_NetAddressZ_Some_get_some(ptr);
			org.ldk.structs.NetAddress some_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_NetAddressZ of type None */
	public class Option_NetAddressZ_None : Option_NetAddressZ {
		internal Option_NetAddressZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_NetAddressZ containing a crate::lightning::ln::msgs::NetAddress
	 */
	public static Option_NetAddressZ some(org.ldk.structs.NetAddress o) {
		long ret = bindings.COption_NetAddressZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_NetAddressZ containing nothing
	 */
	public static Option_NetAddressZ none() {
		long ret = bindings.COption_NetAddressZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_NetAddressZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_NetAddressZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_NetAddressZ clone() {
		long ret = bindings.COption_NetAddressZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

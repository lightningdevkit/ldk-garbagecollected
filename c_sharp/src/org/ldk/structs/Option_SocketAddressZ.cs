using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::ln::msgs::SocketAddress or not
 */
public class Option_SocketAddressZ : CommonBase {
	protected Option_SocketAddressZ(object _dummy, long ptr) : base(ptr) { }
	~Option_SocketAddressZ() {
		if (ptr != 0) { bindings.COption_SocketAddressZ_free(ptr); }
	}

	internal static Option_SocketAddressZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_SocketAddressZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_SocketAddressZ_Some(ptr);
			case 1: return new Option_SocketAddressZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_SocketAddressZ of type Some */
	public class Option_SocketAddressZ_Some : Option_SocketAddressZ {
		public SocketAddress some;
		internal Option_SocketAddressZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_SocketAddressZ_Some_get_some(ptr);
			org.ldk.structs.SocketAddress some_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_SocketAddressZ of type None */
	public class Option_SocketAddressZ_None : Option_SocketAddressZ {
		internal Option_SocketAddressZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_SocketAddressZ containing a crate::lightning::ln::msgs::SocketAddress
	 */
	public static Option_SocketAddressZ some(org.ldk.structs.SocketAddress o) {
		long ret = bindings.COption_SocketAddressZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_SocketAddressZ containing nothing
	 */
	public static Option_SocketAddressZ none() {
		long ret = bindings.COption_SocketAddressZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_SocketAddressZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_SocketAddressZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_SocketAddressZ clone() {
		long ret = bindings.COption_SocketAddressZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

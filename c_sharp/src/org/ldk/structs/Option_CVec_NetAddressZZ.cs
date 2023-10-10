using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::CVec_NetAddressZ or not
 */
public class Option_CVec_NetAddressZZ : CommonBase {
	protected Option_CVec_NetAddressZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_CVec_NetAddressZZ() {
		if (ptr != 0) { bindings.COption_CVec_NetAddressZZ_free(ptr); }
	}

	internal static Option_CVec_NetAddressZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_CVec_NetAddressZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_NetAddressZZ_Some(ptr);
			case 1: return new Option_CVec_NetAddressZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_CVec_NetAddressZZ of type Some */
	public class Option_CVec_NetAddressZZ_Some : Option_CVec_NetAddressZZ {
		public NetAddress[] some;
		internal Option_CVec_NetAddressZZ_Some(long ptr) : base(null, ptr) {
			long[] some = bindings.LDKCOption_CVec_NetAddressZZ_Some_get_some(ptr);
			int some_conv_12_len = some.Length;
			NetAddress[] some_conv_12_arr = new NetAddress[some_conv_12_len];
			for (int m = 0; m < some_conv_12_len; m++) {
				long some_conv_12 = some[m];
				org.ldk.structs.NetAddress some_conv_12_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(some_conv_12);
				if (some_conv_12_hu_conv != null) { some_conv_12_hu_conv.ptrs_to.AddLast(this); };
				some_conv_12_arr[m] = some_conv_12_hu_conv;
			}
			this.some = some_conv_12_arr;
		}
	}
	/** A Option_CVec_NetAddressZZ of type None */
	public class Option_CVec_NetAddressZZ_None : Option_CVec_NetAddressZZ {
		internal Option_CVec_NetAddressZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_CVec_NetAddressZZ containing a crate::c_types::derived::CVec_NetAddressZ
	 */
	public static Option_CVec_NetAddressZZ some(NetAddress[] o) {
		long ret = bindings.COption_CVec_NetAddressZZ_some(o != null ? InternalUtils.mapArray(o, o_conv_12 => o_conv_12.ptr) : null);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_NetAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (NetAddress o_conv_12 in o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o_conv_12); }; };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_NetAddressZZ containing nothing
	 */
	public static Option_CVec_NetAddressZZ none() {
		long ret = bindings.COption_CVec_NetAddressZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_NetAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_CVec_NetAddressZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_NetAddressZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_NetAddressZZ clone() {
		long ret = bindings.COption_CVec_NetAddressZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_NetAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

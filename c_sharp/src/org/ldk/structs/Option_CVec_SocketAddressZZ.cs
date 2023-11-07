using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::CVec_SocketAddressZ or not
 */
public class Option_CVec_SocketAddressZZ : CommonBase {
	protected Option_CVec_SocketAddressZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_CVec_SocketAddressZZ() {
		if (ptr != 0) { bindings.COption_CVec_SocketAddressZZ_free(ptr); }
	}

	internal static Option_CVec_SocketAddressZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_CVec_SocketAddressZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_SocketAddressZZ_Some(ptr);
			case 1: return new Option_CVec_SocketAddressZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_CVec_SocketAddressZZ of type Some */
	public class Option_CVec_SocketAddressZZ_Some : Option_CVec_SocketAddressZZ {
		public SocketAddress[] some;
		internal Option_CVec_SocketAddressZZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_CVec_SocketAddressZZ_Some_get_some(ptr);
			int some_conv_15_len = InternalUtils.getArrayLength(some);
			SocketAddress[] some_conv_15_arr = new SocketAddress[some_conv_15_len];
			for (int p = 0; p < some_conv_15_len; p++) {
				long some_conv_15 = InternalUtils.getU64ArrayElem(some, p);
				org.ldk.structs.SocketAddress some_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(some_conv_15);
				if (some_conv_15_hu_conv != null) { some_conv_15_hu_conv.ptrs_to.AddLast(this); };
				some_conv_15_arr[p] = some_conv_15_hu_conv;
			}
			bindings.free_buffer(some);
			this.some = some_conv_15_arr;
		}
	}
	/** A Option_CVec_SocketAddressZZ of type None */
	public class Option_CVec_SocketAddressZZ_None : Option_CVec_SocketAddressZZ {
		internal Option_CVec_SocketAddressZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing a crate::c_types::derived::CVec_SocketAddressZ
	 */
	public static Option_CVec_SocketAddressZZ some(SocketAddress[] o) {
		long ret = bindings.COption_CVec_SocketAddressZZ_some(InternalUtils.encodeUint64Array(InternalUtils.mapArray(o, o_conv_15 => o_conv_15.ptr)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (SocketAddress o_conv_15 in o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o_conv_15); }; };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing nothing
	 */
	public static Option_CVec_SocketAddressZZ none() {
		long ret = bindings.COption_CVec_SocketAddressZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_CVec_SocketAddressZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_SocketAddressZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_SocketAddressZZ clone() {
		long ret = bindings.COption_CVec_SocketAddressZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

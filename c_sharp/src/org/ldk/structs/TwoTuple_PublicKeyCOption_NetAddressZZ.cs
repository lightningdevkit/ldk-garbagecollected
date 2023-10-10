using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_PublicKeyCOption_NetAddressZZ : CommonBase {
	internal TwoTuple_PublicKeyCOption_NetAddressZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_PublicKeyCOption_NetAddressZZ() {
		if (ptr != 0) { bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_NetAddressZ get_b() {
		long ret = bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PublicKeyCOption_NetAddressZZ clone() {
		long ret = bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCOption_NetAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCOption_NetAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PublicKeyCOption_NetAddressZZ from the contained elements.
	 */
	public static TwoTuple_PublicKeyCOption_NetAddressZZ of(byte[] a, org.ldk.structs.Option_NetAddressZ b) {
		long ret = bindings.C2Tuple_PublicKeyCOption_NetAddressZZ_new(InternalUtils.check_arr_len(a, 33), b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCOption_NetAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCOption_NetAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

}
} } }

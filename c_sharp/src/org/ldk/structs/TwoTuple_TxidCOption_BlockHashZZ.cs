using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_TxidCOption_BlockHashZZ : CommonBase {
	internal TwoTuple_TxidCOption_BlockHashZZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_TxidCOption_BlockHashZZ() {
		if (ptr != 0) { bindings.C2Tuple_TxidCOption_BlockHashZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_TxidCOption_BlockHashZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_BlockHashZ get_b() {
		long ret = bindings.C2Tuple_TxidCOption_BlockHashZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_TxidCOption_BlockHashZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_TxidCOption_BlockHashZZ clone() {
		long ret = bindings.C2Tuple_TxidCOption_BlockHashZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCOption_BlockHashZZ ret_hu_conv = new TwoTuple_TxidCOption_BlockHashZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_TxidCOption_BlockHashZZ from the contained elements.
	 */
	public static TwoTuple_TxidCOption_BlockHashZZ of(byte[] a, org.ldk.structs.Option_BlockHashZ b) {
		long ret = bindings.C2Tuple_TxidCOption_BlockHashZZ_new(InternalUtils.check_arr_len(a, 32), b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_TxidCOption_BlockHashZZ ret_hu_conv = new TwoTuple_TxidCOption_BlockHashZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

}
} } }

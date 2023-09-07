using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_PartiallySignedTransactionusizeZ : CommonBase {
	internal TwoTuple_PartiallySignedTransactionusizeZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_PartiallySignedTransactionusizeZ() {
		if (ptr != 0) { bindings.C2Tuple_PartiallySignedTransactionusizeZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PartiallySignedTransactionusizeZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C2Tuple_PartiallySignedTransactionusizeZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_PartiallySignedTransactionusizeZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PartiallySignedTransactionusizeZ clone() {
		long ret = bindings.C2Tuple_PartiallySignedTransactionusizeZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PartiallySignedTransactionusizeZ ret_hu_conv = new TwoTuple_PartiallySignedTransactionusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PartiallySignedTransactionusizeZ from the contained elements.
	 */
	public static TwoTuple_PartiallySignedTransactionusizeZ of(byte[] a, long b) {
		long ret = bindings.C2Tuple_PartiallySignedTransactionusizeZ_new(a, b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PartiallySignedTransactionusizeZ ret_hu_conv = new TwoTuple_PartiallySignedTransactionusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

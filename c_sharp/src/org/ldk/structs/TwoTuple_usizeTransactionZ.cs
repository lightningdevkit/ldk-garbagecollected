using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_usizeTransactionZ : CommonBase {
	internal TwoTuple_usizeTransactionZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_usizeTransactionZ() {
		if (ptr != 0) { bindings.C2Tuple_usizeTransactionZ_free(ptr); }
	}

	/**
	 * 
	 */
	public long get_a() {
		long ret = bindings.C2Tuple_usizeTransactionZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C2Tuple_usizeTransactionZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_usizeTransactionZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_usizeTransactionZ clone() {
		long ret = bindings.C2Tuple_usizeTransactionZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_usizeTransactionZ ret_hu_conv = new TwoTuple_usizeTransactionZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_usizeTransactionZ from the contained elements.
	 */
	public static TwoTuple_usizeTransactionZ of(long a, byte[] b) {
		long ret = bindings.C2Tuple_usizeTransactionZ_new(a, b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_usizeTransactionZ ret_hu_conv = new TwoTuple_usizeTransactionZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

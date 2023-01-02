using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_u32ScriptZ : CommonBase {
	internal TwoTuple_u32ScriptZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_u32ScriptZ() {
		if (ptr != 0) { bindings.C2Tuple_u32ScriptZ_free(ptr); }
	}

	/**
	 * 
	 */
	public int get_a() {
		int ret = bindings.C2Tuple_u32ScriptZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C2Tuple_u32ScriptZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_u32ScriptZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_u32ScriptZ clone() {
		long ret = bindings.C2Tuple_u32ScriptZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u32ScriptZ ret_hu_conv = new TwoTuple_u32ScriptZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u32ScriptZ from the contained elements.
	 */
	public static TwoTuple_u32ScriptZ of(int a, byte[] b) {
		long ret = bindings.C2Tuple_u32ScriptZ_new(a, b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u32ScriptZ ret_hu_conv = new TwoTuple_u32ScriptZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

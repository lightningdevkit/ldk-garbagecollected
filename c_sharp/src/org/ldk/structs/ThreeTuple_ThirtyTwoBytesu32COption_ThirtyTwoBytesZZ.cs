using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ : CommonBase {
	internal ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ() {
		if (ptr != 0) { bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public int get_b() {
		int ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_ThirtyTwoBytesZ get_c() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ clone() {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ ret_hu_conv = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ from the contained elements.
	 */
	public static ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ of(byte[] a, int b, org.ldk.structs.Option_ThirtyTwoBytesZ c) {
		long ret = bindings.C3Tuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 32)), b, c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ ret_hu_conv = new ThreeTuple_ThirtyTwoBytesu32COption_ThirtyTwoBytesZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(c); };
		return ret_hu_conv;
	}

}
} } }

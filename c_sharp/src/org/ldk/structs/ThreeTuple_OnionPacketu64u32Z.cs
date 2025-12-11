using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_OnionPacketu64u32Z : CommonBase {
	internal ThreeTuple_OnionPacketu64u32Z(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_OnionPacketu64u32Z() {
		if (ptr != 0) { bindings.C3Tuple_OnionPacketu64u32Z_free(ptr); }
	}

	/**
	 * 
	 */
	public org.ldk.structs.OnionPacket get_a() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public int get_c() {
		int ret = bindings.C3Tuple_OnionPacketu64u32Z_get_c(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.ThreeTuple_OnionPacketu64u32Z clone() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionPacketu64u32Z ret_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OnionPacketu64u32Z from the contained elements.
	 */
	public static org.ldk.structs.ThreeTuple_OnionPacketu64u32Z of(org.ldk.structs.OnionPacket a, long b, int c) {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_new(a.ptr, b, c);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionPacketu64u32Z ret_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

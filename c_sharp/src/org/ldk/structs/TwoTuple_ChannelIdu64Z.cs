using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_ChannelIdu64Z : CommonBase {
	internal TwoTuple_ChannelIdu64Z(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_ChannelIdu64Z() {
		if (ptr != 0) { bindings.C2Tuple_ChannelIdu64Z_free(ptr); }
	}

	/**
	 * 
	 */
	public org.ldk.structs.ChannelId get_a() {
		long ret = bindings.C2Tuple_ChannelIdu64Z_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelId ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelId(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C2Tuple_ChannelIdu64Z_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_ChannelIdu64Z_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.TwoTuple_ChannelIdu64Z clone() {
		long ret = bindings.C2Tuple_ChannelIdu64Z_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ChannelIdu64Z ret_hu_conv = new TwoTuple_ChannelIdu64Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ChannelIdu64Z from the contained elements.
	 */
	public static org.ldk.structs.TwoTuple_ChannelIdu64Z of(org.ldk.structs.ChannelId a, long b) {
		long ret = bindings.C2Tuple_ChannelIdu64Z_new(a.ptr, b);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ChannelIdu64Z ret_hu_conv = new TwoTuple_ChannelIdu64Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

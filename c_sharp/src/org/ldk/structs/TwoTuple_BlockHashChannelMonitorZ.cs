using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_BlockHashChannelMonitorZ : CommonBase {
	internal TwoTuple_BlockHashChannelMonitorZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_BlockHashChannelMonitorZ() {
		if (ptr != 0) { bindings.C2Tuple_BlockHashChannelMonitorZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public ChannelMonitor get_b() {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelMonitor ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelMonitor(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_BlockHashChannelMonitorZ clone() {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BlockHashChannelMonitorZ from the contained elements.
	 */
	public static TwoTuple_BlockHashChannelMonitorZ of(byte[] a, org.ldk.structs.ChannelMonitor b) {
		long ret = bindings.C2Tuple_BlockHashChannelMonitorZ_new(InternalUtils.check_arr_len(a, 32), b == null ? 0 : b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BlockHashChannelMonitorZ ret_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

}
} } }

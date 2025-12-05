using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_u64BlindedMessagePathZ : CommonBase {
	internal TwoTuple_u64BlindedMessagePathZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_u64BlindedMessagePathZ() {
		if (ptr != 0) { bindings.C2Tuple_u64BlindedMessagePathZ_free(ptr); }
	}

	/**
	 * 
	 */
	public long get_a() {
		long ret = bindings.C2Tuple_u64BlindedMessagePathZ_get_a(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public org.ldk.structs.BlindedMessagePath get_b() {
		long ret = bindings.C2Tuple_u64BlindedMessagePathZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_u64BlindedMessagePathZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.TwoTuple_u64BlindedMessagePathZ clone() {
		long ret = bindings.C2Tuple_u64BlindedMessagePathZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u64BlindedMessagePathZ ret_hu_conv = new TwoTuple_u64BlindedMessagePathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u64BlindedMessagePathZ from the contained elements.
	 */
	public static org.ldk.structs.TwoTuple_u64BlindedMessagePathZ of(long a, org.ldk.structs.BlindedMessagePath b) {
		long ret = bindings.C2Tuple_u64BlindedMessagePathZ_new(a, b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u64BlindedMessagePathZ ret_hu_conv = new TwoTuple_u64BlindedMessagePathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

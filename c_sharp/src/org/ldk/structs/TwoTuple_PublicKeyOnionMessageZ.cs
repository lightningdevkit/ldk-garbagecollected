using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class TwoTuple_PublicKeyOnionMessageZ : CommonBase {
	internal TwoTuple_PublicKeyOnionMessageZ(object _dummy, long ptr) : base(ptr) { }
	~TwoTuple_PublicKeyOnionMessageZ() {
		if (ptr != 0) { bindings.C2Tuple_PublicKeyOnionMessageZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C2Tuple_PublicKeyOnionMessageZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public OnionMessage get_b() {
		long ret = bindings.C2Tuple_PublicKeyOnionMessageZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C2Tuple_PublicKeyOnionMessageZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PublicKeyOnionMessageZ clone() {
		long ret = bindings.C2Tuple_PublicKeyOnionMessageZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyOnionMessageZ ret_hu_conv = new TwoTuple_PublicKeyOnionMessageZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PublicKeyOnionMessageZ from the contained elements.
	 */
	public static TwoTuple_PublicKeyOnionMessageZ of(byte[] a, org.ldk.structs.OnionMessage b) {
		long ret = bindings.C2Tuple_PublicKeyOnionMessageZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 33)), b == null ? 0 : b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyOnionMessageZ ret_hu_conv = new TwoTuple_PublicKeyOnionMessageZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

}
} } }

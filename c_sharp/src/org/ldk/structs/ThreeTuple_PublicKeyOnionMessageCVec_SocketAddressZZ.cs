using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ : CommonBase {
	internal ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ() {
		if (ptr != 0) { bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public org.ldk.structs.OnionMessage get_b() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public SocketAddress[] get_c() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_15_len = InternalUtils.getArrayLength(ret);
		SocketAddress[] ret_conv_15_arr = new SocketAddress[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = InternalUtils.getU64ArrayElem(ret, p);
			org.ldk.structs.SocketAddress ret_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret_conv_15);
			if (ret_conv_15_hu_conv != null) { ret_conv_15_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_15_arr;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ clone() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ from the contained elements.
	 */
	public static org.ldk.structs.ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ of(byte[] a, org.ldk.structs.OnionMessage b, SocketAddress[] c) {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 33)), b.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(c, c_conv_15 => c_conv_15.ptr)));
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

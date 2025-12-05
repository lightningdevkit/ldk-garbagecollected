package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ extends CommonBase {
	ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public OnionMessage get_b() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public SocketAddress[] get_c() {
		long[] ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_15_len = ret.length;
		SocketAddress[] ret_conv_15_arr = new SocketAddress[ret_conv_15_len];
		for (int p = 0; p < ret_conv_15_len; p++) {
			long ret_conv_15 = ret[p];
			org.ldk.structs.SocketAddress ret_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(ret_conv_15);
			if (ret_conv_15_hu_conv != null) { ret_conv_15_hu_conv.ptrs_to.add(this); };
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		return ret_conv_15_arr;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ clone() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ from the contained elements.
	 */
	public static ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ of(byte[] a, org.ldk.structs.OnionMessage b, SocketAddress[] c) {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_new(InternalUtils.check_arr_len(a, 33), b.ptr, c != null ? Arrays.stream(c).mapToLong(c_conv_15 -> c_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

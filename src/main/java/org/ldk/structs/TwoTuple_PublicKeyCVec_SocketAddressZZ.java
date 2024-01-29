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
public class TwoTuple_PublicKeyCVec_SocketAddressZZ extends CommonBase {
	TwoTuple_PublicKeyCVec_SocketAddressZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public SocketAddress[] get_b() {
		long[] ret = bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_get_b(this.ptr);
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
		long ret = bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PublicKeyCVec_SocketAddressZZ clone() {
		long ret = bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCVec_SocketAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PublicKeyCVec_SocketAddressZZ from the contained elements.
	 */
	public static TwoTuple_PublicKeyCVec_SocketAddressZZ of(byte[] a, SocketAddress[] b) {
		long ret = bindings.C2Tuple_PublicKeyCVec_SocketAddressZZ_new(InternalUtils.check_arr_len(a, 33), b != null ? Arrays.stream(b).mapToLong(b_conv_15 -> b_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCVec_SocketAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCVec_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (SocketAddress b_conv_15: b) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b_conv_15); }; };
		return ret_hu_conv;
	}

}

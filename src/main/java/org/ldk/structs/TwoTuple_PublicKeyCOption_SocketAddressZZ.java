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
public class TwoTuple_PublicKeyCOption_SocketAddressZZ extends CommonBase {
	TwoTuple_PublicKeyCOption_SocketAddressZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public Option_SocketAddressZ get_b() {
		long ret = bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PublicKeyCOption_SocketAddressZZ clone() {
		long ret = bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCOption_SocketAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCOption_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PublicKeyCOption_SocketAddressZZ from the contained elements.
	 */
	public static TwoTuple_PublicKeyCOption_SocketAddressZZ of(byte[] a, org.ldk.structs.Option_SocketAddressZ b) {
		long ret = bindings.C2Tuple_PublicKeyCOption_SocketAddressZZ_new(InternalUtils.check_arr_len(a, 33), b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PublicKeyCOption_SocketAddressZZ ret_hu_conv = new TwoTuple_PublicKeyCOption_SocketAddressZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		return ret_hu_conv;
	}

}

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
public class ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ extends CommonBase {
	ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public OnionMessage get_b() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionMessage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionMessage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public Option_CVec_SocketAddressZZ get_c() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ clone() {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ from the contained elements.
	 */
	public static ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ of(byte[] a, org.ldk.structs.OnionMessage b, org.ldk.structs.Option_CVec_SocketAddressZZ c) {
		long ret = bindings.C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ_new(InternalUtils.check_arr_len(a, 33), b == null ? 0 : b.ptr, c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ ret_hu_conv = new ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(c); };
		return ret_hu_conv;
	}

}

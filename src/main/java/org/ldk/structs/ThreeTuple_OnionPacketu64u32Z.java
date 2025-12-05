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
public class ThreeTuple_OnionPacketu64u32Z extends CommonBase {
	ThreeTuple_OnionPacketu64u32Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_OnionPacketu64u32Z_free(ptr); }
	}

	/**
	 * 
	 */
	public OnionPacket get_a() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OnionPacket ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OnionPacket(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public int get_c() {
		int ret = bindings.C3Tuple_OnionPacketu64u32Z_get_c(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_OnionPacketu64u32Z clone() {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionPacketu64u32Z ret_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OnionPacketu64u32Z from the contained elements.
	 */
	public static ThreeTuple_OnionPacketu64u32Z of(org.ldk.structs.OnionPacket a, long b, int c) {
		long ret = bindings.C3Tuple_OnionPacketu64u32Z_new(a.ptr, b, c);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionPacketu64u32Z ret_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

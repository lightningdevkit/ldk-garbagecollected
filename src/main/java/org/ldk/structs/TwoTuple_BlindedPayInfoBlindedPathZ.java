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
public class TwoTuple_BlindedPayInfoBlindedPathZ extends CommonBase {
	TwoTuple_BlindedPayInfoBlindedPathZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_BlindedPayInfoBlindedPathZ_free(ptr); }
	}

	/**
	 * 
	 */
	public BlindedPayInfo get_a() {
		long ret = bindings.C2Tuple_BlindedPayInfoBlindedPathZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPayInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPayInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public BlindedPath get_b() {
		long ret = bindings.C2Tuple_BlindedPayInfoBlindedPathZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_BlindedPayInfoBlindedPathZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_BlindedPayInfoBlindedPathZ clone() {
		long ret = bindings.C2Tuple_BlindedPayInfoBlindedPathZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BlindedPayInfoBlindedPathZ ret_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_BlindedPayInfoBlindedPathZ from the contained elements.
	 */
	public static TwoTuple_BlindedPayInfoBlindedPathZ of(org.ldk.structs.BlindedPayInfo a, org.ldk.structs.BlindedPath b) {
		long ret = bindings.C2Tuple_BlindedPayInfoBlindedPathZ_new(a == null ? 0 : a.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_BlindedPayInfoBlindedPathZ ret_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		return ret_hu_conv;
	}

}

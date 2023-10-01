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
public class TwoTuple_CVec_u8ZusizeZ extends CommonBase {
	TwoTuple_CVec_u8ZusizeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_CVec_u8ZusizeZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_CVec_u8ZusizeZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public long get_b() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_CVec_u8ZusizeZ clone() {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_CVec_u8ZusizeZ ret_hu_conv = new TwoTuple_CVec_u8ZusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_CVec_u8ZusizeZ from the contained elements.
	 */
	public static TwoTuple_CVec_u8ZusizeZ of(byte[] a, long b) {
		long ret = bindings.C2Tuple_CVec_u8ZusizeZ_new(a, b);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_CVec_u8ZusizeZ ret_hu_conv = new TwoTuple_CVec_u8ZusizeZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

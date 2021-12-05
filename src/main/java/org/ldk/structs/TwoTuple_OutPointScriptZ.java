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
public class TwoTuple_OutPointScriptZ extends CommonBase {
	TwoTuple_OutPointScriptZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_OutPointScriptZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OutPoint get_a() {
		long ret = bindings.C2Tuple_OutPointScriptZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C2Tuple_OutPointScriptZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_OutPointScriptZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_OutPointScriptZ clone() {
		long ret = bindings.C2Tuple_OutPointScriptZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointScriptZ ret_hu_conv = new TwoTuple_OutPointScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_OutPointScriptZ from the contained elements.
	 */
	public static TwoTuple_OutPointScriptZ of(OutPoint a, byte[] b) {
		long ret = bindings.C2Tuple_OutPointScriptZ_new(a == null ? 0 : a.ptr & ~1, b);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_OutPointScriptZ ret_hu_conv = new TwoTuple_OutPointScriptZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

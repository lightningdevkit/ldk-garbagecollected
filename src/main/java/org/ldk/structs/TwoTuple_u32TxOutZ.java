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
public class TwoTuple_u32TxOutZ extends CommonBase {
	TwoTuple_u32TxOutZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_u32TxOutZ_free(ptr); }
	}

	/**
	 * 
	 */
	public int get_a() {
		int ret = bindings.C2Tuple_u32TxOutZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public TxOut get_b() {
		long ret = bindings.C2Tuple_u32TxOutZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_u32TxOutZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_u32TxOutZ clone() {
		long ret = bindings.C2Tuple_u32TxOutZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u32TxOutZ ret_hu_conv = new TwoTuple_u32TxOutZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_u32TxOutZ from the contained elements.
	 */
	public static TwoTuple_u32TxOutZ of(int a, TxOut b) {
		long ret = bindings.C2Tuple_u32TxOutZ_new(a, b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_u32TxOutZ ret_hu_conv = new TwoTuple_u32TxOutZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

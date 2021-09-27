package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TwoTuple_PublicKeyTypeZ extends CommonBase {
	TwoTuple_PublicKeyTypeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_PublicKeyTypeZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PublicKeyTypeZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public Type get_b() {
		long ret = bindings.C2Tuple_PublicKeyTypeZ_get_b(this.ptr);
		if (ret < 1024) { return null; }
		Type ret_hu_conv = new Type(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PublicKeyTypeZ clone() {
		long ret = bindings.C2Tuple_PublicKeyTypeZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		TwoTuple_PublicKeyTypeZ ret_hu_conv = new TwoTuple_PublicKeyTypeZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PublicKeyTypeZ from the contained elements.
	 */
	public static TwoTuple_PublicKeyTypeZ of(byte[] a, Type b) {
		long ret = bindings.C2Tuple_PublicKeyTypeZ_new(a, b == null ? 0 : b.ptr);
		if (ret < 1024) { return null; }
		TwoTuple_PublicKeyTypeZ ret_hu_conv = new TwoTuple_PublicKeyTypeZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(b);
		return ret_hu_conv;
	}

}

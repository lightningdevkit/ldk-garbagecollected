package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Init extends CommonBase {
	Init(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Init_free(ptr); }
	}

	public static Init constructor_clone(Init orig) {
		long ret = bindings.Init_clone(orig == null ? 0 : orig.ptr & ~1);
		Init ret_hu_conv = new Init(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] write(Init obj) {
		byte[] ret = bindings.Init_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static Init constructor_read(byte[] ser) {
		long ret = bindings.Init_read(ser);
		Init ret_hu_conv = new Init(null, ret);
		return ret_hu_conv;
	}

}

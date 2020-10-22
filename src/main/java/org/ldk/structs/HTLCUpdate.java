package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class HTLCUpdate extends CommonBase {
	HTLCUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.HTLCUpdate_free(ptr); }
	}

	public static HTLCUpdate constructor_clone(HTLCUpdate orig) {
		long ret = bindings.HTLCUpdate_clone(orig == null ? 0 : orig.ptr & ~1);
		HTLCUpdate ret_hu_conv = new HTLCUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] write(HTLCUpdate obj) {
		byte[] ret = bindings.HTLCUpdate_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static HTLCUpdate constructor_read(byte[] ser) {
		long ret = bindings.HTLCUpdate_read(ser);
		HTLCUpdate ret_hu_conv = new HTLCUpdate(null, ret);
		return ret_hu_conv;
	}

}

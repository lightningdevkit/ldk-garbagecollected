package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Pong extends CommonBase {
	Pong(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Pong_free(ptr); }
	}

	public static Pong constructor_clone(Pong orig) {
		long ret = bindings.Pong_clone(orig == null ? 0 : orig.ptr & ~1);
		Pong ret_hu_conv = new Pong(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public short get_byteslen() {
		short ret = bindings.Pong_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(short val) {
		bindings.Pong_set_byteslen(this.ptr, val);
	}

	public static Pong constructor_new(short byteslen_arg) {
		long ret = bindings.Pong_new(byteslen_arg);
		Pong ret_hu_conv = new Pong(null, ret);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.Pong_write(this.ptr);
		return ret;
	}

	public static Pong constructor_read(byte[] ser) {
		long ret = bindings.Pong_read(ser);
		Pong ret_hu_conv = new Pong(null, ret);
		return ret_hu_conv;
	}

}

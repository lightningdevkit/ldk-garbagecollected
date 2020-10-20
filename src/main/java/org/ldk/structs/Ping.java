package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Ping extends CommonBase {
	Ping(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.Ping_free(ptr);
	}

	public static Ping constructor_clone(Ping orig) {
		long ret = bindings.Ping_clone(orig == null ? 0 : orig.ptr & ~1);
		Ping ret_hu_conv = new Ping(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public short get_ponglen() {
		short ret = bindings.Ping_get_ponglen(this.ptr);
		return ret;
	}

	public void set_ponglen(short val) {
		bindings.Ping_set_ponglen(this.ptr, val);
	}

	public short get_byteslen() {
		short ret = bindings.Ping_get_byteslen(this.ptr);
		return ret;
	}

	public void set_byteslen(short val) {
		bindings.Ping_set_byteslen(this.ptr, val);
	}

	public static Ping constructor_new(short ponglen_arg, short byteslen_arg) {
		long ret = bindings.Ping_new(ponglen_arg, byteslen_arg);
		Ping ret_hu_conv = new Ping(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(Ping obj) {
		byte[] ret = bindings.Ping_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static Ping constructor_read(byte[] ser) {
		long ret = bindings.Ping_read(ser);
		Ping ret_hu_conv = new Ping(null, ret);
		return ret_hu_conv;
	}

}

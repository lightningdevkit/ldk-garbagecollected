package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Shutdown extends CommonBase {
	Shutdown(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.Shutdown_free(ptr);
	}

	public static Shutdown constructor_clone(Shutdown orig) {
		long ret = bindings.Shutdown_clone(orig == null ? 0 : orig.ptr & ~1);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.Shutdown_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.Shutdown_set_channel_id(this.ptr, val);
	}

	public byte[] get_scriptpubkey() {
		byte[] ret = bindings.Shutdown_get_scriptpubkey(this.ptr);
		return ret;
	}

	public void set_scriptpubkey(byte[] val) {
		bindings.Shutdown_set_scriptpubkey(this.ptr, val);
	}

	public static Shutdown constructor_new(byte[] channel_id_arg, byte[] scriptpubkey_arg) {
		long ret = bindings.Shutdown_new(channel_id_arg, scriptpubkey_arg);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(Shutdown obj) {
		byte[] ret = bindings.Shutdown_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static Shutdown constructor_read(byte[] ser) {
		long ret = bindings.Shutdown_read(ser);
		Shutdown ret_hu_conv = new Shutdown(null, ret);
		return ret_hu_conv;
	}

}

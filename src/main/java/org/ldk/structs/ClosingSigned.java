package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ClosingSigned extends CommonBase {
	ClosingSigned(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ClosingSigned_free(ptr);
	}

	public static ClosingSigned constructor_clone(ClosingSigned orig) {
		long ret = bindings.ClosingSigned_clone(orig == null ? 0 : orig.ptr & ~1);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ClosingSigned_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ClosingSigned_set_channel_id(this.ptr, val);
	}

	public long get_fee_satoshis() {
		long ret = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		return ret;
	}

	public void set_fee_satoshis(long val) {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
	}

	public byte[] get_signature() {
		byte[] ret = bindings.ClosingSigned_get_signature(this.ptr);
		return ret;
	}

	public void set_signature(byte[] val) {
		bindings.ClosingSigned_set_signature(this.ptr, val);
	}

	public static ClosingSigned constructor_new(byte[] channel_id_arg, long fee_satoshis_arg, byte[] signature_arg) {
		long ret = bindings.ClosingSigned_new(channel_id_arg, fee_satoshis_arg, signature_arg);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(ClosingSigned obj) {
		byte[] ret = bindings.ClosingSigned_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ClosingSigned constructor_read(byte[] ser) {
		long ret = bindings.ClosingSigned_read(ser);
		ClosingSigned ret_hu_conv = new ClosingSigned(null, ret);
		return ret_hu_conv;
	}

}

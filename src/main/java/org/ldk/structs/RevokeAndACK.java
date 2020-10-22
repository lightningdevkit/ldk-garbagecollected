package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class RevokeAndACK extends CommonBase {
	RevokeAndACK(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.RevokeAndACK_free(ptr); }
	}

	public static RevokeAndACK constructor_clone(RevokeAndACK orig) {
		long ret = bindings.RevokeAndACK_clone(orig == null ? 0 : orig.ptr & ~1);
		RevokeAndACK ret_hu_conv = new RevokeAndACK(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.RevokeAndACK_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.RevokeAndACK_set_channel_id(this.ptr, val);
	}

	public byte[] get_per_commitment_secret() {
		byte[] ret = bindings.RevokeAndACK_get_per_commitment_secret(this.ptr);
		return ret;
	}

	public void set_per_commitment_secret(byte[] val) {
		bindings.RevokeAndACK_set_per_commitment_secret(this.ptr, val);
	}

	public byte[] get_next_per_commitment_point() {
		byte[] ret = bindings.RevokeAndACK_get_next_per_commitment_point(this.ptr);
		return ret;
	}

	public void set_next_per_commitment_point(byte[] val) {
		bindings.RevokeAndACK_set_next_per_commitment_point(this.ptr, val);
	}

	public static RevokeAndACK constructor_new(byte[] channel_id_arg, byte[] per_commitment_secret_arg, byte[] next_per_commitment_point_arg) {
		long ret = bindings.RevokeAndACK_new(channel_id_arg, per_commitment_secret_arg, next_per_commitment_point_arg);
		RevokeAndACK ret_hu_conv = new RevokeAndACK(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(RevokeAndACK obj) {
		byte[] ret = bindings.RevokeAndACK_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static RevokeAndACK constructor_read(byte[] ser) {
		long ret = bindings.RevokeAndACK_read(ser);
		RevokeAndACK ret_hu_conv = new RevokeAndACK(null, ret);
		return ret_hu_conv;
	}

}

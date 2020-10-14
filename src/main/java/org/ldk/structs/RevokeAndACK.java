package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class RevokeAndACK extends CommonBase {
	RevokeAndACK(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.RevokeAndACK_free(ptr);
	}

	public RevokeAndACK(RevokeAndACK orig) {
		super(bindings.RevokeAndACK_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(RevokeAndACK this_ptr) {
		byte[] ret = bindings.RevokeAndACK_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(RevokeAndACK this_ptr, byte[] val) {
		bindings.RevokeAndACK_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_per_commitment_secret(RevokeAndACK this_ptr) {
		byte[] ret = bindings.RevokeAndACK_get_per_commitment_secret(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_per_commitment_secret(RevokeAndACK this_ptr, byte[] val) {
		bindings.RevokeAndACK_set_per_commitment_secret(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_next_per_commitment_point(RevokeAndACK this_ptr) {
		byte[] ret = bindings.RevokeAndACK_get_next_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_next_per_commitment_point(RevokeAndACK this_ptr, byte[] val) {
		bindings.RevokeAndACK_set_next_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public RevokeAndACK(byte[] channel_id_arg, byte[] per_commitment_secret_arg, byte[] next_per_commitment_point_arg) {
		super(bindings.RevokeAndACK_new(channel_id_arg, per_commitment_secret_arg, next_per_commitment_point_arg));
	}

	// Skipped RevokeAndACK_write
	public RevokeAndACK(byte[] ser) {
		super(bindings.RevokeAndACK_read(ser));
	}

}

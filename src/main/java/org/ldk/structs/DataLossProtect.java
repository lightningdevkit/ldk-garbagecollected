package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class DataLossProtect extends CommonBase {
	DataLossProtect(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.DataLossProtect_free(ptr); super.finalize();
	}

	public DataLossProtect(DataLossProtect orig) {
		super(bindings.DataLossProtect_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_your_last_per_commitment_secret(DataLossProtect this_ptr) {
		byte[] ret = bindings.DataLossProtect_get_your_last_per_commitment_secret(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_your_last_per_commitment_secret(DataLossProtect this_ptr, byte[] val) {
		bindings.DataLossProtect_set_your_last_per_commitment_secret(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_my_current_per_commitment_point(DataLossProtect this_ptr) {
		byte[] ret = bindings.DataLossProtect_get_my_current_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_my_current_per_commitment_point(DataLossProtect this_ptr, byte[] val) {
		bindings.DataLossProtect_set_my_current_per_commitment_point(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public DataLossProtect(byte[] your_last_per_commitment_secret_arg, byte[] my_current_per_commitment_point_arg) {
		super(bindings.DataLossProtect_new(your_last_per_commitment_secret_arg, my_current_per_commitment_point_arg));
	}

}

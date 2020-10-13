package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UpdateFulfillHTLC extends CommonBase {
	UpdateFulfillHTLC(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.UpdateFulfillHTLC_free(ptr); super.finalize();
	}

	public UpdateFulfillHTLC(UpdateFulfillHTLC orig) {
		super(bindings.UpdateFulfillHTLC_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(UpdateFulfillHTLC this_ptr) {
		byte[] ret = bindings.UpdateFulfillHTLC_get_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(UpdateFulfillHTLC this_ptr, byte[] val) {
		bindings.UpdateFulfillHTLC_set_channel_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_id(UpdateFulfillHTLC this_ptr) {
		long ret = bindings.UpdateFulfillHTLC_get_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_id(UpdateFulfillHTLC this_ptr, long val) {
		bindings.UpdateFulfillHTLC_set_htlc_id(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte[] get_payment_preimage(UpdateFulfillHTLC this_ptr) {
		byte[] ret = bindings.UpdateFulfillHTLC_get_payment_preimage(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_payment_preimage(UpdateFulfillHTLC this_ptr, byte[] val) {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public UpdateFulfillHTLC(byte[] channel_id_arg, long htlc_id_arg, byte[] payment_preimage_arg) {
		super(bindings.UpdateFulfillHTLC_new(channel_id_arg, htlc_id_arg, payment_preimage_arg));
	}

	// Skipped UpdateFulfillHTLC_write
	public UpdateFulfillHTLC(byte[] ser) {
		super(bindings.UpdateFulfillHTLC_read(ser));
	}

}

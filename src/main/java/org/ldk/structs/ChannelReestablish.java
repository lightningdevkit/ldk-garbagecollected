package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelReestablish extends CommonBase {
	ChannelReestablish(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelReestablish_free(ptr); super.finalize();
	}

	public ChannelReestablish(ChannelReestablish orig) {
		super(bindings.ChannelReestablish_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_channel_id(ChannelReestablish this_ptr) {
		byte[] ret = bindings.ChannelReestablish_get_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_channel_id(ChannelReestablish this_ptr, byte[] val) {
		bindings.ChannelReestablish_set_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_next_local_commitment_number(ChannelReestablish this_ptr) {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_next_local_commitment_number(ChannelReestablish this_ptr, long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_next_remote_commitment_number(ChannelReestablish this_ptr) {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_next_remote_commitment_number(ChannelReestablish this_ptr, long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped ChannelReestablish_write
	public ChannelReestablish(byte[] ser) {
		super(bindings.ChannelReestablish_read(ser));
	}

}

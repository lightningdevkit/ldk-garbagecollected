package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelReestablish extends CommonBase {
	ChannelReestablish(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelReestablish_free(ptr);
	}

	public static ChannelReestablish constructor_clone(ChannelReestablish orig) {
		long ret = bindings.ChannelReestablish_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelReestablish ret_hu_conv = new ChannelReestablish(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_channel_id() {
		byte[] ret = bindings.ChannelReestablish_get_channel_id(this.ptr);
		return ret;
	}

	public void set_channel_id(byte[] val) {
		bindings.ChannelReestablish_set_channel_id(this.ptr, val);
	}

	public long get_next_local_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_local_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_local_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_local_commitment_number(this.ptr, val);
	}

	public long get_next_remote_commitment_number() {
		long ret = bindings.ChannelReestablish_get_next_remote_commitment_number(this.ptr);
		return ret;
	}

	public void set_next_remote_commitment_number(long val) {
		bindings.ChannelReestablish_set_next_remote_commitment_number(this.ptr, val);
	}

	public byte[] write(ChannelReestablish obj) {
		byte[] ret = bindings.ChannelReestablish_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ChannelReestablish constructor_read(byte[] ser) {
		long ret = bindings.ChannelReestablish_read(ser);
		ChannelReestablish ret_hu_conv = new ChannelReestablish(null, ret);
		return ret_hu_conv;
	}

}

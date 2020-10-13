package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class DirectionalChannelInfo extends CommonBase {
	DirectionalChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.DirectionalChannelInfo_free(ptr); super.finalize();
	}

	public int get_last_update(DirectionalChannelInfo this_ptr) {
		int ret = bindings.DirectionalChannelInfo_get_last_update(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_last_update(DirectionalChannelInfo this_ptr, int val) {
		bindings.DirectionalChannelInfo_set_last_update(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_enabled(DirectionalChannelInfo this_ptr) {
		boolean ret = bindings.DirectionalChannelInfo_get_enabled(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_enabled(DirectionalChannelInfo this_ptr, boolean val) {
		bindings.DirectionalChannelInfo_set_enabled(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_cltv_expiry_delta(DirectionalChannelInfo this_ptr) {
		short ret = bindings.DirectionalChannelInfo_get_cltv_expiry_delta(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(DirectionalChannelInfo this_ptr, short val) {
		bindings.DirectionalChannelInfo_set_cltv_expiry_delta(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_minimum_msat(DirectionalChannelInfo this_ptr) {
		long ret = bindings.DirectionalChannelInfo_get_htlc_minimum_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(DirectionalChannelInfo this_ptr, long val) {
		bindings.DirectionalChannelInfo_set_htlc_minimum_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ChannelUpdate get_last_update_message(DirectionalChannelInfo this_ptr) {
		ChannelUpdate ret = new ChannelUpdate(null, bindings.DirectionalChannelInfo_get_last_update_message(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_last_update_message(DirectionalChannelInfo this_ptr, ChannelUpdate val) {
		bindings.DirectionalChannelInfo_set_last_update_message(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped DirectionalChannelInfo_write
	public DirectionalChannelInfo(byte[] ser) {
		super(bindings.DirectionalChannelInfo_read(ser));
	}

}

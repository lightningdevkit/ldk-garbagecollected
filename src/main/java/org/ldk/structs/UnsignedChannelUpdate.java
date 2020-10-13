package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class UnsignedChannelUpdate extends CommonBase {
	UnsignedChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.UnsignedChannelUpdate_free(ptr); super.finalize();
	}

	public UnsignedChannelUpdate(UnsignedChannelUpdate orig) {
		super(bindings.UnsignedChannelUpdate_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public byte[] get_chain_hash(UnsignedChannelUpdate this_ptr) {
		byte[] ret = bindings.UnsignedChannelUpdate_get_chain_hash(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_hash(UnsignedChannelUpdate this_ptr, byte[] val) {
		bindings.UnsignedChannelUpdate_set_chain_hash(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_short_channel_id(UnsignedChannelUpdate this_ptr) {
		long ret = bindings.UnsignedChannelUpdate_get_short_channel_id(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_short_channel_id(UnsignedChannelUpdate this_ptr, long val) {
		bindings.UnsignedChannelUpdate_set_short_channel_id(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_timestamp(UnsignedChannelUpdate this_ptr) {
		int ret = bindings.UnsignedChannelUpdate_get_timestamp(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_timestamp(UnsignedChannelUpdate this_ptr, int val) {
		bindings.UnsignedChannelUpdate_set_timestamp(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public byte get_flags(UnsignedChannelUpdate this_ptr) {
		byte ret = bindings.UnsignedChannelUpdate_get_flags(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_flags(UnsignedChannelUpdate this_ptr, byte val) {
		bindings.UnsignedChannelUpdate_set_flags(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_cltv_expiry_delta(UnsignedChannelUpdate this_ptr) {
		short ret = bindings.UnsignedChannelUpdate_get_cltv_expiry_delta(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(UnsignedChannelUpdate this_ptr, short val) {
		bindings.UnsignedChannelUpdate_set_cltv_expiry_delta(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_htlc_minimum_msat(UnsignedChannelUpdate this_ptr) {
		long ret = bindings.UnsignedChannelUpdate_get_htlc_minimum_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(UnsignedChannelUpdate this_ptr, long val) {
		bindings.UnsignedChannelUpdate_set_htlc_minimum_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_fee_base_msat(UnsignedChannelUpdate this_ptr) {
		int ret = bindings.UnsignedChannelUpdate_get_fee_base_msat(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fee_base_msat(UnsignedChannelUpdate this_ptr, int val) {
		bindings.UnsignedChannelUpdate_set_fee_base_msat(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public int get_fee_proportional_millionths(UnsignedChannelUpdate this_ptr) {
		int ret = bindings.UnsignedChannelUpdate_get_fee_proportional_millionths(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(UnsignedChannelUpdate this_ptr, int val) {
		bindings.UnsignedChannelUpdate_set_fee_proportional_millionths(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	// Skipped UnsignedChannelUpdate_write
	public UnsignedChannelUpdate(byte[] ser) {
		super(bindings.UnsignedChannelUpdate_read(ser));
	}

}

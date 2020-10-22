package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class UnsignedChannelUpdate extends CommonBase {
	UnsignedChannelUpdate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.UnsignedChannelUpdate_free(ptr); }
	}

	public static UnsignedChannelUpdate constructor_clone(UnsignedChannelUpdate orig) {
		long ret = bindings.UnsignedChannelUpdate_clone(orig == null ? 0 : orig.ptr & ~1);
		UnsignedChannelUpdate ret_hu_conv = new UnsignedChannelUpdate(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public byte[] get_chain_hash() {
		byte[] ret = bindings.UnsignedChannelUpdate_get_chain_hash(this.ptr);
		return ret;
	}

	public void set_chain_hash(byte[] val) {
		bindings.UnsignedChannelUpdate_set_chain_hash(this.ptr, val);
	}

	public long get_short_channel_id() {
		long ret = bindings.UnsignedChannelUpdate_get_short_channel_id(this.ptr);
		return ret;
	}

	public void set_short_channel_id(long val) {
		bindings.UnsignedChannelUpdate_set_short_channel_id(this.ptr, val);
	}

	public int get_timestamp() {
		int ret = bindings.UnsignedChannelUpdate_get_timestamp(this.ptr);
		return ret;
	}

	public void set_timestamp(int val) {
		bindings.UnsignedChannelUpdate_set_timestamp(this.ptr, val);
	}

	public byte get_flags() {
		byte ret = bindings.UnsignedChannelUpdate_get_flags(this.ptr);
		return ret;
	}

	public void set_flags(byte val) {
		bindings.UnsignedChannelUpdate_set_flags(this.ptr, val);
	}

	public short get_cltv_expiry_delta() {
		short ret = bindings.UnsignedChannelUpdate_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	public void set_cltv_expiry_delta(short val) {
		bindings.UnsignedChannelUpdate_set_cltv_expiry_delta(this.ptr, val);
	}

	public long get_htlc_minimum_msat() {
		long ret = bindings.UnsignedChannelUpdate_get_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_htlc_minimum_msat(long val) {
		bindings.UnsignedChannelUpdate_set_htlc_minimum_msat(this.ptr, val);
	}

	public int get_fee_base_msat() {
		int ret = bindings.UnsignedChannelUpdate_get_fee_base_msat(this.ptr);
		return ret;
	}

	public void set_fee_base_msat(int val) {
		bindings.UnsignedChannelUpdate_set_fee_base_msat(this.ptr, val);
	}

	public int get_fee_proportional_millionths() {
		int ret = bindings.UnsignedChannelUpdate_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(int val) {
		bindings.UnsignedChannelUpdate_set_fee_proportional_millionths(this.ptr, val);
	}

	public byte[] write(UnsignedChannelUpdate obj) {
		byte[] ret = bindings.UnsignedChannelUpdate_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static UnsignedChannelUpdate constructor_read(byte[] ser) {
		long ret = bindings.UnsignedChannelUpdate_read(ser);
		UnsignedChannelUpdate ret_hu_conv = new UnsignedChannelUpdate(null, ret);
		return ret_hu_conv;
	}

}

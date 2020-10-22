package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelConfig extends CommonBase {
	ChannelConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelConfig_free(ptr); }
	}

	public static ChannelConfig constructor_clone(ChannelConfig orig) {
		long ret = bindings.ChannelConfig_clone(orig == null ? 0 : orig.ptr & ~1);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

	public int get_fee_proportional_millionths() {
		int ret = bindings.ChannelConfig_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(int val) {
		bindings.ChannelConfig_set_fee_proportional_millionths(this.ptr, val);
	}

	public boolean get_announced_channel() {
		boolean ret = bindings.ChannelConfig_get_announced_channel(this.ptr);
		return ret;
	}

	public void set_announced_channel(boolean val) {
		bindings.ChannelConfig_set_announced_channel(this.ptr, val);
	}

	public boolean get_commit_upfront_shutdown_pubkey() {
		boolean ret = bindings.ChannelConfig_get_commit_upfront_shutdown_pubkey(this.ptr);
		return ret;
	}

	public void set_commit_upfront_shutdown_pubkey(boolean val) {
		bindings.ChannelConfig_set_commit_upfront_shutdown_pubkey(this.ptr, val);
	}

	public static ChannelConfig constructor_new(int fee_proportional_millionths_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		long ret = bindings.ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		return ret_hu_conv;
	}

	public static ChannelConfig constructor_default() {
		long ret = bindings.ChannelConfig_default();
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		return ret_hu_conv;
	}

	public byte[] write(ChannelConfig obj) {
		byte[] ret = bindings.ChannelConfig_write(obj == null ? 0 : obj.ptr & ~1);
		this.ptrs_to.add(obj);
		return ret;
	}

	public static ChannelConfig constructor_read(byte[] ser) {
		long ret = bindings.ChannelConfig_read(ser);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		return ret_hu_conv;
	}

}

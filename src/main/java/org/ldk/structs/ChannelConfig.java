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
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public ChannelConfig clone() {
		long ret = bindings.ChannelConfig_clone(this.ptr);
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ChannelConfig constructor_default() {
		long ret = bindings.ChannelConfig_default();
		ChannelConfig ret_hu_conv = new ChannelConfig(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelConfig_write(this.ptr);
		return ret;
	}

	public static Result_ChannelConfigDecodeErrorZ constructor_read(byte[] ser) {
		long ret = bindings.ChannelConfig_read(ser);
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

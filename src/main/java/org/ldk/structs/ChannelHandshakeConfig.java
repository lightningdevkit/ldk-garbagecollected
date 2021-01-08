package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelHandshakeConfig extends CommonBase {
	ChannelHandshakeConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelHandshakeConfig_free(ptr); }
	}

	public ChannelHandshakeConfig clone() {
		long ret = bindings.ChannelHandshakeConfig_clone(this.ptr);
		ChannelHandshakeConfig ret_hu_conv = new ChannelHandshakeConfig(null, ret);
		return ret_hu_conv;
	}

	public int get_minimum_depth() {
		int ret = bindings.ChannelHandshakeConfig_get_minimum_depth(this.ptr);
		return ret;
	}

	public void set_minimum_depth(int val) {
		bindings.ChannelHandshakeConfig_set_minimum_depth(this.ptr, val);
	}

	public short get_our_to_self_delay() {
		short ret = bindings.ChannelHandshakeConfig_get_our_to_self_delay(this.ptr);
		return ret;
	}

	public void set_our_to_self_delay(short val) {
		bindings.ChannelHandshakeConfig_set_our_to_self_delay(this.ptr, val);
	}

	public long get_our_htlc_minimum_msat() {
		long ret = bindings.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this.ptr);
		return ret;
	}

	public void set_our_htlc_minimum_msat(long val) {
		bindings.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this.ptr, val);
	}

	public static ChannelHandshakeConfig constructor_new(int minimum_depth_arg, short our_to_self_delay_arg, long our_htlc_minimum_msat_arg) {
		long ret = bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
		ChannelHandshakeConfig ret_hu_conv = new ChannelHandshakeConfig(null, ret);
		return ret_hu_conv;
	}

	public static ChannelHandshakeConfig constructor_default() {
		long ret = bindings.ChannelHandshakeConfig_default();
		ChannelHandshakeConfig ret_hu_conv = new ChannelHandshakeConfig(null, ret);
		return ret_hu_conv;
	}

}

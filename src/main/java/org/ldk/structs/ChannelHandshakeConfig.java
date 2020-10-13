package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelHandshakeConfig extends CommonBase {
	ChannelHandshakeConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelHandshakeConfig_free(ptr); super.finalize();
	}

	public ChannelHandshakeConfig(ChannelHandshakeConfig orig) {
		super(bindings.ChannelHandshakeConfig_clone(orig == null ? 0 : orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public int get_minimum_depth(ChannelHandshakeConfig this_ptr) {
		int ret = bindings.ChannelHandshakeConfig_get_minimum_depth(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_minimum_depth(ChannelHandshakeConfig this_ptr, int val) {
		bindings.ChannelHandshakeConfig_set_minimum_depth(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public short get_our_to_self_delay(ChannelHandshakeConfig this_ptr) {
		short ret = bindings.ChannelHandshakeConfig_get_our_to_self_delay(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_our_to_self_delay(ChannelHandshakeConfig this_ptr, short val) {
		bindings.ChannelHandshakeConfig_set_our_to_self_delay(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public long get_our_htlc_minimum_msat(ChannelHandshakeConfig this_ptr) {
		long ret = bindings.ChannelHandshakeConfig_get_our_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_our_htlc_minimum_msat(ChannelHandshakeConfig this_ptr, long val) {
		bindings.ChannelHandshakeConfig_set_our_htlc_minimum_msat(this_ptr == null ? 0 : this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ChannelHandshakeConfig(int minimum_depth_arg, short our_to_self_delay_arg, long our_htlc_minimum_msat_arg) {
		super(bindings.ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg));
	}

	public ChannelHandshakeConfig() {
		super(bindings.ChannelHandshakeConfig_default());
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelConfig extends CommonBase {
	ChannelConfig(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelConfig_free(ptr); super.finalize();
	}

	public ChannelConfig(ChannelConfig orig) {
		super(bindings.ChannelConfig_clone(orig.ptr & ~1));
		this.ptrs_to.add(orig);
	}

	public int get_fee_proportional_millionths(ChannelConfig this_ptr) {
		int ret = bindings.ChannelConfig_get_fee_proportional_millionths(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fee_proportional_millionths(ChannelConfig this_ptr, int val) {
		bindings.ChannelConfig_set_fee_proportional_millionths(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_announced_channel(ChannelConfig this_ptr) {
		boolean ret = bindings.ChannelConfig_get_announced_channel(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_announced_channel(ChannelConfig this_ptr, boolean val) {
		bindings.ChannelConfig_set_announced_channel(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public boolean get_commit_upfront_shutdown_pubkey(ChannelConfig this_ptr) {
		boolean ret = bindings.ChannelConfig_get_commit_upfront_shutdown_pubkey(this_ptr.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_commit_upfront_shutdown_pubkey(ChannelConfig this_ptr, boolean val) {
		bindings.ChannelConfig_set_commit_upfront_shutdown_pubkey(this_ptr.ptr & ~1, val);
		this.ptrs_to.add(this_ptr);
	}

	public ChannelConfig(int fee_proportional_millionths_arg, boolean announced_channel_arg, boolean commit_upfront_shutdown_pubkey_arg) {
		super(bindings.ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg));
	}

	public ChannelConfig() {
		super(bindings.ChannelConfig_default());
	}

	// Skipped ChannelConfig_write
	public ChannelConfig(byte[] ser) {
		super(bindings.ChannelConfig_read(ser));
	}

}

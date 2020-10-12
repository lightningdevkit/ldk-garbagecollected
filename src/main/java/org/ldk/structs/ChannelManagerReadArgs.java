package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelManagerReadArgs extends CommonBase {
	ChannelManagerReadArgs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelManagerReadArgs_free(ptr); super.finalize();
	}

	public KeysInterface get_keys_manager(ChannelManagerReadArgs this_ptr) {
		KeysInterface ret = new KeysInterface(null, bindings.ChannelManagerReadArgs_get_keys_manager(this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_keys_manager(ChannelManagerReadArgs this_ptr, KeysInterface val) {
		bindings.ChannelManagerReadArgs_set_keys_manager(this_ptr.ptr & ~1, val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public FeeEstimator get_fee_estimator(ChannelManagerReadArgs this_ptr) {
		FeeEstimator ret = new FeeEstimator(null, bindings.ChannelManagerReadArgs_get_fee_estimator(this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_fee_estimator(ChannelManagerReadArgs this_ptr, FeeEstimator val) {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this_ptr.ptr & ~1, val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public Watch get_chain_monitor(ChannelManagerReadArgs this_ptr) {
		Watch ret = new Watch(null, bindings.ChannelManagerReadArgs_get_chain_monitor(this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_chain_monitor(ChannelManagerReadArgs this_ptr, Watch val) {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this_ptr.ptr & ~1, val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public BroadcasterInterface get_tx_broadcaster(ChannelManagerReadArgs this_ptr) {
		BroadcasterInterface ret = new BroadcasterInterface(null, bindings.ChannelManagerReadArgs_get_tx_broadcaster(this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_tx_broadcaster(ChannelManagerReadArgs this_ptr, BroadcasterInterface val) {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this_ptr.ptr & ~1, val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public Logger get_logger(ChannelManagerReadArgs this_ptr) {
		Logger ret = new Logger(null, bindings.ChannelManagerReadArgs_get_logger(this_ptr.ptr & ~1));
		ret.ptrs_to.add(this);
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_logger(ChannelManagerReadArgs this_ptr, Logger val) {
		bindings.ChannelManagerReadArgs_set_logger(this_ptr.ptr & ~1, val.ptr);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	public UserConfig get_default_config(ChannelManagerReadArgs this_ptr) {
		UserConfig ret = new UserConfig(null, bindings.ChannelManagerReadArgs_get_default_config(this_ptr.ptr & ~1));
		this.ptrs_to.add(this_ptr);
		return ret;
	}

	public void set_default_config(ChannelManagerReadArgs this_ptr, UserConfig val) {
		bindings.ChannelManagerReadArgs_set_default_config(this_ptr.ptr & ~1, val.ptr & ~1);
		this.ptrs_to.add(this_ptr);
		this.ptrs_to.add(val);
	}

	// Skipped ChannelManagerReadArgs_new
}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelManagerReadArgs extends CommonBase {
	ChannelManagerReadArgs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.ChannelManagerReadArgs_free(ptr);
	}

	public KeysInterface get_keys_manager() {
		long ret = bindings.ChannelManagerReadArgs_get_keys_manager(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_keys_manager(KeysInterface val) {
		bindings.ChannelManagerReadArgs_set_keys_manager(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public FeeEstimator get_fee_estimator() {
		long ret = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		FeeEstimator ret_hu_conv = new FeeEstimator(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fee_estimator(FeeEstimator val) {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public Watch get_chain_monitor() {
		long ret = bindings.ChannelManagerReadArgs_get_chain_monitor(this.ptr);
		Watch ret_hu_conv = new Watch(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_chain_monitor(Watch val) {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public BroadcasterInterface get_tx_broadcaster() {
		long ret = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_tx_broadcaster(BroadcasterInterface val) {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public Logger get_logger() {
		long ret = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		Logger ret_hu_conv = new Logger(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_logger(Logger val) {
		bindings.ChannelManagerReadArgs_set_logger(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public UserConfig get_default_config() {
		long ret = bindings.ChannelManagerReadArgs_get_default_config(this.ptr);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_default_config(UserConfig val) {
		bindings.ChannelManagerReadArgs_set_default_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	// Skipped ChannelManagerReadArgs_new
}

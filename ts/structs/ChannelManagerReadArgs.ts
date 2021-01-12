
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class ChannelManagerReadArgs extends CommonBase {
	ChannelManagerReadArgs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelManagerReadArgs_free(ptr); }
	}

	public KeysInterface get_keys_manager() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_keys_manager(this.ptr);
		KeysInterface ret_hu_conv = new KeysInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_keys_manager(KeysInterface val) {
		bindings.ChannelManagerReadArgs_set_keys_manager(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public FeeEstimator get_fee_estimator() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		FeeEstimator ret_hu_conv = new FeeEstimator(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_fee_estimator(FeeEstimator val) {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public Watch get_chain_monitor() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_chain_monitor(this.ptr);
		Watch ret_hu_conv = new Watch(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_chain_monitor(Watch val) {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public BroadcasterInterface get_tx_broadcaster() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_tx_broadcaster(BroadcasterInterface val) {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public Logger get_logger() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		Logger ret_hu_conv = new Logger(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public void set_logger(Logger val) {
		bindings.ChannelManagerReadArgs_set_logger(this.ptr, val == null ? 0 : val.ptr);
		this.ptrs_to.add(val);
	}

	public UserConfig get_default_config() {
		uint32_t ret = bindings.ChannelManagerReadArgs_get_default_config(this.ptr);
		UserConfig ret_hu_conv = new UserConfig(null, ret);
		return ret_hu_conv;
	}

	public void set_default_config(UserConfig val) {
		bindings.ChannelManagerReadArgs_set_default_config(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	public static ChannelManagerReadArgs constructor_new(KeysInterface keys_manager, FeeEstimator fee_estimator, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, UserConfig default_config, ChannelMonitor[] channel_monitors) {
		uint32_t ret = bindings.ChannelManagerReadArgs_new(keys_manager == null ? 0 : keys_manager.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, default_config == null ? 0 : default_config.ptr & ~1, (uint32_t[])Arrays.stream(channel_monitors).map(arr_conv_16 -> arr_conv_16 == null ? 0 : arr_conv_16.ptr & ~1).toArray());
		ChannelManagerReadArgs ret_hu_conv = new ChannelManagerReadArgs(null, ret);
		ret_hu_conv.ptrs_to.add(keys_manager);
		ret_hu_conv.ptrs_to.add(fee_estimator);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(tx_broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(default_config);
		/* TODO 2 ChannelMonitor  */;
		return ret_hu_conv;
	}

}

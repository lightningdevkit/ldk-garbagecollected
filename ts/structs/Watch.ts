
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Watch extends CommonBase {
	final bindings.LDKWatch bindings_instance;
	Watch(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Watch(bindings.LDKWatch arg) {
		super(bindings.LDKWatch_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Watch_free(ptr); } super.finalize();
	}

	public static interface WatchInterface {
		Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor);
		Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update);
		MonitorEvent[] release_pending_monitor_events();
	}
	private static class LDKWatchHolder { Watch held; }
	public static Watch new_impl(WatchInterface arg) {
		final LDKWatchHolder impl_holder = new LDKWatchHolder();
		impl_holder.held = new Watch(new bindings.LDKWatch() {
			@Override public uint32_t watch_channel(uint32_t funding_txo, uint32_t monitor) {
				OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
				ChannelMonitor monitor_hu_conv = new ChannelMonitor(null, monitor);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.watch_channel(funding_txo_hu_conv, monitor_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t update_channel(uint32_t funding_txo, uint32_t update) {
				OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
				ChannelMonitorUpdate update_hu_conv = new ChannelMonitorUpdate(null, update);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.update_channel(funding_txo_hu_conv, update_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t[] release_pending_monitor_events() {
				MonitorEvent[] ret = arg.release_pending_monitor_events();
				uint32_t[] result = (uint32_t[])Arrays.stream(ret).map(arr_conv_14 -> arr_conv_14 == null ? 0 : arr_conv_14.ptr & ~1).toArray();
				/* TODO 2 MonitorEvent  */;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor) {
		uint32_t ret = bindings.Watch_watch_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, monitor == null ? 0 : monitor.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(monitor);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update) {
		uint32_t ret = bindings.Watch_update_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, update == null ? 0 : update.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(update);
		return ret_hu_conv;
	}

	public MonitorEvent[] release_pending_monitor_events() {
		uint32_t[] ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		MonitorEvent[] arr_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			uint32_t arr_conv_14 = ret[o];
			MonitorEvent arr_conv_14_hu_conv = new MonitorEvent(null, arr_conv_14);
			arr_conv_14_arr[o] = arr_conv_14_hu_conv;
		}
		return arr_conv_14_arr;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
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
			@Override public long watch_channel(long funding_txo, long monitor) {
				OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
				funding_txo_hu_conv.ptrs_to.add(this);
				ChannelMonitor monitor_hu_conv = new ChannelMonitor(null, monitor);
				monitor_hu_conv.ptrs_to.add(this);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.watch_channel(funding_txo_hu_conv, monitor_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long update_channel(long funding_txo, long update) {
				OutPoint funding_txo_hu_conv = new OutPoint(null, funding_txo);
				funding_txo_hu_conv.ptrs_to.add(this);
				ChannelMonitorUpdate update_hu_conv = new ChannelMonitorUpdate(null, update);
				update_hu_conv.ptrs_to.add(this);
				Result_NoneChannelMonitorUpdateErrZ ret = arg.update_channel(funding_txo_hu_conv, update_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long[] release_pending_monitor_events() {
				MonitorEvent[] ret = arg.release_pending_monitor_events();
				long[] result = Arrays.stream(ret).mapToLong(arr_conv_14 -> arr_conv_14 == null ? 0 : arr_conv_14.ptr & ~1).toArray();
				/* TODO 2 MonitorEvent  */;
				return result;
			}
		});
		return impl_holder.held;
	}
	public Result_NoneChannelMonitorUpdateErrZ watch_channel(OutPoint funding_txo, ChannelMonitor monitor) {
		long ret = bindings.Watch_watch_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, monitor == null ? 0 : monitor.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(monitor);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_channel(OutPoint funding_txo, ChannelMonitorUpdate update) {
		long ret = bindings.Watch_update_channel(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, update == null ? 0 : update.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(funding_txo);
		this.ptrs_to.add(update);
		return ret_hu_conv;
	}

	public MonitorEvent[] release_pending_monitor_events() {
		long[] ret = bindings.Watch_release_pending_monitor_events(this.ptr);
		MonitorEvent[] arr_conv_14_arr = new MonitorEvent[ret.length];
		for (int o = 0; o < ret.length; o++) {
			long arr_conv_14 = ret[o];
			MonitorEvent arr_conv_14_hu_conv = new MonitorEvent(null, arr_conv_14);
			arr_conv_14_hu_conv.ptrs_to.add(this);
			arr_conv_14_arr[o] = arr_conv_14_hu_conv;
		}
		return arr_conv_14_arr;
	}

}

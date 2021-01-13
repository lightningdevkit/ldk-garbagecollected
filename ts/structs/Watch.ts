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

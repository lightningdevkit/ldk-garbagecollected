	public Result_NoneChannelMonitorUpdateErrZ persist_new_channel(OutPoint id, ChannelMonitor data) {
		uint32_t ret = bindings.Persist_persist_new_channel(this.ptr, id == null ? 0 : id.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ update_persisted_channel(OutPoint id, ChannelMonitorUpdate update, ChannelMonitor data) {
		uint32_t ret = bindings.Persist_update_persisted_channel(this.ptr, id == null ? 0 : id.ptr & ~1, update == null ? 0 : update.ptr & ~1, data == null ? 0 : data.ptr & ~1);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		this.ptrs_to.add(id);
		this.ptrs_to.add(update);
		this.ptrs_to.add(data);
		return ret_hu_conv;
	}

}

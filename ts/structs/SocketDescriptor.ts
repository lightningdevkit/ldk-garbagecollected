	public long send_data(byte[] data, boolean resume_read) {
		long ret = bindings.SocketDescriptor_send_data(this.ptr, data, resume_read);
		return ret;
	}

	public void disconnect_socket() {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
	}

	public long hash() {
		long ret = bindings.SocketDescriptor_hash(this.ptr);
		return ret;
	}

	public SocketDescriptor clone() {
		uint32_t ret = bindings.SocketDescriptor_clone(this.ptr);
		SocketDescriptor ret_hu_conv = new SocketDescriptor(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

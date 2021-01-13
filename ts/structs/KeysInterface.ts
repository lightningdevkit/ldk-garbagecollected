	public byte[] get_node_secret() {
		byte[] ret = bindings.KeysInterface_get_node_secret(this.ptr);
		return ret;
	}

	public byte[] get_destination_script() {
		byte[] ret = bindings.KeysInterface_get_destination_script(this.ptr);
		return ret;
	}

	public byte[] get_shutdown_pubkey() {
		byte[] ret = bindings.KeysInterface_get_shutdown_pubkey(this.ptr);
		return ret;
	}

	public ChannelKeys get_channel_keys(boolean inbound, long channel_value_satoshis) {
		uint32_t ret = bindings.KeysInterface_get_channel_keys(this.ptr, inbound, channel_value_satoshis);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public byte[] get_secure_random_bytes() {
		byte[] ret = bindings.KeysInterface_get_secure_random_bytes(this.ptr);
		return ret;
	}

	public Result_ChanKeySignerDecodeErrorZ read_chan_signer(byte[] reader) {
		uint32_t ret = bindings.KeysInterface_read_chan_signer(this.ptr, reader);
		Result_ChanKeySignerDecodeErrorZ ret_hu_conv = Result_ChanKeySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

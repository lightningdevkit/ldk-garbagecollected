	public Result_TxOutAccessErrorZ get_utxo(byte[] genesis_hash, long short_channel_id) {
		uint32_t ret = bindings.Access_get_utxo(this.ptr, genesis_hash, short_channel_id);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

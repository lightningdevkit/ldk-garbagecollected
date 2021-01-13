	public void register_tx(byte[] txid, byte[] script_pubkey) {
		bindings.Filter_register_tx(this.ptr, txid, script_pubkey);
	}

	public void register_output(OutPoint outpoint, byte[] script_pubkey) {
		bindings.Filter_register_output(this.ptr, outpoint == null ? 0 : outpoint.ptr & ~1, script_pubkey);
		this.ptrs_to.add(outpoint);
	}

}

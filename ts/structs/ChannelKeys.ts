	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.ChannelKeys_get_per_commitment_point(this.ptr, idx);
		return ret;
	}

	public byte[] release_commitment_secret(long idx) {
		byte[] ret = bindings.ChannelKeys_release_commitment_secret(this.ptr, idx);
		return ret;
	}

	public TwoTuple<Long, Long> key_derivation_params() {
		uint32_t ret = bindings.ChannelKeys_key_derivation_params(this.ptr);
		long ret_a = bindings.LDKC2Tuple_u64u64Z_get_a(ret);
		long ret_b = bindings.LDKC2Tuple_u64u64Z_get_b(ret);
		TwoTuple<Long, Long> ret_conv = new TwoTuple<Long, Long>(ret_a, ret_b);
		return ret_conv;
	}

	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx) {
		uint32_t ret = bindings.ChannelKeys_sign_counterparty_commitment(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_holder_commitment(HolderCommitmentTransaction commitment_tx) {
		uint32_t ret = bindings.ChannelKeys_sign_holder_commitment(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	public Result_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions(HolderCommitmentTransaction commitment_tx) {
		uint32_t ret = bindings.ChannelKeys_sign_holder_commitment_htlc_transactions(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
		uint32_t ret = bindings.ChannelKeys_sign_justice_transaction(this.ptr, justice_tx, input, amount, per_commitment_key, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
		uint32_t ret = bindings.ChannelKeys_sign_counterparty_htlc_transaction(this.ptr, htlc_tx, input, amount, per_commitment_point, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx) {
		uint32_t ret = bindings.ChannelKeys_sign_closing_transaction(this.ptr, closing_tx);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
		uint32_t ret = bindings.ChannelKeys_sign_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public void ready_channel(ChannelTransactionParameters channel_parameters) {
		bindings.ChannelKeys_ready_channel(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		this.ptrs_to.add(channel_parameters);
	}

	public byte[] write() {
		byte[] ret = bindings.ChannelKeys_write(this.ptr);
		return ret;
	}

	public ChannelPublicKeys get_pubkeys() {
		uint32_t ret = bindings.ChannelKeys_get_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public ChannelKeys clone() {
		uint32_t ret = bindings.ChannelKeys_clone(this.ptr);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

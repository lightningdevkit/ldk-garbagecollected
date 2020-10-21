package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelKeys extends CommonBase {
	ChannelKeys(Object _dummy, long ptr) { super(ptr); }
	public ChannelKeys(bindings.LDKChannelKeys arg) {
		super(bindings.LDKChannelKeys_new(arg));
		this.ptrs_to.add(arg);
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelKeys_free(ptr); super.finalize();
	}

	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.ChannelKeys_get_per_commitment_point(this.ptr, idx);
		return ret;
	}

	public byte[] release_commitment_secret(long idx) {
		byte[] ret = bindings.ChannelKeys_release_commitment_secret(this.ptr, idx);
		return ret;
	}

	// Skipped ChannelKeys_key_derivation_params
	// Skipped ChannelKeys_sign_counterparty_commitment
	public Result_SignatureNoneZ sign_holder_commitment(HolderCommitmentTransaction holder_commitment_tx) {
		long ret = bindings.ChannelKeys_sign_holder_commitment(this.ptr, holder_commitment_tx == null ? 0 : holder_commitment_tx.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(holder_commitment_tx);
		return ret_hu_conv;
	}

	public Result_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions(HolderCommitmentTransaction holder_commitment_tx) {
		long ret = bindings.ChannelKeys_sign_holder_commitment_htlc_transactions(this.ptr, holder_commitment_tx == null ? 0 : holder_commitment_tx.ptr & ~1);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(holder_commitment_tx);
		return ret_hu_conv;
	}

	// Skipped ChannelKeys_sign_justice_transaction
	// Skipped ChannelKeys_sign_counterparty_htlc_transaction
	// Skipped ChannelKeys_sign_closing_transaction
	public Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
		long ret = bindings.ChannelKeys_sign_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public void on_accept(ChannelPublicKeys channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay) {
		bindings.ChannelKeys_on_accept(this.ptr, channel_points == null ? 0 : channel_points.ptr & ~1, counterparty_selected_contest_delay, holder_selected_contest_delay);
		this.ptrs_to.add(channel_points);
	}

}

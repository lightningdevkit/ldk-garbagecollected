package org.ldk.structs;

import org.ldk.impl.bindings;

import org.ldk.enums.*;

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

	public byte[] call_get_per_commitment_point(long idx) {
		byte[] ret = bindings.ChannelKeys_call_get_per_commitment_point(this.ptr, idx);
		return ret;
	}

	public byte[] call_release_commitment_secret(long idx) {
		byte[] ret = bindings.ChannelKeys_call_release_commitment_secret(this.ptr, idx);
		return ret;
	}

	// Skipped ChannelKeys_call_key_derivation_params
	// Skipped ChannelKeys_call_sign_counterparty_commitment
	// Skipped ChannelKeys_call_sign_holder_commitment
	// Skipped ChannelKeys_call_sign_holder_commitment_htlc_transactions
	// Skipped ChannelKeys_call_sign_justice_transaction
	// Skipped ChannelKeys_call_sign_counterparty_htlc_transaction
	// Skipped ChannelKeys_call_sign_closing_transaction
	// Skipped ChannelKeys_call_sign_channel_announcement
	public void call_on_accept(ChannelPublicKeys channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay) {
		bindings.ChannelKeys_call_on_accept(this.ptr, channel_points.ptr & ~1, counterparty_selected_contest_delay, holder_selected_contest_delay);
		this.ptrs_to.add(channel_points);
	}

}

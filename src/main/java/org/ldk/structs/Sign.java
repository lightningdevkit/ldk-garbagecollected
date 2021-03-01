package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Sign extends CommonBase {
	final bindings.LDKSign bindings_instance;
	Sign(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private Sign(bindings.LDKSign arg, ChannelPublicKeys pubkeys) {
		super(bindings.LDKSign_new(arg, pubkeys == null ? 0 : pubkeys.ptr & ~1));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(pubkeys);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.Sign_free(ptr); } super.finalize();
	}

	public static interface SignInterface {
		byte[] get_per_commitment_point(long idx);
		byte[] release_commitment_secret(long idx);
		byte[] channel_keys_id();
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction commitment_tx);
		Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx);
		Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg);
		void ready_channel(ChannelTransactionParameters channel_parameters);
		byte[] write();
	}
	private static class LDKSignHolder { Sign held; }
	public static Sign new_impl(SignInterface arg, ChannelPublicKeys pubkeys) {
		final LDKSignHolder impl_holder = new LDKSignHolder();
		impl_holder.held = new Sign(new bindings.LDKSign() {
			@Override public byte[] get_per_commitment_point(long idx) {
				byte[] ret = arg.get_per_commitment_point(idx);
				return ret;
			}
			@Override public byte[] release_commitment_secret(long idx) {
				byte[] ret = arg.release_commitment_secret(idx);
				return ret;
			}
			@Override public byte[] channel_keys_id() {
				byte[] ret = arg.channel_keys_id();
				return ret;
			}
			@Override public long sign_counterparty_commitment(long commitment_tx) {
				CommitmentTransaction commitment_tx_hu_conv = new CommitmentTransaction(null, commitment_tx);
				Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_counterparty_commitment(commitment_tx_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long sign_holder_commitment_and_htlcs(long commitment_tx) {
				HolderCommitmentTransaction commitment_tx_hu_conv = new HolderCommitmentTransaction(null, commitment_tx);
				Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_holder_commitment_and_htlcs(commitment_tx_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, long htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_justice_transaction(justice_tx, input, amount, per_commitment_key, htlc_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, long htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_counterparty_htlc_transaction(htlc_tx, input, amount, per_commitment_point, htlc_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long sign_closing_transaction(byte[] closing_tx) {
				Result_SignatureNoneZ ret = arg.sign_closing_transaction(closing_tx);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public long sign_channel_announcement(long msg) {
				UnsignedChannelAnnouncement msg_hu_conv = new UnsignedChannelAnnouncement(null, msg);
				Result_SignatureNoneZ ret = arg.sign_channel_announcement(msg_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				return result;
			}
			@Override public void ready_channel(long channel_parameters) {
				ChannelTransactionParameters channel_parameters_hu_conv = new ChannelTransactionParameters(null, channel_parameters);
				arg.ready_channel(channel_parameters_hu_conv);
			}
			@Override public byte[] write() {
				byte[] ret = arg.write();
				return ret;
			}
		}, pubkeys);
		return impl_holder.held;
	}
	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.Sign_get_per_commitment_point(this.ptr, idx);
		return ret;
	}

	public byte[] release_commitment_secret(long idx) {
		byte[] ret = bindings.Sign_release_commitment_secret(this.ptr, idx);
		return ret;
	}

	public byte[] channel_keys_id() {
		byte[] ret = bindings.Sign_channel_keys_id(this.ptr);
		return ret;
	}

	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx) {
		long ret = bindings.Sign_sign_counterparty_commitment(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction commitment_tx) {
		long ret = bindings.Sign_sign_holder_commitment_and_htlcs(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
		long ret = bindings.Sign_sign_justice_transaction(this.ptr, justice_tx, input, amount, per_commitment_key, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
		long ret = bindings.Sign_sign_counterparty_htlc_transaction(this.ptr, htlc_tx, input, amount, per_commitment_point, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx) {
		long ret = bindings.Sign_sign_closing_transaction(this.ptr, closing_tx);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
		long ret = bindings.Sign_sign_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	public void ready_channel(ChannelTransactionParameters channel_parameters) {
		bindings.Sign_ready_channel(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		this.ptrs_to.add(channel_parameters);
	}

	public byte[] write() {
		byte[] ret = bindings.Sign_write(this.ptr);
		return ret;
	}

	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.Sign_get_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public Sign clone() {
		long ret = bindings.Sign_clone(this.ptr);
		Sign ret_hu_conv = new Sign(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelKeys extends CommonBase {
	final bindings.LDKChannelKeys bindings_instance;
	ChannelKeys(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChannelKeys(bindings.LDKChannelKeys arg, ChannelPublicKeys pubkeys) {
		super(bindings.LDKChannelKeys_new(arg, pubkeys == null ? 0 : pubkeys.ptr & ~1));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(pubkeys);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ChannelKeys_free(ptr); } super.finalize();
	}

	public static interface ChannelKeysInterface {
		byte[] get_per_commitment_point(long idx);
		byte[] release_commitment_secret(long idx);
		TwoTuple<Long, Long> key_derivation_params();
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(int feerate_per_kw, byte[] commitment_tx, PreCalculatedTxCreationKeys keys, HTLCOutputInCommitment[] htlcs);
		Result_SignatureNoneZ sign_holder_commitment(HolderCommitmentTransaction holder_commitment_tx);
		Result_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions(HolderCommitmentTransaction holder_commitment_tx);
		Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx);
		Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg);
		void on_accept(ChannelPublicKeys channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay);
	}
	private static class LDKChannelKeysHolder { ChannelKeys held; }
	public static ChannelKeys new_impl(ChannelKeysInterface arg, ChannelPublicKeys pubkeys) {
		final LDKChannelKeysHolder impl_holder = new LDKChannelKeysHolder();
		impl_holder.held = new ChannelKeys(new bindings.LDKChannelKeys() {
			@Override public byte[] get_per_commitment_point(long idx) {
				byte[] ret = arg.get_per_commitment_point(idx);
				return ret;
			}
			@Override public byte[] release_commitment_secret(long idx) {
				byte[] ret = arg.release_commitment_secret(idx);
				return ret;
			}
			@Override public long key_derivation_params() {
				TwoTuple<Long, Long> ret = arg.key_derivation_params();
				long result = bindings.C2Tuple_u64u64Z_new(ret.a, ret.b);
				return result;
			}
			@Override public long sign_counterparty_commitment(int feerate_per_kw, byte[] commitment_tx, long keys, long[] htlcs) {
				PreCalculatedTxCreationKeys keys_hu_conv = new PreCalculatedTxCreationKeys(null, keys);
				HTLCOutputInCommitment[] arr_conv_24_arr = new HTLCOutputInCommitment[htlcs.length];
				for (int y = 0; y < htlcs.length; y++) {
					long arr_conv_24 = htlcs[y];
					HTLCOutputInCommitment arr_conv_24_hu_conv = new HTLCOutputInCommitment(null, arr_conv_24);
					arr_conv_24_arr[y] = arr_conv_24_hu_conv;
				}
				Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_counterparty_commitment(feerate_per_kw, commitment_tx, keys_hu_conv, arr_conv_24_arr);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_holder_commitment(long holder_commitment_tx) {
				HolderCommitmentTransaction holder_commitment_tx_hu_conv = new HolderCommitmentTransaction(null, holder_commitment_tx);
				Result_SignatureNoneZ ret = arg.sign_holder_commitment(holder_commitment_tx_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_holder_commitment_htlc_transactions(long holder_commitment_tx) {
				HolderCommitmentTransaction holder_commitment_tx_hu_conv = new HolderCommitmentTransaction(null, holder_commitment_tx);
				Result_CVec_SignatureZNoneZ ret = arg.sign_holder_commitment_htlc_transactions(holder_commitment_tx_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, long htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_justice_transaction(justice_tx, input, amount, per_commitment_key, htlc_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, long htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_counterparty_htlc_transaction(htlc_tx, input, amount, per_commitment_point, htlc_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_closing_transaction(byte[] closing_tx) {
				Result_SignatureNoneZ ret = arg.sign_closing_transaction(closing_tx);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public long sign_channel_announcement(long msg) {
				UnsignedChannelAnnouncement msg_hu_conv = new UnsignedChannelAnnouncement(null, msg);
				Result_SignatureNoneZ ret = arg.sign_channel_announcement(msg_hu_conv);
				long result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public void on_accept(long channel_points, short counterparty_selected_contest_delay, short holder_selected_contest_delay) {
				ChannelPublicKeys channel_points_hu_conv = new ChannelPublicKeys(null, channel_points);
				arg.on_accept(channel_points_hu_conv, counterparty_selected_contest_delay, holder_selected_contest_delay);
			}
		}, pubkeys);
		return impl_holder.held;
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
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(int feerate_per_kw, byte[] commitment_tx, PreCalculatedTxCreationKeys keys, HTLCOutputInCommitment[] htlcs) {
		long ret = bindings.ChannelKeys_sign_counterparty_commitment(this.ptr, feerate_per_kw, commitment_tx, keys == null ? 0 : keys.ptr & ~1, Arrays.stream(htlcs).mapToLong(arr_conv_24 -> arr_conv_24 == null ? 0 : arr_conv_24.ptr & ~1).toArray());
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(keys);
		/* TODO 2 HTLCOutputInCommitment  */;
		return ret_hu_conv;
	}

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

	public Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
		long ret = bindings.ChannelKeys_sign_justice_transaction(this.ptr, justice_tx, input, amount, per_commitment_key, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
		long ret = bindings.ChannelKeys_sign_counterparty_htlc_transaction(this.ptr, htlc_tx, input, amount, per_commitment_point, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	public Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx) {
		long ret = bindings.ChannelKeys_sign_closing_transaction(this.ptr, closing_tx);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

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

	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.ChannelKeys_get_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		return ret_hu_conv;
	}

	public static ChannelKeys constructor_clone(ChannelKeys orig) {
		long ret = bindings.ChannelKeys_clone(orig == null ? 0 : orig.ptr);
		ChannelKeys ret_hu_conv = new ChannelKeys(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(orig);
		return ret_hu_conv;
	}

}

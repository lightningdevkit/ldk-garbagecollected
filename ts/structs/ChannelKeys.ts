
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx);
		Result_SignatureNoneZ sign_holder_commitment(HolderCommitmentTransaction commitment_tx);
		Result_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions(HolderCommitmentTransaction commitment_tx);
		Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc);
		Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx);
		Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg);
		void ready_channel(ChannelTransactionParameters channel_parameters);
		byte[] write();
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
			@Override public uint32_t key_derivation_params() {
				TwoTuple<Long, Long> ret = arg.key_derivation_params();
				uint32_t result = bindings.C2Tuple_u64u64Z_new(ret.a, ret.b);
				return result;
			}
			@Override public uint32_t sign_counterparty_commitment(uint32_t commitment_tx) {
				CommitmentTransaction commitment_tx_hu_conv = new CommitmentTransaction(null, commitment_tx);
				Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_counterparty_commitment(commitment_tx_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_holder_commitment(uint32_t commitment_tx) {
				HolderCommitmentTransaction commitment_tx_hu_conv = new HolderCommitmentTransaction(null, commitment_tx);
				Result_SignatureNoneZ ret = arg.sign_holder_commitment(commitment_tx_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_holder_commitment_htlc_transactions(uint32_t commitment_tx) {
				HolderCommitmentTransaction commitment_tx_hu_conv = new HolderCommitmentTransaction(null, commitment_tx);
				Result_CVec_SignatureZNoneZ ret = arg.sign_holder_commitment_htlc_transactions(commitment_tx_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, uint32_t htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_justice_transaction(justice_tx, input, amount, per_commitment_key, htlc_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, uint32_t htlc) {
				HTLCOutputInCommitment htlc_hu_conv = new HTLCOutputInCommitment(null, htlc);
				Result_SignatureNoneZ ret = arg.sign_counterparty_htlc_transaction(htlc_tx, input, amount, per_commitment_point, htlc_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_closing_transaction(byte[] closing_tx) {
				Result_SignatureNoneZ ret = arg.sign_closing_transaction(closing_tx);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public uint32_t sign_channel_announcement(uint32_t msg) {
				UnsignedChannelAnnouncement msg_hu_conv = new UnsignedChannelAnnouncement(null, msg);
				Result_SignatureNoneZ ret = arg.sign_channel_announcement(msg_hu_conv);
				uint32_t result = ret != null ? ret.ptr : 0;
				ret.ptr = 0;
				return result;
			}
			@Override public void ready_channel(uint32_t channel_parameters) {
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

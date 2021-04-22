package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

/**
 * A trait to sign lightning channel transactions as described in BOLT 3.
 * 
 * Signing services could be implemented on a hardware wallet. In this case,
 * the current Sign would be a front-end on top of a communication
 * channel connected to your secure device and lightning key material wouldn't
 * reside on a hot server. Nevertheless, a this deployment would still need
 * to trust the ChannelManager to avoid loss of funds as this latest component
 * could ask to sign commitment transaction with HTLCs paying to attacker pubkeys.
 * 
 * A more secure iteration would be to use hashlock (or payment points) to pair
 * invoice/incoming HTLCs with outgoing HTLCs to implement a no-trust-ChannelManager
 * at the price of more state and computation on the hardware wallet side. In the future,
 * we are looking forward to design such interface.
 * 
 * In any case, ChannelMonitor or fallback watchtowers are always going to be trusted
 * to act, as liveness and breach reply correctness are always going to be hard requirements
 * of LN security model, orthogonal of key management issues.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BaseSign extends CommonBase {
	final bindings.LDKBaseSign bindings_instance;
	BaseSign(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private BaseSign(bindings.LDKBaseSign arg, ChannelPublicKeys pubkeys) {
		super(bindings.LDKBaseSign_new(arg, pubkeys == null ? 0 : pubkeys.ptr & ~1));
		this.ptrs_to.add(arg);
		this.ptrs_to.add(pubkeys);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.BaseSign_free(ptr); } super.finalize();
	}

	public static interface BaseSignInterface {
		/**
		 * Gets the per-commitment point for a specific commitment number
		 * 
		 * Note that the commitment number starts at (1 << 48) - 1 and counts backwards.
		 */
		byte[] get_per_commitment_point(long idx);
		/**
		 * Gets the commitment secret for a specific commitment number as part of the revocation process
		 * 
		 * An external signer implementation should error here if the commitment was already signed
		 * and should refuse to sign it in the future.
		 * 
		 * May be called more than once for the same index.
		 * 
		 * Note that the commitment number starts at (1 << 48) - 1 and counts backwards.
		 */
		byte[] release_commitment_secret(long idx);
		/**
		 * Gets an arbitrary identifier describing the set of keys which are provided back to you in
		 * some SpendableOutputDescriptor types. This should be sufficient to identify this
		 * Sign object uniquely and lookup or re-derive its keys.
		 */
		byte[] channel_keys_id();
		/**
		 * Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
		 * 
		 * Note that if signing fails or is rejected, the channel will be force-closed.
		 */
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx);
		/**
		 * Create a signatures for a holder's commitment transaction and its claiming HTLC transactions.
		 * This will only ever be called with a non-revoked commitment_tx.  This will be called with the
		 * latest commitment_tx when we initiate a force-close.
		 * This will be called with the previous latest, just to get claiming HTLC signatures, if we are
		 * reacting to a ChannelMonitor replica that decided to broadcast before it had been updated to
		 * the latest.
		 * This may be called multiple times for the same transaction.
		 * 
		 * An external signer implementation should check that the commitment has not been revoked.
		 * 
		 * May return Err if key derivation fails.  Callers, such as ChannelMonitor, will panic in such a case.
		 */
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction commitment_tx);
		/**
		 * Create a signature for the given input in a transaction spending an HTLC or commitment
		 * transaction output when our counterparty broadcasts an old state.
		 * 
		 * A justice transaction may claim multiples outputs at the same time if timelocks are
		 * similar, but only a signature for the input at index `input` should be signed for here.
		 * It may be called multiples time for same output(s) if a fee-bump is needed with regards
		 * to an upcoming timelock expiration.
		 * 
		 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
		 * 
		 * per_commitment_key is revocation secret which was provided by our counterparty when they
		 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
		 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
		 * so).
		 * 
		 * htlc holds HTLC elements (hash, timelock) if the output being spent is a HTLC output, thus
		 * changing the format of the witness script (which is committed to in the BIP 143
		 * signatures).
		 */
		Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc);
		/**
		 * Create a signature for a claiming transaction for a HTLC output on a counterparty's commitment
		 * transaction, either offered or received.
		 * 
		 * Such a transaction may claim multiples offered outputs at same time if we know the
		 * preimage for each when we create it, but only the input at index `input` should be
		 * signed for here. It may be called multiple times for same output(s) if a fee-bump is
		 * needed with regards to an upcoming timelock expiration.
		 * 
		 * Witness_script is either a offered or received script as defined in BOLT3 for HTLC
		 * outputs.
		 * 
		 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
		 * 
		 * Per_commitment_point is the dynamic point corresponding to the channel state
		 * detected onchain. It has been generated by our counterparty and is used to derive
		 * channel state keys, which are then included in the witness script and committed to in the
		 * BIP 143 signature.
		 */
		Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc);
		/**
		 * Create a signature for a (proposed) closing transaction.
		 * 
		 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
		 * chosen to forgo their output as dust.
		 */
		Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx);
		/**
		 * Signs a channel announcement message with our funding key, proving it comes from one
		 * of the channel participants.
		 * 
		 * Note that if this fails or is rejected, the channel will not be publicly announced and
		 * our counterparty may (though likely will not) close the channel on us for violating the
		 * protocol.
		 */
		Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg);
		/**
		 * Set the counterparty static channel data, including basepoints,
		 * counterparty_selected/holder_selected_contest_delay and funding outpoint.
		 * This is done as soon as the funding outpoint is known.  Since these are static channel data,
		 * they MUST NOT be allowed to change to different values once set.
		 * 
		 * channel_parameters.is_populated() MUST be true.
		 * 
		 * We bind holder_selected_contest_delay late here for API convenience.
		 * 
		 * Will be called before any signatures are applied.
		 */
		void ready_channel(ChannelTransactionParameters channel_parameters);
	}
	private static class LDKBaseSignHolder { BaseSign held; }
	public static BaseSign new_impl(BaseSignInterface arg, ChannelPublicKeys pubkeys) {
		final LDKBaseSignHolder impl_holder = new LDKBaseSignHolder();
		impl_holder.held = new BaseSign(new bindings.LDKBaseSign() {
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
		}, pubkeys);
		return impl_holder.held;
	}
	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at (1 << 48) - 1 and counts backwards.
	 */
	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.BaseSign_get_per_commitment_point(this.ptr, idx);
		return ret;
	}

	/**
	 * Gets the commitment secret for a specific commitment number as part of the revocation process
	 * 
	 * An external signer implementation should error here if the commitment was already signed
	 * and should refuse to sign it in the future.
	 * 
	 * May be called more than once for the same index.
	 * 
	 * Note that the commitment number starts at (1 << 48) - 1 and counts backwards.
	 */
	public byte[] release_commitment_secret(long idx) {
		byte[] ret = bindings.BaseSign_release_commitment_secret(this.ptr, idx);
		return ret;
	}

	/**
	 * Gets an arbitrary identifier describing the set of keys which are provided back to you in
	 * some SpendableOutputDescriptor types. This should be sufficient to identify this
	 * Sign object uniquely and lookup or re-derive its keys.
	 */
	public byte[] channel_keys_id() {
		byte[] ret = bindings.BaseSign_channel_keys_id(this.ptr);
		return ret;
	}

	/**
	 * Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
	 * 
	 * Note that if signing fails or is rejected, the channel will be force-closed.
	 */
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction commitment_tx) {
		long ret = bindings.BaseSign_sign_counterparty_commitment(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	/**
	 * Create a signatures for a holder's commitment transaction and its claiming HTLC transactions.
	 * This will only ever be called with a non-revoked commitment_tx.  This will be called with the
	 * latest commitment_tx when we initiate a force-close.
	 * This will be called with the previous latest, just to get claiming HTLC signatures, if we are
	 * reacting to a ChannelMonitor replica that decided to broadcast before it had been updated to
	 * the latest.
	 * This may be called multiple times for the same transaction.
	 * 
	 * An external signer implementation should check that the commitment has not been revoked.
	 * 
	 * May return Err if key derivation fails.  Callers, such as ChannelMonitor, will panic in such a case.
	 */
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction commitment_tx) {
		long ret = bindings.BaseSign_sign_holder_commitment_and_htlcs(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr & ~1);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(commitment_tx);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for the given input in a transaction spending an HTLC or commitment
	 * transaction output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiples outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiples time for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * per_commitment_key is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
	 * so).
	 * 
	 * htlc holds HTLC elements (hash, timelock) if the output being spent is a HTLC output, thus
	 * changing the format of the witness script (which is committed to in the BIP 143
	 * signatures).
	 */
	public Result_SignatureNoneZ sign_justice_transaction(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, HTLCOutputInCommitment htlc) {
		long ret = bindings.BaseSign_sign_justice_transaction(this.ptr, justice_tx, input, amount, per_commitment_key, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for a claiming transaction for a HTLC output on a counterparty's commitment
	 * transaction, either offered or received.
	 * 
	 * Such a transaction may claim multiples offered outputs at same time if we know the
	 * preimage for each when we create it, but only the input at index `input` should be
	 * signed for here. It may be called multiple times for same output(s) if a fee-bump is
	 * needed with regards to an upcoming timelock expiration.
	 * 
	 * Witness_script is either a offered or received script as defined in BOLT3 for HTLC
	 * outputs.
	 * 
	 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * Per_commitment_point is the dynamic point corresponding to the channel state
	 * detected onchain. It has been generated by our counterparty and is used to derive
	 * channel state keys, which are then included in the witness script and committed to in the
	 * BIP 143 signature.
	 */
	public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, HTLCOutputInCommitment htlc) {
		long ret = bindings.BaseSign_sign_counterparty_htlc_transaction(this.ptr, htlc_tx, input, amount, per_commitment_point, htlc == null ? 0 : htlc.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(htlc);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for a (proposed) closing transaction.
	 * 
	 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
	 * chosen to forgo their output as dust.
	 */
	public Result_SignatureNoneZ sign_closing_transaction(byte[] closing_tx) {
		long ret = bindings.BaseSign_sign_closing_transaction(this.ptr, closing_tx);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs a channel announcement message with our funding key, proving it comes from one
	 * of the channel participants.
	 * 
	 * Note that if this fails or is rejected, the channel will not be publicly announced and
	 * our counterparty may (though likely will not) close the channel on us for violating the
	 * protocol.
	 */
	public Result_SignatureNoneZ sign_channel_announcement(UnsignedChannelAnnouncement msg) {
		long ret = bindings.BaseSign_sign_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr & ~1);
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		this.ptrs_to.add(msg);
		return ret_hu_conv;
	}

	/**
	 * Set the counterparty static channel data, including basepoints,
	 * counterparty_selected/holder_selected_contest_delay and funding outpoint.
	 * This is done as soon as the funding outpoint is known.  Since these are static channel data,
	 * they MUST NOT be allowed to change to different values once set.
	 * 
	 * channel_parameters.is_populated() MUST be true.
	 * 
	 * We bind holder_selected_contest_delay late here for API convenience.
	 * 
	 * Will be called before any signatures are applied.
	 */
	public void ready_channel(ChannelTransactionParameters channel_parameters) {
		bindings.BaseSign_ready_channel(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr & ~1);
		this.ptrs_to.add(channel_parameters);
	}

	/**
	 * Frees any resources associated with this object given its this_arg pointer.
	 * Does not need to free the outer struct containing function pointers and may be NULL is no resources need to be freed.
	 */
	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.BaseSign_get_pubkeys(this.ptr);
		ChannelPublicKeys ret_hu_conv = new ChannelPublicKeys(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

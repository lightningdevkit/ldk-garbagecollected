using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait to sign Lightning channel transactions as described in
 * [BOLT 3](https://github.com/lightning/bolts/blob/master/03-transactions.md).
 * 
 * Signing services could be implemented on a hardware wallet and should implement signing
 * policies in order to be secure. Please refer to the [VLS Policy
 * Controls](https://gitlab.com/lightning-signer/validating-lightning-signer/-/blob/main/docs/policy-controls.md)
 * for an example of such policies.
 */
public class BaseSign : CommonBase {
	internal readonly bindings.LDKBaseSign bindings_instance;
	internal BaseSign(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private BaseSign(bindings.LDKBaseSign arg, ChannelPublicKeys pubkeys) : base(bindings.LDKBaseSign_new(arg, pubkeys == null ? 0 : pubkeys.clone_ptr())) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~BaseSign() {
		if (ptr != 0) { bindings.BaseSign_free(ptr); }
	}

	public interface BaseSignInterface {
		/**
		 * Gets the per-commitment point for a specific commitment number
		 * 
		 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
		 */
		byte[] get_per_commitment_point(long _idx);
		/**
		 * Gets the commitment secret for a specific commitment number as part of the revocation process
		 * 
		 * An external signer implementation should error here if the commitment was already signed
		 * and should refuse to sign it in the future.
		 * 
		 * May be called more than once for the same index.
		 * 
		 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
		 */
		byte[] release_commitment_secret(long _idx);
		/**
		 * Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
		 * 
		 * This is required in order for the signer to make sure that releasing a commitment
		 * secret won't leave us without a broadcastable holder transaction.
		 * Policy checks should be implemented in this function, including checking the amount
		 * sent to us and checking the HTLCs.
		 * 
		 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
		 * A validating signer should ensure that an HTLC output is removed only when the matching
		 * preimage is provided, or when the value to holder is restored.
		 * 
		 * Note that all the relevant preimages will be provided, but there may also be additional
		 * irrelevant or duplicate preimages.
		 */
		Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction _holder_tx, byte[][] _preimages);
		/**
		 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
		 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
		 * [`BaseSign`] object uniquely and lookup or re-derive its keys.
		 */
		byte[] channel_keys_id();
		/**
		 * Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
		 * 
		 * Note that if signing fails or is rejected, the channel will be force-closed.
		 * 
		 * Policy checks should be implemented in this function, including checking the amount
		 * sent to us and checking the HTLCs.
		 * 
		 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
		 * A validating signer should ensure that an HTLC output is removed only when the matching
		 * preimage is provided, or when the value to holder is restored.
		 * 
		 * Note that all the relevant preimages will be provided, but there may also be additional
		 * irrelevant or duplicate preimages.
		 */
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(CommitmentTransaction _commitment_tx, byte[][] _preimages);
		/**
		 * Validate the counterparty's revocation.
		 * 
		 * This is required in order for the signer to make sure that the state has moved
		 * forward and it is safe to sign the next counterparty commitment.
		 */
		Result_NoneNoneZ validate_counterparty_revocation(long _idx, byte[] _secret);
		/**
		 * Creates a signature for a holder's commitment transaction and its claiming HTLC transactions.
		 * 
		 * This will be called
		 * - with a non-revoked `commitment_tx`.
		 * - with the latest `commitment_tx` when we initiate a force-close.
		 * - with the previous `commitment_tx`, just to get claiming HTLC
		 * signatures, if we are reacting to a [`ChannelMonitor`]
		 * [replica](https://github.com/lightningdevkit/rust-lightning/blob/main/GLOSSARY.md#monitor-replicas)
		 * that decided to broadcast before it had been updated to the latest `commitment_tx`.
		 * 
		 * This may be called multiple times for the same transaction.
		 * 
		 * An external signer implementation should check that the commitment has not been revoked.
		 * 
		 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
		 */
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(HolderCommitmentTransaction _commitment_tx);
		/**
		 * Create a signature for the given input in a transaction spending an HTLC transaction output
		 * or a commitment transaction `to_local` output when our counterparty broadcasts an old state.
		 * 
		 * A justice transaction may claim multiple outputs at the same time if timelocks are
		 * similar, but only a signature for the input at index `input` should be signed for here.
		 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
		 * to an upcoming timelock expiration.
		 * 
		 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
		 * 
		 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
		 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
		 * not allow the spending of any funds by itself (you need our holder `revocation_secret` to do
		 * so).
		 */
		Result_SignatureNoneZ sign_justice_revoked_output(byte[] _justice_tx, long _input, long _amount, byte[] _per_commitment_key);
		/**
		 * Create a signature for the given input in a transaction spending a commitment transaction
		 * HTLC output when our counterparty broadcasts an old state.
		 * 
		 * A justice transaction may claim multiple outputs at the same time if timelocks are
		 * similar, but only a signature for the input at index `input` should be signed for here.
		 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
		 * to an upcoming timelock expiration.
		 * 
		 * `amount` is the value of the output spent by this input, committed to in the BIP 143
		 * signature.
		 * 
		 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
		 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
		 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
		 * so).
		 * 
		 * `htlc` holds HTLC elements (hash, timelock), thus changing the format of the witness script
		 * (which is committed to in the BIP 143 signatures).
		 */
		Result_SignatureNoneZ sign_justice_revoked_htlc(byte[] _justice_tx, long _input, long _amount, byte[] _per_commitment_key, HTLCOutputInCommitment _htlc);
		/**
		 * Create a signature for a claiming transaction for a HTLC output on a counterparty's commitment
		 * transaction, either offered or received.
		 * 
		 * Such a transaction may claim multiples offered outputs at same time if we know the
		 * preimage for each when we create it, but only the input at index `input` should be
		 * signed for here. It may be called multiple times for same output(s) if a fee-bump is
		 * needed with regards to an upcoming timelock expiration.
		 * 
		 * `witness_script` is either an offered or received script as defined in BOLT3 for HTLC
		 * outputs.
		 * 
		 * `amount` is value of the output spent by this input, committed to in the BIP 143 signature.
		 * 
		 * `per_commitment_point` is the dynamic point corresponding to the channel state
		 * detected onchain. It has been generated by our counterparty and is used to derive
		 * channel state keys, which are then included in the witness script and committed to in the
		 * BIP 143 signature.
		 */
		Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] _htlc_tx, long _input, long _amount, byte[] _per_commitment_point, HTLCOutputInCommitment _htlc);
		/**
		 * Create a signature for a (proposed) closing transaction.
		 * 
		 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
		 * chosen to forgo their output as dust.
		 */
		Result_SignatureNoneZ sign_closing_transaction(ClosingTransaction _closing_tx);
		/**
		 * Computes the signature for a commitment transaction's anchor output used as an
		 * input within `anchor_tx`, which spends the commitment transaction, at index `input`.
		 */
		Result_SignatureNoneZ sign_holder_anchor_input(byte[] _anchor_tx, long _input);
		/**
		 * Signs a channel announcement message with our funding key and our node secret key (aka
		 * node_id or network_key), proving it comes from one of the channel participants.
		 * 
		 * The first returned signature should be from our node secret key, the second from our
		 * funding key.
		 * 
		 * Note that if this fails or is rejected, the channel will not be publicly announced and
		 * our counterparty may (though likely will not) close the channel on us for violating the
		 * protocol.
		 */
		Result_C2Tuple_SignatureSignatureZNoneZ sign_channel_announcement(UnsignedChannelAnnouncement _msg);
		/**
		 * Set the counterparty static channel data, including basepoints,
		 * `counterparty_selected`/`holder_selected_contest_delay` and funding outpoint. Since these
		 * are static channel data, they MUST NOT be allowed to change to different values once set,
		 * as LDK may call this method more than once.
		 * 
		 * channel_parameters.is_populated() MUST be true.
		 */
		void provide_channel_parameters(ChannelTransactionParameters _channel_parameters);
	}
	private class LDKBaseSignHolder { internal BaseSign held; }
	private class LDKBaseSignImpl : bindings.LDKBaseSign {
		internal LDKBaseSignImpl(BaseSignInterface arg, LDKBaseSignHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private BaseSignInterface arg;
		private LDKBaseSignHolder impl_holder;
		public byte[] get_per_commitment_point(long _idx) {
			byte[] ret = arg.get_per_commitment_point(_idx);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 33);
			return result;
		}
		public byte[] release_commitment_secret(long _idx) {
			byte[] ret = arg.release_commitment_secret(_idx);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long validate_holder_commitment(long _holder_tx, byte[][] _preimages) {
			org.ldk.structs.HolderCommitmentTransaction _holder_tx_hu_conv = null; if (_holder_tx < 0 || _holder_tx > 4096) { _holder_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, _holder_tx); }
			Result_NoneNoneZ ret = arg.validate_holder_commitment(_holder_tx_hu_conv, _preimages);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public byte[] channel_keys_id() {
			byte[] ret = arg.channel_keys_id();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long sign_counterparty_commitment(long _commitment_tx, byte[][] _preimages) {
			org.ldk.structs.CommitmentTransaction _commitment_tx_hu_conv = null; if (_commitment_tx < 0 || _commitment_tx > 4096) { _commitment_tx_hu_conv = new org.ldk.structs.CommitmentTransaction(null, _commitment_tx); }
			Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_counterparty_commitment(_commitment_tx_hu_conv, _preimages);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long validate_counterparty_revocation(long _idx, byte[] _secret) {
			Result_NoneNoneZ ret = arg.validate_counterparty_revocation(_idx, _secret);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_holder_commitment_and_htlcs(long _commitment_tx) {
			org.ldk.structs.HolderCommitmentTransaction _commitment_tx_hu_conv = null; if (_commitment_tx < 0 || _commitment_tx > 4096) { _commitment_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, _commitment_tx); }
			Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret = arg.sign_holder_commitment_and_htlcs(_commitment_tx_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_justice_revoked_output(byte[] _justice_tx, long _input, long _amount, byte[] _per_commitment_key) {
			Result_SignatureNoneZ ret = arg.sign_justice_revoked_output(_justice_tx, _input, _amount, _per_commitment_key);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_justice_revoked_htlc(byte[] _justice_tx, long _input, long _amount, byte[] _per_commitment_key, long _htlc) {
			org.ldk.structs.HTLCOutputInCommitment _htlc_hu_conv = null; if (_htlc < 0 || _htlc > 4096) { _htlc_hu_conv = new org.ldk.structs.HTLCOutputInCommitment(null, _htlc); }
			Result_SignatureNoneZ ret = arg.sign_justice_revoked_htlc(_justice_tx, _input, _amount, _per_commitment_key, _htlc_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_counterparty_htlc_transaction(byte[] _htlc_tx, long _input, long _amount, byte[] _per_commitment_point, long _htlc) {
			org.ldk.structs.HTLCOutputInCommitment _htlc_hu_conv = null; if (_htlc < 0 || _htlc > 4096) { _htlc_hu_conv = new org.ldk.structs.HTLCOutputInCommitment(null, _htlc); }
			Result_SignatureNoneZ ret = arg.sign_counterparty_htlc_transaction(_htlc_tx, _input, _amount, _per_commitment_point, _htlc_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_closing_transaction(long _closing_tx) {
			org.ldk.structs.ClosingTransaction _closing_tx_hu_conv = null; if (_closing_tx < 0 || _closing_tx > 4096) { _closing_tx_hu_conv = new org.ldk.structs.ClosingTransaction(null, _closing_tx); }
			Result_SignatureNoneZ ret = arg.sign_closing_transaction(_closing_tx_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_holder_anchor_input(byte[] _anchor_tx, long _input) {
			Result_SignatureNoneZ ret = arg.sign_holder_anchor_input(_anchor_tx, _input);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long sign_channel_announcement(long _msg) {
			org.ldk.structs.UnsignedChannelAnnouncement _msg_hu_conv = null; if (_msg < 0 || _msg > 4096) { _msg_hu_conv = new org.ldk.structs.UnsignedChannelAnnouncement(null, _msg); }
			Result_C2Tuple_SignatureSignatureZNoneZ ret = arg.sign_channel_announcement(_msg_hu_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public void provide_channel_parameters(long _channel_parameters) {
			org.ldk.structs.ChannelTransactionParameters _channel_parameters_hu_conv = null; if (_channel_parameters < 0 || _channel_parameters > 4096) { _channel_parameters_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, _channel_parameters); }
			arg.provide_channel_parameters(_channel_parameters_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static BaseSign new_impl(BaseSignInterface arg, ChannelPublicKeys pubkeys) {
		LDKBaseSignHolder impl_holder = new LDKBaseSignHolder();
		impl_holder.held = new BaseSign(new LDKBaseSignImpl(arg, impl_holder), pubkeys);
		return impl_holder.held;
	}
	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.BaseSign_get_per_commitment_point(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
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
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	public byte[] release_commitment_secret(long idx) {
		byte[] ret = bindings.BaseSign_release_commitment_secret(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		return ret;
	}

	/**
	 * Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
	 * 
	 * This is required in order for the signer to make sure that releasing a commitment
	 * secret won't leave us without a broadcastable holder transaction.
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 */
	public Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] preimages) {
		long ret = bindings.BaseSign_validate_holder_commitment(this.ptr, holder_tx == null ? 0 : holder_tx.ptr, preimages != null ? InternalUtils.mapArray(preimages, preimages_conv_8 => InternalUtils.check_arr_len(preimages_conv_8, 32)) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(holder_tx);
		GC.KeepAlive(preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(holder_tx); };
		return ret_hu_conv;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`BaseSign`] object uniquely and lookup or re-derive its keys.
	 */
	public byte[] channel_keys_id() {
		byte[] ret = bindings.BaseSign_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
	 * 
	 * Note that if signing fails or is rejected, the channel will be force-closed.
	 * 
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 */
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment(org.ldk.structs.CommitmentTransaction commitment_tx, byte[][] preimages) {
		long ret = bindings.BaseSign_sign_counterparty_commitment(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr, preimages != null ? InternalUtils.mapArray(preimages, preimages_conv_8 => InternalUtils.check_arr_len(preimages_conv_8, 32)) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(commitment_tx);
		GC.KeepAlive(preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(commitment_tx); };
		return ret_hu_conv;
	}

	/**
	 * Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 */
	public Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
		long ret = bindings.BaseSign_validate_counterparty_revocation(this.ptr, idx, InternalUtils.check_arr_len(secret, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		GC.KeepAlive(secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a signature for a holder's commitment transaction and its claiming HTLC transactions.
	 * 
	 * This will be called
	 * - with a non-revoked `commitment_tx`.
	 * - with the latest `commitment_tx` when we initiate a force-close.
	 * - with the previous `commitment_tx`, just to get claiming HTLC
	 * signatures, if we are reacting to a [`ChannelMonitor`]
	 * [replica](https://github.com/lightningdevkit/rust-lightning/blob/main/GLOSSARY.md#monitor-replicas)
	 * that decided to broadcast before it had been updated to the latest `commitment_tx`.
	 * 
	 * This may be called multiple times for the same transaction.
	 * 
	 * An external signer implementation should check that the commitment has not been revoked.
	 * 
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 */
	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_holder_commitment_and_htlcs(org.ldk.structs.HolderCommitmentTransaction commitment_tx) {
		long ret = bindings.BaseSign_sign_holder_commitment_and_htlcs(this.ptr, commitment_tx == null ? 0 : commitment_tx.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(commitment_tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(commitment_tx); };
		return ret_hu_conv;
	}

	/**
	 * Create a signature for the given input in a transaction spending an HTLC transaction output
	 * or a commitment transaction `to_local` output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder `revocation_secret` to do
	 * so).
	 */
	public Result_SignatureNoneZ sign_justice_revoked_output(byte[] justice_tx, long input, long amount, byte[] per_commitment_key) {
		long ret = bindings.BaseSign_sign_justice_revoked_output(this.ptr, justice_tx, input, amount, InternalUtils.check_arr_len(per_commitment_key, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(justice_tx);
		GC.KeepAlive(input);
		GC.KeepAlive(amount);
		GC.KeepAlive(per_commitment_key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for the given input in a transaction spending a commitment transaction
	 * HTLC output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * `amount` is the value of the output spent by this input, committed to in the BIP 143
	 * signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
	 * so).
	 * 
	 * `htlc` holds HTLC elements (hash, timelock), thus changing the format of the witness script
	 * (which is committed to in the BIP 143 signatures).
	 */
	public Result_SignatureNoneZ sign_justice_revoked_htlc(byte[] justice_tx, long input, long amount, byte[] per_commitment_key, org.ldk.structs.HTLCOutputInCommitment htlc) {
		long ret = bindings.BaseSign_sign_justice_revoked_htlc(this.ptr, justice_tx, input, amount, InternalUtils.check_arr_len(per_commitment_key, 32), htlc == null ? 0 : htlc.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(justice_tx);
		GC.KeepAlive(input);
		GC.KeepAlive(amount);
		GC.KeepAlive(per_commitment_key);
		GC.KeepAlive(htlc);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(htlc); };
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
	 * `witness_script` is either an offered or received script as defined in BOLT3 for HTLC
	 * outputs.
	 * 
	 * `amount` is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_point` is the dynamic point corresponding to the channel state
	 * detected onchain. It has been generated by our counterparty and is used to derive
	 * channel state keys, which are then included in the witness script and committed to in the
	 * BIP 143 signature.
	 */
	public Result_SignatureNoneZ sign_counterparty_htlc_transaction(byte[] htlc_tx, long input, long amount, byte[] per_commitment_point, org.ldk.structs.HTLCOutputInCommitment htlc) {
		long ret = bindings.BaseSign_sign_counterparty_htlc_transaction(this.ptr, htlc_tx, input, amount, InternalUtils.check_arr_len(per_commitment_point, 33), htlc == null ? 0 : htlc.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(htlc_tx);
		GC.KeepAlive(input);
		GC.KeepAlive(amount);
		GC.KeepAlive(per_commitment_point);
		GC.KeepAlive(htlc);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(htlc); };
		return ret_hu_conv;
	}

	/**
	 * Create a signature for a (proposed) closing transaction.
	 * 
	 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
	 * chosen to forgo their output as dust.
	 */
	public Result_SignatureNoneZ sign_closing_transaction(org.ldk.structs.ClosingTransaction closing_tx) {
		long ret = bindings.BaseSign_sign_closing_transaction(this.ptr, closing_tx == null ? 0 : closing_tx.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(closing_tx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(closing_tx); };
		return ret_hu_conv;
	}

	/**
	 * Computes the signature for a commitment transaction's anchor output used as an
	 * input within `anchor_tx`, which spends the commitment transaction, at index `input`.
	 */
	public Result_SignatureNoneZ sign_holder_anchor_input(byte[] anchor_tx, long input) {
		long ret = bindings.BaseSign_sign_holder_anchor_input(this.ptr, anchor_tx, input);
		GC.KeepAlive(this);
		GC.KeepAlive(anchor_tx);
		GC.KeepAlive(input);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs a channel announcement message with our funding key and our node secret key (aka
	 * node_id or network_key), proving it comes from one of the channel participants.
	 * 
	 * The first returned signature should be from our node secret key, the second from our
	 * funding key.
	 * 
	 * Note that if this fails or is rejected, the channel will not be publicly announced and
	 * our counterparty may (though likely will not) close the channel on us for violating the
	 * protocol.
	 */
	public Result_C2Tuple_SignatureSignatureZNoneZ sign_channel_announcement(org.ldk.structs.UnsignedChannelAnnouncement msg) {
		long ret = bindings.BaseSign_sign_channel_announcement(this.ptr, msg == null ? 0 : msg.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_SignatureSignatureZNoneZ ret_hu_conv = Result_C2Tuple_SignatureSignatureZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Set the counterparty static channel data, including basepoints,
	 * `counterparty_selected`/`holder_selected_contest_delay` and funding outpoint. Since these
	 * are static channel data, they MUST NOT be allowed to change to different values once set,
	 * as LDK may call this method more than once.
	 * 
	 * channel_parameters.is_populated() MUST be true.
	 */
	public void provide_channel_parameters(org.ldk.structs.ChannelTransactionParameters channel_parameters) {
		bindings.BaseSign_provide_channel_parameters(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_parameters);
		if (this != null) { this.ptrs_to.AddLast(channel_parameters); };
	}

	/**
	 * Frees any resources associated with this object given its this_arg pointer.
	 * Does not need to free the outer struct containing function pointers and may be NULL is no resources need to be freed.
	 */
	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.BaseSign_get_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

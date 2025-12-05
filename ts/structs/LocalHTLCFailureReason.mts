
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The reason that a HTLC was failed by the local node. These errors either represent direct,
 * human-readable mappings of BOLT04 error codes or provide additional information that would
 * otherwise be erased by the BOLT04 error code.
 * 
 * For example:
 * [`Self::FeeInsufficient`] is a direct representation of its underlying BOLT04 error code.
 * [`Self::PrivateChannelForward`] provides additional information that is not provided by its
 * BOLT04 error code.
 */
export class LocalHTLCFailureReason extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.LocalHTLCFailureReason_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): LocalHTLCFailureReason {
		const raw_ty: number = bindings.LDKLocalHTLCFailureReason_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new LocalHTLCFailureReason_TemporaryNodeFailure(ptr);
			case 1: return new LocalHTLCFailureReason_PermanentNodeFailure(ptr);
			case 2: return new LocalHTLCFailureReason_RequiredNodeFeature(ptr);
			case 3: return new LocalHTLCFailureReason_InvalidOnionVersion(ptr);
			case 4: return new LocalHTLCFailureReason_InvalidOnionHMAC(ptr);
			case 5: return new LocalHTLCFailureReason_InvalidOnionKey(ptr);
			case 6: return new LocalHTLCFailureReason_TemporaryChannelFailure(ptr);
			case 7: return new LocalHTLCFailureReason_PermanentChannelFailure(ptr);
			case 8: return new LocalHTLCFailureReason_RequiredChannelFeature(ptr);
			case 9: return new LocalHTLCFailureReason_UnknownNextPeer(ptr);
			case 10: return new LocalHTLCFailureReason_AmountBelowMinimum(ptr);
			case 11: return new LocalHTLCFailureReason_FeeInsufficient(ptr);
			case 12: return new LocalHTLCFailureReason_IncorrectCLTVExpiry(ptr);
			case 13: return new LocalHTLCFailureReason_CLTVExpiryTooSoon(ptr);
			case 14: return new LocalHTLCFailureReason_IncorrectPaymentDetails(ptr);
			case 15: return new LocalHTLCFailureReason_FinalIncorrectCLTVExpiry(ptr);
			case 16: return new LocalHTLCFailureReason_FinalIncorrectHTLCAmount(ptr);
			case 17: return new LocalHTLCFailureReason_ChannelDisabled(ptr);
			case 18: return new LocalHTLCFailureReason_CLTVExpiryTooFar(ptr);
			case 19: return new LocalHTLCFailureReason_InvalidOnionPayload(ptr);
			case 20: return new LocalHTLCFailureReason_MPPTimeout(ptr);
			case 21: return new LocalHTLCFailureReason_InvalidOnionBlinding(ptr);
			case 22: return new LocalHTLCFailureReason_UnknownFailureCode(ptr);
			case 23: return new LocalHTLCFailureReason_ForwardExpiryBuffer(ptr);
			case 24: return new LocalHTLCFailureReason_InvalidTrampolineForward(ptr);
			case 25: return new LocalHTLCFailureReason_PaymentClaimBuffer(ptr);
			case 26: return new LocalHTLCFailureReason_DustLimitHolder(ptr);
			case 27: return new LocalHTLCFailureReason_DustLimitCounterparty(ptr);
			case 28: return new LocalHTLCFailureReason_FeeSpikeBuffer(ptr);
			case 29: return new LocalHTLCFailureReason_PrivateChannelForward(ptr);
			case 30: return new LocalHTLCFailureReason_RealSCIDForward(ptr);
			case 31: return new LocalHTLCFailureReason_ChannelNotReady(ptr);
			case 32: return new LocalHTLCFailureReason_InvalidKeysendPreimage(ptr);
			case 33: return new LocalHTLCFailureReason_InvalidTrampolinePayload(ptr);
			case 34: return new LocalHTLCFailureReason_PaymentSecretRequired(ptr);
			case 35: return new LocalHTLCFailureReason_OutgoingCLTVTooSoon(ptr);
			case 36: return new LocalHTLCFailureReason_ChannelClosed(ptr);
			case 37: return new LocalHTLCFailureReason_OnChainTimeout(ptr);
			case 38: return new LocalHTLCFailureReason_ZeroAmount(ptr);
			case 39: return new LocalHTLCFailureReason_HTLCMinimum(ptr);
			case 40: return new LocalHTLCFailureReason_HTLCMaximum(ptr);
			case 41: return new LocalHTLCFailureReason_PeerOffline(ptr);
			case 42: return new LocalHTLCFailureReason_ChannelBalanceOverdrawn(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.LocalHTLCFailureReason_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the LocalHTLCFailureReason
	 */
	public clone(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_clone(this.ptr);
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant LocalHTLCFailureReason
	 */
	public static constructor_temporary_node_failure(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_temporary_node_failure();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentNodeFailure-variant LocalHTLCFailureReason
	 */
	public static constructor_permanent_node_failure(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_permanent_node_failure();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeature-variant LocalHTLCFailureReason
	 */
	public static constructor_required_node_feature(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_required_node_feature();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionVersion-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_onion_version(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_onion_version();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionHMAC-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_onion_hmac(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_onion_hmac();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionKey-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_onion_key(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_onion_key();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryChannelFailure-variant LocalHTLCFailureReason
	 */
	public static constructor_temporary_channel_failure(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_temporary_channel_failure();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentChannelFailure-variant LocalHTLCFailureReason
	 */
	public static constructor_permanent_channel_failure(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_permanent_channel_failure();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredChannelFeature-variant LocalHTLCFailureReason
	 */
	public static constructor_required_channel_feature(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_required_channel_feature();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextPeer-variant LocalHTLCFailureReason
	 */
	public static constructor_unknown_next_peer(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_unknown_next_peer();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AmountBelowMinimum-variant LocalHTLCFailureReason
	 */
	public static constructor_amount_below_minimum(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_amount_below_minimum();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeInsufficient-variant LocalHTLCFailureReason
	 */
	public static constructor_fee_insufficient(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_fee_insufficient();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static constructor_incorrect_cltvexpiry(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_incorrect_cltvexpiry();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooSoon-variant LocalHTLCFailureReason
	 */
	public static constructor_cltvexpiry_too_soon(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_cltvexpiry_too_soon();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectPaymentDetails-variant LocalHTLCFailureReason
	 */
	public static constructor_incorrect_payment_details(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_incorrect_payment_details();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static constructor_final_incorrect_cltvexpiry(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_final_incorrect_cltvexpiry();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectHTLCAmount-variant LocalHTLCFailureReason
	 */
	public static constructor_final_incorrect_htlcamount(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_final_incorrect_htlcamount();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelDisabled-variant LocalHTLCFailureReason
	 */
	public static constructor_channel_disabled(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_channel_disabled();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooFar-variant LocalHTLCFailureReason
	 */
	public static constructor_cltvexpiry_too_far(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_cltvexpiry_too_far();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_onion_payload(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_onion_payload();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MPPTimeout-variant LocalHTLCFailureReason
	 */
	public static constructor_mpptimeout(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_mpptimeout();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionBlinding-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_onion_blinding(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_onion_blinding();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownFailureCode-variant LocalHTLCFailureReason
	 */
	public static constructor_unknown_failure_code(code: number): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_unknown_failure_code(code);
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForwardExpiryBuffer-variant LocalHTLCFailureReason
	 */
	public static constructor_forward_expiry_buffer(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_forward_expiry_buffer();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolineForward-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_trampoline_forward(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_trampoline_forward();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimBuffer-variant LocalHTLCFailureReason
	 */
	public static constructor_payment_claim_buffer(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_payment_claim_buffer();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitHolder-variant LocalHTLCFailureReason
	 */
	public static constructor_dust_limit_holder(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_dust_limit_holder();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitCounterparty-variant LocalHTLCFailureReason
	 */
	public static constructor_dust_limit_counterparty(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_dust_limit_counterparty();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeSpikeBuffer-variant LocalHTLCFailureReason
	 */
	public static constructor_fee_spike_buffer(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_fee_spike_buffer();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateChannelForward-variant LocalHTLCFailureReason
	 */
	public static constructor_private_channel_forward(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_private_channel_forward();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RealSCIDForward-variant LocalHTLCFailureReason
	 */
	public static constructor_real_scidforward(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_real_scidforward();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelNotReady-variant LocalHTLCFailureReason
	 */
	public static constructor_channel_not_ready(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_channel_not_ready();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidKeysendPreimage-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_keysend_preimage(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_keysend_preimage();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolinePayload-variant LocalHTLCFailureReason
	 */
	public static constructor_invalid_trampoline_payload(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_invalid_trampoline_payload();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSecretRequired-variant LocalHTLCFailureReason
	 */
	public static constructor_payment_secret_required(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_payment_secret_required();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutgoingCLTVTooSoon-variant LocalHTLCFailureReason
	 */
	public static constructor_outgoing_cltvtoo_soon(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_outgoing_cltvtoo_soon();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant LocalHTLCFailureReason
	 */
	public static constructor_channel_closed(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_channel_closed();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnChainTimeout-variant LocalHTLCFailureReason
	 */
	public static constructor_on_chain_timeout(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_on_chain_timeout();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ZeroAmount-variant LocalHTLCFailureReason
	 */
	public static constructor_zero_amount(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_zero_amount();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMinimum-variant LocalHTLCFailureReason
	 */
	public static constructor_htlcminimum(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_htlcminimum();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMaximum-variant LocalHTLCFailureReason
	 */
	public static constructor_htlcmaximum(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_htlcmaximum();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerOffline-variant LocalHTLCFailureReason
	 */
	public static constructor_peer_offline(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_peer_offline();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelBalanceOverdrawn-variant LocalHTLCFailureReason
	 */
	public static constructor_channel_balance_overdrawn(): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_channel_balance_overdrawn();
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the LocalHTLCFailureReason.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.LocalHTLCFailureReason_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two LocalHTLCFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: LocalHTLCFailureReason): boolean {
		const ret: boolean = bindings.LocalHTLCFailureReason_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Build a LocalHTLCFailureReason from a u16
	 */
	public static constructor_from_u16(f: number): LocalHTLCFailureReason {
		const ret: bigint = bindings.LocalHTLCFailureReason_from_u16(f);
		const ret_hu_conv: LocalHTLCFailureReason = LocalHTLCFailureReason.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Read a LocalHTLCFailureReason from a byte array, created by LocalHTLCFailureReason_write
	 */
	public static constructor_read(ser: Uint8Array): Result_LocalHTLCFailureReasonDecodeErrorZ {
		const ret: bigint = bindings.LocalHTLCFailureReason_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_LocalHTLCFailureReasonDecodeErrorZ = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the LocalHTLCFailureReason object into a byte array which can be read by LocalHTLCFailureReason_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.LocalHTLCFailureReason_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A LocalHTLCFailureReason of type TemporaryNodeFailure */
export class LocalHTLCFailureReason_TemporaryNodeFailure extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PermanentNodeFailure */
export class LocalHTLCFailureReason_PermanentNodeFailure extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type RequiredNodeFeature */
export class LocalHTLCFailureReason_RequiredNodeFeature extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidOnionVersion */
export class LocalHTLCFailureReason_InvalidOnionVersion extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidOnionHMAC */
export class LocalHTLCFailureReason_InvalidOnionHMAC extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidOnionKey */
export class LocalHTLCFailureReason_InvalidOnionKey extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type TemporaryChannelFailure */
export class LocalHTLCFailureReason_TemporaryChannelFailure extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PermanentChannelFailure */
export class LocalHTLCFailureReason_PermanentChannelFailure extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type RequiredChannelFeature */
export class LocalHTLCFailureReason_RequiredChannelFeature extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type UnknownNextPeer */
export class LocalHTLCFailureReason_UnknownNextPeer extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type AmountBelowMinimum */
export class LocalHTLCFailureReason_AmountBelowMinimum extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type FeeInsufficient */
export class LocalHTLCFailureReason_FeeInsufficient extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type IncorrectCLTVExpiry */
export class LocalHTLCFailureReason_IncorrectCLTVExpiry extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type CLTVExpiryTooSoon */
export class LocalHTLCFailureReason_CLTVExpiryTooSoon extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type IncorrectPaymentDetails */
export class LocalHTLCFailureReason_IncorrectPaymentDetails extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type FinalIncorrectCLTVExpiry */
export class LocalHTLCFailureReason_FinalIncorrectCLTVExpiry extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type FinalIncorrectHTLCAmount */
export class LocalHTLCFailureReason_FinalIncorrectHTLCAmount extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type ChannelDisabled */
export class LocalHTLCFailureReason_ChannelDisabled extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type CLTVExpiryTooFar */
export class LocalHTLCFailureReason_CLTVExpiryTooFar extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidOnionPayload */
export class LocalHTLCFailureReason_InvalidOnionPayload extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type MPPTimeout */
export class LocalHTLCFailureReason_MPPTimeout extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidOnionBlinding */
export class LocalHTLCFailureReason_InvalidOnionBlinding extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type UnknownFailureCode */
export class LocalHTLCFailureReason_UnknownFailureCode extends LocalHTLCFailureReason {
	/**
	 * The bolt 04 failure code.
	 */
	public code: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.code = bindings.LDKLocalHTLCFailureReason_UnknownFailureCode_get_code(ptr);
	}
}
/** A LocalHTLCFailureReason of type ForwardExpiryBuffer */
export class LocalHTLCFailureReason_ForwardExpiryBuffer extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidTrampolineForward */
export class LocalHTLCFailureReason_InvalidTrampolineForward extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PaymentClaimBuffer */
export class LocalHTLCFailureReason_PaymentClaimBuffer extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type DustLimitHolder */
export class LocalHTLCFailureReason_DustLimitHolder extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type DustLimitCounterparty */
export class LocalHTLCFailureReason_DustLimitCounterparty extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type FeeSpikeBuffer */
export class LocalHTLCFailureReason_FeeSpikeBuffer extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PrivateChannelForward */
export class LocalHTLCFailureReason_PrivateChannelForward extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type RealSCIDForward */
export class LocalHTLCFailureReason_RealSCIDForward extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type ChannelNotReady */
export class LocalHTLCFailureReason_ChannelNotReady extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidKeysendPreimage */
export class LocalHTLCFailureReason_InvalidKeysendPreimage extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type InvalidTrampolinePayload */
export class LocalHTLCFailureReason_InvalidTrampolinePayload extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PaymentSecretRequired */
export class LocalHTLCFailureReason_PaymentSecretRequired extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type OutgoingCLTVTooSoon */
export class LocalHTLCFailureReason_OutgoingCLTVTooSoon extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type ChannelClosed */
export class LocalHTLCFailureReason_ChannelClosed extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type OnChainTimeout */
export class LocalHTLCFailureReason_OnChainTimeout extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type ZeroAmount */
export class LocalHTLCFailureReason_ZeroAmount extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type HTLCMinimum */
export class LocalHTLCFailureReason_HTLCMinimum extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type HTLCMaximum */
export class LocalHTLCFailureReason_HTLCMaximum extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type PeerOffline */
export class LocalHTLCFailureReason_PeerOffline extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A LocalHTLCFailureReason of type ChannelBalanceOverdrawn */
export class LocalHTLCFailureReason_ChannelBalanceOverdrawn extends LocalHTLCFailureReason {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

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
public class LocalHTLCFailureReason : CommonBase {
	protected LocalHTLCFailureReason(object _dummy, long ptr) : base(ptr) { }
	~LocalHTLCFailureReason() {
		if (ptr != 0) { bindings.LocalHTLCFailureReason_free(ptr); }
	}

	internal static LocalHTLCFailureReason constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKLocalHTLCFailureReason_ty_from_ptr(ptr);
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
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A LocalHTLCFailureReason of type TemporaryNodeFailure */
	public class LocalHTLCFailureReason_TemporaryNodeFailure : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_TemporaryNodeFailure(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PermanentNodeFailure */
	public class LocalHTLCFailureReason_PermanentNodeFailure : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PermanentNodeFailure(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type RequiredNodeFeature */
	public class LocalHTLCFailureReason_RequiredNodeFeature : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_RequiredNodeFeature(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidOnionVersion */
	public class LocalHTLCFailureReason_InvalidOnionVersion : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidOnionVersion(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidOnionHMAC */
	public class LocalHTLCFailureReason_InvalidOnionHMAC : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidOnionHMAC(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidOnionKey */
	public class LocalHTLCFailureReason_InvalidOnionKey : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidOnionKey(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type TemporaryChannelFailure */
	public class LocalHTLCFailureReason_TemporaryChannelFailure : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_TemporaryChannelFailure(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PermanentChannelFailure */
	public class LocalHTLCFailureReason_PermanentChannelFailure : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PermanentChannelFailure(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type RequiredChannelFeature */
	public class LocalHTLCFailureReason_RequiredChannelFeature : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_RequiredChannelFeature(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type UnknownNextPeer */
	public class LocalHTLCFailureReason_UnknownNextPeer : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_UnknownNextPeer(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type AmountBelowMinimum */
	public class LocalHTLCFailureReason_AmountBelowMinimum : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_AmountBelowMinimum(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type FeeInsufficient */
	public class LocalHTLCFailureReason_FeeInsufficient : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_FeeInsufficient(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type IncorrectCLTVExpiry */
	public class LocalHTLCFailureReason_IncorrectCLTVExpiry : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_IncorrectCLTVExpiry(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type CLTVExpiryTooSoon */
	public class LocalHTLCFailureReason_CLTVExpiryTooSoon : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_CLTVExpiryTooSoon(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type IncorrectPaymentDetails */
	public class LocalHTLCFailureReason_IncorrectPaymentDetails : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_IncorrectPaymentDetails(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type FinalIncorrectCLTVExpiry */
	public class LocalHTLCFailureReason_FinalIncorrectCLTVExpiry : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_FinalIncorrectCLTVExpiry(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type FinalIncorrectHTLCAmount */
	public class LocalHTLCFailureReason_FinalIncorrectHTLCAmount : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_FinalIncorrectHTLCAmount(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type ChannelDisabled */
	public class LocalHTLCFailureReason_ChannelDisabled : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ChannelDisabled(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type CLTVExpiryTooFar */
	public class LocalHTLCFailureReason_CLTVExpiryTooFar : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_CLTVExpiryTooFar(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidOnionPayload */
	public class LocalHTLCFailureReason_InvalidOnionPayload : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidOnionPayload(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type MPPTimeout */
	public class LocalHTLCFailureReason_MPPTimeout : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_MPPTimeout(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidOnionBlinding */
	public class LocalHTLCFailureReason_InvalidOnionBlinding : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidOnionBlinding(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type UnknownFailureCode */
	public class LocalHTLCFailureReason_UnknownFailureCode : LocalHTLCFailureReason {
		/**
		 * The bolt 04 failure code.
		 */
		public short code;
		internal LocalHTLCFailureReason_UnknownFailureCode(long ptr) : base(null, ptr) {
			this.code = bindings.LDKLocalHTLCFailureReason_UnknownFailureCode_get_code(ptr);
		}
	}
	/** A LocalHTLCFailureReason of type ForwardExpiryBuffer */
	public class LocalHTLCFailureReason_ForwardExpiryBuffer : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ForwardExpiryBuffer(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidTrampolineForward */
	public class LocalHTLCFailureReason_InvalidTrampolineForward : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidTrampolineForward(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PaymentClaimBuffer */
	public class LocalHTLCFailureReason_PaymentClaimBuffer : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PaymentClaimBuffer(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type DustLimitHolder */
	public class LocalHTLCFailureReason_DustLimitHolder : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_DustLimitHolder(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type DustLimitCounterparty */
	public class LocalHTLCFailureReason_DustLimitCounterparty : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_DustLimitCounterparty(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type FeeSpikeBuffer */
	public class LocalHTLCFailureReason_FeeSpikeBuffer : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_FeeSpikeBuffer(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PrivateChannelForward */
	public class LocalHTLCFailureReason_PrivateChannelForward : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PrivateChannelForward(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type RealSCIDForward */
	public class LocalHTLCFailureReason_RealSCIDForward : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_RealSCIDForward(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type ChannelNotReady */
	public class LocalHTLCFailureReason_ChannelNotReady : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ChannelNotReady(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidKeysendPreimage */
	public class LocalHTLCFailureReason_InvalidKeysendPreimage : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidKeysendPreimage(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type InvalidTrampolinePayload */
	public class LocalHTLCFailureReason_InvalidTrampolinePayload : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_InvalidTrampolinePayload(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PaymentSecretRequired */
	public class LocalHTLCFailureReason_PaymentSecretRequired : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PaymentSecretRequired(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type OutgoingCLTVTooSoon */
	public class LocalHTLCFailureReason_OutgoingCLTVTooSoon : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_OutgoingCLTVTooSoon(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type ChannelClosed */
	public class LocalHTLCFailureReason_ChannelClosed : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ChannelClosed(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type OnChainTimeout */
	public class LocalHTLCFailureReason_OnChainTimeout : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_OnChainTimeout(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type ZeroAmount */
	public class LocalHTLCFailureReason_ZeroAmount : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ZeroAmount(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type HTLCMinimum */
	public class LocalHTLCFailureReason_HTLCMinimum : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_HTLCMinimum(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type HTLCMaximum */
	public class LocalHTLCFailureReason_HTLCMaximum : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_HTLCMaximum(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type PeerOffline */
	public class LocalHTLCFailureReason_PeerOffline : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_PeerOffline(long ptr) : base(null, ptr) {
		}
	}
	/** A LocalHTLCFailureReason of type ChannelBalanceOverdrawn */
	public class LocalHTLCFailureReason_ChannelBalanceOverdrawn : LocalHTLCFailureReason {
		internal LocalHTLCFailureReason_ChannelBalanceOverdrawn(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.LocalHTLCFailureReason_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the LocalHTLCFailureReason
	 */
	public org.ldk.structs.LocalHTLCFailureReason clone() {
		long ret = bindings.LocalHTLCFailureReason_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason temporary_node_failure() {
		long ret = bindings.LocalHTLCFailureReason_temporary_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentNodeFailure-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason permanent_node_failure() {
		long ret = bindings.LocalHTLCFailureReason_permanent_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeature-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason required_node_feature() {
		long ret = bindings.LocalHTLCFailureReason_required_node_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionVersion-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_onion_version() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_version();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionHMAC-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_onion_hmac() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_hmac();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionKey-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_onion_key() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_key();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryChannelFailure-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason temporary_channel_failure() {
		long ret = bindings.LocalHTLCFailureReason_temporary_channel_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentChannelFailure-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason permanent_channel_failure() {
		long ret = bindings.LocalHTLCFailureReason_permanent_channel_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredChannelFeature-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason required_channel_feature() {
		long ret = bindings.LocalHTLCFailureReason_required_channel_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextPeer-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason unknown_next_peer() {
		long ret = bindings.LocalHTLCFailureReason_unknown_next_peer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AmountBelowMinimum-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason amount_below_minimum() {
		long ret = bindings.LocalHTLCFailureReason_amount_below_minimum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeInsufficient-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason fee_insufficient() {
		long ret = bindings.LocalHTLCFailureReason_fee_insufficient();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason incorrect_cltvexpiry() {
		long ret = bindings.LocalHTLCFailureReason_incorrect_cltvexpiry();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooSoon-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason cltvexpiry_too_soon() {
		long ret = bindings.LocalHTLCFailureReason_cltvexpiry_too_soon();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectPaymentDetails-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason incorrect_payment_details() {
		long ret = bindings.LocalHTLCFailureReason_incorrect_payment_details();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason final_incorrect_cltvexpiry() {
		long ret = bindings.LocalHTLCFailureReason_final_incorrect_cltvexpiry();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectHTLCAmount-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason final_incorrect_htlcamount() {
		long ret = bindings.LocalHTLCFailureReason_final_incorrect_htlcamount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelDisabled-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason channel_disabled() {
		long ret = bindings.LocalHTLCFailureReason_channel_disabled();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooFar-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason cltvexpiry_too_far() {
		long ret = bindings.LocalHTLCFailureReason_cltvexpiry_too_far();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_onion_payload() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_payload();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MPPTimeout-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason mpptimeout() {
		long ret = bindings.LocalHTLCFailureReason_mpptimeout();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionBlinding-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_onion_blinding() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_blinding();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownFailureCode-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason unknown_failure_code(short code) {
		long ret = bindings.LocalHTLCFailureReason_unknown_failure_code(code);
		GC.KeepAlive(code);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForwardExpiryBuffer-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason forward_expiry_buffer() {
		long ret = bindings.LocalHTLCFailureReason_forward_expiry_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolineForward-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_trampoline_forward() {
		long ret = bindings.LocalHTLCFailureReason_invalid_trampoline_forward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimBuffer-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason payment_claim_buffer() {
		long ret = bindings.LocalHTLCFailureReason_payment_claim_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitHolder-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason dust_limit_holder() {
		long ret = bindings.LocalHTLCFailureReason_dust_limit_holder();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitCounterparty-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason dust_limit_counterparty() {
		long ret = bindings.LocalHTLCFailureReason_dust_limit_counterparty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeSpikeBuffer-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason fee_spike_buffer() {
		long ret = bindings.LocalHTLCFailureReason_fee_spike_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateChannelForward-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason private_channel_forward() {
		long ret = bindings.LocalHTLCFailureReason_private_channel_forward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RealSCIDForward-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason real_scidforward() {
		long ret = bindings.LocalHTLCFailureReason_real_scidforward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelNotReady-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason channel_not_ready() {
		long ret = bindings.LocalHTLCFailureReason_channel_not_ready();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidKeysendPreimage-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_keysend_preimage() {
		long ret = bindings.LocalHTLCFailureReason_invalid_keysend_preimage();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolinePayload-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason invalid_trampoline_payload() {
		long ret = bindings.LocalHTLCFailureReason_invalid_trampoline_payload();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSecretRequired-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason payment_secret_required() {
		long ret = bindings.LocalHTLCFailureReason_payment_secret_required();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutgoingCLTVTooSoon-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason outgoing_cltvtoo_soon() {
		long ret = bindings.LocalHTLCFailureReason_outgoing_cltvtoo_soon();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason channel_closed() {
		long ret = bindings.LocalHTLCFailureReason_channel_closed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnChainTimeout-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason on_chain_timeout() {
		long ret = bindings.LocalHTLCFailureReason_on_chain_timeout();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ZeroAmount-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason zero_amount() {
		long ret = bindings.LocalHTLCFailureReason_zero_amount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMinimum-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason htlcminimum() {
		long ret = bindings.LocalHTLCFailureReason_htlcminimum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMaximum-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason htlcmaximum() {
		long ret = bindings.LocalHTLCFailureReason_htlcmaximum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerOffline-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason peer_offline() {
		long ret = bindings.LocalHTLCFailureReason_peer_offline();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelBalanceOverdrawn-variant LocalHTLCFailureReason
	 */
	public static org.ldk.structs.LocalHTLCFailureReason channel_balance_overdrawn() {
		long ret = bindings.LocalHTLCFailureReason_channel_balance_overdrawn();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the LocalHTLCFailureReason.
	 */
	public long hash() {
		long ret = bindings.LocalHTLCFailureReason_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two LocalHTLCFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.LocalHTLCFailureReason b) {
		bool ret = bindings.LocalHTLCFailureReason_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is LocalHTLCFailureReason)) return false;
		return this.eq((LocalHTLCFailureReason)o);
	}
	/**
	 * Build a LocalHTLCFailureReason from a u16
	 */
	public static org.ldk.structs.LocalHTLCFailureReason from_u16(short f) {
		long ret = bindings.LocalHTLCFailureReason_from_u16(f);
		GC.KeepAlive(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Read a LocalHTLCFailureReason from a byte array, created by LocalHTLCFailureReason_write
	 */
	public static org.ldk.structs.Result_LocalHTLCFailureReasonDecodeErrorZ read(byte[] ser) {
		long ret = bindings.LocalHTLCFailureReason_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LocalHTLCFailureReasonDecodeErrorZ ret_hu_conv = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the LocalHTLCFailureReason object into a byte array which can be read by LocalHTLCFailureReason_read
	 */
	public byte[] write() {
		long ret = bindings.LocalHTLCFailureReason_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }

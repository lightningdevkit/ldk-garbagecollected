package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LocalHTLCFailureReason extends CommonBase {
	private LocalHTLCFailureReason(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.LocalHTLCFailureReason_free(ptr); }
	}
	static LocalHTLCFailureReason constr_from_ptr(long ptr) {
		bindings.LDKLocalHTLCFailureReason raw_val = bindings.LDKLocalHTLCFailureReason_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.TemporaryNodeFailure.class) {
			return new TemporaryNodeFailure(ptr, (bindings.LDKLocalHTLCFailureReason.TemporaryNodeFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PermanentNodeFailure.class) {
			return new PermanentNodeFailure(ptr, (bindings.LDKLocalHTLCFailureReason.PermanentNodeFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.RequiredNodeFeature.class) {
			return new RequiredNodeFeature(ptr, (bindings.LDKLocalHTLCFailureReason.RequiredNodeFeature)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidOnionVersion.class) {
			return new InvalidOnionVersion(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidOnionVersion)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidOnionHMAC.class) {
			return new InvalidOnionHMAC(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidOnionHMAC)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidOnionKey.class) {
			return new InvalidOnionKey(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidOnionKey)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.TemporaryChannelFailure.class) {
			return new TemporaryChannelFailure(ptr, (bindings.LDKLocalHTLCFailureReason.TemporaryChannelFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PermanentChannelFailure.class) {
			return new PermanentChannelFailure(ptr, (bindings.LDKLocalHTLCFailureReason.PermanentChannelFailure)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.RequiredChannelFeature.class) {
			return new RequiredChannelFeature(ptr, (bindings.LDKLocalHTLCFailureReason.RequiredChannelFeature)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.UnknownNextPeer.class) {
			return new UnknownNextPeer(ptr, (bindings.LDKLocalHTLCFailureReason.UnknownNextPeer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.AmountBelowMinimum.class) {
			return new AmountBelowMinimum(ptr, (bindings.LDKLocalHTLCFailureReason.AmountBelowMinimum)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.FeeInsufficient.class) {
			return new FeeInsufficient(ptr, (bindings.LDKLocalHTLCFailureReason.FeeInsufficient)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.IncorrectCLTVExpiry.class) {
			return new IncorrectCLTVExpiry(ptr, (bindings.LDKLocalHTLCFailureReason.IncorrectCLTVExpiry)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooSoon.class) {
			return new CLTVExpiryTooSoon(ptr, (bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooSoon)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.IncorrectPaymentDetails.class) {
			return new IncorrectPaymentDetails(ptr, (bindings.LDKLocalHTLCFailureReason.IncorrectPaymentDetails)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.FinalIncorrectCLTVExpiry.class) {
			return new FinalIncorrectCLTVExpiry(ptr, (bindings.LDKLocalHTLCFailureReason.FinalIncorrectCLTVExpiry)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.FinalIncorrectHTLCAmount.class) {
			return new FinalIncorrectHTLCAmount(ptr, (bindings.LDKLocalHTLCFailureReason.FinalIncorrectHTLCAmount)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ChannelDisabled.class) {
			return new ChannelDisabled(ptr, (bindings.LDKLocalHTLCFailureReason.ChannelDisabled)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooFar.class) {
			return new CLTVExpiryTooFar(ptr, (bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooFar)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidOnionPayload.class) {
			return new InvalidOnionPayload(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidOnionPayload)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.MPPTimeout.class) {
			return new MPPTimeout(ptr, (bindings.LDKLocalHTLCFailureReason.MPPTimeout)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidOnionBlinding.class) {
			return new InvalidOnionBlinding(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidOnionBlinding)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.UnknownFailureCode.class) {
			return new UnknownFailureCode(ptr, (bindings.LDKLocalHTLCFailureReason.UnknownFailureCode)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ForwardExpiryBuffer.class) {
			return new ForwardExpiryBuffer(ptr, (bindings.LDKLocalHTLCFailureReason.ForwardExpiryBuffer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidTrampolineForward.class) {
			return new InvalidTrampolineForward(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidTrampolineForward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PaymentClaimBuffer.class) {
			return new PaymentClaimBuffer(ptr, (bindings.LDKLocalHTLCFailureReason.PaymentClaimBuffer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.DustLimitHolder.class) {
			return new DustLimitHolder(ptr, (bindings.LDKLocalHTLCFailureReason.DustLimitHolder)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.DustLimitCounterparty.class) {
			return new DustLimitCounterparty(ptr, (bindings.LDKLocalHTLCFailureReason.DustLimitCounterparty)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.FeeSpikeBuffer.class) {
			return new FeeSpikeBuffer(ptr, (bindings.LDKLocalHTLCFailureReason.FeeSpikeBuffer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PrivateChannelForward.class) {
			return new PrivateChannelForward(ptr, (bindings.LDKLocalHTLCFailureReason.PrivateChannelForward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.RealSCIDForward.class) {
			return new RealSCIDForward(ptr, (bindings.LDKLocalHTLCFailureReason.RealSCIDForward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ChannelNotReady.class) {
			return new ChannelNotReady(ptr, (bindings.LDKLocalHTLCFailureReason.ChannelNotReady)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidKeysendPreimage.class) {
			return new InvalidKeysendPreimage(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidKeysendPreimage)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.InvalidTrampolinePayload.class) {
			return new InvalidTrampolinePayload(ptr, (bindings.LDKLocalHTLCFailureReason.InvalidTrampolinePayload)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PaymentSecretRequired.class) {
			return new PaymentSecretRequired(ptr, (bindings.LDKLocalHTLCFailureReason.PaymentSecretRequired)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.OutgoingCLTVTooSoon.class) {
			return new OutgoingCLTVTooSoon(ptr, (bindings.LDKLocalHTLCFailureReason.OutgoingCLTVTooSoon)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ChannelClosed.class) {
			return new ChannelClosed(ptr, (bindings.LDKLocalHTLCFailureReason.ChannelClosed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.OnChainTimeout.class) {
			return new OnChainTimeout(ptr, (bindings.LDKLocalHTLCFailureReason.OnChainTimeout)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ZeroAmount.class) {
			return new ZeroAmount(ptr, (bindings.LDKLocalHTLCFailureReason.ZeroAmount)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.HTLCMinimum.class) {
			return new HTLCMinimum(ptr, (bindings.LDKLocalHTLCFailureReason.HTLCMinimum)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.HTLCMaximum.class) {
			return new HTLCMaximum(ptr, (bindings.LDKLocalHTLCFailureReason.HTLCMaximum)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.PeerOffline.class) {
			return new PeerOffline(ptr, (bindings.LDKLocalHTLCFailureReason.PeerOffline)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKLocalHTLCFailureReason.ChannelBalanceOverdrawn.class) {
			return new ChannelBalanceOverdrawn(ptr, (bindings.LDKLocalHTLCFailureReason.ChannelBalanceOverdrawn)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * There has been a temporary processing failure on the node which may resolve on retry.
	 */
	public final static class TemporaryNodeFailure extends LocalHTLCFailureReason {
		private TemporaryNodeFailure(long ptr, bindings.LDKLocalHTLCFailureReason.TemporaryNodeFailure obj) {
			super(null, ptr);
		}
	}
	/**
	 * These has been a permanent processing failure on the node which will not resolve on retry.
	 */
	public final static class PermanentNodeFailure extends LocalHTLCFailureReason {
		private PermanentNodeFailure(long ptr, bindings.LDKLocalHTLCFailureReason.PermanentNodeFailure obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC does not implement a feature that is required by our node.
	 * 
	 * The sender may have outdated gossip, or a bug in its implementation.
	 */
	public final static class RequiredNodeFeature extends LocalHTLCFailureReason {
		private RequiredNodeFeature(long ptr, bindings.LDKLocalHTLCFailureReason.RequiredNodeFeature obj) {
			super(null, ptr);
		}
	}
	/**
	 * The onion version specified by the HTLC packet is unknown to our node.
	 */
	public final static class InvalidOnionVersion extends LocalHTLCFailureReason {
		private InvalidOnionVersion(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidOnionVersion obj) {
			super(null, ptr);
		}
	}
	/**
	 * The integrity of the HTLC packet cannot be verified because it has an invalid HMAC.
	 */
	public final static class InvalidOnionHMAC extends LocalHTLCFailureReason {
		private InvalidOnionHMAC(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidOnionHMAC obj) {
			super(null, ptr);
		}
	}
	/**
	 * The onion packet has an invalid ephemeral key, so the HTLC cannot be processed.
	 */
	public final static class InvalidOnionKey extends LocalHTLCFailureReason {
		private InvalidOnionKey(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidOnionKey obj) {
			super(null, ptr);
		}
	}
	/**
	 * A temporary forwarding error has occurred which may resolve on retry.
	 */
	public final static class TemporaryChannelFailure extends LocalHTLCFailureReason {
		private TemporaryChannelFailure(long ptr, bindings.LDKLocalHTLCFailureReason.TemporaryChannelFailure obj) {
			super(null, ptr);
		}
	}
	/**
	 * A permanent forwarding error has occurred which will not resolve on retry.
	 */
	public final static class PermanentChannelFailure extends LocalHTLCFailureReason {
		private PermanentChannelFailure(long ptr, bindings.LDKLocalHTLCFailureReason.PermanentChannelFailure obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC does not implement a feature that is required by our channel for processing.
	 */
	public final static class RequiredChannelFeature extends LocalHTLCFailureReason {
		private RequiredChannelFeature(long ptr, bindings.LDKLocalHTLCFailureReason.RequiredChannelFeature obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC's target outgoing channel that is not known to our node.
	 */
	public final static class UnknownNextPeer extends LocalHTLCFailureReason {
		private UnknownNextPeer(long ptr, bindings.LDKLocalHTLCFailureReason.UnknownNextPeer obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC amount is below our advertised htlc_minimum_msat.
	 * 
	 * The sender may have outdated gossip, or a bug in its implementation.
	 */
	public final static class AmountBelowMinimum extends LocalHTLCFailureReason {
		private AmountBelowMinimum(long ptr, bindings.LDKLocalHTLCFailureReason.AmountBelowMinimum obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC does not pay sufficient fees.
	 * 
	 * The sender may have outdated gossip, or a bug in its implementation.
	 */
	public final static class FeeInsufficient extends LocalHTLCFailureReason {
		private FeeInsufficient(long ptr, bindings.LDKLocalHTLCFailureReason.FeeInsufficient obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC does not meet the cltv_expiry_delta advertised by our node, set by
	 * [`ChannelConfig::cltv_expiry_delta`].
	 * 
	 * The sender may have outdated gossip, or a bug in its implementation.
	 * 
	 * [`ChannelConfig::cltv_expiry_delta`]: crate::util::config::ChannelConfig::cltv_expiry_delta
	 */
	public final static class IncorrectCLTVExpiry extends LocalHTLCFailureReason {
		private IncorrectCLTVExpiry(long ptr, bindings.LDKLocalHTLCFailureReason.IncorrectCLTVExpiry obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC expires too close to the current block height to be safely processed.
	 */
	public final static class CLTVExpiryTooSoon extends LocalHTLCFailureReason {
		private CLTVExpiryTooSoon(long ptr, bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooSoon obj) {
			super(null, ptr);
		}
	}
	/**
	 * A payment was made to our node that either had incorrect payment information, or was
	 * unknown to us.
	 */
	public final static class IncorrectPaymentDetails extends LocalHTLCFailureReason {
		private IncorrectPaymentDetails(long ptr, bindings.LDKLocalHTLCFailureReason.IncorrectPaymentDetails obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC's expiry is less than the expiry height specified by the sender.
	 * 
	 * The forwarding node has either tampered with this value, or the sending node has an
	 * old best block height.
	 */
	public final static class FinalIncorrectCLTVExpiry extends LocalHTLCFailureReason {
		private FinalIncorrectCLTVExpiry(long ptr, bindings.LDKLocalHTLCFailureReason.FinalIncorrectCLTVExpiry obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC's amount is less than the amount specified by the sender.
	 * 
	 * The forwarding node has tampered with this value, or has a bug in its implementation.
	 */
	public final static class FinalIncorrectHTLCAmount extends LocalHTLCFailureReason {
		private FinalIncorrectHTLCAmount(long ptr, bindings.LDKLocalHTLCFailureReason.FinalIncorrectHTLCAmount obj) {
			super(null, ptr);
		}
	}
	/**
	 * The channel has been marked as disabled because the channel peer is offline.
	 */
	public final static class ChannelDisabled extends LocalHTLCFailureReason {
		private ChannelDisabled(long ptr, bindings.LDKLocalHTLCFailureReason.ChannelDisabled obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC expires too far in the future, so it is rejected to avoid the worst-case outcome
	 * of funds being held for extended periods of time.
	 */
	public final static class CLTVExpiryTooFar extends LocalHTLCFailureReason {
		private CLTVExpiryTooFar(long ptr, bindings.LDKLocalHTLCFailureReason.CLTVExpiryTooFar obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC payload contained in the onion packet could not be understood by our node.
	 */
	public final static class InvalidOnionPayload extends LocalHTLCFailureReason {
		private InvalidOnionPayload(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidOnionPayload obj) {
			super(null, ptr);
		}
	}
	/**
	 * The total amount for a multi-part payment did not arrive in time, so the HTLCs partially
	 * paying the amount were canceled.
	 */
	public final static class MPPTimeout extends LocalHTLCFailureReason {
		private MPPTimeout(long ptr, bindings.LDKLocalHTLCFailureReason.MPPTimeout obj) {
			super(null, ptr);
		}
	}
	/**
	 * Our node was selected as part of a blinded path, but the packet we received was not
	 * properly constructed, or had incorrect values for the blinded path.
	 * 
	 * This may happen if the forwarding node tamperd with the HTLC or the sender or recipient
	 * implementations have a bug.
	 */
	public final static class InvalidOnionBlinding extends LocalHTLCFailureReason {
		private InvalidOnionBlinding(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidOnionBlinding obj) {
			super(null, ptr);
		}
	}
	/**
	 * UnknownFailureCode represents BOLT04 failure codes that we are not familiar with. We will
	 * encounter this if:
	 * - A peer sends us a new failure code that LDK has not yet been upgraded to understand.
	 * - We read a deprecated failure code from disk that LDK no longer uses.
	 * 
	 * See <https://github.com/lightning/bolts/blob/master/04-onion-routing.md#returning-errors>
	 * for latest defined error codes.
	 */
	public final static class UnknownFailureCode extends LocalHTLCFailureReason {
		/**
		 * The bolt 04 failure code.
		*/
		public final short code;
		private UnknownFailureCode(long ptr, bindings.LDKLocalHTLCFailureReason.UnknownFailureCode obj) {
			super(null, ptr);
			this.code = obj.code;
		}
	}
	/**
	 * A HTLC forward was failed back rather than forwarded on the proposed outgoing channel
	 * because its expiry is too close to the current block height to leave time to safely claim
	 * it on chain if the channel force closes.
	 */
	public final static class ForwardExpiryBuffer extends LocalHTLCFailureReason {
		private ForwardExpiryBuffer(long ptr, bindings.LDKLocalHTLCFailureReason.ForwardExpiryBuffer obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because it has invalid trampoline forwarding information.
	 */
	public final static class InvalidTrampolineForward extends LocalHTLCFailureReason {
		private InvalidTrampolineForward(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidTrampolineForward obj) {
			super(null, ptr);
		}
	}
	/**
	 * A HTLC receive was failed back rather than claimed because its expiry is too close to
	 * the current block height to leave time to safely claim it on chain if the channel force
	 * closes.
	 */
	public final static class PaymentClaimBuffer extends LocalHTLCFailureReason {
		private PaymentClaimBuffer(long ptr, bindings.LDKLocalHTLCFailureReason.PaymentClaimBuffer obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because accepting it would push our commitment's total amount of dust
	 * HTLCs over the limit that we allow to be burned to miner fees if the channel closed while
	 * they are unresolved.
	 */
	public final static class DustLimitHolder extends LocalHTLCFailureReason {
		private DustLimitHolder(long ptr, bindings.LDKLocalHTLCFailureReason.DustLimitHolder obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because accepting it would push our counterparty's total amount of
	 * dust (small) HTLCs over the limit that we allow to be burned to miner fees if the channel
	 * closes while they are unresolved.
	 */
	public final static class DustLimitCounterparty extends LocalHTLCFailureReason {
		private DustLimitCounterparty(long ptr, bindings.LDKLocalHTLCFailureReason.DustLimitCounterparty obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because it would drop the remote party's channel balance such that it
	 * cannot cover the fees it is required to pay at various fee rates. This buffer is maintained
	 * so that channels can always maintain reasonable fee rates.
	 */
	public final static class FeeSpikeBuffer extends LocalHTLCFailureReason {
		private FeeSpikeBuffer(long ptr, bindings.LDKLocalHTLCFailureReason.FeeSpikeBuffer obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC that requested to be forwarded over a private channel was rejected to prevent
	 * revealing the existence of the channel.
	 */
	public final static class PrivateChannelForward extends LocalHTLCFailureReason {
		private PrivateChannelForward(long ptr, bindings.LDKLocalHTLCFailureReason.PrivateChannelForward obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because it made a request to forward over the real channel ID of a
	 * channel that implements `option_scid_alias` which is a privacy feature to prevent the
	 * real channel ID from being known.
	 */
	public final static class RealSCIDForward extends LocalHTLCFailureReason {
		private RealSCIDForward(long ptr, bindings.LDKLocalHTLCFailureReason.RealSCIDForward obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was rejected because our channel has not yet reached sufficient depth to be used.
	 */
	public final static class ChannelNotReady extends LocalHTLCFailureReason {
		private ChannelNotReady(long ptr, bindings.LDKLocalHTLCFailureReason.ChannelNotReady obj) {
			super(null, ptr);
		}
	}
	/**
	 * A keysend payment with a preimage that did not match the HTLC has was rejected.
	 */
	public final static class InvalidKeysendPreimage extends LocalHTLCFailureReason {
		private InvalidKeysendPreimage(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidKeysendPreimage obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because it had an invalid trampoline payload.
	 */
	public final static class InvalidTrampolinePayload extends LocalHTLCFailureReason {
		private InvalidTrampolinePayload(long ptr, bindings.LDKLocalHTLCFailureReason.InvalidTrampolinePayload obj) {
			super(null, ptr);
		}
	}
	/**
	 * A payment was rejected because it did not include the correct payment secret from an
	 * invoice.
	 */
	public final static class PaymentSecretRequired extends LocalHTLCFailureReason {
		private PaymentSecretRequired(long ptr, bindings.LDKLocalHTLCFailureReason.PaymentSecretRequired obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because its expiry is too close to the current block height, and we
	 * expect that it will immediately be failed back by our downstream peer.
	 */
	public final static class OutgoingCLTVTooSoon extends LocalHTLCFailureReason {
		private OutgoingCLTVTooSoon(long ptr, bindings.LDKLocalHTLCFailureReason.OutgoingCLTVTooSoon obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because it was pending on a channel which is now in the process of
	 * being closed.
	 */
	public final static class ChannelClosed extends LocalHTLCFailureReason {
		private ChannelClosed(long ptr, bindings.LDKLocalHTLCFailureReason.ChannelClosed obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed back because its expiry height was reached and funds were timed out
	 * on chain.
	 */
	public final static class OnChainTimeout extends LocalHTLCFailureReason {
		private OnChainTimeout(long ptr, bindings.LDKLocalHTLCFailureReason.OnChainTimeout obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because zero amount HTLCs are not allowed.
	 */
	public final static class ZeroAmount extends LocalHTLCFailureReason {
		private ZeroAmount(long ptr, bindings.LDKLocalHTLCFailureReason.ZeroAmount obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because its amount is less than the smallest HTLC that the channel
	 * can currently accept.
	 * 
	 * This may occur because the HTLC is smaller than the counterparty's advertised minimum
	 * accepted HTLC size, or if we have reached our maximum total dust HTLC exposure.
	 */
	public final static class HTLCMinimum extends LocalHTLCFailureReason {
		private HTLCMinimum(long ptr, bindings.LDKLocalHTLCFailureReason.HTLCMinimum obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because its amount is more than then largest HTLC that the channel
	 * can currently accept.
	 * 
	 * This may occur because the outbound channel has insufficient liquidity to forward the HTLC,
	 * we have reached the counterparty's in-flight limits, or the HTLC exceeds our advertised
	 * maximum accepted HTLC size.
	 */
	public final static class HTLCMaximum extends LocalHTLCFailureReason {
		private HTLCMaximum(long ptr, bindings.LDKLocalHTLCFailureReason.HTLCMaximum obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because our remote peer is offline.
	 */
	public final static class PeerOffline extends LocalHTLCFailureReason {
		private PeerOffline(long ptr, bindings.LDKLocalHTLCFailureReason.PeerOffline obj) {
			super(null, ptr);
		}
	}
	/**
	 * The HTLC was failed because the channel balance was overdrawn.
	 */
	public final static class ChannelBalanceOverdrawn extends LocalHTLCFailureReason {
		private ChannelBalanceOverdrawn(long ptr, bindings.LDKLocalHTLCFailureReason.ChannelBalanceOverdrawn obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.LocalHTLCFailureReason_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the LocalHTLCFailureReason
	 */
	public LocalHTLCFailureReason clone() {
		long ret = bindings.LocalHTLCFailureReason_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryNodeFailure-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason temporary_node_failure() {
		long ret = bindings.LocalHTLCFailureReason_temporary_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentNodeFailure-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason permanent_node_failure() {
		long ret = bindings.LocalHTLCFailureReason_permanent_node_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredNodeFeature-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason required_node_feature() {
		long ret = bindings.LocalHTLCFailureReason_required_node_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionVersion-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_onion_version() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_version();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionHMAC-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_onion_hmac() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_hmac();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionKey-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_onion_key() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_key();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TemporaryChannelFailure-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason temporary_channel_failure() {
		long ret = bindings.LocalHTLCFailureReason_temporary_channel_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PermanentChannelFailure-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason permanent_channel_failure() {
		long ret = bindings.LocalHTLCFailureReason_permanent_channel_failure();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RequiredChannelFeature-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason required_channel_feature() {
		long ret = bindings.LocalHTLCFailureReason_required_channel_feature();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownNextPeer-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason unknown_next_peer() {
		long ret = bindings.LocalHTLCFailureReason_unknown_next_peer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AmountBelowMinimum-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason amount_below_minimum() {
		long ret = bindings.LocalHTLCFailureReason_amount_below_minimum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeInsufficient-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason fee_insufficient() {
		long ret = bindings.LocalHTLCFailureReason_fee_insufficient();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason incorrect_cltvexpiry() {
		long ret = bindings.LocalHTLCFailureReason_incorrect_cltvexpiry();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooSoon-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason cltvexpiry_too_soon() {
		long ret = bindings.LocalHTLCFailureReason_cltvexpiry_too_soon();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IncorrectPaymentDetails-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason incorrect_payment_details() {
		long ret = bindings.LocalHTLCFailureReason_incorrect_payment_details();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectCLTVExpiry-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason final_incorrect_cltvexpiry() {
		long ret = bindings.LocalHTLCFailureReason_final_incorrect_cltvexpiry();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FinalIncorrectHTLCAmount-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason final_incorrect_htlcamount() {
		long ret = bindings.LocalHTLCFailureReason_final_incorrect_htlcamount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelDisabled-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason channel_disabled() {
		long ret = bindings.LocalHTLCFailureReason_channel_disabled();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CLTVExpiryTooFar-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason cltvexpiry_too_far() {
		long ret = bindings.LocalHTLCFailureReason_cltvexpiry_too_far();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionPayload-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_onion_payload() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_payload();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MPPTimeout-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason mpptimeout() {
		long ret = bindings.LocalHTLCFailureReason_mpptimeout();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidOnionBlinding-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_onion_blinding() {
		long ret = bindings.LocalHTLCFailureReason_invalid_onion_blinding();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownFailureCode-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason unknown_failure_code(short code) {
		long ret = bindings.LocalHTLCFailureReason_unknown_failure_code(code);
		Reference.reachabilityFence(code);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForwardExpiryBuffer-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason forward_expiry_buffer() {
		long ret = bindings.LocalHTLCFailureReason_forward_expiry_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolineForward-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_trampoline_forward() {
		long ret = bindings.LocalHTLCFailureReason_invalid_trampoline_forward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentClaimBuffer-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason payment_claim_buffer() {
		long ret = bindings.LocalHTLCFailureReason_payment_claim_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitHolder-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason dust_limit_holder() {
		long ret = bindings.LocalHTLCFailureReason_dust_limit_holder();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DustLimitCounterparty-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason dust_limit_counterparty() {
		long ret = bindings.LocalHTLCFailureReason_dust_limit_counterparty();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new FeeSpikeBuffer-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason fee_spike_buffer() {
		long ret = bindings.LocalHTLCFailureReason_fee_spike_buffer();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PrivateChannelForward-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason private_channel_forward() {
		long ret = bindings.LocalHTLCFailureReason_private_channel_forward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RealSCIDForward-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason real_scidforward() {
		long ret = bindings.LocalHTLCFailureReason_real_scidforward();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelNotReady-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason channel_not_ready() {
		long ret = bindings.LocalHTLCFailureReason_channel_not_ready();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidKeysendPreimage-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_keysend_preimage() {
		long ret = bindings.LocalHTLCFailureReason_invalid_keysend_preimage();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidTrampolinePayload-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason invalid_trampoline_payload() {
		long ret = bindings.LocalHTLCFailureReason_invalid_trampoline_payload();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PaymentSecretRequired-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason payment_secret_required() {
		long ret = bindings.LocalHTLCFailureReason_payment_secret_required();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutgoingCLTVTooSoon-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason outgoing_cltvtoo_soon() {
		long ret = bindings.LocalHTLCFailureReason_outgoing_cltvtoo_soon();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClosed-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason channel_closed() {
		long ret = bindings.LocalHTLCFailureReason_channel_closed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnChainTimeout-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason on_chain_timeout() {
		long ret = bindings.LocalHTLCFailureReason_on_chain_timeout();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ZeroAmount-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason zero_amount() {
		long ret = bindings.LocalHTLCFailureReason_zero_amount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMinimum-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason htlcminimum() {
		long ret = bindings.LocalHTLCFailureReason_htlcminimum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCMaximum-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason htlcmaximum() {
		long ret = bindings.LocalHTLCFailureReason_htlcmaximum();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PeerOffline-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason peer_offline() {
		long ret = bindings.LocalHTLCFailureReason_peer_offline();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelBalanceOverdrawn-variant LocalHTLCFailureReason
	 */
	public static LocalHTLCFailureReason channel_balance_overdrawn() {
		long ret = bindings.LocalHTLCFailureReason_channel_balance_overdrawn();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the LocalHTLCFailureReason.
	 */
	public long hash() {
		long ret = bindings.LocalHTLCFailureReason_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two LocalHTLCFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.LocalHTLCFailureReason b) {
		boolean ret = bindings.LocalHTLCFailureReason_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof LocalHTLCFailureReason)) return false;
		return this.eq((LocalHTLCFailureReason)o);
	}
	/**
	 * Build a LocalHTLCFailureReason from a u16
	 */
	public static LocalHTLCFailureReason from_u16(short f) {
		long ret = bindings.LocalHTLCFailureReason_from_u16(f);
		Reference.reachabilityFence(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.LocalHTLCFailureReason ret_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Read a LocalHTLCFailureReason from a byte array, created by LocalHTLCFailureReason_write
	 */
	public static Result_LocalHTLCFailureReasonDecodeErrorZ read(byte[] ser) {
		long ret = bindings.LocalHTLCFailureReason_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LocalHTLCFailureReasonDecodeErrorZ ret_hu_conv = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the LocalHTLCFailureReason object into a byte array which can be read by LocalHTLCFailureReason_read
	 */
	public byte[] write() {
		byte[] ret = bindings.LocalHTLCFailureReason_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

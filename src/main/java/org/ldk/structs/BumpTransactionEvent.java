package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Represents the different types of transactions, originating from LDK, to be bumped.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BumpTransactionEvent extends CommonBase {
	private BumpTransactionEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BumpTransactionEvent_free(ptr); }
	}
	static BumpTransactionEvent constr_from_ptr(long ptr) {
		bindings.LDKBumpTransactionEvent raw_val = bindings.LDKBumpTransactionEvent_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBumpTransactionEvent.ChannelClose.class) {
			return new ChannelClose(ptr, (bindings.LDKBumpTransactionEvent.ChannelClose)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBumpTransactionEvent.HTLCResolution.class) {
			return new HTLCResolution(ptr, (bindings.LDKBumpTransactionEvent.HTLCResolution)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Indicates that a channel featuring anchor outputs is to be closed by broadcasting the local
	 * commitment transaction. Since commitment transactions have a static feerate pre-agreed upon,
	 * they may need additional fees to be attached through a child transaction using the popular
	 * [Child-Pays-For-Parent](https://bitcoinops.org/en/topics/cpfp) fee bumping technique. This
	 * child transaction must include the anchor input described within `anchor_descriptor` along
	 * with additional inputs to meet the target feerate. Failure to meet the target feerate
	 * decreases the confirmation odds of the transaction package (which includes the commitment
	 * and child anchor transactions), possibly resulting in a loss of funds. Once the transaction
	 * is constructed, it must be fully signed for and broadcast by the consumer of the event
	 * along with the `commitment_tx` enclosed. Note that the `commitment_tx` must always be
	 * broadcast first, as the child anchor transaction depends on it.
	 * 
	 * The consumer should be able to sign for any of the additional inputs included within the
	 * child anchor transaction. To sign its anchor input, an [`EcdsaChannelSigner`] should be
	 * re-derived through [`AnchorDescriptor::derive_channel_signer`]. The anchor input signature
	 * can be computed with [`EcdsaChannelSigner::sign_holder_anchor_input`], which can then be
	 * provided to [`build_anchor_input_witness`] along with the `funding_pubkey` to obtain the
	 * full witness required to spend.
	 * 
	 * It is possible to receive more than one instance of this event if a valid child anchor
	 * transaction is never broadcast or is but not with a sufficient fee to be mined. Care should
	 * be taken by the consumer of the event to ensure any future iterations of the child anchor
	 * transaction adhere to the [Replace-By-Fee
	 * rules](https://github.com/bitcoin/bitcoin/blob/master/doc/policy/mempool-replacements.md)
	 * for fee bumps to be accepted into the mempool, and eventually the chain. As the frequency of
	 * these events is not user-controlled, users may ignore/drop the event if they are no longer
	 * able to commit external confirmed funds to the child anchor transaction.
	 * 
	 * The set of `pending_htlcs` on the commitment transaction to be broadcast can be inspected to
	 * determine whether a significant portion of the channel's funds are allocated to HTLCs,
	 * enabling users to make their own decisions regarding the importance of the commitment
	 * transaction's confirmation. Note that this is not required, but simply exists as an option
	 * for users to override LDK's behavior. On commitments with no HTLCs (indicated by those with
	 * an empty `pending_htlcs`), confirmation of the commitment transaction can be considered to
	 * be not urgent.
	 * 
	 * [`EcdsaChannelSigner`]: crate::sign::EcdsaChannelSigner
	 * [`EcdsaChannelSigner::sign_holder_anchor_input`]: crate::sign::EcdsaChannelSigner::sign_holder_anchor_input
	 * [`build_anchor_input_witness`]: crate::ln::chan_utils::build_anchor_input_witness
	 */
	public final static class ChannelClose extends BumpTransactionEvent {
		/**
		 * The unique identifier for the claim of the anchor output in the commitment transaction.
		 * 
		 * The identifier must map to the set of external UTXOs assigned to the claim, such that
		 * they can be reused when a new claim with the same identifier needs to be made, resulting
		 * in a fee-bumping attempt.
		*/
		public final byte[] claim_id;
		/**
		 * The target feerate that the transaction package, which consists of the commitment
		 * transaction and the to-be-crafted child anchor transaction, must meet.
		*/
		public final int package_target_feerate_sat_per_1000_weight;
		/**
		 * The channel's commitment transaction to bump the fee of. This transaction should be
		 * broadcast along with the anchor transaction constructed as a result of consuming this
		 * event.
		*/
		public final byte[] commitment_tx;
		/**
		 * The absolute fee in satoshis of the commitment transaction. This can be used along the
		 * with weight of the commitment transaction to determine its feerate.
		*/
		public final long commitment_tx_fee_satoshis;
		/**
		 * The descriptor to sign the anchor input of the anchor transaction constructed as a
		 * result of consuming this event.
		*/
		public final org.ldk.structs.AnchorDescriptor anchor_descriptor;
		/**
		 * The set of pending HTLCs on the commitment transaction that need to be resolved once the
		 * commitment transaction confirms.
		*/
		public final HTLCOutputInCommitment[] pending_htlcs;
		private ChannelClose(long ptr, bindings.LDKBumpTransactionEvent.ChannelClose obj) {
			super(null, ptr);
			this.claim_id = obj.claim_id;
			this.package_target_feerate_sat_per_1000_weight = obj.package_target_feerate_sat_per_1000_weight;
			this.commitment_tx = obj.commitment_tx;
			this.commitment_tx_fee_satoshis = obj.commitment_tx_fee_satoshis;
			long anchor_descriptor = obj.anchor_descriptor;
			org.ldk.structs.AnchorDescriptor anchor_descriptor_hu_conv = null; if (anchor_descriptor < 0 || anchor_descriptor > 4096) { anchor_descriptor_hu_conv = new org.ldk.structs.AnchorDescriptor(null, anchor_descriptor); }
			if (anchor_descriptor_hu_conv != null) { anchor_descriptor_hu_conv.ptrs_to.add(this); };
			this.anchor_descriptor = anchor_descriptor_hu_conv;
			long[] pending_htlcs = obj.pending_htlcs;
			int pending_htlcs_conv_24_len = pending_htlcs.length;
			HTLCOutputInCommitment[] pending_htlcs_conv_24_arr = new HTLCOutputInCommitment[pending_htlcs_conv_24_len];
			for (int y = 0; y < pending_htlcs_conv_24_len; y++) {
				long pending_htlcs_conv_24 = pending_htlcs[y];
				org.ldk.structs.HTLCOutputInCommitment pending_htlcs_conv_24_hu_conv = null; if (pending_htlcs_conv_24 < 0 || pending_htlcs_conv_24 > 4096) { pending_htlcs_conv_24_hu_conv = new org.ldk.structs.HTLCOutputInCommitment(null, pending_htlcs_conv_24); }
				if (pending_htlcs_conv_24_hu_conv != null) { pending_htlcs_conv_24_hu_conv.ptrs_to.add(this); };
				pending_htlcs_conv_24_arr[y] = pending_htlcs_conv_24_hu_conv;
			}
			this.pending_htlcs = pending_htlcs_conv_24_arr;
		}
	}
	/**
	 * Indicates that a channel featuring anchor outputs has unilaterally closed on-chain by a
	 * holder commitment transaction and its HTLC(s) need to be resolved on-chain. With the
	 * zero-HTLC-transaction-fee variant of anchor outputs, the pre-signed HTLC
	 * transactions have a zero fee, thus requiring additional inputs and/or outputs to be attached
	 * for a timely confirmation within the chain. These additional inputs and/or outputs must be
	 * appended to the resulting HTLC transaction to meet the target feerate. Failure to meet the
	 * target feerate decreases the confirmation odds of the transaction, possibly resulting in a
	 * loss of funds. Once the transaction meets the target feerate, it must be signed for and
	 * broadcast by the consumer of the event.
	 * 
	 * The consumer should be able to sign for any of the non-HTLC inputs added to the resulting
	 * HTLC transaction. To sign HTLC inputs, an [`EcdsaChannelSigner`] should be re-derived
	 * through [`HTLCDescriptor::derive_channel_signer`]. Each HTLC input's signature can be
	 * computed with [`EcdsaChannelSigner::sign_holder_htlc_transaction`], which can then be
	 * provided to [`HTLCDescriptor::tx_input_witness`] to obtain the fully signed witness required
	 * to spend.
	 * 
	 * It is possible to receive more than one instance of this event if a valid HTLC transaction
	 * is never broadcast or is but not with a sufficient fee to be mined. Care should be taken by
	 * the consumer of the event to ensure any future iterations of the HTLC transaction adhere to
	 * the [Replace-By-Fee
	 * rules](https://github.com/bitcoin/bitcoin/blob/master/doc/policy/mempool-replacements.md)
	 * for fee bumps to be accepted into the mempool, and eventually the chain. As the frequency of
	 * these events is not user-controlled, users may ignore/drop the event if either they are no
	 * longer able to commit external confirmed funds to the HTLC transaction or the fee committed
	 * to the HTLC transaction is greater in value than the HTLCs being claimed.
	 * 
	 * [`EcdsaChannelSigner`]: crate::sign::EcdsaChannelSigner
	 * [`EcdsaChannelSigner::sign_holder_htlc_transaction`]: crate::sign::EcdsaChannelSigner::sign_holder_htlc_transaction
	 * [`HTLCDescriptor::tx_input_witness`]: HTLCDescriptor::tx_input_witness
	 */
	public final static class HTLCResolution extends BumpTransactionEvent {
		/**
		 * The unique identifier for the claim of the HTLCs in the confirmed commitment
		 * transaction.
		 * 
		 * The identifier must map to the set of external UTXOs assigned to the claim, such that
		 * they can be reused when a new claim with the same identifier needs to be made, resulting
		 * in a fee-bumping attempt.
		*/
		public final byte[] claim_id;
		/**
		 * The target feerate that the resulting HTLC transaction must meet.
		*/
		public final int target_feerate_sat_per_1000_weight;
		/**
		 * The set of pending HTLCs on the confirmed commitment that need to be claimed, preferably
		 * by the same transaction.
		*/
		public final HTLCDescriptor[] htlc_descriptors;
		/**
		 * The locktime required for the resulting HTLC transaction.
		*/
		public final int tx_lock_time;
		private HTLCResolution(long ptr, bindings.LDKBumpTransactionEvent.HTLCResolution obj) {
			super(null, ptr);
			this.claim_id = obj.claim_id;
			this.target_feerate_sat_per_1000_weight = obj.target_feerate_sat_per_1000_weight;
			long[] htlc_descriptors = obj.htlc_descriptors;
			int htlc_descriptors_conv_16_len = htlc_descriptors.length;
			HTLCDescriptor[] htlc_descriptors_conv_16_arr = new HTLCDescriptor[htlc_descriptors_conv_16_len];
			for (int q = 0; q < htlc_descriptors_conv_16_len; q++) {
				long htlc_descriptors_conv_16 = htlc_descriptors[q];
				org.ldk.structs.HTLCDescriptor htlc_descriptors_conv_16_hu_conv = null; if (htlc_descriptors_conv_16 < 0 || htlc_descriptors_conv_16 > 4096) { htlc_descriptors_conv_16_hu_conv = new org.ldk.structs.HTLCDescriptor(null, htlc_descriptors_conv_16); }
				if (htlc_descriptors_conv_16_hu_conv != null) { htlc_descriptors_conv_16_hu_conv.ptrs_to.add(this); };
				htlc_descriptors_conv_16_arr[q] = htlc_descriptors_conv_16_hu_conv;
			}
			this.htlc_descriptors = htlc_descriptors_conv_16_arr;
			this.tx_lock_time = obj.tx_lock_time;
		}
	}
	long clone_ptr() {
		long ret = bindings.BumpTransactionEvent_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BumpTransactionEvent
	 */
	public BumpTransactionEvent clone() {
		long ret = bindings.BumpTransactionEvent_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEvent ret_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClose-variant BumpTransactionEvent
	 */
	public static BumpTransactionEvent channel_close(byte[] claim_id, int package_target_feerate_sat_per_1000_weight, byte[] commitment_tx, long commitment_tx_fee_satoshis, org.ldk.structs.AnchorDescriptor anchor_descriptor, HTLCOutputInCommitment[] pending_htlcs) {
		long ret = bindings.BumpTransactionEvent_channel_close(InternalUtils.check_arr_len(claim_id, 32), package_target_feerate_sat_per_1000_weight, commitment_tx, commitment_tx_fee_satoshis, anchor_descriptor == null ? 0 : anchor_descriptor.ptr, pending_htlcs != null ? Arrays.stream(pending_htlcs).mapToLong(pending_htlcs_conv_24 -> pending_htlcs_conv_24 == null ? 0 : pending_htlcs_conv_24.ptr).toArray() : null);
		Reference.reachabilityFence(claim_id);
		Reference.reachabilityFence(package_target_feerate_sat_per_1000_weight);
		Reference.reachabilityFence(commitment_tx);
		Reference.reachabilityFence(commitment_tx_fee_satoshis);
		Reference.reachabilityFence(anchor_descriptor);
		Reference.reachabilityFence(pending_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEvent ret_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(anchor_descriptor); };
		for (HTLCOutputInCommitment pending_htlcs_conv_24: pending_htlcs) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(pending_htlcs_conv_24); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCResolution-variant BumpTransactionEvent
	 */
	public static BumpTransactionEvent htlcresolution(byte[] claim_id, int target_feerate_sat_per_1000_weight, HTLCDescriptor[] htlc_descriptors, int tx_lock_time) {
		long ret = bindings.BumpTransactionEvent_htlcresolution(InternalUtils.check_arr_len(claim_id, 32), target_feerate_sat_per_1000_weight, htlc_descriptors != null ? Arrays.stream(htlc_descriptors).mapToLong(htlc_descriptors_conv_16 -> htlc_descriptors_conv_16 == null ? 0 : htlc_descriptors_conv_16.ptr).toArray() : null, tx_lock_time);
		Reference.reachabilityFence(claim_id);
		Reference.reachabilityFence(target_feerate_sat_per_1000_weight);
		Reference.reachabilityFence(htlc_descriptors);
		Reference.reachabilityFence(tx_lock_time);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEvent ret_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (HTLCDescriptor htlc_descriptors_conv_16: htlc_descriptors) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(htlc_descriptors_conv_16); }; };
		return ret_hu_conv;
	}

	/**
	 * Checks if two BumpTransactionEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.BumpTransactionEvent b) {
		boolean ret = bindings.BumpTransactionEvent_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BumpTransactionEvent)) return false;
		return this.eq((BumpTransactionEvent)o);
	}
}

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
	 * broadcast first, as the child anchor transaction depends on it. It is also possible that the
	 * feerate of the commitment transaction is already sufficient, in which case the child anchor
	 * transaction is not needed and only the commitment transaction should be broadcast.
	 * 
	 * In zero-fee commitment channels, the commitment transaction and the anchor transaction
	 * form a 1-parent-1-child package that conforms to BIP 431 (known as TRUC transactions).
	 * The anchor transaction must be version 3, and its size must be no more than 1000 vB.
	 * The anchor transaction is usually needed to bump the fee of the commitment transaction
	 * as the commitment transaction is not explicitly assigned any fees. In those cases the
	 * anchor transaction must be broadcast together with the commitment transaction as a
	 * `child-with-parents` package (usually using the Bitcoin Core `submitpackage` RPC).
	 * 
	 * The consumer should be able to sign for any of the additional inputs included within the
	 * child anchor transaction. To sign its keyed-anchor input, an [`EcdsaChannelSigner`] should
	 * be re-derived through [`SignerProvider::derive_channel_signer`]. The anchor input signature
	 * can be computed with [`EcdsaChannelSigner::sign_holder_keyed_anchor_input`], which can then
	 * be provided to [`build_keyed_anchor_input_witness`] along with the `funding_pubkey` to
	 * obtain the full witness required to spend. Note that no signature or witness data is
	 * required to spend the keyless anchor used in zero-fee commitment channels.
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
	 * [`EcdsaChannelSigner`]: crate::sign::ecdsa::EcdsaChannelSigner
	 * [`EcdsaChannelSigner::sign_holder_keyed_anchor_input`]: crate::sign::ecdsa::EcdsaChannelSigner::sign_holder_keyed_anchor_input
	 * [`build_keyed_anchor_input_witness`]: crate::ln::chan_utils::build_keyed_anchor_input_witness
	 */
	public final static class ChannelClose extends BumpTransactionEvent {
		/**
		 * The `channel_id` of the channel which has been closed.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * Counterparty in the closed channel.
		*/
		public final byte[] counterparty_node_id;
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
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
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
	 * holder commitment transaction and its HTLC(s) need to be resolved on-chain. In all such
	 * channels, the pre-signed HTLC transactions have a zero fee, thus requiring additional
	 * inputs and/or outputs to be attached for a timely confirmation within the chain. These
	 * additional inputs and/or outputs must be appended to the resulting HTLC transaction to
	 * meet the target feerate. Failure to meet the target feerate decreases the confirmation
	 * odds of the transaction, possibly resulting in a loss of funds. Once the transaction
	 * meets the target feerate, it must be signed for and broadcast by the consumer of the
	 * event.
	 * 
	 * In zero-fee commitment channels, you must set the version of the HTLC claim transaction
	 * to version 3 as the counterparty's signature commits to the version of
	 * the transaction. You must also make sure that this claim transaction does not grow
	 * bigger than 10,000 vB, the maximum vsize of any TRUC transaction as specified in
	 * BIP 431. It is possible for [`htlc_descriptors`] to be long enough such
	 * that claiming all the HTLCs therein in a single transaction would exceed this limit.
	 * In this case, you must claim all the HTLCs in [`htlc_descriptors`] using multiple
	 * transactions. Finally, note that while HTLCs in zero-fee commitment channels no
	 * longer have the 1 CSV lock, LDK will still emit this event only after the commitment
	 * transaction has 1 confirmation.
	 * 
	 * The consumer should be able to sign for any of the non-HTLC inputs added to the resulting
	 * HTLC transaction. To sign HTLC inputs, an [`EcdsaChannelSigner`] should be re-derived
	 * through [`SignerProvider::derive_channel_signer`]. Each HTLC input's signature can be
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
	 * [`EcdsaChannelSigner`]: crate::sign::ecdsa::EcdsaChannelSigner
	 * [`EcdsaChannelSigner::sign_holder_htlc_transaction`]: crate::sign::ecdsa::EcdsaChannelSigner::sign_holder_htlc_transaction
	 * [`htlc_descriptors`]: `BumpTransactionEvent::HTLCResolution::htlc_descriptors`
	 */
	public final static class HTLCResolution extends BumpTransactionEvent {
		/**
		 * The `channel_id` of the channel which has been closed.
		*/
		public final org.ldk.structs.ChannelId channel_id;
		/**
		 * Counterparty in the closed channel.
		*/
		public final byte[] counterparty_node_id;
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
			long channel_id = obj.channel_id;
			org.ldk.structs.ChannelId channel_id_hu_conv = null; if (channel_id < 0 || channel_id > 4096) { channel_id_hu_conv = new org.ldk.structs.ChannelId(null, channel_id); }
			if (channel_id_hu_conv != null) { channel_id_hu_conv.ptrs_to.add(this); };
			this.channel_id = channel_id_hu_conv;
			this.counterparty_node_id = obj.counterparty_node_id;
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
	public static BumpTransactionEvent channel_close(org.ldk.structs.ChannelId channel_id, byte[] counterparty_node_id, byte[] claim_id, int package_target_feerate_sat_per_1000_weight, byte[] commitment_tx, long commitment_tx_fee_satoshis, org.ldk.structs.AnchorDescriptor anchor_descriptor, HTLCOutputInCommitment[] pending_htlcs) {
		long ret = bindings.BumpTransactionEvent_channel_close(channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), InternalUtils.check_arr_len(claim_id, 32), package_target_feerate_sat_per_1000_weight, commitment_tx, commitment_tx_fee_satoshis, anchor_descriptor.ptr, pending_htlcs != null ? Arrays.stream(pending_htlcs).mapToLong(pending_htlcs_conv_24 -> pending_htlcs_conv_24.ptr).toArray() : null);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(claim_id);
		Reference.reachabilityFence(package_target_feerate_sat_per_1000_weight);
		Reference.reachabilityFence(commitment_tx);
		Reference.reachabilityFence(commitment_tx_fee_satoshis);
		Reference.reachabilityFence(anchor_descriptor);
		Reference.reachabilityFence(pending_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEvent ret_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCResolution-variant BumpTransactionEvent
	 */
	public static BumpTransactionEvent htlcresolution(org.ldk.structs.ChannelId channel_id, byte[] counterparty_node_id, byte[] claim_id, int target_feerate_sat_per_1000_weight, HTLCDescriptor[] htlc_descriptors, int tx_lock_time) {
		long ret = bindings.BumpTransactionEvent_htlcresolution(channel_id.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), InternalUtils.check_arr_len(claim_id, 32), target_feerate_sat_per_1000_weight, htlc_descriptors != null ? Arrays.stream(htlc_descriptors).mapToLong(htlc_descriptors_conv_16 -> htlc_descriptors_conv_16.ptr).toArray() : null, tx_lock_time);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(claim_id);
		Reference.reachabilityFence(target_feerate_sat_per_1000_weight);
		Reference.reachabilityFence(htlc_descriptors);
		Reference.reachabilityFence(tx_lock_time);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BumpTransactionEvent ret_hu_conv = org.ldk.structs.BumpTransactionEvent.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two BumpTransactionEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.BumpTransactionEvent b) {
		boolean ret = bindings.BumpTransactionEvent_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BumpTransactionEvent)) return false;
		return this.eq((BumpTransactionEvent)o);
	}
}

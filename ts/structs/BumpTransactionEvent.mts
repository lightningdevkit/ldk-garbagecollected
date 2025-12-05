
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Represents the different types of transactions, originating from LDK, to be bumped.
 */
export class BumpTransactionEvent extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.BumpTransactionEvent_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): BumpTransactionEvent {
		const raw_ty: number = bindings.LDKBumpTransactionEvent_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new BumpTransactionEvent_ChannelClose(ptr);
			case 1: return new BumpTransactionEvent_HTLCResolution(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BumpTransactionEvent_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BumpTransactionEvent
	 */
	public clone(): BumpTransactionEvent {
		const ret: bigint = bindings.BumpTransactionEvent_clone(this.ptr);
		const ret_hu_conv: BumpTransactionEvent = BumpTransactionEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelClose-variant BumpTransactionEvent
	 */
	public static constructor_channel_close(channel_id: ChannelId, counterparty_node_id: Uint8Array, claim_id: Uint8Array, package_target_feerate_sat_per_1000_weight: number, commitment_tx: Uint8Array, commitment_tx_fee_satoshis: bigint, anchor_descriptor: AnchorDescriptor, pending_htlcs: HTLCOutputInCommitment[]): BumpTransactionEvent {
		const ret: bigint = bindings.BumpTransactionEvent_channel_close(CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint8Array(claim_id), package_target_feerate_sat_per_1000_weight, bindings.encodeUint8Array(commitment_tx), commitment_tx_fee_satoshis, CommonBase.get_ptr_of(anchor_descriptor), bindings.encodeUint64Array(pending_htlcs.map(pending_htlcs_conv_24 => CommonBase.get_ptr_of(pending_htlcs_conv_24))));
		const ret_hu_conv: BumpTransactionEvent = BumpTransactionEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HTLCResolution-variant BumpTransactionEvent
	 */
	public static constructor_htlcresolution(channel_id: ChannelId, counterparty_node_id: Uint8Array, claim_id: Uint8Array, target_feerate_sat_per_1000_weight: number, htlc_descriptors: HTLCDescriptor[], tx_lock_time: number): BumpTransactionEvent {
		const ret: bigint = bindings.BumpTransactionEvent_htlcresolution(CommonBase.get_ptr_of(channel_id), bindings.encodeUint8Array(counterparty_node_id), bindings.encodeUint8Array(claim_id), target_feerate_sat_per_1000_weight, bindings.encodeUint64Array(htlc_descriptors.map(htlc_descriptors_conv_16 => CommonBase.get_ptr_of(htlc_descriptors_conv_16))), tx_lock_time);
		const ret_hu_conv: BumpTransactionEvent = BumpTransactionEvent.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two BumpTransactionEvents contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: BumpTransactionEvent): boolean {
		const ret: boolean = bindings.BumpTransactionEvent_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A BumpTransactionEvent of type ChannelClose */
export class BumpTransactionEvent_ChannelClose extends BumpTransactionEvent {
	/**
	 * The `channel_id` of the channel which has been closed.
	 */
	public channel_id: ChannelId;
	/**
	 * Counterparty in the closed channel.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The unique identifier for the claim of the anchor output in the commitment transaction.
	 * 
	 * The identifier must map to the set of external UTXOs assigned to the claim, such that
	 * they can be reused when a new claim with the same identifier needs to be made, resulting
	 * in a fee-bumping attempt.
	 */
	public claim_id: Uint8Array;
	/**
	 * The target feerate that the transaction package, which consists of the commitment
	 * transaction and the to-be-crafted child anchor transaction, must meet.
	 */
	public package_target_feerate_sat_per_1000_weight: number;
	/**
	 * The channel's commitment transaction to bump the fee of. This transaction should be
	 * broadcast along with the anchor transaction constructed as a result of consuming this
	 * event.
	 */
	public commitment_tx: Uint8Array;
	/**
	 * The absolute fee in satoshis of the commitment transaction. This can be used along the
	 * with weight of the commitment transaction to determine its feerate.
	 */
	public commitment_tx_fee_satoshis: bigint;
	/**
	 * The descriptor to sign the anchor input of the anchor transaction constructed as a
	 * result of consuming this event.
	 */
	public anchor_descriptor: AnchorDescriptor;
	/**
	 * The set of pending HTLCs on the commitment transaction that need to be resolved once the
	 * commitment transaction confirms.
	 */
	public pending_htlcs: HTLCOutputInCommitment[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKBumpTransactionEvent_ChannelClose_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKBumpTransactionEvent_ChannelClose_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const claim_id: number = bindings.LDKBumpTransactionEvent_ChannelClose_get_claim_id(ptr);
		const claim_id_conv: Uint8Array = bindings.decodeUint8Array(claim_id);
		this.claim_id = claim_id_conv;
		this.package_target_feerate_sat_per_1000_weight = bindings.LDKBumpTransactionEvent_ChannelClose_get_package_target_feerate_sat_per_1000_weight(ptr);
		const commitment_tx: number = bindings.LDKBumpTransactionEvent_ChannelClose_get_commitment_tx(ptr);
		const commitment_tx_conv: Uint8Array = bindings.decodeUint8Array(commitment_tx);
		this.commitment_tx = commitment_tx_conv;
		this.commitment_tx_fee_satoshis = bindings.LDKBumpTransactionEvent_ChannelClose_get_commitment_tx_fee_satoshis(ptr);
		const anchor_descriptor: bigint = bindings.LDKBumpTransactionEvent_ChannelClose_get_anchor_descriptor(ptr);
		const anchor_descriptor_hu_conv: AnchorDescriptor = new AnchorDescriptor(null, anchor_descriptor);
			CommonBase.add_ref_from(anchor_descriptor_hu_conv, this);
		this.anchor_descriptor = anchor_descriptor_hu_conv;
		const pending_htlcs: number = bindings.LDKBumpTransactionEvent_ChannelClose_get_pending_htlcs(ptr);
		const pending_htlcs_conv_24_len: number = bindings.getArrayLength(pending_htlcs);
			const pending_htlcs_conv_24_arr: HTLCOutputInCommitment[] = new Array(pending_htlcs_conv_24_len).fill(null);
			for (var y = 0; y < pending_htlcs_conv_24_len; y++) {
				const pending_htlcs_conv_24: bigint = bindings.getU64ArrayElem(pending_htlcs, y);
				const pending_htlcs_conv_24_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, pending_htlcs_conv_24);
				CommonBase.add_ref_from(pending_htlcs_conv_24_hu_conv, this);
				pending_htlcs_conv_24_arr[y] = pending_htlcs_conv_24_hu_conv;
			}
			bindings.freeWasmMemory(pending_htlcs)
		this.pending_htlcs = pending_htlcs_conv_24_arr;
	}
}
/** A BumpTransactionEvent of type HTLCResolution */
export class BumpTransactionEvent_HTLCResolution extends BumpTransactionEvent {
	/**
	 * The `channel_id` of the channel which has been closed.
	 */
	public channel_id: ChannelId;
	/**
	 * Counterparty in the closed channel.
	 */
	public counterparty_node_id: Uint8Array;
	/**
	 * The unique identifier for the claim of the HTLCs in the confirmed commitment
	 * transaction.
	 * 
	 * The identifier must map to the set of external UTXOs assigned to the claim, such that
	 * they can be reused when a new claim with the same identifier needs to be made, resulting
	 * in a fee-bumping attempt.
	 */
	public claim_id: Uint8Array;
	/**
	 * The target feerate that the resulting HTLC transaction must meet.
	 */
	public target_feerate_sat_per_1000_weight: number;
	/**
	 * The set of pending HTLCs on the confirmed commitment that need to be claimed, preferably
	 * by the same transaction.
	 */
	public htlc_descriptors: HTLCDescriptor[];
	/**
	 * The locktime required for the resulting HTLC transaction.
	 */
	public tx_lock_time: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_id: bigint = bindings.LDKBumpTransactionEvent_HTLCResolution_get_channel_id(ptr);
		const channel_id_hu_conv: ChannelId = new ChannelId(null, channel_id);
			CommonBase.add_ref_from(channel_id_hu_conv, this);
		this.channel_id = channel_id_hu_conv;
		const counterparty_node_id: number = bindings.LDKBumpTransactionEvent_HTLCResolution_get_counterparty_node_id(ptr);
		const counterparty_node_id_conv: Uint8Array = bindings.decodeUint8Array(counterparty_node_id);
		this.counterparty_node_id = counterparty_node_id_conv;
		const claim_id: number = bindings.LDKBumpTransactionEvent_HTLCResolution_get_claim_id(ptr);
		const claim_id_conv: Uint8Array = bindings.decodeUint8Array(claim_id);
		this.claim_id = claim_id_conv;
		this.target_feerate_sat_per_1000_weight = bindings.LDKBumpTransactionEvent_HTLCResolution_get_target_feerate_sat_per_1000_weight(ptr);
		const htlc_descriptors: number = bindings.LDKBumpTransactionEvent_HTLCResolution_get_htlc_descriptors(ptr);
		const htlc_descriptors_conv_16_len: number = bindings.getArrayLength(htlc_descriptors);
			const htlc_descriptors_conv_16_arr: HTLCDescriptor[] = new Array(htlc_descriptors_conv_16_len).fill(null);
			for (var q = 0; q < htlc_descriptors_conv_16_len; q++) {
				const htlc_descriptors_conv_16: bigint = bindings.getU64ArrayElem(htlc_descriptors, q);
				const htlc_descriptors_conv_16_hu_conv: HTLCDescriptor = new HTLCDescriptor(null, htlc_descriptors_conv_16);
				CommonBase.add_ref_from(htlc_descriptors_conv_16_hu_conv, this);
				htlc_descriptors_conv_16_arr[q] = htlc_descriptors_conv_16_hu_conv;
			}
			bindings.freeWasmMemory(htlc_descriptors)
		this.htlc_descriptors = htlc_descriptors_conv_16_arr;
		this.tx_lock_time = bindings.LDKBumpTransactionEvent_HTLCResolution_get_tx_lock_time(ptr);
	}
}

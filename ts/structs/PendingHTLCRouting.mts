
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Information about where a received HTLC('s onion) has indicated the HTLC should go.
 */
export class PendingHTLCRouting extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PendingHTLCRouting_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PendingHTLCRouting {
		const raw_ty: number = bindings.LDKPendingHTLCRouting_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PendingHTLCRouting_Forward(ptr);
			case 1: return new PendingHTLCRouting_TrampolineForward(ptr);
			case 2: return new PendingHTLCRouting_Receive(ptr);
			case 3: return new PendingHTLCRouting_ReceiveKeysend(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PendingHTLCRouting_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PendingHTLCRouting
	 */
	public clone(): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCRouting_clone(this.ptr);
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PendingHTLCRouting
	 */
	public static constructor_forward(onion_packet: OnionPacket, short_channel_id: bigint, blinded: BlindedForward, incoming_cltv_expiry: Option_u32Z, hold_htlc: COption_NoneZ): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCRouting_forward(CommonBase.get_ptr_of(onion_packet), short_channel_id, CommonBase.get_ptr_of(blinded), CommonBase.get_ptr_of(incoming_cltv_expiry), hold_htlc);
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TrampolineForward-variant PendingHTLCRouting
	 */
	public static constructor_trampoline_forward(incoming_shared_secret: Uint8Array, onion_packet: TrampolineOnionPacket, node_id: Uint8Array, blinded: BlindedForward, incoming_cltv_expiry: number): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCRouting_trampoline_forward(bindings.encodeUint8Array(incoming_shared_secret), CommonBase.get_ptr_of(onion_packet), bindings.encodeUint8Array(node_id), CommonBase.get_ptr_of(blinded), incoming_cltv_expiry);
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant PendingHTLCRouting
	 */
	public static constructor_receive(payment_data: FinalOnionHopData, payment_metadata: Option_CVec_u8ZZ, payment_context: Option_PaymentContextZ, incoming_cltv_expiry: number, phantom_shared_secret: Uint8Array, custom_tlvs: TwoTuple_u64CVec_u8ZZ[], requires_blinded_error: boolean): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCRouting_receive(CommonBase.get_ptr_of(payment_data), CommonBase.get_ptr_of(payment_metadata), CommonBase.get_ptr_of(payment_context), incoming_cltv_expiry, bindings.encodeUint8Array(phantom_shared_secret), bindings.encodeUint64Array(custom_tlvs.map(custom_tlvs_conv_23 => CommonBase.get_ptr_of(custom_tlvs_conv_23))), requires_blinded_error);
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReceiveKeysend-variant PendingHTLCRouting
	 */
	public static constructor_receive_keysend(payment_data: FinalOnionHopData, payment_preimage: Uint8Array, payment_metadata: Option_CVec_u8ZZ, incoming_cltv_expiry: number, custom_tlvs: TwoTuple_u64CVec_u8ZZ[], requires_blinded_error: boolean, has_recipient_created_payment_secret: boolean, invoice_request: InvoiceRequest, payment_context: Option_PaymentContextZ): PendingHTLCRouting {
		const ret: bigint = bindings.PendingHTLCRouting_receive_keysend(CommonBase.get_ptr_of(payment_data), bindings.encodeUint8Array(payment_preimage), CommonBase.get_ptr_of(payment_metadata), incoming_cltv_expiry, bindings.encodeUint64Array(custom_tlvs.map(custom_tlvs_conv_23 => CommonBase.get_ptr_of(custom_tlvs_conv_23))), requires_blinded_error, has_recipient_created_payment_secret, CommonBase.get_ptr_of(invoice_request), CommonBase.get_ptr_of(payment_context));
		const ret_hu_conv: PendingHTLCRouting = PendingHTLCRouting.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PendingHTLCRouting object into a byte array which can be read by PendingHTLCRouting_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PendingHTLCRouting_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PendingHTLCRouting from a byte array, created by PendingHTLCRouting_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PendingHTLCRoutingDecodeErrorZ {
		const ret: bigint = bindings.PendingHTLCRouting_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PendingHTLCRoutingDecodeErrorZ = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A PendingHTLCRouting of type Forward */
export class PendingHTLCRouting_Forward extends PendingHTLCRouting {
	/**
	 * The onion which should be included in the forwarded HTLC, telling the next hop what to
	 * do with the HTLC.
	 */
	public onion_packet: OnionPacket;
	/**
	 * The short channel ID of the channel which we were instructed to forward this HTLC to.
	 * 
	 * This could be a real on-chain SCID, an SCID alias, or some other SCID which has meaning
	 * to the receiving node, such as one returned from
	 * [`ChannelManager::get_intercept_scid`] or [`ChannelManager::get_phantom_scid`].
	 */
	public short_channel_id: bigint;
	/**
	 * Set if this HTLC is being forwarded within a blinded path.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public blinded: BlindedForward;
	/**
	 * The absolute CLTV of the inbound HTLC
	 */
	public incoming_cltv_expiry: Option_u32Z;
	/**
	 * Whether this HTLC should be held by our node until we receive a corresponding
	 * [`ReleaseHeldHtlc`] onion message.
	 */
	public hold_htlc: COption_NoneZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const onion_packet: bigint = bindings.LDKPendingHTLCRouting_Forward_get_onion_packet(ptr);
		const onion_packet_hu_conv: OnionPacket = new OnionPacket(null, onion_packet);
			CommonBase.add_ref_from(onion_packet_hu_conv, this);
		this.onion_packet = onion_packet_hu_conv;
		this.short_channel_id = bindings.LDKPendingHTLCRouting_Forward_get_short_channel_id(ptr);
		const blinded: bigint = bindings.LDKPendingHTLCRouting_Forward_get_blinded(ptr);
		const blinded_hu_conv: BlindedForward = new BlindedForward(null, blinded);
			CommonBase.add_ref_from(blinded_hu_conv, this);
		this.blinded = blinded_hu_conv;
		const incoming_cltv_expiry: bigint = bindings.LDKPendingHTLCRouting_Forward_get_incoming_cltv_expiry(ptr);
		const incoming_cltv_expiry_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(incoming_cltv_expiry);
			CommonBase.add_ref_from(incoming_cltv_expiry_hu_conv, this);
		this.incoming_cltv_expiry = incoming_cltv_expiry_hu_conv;
		this.hold_htlc = bindings.LDKPendingHTLCRouting_Forward_get_hold_htlc(ptr);
	}
}
/** A PendingHTLCRouting of type TrampolineForward */
export class PendingHTLCRouting_TrampolineForward extends PendingHTLCRouting {
	/**
	 * The onion shared secret we build with the sender (or the preceding Trampoline node) used
	 * to decrypt the onion.
	 * 
	 * This is later used to encrypt failure packets in the event that the HTLC is failed.
	 */
	public incoming_shared_secret: Uint8Array;
	/**
	 * The onion which should be included in the forwarded HTLC, telling the next hop what to
	 * do with the HTLC.
	 */
	public onion_packet: TrampolineOnionPacket;
	/**
	 * The node ID of the Trampoline node which we need to route this HTLC to.
	 */
	public node_id: Uint8Array;
	/**
	 * Set if this HTLC is being forwarded within a blinded path.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public blinded: BlindedForward;
	/**
	 * The absolute CLTV of the inbound HTLC
	 */
	public incoming_cltv_expiry: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const incoming_shared_secret: number = bindings.LDKPendingHTLCRouting_TrampolineForward_get_incoming_shared_secret(ptr);
		const incoming_shared_secret_conv: Uint8Array = bindings.decodeUint8Array(incoming_shared_secret);
		this.incoming_shared_secret = incoming_shared_secret_conv;
		const onion_packet: bigint = bindings.LDKPendingHTLCRouting_TrampolineForward_get_onion_packet(ptr);
		const onion_packet_hu_conv: TrampolineOnionPacket = new TrampolineOnionPacket(null, onion_packet);
			CommonBase.add_ref_from(onion_packet_hu_conv, this);
		this.onion_packet = onion_packet_hu_conv;
		const node_id: number = bindings.LDKPendingHTLCRouting_TrampolineForward_get_node_id(ptr);
		const node_id_conv: Uint8Array = bindings.decodeUint8Array(node_id);
		this.node_id = node_id_conv;
		const blinded: bigint = bindings.LDKPendingHTLCRouting_TrampolineForward_get_blinded(ptr);
		const blinded_hu_conv: BlindedForward = new BlindedForward(null, blinded);
			CommonBase.add_ref_from(blinded_hu_conv, this);
		this.blinded = blinded_hu_conv;
		this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_TrampolineForward_get_incoming_cltv_expiry(ptr);
	}
}
/** A PendingHTLCRouting of type Receive */
export class PendingHTLCRouting_Receive extends PendingHTLCRouting {
	/**
	 * Information about the amount the sender intended to pay and (potential) proof that this
	 * is a payment for an invoice we generated. This proof of payment is is also used for
	 * linking MPP parts of a larger payment.
	 */
	public payment_data: FinalOnionHopData;
	/**
	 * Additional data which we (allegedly) instructed the sender to include in the onion.
	 * 
	 * For HTLCs received by LDK, this will ultimately be exposed in
	 * [`Event::PaymentClaimable::onion_fields`] as
	 * [`RecipientOnionFields::payment_metadata`].
	 */
	public payment_metadata: Option_CVec_u8ZZ;
	/**
	 * The context of the payment included by the recipient in a blinded path, or `None` if a
	 * blinded path was not used.
	 * 
	 * Used in part to determine the [`events::PaymentPurpose`].
	 */
	public payment_context: Option_PaymentContextZ;
	/**
	 * CLTV expiry of the received HTLC.
	 * 
	 * Used to track when we should expire pending HTLCs that go unclaimed.
	 */
	public incoming_cltv_expiry: number;
	/**
	 * If the onion had forwarding instructions to one of our phantom node SCIDs, this will
	 * provide the onion shared secret used to decrypt the next level of forwarding
	 * instructions.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public phantom_shared_secret: Uint8Array;
	/**
	 * Custom TLVs which were set by the sender.
	 * 
	 * For HTLCs received by LDK, this will ultimately be exposed in
	 * [`Event::PaymentClaimable::onion_fields`] as
	 * [`RecipientOnionFields::custom_tlvs`].
	 */
	public custom_tlvs: TwoTuple_u64CVec_u8ZZ[];
	/**
	 * Set if this HTLC is the final hop in a multi-hop blinded path.
	 */
	public requires_blinded_error: boolean;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_data: bigint = bindings.LDKPendingHTLCRouting_Receive_get_payment_data(ptr);
		const payment_data_hu_conv: FinalOnionHopData = new FinalOnionHopData(null, payment_data);
			CommonBase.add_ref_from(payment_data_hu_conv, this);
		this.payment_data = payment_data_hu_conv;
		const payment_metadata: bigint = bindings.LDKPendingHTLCRouting_Receive_get_payment_metadata(ptr);
		const payment_metadata_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			CommonBase.add_ref_from(payment_metadata_hu_conv, this);
		this.payment_metadata = payment_metadata_hu_conv;
		const payment_context: bigint = bindings.LDKPendingHTLCRouting_Receive_get_payment_context(ptr);
		const payment_context_hu_conv: Option_PaymentContextZ = Option_PaymentContextZ.constr_from_ptr(payment_context);
			CommonBase.add_ref_from(payment_context_hu_conv, this);
		this.payment_context = payment_context_hu_conv;
		this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_Receive_get_incoming_cltv_expiry(ptr);
		const phantom_shared_secret: number = bindings.LDKPendingHTLCRouting_Receive_get_phantom_shared_secret(ptr);
		const phantom_shared_secret_conv: Uint8Array = bindings.decodeUint8Array(phantom_shared_secret);
		this.phantom_shared_secret = phantom_shared_secret_conv;
		const custom_tlvs: number = bindings.LDKPendingHTLCRouting_Receive_get_custom_tlvs(ptr);
		const custom_tlvs_conv_23_len: number = bindings.getArrayLength(custom_tlvs);
			const custom_tlvs_conv_23_arr: TwoTuple_u64CVec_u8ZZ[] = new Array(custom_tlvs_conv_23_len).fill(null);
			for (var x = 0; x < custom_tlvs_conv_23_len; x++) {
				const custom_tlvs_conv_23: bigint = bindings.getU64ArrayElem(custom_tlvs, x);
				const custom_tlvs_conv_23_hu_conv: TwoTuple_u64CVec_u8ZZ = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				CommonBase.add_ref_from(custom_tlvs_conv_23_hu_conv, this);
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			bindings.freeWasmMemory(custom_tlvs)
		this.custom_tlvs = custom_tlvs_conv_23_arr;
		this.requires_blinded_error = bindings.LDKPendingHTLCRouting_Receive_get_requires_blinded_error(ptr);
	}
}
/** A PendingHTLCRouting of type ReceiveKeysend */
export class PendingHTLCRouting_ReceiveKeysend extends PendingHTLCRouting {
	/**
	 * Information about the amount the sender intended to pay and possibly a token to
	 * associate MPP parts of a larger payment.
	 * 
	 * This will only be filled in if receiving MPP keysend payments is enabled, and it being
	 * present will cause deserialization to fail on versions of LDK prior to 0.0.116.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payment_data: FinalOnionHopData;
	/**
	 * Preimage for this onion payment. This preimage is provided by the sender and will be
	 * used to settle the spontaneous payment.
	 */
	public payment_preimage: Uint8Array;
	/**
	 * Additional data which we (allegedly) instructed the sender to include in the onion.
	 * 
	 * For HTLCs received by LDK, this will ultimately bubble back up as
	 * [`RecipientOnionFields::payment_metadata`].
	 */
	public payment_metadata: Option_CVec_u8ZZ;
	/**
	 * CLTV expiry of the received HTLC.
	 * 
	 * Used to track when we should expire pending HTLCs that go unclaimed.
	 */
	public incoming_cltv_expiry: number;
	/**
	 * Custom TLVs which were set by the sender.
	 * 
	 * For HTLCs received by LDK, these will ultimately bubble back up as
	 * [`RecipientOnionFields::custom_tlvs`].
	 */
	public custom_tlvs: TwoTuple_u64CVec_u8ZZ[];
	/**
	 * Set if this HTLC is the final hop in a multi-hop blinded path.
	 */
	public requires_blinded_error: boolean;
	/**
	 * Set if we are receiving a keysend to a blinded path, meaning we created the
	 * [`PaymentSecret`] and should verify it using our
	 * [`NodeSigner::get_expanded_key`].
	 */
	public has_recipient_created_payment_secret: boolean;
	/**
	 * The [`InvoiceRequest`] associated with the [`Offer`] corresponding to this payment.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public invoice_request: InvoiceRequest;
	/**
	 * The context of the payment included by the recipient in a blinded path, or `None` if a
	 * blinded path was not used.
	 * 
	 * Used in part to determine the [`events::PaymentPurpose`].
	 */
	public payment_context: Option_PaymentContextZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_data: bigint = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_data(ptr);
		const payment_data_hu_conv: FinalOnionHopData = new FinalOnionHopData(null, payment_data);
			CommonBase.add_ref_from(payment_data_hu_conv, this);
		this.payment_data = payment_data_hu_conv;
		const payment_preimage: number = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_preimage(ptr);
		const payment_preimage_conv: Uint8Array = bindings.decodeUint8Array(payment_preimage);
		this.payment_preimage = payment_preimage_conv;
		const payment_metadata: bigint = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_metadata(ptr);
		const payment_metadata_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			CommonBase.add_ref_from(payment_metadata_hu_conv, this);
		this.payment_metadata = payment_metadata_hu_conv;
		this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_incoming_cltv_expiry(ptr);
		const custom_tlvs: number = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_custom_tlvs(ptr);
		const custom_tlvs_conv_23_len: number = bindings.getArrayLength(custom_tlvs);
			const custom_tlvs_conv_23_arr: TwoTuple_u64CVec_u8ZZ[] = new Array(custom_tlvs_conv_23_len).fill(null);
			for (var x = 0; x < custom_tlvs_conv_23_len; x++) {
				const custom_tlvs_conv_23: bigint = bindings.getU64ArrayElem(custom_tlvs, x);
				const custom_tlvs_conv_23_hu_conv: TwoTuple_u64CVec_u8ZZ = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				CommonBase.add_ref_from(custom_tlvs_conv_23_hu_conv, this);
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			bindings.freeWasmMemory(custom_tlvs)
		this.custom_tlvs = custom_tlvs_conv_23_arr;
		this.requires_blinded_error = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_requires_blinded_error(ptr);
		this.has_recipient_created_payment_secret = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_has_recipient_created_payment_secret(ptr);
		const invoice_request: bigint = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_invoice_request(ptr);
		const invoice_request_hu_conv: InvoiceRequest = new InvoiceRequest(null, invoice_request);
			CommonBase.add_ref_from(invoice_request_hu_conv, this);
		this.invoice_request = invoice_request_hu_conv;
		const payment_context: bigint = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_context(ptr);
		const payment_context_hu_conv: Option_PaymentContextZ = Option_PaymentContextZ.constr_from_ptr(payment_context);
			CommonBase.add_ref_from(payment_context_hu_conv, this);
		this.payment_context = payment_context_hu_conv;
	}
}

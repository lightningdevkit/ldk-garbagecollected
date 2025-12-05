using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Information about where a received HTLC('s onion) has indicated the HTLC should go.
 */
public class PendingHTLCRouting : CommonBase {
	protected PendingHTLCRouting(object _dummy, long ptr) : base(ptr) { }
	~PendingHTLCRouting() {
		if (ptr != 0) { bindings.PendingHTLCRouting_free(ptr); }
	}

	internal static PendingHTLCRouting constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPendingHTLCRouting_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PendingHTLCRouting_Forward(ptr);
			case 1: return new PendingHTLCRouting_TrampolineForward(ptr);
			case 2: return new PendingHTLCRouting_Receive(ptr);
			case 3: return new PendingHTLCRouting_ReceiveKeysend(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PendingHTLCRouting of type Forward */
	public class PendingHTLCRouting_Forward : PendingHTLCRouting {
		/**
		 * The onion which should be included in the forwarded HTLC, telling the next hop what to
		 * do with the HTLC.
		 */
		public org.ldk.structs.OnionPacket onion_packet;
		/**
		 * The short channel ID of the channel which we were instructed to forward this HTLC to.
		 * 
		 * This could be a real on-chain SCID, an SCID alias, or some other SCID which has meaning
		 * to the receiving node, such as one returned from
		 * [`ChannelManager::get_intercept_scid`] or [`ChannelManager::get_phantom_scid`].
		 */
		public long short_channel_id;
		/**
		 * Set if this HTLC is being forwarded within a blinded path.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedForward blinded;
		/**
		 * The absolute CLTV of the inbound HTLC
		 */
		public org.ldk.structs.Option_u32Z incoming_cltv_expiry;
		/**
		 * Whether this HTLC should be held by our node until we receive a corresponding
		 * [`ReleaseHeldHtlc`] onion message.
		 */
		public COption_NoneZ hold_htlc;
		internal PendingHTLCRouting_Forward(long ptr) : base(null, ptr) {
			long onion_packet = bindings.LDKPendingHTLCRouting_Forward_get_onion_packet(ptr);
			org.ldk.structs.OnionPacket onion_packet_hu_conv = null; if (onion_packet < 0 || onion_packet > 4096) { onion_packet_hu_conv = new org.ldk.structs.OnionPacket(null, onion_packet); }
			if (onion_packet_hu_conv != null) { onion_packet_hu_conv.ptrs_to.AddLast(this); };
			this.onion_packet = onion_packet_hu_conv;
			this.short_channel_id = bindings.LDKPendingHTLCRouting_Forward_get_short_channel_id(ptr);
			long blinded = bindings.LDKPendingHTLCRouting_Forward_get_blinded(ptr);
			org.ldk.structs.BlindedForward blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedForward(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.AddLast(this); };
			this.blinded = blinded_hu_conv;
			long incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_Forward_get_incoming_cltv_expiry(ptr);
			org.ldk.structs.Option_u32Z incoming_cltv_expiry_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(incoming_cltv_expiry);
			if (incoming_cltv_expiry_hu_conv != null) { incoming_cltv_expiry_hu_conv.ptrs_to.AddLast(this); };
			this.incoming_cltv_expiry = incoming_cltv_expiry_hu_conv;
			this.hold_htlc = bindings.LDKPendingHTLCRouting_Forward_get_hold_htlc(ptr);
		}
	}
	/** A PendingHTLCRouting of type TrampolineForward */
	public class PendingHTLCRouting_TrampolineForward : PendingHTLCRouting {
		/**
		 * The onion shared secret we build with the sender (or the preceding Trampoline node) used
		 * to decrypt the onion.
		 * 
		 * This is later used to encrypt failure packets in the event that the HTLC is failed.
		 */
		public byte[] incoming_shared_secret;
		/**
		 * The onion which should be included in the forwarded HTLC, telling the next hop what to
		 * do with the HTLC.
		 */
		public org.ldk.structs.TrampolineOnionPacket onion_packet;
		/**
		 * The node ID of the Trampoline node which we need to route this HTLC to.
		 */
		public byte[] node_id;
		/**
		 * Set if this HTLC is being forwarded within a blinded path.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedForward blinded;
		/**
		 * The absolute CLTV of the inbound HTLC
		 */
		public int incoming_cltv_expiry;
		internal PendingHTLCRouting_TrampolineForward(long ptr) : base(null, ptr) {
			long incoming_shared_secret = bindings.LDKPendingHTLCRouting_TrampolineForward_get_incoming_shared_secret(ptr);
			byte[] incoming_shared_secret_conv = InternalUtils.decodeUint8Array(incoming_shared_secret);
			this.incoming_shared_secret = incoming_shared_secret_conv;
			long onion_packet = bindings.LDKPendingHTLCRouting_TrampolineForward_get_onion_packet(ptr);
			org.ldk.structs.TrampolineOnionPacket onion_packet_hu_conv = null; if (onion_packet < 0 || onion_packet > 4096) { onion_packet_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, onion_packet); }
			if (onion_packet_hu_conv != null) { onion_packet_hu_conv.ptrs_to.AddLast(this); };
			this.onion_packet = onion_packet_hu_conv;
			long node_id = bindings.LDKPendingHTLCRouting_TrampolineForward_get_node_id(ptr);
			byte[] node_id_conv = InternalUtils.decodeUint8Array(node_id);
			this.node_id = node_id_conv;
			long blinded = bindings.LDKPendingHTLCRouting_TrampolineForward_get_blinded(ptr);
			org.ldk.structs.BlindedForward blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedForward(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.AddLast(this); };
			this.blinded = blinded_hu_conv;
			this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_TrampolineForward_get_incoming_cltv_expiry(ptr);
		}
	}
	/** A PendingHTLCRouting of type Receive */
	public class PendingHTLCRouting_Receive : PendingHTLCRouting {
		/**
		 * Information about the amount the sender intended to pay and (potential) proof that this
		 * is a payment for an invoice we generated. This proof of payment is is also used for
		 * linking MPP parts of a larger payment.
		 */
		public org.ldk.structs.FinalOnionHopData payment_data;
		/**
		 * Additional data which we (allegedly) instructed the sender to include in the onion.
		 * 
		 * For HTLCs received by LDK, this will ultimately be exposed in
		 * [`Event::PaymentClaimable::onion_fields`] as
		 * [`RecipientOnionFields::payment_metadata`].
		 */
		public org.ldk.structs.Option_CVec_u8ZZ payment_metadata;
		/**
		 * The context of the payment included by the recipient in a blinded path, or `None` if a
		 * blinded path was not used.
		 * 
		 * Used in part to determine the [`events::PaymentPurpose`].
		 */
		public org.ldk.structs.Option_PaymentContextZ payment_context;
		/**
		 * CLTV expiry of the received HTLC.
		 * 
		 * Used to track when we should expire pending HTLCs that go unclaimed.
		 */
		public int incoming_cltv_expiry;
		/**
		 * If the onion had forwarding instructions to one of our phantom node SCIDs, this will
		 * provide the onion shared secret used to decrypt the next level of forwarding
		 * instructions.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public byte[] phantom_shared_secret;
		/**
		 * Custom TLVs which were set by the sender.
		 * 
		 * For HTLCs received by LDK, this will ultimately be exposed in
		 * [`Event::PaymentClaimable::onion_fields`] as
		 * [`RecipientOnionFields::custom_tlvs`].
		 */
		public TwoTuple_u64CVec_u8ZZ[] custom_tlvs;
		/**
		 * Set if this HTLC is the final hop in a multi-hop blinded path.
		 */
		public bool requires_blinded_error;
		internal PendingHTLCRouting_Receive(long ptr) : base(null, ptr) {
			long payment_data = bindings.LDKPendingHTLCRouting_Receive_get_payment_data(ptr);
			org.ldk.structs.FinalOnionHopData payment_data_hu_conv = null; if (payment_data < 0 || payment_data > 4096) { payment_data_hu_conv = new org.ldk.structs.FinalOnionHopData(null, payment_data); }
			if (payment_data_hu_conv != null) { payment_data_hu_conv.ptrs_to.AddLast(this); };
			this.payment_data = payment_data_hu_conv;
			long payment_metadata = bindings.LDKPendingHTLCRouting_Receive_get_payment_metadata(ptr);
			org.ldk.structs.Option_CVec_u8ZZ payment_metadata_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			if (payment_metadata_hu_conv != null) { payment_metadata_hu_conv.ptrs_to.AddLast(this); };
			this.payment_metadata = payment_metadata_hu_conv;
			long payment_context = bindings.LDKPendingHTLCRouting_Receive_get_payment_context(ptr);
			org.ldk.structs.Option_PaymentContextZ payment_context_hu_conv = org.ldk.structs.Option_PaymentContextZ.constr_from_ptr(payment_context);
			if (payment_context_hu_conv != null) { payment_context_hu_conv.ptrs_to.AddLast(this); };
			this.payment_context = payment_context_hu_conv;
			this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_Receive_get_incoming_cltv_expiry(ptr);
			long phantom_shared_secret = bindings.LDKPendingHTLCRouting_Receive_get_phantom_shared_secret(ptr);
			byte[] phantom_shared_secret_conv = InternalUtils.decodeUint8Array(phantom_shared_secret);
			this.phantom_shared_secret = phantom_shared_secret_conv;
			long custom_tlvs = bindings.LDKPendingHTLCRouting_Receive_get_custom_tlvs(ptr);
			int custom_tlvs_conv_23_len = InternalUtils.getArrayLength(custom_tlvs);
			TwoTuple_u64CVec_u8ZZ[] custom_tlvs_conv_23_arr = new TwoTuple_u64CVec_u8ZZ[custom_tlvs_conv_23_len];
			for (int x = 0; x < custom_tlvs_conv_23_len; x++) {
				long custom_tlvs_conv_23 = InternalUtils.getU64ArrayElem(custom_tlvs, x);
				TwoTuple_u64CVec_u8ZZ custom_tlvs_conv_23_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				if (custom_tlvs_conv_23_hu_conv != null) { custom_tlvs_conv_23_hu_conv.ptrs_to.AddLast(this); };
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			bindings.free_buffer(custom_tlvs);
			this.custom_tlvs = custom_tlvs_conv_23_arr;
			this.requires_blinded_error = bindings.LDKPendingHTLCRouting_Receive_get_requires_blinded_error(ptr);
		}
	}
	/** A PendingHTLCRouting of type ReceiveKeysend */
	public class PendingHTLCRouting_ReceiveKeysend : PendingHTLCRouting {
		/**
		 * Information about the amount the sender intended to pay and possibly a token to
		 * associate MPP parts of a larger payment.
		 * 
		 * This will only be filled in if receiving MPP keysend payments is enabled, and it being
		 * present will cause deserialization to fail on versions of LDK prior to 0.0.116.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.FinalOnionHopData payment_data;
		/**
		 * Preimage for this onion payment. This preimage is provided by the sender and will be
		 * used to settle the spontaneous payment.
		 */
		public byte[] payment_preimage;
		/**
		 * Additional data which we (allegedly) instructed the sender to include in the onion.
		 * 
		 * For HTLCs received by LDK, this will ultimately bubble back up as
		 * [`RecipientOnionFields::payment_metadata`].
		 */
		public org.ldk.structs.Option_CVec_u8ZZ payment_metadata;
		/**
		 * CLTV expiry of the received HTLC.
		 * 
		 * Used to track when we should expire pending HTLCs that go unclaimed.
		 */
		public int incoming_cltv_expiry;
		/**
		 * Custom TLVs which were set by the sender.
		 * 
		 * For HTLCs received by LDK, these will ultimately bubble back up as
		 * [`RecipientOnionFields::custom_tlvs`].
		 */
		public TwoTuple_u64CVec_u8ZZ[] custom_tlvs;
		/**
		 * Set if this HTLC is the final hop in a multi-hop blinded path.
		 */
		public bool requires_blinded_error;
		/**
		 * Set if we are receiving a keysend to a blinded path, meaning we created the
		 * [`PaymentSecret`] and should verify it using our
		 * [`NodeSigner::get_expanded_key`].
		 */
		public bool has_recipient_created_payment_secret;
		/**
		 * The [`InvoiceRequest`] associated with the [`Offer`] corresponding to this payment.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.InvoiceRequest invoice_request;
		/**
		 * The context of the payment included by the recipient in a blinded path, or `None` if a
		 * blinded path was not used.
		 * 
		 * Used in part to determine the [`events::PaymentPurpose`].
		 */
		public org.ldk.structs.Option_PaymentContextZ payment_context;
		internal PendingHTLCRouting_ReceiveKeysend(long ptr) : base(null, ptr) {
			long payment_data = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_data(ptr);
			org.ldk.structs.FinalOnionHopData payment_data_hu_conv = null; if (payment_data < 0 || payment_data > 4096) { payment_data_hu_conv = new org.ldk.structs.FinalOnionHopData(null, payment_data); }
			if (payment_data_hu_conv != null) { payment_data_hu_conv.ptrs_to.AddLast(this); };
			this.payment_data = payment_data_hu_conv;
			long payment_preimage = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_preimage(ptr);
			byte[] payment_preimage_conv = InternalUtils.decodeUint8Array(payment_preimage);
			this.payment_preimage = payment_preimage_conv;
			long payment_metadata = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_metadata(ptr);
			org.ldk.structs.Option_CVec_u8ZZ payment_metadata_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			if (payment_metadata_hu_conv != null) { payment_metadata_hu_conv.ptrs_to.AddLast(this); };
			this.payment_metadata = payment_metadata_hu_conv;
			this.incoming_cltv_expiry = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_incoming_cltv_expiry(ptr);
			long custom_tlvs = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_custom_tlvs(ptr);
			int custom_tlvs_conv_23_len = InternalUtils.getArrayLength(custom_tlvs);
			TwoTuple_u64CVec_u8ZZ[] custom_tlvs_conv_23_arr = new TwoTuple_u64CVec_u8ZZ[custom_tlvs_conv_23_len];
			for (int x = 0; x < custom_tlvs_conv_23_len; x++) {
				long custom_tlvs_conv_23 = InternalUtils.getU64ArrayElem(custom_tlvs, x);
				TwoTuple_u64CVec_u8ZZ custom_tlvs_conv_23_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				if (custom_tlvs_conv_23_hu_conv != null) { custom_tlvs_conv_23_hu_conv.ptrs_to.AddLast(this); };
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			bindings.free_buffer(custom_tlvs);
			this.custom_tlvs = custom_tlvs_conv_23_arr;
			this.requires_blinded_error = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_requires_blinded_error(ptr);
			this.has_recipient_created_payment_secret = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_has_recipient_created_payment_secret(ptr);
			long invoice_request = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_invoice_request(ptr);
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.AddLast(this); };
			this.invoice_request = invoice_request_hu_conv;
			long payment_context = bindings.LDKPendingHTLCRouting_ReceiveKeysend_get_payment_context(ptr);
			org.ldk.structs.Option_PaymentContextZ payment_context_hu_conv = org.ldk.structs.Option_PaymentContextZ.constr_from_ptr(payment_context);
			if (payment_context_hu_conv != null) { payment_context_hu_conv.ptrs_to.AddLast(this); };
			this.payment_context = payment_context_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PendingHTLCRouting_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PendingHTLCRouting
	 */
	public org.ldk.structs.PendingHTLCRouting clone() {
		long ret = bindings.PendingHTLCRouting_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PendingHTLCRouting
	 */
	public static org.ldk.structs.PendingHTLCRouting forward(org.ldk.structs.OnionPacket onion_packet, long short_channel_id, org.ldk.structs.BlindedForward blinded, org.ldk.structs.Option_u32Z incoming_cltv_expiry, COption_NoneZ hold_htlc) {
		long ret = bindings.PendingHTLCRouting_forward(onion_packet.ptr, short_channel_id, blinded.ptr, incoming_cltv_expiry.ptr, hold_htlc);
		GC.KeepAlive(onion_packet);
		GC.KeepAlive(short_channel_id);
		GC.KeepAlive(blinded);
		GC.KeepAlive(incoming_cltv_expiry);
		GC.KeepAlive(hold_htlc);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TrampolineForward-variant PendingHTLCRouting
	 */
	public static org.ldk.structs.PendingHTLCRouting trampoline_forward(byte[] incoming_shared_secret, org.ldk.structs.TrampolineOnionPacket onion_packet, byte[] node_id, org.ldk.structs.BlindedForward blinded, int incoming_cltv_expiry) {
		long ret = bindings.PendingHTLCRouting_trampoline_forward(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(incoming_shared_secret, 32)), onion_packet.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(node_id, 33)), blinded.ptr, incoming_cltv_expiry);
		GC.KeepAlive(incoming_shared_secret);
		GC.KeepAlive(onion_packet);
		GC.KeepAlive(node_id);
		GC.KeepAlive(blinded);
		GC.KeepAlive(incoming_cltv_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant PendingHTLCRouting
	 */
	public static org.ldk.structs.PendingHTLCRouting receive(org.ldk.structs.FinalOnionHopData payment_data, org.ldk.structs.Option_CVec_u8ZZ payment_metadata, org.ldk.structs.Option_PaymentContextZ payment_context, int incoming_cltv_expiry, byte[] phantom_shared_secret, TwoTuple_u64CVec_u8ZZ[] custom_tlvs, bool requires_blinded_error) {
		long ret = bindings.PendingHTLCRouting_receive(payment_data.ptr, payment_metadata.ptr, payment_context.ptr, incoming_cltv_expiry, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(phantom_shared_secret, 32)), InternalUtils.encodeUint64Array(InternalUtils.mapArray(custom_tlvs, custom_tlvs_conv_23 => custom_tlvs_conv_23.ptr)), requires_blinded_error);
		GC.KeepAlive(payment_data);
		GC.KeepAlive(payment_metadata);
		GC.KeepAlive(payment_context);
		GC.KeepAlive(incoming_cltv_expiry);
		GC.KeepAlive(phantom_shared_secret);
		GC.KeepAlive(custom_tlvs);
		GC.KeepAlive(requires_blinded_error);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReceiveKeysend-variant PendingHTLCRouting
	 */
	public static org.ldk.structs.PendingHTLCRouting receive_keysend(org.ldk.structs.FinalOnionHopData payment_data, byte[] payment_preimage, org.ldk.structs.Option_CVec_u8ZZ payment_metadata, int incoming_cltv_expiry, TwoTuple_u64CVec_u8ZZ[] custom_tlvs, bool requires_blinded_error, bool has_recipient_created_payment_secret, org.ldk.structs.InvoiceRequest invoice_request, org.ldk.structs.Option_PaymentContextZ payment_context) {
		long ret = bindings.PendingHTLCRouting_receive_keysend(payment_data.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_preimage, 32)), payment_metadata.ptr, incoming_cltv_expiry, InternalUtils.encodeUint64Array(InternalUtils.mapArray(custom_tlvs, custom_tlvs_conv_23 => custom_tlvs_conv_23.ptr)), requires_blinded_error, has_recipient_created_payment_secret, invoice_request.ptr, payment_context.ptr);
		GC.KeepAlive(payment_data);
		GC.KeepAlive(payment_preimage);
		GC.KeepAlive(payment_metadata);
		GC.KeepAlive(incoming_cltv_expiry);
		GC.KeepAlive(custom_tlvs);
		GC.KeepAlive(requires_blinded_error);
		GC.KeepAlive(has_recipient_created_payment_secret);
		GC.KeepAlive(invoice_request);
		GC.KeepAlive(payment_context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PendingHTLCRouting object into a byte array which can be read by PendingHTLCRouting_read
	 */
	public byte[] write() {
		long ret = bindings.PendingHTLCRouting_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PendingHTLCRouting from a byte array, created by PendingHTLCRouting_write
	 */
	public static org.ldk.structs.Result_PendingHTLCRoutingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PendingHTLCRouting_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCRoutingDecodeErrorZ ret_hu_conv = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

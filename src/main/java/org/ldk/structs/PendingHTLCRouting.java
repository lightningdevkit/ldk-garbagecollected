package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Information about where a received HTLC('s onion) has indicated the HTLC should go.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PendingHTLCRouting extends CommonBase {
	private PendingHTLCRouting(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PendingHTLCRouting_free(ptr); }
	}
	static PendingHTLCRouting constr_from_ptr(long ptr) {
		bindings.LDKPendingHTLCRouting raw_val = bindings.LDKPendingHTLCRouting_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPendingHTLCRouting.Forward.class) {
			return new Forward(ptr, (bindings.LDKPendingHTLCRouting.Forward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPendingHTLCRouting.TrampolineForward.class) {
			return new TrampolineForward(ptr, (bindings.LDKPendingHTLCRouting.TrampolineForward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPendingHTLCRouting.Receive.class) {
			return new Receive(ptr, (bindings.LDKPendingHTLCRouting.Receive)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPendingHTLCRouting.ReceiveKeysend.class) {
			return new ReceiveKeysend(ptr, (bindings.LDKPendingHTLCRouting.ReceiveKeysend)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An HTLC which should be forwarded on to another node.
	 */
	public final static class Forward extends PendingHTLCRouting {
		/**
		 * The onion which should be included in the forwarded HTLC, telling the next hop what to
		 * do with the HTLC.
		*/
		public final org.ldk.structs.OnionPacket onion_packet;
		/**
		 * The short channel ID of the channel which we were instructed to forward this HTLC to.
		 * 
		 * This could be a real on-chain SCID, an SCID alias, or some other SCID which has meaning
		 * to the receiving node, such as one returned from
		 * [`ChannelManager::get_intercept_scid`] or [`ChannelManager::get_phantom_scid`].
		*/
		public final long short_channel_id;
		/**
		 * Set if this HTLC is being forwarded within a blinded path.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedForward blinded;
		/**
		 * The absolute CLTV of the inbound HTLC
		*/
		public final org.ldk.structs.Option_u32Z incoming_cltv_expiry;
		/**
		 * Whether this HTLC should be held by our node until we receive a corresponding
		 * [`ReleaseHeldHtlc`] onion message.
		*/
		public final org.ldk.enums.COption_NoneZ hold_htlc;
		private Forward(long ptr, bindings.LDKPendingHTLCRouting.Forward obj) {
			super(null, ptr);
			long onion_packet = obj.onion_packet;
			org.ldk.structs.OnionPacket onion_packet_hu_conv = null; if (onion_packet < 0 || onion_packet > 4096) { onion_packet_hu_conv = new org.ldk.structs.OnionPacket(null, onion_packet); }
			if (onion_packet_hu_conv != null) { onion_packet_hu_conv.ptrs_to.add(this); };
			this.onion_packet = onion_packet_hu_conv;
			this.short_channel_id = obj.short_channel_id;
			long blinded = obj.blinded;
			org.ldk.structs.BlindedForward blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedForward(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.add(this); };
			this.blinded = blinded_hu_conv;
			long incoming_cltv_expiry = obj.incoming_cltv_expiry;
			org.ldk.structs.Option_u32Z incoming_cltv_expiry_hu_conv = org.ldk.structs.Option_u32Z.constr_from_ptr(incoming_cltv_expiry);
			if (incoming_cltv_expiry_hu_conv != null) { incoming_cltv_expiry_hu_conv.ptrs_to.add(this); };
			this.incoming_cltv_expiry = incoming_cltv_expiry_hu_conv;
			this.hold_htlc = obj.hold_htlc;
		}
	}
	/**
	 * An HTLC which should be forwarded on to another Trampoline node.
	 */
	public final static class TrampolineForward extends PendingHTLCRouting {
		/**
		 * The onion shared secret we build with the sender (or the preceding Trampoline node) used
		 * to decrypt the onion.
		 * 
		 * This is later used to encrypt failure packets in the event that the HTLC is failed.
		*/
		public final byte[] incoming_shared_secret;
		/**
		 * The onion which should be included in the forwarded HTLC, telling the next hop what to
		 * do with the HTLC.
		*/
		public final org.ldk.structs.TrampolineOnionPacket onion_packet;
		/**
		 * The node ID of the Trampoline node which we need to route this HTLC to.
		*/
		public final byte[] node_id;
		/**
		 * Set if this HTLC is being forwarded within a blinded path.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedForward blinded;
		/**
		 * The absolute CLTV of the inbound HTLC
		*/
		public final int incoming_cltv_expiry;
		private TrampolineForward(long ptr, bindings.LDKPendingHTLCRouting.TrampolineForward obj) {
			super(null, ptr);
			this.incoming_shared_secret = obj.incoming_shared_secret;
			long onion_packet = obj.onion_packet;
			org.ldk.structs.TrampolineOnionPacket onion_packet_hu_conv = null; if (onion_packet < 0 || onion_packet > 4096) { onion_packet_hu_conv = new org.ldk.structs.TrampolineOnionPacket(null, onion_packet); }
			if (onion_packet_hu_conv != null) { onion_packet_hu_conv.ptrs_to.add(this); };
			this.onion_packet = onion_packet_hu_conv;
			this.node_id = obj.node_id;
			long blinded = obj.blinded;
			org.ldk.structs.BlindedForward blinded_hu_conv = null; if (blinded < 0 || blinded > 4096) { blinded_hu_conv = new org.ldk.structs.BlindedForward(null, blinded); }
			if (blinded_hu_conv != null) { blinded_hu_conv.ptrs_to.add(this); };
			this.blinded = blinded_hu_conv;
			this.incoming_cltv_expiry = obj.incoming_cltv_expiry;
		}
	}
	/**
	 * The onion indicates that this is a payment for an invoice (supposedly) generated by us.
	 * 
	 * Note that at this point, we have not checked that the invoice being paid was actually
	 * generated by us, but rather it's claiming to pay an invoice of ours.
	 */
	public final static class Receive extends PendingHTLCRouting {
		/**
		 * Information about the amount the sender intended to pay and (potential) proof that this
		 * is a payment for an invoice we generated. This proof of payment is is also used for
		 * linking MPP parts of a larger payment.
		*/
		public final org.ldk.structs.FinalOnionHopData payment_data;
		/**
		 * Additional data which we (allegedly) instructed the sender to include in the onion.
		 * 
		 * For HTLCs received by LDK, this will ultimately be exposed in
		 * [`Event::PaymentClaimable::onion_fields`] as
		 * [`RecipientOnionFields::payment_metadata`].
		*/
		public final org.ldk.structs.Option_CVec_u8ZZ payment_metadata;
		/**
		 * The context of the payment included by the recipient in a blinded path, or `None` if a
		 * blinded path was not used.
		 * 
		 * Used in part to determine the [`events::PaymentPurpose`].
		*/
		public final org.ldk.structs.Option_PaymentContextZ payment_context;
		/**
		 * CLTV expiry of the received HTLC.
		 * 
		 * Used to track when we should expire pending HTLCs that go unclaimed.
		*/
		public final int incoming_cltv_expiry;
		/**
		 * If the onion had forwarding instructions to one of our phantom node SCIDs, this will
		 * provide the onion shared secret used to decrypt the next level of forwarding
		 * instructions.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] phantom_shared_secret;
		/**
		 * Custom TLVs which were set by the sender.
		 * 
		 * For HTLCs received by LDK, this will ultimately be exposed in
		 * [`Event::PaymentClaimable::onion_fields`] as
		 * [`RecipientOnionFields::custom_tlvs`].
		*/
		public final TwoTuple_u64CVec_u8ZZ[] custom_tlvs;
		/**
		 * Set if this HTLC is the final hop in a multi-hop blinded path.
		*/
		public final boolean requires_blinded_error;
		private Receive(long ptr, bindings.LDKPendingHTLCRouting.Receive obj) {
			super(null, ptr);
			long payment_data = obj.payment_data;
			org.ldk.structs.FinalOnionHopData payment_data_hu_conv = null; if (payment_data < 0 || payment_data > 4096) { payment_data_hu_conv = new org.ldk.structs.FinalOnionHopData(null, payment_data); }
			if (payment_data_hu_conv != null) { payment_data_hu_conv.ptrs_to.add(this); };
			this.payment_data = payment_data_hu_conv;
			long payment_metadata = obj.payment_metadata;
			org.ldk.structs.Option_CVec_u8ZZ payment_metadata_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			if (payment_metadata_hu_conv != null) { payment_metadata_hu_conv.ptrs_to.add(this); };
			this.payment_metadata = payment_metadata_hu_conv;
			long payment_context = obj.payment_context;
			org.ldk.structs.Option_PaymentContextZ payment_context_hu_conv = org.ldk.structs.Option_PaymentContextZ.constr_from_ptr(payment_context);
			if (payment_context_hu_conv != null) { payment_context_hu_conv.ptrs_to.add(this); };
			this.payment_context = payment_context_hu_conv;
			this.incoming_cltv_expiry = obj.incoming_cltv_expiry;
			this.phantom_shared_secret = obj.phantom_shared_secret;
			long[] custom_tlvs = obj.custom_tlvs;
			int custom_tlvs_conv_23_len = custom_tlvs.length;
			TwoTuple_u64CVec_u8ZZ[] custom_tlvs_conv_23_arr = new TwoTuple_u64CVec_u8ZZ[custom_tlvs_conv_23_len];
			for (int x = 0; x < custom_tlvs_conv_23_len; x++) {
				long custom_tlvs_conv_23 = custom_tlvs[x];
				TwoTuple_u64CVec_u8ZZ custom_tlvs_conv_23_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				if (custom_tlvs_conv_23_hu_conv != null) { custom_tlvs_conv_23_hu_conv.ptrs_to.add(this); };
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			this.custom_tlvs = custom_tlvs_conv_23_arr;
			this.requires_blinded_error = obj.requires_blinded_error;
		}
	}
	/**
	 * The onion indicates that this is for payment to us but which contains the preimage for
	 * claiming included, and is unrelated to any invoice we'd previously generated (aka a
	 * \"keysend\" or \"spontaneous\" payment).
	 */
	public final static class ReceiveKeysend extends PendingHTLCRouting {
		/**
		 * Information about the amount the sender intended to pay and possibly a token to
		 * associate MPP parts of a larger payment.
		 * 
		 * This will only be filled in if receiving MPP keysend payments is enabled, and it being
		 * present will cause deserialization to fail on versions of LDK prior to 0.0.116.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.FinalOnionHopData payment_data;
		/**
		 * Preimage for this onion payment. This preimage is provided by the sender and will be
		 * used to settle the spontaneous payment.
		*/
		public final byte[] payment_preimage;
		/**
		 * Additional data which we (allegedly) instructed the sender to include in the onion.
		 * 
		 * For HTLCs received by LDK, this will ultimately bubble back up as
		 * [`RecipientOnionFields::payment_metadata`].
		*/
		public final org.ldk.structs.Option_CVec_u8ZZ payment_metadata;
		/**
		 * CLTV expiry of the received HTLC.
		 * 
		 * Used to track when we should expire pending HTLCs that go unclaimed.
		*/
		public final int incoming_cltv_expiry;
		/**
		 * Custom TLVs which were set by the sender.
		 * 
		 * For HTLCs received by LDK, these will ultimately bubble back up as
		 * [`RecipientOnionFields::custom_tlvs`].
		*/
		public final TwoTuple_u64CVec_u8ZZ[] custom_tlvs;
		/**
		 * Set if this HTLC is the final hop in a multi-hop blinded path.
		*/
		public final boolean requires_blinded_error;
		/**
		 * Set if we are receiving a keysend to a blinded path, meaning we created the
		 * [`PaymentSecret`] and should verify it using our
		 * [`NodeSigner::get_expanded_key`].
		*/
		public final boolean has_recipient_created_payment_secret;
		/**
		 * The [`InvoiceRequest`] associated with the [`Offer`] corresponding to this payment.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.InvoiceRequest invoice_request;
		/**
		 * The context of the payment included by the recipient in a blinded path, or `None` if a
		 * blinded path was not used.
		 * 
		 * Used in part to determine the [`events::PaymentPurpose`].
		*/
		public final org.ldk.structs.Option_PaymentContextZ payment_context;
		private ReceiveKeysend(long ptr, bindings.LDKPendingHTLCRouting.ReceiveKeysend obj) {
			super(null, ptr);
			long payment_data = obj.payment_data;
			org.ldk.structs.FinalOnionHopData payment_data_hu_conv = null; if (payment_data < 0 || payment_data > 4096) { payment_data_hu_conv = new org.ldk.structs.FinalOnionHopData(null, payment_data); }
			if (payment_data_hu_conv != null) { payment_data_hu_conv.ptrs_to.add(this); };
			this.payment_data = payment_data_hu_conv;
			this.payment_preimage = obj.payment_preimage;
			long payment_metadata = obj.payment_metadata;
			org.ldk.structs.Option_CVec_u8ZZ payment_metadata_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(payment_metadata);
			if (payment_metadata_hu_conv != null) { payment_metadata_hu_conv.ptrs_to.add(this); };
			this.payment_metadata = payment_metadata_hu_conv;
			this.incoming_cltv_expiry = obj.incoming_cltv_expiry;
			long[] custom_tlvs = obj.custom_tlvs;
			int custom_tlvs_conv_23_len = custom_tlvs.length;
			TwoTuple_u64CVec_u8ZZ[] custom_tlvs_conv_23_arr = new TwoTuple_u64CVec_u8ZZ[custom_tlvs_conv_23_len];
			for (int x = 0; x < custom_tlvs_conv_23_len; x++) {
				long custom_tlvs_conv_23 = custom_tlvs[x];
				TwoTuple_u64CVec_u8ZZ custom_tlvs_conv_23_hu_conv = new TwoTuple_u64CVec_u8ZZ(null, custom_tlvs_conv_23);
				if (custom_tlvs_conv_23_hu_conv != null) { custom_tlvs_conv_23_hu_conv.ptrs_to.add(this); };
				custom_tlvs_conv_23_arr[x] = custom_tlvs_conv_23_hu_conv;
			}
			this.custom_tlvs = custom_tlvs_conv_23_arr;
			this.requires_blinded_error = obj.requires_blinded_error;
			this.has_recipient_created_payment_secret = obj.has_recipient_created_payment_secret;
			long invoice_request = obj.invoice_request;
			org.ldk.structs.InvoiceRequest invoice_request_hu_conv = null; if (invoice_request < 0 || invoice_request > 4096) { invoice_request_hu_conv = new org.ldk.structs.InvoiceRequest(null, invoice_request); }
			if (invoice_request_hu_conv != null) { invoice_request_hu_conv.ptrs_to.add(this); };
			this.invoice_request = invoice_request_hu_conv;
			long payment_context = obj.payment_context;
			org.ldk.structs.Option_PaymentContextZ payment_context_hu_conv = org.ldk.structs.Option_PaymentContextZ.constr_from_ptr(payment_context);
			if (payment_context_hu_conv != null) { payment_context_hu_conv.ptrs_to.add(this); };
			this.payment_context = payment_context_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PendingHTLCRouting_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PendingHTLCRouting
	 */
	public PendingHTLCRouting clone() {
		long ret = bindings.PendingHTLCRouting_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PendingHTLCRouting
	 */
	public static PendingHTLCRouting forward(org.ldk.structs.OnionPacket onion_packet, long short_channel_id, org.ldk.structs.BlindedForward blinded, org.ldk.structs.Option_u32Z incoming_cltv_expiry, org.ldk.enums.COption_NoneZ hold_htlc) {
		long ret = bindings.PendingHTLCRouting_forward(onion_packet.ptr, short_channel_id, blinded.ptr, incoming_cltv_expiry.ptr, hold_htlc);
		Reference.reachabilityFence(onion_packet);
		Reference.reachabilityFence(short_channel_id);
		Reference.reachabilityFence(blinded);
		Reference.reachabilityFence(incoming_cltv_expiry);
		Reference.reachabilityFence(hold_htlc);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new TrampolineForward-variant PendingHTLCRouting
	 */
	public static PendingHTLCRouting trampoline_forward(byte[] incoming_shared_secret, org.ldk.structs.TrampolineOnionPacket onion_packet, byte[] node_id, org.ldk.structs.BlindedForward blinded, int incoming_cltv_expiry) {
		long ret = bindings.PendingHTLCRouting_trampoline_forward(InternalUtils.check_arr_len(incoming_shared_secret, 32), onion_packet.ptr, InternalUtils.check_arr_len(node_id, 33), blinded.ptr, incoming_cltv_expiry);
		Reference.reachabilityFence(incoming_shared_secret);
		Reference.reachabilityFence(onion_packet);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(blinded);
		Reference.reachabilityFence(incoming_cltv_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant PendingHTLCRouting
	 */
	public static PendingHTLCRouting receive(org.ldk.structs.FinalOnionHopData payment_data, org.ldk.structs.Option_CVec_u8ZZ payment_metadata, org.ldk.structs.Option_PaymentContextZ payment_context, int incoming_cltv_expiry, byte[] phantom_shared_secret, TwoTuple_u64CVec_u8ZZ[] custom_tlvs, boolean requires_blinded_error) {
		long ret = bindings.PendingHTLCRouting_receive(payment_data.ptr, payment_metadata.ptr, payment_context.ptr, incoming_cltv_expiry, InternalUtils.check_arr_len(phantom_shared_secret, 32), custom_tlvs != null ? Arrays.stream(custom_tlvs).mapToLong(custom_tlvs_conv_23 -> custom_tlvs_conv_23.ptr).toArray() : null, requires_blinded_error);
		Reference.reachabilityFence(payment_data);
		Reference.reachabilityFence(payment_metadata);
		Reference.reachabilityFence(payment_context);
		Reference.reachabilityFence(incoming_cltv_expiry);
		Reference.reachabilityFence(phantom_shared_secret);
		Reference.reachabilityFence(custom_tlvs);
		Reference.reachabilityFence(requires_blinded_error);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReceiveKeysend-variant PendingHTLCRouting
	 */
	public static PendingHTLCRouting receive_keysend(org.ldk.structs.FinalOnionHopData payment_data, byte[] payment_preimage, org.ldk.structs.Option_CVec_u8ZZ payment_metadata, int incoming_cltv_expiry, TwoTuple_u64CVec_u8ZZ[] custom_tlvs, boolean requires_blinded_error, boolean has_recipient_created_payment_secret, org.ldk.structs.InvoiceRequest invoice_request, org.ldk.structs.Option_PaymentContextZ payment_context) {
		long ret = bindings.PendingHTLCRouting_receive_keysend(payment_data.ptr, InternalUtils.check_arr_len(payment_preimage, 32), payment_metadata.ptr, incoming_cltv_expiry, custom_tlvs != null ? Arrays.stream(custom_tlvs).mapToLong(custom_tlvs_conv_23 -> custom_tlvs_conv_23.ptr).toArray() : null, requires_blinded_error, has_recipient_created_payment_secret, invoice_request.ptr, payment_context.ptr);
		Reference.reachabilityFence(payment_data);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(payment_metadata);
		Reference.reachabilityFence(incoming_cltv_expiry);
		Reference.reachabilityFence(custom_tlvs);
		Reference.reachabilityFence(requires_blinded_error);
		Reference.reachabilityFence(has_recipient_created_payment_secret);
		Reference.reachabilityFence(invoice_request);
		Reference.reachabilityFence(payment_context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PendingHTLCRouting ret_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the PendingHTLCRouting object into a byte array which can be read by PendingHTLCRouting_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PendingHTLCRouting_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PendingHTLCRouting from a byte array, created by PendingHTLCRouting_write
	 */
	public static Result_PendingHTLCRoutingDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PendingHTLCRouting_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCRoutingDecodeErrorZ ret_hu_conv = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

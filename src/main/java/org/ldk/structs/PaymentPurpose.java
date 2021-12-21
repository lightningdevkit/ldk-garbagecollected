package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Some information provided on receipt of payment depends on whether the payment received is a
 * spontaneous payment or a \"conventional\" lightning payment that's paying an invoice.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentPurpose extends CommonBase {
	private PaymentPurpose(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentPurpose_free(ptr); }
	}
	static PaymentPurpose constr_from_ptr(long ptr) {
		bindings.LDKPaymentPurpose raw_val = bindings.LDKPaymentPurpose_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPaymentPurpose.InvoicePayment.class) {
			return new InvoicePayment(ptr, (bindings.LDKPaymentPurpose.InvoicePayment)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentPurpose.SpontaneousPayment.class) {
			return new SpontaneousPayment(ptr, (bindings.LDKPaymentPurpose.SpontaneousPayment)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Information for receiving a payment that we generated an invoice for.
	 */
	public final static class InvoicePayment extends PaymentPurpose {
		/**
		 * The preimage to the payment_hash, if the payment hash (and secret) were fetched via
		 * [`ChannelManager::create_inbound_payment`]. If provided, this can be handed directly to
		 * [`ChannelManager::claim_funds`].
		 * 
		 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
		 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] payment_preimage;
		/**
		 * The \"payment secret\". This authenticates the sender to the recipient, preventing a
		 * number of deanonymization attacks during the routing process.
		 * It is provided here for your reference, however its accuracy is enforced directly by
		 * [`ChannelManager`] using the values you previously provided to
		 * [`ChannelManager::create_inbound_payment`] or
		 * [`ChannelManager::create_inbound_payment_for_hash`].
		 * 
		 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
		 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
		 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
		*/
		public final byte[] payment_secret;
		private InvoicePayment(long ptr, bindings.LDKPaymentPurpose.InvoicePayment obj) {
			super(null, ptr);
			this.payment_preimage = obj.payment_preimage;
			this.payment_secret = obj.payment_secret;
		}
	}
	/**
	 * Because this is a spontaneous payment, the payer generated their own preimage rather than us
	 * (the payee) providing a preimage.
	 */
	public final static class SpontaneousPayment extends PaymentPurpose {
		public final byte[] spontaneous_payment;
		private SpontaneousPayment(long ptr, bindings.LDKPaymentPurpose.SpontaneousPayment obj) {
			super(null, ptr);
			this.spontaneous_payment = obj.spontaneous_payment;
		}
	}
	long clone_ptr() {
		long ret = bindings.PaymentPurpose_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentPurpose
	 */
	public PaymentPurpose clone() {
		long ret = bindings.PaymentPurpose_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoicePayment-variant PaymentPurpose
	 */
	public static PaymentPurpose invoice_payment(byte[] payment_preimage, byte[] payment_secret) {
		long ret = bindings.PaymentPurpose_invoice_payment(InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_secret, 32));
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpontaneousPayment-variant PaymentPurpose
	 */
	public static PaymentPurpose spontaneous_payment(byte[] a) {
		long ret = bindings.PaymentPurpose_spontaneous_payment(InternalUtils.check_arr_len(a, 32));
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentPurpose ret_hu_conv = PaymentPurpose.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

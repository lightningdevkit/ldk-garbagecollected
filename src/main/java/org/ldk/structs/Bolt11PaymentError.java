package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error when attempting to pay a [`Bolt11Invoice`].
 * 
 * [`Bolt11Invoice`]: lightning_invoice::Bolt11Invoice
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt11PaymentError extends CommonBase {
	private Bolt11PaymentError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt11PaymentError_free(ptr); }
	}
	static Bolt11PaymentError constr_from_ptr(long ptr) {
		bindings.LDKBolt11PaymentError raw_val = bindings.LDKBolt11PaymentError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBolt11PaymentError.InvalidAmount.class) {
			return new InvalidAmount(ptr, (bindings.LDKBolt11PaymentError.InvalidAmount)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt11PaymentError.SendingFailed.class) {
			return new SendingFailed(ptr, (bindings.LDKBolt11PaymentError.SendingFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Incorrect amount was provided to [`ChannelManager::pay_for_bolt11_invoice`].
	 * This happens when the user-provided amount is less than an amount specified in the [`Bolt11Invoice`].
	 * 
	 * [`Bolt11Invoice`]: lightning_invoice::Bolt11Invoice
	 * [`ChannelManager::pay_for_bolt11_invoice`]: crate::ln::channelmanager::ChannelManager::pay_for_bolt11_invoice
	 */
	public final static class InvalidAmount extends Bolt11PaymentError {
		private InvalidAmount(long ptr, bindings.LDKBolt11PaymentError.InvalidAmount obj) {
			super(null, ptr);
		}
	}
	/**
	 * The invoice was valid for the corresponding [`PaymentId`], but sending the payment failed.
	 */
	public final static class SendingFailed extends Bolt11PaymentError {
		public final org.ldk.enums.RetryableSendFailure sending_failed;
		private SendingFailed(long ptr, bindings.LDKBolt11PaymentError.SendingFailed obj) {
			super(null, ptr);
			this.sending_failed = obj.sending_failed;
		}
	}
	long clone_ptr() {
		long ret = bindings.Bolt11PaymentError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11PaymentError
	 */
	public Bolt11PaymentError clone() {
		long ret = bindings.Bolt11PaymentError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidAmount-variant Bolt11PaymentError
	 */
	public static Bolt11PaymentError invalid_amount() {
		long ret = bindings.Bolt11PaymentError_invalid_amount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt11PaymentError
	 */
	public static Bolt11PaymentError sending_failed(org.ldk.enums.RetryableSendFailure a) {
		long ret = bindings.Bolt11PaymentError_sending_failed(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

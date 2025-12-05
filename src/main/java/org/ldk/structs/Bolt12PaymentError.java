package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error when attempting to pay a [`Bolt12Invoice`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Bolt12PaymentError extends CommonBase {
	private Bolt12PaymentError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Bolt12PaymentError_free(ptr); }
	}
	static Bolt12PaymentError constr_from_ptr(long ptr) {
		bindings.LDKBolt12PaymentError raw_val = bindings.LDKBolt12PaymentError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBolt12PaymentError.UnexpectedInvoice.class) {
			return new UnexpectedInvoice(ptr, (bindings.LDKBolt12PaymentError.UnexpectedInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt12PaymentError.DuplicateInvoice.class) {
			return new DuplicateInvoice(ptr, (bindings.LDKBolt12PaymentError.DuplicateInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt12PaymentError.UnknownRequiredFeatures.class) {
			return new UnknownRequiredFeatures(ptr, (bindings.LDKBolt12PaymentError.UnknownRequiredFeatures)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt12PaymentError.SendingFailed.class) {
			return new SendingFailed(ptr, (bindings.LDKBolt12PaymentError.SendingFailed)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBolt12PaymentError.BlindedPathCreationFailed.class) {
			return new BlindedPathCreationFailed(ptr, (bindings.LDKBolt12PaymentError.BlindedPathCreationFailed)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The invoice was not requested.
	 */
	public final static class UnexpectedInvoice extends Bolt12PaymentError {
		private UnexpectedInvoice(long ptr, bindings.LDKBolt12PaymentError.UnexpectedInvoice obj) {
			super(null, ptr);
		}
	}
	/**
	 * Payment for an invoice with the corresponding [`PaymentId`] was already initiated.
	 */
	public final static class DuplicateInvoice extends Bolt12PaymentError {
		private DuplicateInvoice(long ptr, bindings.LDKBolt12PaymentError.DuplicateInvoice obj) {
			super(null, ptr);
		}
	}
	/**
	 * The invoice was valid for the corresponding [`PaymentId`], but required unknown features.
	 */
	public final static class UnknownRequiredFeatures extends Bolt12PaymentError {
		private UnknownRequiredFeatures(long ptr, bindings.LDKBolt12PaymentError.UnknownRequiredFeatures obj) {
			super(null, ptr);
		}
	}
	/**
	 * The invoice was valid for the corresponding [`PaymentId`], but sending the payment failed.
	 */
	public final static class SendingFailed extends Bolt12PaymentError {
		public final org.ldk.enums.RetryableSendFailure sending_failed;
		private SendingFailed(long ptr, bindings.LDKBolt12PaymentError.SendingFailed obj) {
			super(null, ptr);
			this.sending_failed = obj.sending_failed;
		}
	}
	/**
	 * Failed to create a blinded path back to ourselves.
	 * 
	 * We attempted to initiate payment to a [`StaticInvoice`] but failed to create a reply path for
	 * our [`HeldHtlcAvailable`] message.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 */
	public final static class BlindedPathCreationFailed extends Bolt12PaymentError {
		private BlindedPathCreationFailed(long ptr, bindings.LDKBolt12PaymentError.BlindedPathCreationFailed obj) {
			super(null, ptr);
		}
	}
	long clone_ptr() {
		long ret = bindings.Bolt12PaymentError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12PaymentError
	 */
	public Bolt12PaymentError clone() {
		long ret = bindings.Bolt12PaymentError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedInvoice-variant Bolt12PaymentError
	 */
	public static Bolt12PaymentError unexpected_invoice() {
		long ret = bindings.Bolt12PaymentError_unexpected_invoice();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicateInvoice-variant Bolt12PaymentError
	 */
	public static Bolt12PaymentError duplicate_invoice() {
		long ret = bindings.Bolt12PaymentError_duplicate_invoice();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeatures-variant Bolt12PaymentError
	 */
	public static Bolt12PaymentError unknown_required_features() {
		long ret = bindings.Bolt12PaymentError_unknown_required_features();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt12PaymentError
	 */
	public static Bolt12PaymentError sending_failed(org.ldk.enums.RetryableSendFailure a) {
		long ret = bindings.Bolt12PaymentError_sending_failed(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPathCreationFailed-variant Bolt12PaymentError
	 */
	public static Bolt12PaymentError blinded_path_creation_failed() {
		long ret = bindings.Bolt12PaymentError_blinded_path_creation_failed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12PaymentErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Bolt12PaymentError b) {
		boolean ret = bindings.Bolt12PaymentError_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Bolt12PaymentError)) return false;
		return this.eq((Bolt12PaymentError)o);
	}
}

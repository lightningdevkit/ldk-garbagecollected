using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An error when attempting to pay a [`Bolt11Invoice`].
 * 
 * [`Bolt11Invoice`]: lightning_invoice::Bolt11Invoice
 */
public class Bolt11PaymentError : CommonBase {
	protected Bolt11PaymentError(object _dummy, long ptr) : base(ptr) { }
	~Bolt11PaymentError() {
		if (ptr != 0) { bindings.Bolt11PaymentError_free(ptr); }
	}

	internal static Bolt11PaymentError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKBolt11PaymentError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt11PaymentError_InvalidAmount(ptr);
			case 1: return new Bolt11PaymentError_SendingFailed(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Bolt11PaymentError of type InvalidAmount */
	public class Bolt11PaymentError_InvalidAmount : Bolt11PaymentError {
		internal Bolt11PaymentError_InvalidAmount(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt11PaymentError of type SendingFailed */
	public class Bolt11PaymentError_SendingFailed : Bolt11PaymentError {
		public RetryableSendFailure sending_failed;
		internal Bolt11PaymentError_SendingFailed(long ptr) : base(null, ptr) {
			this.sending_failed = bindings.LDKBolt11PaymentError_SendingFailed_get_sending_failed(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Bolt11PaymentError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11PaymentError
	 */
	public org.ldk.structs.Bolt11PaymentError clone() {
		long ret = bindings.Bolt11PaymentError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidAmount-variant Bolt11PaymentError
	 */
	public static org.ldk.structs.Bolt11PaymentError invalid_amount() {
		long ret = bindings.Bolt11PaymentError_invalid_amount();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt11PaymentError
	 */
	public static org.ldk.structs.Bolt11PaymentError sending_failed(RetryableSendFailure a) {
		long ret = bindings.Bolt11PaymentError_sending_failed(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11PaymentError ret_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

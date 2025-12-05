using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An error when attempting to pay a [`Bolt12Invoice`].
 */
public class Bolt12PaymentError : CommonBase {
	protected Bolt12PaymentError(object _dummy, long ptr) : base(ptr) { }
	~Bolt12PaymentError() {
		if (ptr != 0) { bindings.Bolt12PaymentError_free(ptr); }
	}

	internal static Bolt12PaymentError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKBolt12PaymentError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bolt12PaymentError_UnexpectedInvoice(ptr);
			case 1: return new Bolt12PaymentError_DuplicateInvoice(ptr);
			case 2: return new Bolt12PaymentError_UnknownRequiredFeatures(ptr);
			case 3: return new Bolt12PaymentError_SendingFailed(ptr);
			case 4: return new Bolt12PaymentError_BlindedPathCreationFailed(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Bolt12PaymentError of type UnexpectedInvoice */
	public class Bolt12PaymentError_UnexpectedInvoice : Bolt12PaymentError {
		internal Bolt12PaymentError_UnexpectedInvoice(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt12PaymentError of type DuplicateInvoice */
	public class Bolt12PaymentError_DuplicateInvoice : Bolt12PaymentError {
		internal Bolt12PaymentError_DuplicateInvoice(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt12PaymentError of type UnknownRequiredFeatures */
	public class Bolt12PaymentError_UnknownRequiredFeatures : Bolt12PaymentError {
		internal Bolt12PaymentError_UnknownRequiredFeatures(long ptr) : base(null, ptr) {
		}
	}
	/** A Bolt12PaymentError of type SendingFailed */
	public class Bolt12PaymentError_SendingFailed : Bolt12PaymentError {
		public RetryableSendFailure sending_failed;
		internal Bolt12PaymentError_SendingFailed(long ptr) : base(null, ptr) {
			this.sending_failed = bindings.LDKBolt12PaymentError_SendingFailed_get_sending_failed(ptr);
		}
	}
	/** A Bolt12PaymentError of type BlindedPathCreationFailed */
	public class Bolt12PaymentError_BlindedPathCreationFailed : Bolt12PaymentError {
		internal Bolt12PaymentError_BlindedPathCreationFailed(long ptr) : base(null, ptr) {
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Bolt12PaymentError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12PaymentError
	 */
	public org.ldk.structs.Bolt12PaymentError clone() {
		long ret = bindings.Bolt12PaymentError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnexpectedInvoice-variant Bolt12PaymentError
	 */
	public static org.ldk.structs.Bolt12PaymentError unexpected_invoice() {
		long ret = bindings.Bolt12PaymentError_unexpected_invoice();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicateInvoice-variant Bolt12PaymentError
	 */
	public static org.ldk.structs.Bolt12PaymentError duplicate_invoice() {
		long ret = bindings.Bolt12PaymentError_duplicate_invoice();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeatures-variant Bolt12PaymentError
	 */
	public static org.ldk.structs.Bolt12PaymentError unknown_required_features() {
		long ret = bindings.Bolt12PaymentError_unknown_required_features();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant Bolt12PaymentError
	 */
	public static org.ldk.structs.Bolt12PaymentError sending_failed(RetryableSendFailure a) {
		long ret = bindings.Bolt12PaymentError_sending_failed(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BlindedPathCreationFailed-variant Bolt12PaymentError
	 */
	public static org.ldk.structs.Bolt12PaymentError blinded_path_creation_failed() {
		long ret = bindings.Bolt12PaymentError_blinded_path_creation_failed();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt12PaymentError ret_hu_conv = org.ldk.structs.Bolt12PaymentError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Bolt12PaymentErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.Bolt12PaymentError b) {
		bool ret = bindings.Bolt12PaymentError_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Bolt12PaymentError)) return false;
		return this.eq((Bolt12PaymentError)o);
	}
}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An error that may occur when sending a payment probe.
 */
public class ProbingError : CommonBase {
	protected ProbingError(object _dummy, long ptr) : base(ptr) { }
	~ProbingError() {
		if (ptr != 0) { bindings.ProbingError_free(ptr); }
	}

	internal static ProbingError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKProbingError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ProbingError_Invoice(ptr);
			case 1: return new ProbingError_Sending(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ProbingError of type Invoice */
	public class ProbingError_Invoice : ProbingError {
		public string invoice;
		internal ProbingError_Invoice(long ptr) : base(null, ptr) {
			long invoice = bindings.LDKProbingError_Invoice_get_invoice(ptr);
			string invoice_conv = InternalUtils.decodeString(invoice);
			this.invoice = invoice_conv;
		}
	}
	/** A ProbingError of type Sending */
	public class ProbingError_Sending : ProbingError {
		public ProbeSendFailure sending;
		internal ProbingError_Sending(long ptr) : base(null, ptr) {
			long sending = bindings.LDKProbingError_Sending_get_sending(ptr);
			org.ldk.structs.ProbeSendFailure sending_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(sending);
			if (sending_hu_conv != null) { sending_hu_conv.ptrs_to.AddLast(this); };
			this.sending = sending_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ProbingError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbingError
	 */
	public ProbingError clone() {
		long ret = bindings.ProbingError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant ProbingError
	 */
	public static ProbingError invoice(string a) {
		long ret = bindings.ProbingError_invoice(InternalUtils.encodeString(a));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant ProbingError
	 */
	public static ProbingError sending(org.ldk.structs.ProbeSendFailure a) {
		long ret = bindings.ProbingError_sending(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ProbingErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.ProbingError b) {
		bool ret = bindings.ProbingError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ProbingError)) return false;
		return this.eq((ProbingError)o);
	}
}
} } }

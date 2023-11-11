using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Indicates that we failed to send a payment probe. Further errors may be surfaced later via
 * [`Event::ProbeFailed`].
 * 
 * [`Event::ProbeFailed`]: crate::events::Event::ProbeFailed
 */
public class ProbeSendFailure : CommonBase {
	protected ProbeSendFailure(object _dummy, long ptr) : base(ptr) { }
	~ProbeSendFailure() {
		if (ptr != 0) { bindings.ProbeSendFailure_free(ptr); }
	}

	internal static ProbeSendFailure constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKProbeSendFailure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ProbeSendFailure_RouteNotFound(ptr);
			case 1: return new ProbeSendFailure_SendingFailed(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ProbeSendFailure of type RouteNotFound */
	public class ProbeSendFailure_RouteNotFound : ProbeSendFailure {
		internal ProbeSendFailure_RouteNotFound(long ptr) : base(null, ptr) {
		}
	}
	/** A ProbeSendFailure of type SendingFailed */
	public class ProbeSendFailure_SendingFailed : ProbeSendFailure {
		public PaymentSendFailure sending_failed;
		internal ProbeSendFailure_SendingFailed(long ptr) : base(null, ptr) {
			long sending_failed = bindings.LDKProbeSendFailure_SendingFailed_get_sending_failed(ptr);
			org.ldk.structs.PaymentSendFailure sending_failed_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(sending_failed);
			if (sending_failed_hu_conv != null) { sending_failed_hu_conv.ptrs_to.AddLast(this); };
			this.sending_failed = sending_failed_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ProbeSendFailure_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbeSendFailure
	 */
	public ProbeSendFailure clone() {
		long ret = bindings.ProbeSendFailure_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RouteNotFound-variant ProbeSendFailure
	 */
	public static ProbeSendFailure route_not_found() {
		long ret = bindings.ProbeSendFailure_route_not_found();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendingFailed-variant ProbeSendFailure
	 */
	public static ProbeSendFailure sending_failed(org.ldk.structs.PaymentSendFailure a) {
		long ret = bindings.ProbeSendFailure_sending_failed(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbeSendFailure ret_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ProbeSendFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.ProbeSendFailure b) {
		bool ret = bindings.ProbeSendFailure_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is ProbeSendFailure)) return false;
		return this.eq((ProbeSendFailure)o);
	}
}
} } }

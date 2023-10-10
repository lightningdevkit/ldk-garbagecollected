using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::PaymentFailureReason or not
 */
public class Option_PaymentFailureReasonZ : CommonBase {
	protected Option_PaymentFailureReasonZ(object _dummy, long ptr) : base(ptr) { }
	~Option_PaymentFailureReasonZ() {
		if (ptr != 0) { bindings.COption_PaymentFailureReasonZ_free(ptr); }
	}

	internal static Option_PaymentFailureReasonZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_PaymentFailureReasonZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaymentFailureReasonZ_Some(ptr);
			case 1: return new Option_PaymentFailureReasonZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_PaymentFailureReasonZ of type Some */
	public class Option_PaymentFailureReasonZ_Some : Option_PaymentFailureReasonZ {
		public PaymentFailureReason some;
		internal Option_PaymentFailureReasonZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_PaymentFailureReasonZ_Some_get_some(ptr);
		}
	}
	/** A Option_PaymentFailureReasonZ of type None */
	public class Option_PaymentFailureReasonZ_None : Option_PaymentFailureReasonZ {
		internal Option_PaymentFailureReasonZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing a crate::lightning::events::PaymentFailureReason
	 */
	public static Option_PaymentFailureReasonZ some(PaymentFailureReason o) {
		long ret = bindings.COption_PaymentFailureReasonZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing nothing
	 */
	public static Option_PaymentFailureReasonZ none() {
		long ret = bindings.COption_PaymentFailureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_PaymentFailureReasonZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaymentFailureReasonZ clone() {
		long ret = bindings.COption_PaymentFailureReasonZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

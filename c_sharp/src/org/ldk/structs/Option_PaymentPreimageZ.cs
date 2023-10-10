using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::ThirtyTwoBytes or not
 */
public class Option_PaymentPreimageZ : CommonBase {
	protected Option_PaymentPreimageZ(object _dummy, long ptr) : base(ptr) { }
	~Option_PaymentPreimageZ() {
		if (ptr != 0) { bindings.COption_PaymentPreimageZ_free(ptr); }
	}

	internal static Option_PaymentPreimageZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_PaymentPreimageZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaymentPreimageZ_Some(ptr);
			case 1: return new Option_PaymentPreimageZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_PaymentPreimageZ of type Some */
	public class Option_PaymentPreimageZ_Some : Option_PaymentPreimageZ {
		public byte[] some;
		internal Option_PaymentPreimageZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_PaymentPreimageZ_Some_get_some(ptr);
		}
	}
	/** A Option_PaymentPreimageZ of type None */
	public class Option_PaymentPreimageZ_None : Option_PaymentPreimageZ {
		internal Option_PaymentPreimageZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_PaymentPreimageZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_PaymentPreimageZ some(byte[] o) {
		long ret = bindings.COption_PaymentPreimageZ_some(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentPreimageZ containing nothing
	 */
	public static Option_PaymentPreimageZ none() {
		long ret = bindings.COption_PaymentPreimageZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_PaymentPreimageZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentPreimageZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaymentPreimageZ clone() {
		long ret = bindings.COption_PaymentPreimageZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentPreimageZ ret_hu_conv = org.ldk.structs.Option_PaymentPreimageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

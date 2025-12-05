using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::events::PaidBolt12Invoice or not
 */
public class Option_PaidBolt12InvoiceZ : CommonBase {
	protected Option_PaidBolt12InvoiceZ(object _dummy, long ptr) : base(ptr) { }
	~Option_PaidBolt12InvoiceZ() {
		if (ptr != 0) { bindings.COption_PaidBolt12InvoiceZ_free(ptr); }
	}

	internal static Option_PaidBolt12InvoiceZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_PaidBolt12InvoiceZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_PaidBolt12InvoiceZ_Some(ptr);
			case 1: return new Option_PaidBolt12InvoiceZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_PaidBolt12InvoiceZ of type Some */
	public class Option_PaidBolt12InvoiceZ_Some : Option_PaidBolt12InvoiceZ {
		public org.ldk.structs.PaidBolt12Invoice some;
		internal Option_PaidBolt12InvoiceZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_PaidBolt12InvoiceZ_Some_get_some(ptr);
			org.ldk.structs.PaidBolt12Invoice some_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_PaidBolt12InvoiceZ of type None */
	public class Option_PaidBolt12InvoiceZ_None : Option_PaidBolt12InvoiceZ {
		internal Option_PaidBolt12InvoiceZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing a crate::lightning::events::PaidBolt12Invoice
	 */
	public static org.ldk.structs.Option_PaidBolt12InvoiceZ some(org.ldk.structs.PaidBolt12Invoice o) {
		long ret = bindings.COption_PaidBolt12InvoiceZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing nothing
	 */
	public static org.ldk.structs.Option_PaidBolt12InvoiceZ none() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaidBolt12InvoiceZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_PaidBolt12InvoiceZ clone() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

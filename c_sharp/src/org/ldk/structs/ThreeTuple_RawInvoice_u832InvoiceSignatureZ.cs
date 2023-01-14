using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_RawInvoice_u832InvoiceSignatureZ : CommonBase {
	internal ThreeTuple_RawInvoice_u832InvoiceSignatureZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_RawInvoice_u832InvoiceSignatureZ() {
		if (ptr != 0) { bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(ptr); }
	}

	/**
	 * 
	 */
	public RawInvoice get_a() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * 
	 */
	public InvoiceSignature get_c() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ clone() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_RawInvoice_u832InvoiceSignatureZ from the contained elements.
	 */
	public static ThreeTuple_RawInvoice_u832InvoiceSignatureZ of(org.ldk.structs.RawInvoice a, byte[] b, org.ldk.structs.InvoiceSignature c) {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(a == null ? 0 : a.ptr, InternalUtils.check_arr_len(b, 32), c == null ? 0 : c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(c); };
		return ret_hu_conv;
	}

}
} } }

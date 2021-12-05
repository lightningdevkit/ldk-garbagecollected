package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ThreeTuple_RawInvoice_u832InvoiceSignatureZ extends CommonBase {
	ThreeTuple_RawInvoice_u832InvoiceSignatureZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_free(ptr); }
	}

	/**
	 * 
	 */
	public RawInvoice get_a() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		RawInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new RawInvoice(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public InvoiceSignature get_c() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new InvoiceSignature(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_RawInvoice_u832InvoiceSignatureZ clone() {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_RawInvoice_u832InvoiceSignatureZ from the contained elements.
	 */
	public static ThreeTuple_RawInvoice_u832InvoiceSignatureZ of(RawInvoice a, byte[] b, InvoiceSignature c) {
		long ret = bindings.C3Tuple_RawInvoice_u832InvoiceSignatureZ_new(a == null ? 0 : a.ptr & ~1, InternalUtils.check_arr_len(b, 32), c == null ? 0 : c.ptr & ~1);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawInvoice_u832InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawInvoice_u832InvoiceSignatureZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

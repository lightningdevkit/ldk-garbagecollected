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
public class ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ extends CommonBase {
	ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_free(ptr); }
	}

	/**
	 * 
	 */
	public RawBolt11Invoice get_a() {
		long ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.RawBolt11Invoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.RawBolt11Invoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * 
	 */
	public Bolt11InvoiceSignature get_c() {
		long ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_get_c(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11InvoiceSignature ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11InvoiceSignature(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ clone() {
		long ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ from the contained elements.
	 */
	public static ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ of(org.ldk.structs.RawBolt11Invoice a, byte[] b, org.ldk.structs.Bolt11InvoiceSignature c) {
		long ret = bindings.C3Tuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ_new(a == null ? 0 : a.ptr, InternalUtils.check_arr_len(b, 32), c == null ? 0 : c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ ret_hu_conv = new ThreeTuple_RawBolt11Invoice_u832Bolt11InvoiceSignatureZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(c); };
		return ret_hu_conv;
	}

}

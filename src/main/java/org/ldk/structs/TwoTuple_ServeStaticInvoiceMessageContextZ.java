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
public class TwoTuple_ServeStaticInvoiceMessageContextZ extends CommonBase {
	TwoTuple_ServeStaticInvoiceMessageContextZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_free(ptr); }
	}

	/**
	 * 
	 */
	public ServeStaticInvoice get_a() {
		long ret = bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_get_a(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ServeStaticInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ServeStaticInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public MessageContext get_b() {
		long ret = bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_get_b(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageContext ret_hu_conv = org.ldk.structs.MessageContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_ServeStaticInvoiceMessageContextZ clone() {
		long ret = bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ServeStaticInvoiceMessageContextZ ret_hu_conv = new TwoTuple_ServeStaticInvoiceMessageContextZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ServeStaticInvoiceMessageContextZ from the contained elements.
	 */
	public static TwoTuple_ServeStaticInvoiceMessageContextZ of(org.ldk.structs.ServeStaticInvoice a, org.ldk.structs.MessageContext b) {
		long ret = bindings.C2Tuple_ServeStaticInvoiceMessageContextZ_new(a.ptr, b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_ServeStaticInvoiceMessageContextZ ret_hu_conv = new TwoTuple_ServeStaticInvoiceMessageContextZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

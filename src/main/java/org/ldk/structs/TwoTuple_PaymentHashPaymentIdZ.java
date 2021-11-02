package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A Tuple
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class TwoTuple_PaymentHashPaymentIdZ extends CommonBase {
	TwoTuple_PaymentHashPaymentIdZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.C2Tuple_PaymentHashPaymentIdZ_free(ptr); }
	}

	/**
	 * 
	 */
	public byte[] get_a() {
		byte[] ret = bindings.C2Tuple_PaymentHashPaymentIdZ_get_a(this.ptr);
		return ret;
	}

	/**
	 * 
	 */
	public byte[] get_b() {
		byte[] ret = bindings.C2Tuple_PaymentHashPaymentIdZ_get_b(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public TwoTuple_PaymentHashPaymentIdZ clone() {
		long ret = bindings.C2Tuple_PaymentHashPaymentIdZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PaymentHashPaymentIdZ ret_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_PaymentHashPaymentIdZ from the contained elements.
	 */
	public static TwoTuple_PaymentHashPaymentIdZ of(byte[] a, byte[] b) {
		long ret = bindings.C2Tuple_PaymentHashPaymentIdZ_new(a, b);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PaymentHashPaymentIdZ ret_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

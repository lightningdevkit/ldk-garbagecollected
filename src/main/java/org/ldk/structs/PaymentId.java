package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A payment identifier used to uniquely identify a payment to LDK.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentId extends CommonBase {
	PaymentId(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentId_free(ptr); }
	}

	/**
	 * Checks if two PaymentIds contain equal inner contents.
	 */
	public long hash() {
		long ret = bindings.PaymentId_hash(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentId
	 */
	public PaymentId clone() {
		long ret = bindings.PaymentId_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		PaymentId ret_hu_conv = new PaymentId(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(PaymentId b) {
		boolean ret = bindings.PaymentId_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		this.ptrs_to.add(b);
		return ret;
	}

	/**
	 * Serialize the PaymentId object into a byte array which can be read by PaymentId_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaymentId_write(this.ptr);
		return ret;
	}

	/**
	 * Read a PaymentId from a byte array, created by PaymentId_write
	 */
	public static Result_PaymentIdDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaymentId_read(ser);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

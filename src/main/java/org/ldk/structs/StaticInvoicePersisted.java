package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Confirmation from a static invoice server  that a [`StaticInvoice`] was persisted and the
 * corresponding [`Offer`] is ready to be used to receive async payments. Sent to an async
 * recipient in response to a [`ServeStaticInvoice`] message.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class StaticInvoicePersisted extends CommonBase {
	StaticInvoicePersisted(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.StaticInvoicePersisted_free(ptr); }
	}

	/**
	 * Constructs a new StaticInvoicePersisted given each field
	 */
	public static StaticInvoicePersisted of() {
		long ret = bindings.StaticInvoicePersisted_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoicePersisted ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoicePersisted(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.StaticInvoicePersisted_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the StaticInvoicePersisted
	 */
	public StaticInvoicePersisted clone() {
		long ret = bindings.StaticInvoicePersisted_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoicePersisted ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoicePersisted(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticInvoicePersisted object into a byte array which can be read by StaticInvoicePersisted_read
	 */
	public byte[] write() {
		byte[] ret = bindings.StaticInvoicePersisted_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a StaticInvoicePersisted from a byte array, created by StaticInvoicePersisted_write
	 */
	public static Result_StaticInvoicePersistedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticInvoicePersisted_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoicePersistedDecodeErrorZ ret_hu_conv = Result_StaticInvoicePersistedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

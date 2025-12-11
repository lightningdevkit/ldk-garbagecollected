using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Confirmation from a static invoice server  that a [`StaticInvoice`] was persisted and the
 * corresponding [`Offer`] is ready to be used to receive async payments. Sent to an async
 * recipient in response to a [`ServeStaticInvoice`] message.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
public class StaticInvoicePersisted : CommonBase {
	internal StaticInvoicePersisted(object _dummy, long ptr) : base(ptr) { }
	~StaticInvoicePersisted() {
		if (ptr != 0) { bindings.StaticInvoicePersisted_free(ptr); }
	}

	/**
	 * Constructs a new StaticInvoicePersisted given each field
	 */
	public static org.ldk.structs.StaticInvoicePersisted of() {
		long ret = bindings.StaticInvoicePersisted_new();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoicePersisted ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoicePersisted(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.StaticInvoicePersisted_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the StaticInvoicePersisted
	 */
	public org.ldk.structs.StaticInvoicePersisted clone() {
		long ret = bindings.StaticInvoicePersisted_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoicePersisted ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoicePersisted(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticInvoicePersisted object into a byte array which can be read by StaticInvoicePersisted_read
	 */
	public byte[] write() {
		long ret = bindings.StaticInvoicePersisted_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StaticInvoicePersisted from a byte array, created by StaticInvoicePersisted_write
	 */
	public static org.ldk.structs.Result_StaticInvoicePersistedDecodeErrorZ read(byte[] ser) {
		long ret = bindings.StaticInvoicePersisted_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoicePersistedDecodeErrorZ ret_hu_conv = Result_StaticInvoicePersistedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The BOLT 12 invoice that was paid, surfaced in [`Event::PaymentSent::bolt12_invoice`].
 */
public class PaidBolt12Invoice : CommonBase {
	protected PaidBolt12Invoice(object _dummy, long ptr) : base(ptr) { }
	~PaidBolt12Invoice() {
		if (ptr != 0) { bindings.PaidBolt12Invoice_free(ptr); }
	}

	internal static PaidBolt12Invoice constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPaidBolt12Invoice_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaidBolt12Invoice_Bolt12Invoice(ptr);
			case 1: return new PaidBolt12Invoice_StaticInvoice(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PaidBolt12Invoice of type Bolt12Invoice */
	public class PaidBolt12Invoice_Bolt12Invoice : PaidBolt12Invoice {
		public org.ldk.structs.Bolt12Invoice bolt12_invoice;
		internal PaidBolt12Invoice_Bolt12Invoice(long ptr) : base(null, ptr) {
			long bolt12_invoice = bindings.LDKPaidBolt12Invoice_Bolt12Invoice_get_bolt12_invoice(ptr);
			org.ldk.structs.Bolt12Invoice bolt12_invoice_hu_conv = null; if (bolt12_invoice < 0 || bolt12_invoice > 4096) { bolt12_invoice_hu_conv = new org.ldk.structs.Bolt12Invoice(null, bolt12_invoice); }
			if (bolt12_invoice_hu_conv != null) { bolt12_invoice_hu_conv.ptrs_to.AddLast(this); };
			this.bolt12_invoice = bolt12_invoice_hu_conv;
		}
	}
	/** A PaidBolt12Invoice of type StaticInvoice */
	public class PaidBolt12Invoice_StaticInvoice : PaidBolt12Invoice {
		public org.ldk.structs.StaticInvoice static_invoice;
		internal PaidBolt12Invoice_StaticInvoice(long ptr) : base(null, ptr) {
			long static_invoice = bindings.LDKPaidBolt12Invoice_StaticInvoice_get_static_invoice(ptr);
			org.ldk.structs.StaticInvoice static_invoice_hu_conv = null; if (static_invoice < 0 || static_invoice > 4096) { static_invoice_hu_conv = new org.ldk.structs.StaticInvoice(null, static_invoice); }
			if (static_invoice_hu_conv != null) { static_invoice_hu_conv.ptrs_to.AddLast(this); };
			this.static_invoice = static_invoice_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PaidBolt12Invoice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaidBolt12Invoice
	 */
	public org.ldk.structs.PaidBolt12Invoice clone() {
		long ret = bindings.PaidBolt12Invoice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Invoice-variant PaidBolt12Invoice
	 */
	public static org.ldk.structs.PaidBolt12Invoice bolt12_invoice(org.ldk.structs.Bolt12Invoice a) {
		long ret = bindings.PaidBolt12Invoice_bolt12_invoice(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoice-variant PaidBolt12Invoice
	 */
	public static org.ldk.structs.PaidBolt12Invoice static_invoice(org.ldk.structs.StaticInvoice a) {
		long ret = bindings.PaidBolt12Invoice_static_invoice(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaidBolt12Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.PaidBolt12Invoice b) {
		bool ret = bindings.PaidBolt12Invoice_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PaidBolt12Invoice)) return false;
		return this.eq((PaidBolt12Invoice)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the PaidBolt12Invoice.
	 */
	public long hash() {
		long ret = bindings.PaidBolt12Invoice_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the PaidBolt12Invoice object into a byte array which can be read by PaidBolt12Invoice_read
	 */
	public byte[] write() {
		long ret = bindings.PaidBolt12Invoice_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaidBolt12Invoice from a byte array, created by PaidBolt12Invoice_write
	 */
	public static org.ldk.structs.Result_PaidBolt12InvoiceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaidBolt12Invoice_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

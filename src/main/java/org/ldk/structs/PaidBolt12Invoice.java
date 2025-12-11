package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The BOLT 12 invoice that was paid, surfaced in [`Event::PaymentSent::bolt12_invoice`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaidBolt12Invoice extends CommonBase {
	private PaidBolt12Invoice(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaidBolt12Invoice_free(ptr); }
	}
	static PaidBolt12Invoice constr_from_ptr(long ptr) {
		bindings.LDKPaidBolt12Invoice raw_val = bindings.LDKPaidBolt12Invoice_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPaidBolt12Invoice.Bolt12Invoice.class) {
			return new Bolt12Invoice(ptr, (bindings.LDKPaidBolt12Invoice.Bolt12Invoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaidBolt12Invoice.StaticInvoice.class) {
			return new StaticInvoice(ptr, (bindings.LDKPaidBolt12Invoice.StaticInvoice)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The BOLT 12 invoice specified by the BOLT 12 specification,
	 * allowing the user to perform proof of payment.
	 */
	public final static class Bolt12Invoice extends PaidBolt12Invoice {
		public final org.ldk.structs.Bolt12Invoice bolt12_invoice;
		private Bolt12Invoice(long ptr, bindings.LDKPaidBolt12Invoice.Bolt12Invoice obj) {
			super(null, ptr);
			long bolt12_invoice = obj.bolt12_invoice;
			org.ldk.structs.Bolt12Invoice bolt12_invoice_hu_conv = null; if (bolt12_invoice < 0 || bolt12_invoice > 4096) { bolt12_invoice_hu_conv = new org.ldk.structs.Bolt12Invoice(null, bolt12_invoice); }
			if (bolt12_invoice_hu_conv != null) { bolt12_invoice_hu_conv.ptrs_to.add(this); };
			this.bolt12_invoice = bolt12_invoice_hu_conv;
		}
	}
	/**
	 * The Static invoice, used in the async payment specification update proposal,
	 * where the user cannot perform proof of payment.
	 */
	public final static class StaticInvoice extends PaidBolt12Invoice {
		public final org.ldk.structs.StaticInvoice static_invoice;
		private StaticInvoice(long ptr, bindings.LDKPaidBolt12Invoice.StaticInvoice obj) {
			super(null, ptr);
			long static_invoice = obj.static_invoice;
			org.ldk.structs.StaticInvoice static_invoice_hu_conv = null; if (static_invoice < 0 || static_invoice > 4096) { static_invoice_hu_conv = new org.ldk.structs.StaticInvoice(null, static_invoice); }
			if (static_invoice_hu_conv != null) { static_invoice_hu_conv.ptrs_to.add(this); };
			this.static_invoice = static_invoice_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PaidBolt12Invoice_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaidBolt12Invoice
	 */
	public PaidBolt12Invoice clone() {
		long ret = bindings.PaidBolt12Invoice_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12Invoice-variant PaidBolt12Invoice
	 */
	public static PaidBolt12Invoice bolt12_invoice(org.ldk.structs.Bolt12Invoice a) {
		long ret = bindings.PaidBolt12Invoice_bolt12_invoice(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoice-variant PaidBolt12Invoice
	 */
	public static PaidBolt12Invoice static_invoice(org.ldk.structs.StaticInvoice a) {
		long ret = bindings.PaidBolt12Invoice_static_invoice(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaidBolt12Invoice ret_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaidBolt12Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.PaidBolt12Invoice b) {
		boolean ret = bindings.PaidBolt12Invoice_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PaidBolt12Invoice)) return false;
		return this.eq((PaidBolt12Invoice)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the PaidBolt12Invoice.
	 */
	public long hash() {
		long ret = bindings.PaidBolt12Invoice_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Serialize the PaidBolt12Invoice object into a byte array which can be read by PaidBolt12Invoice_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PaidBolt12Invoice_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PaidBolt12Invoice from a byte array, created by PaidBolt12Invoice_write
	 */
	public static Result_PaidBolt12InvoiceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PaidBolt12Invoice_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::events::PaidBolt12Invoice or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_PaidBolt12InvoiceZ extends CommonBase {
	private Option_PaidBolt12InvoiceZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PaidBolt12InvoiceZ_free(ptr); }
	}
	static Option_PaidBolt12InvoiceZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PaidBolt12InvoiceZ raw_val = bindings.LDKCOption_PaidBolt12InvoiceZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PaidBolt12InvoiceZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PaidBolt12InvoiceZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PaidBolt12InvoiceZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PaidBolt12InvoiceZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PaidBolt12InvoiceZ contains a crate::lightning::events::PaidBolt12Invoice
	 */
	public final static class Some extends Option_PaidBolt12InvoiceZ {
		public final org.ldk.structs.PaidBolt12Invoice some;
		private Some(long ptr, bindings.LDKCOption_PaidBolt12InvoiceZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.PaidBolt12Invoice some_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_PaidBolt12InvoiceZ contains nothing
	 */
	public final static class None extends Option_PaidBolt12InvoiceZ {
		private None(long ptr, bindings.LDKCOption_PaidBolt12InvoiceZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing a crate::lightning::events::PaidBolt12Invoice
	 */
	public static Option_PaidBolt12InvoiceZ some(org.ldk.structs.PaidBolt12Invoice o) {
		long ret = bindings.COption_PaidBolt12InvoiceZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaidBolt12InvoiceZ containing nothing
	 */
	public static Option_PaidBolt12InvoiceZ none() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaidBolt12InvoiceZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaidBolt12InvoiceZ clone() {
		long ret = bindings.COption_PaidBolt12InvoiceZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaidBolt12InvoiceZ ret_hu_conv = org.ldk.structs.Option_PaidBolt12InvoiceZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

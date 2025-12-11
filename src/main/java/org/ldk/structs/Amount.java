package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The minimum amount required for an item in an [`Offer`], denominated in either bitcoin or
 * another currency.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Amount extends CommonBase {
	private Amount(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Amount_free(ptr); }
	}
	static Amount constr_from_ptr(long ptr) {
		bindings.LDKAmount raw_val = bindings.LDKAmount_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKAmount.Bitcoin.class) {
			return new Bitcoin(ptr, (bindings.LDKAmount.Bitcoin)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAmount.Currency.class) {
			return new Currency(ptr, (bindings.LDKAmount.Currency)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An amount of bitcoin.
	 */
	public final static class Bitcoin extends Amount {
		/**
		 * The amount in millisatoshi.
		*/
		public final long amount_msats;
		private Bitcoin(long ptr, bindings.LDKAmount.Bitcoin obj) {
			super(null, ptr);
			this.amount_msats = obj.amount_msats;
		}
	}
	/**
	 * An amount of currency specified using ISO 4217.
	 */
	public final static class Currency extends Amount {
		/**
		 * The currency that the amount is denominated in.
		*/
		public final org.ldk.structs.CurrencyCode iso4217_code;
		/**
		 * The amount in the currency unit adjusted by the ISO 4217 exponent (e.g., USD cents).
		*/
		public final long amount;
		private Currency(long ptr, bindings.LDKAmount.Currency obj) {
			super(null, ptr);
			long iso4217_code = obj.iso4217_code;
			org.ldk.structs.CurrencyCode iso4217_code_hu_conv = null; if (iso4217_code < 0 || iso4217_code > 4096) { iso4217_code_hu_conv = new org.ldk.structs.CurrencyCode(null, iso4217_code); }
			if (iso4217_code_hu_conv != null) { iso4217_code_hu_conv.ptrs_to.add(this); };
			this.iso4217_code = iso4217_code_hu_conv;
			this.amount = obj.amount;
		}
	}
	long clone_ptr() {
		long ret = bindings.Amount_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Amount
	 */
	public Amount clone() {
		long ret = bindings.Amount_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bitcoin-variant Amount
	 */
	public static Amount bitcoin(long amount_msats) {
		long ret = bindings.Amount_bitcoin(amount_msats);
		Reference.reachabilityFence(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Currency-variant Amount
	 */
	public static Amount currency(org.ldk.structs.CurrencyCode iso4217_code, long amount) {
		long ret = bindings.Amount_currency(iso4217_code.ptr, amount);
		Reference.reachabilityFence(iso4217_code);
		Reference.reachabilityFence(amount);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

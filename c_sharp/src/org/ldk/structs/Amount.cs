using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The minimum amount required for an item in an [`Offer`], denominated in either bitcoin or
 * another currency.
 */
public class Amount : CommonBase {
	protected Amount(object _dummy, long ptr) : base(ptr) { }
	~Amount() {
		if (ptr != 0) { bindings.Amount_free(ptr); }
	}

	internal static Amount constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKAmount_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Amount_Bitcoin(ptr);
			case 1: return new Amount_Currency(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Amount of type Bitcoin */
	public class Amount_Bitcoin : Amount {
		/**
		 * The amount in millisatoshi.
		 */
		public long amount_msats;
		internal Amount_Bitcoin(long ptr) : base(null, ptr) {
			this.amount_msats = bindings.LDKAmount_Bitcoin_get_amount_msats(ptr);
		}
	}
	/** A Amount of type Currency */
	public class Amount_Currency : Amount {
		/**
		 * The currency that the amount is denominated in.
		 */
		public org.ldk.structs.CurrencyCode iso4217_code;
		/**
		 * The amount in the currency unit adjusted by the ISO 4217 exponent (e.g., USD cents).
		 */
		public long amount;
		internal Amount_Currency(long ptr) : base(null, ptr) {
			long iso4217_code = bindings.LDKAmount_Currency_get_iso4217_code(ptr);
			org.ldk.structs.CurrencyCode iso4217_code_hu_conv = null; if (iso4217_code < 0 || iso4217_code > 4096) { iso4217_code_hu_conv = new org.ldk.structs.CurrencyCode(null, iso4217_code); }
			if (iso4217_code_hu_conv != null) { iso4217_code_hu_conv.ptrs_to.AddLast(this); };
			this.iso4217_code = iso4217_code_hu_conv;
			this.amount = bindings.LDKAmount_Currency_get_amount(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Amount_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Amount
	 */
	public org.ldk.structs.Amount clone() {
		long ret = bindings.Amount_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bitcoin-variant Amount
	 */
	public static org.ldk.structs.Amount bitcoin(long amount_msats) {
		long ret = bindings.Amount_bitcoin(amount_msats);
		GC.KeepAlive(amount_msats);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Currency-variant Amount
	 */
	public static org.ldk.structs.Amount currency(org.ldk.structs.CurrencyCode iso4217_code, long amount) {
		long ret = bindings.Amount_currency(iso4217_code.ptr, amount);
		GC.KeepAlive(iso4217_code);
		GC.KeepAlive(amount);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Amount ret_hu_conv = org.ldk.structs.Amount.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

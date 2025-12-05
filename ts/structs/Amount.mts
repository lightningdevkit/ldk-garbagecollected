
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The minimum amount required for an item in an [`Offer`], denominated in either bitcoin or
 * another currency.
 */
export class Amount extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Amount_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Amount {
		const raw_ty: number = bindings.LDKAmount_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Amount_Bitcoin(ptr);
			case 1: return new Amount_Currency(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Amount_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Amount
	 */
	public clone(): Amount {
		const ret: bigint = bindings.Amount_clone(this.ptr);
		const ret_hu_conv: Amount = Amount.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bitcoin-variant Amount
	 */
	public static constructor_bitcoin(amount_msats: bigint): Amount {
		const ret: bigint = bindings.Amount_bitcoin(amount_msats);
		const ret_hu_conv: Amount = Amount.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Currency-variant Amount
	 */
	public static constructor_currency(iso4217_code: CurrencyCode, amount: bigint): Amount {
		const ret: bigint = bindings.Amount_currency(CommonBase.get_ptr_of(iso4217_code), amount);
		const ret_hu_conv: Amount = Amount.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Amount of type Bitcoin */
export class Amount_Bitcoin extends Amount {
	/**
	 * The amount in millisatoshi.
	 */
	public amount_msats: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_msats = bindings.LDKAmount_Bitcoin_get_amount_msats(ptr);
	}
}
/** A Amount of type Currency */
export class Amount_Currency extends Amount {
	/**
	 * The currency that the amount is denominated in.
	 */
	public iso4217_code: CurrencyCode;
	/**
	 * The amount in the currency unit adjusted by the ISO 4217 exponent (e.g., USD cents).
	 */
	public amount: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const iso4217_code: bigint = bindings.LDKAmount_Currency_get_iso4217_code(ptr);
		const iso4217_code_hu_conv: CurrencyCode = new CurrencyCode(null, iso4217_code);
			CommonBase.add_ref_from(iso4217_code_hu_conv, this);
		this.iso4217_code = iso4217_code_hu_conv;
		this.amount = bindings.LDKAmount_Currency_get_amount(ptr);
	}
}

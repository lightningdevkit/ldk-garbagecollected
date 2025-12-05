
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Quantity of items supported by an [`Offer`].
 */
export class Quantity extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Quantity_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Quantity {
		const raw_ty: number = bindings.LDKQuantity_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Quantity_Bounded(ptr);
			case 1: return new Quantity_Unbounded(ptr);
			case 2: return new Quantity_One(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Quantity_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Quantity
	 */
	public clone(): Quantity {
		const ret: bigint = bindings.Quantity_clone(this.ptr);
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bounded-variant Quantity
	 */
	public static constructor_bounded(a: bigint): Quantity {
		const ret: bigint = bindings.Quantity_bounded(a);
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Unbounded-variant Quantity
	 */
	public static constructor_unbounded(): Quantity {
		const ret: bigint = bindings.Quantity_unbounded();
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new One-variant Quantity
	 */
	public static constructor_one(): Quantity {
		const ret: bigint = bindings.Quantity_one();
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A Quantity of type Bounded */
export class Quantity_Bounded extends Quantity {
	public bounded: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.bounded = bindings.LDKQuantity_Bounded_get_bounded(ptr);
	}
}
/** A Quantity of type Unbounded */
export class Quantity_Unbounded extends Quantity {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Quantity of type One */
export class Quantity_One extends Quantity {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

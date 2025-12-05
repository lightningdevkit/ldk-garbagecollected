
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * A `enum` signalling to the [`OutputSweeper`] that it should delay spending an output until a
 * future block height is reached.
 */
export class SpendingDelay extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SpendingDelay_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SpendingDelay {
		const raw_ty: number = bindings.LDKSpendingDelay_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SpendingDelay_Relative(ptr);
			case 1: return new SpendingDelay_Absolute(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpendingDelay_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpendingDelay
	 */
	public clone(): SpendingDelay {
		const ret: bigint = bindings.SpendingDelay_clone(this.ptr);
		const ret_hu_conv: SpendingDelay = SpendingDelay.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Relative-variant SpendingDelay
	 */
	public static constructor_relative(num_blocks: number): SpendingDelay {
		const ret: bigint = bindings.SpendingDelay_relative(num_blocks);
		const ret_hu_conv: SpendingDelay = SpendingDelay.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Absolute-variant SpendingDelay
	 */
	public static constructor_absolute(height: number): SpendingDelay {
		const ret: bigint = bindings.SpendingDelay_absolute(height);
		const ret_hu_conv: SpendingDelay = SpendingDelay.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A SpendingDelay of type Relative */
export class SpendingDelay_Relative extends SpendingDelay {
	/**
	 * The number of blocks until we'll generate and broadcast the spending transaction.
	 */
	public num_blocks: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.num_blocks = bindings.LDKSpendingDelay_Relative_get_num_blocks(ptr);
	}
}
/** A SpendingDelay of type Absolute */
export class SpendingDelay_Absolute extends SpendingDelay {
	/**
	 * The height at which we'll generate and broadcast the spending transaction.
	 */
	public height: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.height = bindings.LDKSpendingDelay_Absolute_get_height(ptr);
	}
}

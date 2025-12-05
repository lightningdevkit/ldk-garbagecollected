
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Represents an error returned from the bech32 library during validation of some bech32 data
 */
export class Bech32Error extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Bech32Error_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Bech32Error {
		const raw_ty: number = bindings.LDKBech32Error_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Bech32Error_MissingSeparator(ptr);
			case 1: return new Bech32Error_InvalidChecksum(ptr);
			case 2: return new Bech32Error_InvalidLength(ptr);
			case 3: return new Bech32Error_InvalidChar(ptr);
			case 4: return new Bech32Error_InvalidData(ptr);
			case 5: return new Bech32Error_InvalidPadding(ptr);
			case 6: return new Bech32Error_MixedCase(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bech32Error_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new Bech32Error which has the same data as `orig`
	 */
	public clone(): Bech32Error {
		const ret: bigint = bindings.Bech32Error_clone(this.ptr);
		const ret_hu_conv: Bech32Error = Bech32Error.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Bech32Error of type MissingSeparator */
export class Bech32Error_MissingSeparator extends Bech32Error {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bech32Error of type InvalidChecksum */
export class Bech32Error_InvalidChecksum extends Bech32Error {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bech32Error of type InvalidLength */
export class Bech32Error_InvalidLength extends Bech32Error {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bech32Error of type InvalidChar */
export class Bech32Error_InvalidChar extends Bech32Error {
	public invalid_char: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.invalid_char = bindings.LDKBech32Error_InvalidChar_get_invalid_char(ptr);
	}
}
/** A Bech32Error of type InvalidData */
export class Bech32Error_InvalidData extends Bech32Error {
	public invalid_data: number;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.invalid_data = bindings.LDKBech32Error_InvalidData_get_invalid_data(ptr);
	}
}
/** A Bech32Error of type InvalidPadding */
export class Bech32Error_InvalidPadding extends Bech32Error {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A Bech32Error of type MixedCase */
export class Bech32Error_MixedCase extends Bech32Error {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An error in decoding a message or struct.
 */
export class DecodeError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.DecodeError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): DecodeError {
		const raw_ty: number = bindings.LDKDecodeError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new DecodeError_UnknownVersion(ptr);
			case 1: return new DecodeError_UnknownRequiredFeature(ptr);
			case 2: return new DecodeError_InvalidValue(ptr);
			case 3: return new DecodeError_ShortRead(ptr);
			case 4: return new DecodeError_BadLengthDescriptor(ptr);
			case 5: return new DecodeError_Io(ptr);
			case 6: return new DecodeError_UnsupportedCompression(ptr);
			case 7: return new DecodeError_DangerousValue(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DecodeError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DecodeError
	 */
	public clone(): DecodeError {
		const ret: bigint = bindings.DecodeError_clone(this.ptr);
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownVersion-variant DecodeError
	 */
	public static constructor_unknown_version(): DecodeError {
		const ret: bigint = bindings.DecodeError_unknown_version();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnknownRequiredFeature-variant DecodeError
	 */
	public static constructor_unknown_required_feature(): DecodeError {
		const ret: bigint = bindings.DecodeError_unknown_required_feature();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvalidValue-variant DecodeError
	 */
	public static constructor_invalid_value(): DecodeError {
		const ret: bigint = bindings.DecodeError_invalid_value();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ShortRead-variant DecodeError
	 */
	public static constructor_short_read(): DecodeError {
		const ret: bigint = bindings.DecodeError_short_read();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BadLengthDescriptor-variant DecodeError
	 */
	public static constructor_bad_length_descriptor(): DecodeError {
		const ret: bigint = bindings.DecodeError_bad_length_descriptor();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Io-variant DecodeError
	 */
	public static constructor_io(a: IOError): DecodeError {
		const ret: bigint = bindings.DecodeError_io(a);
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new UnsupportedCompression-variant DecodeError
	 */
	public static constructor_unsupported_compression(): DecodeError {
		const ret: bigint = bindings.DecodeError_unsupported_compression();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DangerousValue-variant DecodeError
	 */
	public static constructor_dangerous_value(): DecodeError {
		const ret: bigint = bindings.DecodeError_dangerous_value();
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DecodeError.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DecodeError_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DecodeErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: DecodeError): boolean {
		const ret: boolean = bindings.DecodeError_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Get the string representation of a DecodeError object
	 */
	public to_str(): string {
		const ret: number = bindings.DecodeError_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Build a DecodeError from a IOError
	 */
	public static constructor_from_IOError(f: IOError): DecodeError {
		const ret: bigint = bindings.DecodeError_from_IOError(f);
		const ret_hu_conv: DecodeError = DecodeError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A DecodeError of type UnknownVersion */
export class DecodeError_UnknownVersion extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type UnknownRequiredFeature */
export class DecodeError_UnknownRequiredFeature extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type InvalidValue */
export class DecodeError_InvalidValue extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type ShortRead */
export class DecodeError_ShortRead extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type BadLengthDescriptor */
export class DecodeError_BadLengthDescriptor extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type Io */
export class DecodeError_Io extends DecodeError {
	public io: IOError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.io = bindings.LDKDecodeError_Io_get_io(ptr);
	}
}
/** A DecodeError of type UnsupportedCompression */
export class DecodeError_UnsupportedCompression extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A DecodeError of type DangerousValue */
export class DecodeError_DangerousValue extends DecodeError {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

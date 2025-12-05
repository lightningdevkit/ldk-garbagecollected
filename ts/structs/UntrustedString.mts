
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Struct to `Display` fields in a safe way using `PrintableString`
 */
export class UntrustedString extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UntrustedString_free);
	}

	/**
	 * Serialize the UntrustedString object into a byte array which can be read by UntrustedString_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UntrustedString_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UntrustedString from a byte array, created by UntrustedString_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UntrustedStringDecodeErrorZ {
		const ret: bigint = bindings.UntrustedString_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UntrustedStringDecodeErrorZ = Result_UntrustedStringDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public get_a(): string {
		const ret: number = bindings.UntrustedString_get_a(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	public set_a(val: string): void {
		bindings.UntrustedString_set_a(this.ptr, bindings.encodeString(val));
	}

	/**
	 * Constructs a new UntrustedString given each field
	 */
	public static constructor_new(a_arg: string): UntrustedString {
		const ret: bigint = bindings.UntrustedString_new(bindings.encodeString(a_arg));
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UntrustedString_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UntrustedString
	 */
	public clone(): UntrustedString {
		const ret: bigint = bindings.UntrustedString_clone(this.ptr);
		const ret_hu_conv: UntrustedString = new UntrustedString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two UntrustedStrings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UntrustedString): boolean {
		const ret: boolean = bindings.UntrustedString_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UntrustedString.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UntrustedString_hash(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a UntrustedString object
	 */
	public to_str(): string {
		const ret: number = bindings.UntrustedString_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}

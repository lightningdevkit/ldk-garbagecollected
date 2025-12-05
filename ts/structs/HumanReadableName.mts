
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A struct containing the two parts of a BIP 353 Human Readable Name - the user and domain parts.
 * 
 * The `user` and `domain` parts, together, cannot exceed 231 bytes in length, and both must be
 * non-empty.
 * 
 * If you intend to handle non-ASCII `user` or `domain` parts, you must handle [Homograph Attacks]
 * and do punycode en-/de-coding yourself. This struct will always handle only plain ASCII `user`
 * and `domain` parts.
 * 
 * This struct can also be used for LN-Address recipients.
 * 
 * [Homograph Attacks]: https://en.wikipedia.org/wiki/IDN_homograph_attack
 */
export class HumanReadableName extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HumanReadableName_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HumanReadableName_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HumanReadableName
	 */
	public clone(): HumanReadableName {
		const ret: bigint = bindings.HumanReadableName_clone(this.ptr);
		const ret_hu_conv: HumanReadableName = new HumanReadableName(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the HumanReadableName.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.HumanReadableName_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two HumanReadableNames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HumanReadableName): boolean {
		const ret: boolean = bindings.HumanReadableName_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Constructs a new [`HumanReadableName`] from the `user` and `domain` parts. See the
	 * struct-level documentation for more on the requirements on each.
	 */
	public static constructor_new(user: string, domain: string): Result_HumanReadableNameNoneZ {
		const ret: bigint = bindings.HumanReadableName_new(bindings.encodeString(user), bindings.encodeString(domain));
		const ret_hu_conv: Result_HumanReadableNameNoneZ = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new [`HumanReadableName`] from the standard encoding - `user`@`domain`.
	 * 
	 * If `user` includes the standard BIP 353 ₿ prefix it is automatically removed as required by
	 * BIP 353.
	 */
	public static constructor_from_encoded(encoded: string): Result_HumanReadableNameNoneZ {
		const ret: bigint = bindings.HumanReadableName_from_encoded(bindings.encodeString(encoded));
		const ret_hu_conv: Result_HumanReadableNameNoneZ = Result_HumanReadableNameNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the `user` part of this Human Readable Name
	 */
	public user(): string {
		const ret: number = bindings.HumanReadableName_user(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Gets the `domain` part of this Human Readable Name
	 */
	public domain(): string {
		const ret: number = bindings.HumanReadableName_domain(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the HumanReadableName object into a byte array which can be read by HumanReadableName_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HumanReadableName_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HumanReadableName from a byte array, created by HumanReadableName_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HumanReadableNameDecodeErrorZ {
		const ret: bigint = bindings.HumanReadableName_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HumanReadableNameDecodeErrorZ = Result_HumanReadableNameDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a HumanReadableName object
	 */
	public to_str(): string {
		const ret: number = bindings.HumanReadableName_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}

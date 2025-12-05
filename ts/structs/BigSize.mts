
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Lightning TLV uses a custom variable-length integer called `BigSize`. It is similar to Bitcoin's
 * variable-length integers except that it is serialized in big-endian instead of little-endian.
 * 
 * Like Bitcoin's variable-length integer, it exhibits ambiguity in that certain values can be
 * encoded in several different ways, which we must check for at deserialization-time. Thus, if
 * you're looking for an example of a variable-length integer to use for your own project, move
 * along, this is a rather poor design.
 */
export class BigSize extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BigSize_free);
	}

	public get_a(): bigint {
		const ret: bigint = bindings.BigSize_get_a(this.ptr);
		return ret;
	}

	public set_a(val: bigint): void {
		bindings.BigSize_set_a(this.ptr, val);
	}

	/**
	 * Constructs a new BigSize given each field
	 */
	public static constructor_new(a_arg: bigint): BigSize {
		const ret: bigint = bindings.BigSize_new(a_arg);
		const ret_hu_conv: BigSize = new BigSize(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BigSize_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BigSize
	 */
	public clone(): BigSize {
		const ret: bigint = bindings.BigSize_clone(this.ptr);
		const ret_hu_conv: BigSize = new BigSize(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BigSize.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BigSize_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BigSizes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BigSize): boolean {
		const ret: boolean = bindings.BigSize_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BigSize object into a byte array which can be read by BigSize_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BigSize_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BigSize from a byte array, created by BigSize_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BigSizeDecodeErrorZ {
		const ret: bigint = bindings.BigSize_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BigSizeDecodeErrorZ = Result_BigSizeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

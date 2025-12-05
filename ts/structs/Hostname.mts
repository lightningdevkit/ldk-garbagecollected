
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents a hostname for serialization purposes.
 * Only the character set and length will be validated.
 * The character set consists of ASCII alphanumeric characters, hyphens, and periods.
 * Its length is guaranteed to be representable by a single byte.
 * This serialization is used by [`BOLT 7`] hostnames.
 * 
 * [`BOLT 7`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md
 */
export class Hostname extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Hostname_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Hostname_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Hostname
	 */
	public clone(): Hostname {
		const ret: bigint = bindings.Hostname_clone(this.ptr);
		const ret_hu_conv: Hostname = new Hostname(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Hostname.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Hostname_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Hostnames contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Hostname): boolean {
		const ret: boolean = bindings.Hostname_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns the length of the hostname.
	 */
	public len(): number {
		const ret: number = bindings.Hostname_len(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a Hostname object
	 */
	public to_str(): string {
		const ret: number = bindings.Hostname_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the Hostname object into a byte array which can be read by Hostname_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Hostname_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Hostname from a byte array, created by Hostname_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HostnameDecodeErrorZ {
		const ret: bigint = bindings.Hostname_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HostnameDecodeErrorZ = Result_HostnameDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

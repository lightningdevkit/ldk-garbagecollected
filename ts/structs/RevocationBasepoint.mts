
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Master key used in conjunction with per_commitment_point to generate [htlcpubkey](https://github.com/lightning/bolts/blob/master/03-transactions.md#key-derivation) for the latest state of a channel.
 * A watcher can be given a [RevocationBasepoint] to generate per commitment [RevocationKey] to create justice transactions.
 */
export class RevocationBasepoint extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RevocationBasepoint_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.RevocationBasepoint_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.RevocationBasepoint_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new RevocationBasepoint given each field
	 */
	public static constructor_new(a_arg: Uint8Array): RevocationBasepoint {
		const ret: bigint = bindings.RevocationBasepoint_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: RevocationBasepoint = new RevocationBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RevocationBasepoints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RevocationBasepoint): boolean {
		const ret: boolean = bindings.RevocationBasepoint_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RevocationBasepoint_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RevocationBasepoint
	 */
	public clone(): RevocationBasepoint {
		const ret: bigint = bindings.RevocationBasepoint_clone(this.ptr);
		const ret_hu_conv: RevocationBasepoint = new RevocationBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RevocationBasepoint.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RevocationBasepoint_hash(this.ptr);
		return ret;
	}

	/**
	 * Get inner Public Key
	 */
	public to_public_key(): Uint8Array {
		const ret: number = bindings.RevocationBasepoint_to_public_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Build a RevocationBasepoint from a PublicKey
	 */
	public static constructor_from_PublicKey(f: Uint8Array): RevocationBasepoint {
		const ret: bigint = bindings.RevocationBasepoint_from_PublicKey(bindings.encodeUint8Array(f));
		const ret_hu_conv: RevocationBasepoint = new RevocationBasepoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the RevocationBasepoint object into a byte array which can be read by RevocationBasepoint_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RevocationBasepoint_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RevocationBasepoint from a byte array, created by RevocationBasepoint_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RevocationBasepointDecodeErrorZ {
		const ret: bigint = bindings.RevocationBasepoint_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RevocationBasepointDecodeErrorZ = Result_RevocationBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

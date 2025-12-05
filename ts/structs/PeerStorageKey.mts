
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents the secret key material used for encrypting Peer Storage.
 */
export class PeerStorageKey extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerStorageKey_free);
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public get_inner(): Uint8Array {
		const ret: number = bindings.PeerStorageKey_get_inner(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Represents the key used to encrypt and decrypt Peer Storage.
	 */
	public set_inner(val: Uint8Array): void {
		bindings.PeerStorageKey_set_inner(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new PeerStorageKey given each field
	 */
	public static constructor_new(inner_arg: Uint8Array): PeerStorageKey {
		const ret: bigint = bindings.PeerStorageKey_new(bindings.encodeUint8Array(inner_arg));
		const ret_hu_conv: PeerStorageKey = new PeerStorageKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PeerStorageKey_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageKey
	 */
	public clone(): PeerStorageKey {
		const ret: bigint = bindings.PeerStorageKey_clone(this.ptr);
		const ret_hu_conv: PeerStorageKey = new PeerStorageKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PeerStorageKeys contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PeerStorageKey): boolean {
		const ret: boolean = bindings.PeerStorageKey_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}

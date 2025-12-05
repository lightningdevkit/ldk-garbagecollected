
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`EncryptedOurPeerStorage`] represents encrypted state of the corresponding [`DecryptedOurPeerStorage`].
 * 
 * # Key Methods
 * - [`EncryptedOurPeerStorage::new`]: Returns [`EncryptedOurPeerStorage`] with the given encrypted cipher.
 * - [`EncryptedOurPeerStorage::decrypt`]: Returns [`DecryptedOurPeerStorage`] created from decrypting the cipher.
 * - [`EncryptedOurPeerStorage::into_vec`]: Returns the cipher in [`Vec<u8>`] format.
 */
export class EncryptedOurPeerStorage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.EncryptedOurPeerStorage_free);
	}

	/**
	 * Returns [`EncryptedOurPeerStorage`] if cipher is of appropriate length, else returns error.
	 */
	public static constructor_new(cipher: Uint8Array): Result_EncryptedOurPeerStorageNoneZ {
		const ret: bigint = bindings.EncryptedOurPeerStorage_new(bindings.encodeUint8Array(cipher));
		const ret_hu_conv: Result_EncryptedOurPeerStorageNoneZ = Result_EncryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns cipher in the format [`Vec<u8>`].
	 */
	public into_vec(): Uint8Array {
		const ret: number = bindings.EncryptedOurPeerStorage_into_vec(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns [`DecryptedOurPeerStorage`] if it successfully decrypts the ciphertext with the `key`,
	 * else returns error.
	 */
	public decrypt(key: PeerStorageKey): Result_DecryptedOurPeerStorageNoneZ {
		const ret: bigint = bindings.EncryptedOurPeerStorage_decrypt(this.ptr, CommonBase.get_ptr_of(key));
		const ret_hu_conv: Result_DecryptedOurPeerStorageNoneZ = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

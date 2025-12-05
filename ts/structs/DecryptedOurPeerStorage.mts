
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`DecryptedOurPeerStorage`] is used to store serialised channel information that allows for the creation of a
 * `peer_storage` backup.
 * 
 * This structure is designed to serialize channel data for backup and supports encryption
 * using `ChaCha20Poly1305RFC` for transmission.
 * 
 * # Key Methods
 * - [`DecryptedOurPeerStorage::new`]: Returns [`DecryptedOurPeerStorage`] with the given data.
 * - [`DecryptedOurPeerStorage::encrypt`]: Returns [`EncryptedOurPeerStorage`] created from encrypting the provided data.
 * - [`DecryptedOurPeerStorage::into_vec`]: Returns the data in [`Vec<u8>`] format.
 * 
 * ## Example
 * ```
 * use lightning::ln::our_peer_storage::DecryptedOurPeerStorage;
 * use lightning::sign::{KeysManager, NodeSigner};
 * let seed = [1u8; 32];
 * let keys_mgr = KeysManager::new(&seed, 42, 42, true);
 * let key = keys_mgr.get_peer_storage_key();
 * let decrypted_ops = DecryptedOurPeerStorage::new(vec![1, 2, 3]);
 * let our_peer_storage = decrypted_ops.encrypt(&key, &[0u8; 32]);
 * let decrypted_data = our_peer_storage.decrypt(&key).unwrap();
 * assert_eq!(decrypted_data.into_vec(), vec![1, 2, 3]);
 * ```
 */
export class DecryptedOurPeerStorage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DecryptedOurPeerStorage_free);
	}

	/**
	 * Returns [`DecryptedOurPeerStorage`] with the given data.
	 */
	public static constructor_new(data: Uint8Array): DecryptedOurPeerStorage {
		const ret: bigint = bindings.DecryptedOurPeerStorage_new(bindings.encodeUint8Array(data));
		const ret_hu_conv: DecryptedOurPeerStorage = new DecryptedOurPeerStorage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns data stored in [`Vec<u8>`] format.
	 */
	public into_vec(): Uint8Array {
		const ret: number = bindings.DecryptedOurPeerStorage_into_vec(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Encrypts the data inside [`DecryptedOurPeerStorage`] using [`PeerStorageKey`] and `random_bytes`
	 * and returns [`EncryptedOurPeerStorage`].
	 */
	public encrypt(key: PeerStorageKey, random_bytes: Uint8Array): EncryptedOurPeerStorage {
		const ret: bigint = bindings.DecryptedOurPeerStorage_encrypt(this.ptr, CommonBase.get_ptr_of(key), bindings.encodeUint8Array(random_bytes));
		const ret_hu_conv: EncryptedOurPeerStorage = new EncryptedOurPeerStorage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

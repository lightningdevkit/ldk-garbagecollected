using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class DecryptedOurPeerStorage : CommonBase {
	internal DecryptedOurPeerStorage(object _dummy, long ptr) : base(ptr) { }
	~DecryptedOurPeerStorage() {
		if (ptr != 0) { bindings.DecryptedOurPeerStorage_free(ptr); }
	}

	/**
	 * Returns [`DecryptedOurPeerStorage`] with the given data.
	 */
	public static org.ldk.structs.DecryptedOurPeerStorage of(byte[] data) {
		long ret = bindings.DecryptedOurPeerStorage_new(InternalUtils.encodeUint8Array(data));
		GC.KeepAlive(data);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DecryptedOurPeerStorage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DecryptedOurPeerStorage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns data stored in [`Vec<u8>`] format.
	 */
	public byte[] into_vec() {
		long ret = bindings.DecryptedOurPeerStorage_into_vec(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		if (this != null) { this.ptrs_to.AddLast(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret_conv;
	}

	/**
	 * Encrypts the data inside [`DecryptedOurPeerStorage`] using [`PeerStorageKey`] and `random_bytes`
	 * and returns [`EncryptedOurPeerStorage`].
	 */
	public org.ldk.structs.EncryptedOurPeerStorage encrypt(org.ldk.structs.PeerStorageKey key, byte[] random_bytes) {
		long ret = bindings.DecryptedOurPeerStorage_encrypt(this.ptr, key.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(random_bytes, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(key);
		GC.KeepAlive(random_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EncryptedOurPeerStorage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.EncryptedOurPeerStorage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		if (this != null) { this.ptrs_to.AddLast(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret_hu_conv;
	}

}
} } }

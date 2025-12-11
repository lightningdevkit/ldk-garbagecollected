using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * [`EncryptedOurPeerStorage`] represents encrypted state of the corresponding [`DecryptedOurPeerStorage`].
 * 
 * # Key Methods
 * - [`EncryptedOurPeerStorage::new`]: Returns [`EncryptedOurPeerStorage`] with the given encrypted cipher.
 * - [`EncryptedOurPeerStorage::decrypt`]: Returns [`DecryptedOurPeerStorage`] created from decrypting the cipher.
 * - [`EncryptedOurPeerStorage::into_vec`]: Returns the cipher in [`Vec<u8>`] format.
 */
public class EncryptedOurPeerStorage : CommonBase {
	internal EncryptedOurPeerStorage(object _dummy, long ptr) : base(ptr) { }
	~EncryptedOurPeerStorage() {
		if (ptr != 0) { bindings.EncryptedOurPeerStorage_free(ptr); }
	}

	/**
	 * Returns [`EncryptedOurPeerStorage`] if cipher is of appropriate length, else returns error.
	 */
	public static org.ldk.structs.Result_EncryptedOurPeerStorageNoneZ of(byte[] cipher) {
		long ret = bindings.EncryptedOurPeerStorage_new(InternalUtils.encodeUint8Array(cipher));
		GC.KeepAlive(cipher);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_EncryptedOurPeerStorageNoneZ ret_hu_conv = Result_EncryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns cipher in the format [`Vec<u8>`].
	 */
	public byte[] into_vec() {
		long ret = bindings.EncryptedOurPeerStorage_into_vec(this.ptr);
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
	 * Returns [`DecryptedOurPeerStorage`] if it successfully decrypts the ciphertext with the `key`,
	 * else returns error.
	 */
	public org.ldk.structs.Result_DecryptedOurPeerStorageNoneZ decrypt(org.ldk.structs.PeerStorageKey key) {
		long ret = bindings.EncryptedOurPeerStorage_decrypt(this.ptr, key.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
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

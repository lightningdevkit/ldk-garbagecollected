package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`EncryptedOurPeerStorage`] represents encrypted state of the corresponding [`DecryptedOurPeerStorage`].
 * 
 * # Key Methods
 * - [`EncryptedOurPeerStorage::new`]: Returns [`EncryptedOurPeerStorage`] with the given encrypted cipher.
 * - [`EncryptedOurPeerStorage::decrypt`]: Returns [`DecryptedOurPeerStorage`] created from decrypting the cipher.
 * - [`EncryptedOurPeerStorage::into_vec`]: Returns the cipher in [`Vec<u8>`] format.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class EncryptedOurPeerStorage extends CommonBase {
	EncryptedOurPeerStorage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.EncryptedOurPeerStorage_free(ptr); }
	}

	/**
	 * Returns [`EncryptedOurPeerStorage`] if cipher is of appropriate length, else returns error.
	 */
	public static Result_EncryptedOurPeerStorageNoneZ of(byte[] cipher) {
		long ret = bindings.EncryptedOurPeerStorage_new(cipher);
		Reference.reachabilityFence(cipher);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_EncryptedOurPeerStorageNoneZ ret_hu_conv = Result_EncryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns cipher in the format [`Vec<u8>`].
	 */
	public byte[] into_vec() {
		byte[] ret = bindings.EncryptedOurPeerStorage_into_vec(this.ptr);
		Reference.reachabilityFence(this);
		if (this != null) { this.ptrs_to.add(this); };
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid this being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after this call, this is reset to null and is now a dummy object.
		this.ptr = 0;;
		return ret;
	}

	/**
	 * Returns [`DecryptedOurPeerStorage`] if it successfully decrypts the ciphertext with the `key`,
	 * else returns error.
	 */
	public Result_DecryptedOurPeerStorageNoneZ decrypt(org.ldk.structs.PeerStorageKey key) {
		long ret = bindings.EncryptedOurPeerStorage_decrypt(this.ptr, key.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(key);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DecryptedOurPeerStorageNoneZ ret_hu_conv = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(this); };
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

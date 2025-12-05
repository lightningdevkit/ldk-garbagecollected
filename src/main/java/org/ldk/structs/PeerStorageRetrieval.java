package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`peer_storage_retrieval`] message that can be sent to or received from a peer.
 * 
 * This message is sent to peers for whom we store backup data.
 * If we receive this message, it indicates that the peer had stored our backup data.
 * This data can be used for fund recovery in case of data loss.
 * 
 * [`peer_storage_retrieval`] is used to send the most recent backup of the peer.
 * 
 * [`peer_storage_retrieval`]: https://github.com/lightning/bolts/pull/1110
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeerStorageRetrieval extends CommonBase {
	PeerStorageRetrieval(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeerStorageRetrieval_free(ptr); }
	}

	/**
	 * Most recent peer's data included in the msg.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_data() {
		byte[] ret = bindings.PeerStorageRetrieval_get_data(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Most recent peer's data included in the msg.
	 */
	public void set_data(byte[] val) {
		bindings.PeerStorageRetrieval_set_data(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new PeerStorageRetrieval given each field
	 */
	public static PeerStorageRetrieval of(byte[] data_arg) {
		long ret = bindings.PeerStorageRetrieval_new(data_arg);
		Reference.reachabilityFence(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageRetrieval ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageRetrieval(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.PeerStorageRetrieval_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageRetrieval
	 */
	public PeerStorageRetrieval clone() {
		long ret = bindings.PeerStorageRetrieval_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageRetrieval ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageRetrieval(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PeerStorageRetrieval.
	 */
	public long hash() {
		long ret = bindings.PeerStorageRetrieval_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two PeerStorageRetrievals contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.PeerStorageRetrieval b) {
		boolean ret = bindings.PeerStorageRetrieval_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof PeerStorageRetrieval)) return false;
		return this.eq((PeerStorageRetrieval)o);
	}
	/**
	 * Serialize the PeerStorageRetrieval object into a byte array which can be read by PeerStorageRetrieval_read
	 */
	public byte[] write() {
		byte[] ret = bindings.PeerStorageRetrieval_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a PeerStorageRetrieval from a byte array, created by PeerStorageRetrieval_write
	 */
	public static Result_PeerStorageRetrievalDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PeerStorageRetrieval_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageRetrievalDecodeErrorZ ret_hu_conv = Result_PeerStorageRetrievalDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

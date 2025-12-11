using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class PeerStorageRetrieval : CommonBase {
	internal PeerStorageRetrieval(object _dummy, long ptr) : base(ptr) { }
	~PeerStorageRetrieval() {
		if (ptr != 0) { bindings.PeerStorageRetrieval_free(ptr); }
	}

	/**
	 * Most recent peer's data included in the msg.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_data() {
		long ret = bindings.PeerStorageRetrieval_get_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Most recent peer's data included in the msg.
	 */
	public void set_data(byte[] val) {
		bindings.PeerStorageRetrieval_set_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new PeerStorageRetrieval given each field
	 */
	public static org.ldk.structs.PeerStorageRetrieval of(byte[] data_arg) {
		long ret = bindings.PeerStorageRetrieval_new(InternalUtils.encodeUint8Array(data_arg));
		GC.KeepAlive(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageRetrieval ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageRetrieval(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PeerStorageRetrieval_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorageRetrieval
	 */
	public org.ldk.structs.PeerStorageRetrieval clone() {
		long ret = bindings.PeerStorageRetrieval_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorageRetrieval ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorageRetrieval(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PeerStorageRetrieval.
	 */
	public long hash() {
		long ret = bindings.PeerStorageRetrieval_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two PeerStorageRetrievals contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.PeerStorageRetrieval b) {
		bool ret = bindings.PeerStorageRetrieval_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PeerStorageRetrieval)) return false;
		return this.eq((PeerStorageRetrieval)o);
	}
	/**
	 * Serialize the PeerStorageRetrieval object into a byte array which can be read by PeerStorageRetrieval_read
	 */
	public byte[] write() {
		long ret = bindings.PeerStorageRetrieval_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PeerStorageRetrieval from a byte array, created by PeerStorageRetrieval_write
	 */
	public static org.ldk.structs.Result_PeerStorageRetrievalDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PeerStorageRetrieval_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageRetrievalDecodeErrorZ ret_hu_conv = Result_PeerStorageRetrievalDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A [`peer_storage`] message that can be sent to or received from a peer.
 * 
 * This message is used to distribute backup data to peers.
 * If data is lost or corrupted, users can retrieve it through [`PeerStorageRetrieval`]
 * to recover critical information, such as channel states, for fund recovery.
 * 
 * [`peer_storage`] is used to send our own encrypted backup data to a peer.
 * 
 * [`peer_storage`]: https://github.com/lightning/bolts/pull/1110
 */
public class PeerStorage : CommonBase {
	internal PeerStorage(object _dummy, long ptr) : base(ptr) { }
	~PeerStorage() {
		if (ptr != 0) { bindings.PeerStorage_free(ptr); }
	}

	/**
	 * Our encrypted backup data included in the msg.
	 * 
	 * Returns a copy of the field.
	 */
	public byte[] get_data() {
		long ret = bindings.PeerStorage_get_data(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Our encrypted backup data included in the msg.
	 */
	public void set_data(byte[] val) {
		bindings.PeerStorage_set_data(this.ptr, InternalUtils.encodeUint8Array(val));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new PeerStorage given each field
	 */
	public static org.ldk.structs.PeerStorage of(byte[] data_arg) {
		long ret = bindings.PeerStorage_new(InternalUtils.encodeUint8Array(data_arg));
		GC.KeepAlive(data_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.PeerStorage_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeerStorage
	 */
	public org.ldk.structs.PeerStorage clone() {
		long ret = bindings.PeerStorage_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeerStorage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PeerStorage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PeerStorage.
	 */
	public long hash() {
		long ret = bindings.PeerStorage_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two PeerStorages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.PeerStorage b) {
		bool ret = bindings.PeerStorage_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PeerStorage)) return false;
		return this.eq((PeerStorage)o);
	}
	/**
	 * Serialize the PeerStorage object into a byte array which can be read by PeerStorage_read
	 */
	public byte[] write() {
		long ret = bindings.PeerStorage_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PeerStorage from a byte array, created by PeerStorage_write
	 */
	public static org.ldk.structs.Result_PeerStorageDecodeErrorZ read(byte[] ser) {
		long ret = bindings.PeerStorage_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageDecodeErrorZ ret_hu_conv = Result_PeerStorageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

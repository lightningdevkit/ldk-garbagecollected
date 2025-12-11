using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The best known block as identified by its hash and height.
 */
public class BestBlock : CommonBase {
	internal BestBlock(object _dummy, long ptr) : base(ptr) { }
	~BestBlock() {
		if (ptr != 0) { bindings.BestBlock_free(ptr); }
	}

	/**
	 * The block's hash
	 */
	public byte[] get_block_hash() {
		long ret = bindings.BestBlock_get_block_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The block's hash
	 */
	public void set_block_hash(byte[] val) {
		bindings.BestBlock_set_block_hash(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(val, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public int get_height() {
		int ret = bindings.BestBlock_get_height(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public void set_height(int val) {
		bindings.BestBlock_set_height(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new BestBlock given each field
	 */
	public static org.ldk.structs.BestBlock of(byte[] block_hash_arg, int height_arg) {
		long ret = bindings.BestBlock_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(block_hash_arg, 32)), height_arg);
		GC.KeepAlive(block_hash_arg);
		GC.KeepAlive(height_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.BestBlock_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BestBlock
	 */
	public org.ldk.structs.BestBlock clone() {
		long ret = bindings.BestBlock_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BestBlock.
	 */
	public long hash() {
		long ret = bindings.BestBlock_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BestBlocks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BestBlock b) {
		bool ret = bindings.BestBlock_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is BestBlock)) return false;
		return this.eq((BestBlock)o);
	}
	/**
	 * Constructs a `BestBlock` that represents the genesis block at height 0 of the given
	 * network.
	 */
	public static org.ldk.structs.BestBlock from_network(Network network) {
		long ret = bindings.BestBlock_from_network(network);
		GC.KeepAlive(network);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BestBlock object into a byte array which can be read by BestBlock_read
	 */
	public byte[] write() {
		long ret = bindings.BestBlock_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BestBlock from a byte array, created by BestBlock_write
	 */
	public static org.ldk.structs.Result_BestBlockDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BestBlock_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BestBlockDecodeErrorZ ret_hu_conv = Result_BestBlockDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

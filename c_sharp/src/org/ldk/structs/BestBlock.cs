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

	internal long clone_ptr() {
		long ret = bindings.BestBlock_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the BestBlock
	 */
	public BestBlock clone() {
		long ret = bindings.BestBlock_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two BestBlocks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.BestBlock b) {
		bool ret = bindings.BestBlock_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
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
	public static BestBlock from_genesis(Network network) {
		long ret = bindings.BestBlock_from_genesis(network);
		GC.KeepAlive(network);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns a `BestBlock` as identified by the given block hash and height.
	 */
	public static BestBlock of(byte[] block_hash, int height) {
		long ret = bindings.BestBlock_new(InternalUtils.check_arr_len(block_hash, 32), height);
		GC.KeepAlive(block_hash);
		GC.KeepAlive(height);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the best block hash.
	 */
	public byte[] block_hash() {
		byte[] ret = bindings.BestBlock_block_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Returns the best block height.
	 */
	public int height() {
		int ret = bindings.BestBlock_height(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

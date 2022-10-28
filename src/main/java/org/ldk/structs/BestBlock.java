package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The best known block as identified by its hash and height.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class BestBlock extends CommonBase {
	BestBlock(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BestBlock_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.BestBlock_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the BestBlock
	 */
	public BestBlock clone() {
		long ret = bindings.BestBlock_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two BestBlocks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(BestBlock b) {
		boolean ret = bindings.BestBlock_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof BestBlock)) return false;
		return this.eq((BestBlock)o);
	}
	/**
	 * Constructs a `BestBlock` that represents the genesis block at height 0 of the given
	 * network.
	 */
	public static BestBlock from_genesis(org.ldk.enums.Network network) {
		long ret = bindings.BestBlock_from_genesis(network);
		Reference.reachabilityFence(network);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns a `BestBlock` as identified by the given block hash and height.
	 */
	public static BestBlock of(byte[] block_hash, int height) {
		long ret = bindings.BestBlock_new(InternalUtils.check_arr_len(block_hash, 32), height);
		Reference.reachabilityFence(block_hash);
		Reference.reachabilityFence(height);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Returns the best block hash.
	 */
	public byte[] block_hash() {
		byte[] ret = bindings.BestBlock_block_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the best block height.
	 */
	public int height() {
		int ret = bindings.BestBlock_height(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

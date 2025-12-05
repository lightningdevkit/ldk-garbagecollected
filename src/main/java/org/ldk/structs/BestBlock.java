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

	/**
	 * The block's hash
	 */
	public byte[] get_block_hash() {
		byte[] ret = bindings.BestBlock_get_block_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The block's hash
	 */
	public void set_block_hash(byte[] val) {
		bindings.BestBlock_set_block_hash(this.ptr, InternalUtils.check_arr_len(val, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public int get_height() {
		int ret = bindings.BestBlock_get_height(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The height at which the block was confirmed.
	 */
	public void set_height(int val) {
		bindings.BestBlock_set_height(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new BestBlock given each field
	 */
	public static BestBlock of(byte[] block_hash_arg, int height_arg) {
		long ret = bindings.BestBlock_new(InternalUtils.check_arr_len(block_hash_arg, 32), height_arg);
		Reference.reachabilityFence(block_hash_arg);
		Reference.reachabilityFence(height_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
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
	 * Generates a non-cryptographic 64-bit hash of the BestBlock.
	 */
	public long hash() {
		long ret = bindings.BestBlock_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two BestBlocks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.BestBlock b) {
		boolean ret = bindings.BestBlock_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
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
	public static BestBlock from_network(org.ldk.enums.Network network) {
		long ret = bindings.BestBlock_from_network(network);
		Reference.reachabilityFence(network);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the BestBlock object into a byte array which can be read by BestBlock_read
	 */
	public byte[] write() {
		byte[] ret = bindings.BestBlock_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a BestBlock from a byte array, created by BestBlock_write
	 */
	public static Result_BestBlockDecodeErrorZ read(byte[] ser) {
		long ret = bindings.BestBlock_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BestBlockDecodeErrorZ ret_hu_conv = Result_BestBlockDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

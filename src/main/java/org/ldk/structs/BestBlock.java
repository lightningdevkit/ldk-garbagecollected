package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


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
	 * Creates a copy of the BestBlock
	 */
	public BestBlock clone() {
		long ret = bindings.BestBlock_clone(this.ptr);
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Returns the best block from the genesis of the given network.
	 */
	public static BestBlock constructor_from_genesis(LDKNetwork network) {
		long ret = bindings.BestBlock_from_genesis(network);
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the best block as identified by the given block hash and height.
	 */
	public static BestBlock constructor_new(byte[] block_hash, int height) {
		long ret = bindings.BestBlock_new(block_hash, height);
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the best block hash.
	 */
	public byte[] block_hash() {
		byte[] ret = bindings.BestBlock_block_hash(this.ptr);
		return ret;
	}

	/**
	 * Returns the best block height.
	 */
	public int height() {
		int ret = bindings.BestBlock_height(this.ptr);
		return ret;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
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
	 * Creates a copy of the BestBlock
	 */
	public BestBlock clone() {
		long ret = bindings.BestBlock_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a `BestBlock` that represents the genesis block at height 0 of the given
	 * network.
	 */
	public static BestBlock from_genesis(org.ldk.enums.Network network) {
		long ret = bindings.BestBlock_from_genesis(network);
		if (ret >= 0 && ret < 1024) { return null; }
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns a `BestBlock` as identified by the given block hash and height.
	 */
	public static BestBlock of(byte[] block_hash, int height) {
		long ret = bindings.BestBlock_new(block_hash, height);
		if (ret >= 0 && ret < 1024) { return null; }
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

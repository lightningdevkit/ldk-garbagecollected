package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * Chain-related parameters used to construct a new `ChannelManager`.
 * 
 * Typically, the block-specific parameters are derived from the best block hash for the network,
 * as a newly constructed `ChannelManager` will not have created any channels yet. These parameters
 * are not needed when deserializing a previously constructed `ChannelManager`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChainParameters extends CommonBase {
	ChainParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChainParameters_free(ptr); }
	}

	/**
	 * The network for determining the `chain_hash` in Lightning messages.
	 */
	public LDKNetwork get_network() {
		LDKNetwork ret = bindings.ChainParameters_get_network(this.ptr);
		return ret;
	}

	/**
	 * The network for determining the `chain_hash` in Lightning messages.
	 */
	public void set_network(LDKNetwork val) {
		bindings.ChainParameters_set_network(this.ptr, val);
	}

	/**
	 * The hash and height of the latest block successfully connected.
	 * 
	 * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
	 */
	public BestBlock get_best_block() {
		long ret = bindings.ChainParameters_get_best_block(this.ptr);
		BestBlock ret_hu_conv = new BestBlock(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * The hash and height of the latest block successfully connected.
	 * 
	 * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
	 */
	public void set_best_block(BestBlock val) {
		bindings.ChainParameters_set_best_block(this.ptr, val == null ? 0 : val.ptr & ~1);
		this.ptrs_to.add(val);
	}

	/**
	 * Constructs a new ChainParameters given each field
	 */
	public static ChainParameters constructor_new(LDKNetwork network_arg, BestBlock best_block_arg) {
		long ret = bindings.ChainParameters_new(network_arg, best_block_arg == null ? 0 : best_block_arg.ptr & ~1);
		ChainParameters ret_hu_conv = new ChainParameters(null, ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(best_block_arg);
		return ret_hu_conv;
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


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
	public Network get_network() {
		Network ret = bindings.ChainParameters_get_network(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The network for determining the `chain_hash` in Lightning messages.
	 */
	public void set_network(org.ldk.enums.Network val) {
		bindings.ChainParameters_set_network(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The hash and height of the latest block successfully connected.
	 * 
	 * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
	 */
	public BestBlock get_best_block() {
		long ret = bindings.ChainParameters_get_best_block(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new BestBlock(null, ret); }
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ChainParameters given each field
	 */
	public static ChainParameters of(org.ldk.enums.Network network_arg, BestBlock best_block_arg) {
		long ret = bindings.ChainParameters_new(network_arg, best_block_arg == null ? 0 : best_block_arg.ptr & ~1);
		Reference.reachabilityFence(network_arg);
		Reference.reachabilityFence(best_block_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChainParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChainParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChainParameters_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChainParameters
	 */
	public ChainParameters clone() {
		long ret = bindings.ChainParameters_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChainParameters ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChainParameters(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Chain-related parameters used to construct a new `ChannelManager`.
 * 
 * Typically, the block-specific parameters are derived from the best block hash for the network,
 * as a newly constructed `ChannelManager` will not have created any channels yet. These parameters
 * are not needed when deserializing a previously constructed `ChannelManager`.
 */
export class ChainParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChainParameters_free);
	}

	/**
	 * The network for determining the `chain_hash` in Lightning messages.
	 */
	public get_network(): Network {
		const ret: Network = bindings.ChainParameters_get_network(this.ptr);
		return ret;
	}

	/**
	 * The network for determining the `chain_hash` in Lightning messages.
	 */
	public set_network(val: Network): void {
		bindings.ChainParameters_set_network(this.ptr, val);
	}

	/**
	 * The hash and height of the latest block successfully connected.
	 * 
	 * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
	 */
	public get_best_block(): BestBlock {
		const ret: bigint = bindings.ChainParameters_get_best_block(this.ptr);
		const ret_hu_conv: BestBlock = new BestBlock(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The hash and height of the latest block successfully connected.
	 * 
	 * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
	 */
	public set_best_block(val: BestBlock): void {
		bindings.ChainParameters_set_best_block(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChainParameters given each field
	 */
	public static constructor_new(network_arg: Network, best_block_arg: BestBlock): ChainParameters {
		const ret: bigint = bindings.ChainParameters_new(network_arg, CommonBase.get_ptr_of(best_block_arg));
		const ret_hu_conv: ChainParameters = new ChainParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChainParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChainParameters
	 */
	public clone(): ChainParameters {
		const ret: bigint = bindings.ChainParameters_clone(this.ptr);
		const ret_hu_conv: ChainParameters = new ChainParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

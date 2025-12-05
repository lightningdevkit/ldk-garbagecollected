

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of Listen */
export interface ListenInterface {
	/**Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	filtered_block_connected(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void;
	/**Notifies the listener that a block was added at the given height.
	 */
	block_connected(block: Uint8Array, height: number): void;
	/**Notifies the listener that one or more blocks were removed in anticipation of a reorg.
	 * 
	 * The provided [`BestBlock`] is the new best block after disconnecting blocks in the reorg
	 * but before connecting new ones (i.e. the \"fork point\" block). For backwards compatibility,
	 * you may instead walk the chain backwards, calling `blocks_disconnected` for each block
	 * that is disconnected in a reorg.
	 */
	blocks_disconnected(fork_point_block: BestBlock): void;
}

class LDKListenHolder {
	held: Listen|null = null;
}

/**
 * The `Listen` trait is used to notify when blocks have been connected or disconnected from the
 * chain.
 * 
 * Useful when needing to replay chain data upon startup or as new chain events occur. Clients
 * sourcing chain data using a block-oriented API should prefer this interface over [`Confirm`].
 * Such clients fetch the entire header chain whereas clients using [`Confirm`] only fetch headers
 * when needed.
 * 
 * By using [`Listen::filtered_block_connected`] this interface supports clients fetching the
 * entire header chain and only blocks with matching transaction data using BIP 157 filters or
 * other similar filtering.
 * 
 * # Requirements
 * 
 * Each block must be connected in chain order with one call to either
 * [`Listen::block_connected`] or [`Listen::filtered_block_connected`]. If a call to the
 * [`Filter`] interface was made during block processing and further transaction(s) from the same
 * block now match the filter, a second call to [`Listen::filtered_block_connected`] should be
 * made immediately for the same block (prior to any other calls to the [`Listen`] interface).
 * 
 * In case of a reorg, you must call [`Listen::blocks_disconnected`] once with information on the
 * \"fork point\" block, i.e. the highest block that is in both forks. You may call
 * [`Listen::blocks_disconnected`] multiple times as you walk the chain backwards, but each must
 * include a fork point block that is before the last.
 * 
 * # Object Birthday
 * 
 * Note that most implementations take a [`BestBlock`] on construction and blocks only need to be
 * applied starting from that point.
 */
export class Listen extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKListen|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Listen_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of Listen from a given implementation */
	public static new_impl(arg: ListenInterface): Listen {
		const impl_holder: LDKListenHolder = new LDKListenHolder();
		let structImplementation = {
			filtered_block_connected (header: number, txdata: number, height: number): void {
				const header_conv: Uint8Array = bindings.decodeUint8Array(header);
				const txdata_conv_28_len: number = bindings.getArrayLength(txdata);
				const txdata_conv_28_arr: TwoTuple_usizeTransactionZ[] = new Array(txdata_conv_28_len).fill(null);
				for (var c = 0; c < txdata_conv_28_len; c++) {
					const txdata_conv_28: bigint = bindings.getU64ArrayElem(txdata, c);
					const txdata_conv_28_hu_conv: TwoTuple_usizeTransactionZ = new TwoTuple_usizeTransactionZ(null, txdata_conv_28);
					CommonBase.add_ref_from(txdata_conv_28_hu_conv, this);
					txdata_conv_28_arr[c] = txdata_conv_28_hu_conv;
				}
				bindings.freeWasmMemory(txdata)
				arg.filtered_block_connected(header_conv, txdata_conv_28_arr, height);
			},
			block_connected (block: number, height: number): void {
				const block_conv: Uint8Array = bindings.decodeUint8Array(block);
				arg.block_connected(block_conv, height);
			},
			blocks_disconnected (fork_point_block: bigint): void {
				const fork_point_block_hu_conv: BestBlock = new BestBlock(null, fork_point_block);
				CommonBase.add_ref_from(fork_point_block_hu_conv, this);
				arg.blocks_disconnected(fork_point_block_hu_conv);
			},
		} as bindings.LDKListen;
		const ptr_idx: [bigint, number] = bindings.LDKListen_new(structImplementation);

		impl_holder.held = new Listen(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Notifies the listener that a block was added at the given height, with the transaction data
	 * possibly filtered.
	 */
	public filtered_block_connected(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void {
		bindings.Listen_filtered_block_connected(this.ptr, bindings.encodeUint8Array(header), bindings.encodeUint64Array(txdata.map(txdata_conv_28 => CommonBase.get_ptr_of(txdata_conv_28))), height);
	}

	/**
	 * Notifies the listener that a block was added at the given height.
	 */
	public block_connected(block: Uint8Array, height: number): void {
		bindings.Listen_block_connected(this.ptr, bindings.encodeUint8Array(block), height);
	}

	/**
	 * Notifies the listener that one or more blocks were removed in anticipation of a reorg.
	 * 
	 * The provided [`BestBlock`] is the new best block after disconnecting blocks in the reorg
	 * but before connecting new ones (i.e. the \"fork point\" block). For backwards compatibility,
	 * you may instead walk the chain backwards, calling `blocks_disconnected` for each block
	 * that is disconnected in a reorg.
	 */
	public blocks_disconnected(fork_point_block: BestBlock): void {
		bindings.Listen_blocks_disconnected(this.ptr, CommonBase.get_ptr_of(fork_point_block));
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * This type represents a lock and MUST BE MANUALLY FREE'd!
 * A read-only view of [`NetworkGraph`].
 */
export class ReadOnlyNetworkGraph extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, () => { throw new Error("Locks must be manually freed with free()"); });
	}
	/** Releases this lock */
	public free() {
		bindings.ReadOnlyNetworkGraph_free(this.ptr);
		CommonBase.set_null_skip_free(this);
	}

	/**
	 * Returns information on a channel with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public channel(short_channel_id: bigint): ChannelInfo {
		const ret: bigint = bindings.ReadOnlyNetworkGraph_channel(this.ptr, short_channel_id);
		const ret_hu_conv: ChannelInfo = new ChannelInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the list of channels in the graph
	 */
	public list_channels(): BigUint64Array {
		const ret: number = bindings.ReadOnlyNetworkGraph_list_channels(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns information on a node with the given id.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public node(node_id: NodeId): NodeInfo {
		const ret: bigint = bindings.ReadOnlyNetworkGraph_node(this.ptr, CommonBase.get_ptr_of(node_id));
		const ret_hu_conv: NodeInfo = new NodeInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the list of nodes in the graph
	 */
	public list_nodes(): NodeId[] {
		const ret: number = bindings.ReadOnlyNetworkGraph_list_nodes(this.ptr);
		const ret_conv_8_len: number = bindings.getArrayLength(ret);
		const ret_conv_8_arr: NodeId[] = new Array(ret_conv_8_len).fill(null);
		for (var i = 0; i < ret_conv_8_len; i++) {
			const ret_conv_8: bigint = bindings.getU64ArrayElem(ret, i);
			const ret_conv_8_hu_conv: NodeId = new NodeId(null, ret_conv_8);
			CommonBase.add_ref_from(ret_conv_8_hu_conv, this);
			ret_conv_8_arr[i] = ret_conv_8_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_8_arr;
	}

	/**
	 * Get network addresses by node id.
	 * Returns None if the requested node is completely unknown,
	 * or if node announcement for the node was never received.
	 */
	public get_addresses(pubkey: Uint8Array): Option_CVec_SocketAddressZZ {
		const ret: bigint = bindings.ReadOnlyNetworkGraph_get_addresses(this.ptr, bindings.encodeUint8Array(pubkey));
		const ret_hu_conv: Option_CVec_SocketAddressZZ = Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

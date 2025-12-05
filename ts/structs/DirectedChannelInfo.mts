
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper around [`ChannelInfo`] representing information about the channel as directed from a
 * source node to a target node.
 */
export class DirectedChannelInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DirectedChannelInfo_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DirectedChannelInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DirectedChannelInfo
	 */
	public clone(): DirectedChannelInfo {
		const ret: bigint = bindings.DirectedChannelInfo_clone(this.ptr);
		const ret_hu_conv: DirectedChannelInfo = new DirectedChannelInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns information for the channel.
	 */
	public channel(): ChannelInfo {
		const ret: bigint = bindings.DirectedChannelInfo_channel(this.ptr);
		const ret_hu_conv: ChannelInfo = new ChannelInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the [`EffectiveCapacity`] of the channel in the direction.
	 * 
	 * This is either the total capacity from the funding transaction, if known, or the
	 * `htlc_maximum_msat` for the direction as advertised by the gossip network, if known,
	 * otherwise.
	 */
	public effective_capacity(): EffectiveCapacity {
		const ret: bigint = bindings.DirectedChannelInfo_effective_capacity(this.ptr);
		const ret_hu_conv: EffectiveCapacity = EffectiveCapacity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the `node_id` of the source hop.
	 * 
	 * Refers to the `node_id` forwarding the payment to the next hop.
	 */
	public source(): NodeId {
		const ret: bigint = bindings.DirectedChannelInfo_source(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the `node_id` of the target hop.
	 * 
	 * Refers to the `node_id` receiving the payment from the previous hop.
	 */
	public target(): NodeId {
		const ret: bigint = bindings.DirectedChannelInfo_target(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

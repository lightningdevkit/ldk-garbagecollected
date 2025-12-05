
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Represents the set of gossip messages that require a signature from a node's identity key.
 */
export class UnsignedGossipMessage extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.UnsignedGossipMessage_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): UnsignedGossipMessage {
		const raw_ty: number = bindings.LDKUnsignedGossipMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new UnsignedGossipMessage_ChannelAnnouncement(ptr);
			case 1: return new UnsignedGossipMessage_ChannelUpdate(ptr);
			case 2: return new UnsignedGossipMessage_NodeAnnouncement(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnsignedGossipMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedGossipMessage
	 */
	public clone(): UnsignedGossipMessage {
		const ret: bigint = bindings.UnsignedGossipMessage_clone(this.ptr);
		const ret_hu_conv: UnsignedGossipMessage = UnsignedGossipMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelAnnouncement-variant UnsignedGossipMessage
	 */
	public static constructor_channel_announcement(a: UnsignedChannelAnnouncement): UnsignedGossipMessage {
		const ret: bigint = bindings.UnsignedGossipMessage_channel_announcement(CommonBase.get_ptr_of(a));
		const ret_hu_conv: UnsignedGossipMessage = UnsignedGossipMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ChannelUpdate-variant UnsignedGossipMessage
	 */
	public static constructor_channel_update(a: UnsignedChannelUpdate): UnsignedGossipMessage {
		const ret: bigint = bindings.UnsignedGossipMessage_channel_update(CommonBase.get_ptr_of(a));
		const ret_hu_conv: UnsignedGossipMessage = UnsignedGossipMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new NodeAnnouncement-variant UnsignedGossipMessage
	 */
	public static constructor_node_announcement(a: UnsignedNodeAnnouncement): UnsignedGossipMessage {
		const ret: bigint = bindings.UnsignedGossipMessage_node_announcement(CommonBase.get_ptr_of(a));
		const ret_hu_conv: UnsignedGossipMessage = UnsignedGossipMessage.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnsignedGossipMessage object into a byte array which can be read by UnsignedGossipMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnsignedGossipMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A UnsignedGossipMessage of type ChannelAnnouncement */
export class UnsignedGossipMessage_ChannelAnnouncement extends UnsignedGossipMessage {
	public channel_announcement: UnsignedChannelAnnouncement;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_announcement: bigint = bindings.LDKUnsignedGossipMessage_ChannelAnnouncement_get_channel_announcement(ptr);
		const channel_announcement_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, channel_announcement);
			CommonBase.add_ref_from(channel_announcement_hu_conv, this);
		this.channel_announcement = channel_announcement_hu_conv;
	}
}
/** A UnsignedGossipMessage of type ChannelUpdate */
export class UnsignedGossipMessage_ChannelUpdate extends UnsignedGossipMessage {
	public channel_update: UnsignedChannelUpdate;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const channel_update: bigint = bindings.LDKUnsignedGossipMessage_ChannelUpdate_get_channel_update(ptr);
		const channel_update_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, channel_update);
			CommonBase.add_ref_from(channel_update_hu_conv, this);
		this.channel_update = channel_update_hu_conv;
	}
}
/** A UnsignedGossipMessage of type NodeAnnouncement */
export class UnsignedGossipMessage_NodeAnnouncement extends UnsignedGossipMessage {
	public node_announcement: UnsignedNodeAnnouncement;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const node_announcement: bigint = bindings.LDKUnsignedGossipMessage_NodeAnnouncement_get_node_announcement(ptr);
		const node_announcement_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, node_announcement);
			CommonBase.add_ref_from(node_announcement_hu_conv, this);
		this.node_announcement = node_announcement_hu_conv;
	}
}

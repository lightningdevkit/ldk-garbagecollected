
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`node_announcement`] message to be sent to or received from a peer.
 * 
 * [`node_announcement`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-node_announcement-message
 */
export class NodeAnnouncement extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeAnnouncement_free);
	}

	/**
	 * The signature by the node key
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.NodeAnnouncement_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The signature by the node key
	 */
	public set_signature(val: Uint8Array): void {
		bindings.NodeAnnouncement_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The actual content of the announcement
	 */
	public get_contents(): UnsignedNodeAnnouncement {
		const ret: bigint = bindings.NodeAnnouncement_get_contents(this.ptr);
		const ret_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The actual content of the announcement
	 */
	public set_contents(val: UnsignedNodeAnnouncement): void {
		bindings.NodeAnnouncement_set_contents(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new NodeAnnouncement given each field
	 */
	public static constructor_new(signature_arg: Uint8Array, contents_arg: UnsignedNodeAnnouncement): NodeAnnouncement {
		const ret: bigint = bindings.NodeAnnouncement_new(bindings.encodeUint8Array(signature_arg), CommonBase.get_ptr_of(contents_arg));
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeAnnouncement_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAnnouncement
	 */
	public clone(): NodeAnnouncement {
		const ret: bigint = bindings.NodeAnnouncement_clone(this.ptr);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the NodeAnnouncement.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.NodeAnnouncement_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two NodeAnnouncements contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NodeAnnouncement): boolean {
		const ret: boolean = bindings.NodeAnnouncement_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the NodeAnnouncement object into a byte array which can be read by NodeAnnouncement_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NodeAnnouncement_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeAnnouncement from a byte array, created by NodeAnnouncement_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NodeAnnouncementDecodeErrorZ {
		const ret: bigint = bindings.NodeAnnouncement_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NodeAnnouncementDecodeErrorZ = Result_NodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

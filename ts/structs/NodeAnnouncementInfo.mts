
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Information received in the latest node_announcement from this node.
 */
export class NodeAnnouncementInfo extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.NodeAnnouncementInfo_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): NodeAnnouncementInfo {
		const raw_ty: number = bindings.LDKNodeAnnouncementInfo_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new NodeAnnouncementInfo_Relayed(ptr);
			case 1: return new NodeAnnouncementInfo_Local(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeAnnouncementInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAnnouncementInfo
	 */
	public clone(): NodeAnnouncementInfo {
		const ret: bigint = bindings.NodeAnnouncementInfo_clone(this.ptr);
		const ret_hu_conv: NodeAnnouncementInfo = NodeAnnouncementInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Relayed-variant NodeAnnouncementInfo
	 */
	public static constructor_relayed(a: NodeAnnouncement): NodeAnnouncementInfo {
		const ret: bigint = bindings.NodeAnnouncementInfo_relayed(CommonBase.get_ptr_of(a));
		const ret_hu_conv: NodeAnnouncementInfo = NodeAnnouncementInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Local-variant NodeAnnouncementInfo
	 */
	public static constructor_local(a: NodeAnnouncementDetails): NodeAnnouncementInfo {
		const ret: bigint = bindings.NodeAnnouncementInfo_local(CommonBase.get_ptr_of(a));
		const ret_hu_conv: NodeAnnouncementInfo = NodeAnnouncementInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeAnnouncementInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: NodeAnnouncementInfo): boolean {
		const ret: boolean = bindings.NodeAnnouncementInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Protocol features the node announced support for
	 */
	public features(): NodeFeatures {
		const ret: bigint = bindings.NodeAnnouncementInfo_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * When the last known update to the node state was issued.
	 * 
	 * Value may or may not be a timestamp, depending on the policy of the origin node.
	 */
	public last_update(): number {
		const ret: number = bindings.NodeAnnouncementInfo_last_update(this.ptr);
		return ret;
	}

	/**
	 * Color assigned to the node
	 */
	public rgb(): Uint8Array {
		const ret: number = bindings.NodeAnnouncementInfo_rgb(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Moniker assigned to the node.
	 * 
	 * May be invalid or malicious (eg control chars), should not be exposed to the user.
	 */
	public alias(): NodeAlias {
		const ret: bigint = bindings.NodeAnnouncementInfo_alias(this.ptr);
		const ret_hu_conv: NodeAlias = new NodeAlias(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Internet-level addresses via which one can connect to the node
	 */
	public addresses(): SocketAddress[] {
		const ret: number = bindings.NodeAnnouncementInfo_addresses(this.ptr);
		const ret_conv_15_len: number = bindings.getArrayLength(ret);
		const ret_conv_15_arr: SocketAddress[] = new Array(ret_conv_15_len).fill(null);
		for (var p = 0; p < ret_conv_15_len; p++) {
			const ret_conv_15: bigint = bindings.getU64ArrayElem(ret, p);
			const ret_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret_conv_15);
			CommonBase.add_ref_from(ret_conv_15_hu_conv, this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_15_arr;
	}

	/**
	 * An initial announcement of the node
	 * 
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public announcement_message(): NodeAnnouncement {
		const ret: bigint = bindings.NodeAnnouncementInfo_announcement_message(this.ptr);
		const ret_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the NodeAnnouncementInfo object into a byte array which can be read by NodeAnnouncementInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NodeAnnouncementInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeAnnouncementInfo from a byte array, created by NodeAnnouncementInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NodeAnnouncementInfoDecodeErrorZ {
		const ret: bigint = bindings.NodeAnnouncementInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NodeAnnouncementInfoDecodeErrorZ = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A NodeAnnouncementInfo of type Relayed */
export class NodeAnnouncementInfo_Relayed extends NodeAnnouncementInfo {
	public relayed: NodeAnnouncement;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const relayed: bigint = bindings.LDKNodeAnnouncementInfo_Relayed_get_relayed(ptr);
		const relayed_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, relayed);
			CommonBase.add_ref_from(relayed_hu_conv, this);
		this.relayed = relayed_hu_conv;
	}
}
/** A NodeAnnouncementInfo of type Local */
export class NodeAnnouncementInfo_Local extends NodeAnnouncementInfo {
	public local: NodeAnnouncementDetails;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const local: bigint = bindings.LDKNodeAnnouncementInfo_Local_get_local(ptr);
		const local_hu_conv: NodeAnnouncementDetails = new NodeAnnouncementDetails(null, local);
			CommonBase.add_ref_from(local_hu_conv, this);
		this.local = local_hu_conv;
	}
}

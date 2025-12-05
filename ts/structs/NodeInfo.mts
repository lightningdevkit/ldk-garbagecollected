
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Details about a node in the network, known from the network announcement.
 */
export class NodeInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeInfo_free);
	}

	/**
	 * All valid channels a node has announced
	 * 
	 * Returns a copy of the field.
	 */
	public get_channels(): BigUint64Array {
		const ret: number = bindings.NodeInfo_get_channels(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * All valid channels a node has announced
	 */
	public set_channels(val: BigUint64Array): void {
		bindings.NodeInfo_set_channels(this.ptr, bindings.encodeUint64Array(val));
	}

	/**
	 * More information about a node from node_announcement.
	 * Optional because we store a Node entry after learning about it from
	 * a channel announcement, but before receiving a node announcement.
	 * 
	 * Returns a copy of the field.
	 */
	public get_announcement_info(): Option_NodeAnnouncementInfoZ {
		const ret: bigint = bindings.NodeInfo_get_announcement_info(this.ptr);
		const ret_hu_conv: Option_NodeAnnouncementInfoZ = Option_NodeAnnouncementInfoZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * More information about a node from node_announcement.
	 * Optional because we store a Node entry after learning about it from
	 * a channel announcement, but before receiving a node announcement.
	 */
	public set_announcement_info(val: Option_NodeAnnouncementInfoZ): void {
		bindings.NodeInfo_set_announcement_info(this.ptr, CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeInfo
	 */
	public clone(): NodeInfo {
		const ret: bigint = bindings.NodeInfo_clone(this.ptr);
		const ret_hu_conv: NodeInfo = new NodeInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NodeInfo): boolean {
		const ret: boolean = bindings.NodeInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns whether the node has only announced Tor addresses.
	 */
	public is_tor_only(): boolean {
		const ret: boolean = bindings.NodeInfo_is_tor_only(this.ptr);
		return ret;
	}

	/**
	 * Get the string representation of a NodeInfo object
	 */
	public to_str(): string {
		const ret: number = bindings.NodeInfo_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the NodeInfo object into a byte array which can be read by NodeInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.NodeInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a NodeInfo from a byte array, created by NodeInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_NodeInfoDecodeErrorZ {
		const ret: bigint = bindings.NodeInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_NodeInfoDecodeErrorZ = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

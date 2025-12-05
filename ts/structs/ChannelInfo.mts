
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Details about a channel (both directions).
 * Received within a channel announcement.
 */
export class ChannelInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelInfo_free);
	}

	/**
	 * Protocol features of a channel communicated during its announcement
	 */
	public get_features(): ChannelFeatures {
		const ret: bigint = bindings.ChannelInfo_get_features(this.ptr);
		const ret_hu_conv: ChannelFeatures = new ChannelFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Protocol features of a channel communicated during its announcement
	 */
	public set_features(val: ChannelFeatures): void {
		bindings.ChannelInfo_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Source node of the first direction of a channel
	 */
	public get_node_one(): NodeId {
		const ret: bigint = bindings.ChannelInfo_get_node_one(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Source node of the first direction of a channel
	 */
	public set_node_one(val: NodeId): void {
		bindings.ChannelInfo_set_node_one(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Source node of the second direction of a channel
	 */
	public get_node_two(): NodeId {
		const ret: bigint = bindings.ChannelInfo_get_node_two(this.ptr);
		const ret_hu_conv: NodeId = new NodeId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Source node of the second direction of a channel
	 */
	public set_node_two(val: NodeId): void {
		bindings.ChannelInfo_set_node_two(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The channel capacity as seen on-chain, if chain lookup is available.
	 */
	public get_capacity_sats(): Option_u64Z {
		const ret: bigint = bindings.ChannelInfo_get_capacity_sats(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel capacity as seen on-chain, if chain lookup is available.
	 */
	public set_capacity_sats(val: Option_u64Z): void {
		bindings.ChannelInfo_set_capacity_sats(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_one_to_two(): ChannelUpdateInfo {
		const ret: bigint = bindings.ChannelInfo_get_one_to_two(this.ptr);
		const ret_hu_conv: ChannelUpdateInfo = new ChannelUpdateInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Details about the first direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_one_to_two(val: ChannelUpdateInfo|null): void {
		bindings.ChannelInfo_set_one_to_two(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_two_to_one(): ChannelUpdateInfo {
		const ret: bigint = bindings.ChannelInfo_get_two_to_one(this.ptr);
		const ret_hu_conv: ChannelUpdateInfo = new ChannelUpdateInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Details about the second direction of a channel
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_two_to_one(val: ChannelUpdateInfo|null): void {
		bindings.ChannelInfo_set_two_to_one(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * An initial announcement of the channel
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_announcement_message(): ChannelAnnouncement {
		const ret: bigint = bindings.ChannelInfo_get_announcement_message(this.ptr);
		const ret_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An initial announcement of the channel
	 * Mostly redundant with the data we store in fields explicitly.
	 * Everything else is useful only for sending out for initial routing sync.
	 * Not stored if contains excess data to prevent DoS.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_announcement_message(val: ChannelAnnouncement|null): void {
		bindings.ChannelInfo_set_announcement_message(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelInfo
	 */
	public clone(): ChannelInfo {
		const ret: bigint = bindings.ChannelInfo_clone(this.ptr);
		const ret_hu_conv: ChannelInfo = new ChannelInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelInfo): boolean {
		const ret: boolean = bindings.ChannelInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns a [`ChannelUpdateInfo`] based on the direction implied by the channel_flag.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_directional_info(channel_flags: number): ChannelUpdateInfo {
		const ret: bigint = bindings.ChannelInfo_get_directional_info(this.ptr, channel_flags);
		const ret_hu_conv: ChannelUpdateInfo = new ChannelUpdateInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a ChannelInfo object
	 */
	public to_str(): string {
		const ret: number = bindings.ChannelInfo_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Serialize the ChannelInfo object into a byte array which can be read by ChannelInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelInfo from a byte array, created by ChannelInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelInfoDecodeErrorZ {
		const ret: bigint = bindings.ChannelInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelInfoDecodeErrorZ = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

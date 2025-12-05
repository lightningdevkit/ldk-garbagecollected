
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Non-relayable information received in the latest node_announcement from this node.
 */
export class NodeAnnouncementDetails extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.NodeAnnouncementDetails_free);
	}

	/**
	 * Protocol features the node announced support for
	 */
	public get_features(): NodeFeatures {
		const ret: bigint = bindings.NodeAnnouncementDetails_get_features(this.ptr);
		const ret_hu_conv: NodeFeatures = new NodeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Protocol features the node announced support for
	 */
	public set_features(val: NodeFeatures): void {
		bindings.NodeAnnouncementDetails_set_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * When the last known update to the node state was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public get_last_update(): number {
		const ret: number = bindings.NodeAnnouncementDetails_get_last_update(this.ptr);
		return ret;
	}

	/**
	 * When the last known update to the node state was issued.
	 * Value is opaque, as set in the announcement.
	 */
	public set_last_update(val: number): void {
		bindings.NodeAnnouncementDetails_set_last_update(this.ptr, val);
	}

	/**
	 * Color assigned to the node
	 */
	public get_rgb(): Uint8Array {
		const ret: number = bindings.NodeAnnouncementDetails_get_rgb(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Color assigned to the node
	 */
	public set_rgb(val: Uint8Array): void {
		bindings.NodeAnnouncementDetails_set_rgb(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Moniker assigned to the node.
	 * May be invalid or malicious (eg control chars),
	 * should not be exposed to the user.
	 */
	public get_alias(): NodeAlias {
		const ret: bigint = bindings.NodeAnnouncementDetails_get_alias(this.ptr);
		const ret_hu_conv: NodeAlias = new NodeAlias(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Moniker assigned to the node.
	 * May be invalid or malicious (eg control chars),
	 * should not be exposed to the user.
	 */
	public set_alias(val: NodeAlias): void {
		bindings.NodeAnnouncementDetails_set_alias(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Internet-level addresses via which one can connect to the node
	 * 
	 * Returns a copy of the field.
	 */
	public get_addresses(): SocketAddress[] {
		const ret: number = bindings.NodeAnnouncementDetails_get_addresses(this.ptr);
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
	 * Internet-level addresses via which one can connect to the node
	 */
	public set_addresses(val: SocketAddress[]): void {
		bindings.NodeAnnouncementDetails_set_addresses(this.ptr, bindings.encodeUint64Array(val.map(val_conv_15 => CommonBase.get_ptr_of(val_conv_15))));
	}

	/**
	 * Constructs a new NodeAnnouncementDetails given each field
	 */
	public static constructor_new(features_arg: NodeFeatures, last_update_arg: number, rgb_arg: Uint8Array, alias_arg: NodeAlias, addresses_arg: SocketAddress[]): NodeAnnouncementDetails {
		const ret: bigint = bindings.NodeAnnouncementDetails_new(CommonBase.get_ptr_of(features_arg), last_update_arg, bindings.encodeUint8Array(rgb_arg), CommonBase.get_ptr_of(alias_arg), bindings.encodeUint64Array(addresses_arg.map(addresses_arg_conv_15 => CommonBase.get_ptr_of(addresses_arg_conv_15))));
		const ret_hu_conv: NodeAnnouncementDetails = new NodeAnnouncementDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.NodeAnnouncementDetails_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the NodeAnnouncementDetails
	 */
	public clone(): NodeAnnouncementDetails {
		const ret: bigint = bindings.NodeAnnouncementDetails_clone(this.ptr);
		const ret_hu_conv: NodeAnnouncementDetails = new NodeAnnouncementDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two NodeAnnouncementDetailss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: NodeAnnouncementDetails): boolean {
		const ret: boolean = bindings.NodeAnnouncementDetails_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}

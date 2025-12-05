
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A path for sending an [`OnionMessage`].
 */
export class OnionMessagePath extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OnionMessagePath_free);
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 * 
	 * Returns a copy of the field.
	 */
	public get_intermediate_nodes(): Uint8Array[] {
		const ret: number = bindings.OnionMessagePath_get_intermediate_nodes(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: Uint8Array[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: number = bindings.getU32ArrayElem(ret, m);
			const ret_conv_12_conv: Uint8Array = bindings.decodeUint8Array(ret_conv_12);
			ret_conv_12_arr[m] = ret_conv_12_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * Nodes on the path between the sender and the destination.
	 */
	public set_intermediate_nodes(val: Uint8Array[]): void {
		bindings.OnionMessagePath_set_intermediate_nodes(this.ptr, bindings.encodeUint32Array(val.map(val_conv_12 => bindings.encodeUint8Array(val_conv_12))));
	}

	/**
	 * The recipient of the message.
	 */
	public get_destination(): Destination {
		const ret: bigint = bindings.OnionMessagePath_get_destination(this.ptr);
		const ret_hu_conv: Destination = Destination.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The recipient of the message.
	 */
	public set_destination(val: Destination): void {
		bindings.OnionMessagePath_set_destination(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be filled in if a connection to the node is required and it is not a known peer.
	 * [`OnionMessenger`] may use this to initiate such a connection.
	 * 
	 * Returns a copy of the field.
	 */
	public get_first_node_addresses(): SocketAddress[] {
		const ret: number = bindings.OnionMessagePath_get_first_node_addresses(this.ptr);
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
	 * Addresses that may be used to connect to [`OnionMessagePath::first_node`].
	 * 
	 * Only needs to be filled in if a connection to the node is required and it is not a known peer.
	 * [`OnionMessenger`] may use this to initiate such a connection.
	 */
	public set_first_node_addresses(val: SocketAddress[]): void {
		bindings.OnionMessagePath_set_first_node_addresses(this.ptr, bindings.encodeUint64Array(val.map(val_conv_15 => CommonBase.get_ptr_of(val_conv_15))));
	}

	/**
	 * Constructs a new OnionMessagePath given each field
	 */
	public static constructor_new(intermediate_nodes_arg: Uint8Array[], destination_arg: Destination, first_node_addresses_arg: SocketAddress[]): OnionMessagePath {
		const ret: bigint = bindings.OnionMessagePath_new(bindings.encodeUint32Array(intermediate_nodes_arg.map(intermediate_nodes_arg_conv_12 => bindings.encodeUint8Array(intermediate_nodes_arg_conv_12))), CommonBase.get_ptr_of(destination_arg), bindings.encodeUint64Array(first_node_addresses_arg.map(first_node_addresses_arg_conv_15 => CommonBase.get_ptr_of(first_node_addresses_arg_conv_15))));
		const ret_hu_conv: OnionMessagePath = new OnionMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OnionMessagePath_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessagePath
	 */
	public clone(): OnionMessagePath {
		const ret: bigint = bindings.OnionMessagePath_clone(this.ptr);
		const ret_hu_conv: OnionMessagePath = new OnionMessagePath(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the first node in the path.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public first_node(): Uint8Array {
		const ret: number = bindings.OnionMessagePath_first_node(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}

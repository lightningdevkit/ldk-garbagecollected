
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Details of a connected peer as returned by [`PeerManager::list_peers`].
 */
export class PeerDetails extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PeerDetails_free);
	}

	/**
	 * The node id of the peer.
	 * 
	 * For outbound connections, this [`PublicKey`] will be the same as the `their_node_id` parameter
	 * passed in to [`PeerManager::new_outbound_connection`].
	 */
	public get_counterparty_node_id(): Uint8Array {
		const ret: number = bindings.PeerDetails_get_counterparty_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node id of the peer.
	 * 
	 * For outbound connections, this [`PublicKey`] will be the same as the `their_node_id` parameter
	 * passed in to [`PeerManager::new_outbound_connection`].
	 */
	public set_counterparty_node_id(val: Uint8Array): void {
		bindings.PeerDetails_set_counterparty_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The socket address the peer provided in the initial handshake.
	 * 
	 * Will only be `Some` if an address had been previously provided to
	 * [`PeerManager::new_outbound_connection`] or [`PeerManager::new_inbound_connection`].
	 * 
	 * Returns a copy of the field.
	 */
	public get_socket_address(): Option_SocketAddressZ {
		const ret: bigint = bindings.PeerDetails_get_socket_address(this.ptr);
		const ret_hu_conv: Option_SocketAddressZ = Option_SocketAddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The socket address the peer provided in the initial handshake.
	 * 
	 * Will only be `Some` if an address had been previously provided to
	 * [`PeerManager::new_outbound_connection`] or [`PeerManager::new_inbound_connection`].
	 */
	public set_socket_address(val: Option_SocketAddressZ): void {
		bindings.PeerDetails_set_socket_address(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The features the peer provided in the initial handshake.
	 */
	public get_init_features(): InitFeatures {
		const ret: bigint = bindings.PeerDetails_get_init_features(this.ptr);
		const ret_hu_conv: InitFeatures = new InitFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The features the peer provided in the initial handshake.
	 */
	public set_init_features(val: InitFeatures): void {
		bindings.PeerDetails_set_init_features(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Indicates the direction of the peer connection.
	 * 
	 * Will be `true` for inbound connections, and `false` for outbound connections.
	 */
	public get_is_inbound_connection(): boolean {
		const ret: boolean = bindings.PeerDetails_get_is_inbound_connection(this.ptr);
		return ret;
	}

	/**
	 * Indicates the direction of the peer connection.
	 * 
	 * Will be `true` for inbound connections, and `false` for outbound connections.
	 */
	public set_is_inbound_connection(val: boolean): void {
		bindings.PeerDetails_set_is_inbound_connection(this.ptr, val);
	}

	/**
	 * Constructs a new PeerDetails given each field
	 */
	public static constructor_new(counterparty_node_id_arg: Uint8Array, socket_address_arg: Option_SocketAddressZ, init_features_arg: InitFeatures, is_inbound_connection_arg: boolean): PeerDetails {
		const ret: bigint = bindings.PeerDetails_new(bindings.encodeUint8Array(counterparty_node_id_arg), CommonBase.get_ptr_of(socket_address_arg), CommonBase.get_ptr_of(init_features_arg), is_inbound_connection_arg);
		const ret_hu_conv: PeerDetails = new PeerDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

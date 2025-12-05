

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of SocketDescriptor */
export interface SocketDescriptorInterface {
	/**Attempts to send some data from the given slice to the peer.
	 * 
	 * Returns the amount of data which was sent, possibly 0 if the socket has since disconnected.
	 * Note that in the disconnected case, [`PeerManager::socket_disconnected`] must still be
	 * called and further write attempts may occur until that time.
	 * 
	 * If the returned size is smaller than `data.len()`, a
	 * [`PeerManager::write_buffer_space_avail`] call must be made the next time more data can be
	 * written.
	 * 
	 * If `continue_read` is *not* set, further [`PeerManager::read_event`] calls should be
	 * avoided until another call is made with it set. This allows us to pause read if there are
	 * too many outgoing messages queued for a peer to avoid DoS issues where a peer fills our
	 * buffer by sending us messages that need response without reading the responses.
	 * 
	 * Note that calls may be made with an empty `data` to update the `continue_read` flag.
	 */
	send_data(data: Uint8Array, continue_read: boolean): number;
	/**Disconnect the socket pointed to by this SocketDescriptor.
	 * 
	 * You do *not* need to call [`PeerManager::socket_disconnected`] with this socket after this
	 * call (doing so is a noop).
	 */
	disconnect_socket(): void;
	/**Checks if two objects are equal given this object's this_arg pointer and another object.
	 */
	eq(other_arg: SocketDescriptor): boolean;
	/**Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	hash(): bigint;
}

class LDKSocketDescriptorHolder {
	held: SocketDescriptor|null = null;
}

/**
 * Provides an object which can be used to send data to and which uniquely identifies a connection
 * to a remote host. You will need to be able to generate multiple of these which meet Eq and
 * implement Hash to meet the PeerManager API.
 * 
 * For efficiency, [`Clone`] should be relatively cheap for this type.
 * 
 * Two descriptors may compare equal (by [`cmp::Eq`] and [`hash::Hash`]) as long as the original
 * has been disconnected, the [`PeerManager`] has been informed of the disconnection (either by it
 * having triggered the disconnection or a call to [`PeerManager::socket_disconnected`]), and no
 * further calls to the [`PeerManager`] related to the original socket occur. This allows you to
 * use a file descriptor for your SocketDescriptor directly, however for simplicity you may wish
 * to simply use another value which is guaranteed to be globally unique instead.
 */
export class SocketDescriptor extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKSocketDescriptor|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SocketDescriptor_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of SocketDescriptor from a given implementation */
	public static new_impl(arg: SocketDescriptorInterface): SocketDescriptor {
		const impl_holder: LDKSocketDescriptorHolder = new LDKSocketDescriptorHolder();
		let structImplementation = {
			send_data (data: number, continue_read: boolean): number {
				const data_conv: Uint8Array = bindings.decodeUint8Array(data);
				const ret: number = arg.send_data(data_conv, continue_read);
				return ret;
			},
			disconnect_socket (): void {
				arg.disconnect_socket();
			},
			eq (other_arg: bigint): boolean {
				const ret_hu_conv: SocketDescriptor = new SocketDescriptor(null, other_arg);
				CommonBase.add_ref_from(ret_hu_conv, this);
				const ret: boolean = arg.eq(ret_hu_conv);
				return ret;
			},
			hash (): bigint {
				const ret: bigint = arg.hash();
				return ret;
			},
		} as bindings.LDKSocketDescriptor;
		const ptr_idx: [bigint, number] = bindings.LDKSocketDescriptor_new(structImplementation);

		impl_holder.held = new SocketDescriptor(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Attempts to send some data from the given slice to the peer.
	 * 
	 * Returns the amount of data which was sent, possibly 0 if the socket has since disconnected.
	 * Note that in the disconnected case, [`PeerManager::socket_disconnected`] must still be
	 * called and further write attempts may occur until that time.
	 * 
	 * If the returned size is smaller than `data.len()`, a
	 * [`PeerManager::write_buffer_space_avail`] call must be made the next time more data can be
	 * written.
	 * 
	 * If `continue_read` is *not* set, further [`PeerManager::read_event`] calls should be
	 * avoided until another call is made with it set. This allows us to pause read if there are
	 * too many outgoing messages queued for a peer to avoid DoS issues where a peer fills our
	 * buffer by sending us messages that need response without reading the responses.
	 * 
	 * Note that calls may be made with an empty `data` to update the `continue_read` flag.
	 */
	public send_data(data: Uint8Array, continue_read: boolean): number {
		const ret: number = bindings.SocketDescriptor_send_data(this.ptr, bindings.encodeUint8Array(data), continue_read);
		return ret;
	}

	/**
	 * Disconnect the socket pointed to by this SocketDescriptor.
	 * 
	 * You do *not* need to call [`PeerManager::socket_disconnected`] with this socket after this
	 * call (doing so is a noop).
	 */
	public disconnect_socket(): void {
		bindings.SocketDescriptor_disconnect_socket(this.ptr);
	}

	/**
	 * Calculate a succinct non-cryptographic hash for an object given its this_arg pointer.
	 * This is used, for example, for inclusion of this object in a hash map.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.SocketDescriptor_hash(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SocketDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of a SocketDescriptor
	 */
	public clone(): SocketDescriptor {
		const ret: bigint = bindings.SocketDescriptor_clone(this.ptr);
		const ret_hu_conv: SocketDescriptor = new SocketDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}

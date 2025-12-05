
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`onion message`] to be sent to or received from a peer.
 * 
 * [`onion message`]: https://github.com/lightning/bolts/blob/master/04-onion-routing.md#onion-messages
 */
export class OnionMessage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OnionMessage_free);
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public get_blinding_point(): Uint8Array {
		const ret: number = bindings.OnionMessage_get_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Used in decrypting the onion packet's payload.
	 */
	public set_blinding_point(val: Uint8Array): void {
		bindings.OnionMessage_set_blinding_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public get_onion_routing_packet(): Packet {
		const ret: bigint = bindings.OnionMessage_get_onion_routing_packet(this.ptr);
		const ret_hu_conv: Packet = new Packet(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The full onion packet including hop data, pubkey, and hmac
	 */
	public set_onion_routing_packet(val: Packet): void {
		bindings.OnionMessage_set_onion_routing_packet(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new OnionMessage given each field
	 */
	public static constructor_new(blinding_point_arg: Uint8Array, onion_routing_packet_arg: Packet): OnionMessage {
		const ret: bigint = bindings.OnionMessage_new(bindings.encodeUint8Array(blinding_point_arg), CommonBase.get_ptr_of(onion_routing_packet_arg));
		const ret_hu_conv: OnionMessage = new OnionMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OnionMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OnionMessage
	 */
	public clone(): OnionMessage {
		const ret: bigint = bindings.OnionMessage_clone(this.ptr);
		const ret_hu_conv: OnionMessage = new OnionMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OnionMessage.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OnionMessage_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two OnionMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OnionMessage): boolean {
		const ret: boolean = bindings.OnionMessage_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Read a OnionMessage from a byte array, created by OnionMessage_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OnionMessageDecodeErrorZ {
		const ret: bigint = bindings.OnionMessage_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OnionMessageDecodeErrorZ = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OnionMessage object into a byte array which can be read by OnionMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OnionMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}

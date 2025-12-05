
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`ping`] message to be sent to or received from a peer.
 * 
 * [`ping`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-ping-and-pong-messages
 */
export class Ping extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Ping_free);
	}

	/**
	 * The desired response length.
	 */
	public get_ponglen(): number {
		const ret: number = bindings.Ping_get_ponglen(this.ptr);
		return ret;
	}

	/**
	 * The desired response length.
	 */
	public set_ponglen(val: number): void {
		bindings.Ping_set_ponglen(this.ptr, val);
	}

	/**
	 * The ping packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public get_byteslen(): number {
		const ret: number = bindings.Ping_get_byteslen(this.ptr);
		return ret;
	}

	/**
	 * The ping packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public set_byteslen(val: number): void {
		bindings.Ping_set_byteslen(this.ptr, val);
	}

	/**
	 * Constructs a new Ping given each field
	 */
	public static constructor_new(ponglen_arg: number, byteslen_arg: number): Ping {
		const ret: bigint = bindings.Ping_new(ponglen_arg, byteslen_arg);
		const ret_hu_conv: Ping = new Ping(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Ping_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Ping
	 */
	public clone(): Ping {
		const ret: bigint = bindings.Ping_clone(this.ptr);
		const ret_hu_conv: Ping = new Ping(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Ping.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Ping_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Pings contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Ping): boolean {
		const ret: boolean = bindings.Ping_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Ping object into a byte array which can be read by Ping_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Ping_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Ping from a byte array, created by Ping_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PingDecodeErrorZ {
		const ret: bigint = bindings.Ping_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PingDecodeErrorZ = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

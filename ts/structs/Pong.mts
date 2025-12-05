
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`pong`] message to be sent to or received from a peer.
 * 
 * [`pong`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-ping-and-pong-messages
 */
export class Pong extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Pong_free);
	}

	/**
	 * The pong packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public get_byteslen(): number {
		const ret: number = bindings.Pong_get_byteslen(this.ptr);
		return ret;
	}

	/**
	 * The pong packet size.
	 * 
	 * This field is not sent on the wire. byteslen zeros are sent.
	 */
	public set_byteslen(val: number): void {
		bindings.Pong_set_byteslen(this.ptr, val);
	}

	/**
	 * Constructs a new Pong given each field
	 */
	public static constructor_new(byteslen_arg: number): Pong {
		const ret: bigint = bindings.Pong_new(byteslen_arg);
		const ret_hu_conv: Pong = new Pong(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Pong_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Pong
	 */
	public clone(): Pong {
		const ret: bigint = bindings.Pong_clone(this.ptr);
		const ret_hu_conv: Pong = new Pong(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Pong.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Pong_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Pongs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Pong): boolean {
		const ret: boolean = bindings.Pong_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Pong object into a byte array which can be read by Pong_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Pong_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Pong from a byte array, created by Pong_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PongDecodeErrorZ {
		const ret: bigint = bindings.Pong_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PongDecodeErrorZ = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

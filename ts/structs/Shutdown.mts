
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`shutdown`] message to be sent to or received from a peer.
 * 
 * [`shutdown`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-initiation-shutdown
 */
export class Shutdown extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Shutdown_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.Shutdown_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.Shutdown_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The destination of this peer's funds on closing.
	 * 
	 * Must be in one of these forms: P2PKH, P2SH, P2WPKH, P2WSH, P2TR.
	 */
	public get_scriptpubkey(): Uint8Array {
		const ret: number = bindings.Shutdown_get_scriptpubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of this peer's funds on closing.
	 * 
	 * Must be in one of these forms: P2PKH, P2SH, P2WPKH, P2WSH, P2TR.
	 */
	public set_scriptpubkey(val: Uint8Array): void {
		bindings.Shutdown_set_scriptpubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new Shutdown given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, scriptpubkey_arg: Uint8Array): Shutdown {
		const ret: bigint = bindings.Shutdown_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(scriptpubkey_arg));
		const ret_hu_conv: Shutdown = new Shutdown(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Shutdown_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Shutdown
	 */
	public clone(): Shutdown {
		const ret: bigint = bindings.Shutdown_clone(this.ptr);
		const ret_hu_conv: Shutdown = new Shutdown(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Shutdown.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Shutdown_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Shutdowns contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Shutdown): boolean {
		const ret: boolean = bindings.Shutdown_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Shutdown object into a byte array which can be read by Shutdown_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Shutdown_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Shutdown from a byte array, created by Shutdown_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ShutdownDecodeErrorZ {
		const ret: bigint = bindings.Shutdown_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ShutdownDecodeErrorZ = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

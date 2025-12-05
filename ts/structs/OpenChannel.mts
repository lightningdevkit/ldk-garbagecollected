
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`open_channel`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`open_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel-message
 */
export class OpenChannel extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OpenChannel_free);
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public get_common_fields(): CommonOpenChannelFields {
		const ret: bigint = bindings.OpenChannel_get_common_fields(this.ptr);
		const ret_hu_conv: CommonOpenChannelFields = new CommonOpenChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public set_common_fields(val: CommonOpenChannelFields): void {
		bindings.OpenChannel_set_common_fields(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public get_push_msat(): bigint {
		const ret: bigint = bindings.OpenChannel_get_push_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount to push to the counterparty as part of the open, in milli-satoshi
	 */
	public set_push_msat(val: bigint): void {
		bindings.OpenChannel_set_push_msat(this.ptr, val);
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public get_channel_reserve_satoshis(): bigint {
		const ret: bigint = bindings.OpenChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public set_channel_reserve_satoshis(val: bigint): void {
		bindings.OpenChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new OpenChannel given each field
	 */
	public static constructor_new(common_fields_arg: CommonOpenChannelFields, push_msat_arg: bigint, channel_reserve_satoshis_arg: bigint): OpenChannel {
		const ret: bigint = bindings.OpenChannel_new(CommonBase.get_ptr_of(common_fields_arg), push_msat_arg, channel_reserve_satoshis_arg);
		const ret_hu_conv: OpenChannel = new OpenChannel(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OpenChannel_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OpenChannel
	 */
	public clone(): OpenChannel {
		const ret: bigint = bindings.OpenChannel_clone(this.ptr);
		const ret_hu_conv: OpenChannel = new OpenChannel(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OpenChannel.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OpenChannel_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two OpenChannels contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OpenChannel): boolean {
		const ret: boolean = bindings.OpenChannel_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OpenChannel object into a byte array which can be read by OpenChannel_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OpenChannel_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OpenChannel from a byte array, created by OpenChannel_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OpenChannelDecodeErrorZ {
		const ret: bigint = bindings.OpenChannel_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OpenChannelDecodeErrorZ = Result_OpenChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

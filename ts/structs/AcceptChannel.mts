
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`accept_channel`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`accept_channel`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel-message
 */
export class AcceptChannel extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AcceptChannel_free);
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public get_common_fields(): CommonAcceptChannelFields {
		const ret: bigint = bindings.AcceptChannel_get_common_fields(this.ptr);
		const ret_hu_conv: CommonAcceptChannelFields = new CommonAcceptChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public set_common_fields(val: CommonAcceptChannelFields): void {
		bindings.AcceptChannel_set_common_fields(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public get_channel_reserve_satoshis(): bigint {
		const ret: bigint = bindings.AcceptChannel_get_channel_reserve_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The minimum value unencumbered by HTLCs for the counterparty to keep in the channel
	 */
	public set_channel_reserve_satoshis(val: bigint): void {
		bindings.AcceptChannel_set_channel_reserve_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new AcceptChannel given each field
	 */
	public static constructor_new(common_fields_arg: CommonAcceptChannelFields, channel_reserve_satoshis_arg: bigint): AcceptChannel {
		const ret: bigint = bindings.AcceptChannel_new(CommonBase.get_ptr_of(common_fields_arg), channel_reserve_satoshis_arg);
		const ret_hu_conv: AcceptChannel = new AcceptChannel(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AcceptChannel_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AcceptChannel
	 */
	public clone(): AcceptChannel {
		const ret: bigint = bindings.AcceptChannel_clone(this.ptr);
		const ret_hu_conv: AcceptChannel = new AcceptChannel(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AcceptChannel.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.AcceptChannel_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two AcceptChannels contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AcceptChannel): boolean {
		const ret: boolean = bindings.AcceptChannel_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the AcceptChannel object into a byte array which can be read by AcceptChannel_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AcceptChannel_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AcceptChannel from a byte array, created by AcceptChannel_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AcceptChannelDecodeErrorZ {
		const ret: bigint = bindings.AcceptChannel_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AcceptChannelDecodeErrorZ = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`accept_channel2`] message to be sent by or received from the channel accepter.
 * 
 * Used in V2 channel establishment
 * 
 * [`accept_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-accept_channel2-message
 */
export class AcceptChannelV2 extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AcceptChannelV2_free);
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public get_common_fields(): CommonAcceptChannelFields {
		const ret: bigint = bindings.AcceptChannelV2_get_common_fields(this.ptr);
		const ret_hu_conv: CommonAcceptChannelFields = new CommonAcceptChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Common fields of `accept_channel(2)`-like messages
	 */
	public set_common_fields(val: CommonAcceptChannelFields): void {
		bindings.AcceptChannelV2_set_common_fields(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Part of the channel value contributed by the channel acceptor
	 */
	public get_funding_satoshis(): bigint {
		const ret: bigint = bindings.AcceptChannelV2_get_funding_satoshis(this.ptr);
		return ret;
	}

	/**
	 * Part of the channel value contributed by the channel acceptor
	 */
	public set_funding_satoshis(val: bigint): void {
		bindings.AcceptChannelV2_set_funding_satoshis(this.ptr, val);
	}

	/**
	 * The second to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public get_second_per_commitment_point(): Uint8Array {
		const ret: number = bindings.AcceptChannelV2_get_second_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The second to-be-broadcast-by-channel-acceptor transaction's per commitment point
	 */
	public set_second_per_commitment_point(val: Uint8Array): void {
		bindings.AcceptChannelV2_set_second_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public get_require_confirmed_inputs(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.AcceptChannelV2_get_require_confirmed_inputs(this.ptr);
		return ret;
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public set_require_confirmed_inputs(val: COption_NoneZ): void {
		bindings.AcceptChannelV2_set_require_confirmed_inputs(this.ptr, val);
	}

	/**
	 * Constructs a new AcceptChannelV2 given each field
	 */
	public static constructor_new(common_fields_arg: CommonAcceptChannelFields, funding_satoshis_arg: bigint, second_per_commitment_point_arg: Uint8Array, require_confirmed_inputs_arg: COption_NoneZ): AcceptChannelV2 {
		const ret: bigint = bindings.AcceptChannelV2_new(CommonBase.get_ptr_of(common_fields_arg), funding_satoshis_arg, bindings.encodeUint8Array(second_per_commitment_point_arg), require_confirmed_inputs_arg);
		const ret_hu_conv: AcceptChannelV2 = new AcceptChannelV2(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AcceptChannelV2_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AcceptChannelV2
	 */
	public clone(): AcceptChannelV2 {
		const ret: bigint = bindings.AcceptChannelV2_clone(this.ptr);
		const ret_hu_conv: AcceptChannelV2 = new AcceptChannelV2(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AcceptChannelV2.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.AcceptChannelV2_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two AcceptChannelV2s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AcceptChannelV2): boolean {
		const ret: boolean = bindings.AcceptChannelV2_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the AcceptChannelV2 object into a byte array which can be read by AcceptChannelV2_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AcceptChannelV2_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AcceptChannelV2 from a byte array, created by AcceptChannelV2_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AcceptChannelV2DecodeErrorZ {
		const ret: bigint = bindings.AcceptChannelV2_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AcceptChannelV2DecodeErrorZ = Result_AcceptChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

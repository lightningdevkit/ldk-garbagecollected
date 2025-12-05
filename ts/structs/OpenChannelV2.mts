
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`open_channel2`] message to be sent by or received from the channel initiator.
 * 
 * Used in V2 channel establishment
 * 
 * [`open_channel2`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-open_channel2-message
 */
export class OpenChannelV2 extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OpenChannelV2_free);
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public get_common_fields(): CommonOpenChannelFields {
		const ret: bigint = bindings.OpenChannelV2_get_common_fields(this.ptr);
		const ret_hu_conv: CommonOpenChannelFields = new CommonOpenChannelFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Common fields of `open_channel(2)`-like messages
	 */
	public set_common_fields(val: CommonOpenChannelFields): void {
		bindings.OpenChannelV2_set_common_fields(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The feerate for the funding transaction set by the channel initiator
	 */
	public get_funding_feerate_sat_per_1000_weight(): number {
		const ret: number = bindings.OpenChannelV2_get_funding_feerate_sat_per_1000_weight(this.ptr);
		return ret;
	}

	/**
	 * The feerate for the funding transaction set by the channel initiator
	 */
	public set_funding_feerate_sat_per_1000_weight(val: number): void {
		bindings.OpenChannelV2_set_funding_feerate_sat_per_1000_weight(this.ptr, val);
	}

	/**
	 * The locktime for the funding transaction
	 */
	public get_locktime(): number {
		const ret: number = bindings.OpenChannelV2_get_locktime(this.ptr);
		return ret;
	}

	/**
	 * The locktime for the funding transaction
	 */
	public set_locktime(val: number): void {
		bindings.OpenChannelV2_set_locktime(this.ptr, val);
	}

	/**
	 * The second to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public get_second_per_commitment_point(): Uint8Array {
		const ret: number = bindings.OpenChannelV2_get_second_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The second to-be-broadcast-by-channel-initiator transaction's per commitment point
	 */
	public set_second_per_commitment_point(val: Uint8Array): void {
		bindings.OpenChannelV2_set_second_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public get_require_confirmed_inputs(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.OpenChannelV2_get_require_confirmed_inputs(this.ptr);
		return ret;
	}

	/**
	 * Optionally, a requirement that only confirmed inputs can be added
	 */
	public set_require_confirmed_inputs(val: COption_NoneZ): void {
		bindings.OpenChannelV2_set_require_confirmed_inputs(this.ptr, val);
	}

	/**
	 * Constructs a new OpenChannelV2 given each field
	 */
	public static constructor_new(common_fields_arg: CommonOpenChannelFields, funding_feerate_sat_per_1000_weight_arg: number, locktime_arg: number, second_per_commitment_point_arg: Uint8Array, require_confirmed_inputs_arg: COption_NoneZ): OpenChannelV2 {
		const ret: bigint = bindings.OpenChannelV2_new(CommonBase.get_ptr_of(common_fields_arg), funding_feerate_sat_per_1000_weight_arg, locktime_arg, bindings.encodeUint8Array(second_per_commitment_point_arg), require_confirmed_inputs_arg);
		const ret_hu_conv: OpenChannelV2 = new OpenChannelV2(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OpenChannelV2_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OpenChannelV2
	 */
	public clone(): OpenChannelV2 {
		const ret: bigint = bindings.OpenChannelV2_clone(this.ptr);
		const ret_hu_conv: OpenChannelV2 = new OpenChannelV2(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the OpenChannelV2.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.OpenChannelV2_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two OpenChannelV2s contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OpenChannelV2): boolean {
		const ret: boolean = bindings.OpenChannelV2_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OpenChannelV2 object into a byte array which can be read by OpenChannelV2_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OpenChannelV2_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OpenChannelV2 from a byte array, created by OpenChannelV2_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OpenChannelV2DecodeErrorZ {
		const ret: bigint = bindings.OpenChannelV2_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OpenChannelV2DecodeErrorZ = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

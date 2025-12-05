
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information needed for constructing an invoice route hint for this channel.
 */
export class CounterpartyForwardingInfo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CounterpartyForwardingInfo_free);
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public get_fee_base_msat(): number {
		const ret: number = bindings.CounterpartyForwardingInfo_get_fee_base_msat(this.ptr);
		return ret;
	}

	/**
	 * Base routing fee in millisatoshis.
	 */
	public set_fee_base_msat(val: number): void {
		bindings.CounterpartyForwardingInfo_set_fee_base_msat(this.ptr, val);
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public get_fee_proportional_millionths(): number {
		const ret: number = bindings.CounterpartyForwardingInfo_get_fee_proportional_millionths(this.ptr);
		return ret;
	}

	/**
	 * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
	 */
	public set_fee_proportional_millionths(val: number): void {
		bindings.CounterpartyForwardingInfo_set_fee_proportional_millionths(this.ptr, val);
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public get_cltv_expiry_delta(): number {
		const ret: number = bindings.CounterpartyForwardingInfo_get_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
	 * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
	 * `cltv_expiry_delta` for more details.
	 */
	public set_cltv_expiry_delta(val: number): void {
		bindings.CounterpartyForwardingInfo_set_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * Constructs a new CounterpartyForwardingInfo given each field
	 */
	public static constructor_new(fee_base_msat_arg: number, fee_proportional_millionths_arg: number, cltv_expiry_delta_arg: number): CounterpartyForwardingInfo {
		const ret: bigint = bindings.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
		const ret_hu_conv: CounterpartyForwardingInfo = new CounterpartyForwardingInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CounterpartyForwardingInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyForwardingInfo
	 */
	public clone(): CounterpartyForwardingInfo {
		const ret: bigint = bindings.CounterpartyForwardingInfo_clone(this.ptr);
		const ret_hu_conv: CounterpartyForwardingInfo = new CounterpartyForwardingInfo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the CounterpartyForwardingInfo object into a byte array which can be read by CounterpartyForwardingInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CounterpartyForwardingInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CounterpartyForwardingInfo from a byte array, created by CounterpartyForwardingInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CounterpartyForwardingInfoDecodeErrorZ {
		const ret: bigint = bindings.CounterpartyForwardingInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CounterpartyForwardingInfoDecodeErrorZ = Result_CounterpartyForwardingInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`funding_created`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`funding_created`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-funding_created-message
 */
export class FundingCreated extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FundingCreated_free);
	}

	/**
	 * A temporary channel ID, until the funding is established
	 */
	public get_temporary_channel_id(): ChannelId {
		const ret: bigint = bindings.FundingCreated_get_temporary_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A temporary channel ID, until the funding is established
	 */
	public set_temporary_channel_id(val: ChannelId): void {
		bindings.FundingCreated_set_temporary_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The funding transaction ID
	 */
	public get_funding_txid(): Uint8Array {
		const ret: number = bindings.FundingCreated_get_funding_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The funding transaction ID
	 */
	public set_funding_txid(val: Uint8Array): void {
		bindings.FundingCreated_set_funding_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The specific output index funding this channel
	 */
	public get_funding_output_index(): number {
		const ret: number = bindings.FundingCreated_get_funding_output_index(this.ptr);
		return ret;
	}

	/**
	 * The specific output index funding this channel
	 */
	public set_funding_output_index(val: number): void {
		bindings.FundingCreated_set_funding_output_index(this.ptr, val);
	}

	/**
	 * The signature of the channel initiator (funder) on the initial commitment transaction
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.FundingCreated_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The signature of the channel initiator (funder) on the initial commitment transaction
	 */
	public set_signature(val: Uint8Array): void {
		bindings.FundingCreated_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new FundingCreated given each field
	 */
	public static constructor_new(temporary_channel_id_arg: ChannelId, funding_txid_arg: Uint8Array, funding_output_index_arg: number, signature_arg: Uint8Array): FundingCreated {
		const ret: bigint = bindings.FundingCreated_new(CommonBase.get_ptr_of(temporary_channel_id_arg), bindings.encodeUint8Array(funding_txid_arg), funding_output_index_arg, bindings.encodeUint8Array(signature_arg));
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FundingCreated_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FundingCreated
	 */
	public clone(): FundingCreated {
		const ret: bigint = bindings.FundingCreated_clone(this.ptr);
		const ret_hu_conv: FundingCreated = new FundingCreated(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the FundingCreated.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.FundingCreated_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two FundingCreateds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: FundingCreated): boolean {
		const ret: boolean = bindings.FundingCreated_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the FundingCreated object into a byte array which can be read by FundingCreated_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FundingCreated_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingCreated from a byte array, created by FundingCreated_write
	 */
	public static constructor_read(ser: Uint8Array): Result_FundingCreatedDecodeErrorZ {
		const ret: bigint = bindings.FundingCreated_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_FundingCreatedDecodeErrorZ = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

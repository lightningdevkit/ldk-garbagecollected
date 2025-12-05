
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_ack_rbf`] message which acknowledges replacement of the transaction after it's been
 * completed.
 * 
 * [`tx_ack_rbf`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_ack_rbf-message
 */
export class TxAckRbf extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxAckRbf_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxAckRbf_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxAckRbf_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public get_funding_output_contribution(): Option_i64Z {
		const ret: bigint = bindings.TxAckRbf_get_funding_output_contribution(this.ptr);
		const ret_hu_conv: Option_i64Z = Option_i64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public set_funding_output_contribution(val: Option_i64Z): void {
		bindings.TxAckRbf_set_funding_output_contribution(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxAckRbf given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, funding_output_contribution_arg: Option_i64Z): TxAckRbf {
		const ret: bigint = bindings.TxAckRbf_new(CommonBase.get_ptr_of(channel_id_arg), CommonBase.get_ptr_of(funding_output_contribution_arg));
		const ret_hu_conv: TxAckRbf = new TxAckRbf(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxAckRbf_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxAckRbf
	 */
	public clone(): TxAckRbf {
		const ret: bigint = bindings.TxAckRbf_clone(this.ptr);
		const ret_hu_conv: TxAckRbf = new TxAckRbf(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAckRbf.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxAckRbf_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxAckRbfs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxAckRbf): boolean {
		const ret: boolean = bindings.TxAckRbf_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxAckRbf object into a byte array which can be read by TxAckRbf_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxAckRbf_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAckRbf from a byte array, created by TxAckRbf_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxAckRbfDecodeErrorZ {
		const ret: bigint = bindings.TxAckRbf_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxAckRbfDecodeErrorZ = Result_TxAckRbfDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_init_rbf`] message which initiates a replacement of the transaction after it's been
 * completed.
 * 
 * [`tx_init_rbf`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_init_rbf-message
 */
export class TxInitRbf extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxInitRbf_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxInitRbf_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxInitRbf_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The locktime of the transaction
	 */
	public get_locktime(): number {
		const ret: number = bindings.TxInitRbf_get_locktime(this.ptr);
		return ret;
	}

	/**
	 * The locktime of the transaction
	 */
	public set_locktime(val: number): void {
		bindings.TxInitRbf_set_locktime(this.ptr, val);
	}

	/**
	 * The feerate of the transaction
	 */
	public get_feerate_sat_per_1000_weight(): number {
		const ret: number = bindings.TxInitRbf_get_feerate_sat_per_1000_weight(this.ptr);
		return ret;
	}

	/**
	 * The feerate of the transaction
	 */
	public set_feerate_sat_per_1000_weight(val: number): void {
		bindings.TxInitRbf_set_feerate_sat_per_1000_weight(this.ptr, val);
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public get_funding_output_contribution(): Option_i64Z {
		const ret: bigint = bindings.TxInitRbf_get_funding_output_contribution(this.ptr);
		const ret_hu_conv: Option_i64Z = Option_i64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The number of satoshis the sender will contribute to or, if negative, remove from
	 * (e.g. splice-out) the funding output of the transaction
	 */
	public set_funding_output_contribution(val: Option_i64Z): void {
		bindings.TxInitRbf_set_funding_output_contribution(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxInitRbf given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, locktime_arg: number, feerate_sat_per_1000_weight_arg: number, funding_output_contribution_arg: Option_i64Z): TxInitRbf {
		const ret: bigint = bindings.TxInitRbf_new(CommonBase.get_ptr_of(channel_id_arg), locktime_arg, feerate_sat_per_1000_weight_arg, CommonBase.get_ptr_of(funding_output_contribution_arg));
		const ret_hu_conv: TxInitRbf = new TxInitRbf(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxInitRbf_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxInitRbf
	 */
	public clone(): TxInitRbf {
		const ret: bigint = bindings.TxInitRbf_clone(this.ptr);
		const ret_hu_conv: TxInitRbf = new TxInitRbf(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxInitRbf.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxInitRbf_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxInitRbfs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxInitRbf): boolean {
		const ret: boolean = bindings.TxInitRbf_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxInitRbf object into a byte array which can be read by TxInitRbf_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxInitRbf_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxInitRbf from a byte array, created by TxInitRbf_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxInitRbfDecodeErrorZ {
		const ret: bigint = bindings.TxInitRbf_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxInitRbfDecodeErrorZ = Result_TxInitRbfDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

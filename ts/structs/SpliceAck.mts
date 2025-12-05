
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `splice_ack` message to be received by or sent to the splice initiator.
 */
export class SpliceAck extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SpliceAck_free);
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.SpliceAck_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.SpliceAck_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public get_funding_contribution_satoshis(): bigint {
		const ret: bigint = bindings.SpliceAck_get_funding_contribution_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The amount the splice acceptor is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public set_funding_contribution_satoshis(val: bigint): void {
		bindings.SpliceAck_set_funding_contribution_satoshis(this.ptr, val);
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public get_funding_pubkey(): Uint8Array {
		const ret: number = bindings.SpliceAck_get_funding_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key of the sender (splice acceptor) controlling the new funding transaction
	 */
	public set_funding_pubkey(val: Uint8Array): void {
		bindings.SpliceAck_set_funding_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public get_require_confirmed_inputs(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.SpliceAck_get_require_confirmed_inputs(this.ptr);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice initiator) will be accepted
	 */
	public set_require_confirmed_inputs(val: COption_NoneZ): void {
		bindings.SpliceAck_set_require_confirmed_inputs(this.ptr, val);
	}

	/**
	 * Constructs a new SpliceAck given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, funding_contribution_satoshis_arg: bigint, funding_pubkey_arg: Uint8Array, require_confirmed_inputs_arg: COption_NoneZ): SpliceAck {
		const ret: bigint = bindings.SpliceAck_new(CommonBase.get_ptr_of(channel_id_arg), funding_contribution_satoshis_arg, bindings.encodeUint8Array(funding_pubkey_arg), require_confirmed_inputs_arg);
		const ret_hu_conv: SpliceAck = new SpliceAck(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpliceAck_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceAck
	 */
	public clone(): SpliceAck {
		const ret: bigint = bindings.SpliceAck_clone(this.ptr);
		const ret_hu_conv: SpliceAck = new SpliceAck(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceAcks contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: SpliceAck): boolean {
		const ret: boolean = bindings.SpliceAck_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the SpliceAck object into a byte array which can be read by SpliceAck_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.SpliceAck_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceAck from a byte array, created by SpliceAck_write
	 */
	public static constructor_read(ser: Uint8Array): Result_SpliceAckDecodeErrorZ {
		const ret: bigint = bindings.SpliceAck_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_SpliceAckDecodeErrorZ = Result_SpliceAckDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `splice_init` message to be sent by or received from the stfu initiator (splice initiator).
 */
export class SpliceInit extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SpliceInit_free);
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.SpliceInit_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID where splicing is intended
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.SpliceInit_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public get_funding_contribution_satoshis(): bigint {
		const ret: bigint = bindings.SpliceInit_get_funding_contribution_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The amount the splice initiator is intending to add to its channel balance (splice-in)
	 * or remove from its channel balance (splice-out).
	 */
	public set_funding_contribution_satoshis(val: bigint): void {
		bindings.SpliceInit_set_funding_contribution_satoshis(this.ptr, val);
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public get_funding_feerate_per_kw(): number {
		const ret: number = bindings.SpliceInit_get_funding_feerate_per_kw(this.ptr);
		return ret;
	}

	/**
	 * The feerate for the new funding transaction, set by the splice initiator
	 */
	public set_funding_feerate_per_kw(val: number): void {
		bindings.SpliceInit_set_funding_feerate_per_kw(this.ptr, val);
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public get_locktime(): number {
		const ret: number = bindings.SpliceInit_get_locktime(this.ptr);
		return ret;
	}

	/**
	 * The locktime for the new funding transaction
	 */
	public set_locktime(val: number): void {
		bindings.SpliceInit_set_locktime(this.ptr, val);
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public get_funding_pubkey(): Uint8Array {
		const ret: number = bindings.SpliceInit_get_funding_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The key of the sender (splice initiator) controlling the new funding transaction
	 */
	public set_funding_pubkey(val: Uint8Array): void {
		bindings.SpliceInit_set_funding_pubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public get_require_confirmed_inputs(): COption_NoneZ {
		const ret: COption_NoneZ = bindings.SpliceInit_get_require_confirmed_inputs(this.ptr);
		return ret;
	}

	/**
	 * If set, only confirmed inputs added (by the splice acceptor) will be accepted
	 */
	public set_require_confirmed_inputs(val: COption_NoneZ): void {
		bindings.SpliceInit_set_require_confirmed_inputs(this.ptr, val);
	}

	/**
	 * Constructs a new SpliceInit given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, funding_contribution_satoshis_arg: bigint, funding_feerate_per_kw_arg: number, locktime_arg: number, funding_pubkey_arg: Uint8Array, require_confirmed_inputs_arg: COption_NoneZ): SpliceInit {
		const ret: bigint = bindings.SpliceInit_new(CommonBase.get_ptr_of(channel_id_arg), funding_contribution_satoshis_arg, funding_feerate_per_kw_arg, locktime_arg, bindings.encodeUint8Array(funding_pubkey_arg), require_confirmed_inputs_arg);
		const ret_hu_conv: SpliceInit = new SpliceInit(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpliceInit_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceInit
	 */
	public clone(): SpliceInit {
		const ret: bigint = bindings.SpliceInit_clone(this.ptr);
		const ret_hu_conv: SpliceInit = new SpliceInit(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceInits contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: SpliceInit): boolean {
		const ret: boolean = bindings.SpliceInit_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the SpliceInit object into a byte array which can be read by SpliceInit_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.SpliceInit_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceInit from a byte array, created by SpliceInit_write
	 */
	public static constructor_read(ser: Uint8Array): Result_SpliceInitDecodeErrorZ {
		const ret: bigint = bindings.SpliceInit_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_SpliceInitDecodeErrorZ = Result_SpliceInitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

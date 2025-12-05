
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Exposes details around pending inbound HTLCs.
 */
export class InboundHTLCDetails extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InboundHTLCDetails_free);
	}

	/**
	 * The HTLC ID.
	 * The IDs are incremented by 1 starting from 0 for each offered HTLC.
	 * They are unique per channel and inbound/outbound direction, unless an HTLC was only announced
	 * and not part of any commitment transaction.
	 */
	public get_htlc_id(): bigint {
		const ret: bigint = bindings.InboundHTLCDetails_get_htlc_id(this.ptr);
		return ret;
	}

	/**
	 * The HTLC ID.
	 * The IDs are incremented by 1 starting from 0 for each offered HTLC.
	 * They are unique per channel and inbound/outbound direction, unless an HTLC was only announced
	 * and not part of any commitment transaction.
	 */
	public set_htlc_id(val: bigint): void {
		bindings.InboundHTLCDetails_set_htlc_id(this.ptr, val);
	}

	/**
	 * The amount in msat.
	 */
	public get_amount_msat(): bigint {
		const ret: bigint = bindings.InboundHTLCDetails_get_amount_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount in msat.
	 */
	public set_amount_msat(val: bigint): void {
		bindings.InboundHTLCDetails_set_amount_msat(this.ptr, val);
	}

	/**
	 * The block height at which this HTLC expires.
	 */
	public get_cltv_expiry(): number {
		const ret: number = bindings.InboundHTLCDetails_get_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The block height at which this HTLC expires.
	 */
	public set_cltv_expiry(val: number): void {
		bindings.InboundHTLCDetails_set_cltv_expiry(this.ptr, val);
	}

	/**
	 * The payment hash.
	 */
	public get_payment_hash(): Uint8Array {
		const ret: number = bindings.InboundHTLCDetails_get_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The payment hash.
	 */
	public set_payment_hash(val: Uint8Array): void {
		bindings.InboundHTLCDetails_set_payment_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The state of the HTLC in the state machine.
	 * 
	 * Determines on which commitment transactions the HTLC is included and what message the HTLC is
	 * waiting for to advance to the next state.
	 * 
	 * See [`InboundHTLCStateDetails`] for information on the specific states.
	 * 
	 * LDK will always fill this field in, but when downgrading to prior versions of LDK, new
	 * states may result in `None` here.
	 */
	public get_state(): Option_InboundHTLCStateDetailsZ {
		const ret: bigint = bindings.InboundHTLCDetails_get_state(this.ptr);
		const ret_hu_conv: Option_InboundHTLCStateDetailsZ = Option_InboundHTLCStateDetailsZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The state of the HTLC in the state machine.
	 * 
	 * Determines on which commitment transactions the HTLC is included and what message the HTLC is
	 * waiting for to advance to the next state.
	 * 
	 * See [`InboundHTLCStateDetails`] for information on the specific states.
	 * 
	 * LDK will always fill this field in, but when downgrading to prior versions of LDK, new
	 * states may result in `None` here.
	 */
	public set_state(val: Option_InboundHTLCStateDetailsZ): void {
		bindings.InboundHTLCDetails_set_state(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Whether the HTLC has an output below the local dust limit. If so, the output will be trimmed
	 * from the local commitment transaction and added to the commitment transaction fee.
	 * For non-anchor channels, this takes into account the cost of the second-stage HTLC
	 * transactions as well.
	 * 
	 * When the local commitment transaction is broadcasted as part of a unilateral closure,
	 * the value of this HTLC will therefore not be claimable but instead burned as a transaction
	 * fee.
	 * 
	 * Note that dust limits are specific to each party. An HTLC can be dust for the local
	 * commitment transaction but not for the counterparty's commitment transaction and vice versa.
	 */
	public get_is_dust(): boolean {
		const ret: boolean = bindings.InboundHTLCDetails_get_is_dust(this.ptr);
		return ret;
	}

	/**
	 * Whether the HTLC has an output below the local dust limit. If so, the output will be trimmed
	 * from the local commitment transaction and added to the commitment transaction fee.
	 * For non-anchor channels, this takes into account the cost of the second-stage HTLC
	 * transactions as well.
	 * 
	 * When the local commitment transaction is broadcasted as part of a unilateral closure,
	 * the value of this HTLC will therefore not be claimable but instead burned as a transaction
	 * fee.
	 * 
	 * Note that dust limits are specific to each party. An HTLC can be dust for the local
	 * commitment transaction but not for the counterparty's commitment transaction and vice versa.
	 */
	public set_is_dust(val: boolean): void {
		bindings.InboundHTLCDetails_set_is_dust(this.ptr, val);
	}

	/**
	 * Constructs a new InboundHTLCDetails given each field
	 */
	public static constructor_new(htlc_id_arg: bigint, amount_msat_arg: bigint, cltv_expiry_arg: number, payment_hash_arg: Uint8Array, state_arg: Option_InboundHTLCStateDetailsZ, is_dust_arg: boolean): InboundHTLCDetails {
		const ret: bigint = bindings.InboundHTLCDetails_new(htlc_id_arg, amount_msat_arg, cltv_expiry_arg, bindings.encodeUint8Array(payment_hash_arg), CommonBase.get_ptr_of(state_arg), is_dust_arg);
		const ret_hu_conv: InboundHTLCDetails = new InboundHTLCDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.InboundHTLCDetails_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the InboundHTLCDetails
	 */
	public clone(): InboundHTLCDetails {
		const ret: bigint = bindings.InboundHTLCDetails_clone(this.ptr);
		const ret_hu_conv: InboundHTLCDetails = new InboundHTLCDetails(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the InboundHTLCDetails object into a byte array which can be read by InboundHTLCDetails_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.InboundHTLCDetails_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a InboundHTLCDetails from a byte array, created by InboundHTLCDetails_write
	 */
	public static constructor_read(ser: Uint8Array): Result_InboundHTLCDetailsDecodeErrorZ {
		const ret: bigint = bindings.InboundHTLCDetails_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_InboundHTLCDetailsDecodeErrorZ = Result_InboundHTLCDetailsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

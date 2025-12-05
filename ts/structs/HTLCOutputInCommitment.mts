
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information about an HTLC as it appears in a commitment transaction
 */
export class HTLCOutputInCommitment extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HTLCOutputInCommitment_free);
	}

	/**
	 * Whether the HTLC was \"offered\" (ie outbound in relation to this commitment transaction).
	 * Note that this is not the same as whether it is ountbound *from us*. To determine that you
	 * need to compare this value to whether the commitment transaction in question is that of
	 * the counterparty or our own.
	 */
	public get_offered(): boolean {
		const ret: boolean = bindings.HTLCOutputInCommitment_get_offered(this.ptr);
		return ret;
	}

	/**
	 * Whether the HTLC was \"offered\" (ie outbound in relation to this commitment transaction).
	 * Note that this is not the same as whether it is ountbound *from us*. To determine that you
	 * need to compare this value to whether the commitment transaction in question is that of
	 * the counterparty or our own.
	 */
	public set_offered(val: boolean): void {
		bindings.HTLCOutputInCommitment_set_offered(this.ptr, val);
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public get_amount_msat(): bigint {
		const ret: bigint = bindings.HTLCOutputInCommitment_get_amount_msat(this.ptr);
		return ret;
	}

	/**
	 * The value, in msat, of the HTLC. The value as it appears in the commitment transaction is
	 * this divided by 1000.
	 */
	public set_amount_msat(val: bigint): void {
		bindings.HTLCOutputInCommitment_set_amount_msat(this.ptr, val);
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public get_cltv_expiry(): number {
		const ret: number = bindings.HTLCOutputInCommitment_get_cltv_expiry(this.ptr);
		return ret;
	}

	/**
	 * The CLTV lock-time at which this HTLC expires.
	 */
	public set_cltv_expiry(val: number): void {
		bindings.HTLCOutputInCommitment_set_cltv_expiry(this.ptr, val);
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public get_payment_hash(): Uint8Array {
		const ret: number = bindings.HTLCOutputInCommitment_get_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The hash of the preimage which unlocks this HTLC.
	 */
	public set_payment_hash(val: Uint8Array): void {
		bindings.HTLCOutputInCommitment_set_payment_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The position within the commitment transactions' outputs. This may be None if the value is
	 * below the dust limit (in which case no output appears in the commitment transaction and the
	 * value is spent to additional transaction fees).
	 */
	public get_transaction_output_index(): Option_u32Z {
		const ret: bigint = bindings.HTLCOutputInCommitment_get_transaction_output_index(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The position within the commitment transactions' outputs. This may be None if the value is
	 * below the dust limit (in which case no output appears in the commitment transaction and the
	 * value is spent to additional transaction fees).
	 */
	public set_transaction_output_index(val: Option_u32Z): void {
		bindings.HTLCOutputInCommitment_set_transaction_output_index(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new HTLCOutputInCommitment given each field
	 */
	public static constructor_new(offered_arg: boolean, amount_msat_arg: bigint, cltv_expiry_arg: number, payment_hash_arg: Uint8Array, transaction_output_index_arg: Option_u32Z): HTLCOutputInCommitment {
		const ret: bigint = bindings.HTLCOutputInCommitment_new(offered_arg, amount_msat_arg, cltv_expiry_arg, bindings.encodeUint8Array(payment_hash_arg), CommonBase.get_ptr_of(transaction_output_index_arg));
		const ret_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HTLCOutputInCommitment_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCOutputInCommitment
	 */
	public clone(): HTLCOutputInCommitment {
		const ret: bigint = bindings.HTLCOutputInCommitment_clone(this.ptr);
		const ret_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCOutputInCommitments contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HTLCOutputInCommitment): boolean {
		const ret: boolean = bindings.HTLCOutputInCommitment_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Converts HTLC's value with millisatoshi precision into [bitcoin::Amount] with satoshi precision.
	 * Typically this conversion is needed when transitioning from LN into base-layer Bitcoin,
	 * e. g. in commitment transactions.
	 */
	public to_bitcoin_amount(): bigint {
		const ret: bigint = bindings.HTLCOutputInCommitment_to_bitcoin_amount(this.ptr);
		return ret;
	}

	/**
	 * Serialize the HTLCOutputInCommitment object into a byte array which can be read by HTLCOutputInCommitment_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HTLCOutputInCommitment_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCOutputInCommitment from a byte array, created by HTLCOutputInCommitment_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HTLCOutputInCommitmentDecodeErrorZ {
		const ret: bigint = bindings.HTLCOutputInCommitment_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HTLCOutputInCommitmentDecodeErrorZ = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

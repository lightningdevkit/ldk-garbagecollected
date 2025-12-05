
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents an syntactically correct [`Bolt11Invoice`] for a payment on the lightning network,
 * but without the signature information.
 * Decoding and encoding should not lead to information loss but may lead to different hashes.
 * 
 * For methods without docs see the corresponding methods in [`Bolt11Invoice`].
 */
export class RawBolt11Invoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RawBolt11Invoice_free);
	}

	/**
	 * data part
	 */
	public get_data(): RawDataPart {
		const ret: bigint = bindings.RawBolt11Invoice_get_data(this.ptr);
		const ret_hu_conv: RawDataPart = new RawDataPart(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * data part
	 */
	public set_data(val: RawDataPart): void {
		bindings.RawBolt11Invoice_set_data(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Checks if two RawBolt11Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RawBolt11Invoice): boolean {
		const ret: boolean = bindings.RawBolt11Invoice_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RawBolt11Invoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RawBolt11Invoice
	 */
	public clone(): RawBolt11Invoice {
		const ret: bigint = bindings.RawBolt11Invoice_clone(this.ptr);
		const ret_hu_conv: RawBolt11Invoice = new RawBolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RawBolt11Invoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RawBolt11Invoice_hash(this.ptr);
		return ret;
	}

	/**
	 * Calculate the hash of the encoded `RawBolt11Invoice` which should be signed.
	 */
	public signable_hash(): Uint8Array {
		const ret: number = bindings.RawBolt11Invoice_signable_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payment_hash(): Sha256 {
		const ret: bigint = bindings.RawBolt11Invoice_payment_hash(this.ptr);
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public description(): Description {
		const ret: bigint = bindings.RawBolt11Invoice_description(this.ptr);
		const ret_hu_conv: Description = new Description(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payee_pub_key(): PayeePubKey {
		const ret: bigint = bindings.RawBolt11Invoice_payee_pub_key(this.ptr);
		const ret_hu_conv: PayeePubKey = new PayeePubKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public description_hash(): Sha256 {
		const ret: bigint = bindings.RawBolt11Invoice_description_hash(this.ptr);
		const ret_hu_conv: Sha256 = new Sha256(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public expiry_time(): ExpiryTime {
		const ret: bigint = bindings.RawBolt11Invoice_expiry_time(this.ptr);
		const ret_hu_conv: ExpiryTime = new ExpiryTime(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public min_final_cltv_expiry_delta(): MinFinalCltvExpiryDelta {
		const ret: bigint = bindings.RawBolt11Invoice_min_final_cltv_expiry_delta(this.ptr);
		const ret_hu_conv: MinFinalCltvExpiryDelta = new MinFinalCltvExpiryDelta(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public payment_secret(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.RawBolt11Invoice_payment_secret(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public payment_metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.RawBolt11Invoice_payment_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public features(): Bolt11InvoiceFeatures {
		const ret: bigint = bindings.RawBolt11Invoice_features(this.ptr);
		const ret_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public private_routes(): PrivateRoute[] {
		const ret: number = bindings.RawBolt11Invoice_private_routes(this.ptr);
		const ret_conv_14_len: number = bindings.getArrayLength(ret);
		const ret_conv_14_arr: PrivateRoute[] = new Array(ret_conv_14_len).fill(null);
		for (var o = 0; o < ret_conv_14_len; o++) {
			const ret_conv_14: bigint = bindings.getU64ArrayElem(ret, o);
			const ret_conv_14_hu_conv: PrivateRoute = new PrivateRoute(null, ret_conv_14);
			CommonBase.add_ref_from(ret_conv_14_hu_conv, this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_14_arr;
	}

	/**
	 * Returns `None` if no amount is set or on overflow.
	 */
	public amount_pico_btc(): Option_u64Z {
		const ret: bigint = bindings.RawBolt11Invoice_amount_pico_btc(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public currency(): Currency {
		const ret: Currency = bindings.RawBolt11Invoice_currency(this.ptr);
		return ret;
	}

}

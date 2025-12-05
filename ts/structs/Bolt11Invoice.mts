
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Represents a syntactically and semantically correct lightning BOLT11 invoice.
 * 
 * There are three ways to construct a `Bolt11Invoice`:
 * 1. using [`InvoiceBuilder`]
 * 2. using [`Bolt11Invoice::from_signed`]
 * 3. using `str::parse::<Bolt11Invoice>(&str)` (see [`Bolt11Invoice::from_str`])
 * 
 * [`Bolt11Invoice::from_str`]: crate::Bolt11Invoice#impl-FromStr
 */
export class Bolt11Invoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt11Invoice_free);
	}

	/**
	 * Checks if two Bolt11Invoices contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Bolt11Invoice): boolean {
		const ret: boolean = bindings.Bolt11Invoice_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11Invoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11Invoice
	 */
	public clone(): Bolt11Invoice {
		const ret: bigint = bindings.Bolt11Invoice_clone(this.ptr);
		const ret_hu_conv: Bolt11Invoice = new Bolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11Invoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Bolt11Invoice_hash(this.ptr);
		return ret;
	}

	/**
	 * The hash of the [`RawBolt11Invoice`] that was signed.
	 */
	public signable_hash(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_signable_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Transform the `Bolt11Invoice` into its unchecked version.
	 */
	public into_signed_raw(): SignedRawBolt11Invoice {
		const ret: bigint = bindings.Bolt11Invoice_into_signed_raw(this.ptr);
		const ret_hu_conv: SignedRawBolt11Invoice = new SignedRawBolt11Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Check that the invoice is signed correctly
	 */
	public check_signature(): Result_NoneBolt11SemanticErrorZ {
		const ret: bigint = bindings.Bolt11Invoice_check_signature(this.ptr);
		const ret_hu_conv: Result_NoneBolt11SemanticErrorZ = Result_NoneBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a `Bolt11Invoice` from a [`SignedRawBolt11Invoice`] by checking all its invariants.
	 * ```
	 * use lightning_invoice::*;
	 * 
	 * let invoice = \"lnbc100p1psj9jhxdqud3jxktt5w46x7unfv9kz6mn0v3jsnp4q0d3p2sfluzdx45tqcs\\
	 * h2pu5qc7lgq0xs578ngs6s0s68ua4h7cvspp5q6rmq35js88zp5dvwrv9m459tnk2zunwj5jalqtyxqulh0l\\
	 * 5gflssp5nf55ny5gcrfl30xuhzj3nphgj27rstekmr9fw3ny5989s300gyus9qyysgqcqpcrzjqw2sxwe993\\
	 * h5pcm4dxzpvttgza8zhkqxpgffcrf5v25nwpr3cmfg7z54kuqq8rgqqqqqqqq2qqqqq9qq9qrzjqd0ylaqcl\\
	 * j9424x9m8h2vcukcgnm6s56xfgu3j78zyqzhgs4hlpzvznlugqq9vsqqqqqqqlgqqqqqeqq9qrzjqwldmj9d\\
	 * ha74df76zhx6l9we0vjdquygcdt3kssupehe64g6yyp5yz5rhuqqwccqqyqqqqlgqqqqjcqq9qrzjqf9e58a\\
	 * guqr0rcun0ajlvmzq3ek63cw2w282gv3z5uupmuwvgjtq2z55qsqqg6qqqyqqqrtnqqqzq3cqygrzjqvphms\\
	 * ywntrrhqjcraumvc4y6r8v4z5v593trte429v4hredj7ms5z52usqq9ngqqqqqqqlgqqqqqqgq9qrzjq2v0v\\
	 * p62g49p7569ev48cmulecsxe59lvaw3wlxm7r982zxa9zzj7z5l0cqqxusqqyqqqqlgqqqqqzsqygarl9fh3\\
	 * 8s0gyuxjjgux34w75dnc6xp2l35j7es3jd4ugt3lu0xzre26yg5m7ke54n2d5sym4xcmxtl8238xxvw5h5h5\\
	 * j5r6drg6k6zcqj0fcwg\";
	 * 
	 * let signed = invoice.parse::<SignedRawBolt11Invoice>().unwrap();
	 * 
	 * assert!(Bolt11Invoice::from_signed(signed).is_ok());
	 * ```
	 */
	public static constructor_from_signed(signed_invoice: SignedRawBolt11Invoice): Result_Bolt11InvoiceBolt11SemanticErrorZ {
		const ret: bigint = bindings.Bolt11Invoice_from_signed(CommonBase.get_ptr_of(signed_invoice));
		const ret_hu_conv: Result_Bolt11InvoiceBolt11SemanticErrorZ = Result_Bolt11InvoiceBolt11SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the `Bolt11Invoice`'s timestamp as a duration since the Unix epoch
	 */
	public duration_since_epoch(): bigint {
		const ret: bigint = bindings.Bolt11Invoice_duration_since_epoch(this.ptr);
		return ret;
	}

	/**
	 * Returns the hash to which we will receive the preimage on completion of the payment
	 */
	public payment_hash(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the payee's public key if one was included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payee_pub_key(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_payee_pub_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the payment secret if one was included in the invoice
	 */
	public payment_secret(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_payment_secret(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the payment metadata blob if one was included in the invoice
	 */
	public payment_metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.Bolt11Invoice_payment_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get the invoice features if they were included in the invoice
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public features(): Bolt11InvoiceFeatures {
		const ret: bigint = bindings.Bolt11Invoice_features(this.ptr);
		const ret_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Recover the payee's public key (only to be used if none was included in the invoice)
	 */
	public recover_payee_pub_key(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_recover_payee_pub_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Recover the payee's public key if one was included in the invoice, otherwise return the
	 * recovered public key from the signature
	 */
	public get_payee_pub_key(): Uint8Array {
		const ret: number = bindings.Bolt11Invoice_get_payee_pub_key(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the Duration since the Unix epoch at which the invoice expires.
	 * Returning None if overflow occurred.
	 */
	public expires_at(): Option_u64Z {
		const ret: bigint = bindings.Bolt11Invoice_expires_at(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the invoice's expiry time, if present, otherwise [`DEFAULT_EXPIRY_TIME`].
	 */
	public expiry_time(): bigint {
		const ret: bigint = bindings.Bolt11Invoice_expiry_time(this.ptr);
		return ret;
	}

	/**
	 * Returns the Duration remaining until the invoice expires given the current time.
	 * `time` is the timestamp as a duration since the Unix epoch.
	 */
	public expiration_remaining_from_epoch(time: bigint): bigint {
		const ret: bigint = bindings.Bolt11Invoice_expiration_remaining_from_epoch(this.ptr, time);
		return ret;
	}

	/**
	 * Returns whether the expiry time would pass at the given point in time.
	 * `at_time` is the timestamp as a duration since the Unix epoch.
	 */
	public would_expire(at_time: bigint): boolean {
		const ret: boolean = bindings.Bolt11Invoice_would_expire(this.ptr, at_time);
		return ret;
	}

	/**
	 * Returns the invoice's `min_final_cltv_expiry_delta` time, if present, otherwise
	 * [`DEFAULT_MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 */
	public min_final_cltv_expiry_delta(): bigint {
		const ret: bigint = bindings.Bolt11Invoice_min_final_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * Returns a list of all fallback addresses as [`Address`]es
	 */
	public fallback_addresses(): Address[] {
		const ret: number = bindings.Bolt11Invoice_fallback_addresses(this.ptr);
		const ret_conv_9_len: number = bindings.getArrayLength(ret);
		const ret_conv_9_arr: Address[] = new Array(ret_conv_9_len).fill(null);
		for (var j = 0; j < ret_conv_9_len; j++) {
			const ret_conv_9: bigint = bindings.getU64ArrayElem(ret, j);
			const ret_conv_9_conv: Address = new Address(null, ret_conv_9);
			ret_conv_9_arr[j] = ret_conv_9_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_9_arr;
	}

	/**
	 * Returns the first fallback address as an [`Address`].
	 * 
	 * See [`Self::fallback_addresses`] to fetch all addresses of known type.
	 */
	public first_fallback_address(): Option_AddressZ {
		const ret: bigint = bindings.Bolt11Invoice_first_fallback_address(this.ptr);
		const ret_hu_conv: Option_AddressZ = Option_AddressZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns a list of all routes included in the invoice
	 */
	public private_routes(): PrivateRoute[] {
		const ret: number = bindings.Bolt11Invoice_private_routes(this.ptr);
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
	 * Returns a list of all routes included in the invoice as the underlying hints
	 */
	public route_hints(): RouteHint[] {
		const ret: number = bindings.Bolt11Invoice_route_hints(this.ptr);
		const ret_conv_11_len: number = bindings.getArrayLength(ret);
		const ret_conv_11_arr: RouteHint[] = new Array(ret_conv_11_len).fill(null);
		for (var l = 0; l < ret_conv_11_len; l++) {
			const ret_conv_11: bigint = bindings.getU64ArrayElem(ret, l);
			const ret_conv_11_hu_conv: RouteHint = new RouteHint(null, ret_conv_11);
			CommonBase.add_ref_from(ret_conv_11_hu_conv, this);
			ret_conv_11_arr[l] = ret_conv_11_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_11_arr;
	}

	/**
	 * Returns the currency for which the invoice was issued
	 */
	public currency(): Currency {
		const ret: Currency = bindings.Bolt11Invoice_currency(this.ptr);
		return ret;
	}

	/**
	 * Returns the amount if specified in the invoice as millisatoshis.
	 */
	public amount_milli_satoshis(): Option_u64Z {
		const ret: bigint = bindings.Bolt11Invoice_amount_milli_satoshis(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Read a Bolt11Invoice object from a string
	 */
	public static constructor_from_str(s: string): Result_Bolt11InvoiceParseOrSemanticErrorZ {
		const ret: bigint = bindings.Bolt11Invoice_from_str(bindings.encodeString(s));
		const ret_hu_conv: Result_Bolt11InvoiceParseOrSemanticErrorZ = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Bolt11Invoice object
	 */
	public to_str(): string {
		const ret: number = bindings.Bolt11Invoice_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}

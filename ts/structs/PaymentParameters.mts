
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information used to route a payment.
 */
export class PaymentParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.PaymentParameters_free);
	}

	/**
	 * Information about the payee, such as their features and route hints for their channels.
	 */
	public get_payee(): Payee {
		const ret: bigint = bindings.PaymentParameters_get_payee(this.ptr);
		const ret_hu_conv: Payee = Payee.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Information about the payee, such as their features and route hints for their channels.
	 */
	public set_payee(val: Payee): void {
		bindings.PaymentParameters_set_payee(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Expiration of a payment to the payee, in seconds relative to the UNIX epoch.
	 */
	public get_expiry_time(): Option_u64Z {
		const ret: bigint = bindings.PaymentParameters_get_expiry_time(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Expiration of a payment to the payee, in seconds relative to the UNIX epoch.
	 */
	public set_expiry_time(val: Option_u64Z): void {
		bindings.PaymentParameters_set_expiry_time(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public get_max_total_cltv_expiry_delta(): number {
		const ret: number = bindings.PaymentParameters_get_max_total_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * The maximum total CLTV delta we accept for the route.
	 * Defaults to [`DEFAULT_MAX_TOTAL_CLTV_EXPIRY_DELTA`].
	 */
	public set_max_total_cltv_expiry_delta(val: number): void {
		bindings.PaymentParameters_set_max_total_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public get_max_path_count(): number {
		const ret: number = bindings.PaymentParameters_get_max_path_count(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of paths that may be used by (MPP) payments.
	 * Defaults to [`DEFAULT_MAX_PATH_COUNT`].
	 */
	public set_max_path_count(val: number): void {
		bindings.PaymentParameters_set_max_path_count(this.ptr, val);
	}

	/**
	 * The maximum number of [`Path::hops`] in any returned path.
	 * Defaults to [`MAX_PATH_LENGTH_ESTIMATE`].
	 */
	public get_max_path_length(): number {
		const ret: number = bindings.PaymentParameters_get_max_path_length(this.ptr);
		return ret;
	}

	/**
	 * The maximum number of [`Path::hops`] in any returned path.
	 * Defaults to [`MAX_PATH_LENGTH_ESTIMATE`].
	 */
	public set_max_path_length(val: number): void {
		bindings.PaymentParameters_set_max_path_length(this.ptr, val);
	}

	/**
	 * Selects the maximum share of a channel's total capacity which will be sent over a channel,
	 * as a power of 1/2. A higher value prefers to send the payment using more MPP parts whereas
	 * a lower value prefers to send larger MPP parts, potentially saturating channels and
	 * increasing failure probability for those paths.
	 * 
	 * Note that this restriction will be relaxed during pathfinding after paths which meet this
	 * restriction have been found. While paths which meet this criteria will be searched for, it
	 * is ultimately up to the scorer to select them over other paths.
	 * 
	 * A value of 0 will allow payments up to and including a channel's total announced usable
	 * capacity, a value of one will only use up to half its capacity, two 1/4, etc.
	 * 
	 * Default value: 2
	 */
	public get_max_channel_saturation_power_of_half(): number {
		const ret: number = bindings.PaymentParameters_get_max_channel_saturation_power_of_half(this.ptr);
		return ret;
	}

	/**
	 * Selects the maximum share of a channel's total capacity which will be sent over a channel,
	 * as a power of 1/2. A higher value prefers to send the payment using more MPP parts whereas
	 * a lower value prefers to send larger MPP parts, potentially saturating channels and
	 * increasing failure probability for those paths.
	 * 
	 * Note that this restriction will be relaxed during pathfinding after paths which meet this
	 * restriction have been found. While paths which meet this criteria will be searched for, it
	 * is ultimately up to the scorer to select them over other paths.
	 * 
	 * A value of 0 will allow payments up to and including a channel's total announced usable
	 * capacity, a value of one will only use up to half its capacity, two 1/4, etc.
	 * 
	 * Default value: 2
	 */
	public set_max_channel_saturation_power_of_half(val: number): void {
		bindings.PaymentParameters_set_max_channel_saturation_power_of_half(this.ptr, val);
	}

	/**
	 * A list of SCIDs which this payment was previously attempted over and which caused the
	 * payment to fail. Future attempts for the same payment shouldn't be relayed through any of
	 * these SCIDs.
	 * 
	 * Returns a copy of the field.
	 */
	public get_previously_failed_channels(): BigUint64Array {
		const ret: number = bindings.PaymentParameters_get_previously_failed_channels(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * A list of SCIDs which this payment was previously attempted over and which caused the
	 * payment to fail. Future attempts for the same payment shouldn't be relayed through any of
	 * these SCIDs.
	 */
	public set_previously_failed_channels(val: BigUint64Array): void {
		bindings.PaymentParameters_set_previously_failed_channels(this.ptr, bindings.encodeUint64Array(val));
	}

	/**
	 * A list of indices corresponding to blinded paths in [`Payee::Blinded::route_hints`] which this
	 * payment was previously attempted over and which caused the payment to fail. Future attempts
	 * for the same payment shouldn't be relayed through any of these blinded paths.
	 * 
	 * Returns a copy of the field.
	 */
	public get_previously_failed_blinded_path_idxs(): BigUint64Array {
		const ret: number = bindings.PaymentParameters_get_previously_failed_blinded_path_idxs(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * A list of indices corresponding to blinded paths in [`Payee::Blinded::route_hints`] which this
	 * payment was previously attempted over and which caused the payment to fail. Future attempts
	 * for the same payment shouldn't be relayed through any of these blinded paths.
	 */
	public set_previously_failed_blinded_path_idxs(val: BigUint64Array): void {
		bindings.PaymentParameters_set_previously_failed_blinded_path_idxs(this.ptr, bindings.encodeUint64Array(val));
	}

	/**
	 * Constructs a new PaymentParameters given each field
	 */
	public static constructor_new(payee_arg: Payee, expiry_time_arg: Option_u64Z, max_total_cltv_expiry_delta_arg: number, max_path_count_arg: number, max_path_length_arg: number, max_channel_saturation_power_of_half_arg: number, previously_failed_channels_arg: BigUint64Array, previously_failed_blinded_path_idxs_arg: BigUint64Array): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_new(CommonBase.get_ptr_of(payee_arg), CommonBase.get_ptr_of(expiry_time_arg), max_total_cltv_expiry_delta_arg, max_path_count_arg, max_path_length_arg, max_channel_saturation_power_of_half_arg, bindings.encodeUint64Array(previously_failed_channels_arg), bindings.encodeUint64Array(previously_failed_blinded_path_idxs_arg));
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentParameters
	 */
	public clone(): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_clone(this.ptr);
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the PaymentParameters.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.PaymentParameters_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two PaymentParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: PaymentParameters): boolean {
		const ret: boolean = bindings.PaymentParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the PaymentParameters object into a byte array which can be read by PaymentParameters_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaymentParameters_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentParameters from a byte array, created by PaymentParameters_write
	 */
	public static constructor_read(ser: Uint8Array, arg: number): Result_PaymentParametersDecodeErrorZ {
		const ret: bigint = bindings.PaymentParameters_read(bindings.encodeUint8Array(ser), arg);
		const ret_hu_conv: Result_PaymentParametersDecodeErrorZ = Result_PaymentParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey`.
	 * 
	 * The `final_cltv_expiry_delta` should match the expected final CLTV delta the recipient has
	 * provided.
	 */
	public static constructor_from_node_id(payee_pubkey: Uint8Array, final_cltv_expiry_delta: number): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_from_node_id(bindings.encodeUint8Array(payee_pubkey), final_cltv_expiry_delta);
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a payee with the node id of the given `pubkey` to use for keysend payments.
	 * 
	 * The `final_cltv_expiry_delta` should match the expected final CLTV delta the recipient has
	 * provided.
	 * 
	 * Note that MPP keysend is not widely supported yet. The `allow_mpp` lets you choose
	 * whether your router will be allowed to find a multi-part route for this payment. If you
	 * set `allow_mpp` to true, you should ensure a payment secret is set on send, likely via
	 * [`RecipientOnionFields::secret_only`].
	 * 
	 * [`RecipientOnionFields::secret_only`]: crate::ln::channelmanager::RecipientOnionFields::secret_only
	 */
	public static constructor_for_keysend(payee_pubkey: Uint8Array, final_cltv_expiry_delta: number, allow_mpp: boolean): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_for_keysend(bindings.encodeUint8Array(payee_pubkey), final_cltv_expiry_delta, allow_mpp);
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates parameters for paying to a blinded payee from the provided invoice. Sets
	 * [`Payee::Blinded::route_hints`], [`Payee::Blinded::features`], and
	 * [`PaymentParameters::expiry_time`].
	 */
	public static constructor_from_bolt11_invoice(invoice: Bolt11Invoice): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_from_bolt11_invoice(CommonBase.get_ptr_of(invoice));
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates parameters for paying to a blinded payee from the provided invoice. Sets
	 * [`Payee::Blinded::route_hints`], [`Payee::Blinded::features`], and
	 * [`PaymentParameters::expiry_time`].
	 */
	public static constructor_from_bolt12_invoice(invoice: Bolt12Invoice): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_from_bolt12_invoice(CommonBase.get_ptr_of(invoice));
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates parameters for paying to a blinded payee from the provided invoice. Sets
	 * [`Payee::Blinded::route_hints`], [`Payee::Blinded::features`], and
	 * [`PaymentParameters::expiry_time`].
	 */
	public static constructor_from_static_invoice(invoice: StaticInvoice): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_from_static_invoice(CommonBase.get_ptr_of(invoice));
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates parameters for paying to a blinded payee from the provided blinded route hints.
	 */
	public static constructor_blinded(blinded_route_hints: BlindedPaymentPath[]): PaymentParameters {
		const ret: bigint = bindings.PaymentParameters_blinded(bindings.encodeUint64Array(blinded_route_hints.map(blinded_route_hints_conv_20 => CommonBase.get_ptr_of(blinded_route_hints_conv_20))));
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

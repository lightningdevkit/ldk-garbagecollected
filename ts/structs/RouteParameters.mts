
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Parameters needed to find a [`Route`].
 * 
 * Passed to [`find_route`] and [`build_route_from_hops`].
 */
export class RouteParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RouteParameters_free);
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public get_payment_params(): PaymentParameters {
		const ret: bigint = bindings.RouteParameters_get_payment_params(this.ptr);
		const ret_hu_conv: PaymentParameters = new PaymentParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The parameters of the failed payment path.
	 */
	public set_payment_params(val: PaymentParameters): void {
		bindings.RouteParameters_set_payment_params(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public get_final_value_msat(): bigint {
		const ret: bigint = bindings.RouteParameters_get_final_value_msat(this.ptr);
		return ret;
	}

	/**
	 * The amount in msats sent on the failed payment path.
	 */
	public set_final_value_msat(val: bigint): void {
		bindings.RouteParameters_set_final_value_msat(this.ptr, val);
	}

	/**
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 */
	public get_max_total_routing_fee_msat(): Option_u64Z {
		const ret: bigint = bindings.RouteParameters_get_max_total_routing_fee_msat(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The maximum total fees, in millisatoshi, that may accrue during route finding.
	 * 
	 * This limit also applies to the total fees that may arise while retrying failed payment
	 * paths.
	 * 
	 * Note that values below a few sats may result in some paths being spuriously ignored.
	 */
	public set_max_total_routing_fee_msat(val: Option_u64Z): void {
		bindings.RouteParameters_set_max_total_routing_fee_msat(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new RouteParameters given each field
	 */
	public static constructor_new(payment_params_arg: PaymentParameters, final_value_msat_arg: bigint, max_total_routing_fee_msat_arg: Option_u64Z): RouteParameters {
		const ret: bigint = bindings.RouteParameters_new(CommonBase.get_ptr_of(payment_params_arg), final_value_msat_arg, CommonBase.get_ptr_of(max_total_routing_fee_msat_arg));
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RouteParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RouteParameters
	 */
	public clone(): RouteParameters {
		const ret: bigint = bindings.RouteParameters_clone(this.ptr);
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RouteParameters.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RouteParameters_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two RouteParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RouteParameters): boolean {
		const ret: boolean = bindings.RouteParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Constructs [`RouteParameters`] from the given [`PaymentParameters`] and a payment amount.
	 * 
	 * [`Self::max_total_routing_fee_msat`] defaults to 1% of the payment amount + 50 sats
	 */
	public static constructor_from_payment_params_and_value(payment_params: PaymentParameters, final_value_msat: bigint): RouteParameters {
		const ret: bigint = bindings.RouteParameters_from_payment_params_and_value(CommonBase.get_ptr_of(payment_params), final_value_msat);
		const ret_hu_conv: RouteParameters = new RouteParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Sets the maximum number of hops that can be included in a payment path, based on the provided
	 * [`RecipientOnionFields`] and blinded paths.
	 */
	public set_max_path_length(recipient_onion: RecipientOnionFields, is_keysend: boolean, best_block_height: number): Result_NoneNoneZ {
		const ret: bigint = bindings.RouteParameters_set_max_path_length(this.ptr, CommonBase.get_ptr_of(recipient_onion), is_keysend, best_block_height);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the RouteParameters object into a byte array which can be read by RouteParameters_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RouteParameters_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteParameters from a byte array, created by RouteParameters_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteParametersDecodeErrorZ {
		const ret: bigint = bindings.RouteParameters_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteParametersDecodeErrorZ = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

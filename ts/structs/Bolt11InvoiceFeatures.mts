
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Features used within an invoice.
 */
export class Bolt11InvoiceFeatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt11InvoiceFeatures_free);
	}

	/**
	 * Serialize the Bolt11InvoiceFeatures object into a byte array which can be read by Bolt11InvoiceFeatures_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Bolt11InvoiceFeatures_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt11InvoiceFeatures from a byte array, created by Bolt11InvoiceFeatures_write
	 */
	public static constructor_read(ser: Uint8Array): Result_Bolt11InvoiceFeaturesDecodeErrorZ {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_Bolt11InvoiceFeaturesDecodeErrorZ = Result_Bolt11InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11InvoiceFeatures
	 */
	public clone(): Bolt11InvoiceFeatures {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_clone(this.ptr);
		const ret_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt11InvoiceFeatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Getting a route for a keysend payment to a private node requires providing the payee's
	 * features (since they were not announced in a node announcement). However, keysend payments
	 * don't have an invoice to pull the payee's features from, so this method is provided for use
	 * when a [`Bolt11InvoiceFeatures`] is required in a route.
	 * 
	 * MPP keysend is not widely supported yet, so we parameterize support to allow the user to
	 * choose whether their router should find multi-part routes.
	 */
	public static constructor_for_keysend(allow_mpp: boolean): Bolt11InvoiceFeatures {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_for_keysend(allow_mpp);
		const ret_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create a blank Features with no features set
	 */
	public static constructor_empty(): Bolt11InvoiceFeatures {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_empty();
		const ret_hu_conv: Bolt11InvoiceFeatures = new Bolt11InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Returns the feature set as a list of bytes, in little-endian. This is in reverse byte order
	 * from most on-the-wire encodings.
	 */
	public le_flags(): Uint8Array {
		const ret: number = bindings.Bolt11InvoiceFeatures_le_flags(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` has any optional flags set
	 */
	public supports_any_optional_bits(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_any_optional_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` object contains required features unknown by `other`.
	 */
	public requires_unknown_bits_from(other: Bolt11InvoiceFeatures): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		return ret;
	}

	/**
	 * Returns the set of required features unknown by `other`, as their bit position.
	 */
	public required_unknown_bits_from(other: Bolt11InvoiceFeatures): BigUint64Array {
		const ret: number = bindings.Bolt11InvoiceFeatures_required_unknown_bits_from(this.ptr, CommonBase.get_ptr_of(other));
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	/**
	 * Returns true if this `Features` object contains unknown feature flags which are set as
	 * \"required\".
	 */
	public requires_unknown_bits(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Returns true if this `Features` supports any bits which we do not know of
	 */
	public supports_unknown_bits(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_unknown_bits(this.ptr);
		return ret;
	}

	/**
	 * Sets a required feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public set_required_feature_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_set_required_feature_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional feature bit. Errors if `bit` is outside the feature range as defined
	 * by [BOLT 9].
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [BOLT 9]: https://github.com/lightning/bolts/blob/master/09-features.md
	 */
	public set_optional_feature_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_set_optional_feature_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets a required custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Required bits are even. If an odd bit is given, then the corresponding even bit will
	 * be set instead (i.e., `bit - 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public set_required_custom_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_set_required_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets an optional custom feature bit. Errors if `bit` is outside the custom range as defined
	 * by [bLIP 2] or if it is a known `T` feature.
	 * 
	 * Note: Optional bits are odd. If an even bit is given, then the corresponding odd bit will be
	 * set instead (i.e., `bit + 1`).
	 * 
	 * [bLIP 2]: https://github.com/lightning/blips/blob/master/blip-0002.md#feature-bits
	 */
	public set_optional_custom_bit(bit: number): Result_NoneNoneZ {
		const ret: bigint = bindings.Bolt11InvoiceFeatures_set_optional_custom_bit(this.ptr, bit);
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_variable_length_onion_optional(): void {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_variable_length_onion_required(): void {
		bindings.Bolt11InvoiceFeatures_set_variable_length_onion_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_variable_length_onion(): void {
		bindings.Bolt11InvoiceFeatures_clear_variable_length_onion(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_variable_length_onion(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_variable_length_onion(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_variable_length_onion(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_variable_length_onion(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_payment_secret_optional(): void {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_payment_secret_required(): void {
		bindings.Bolt11InvoiceFeatures_set_payment_secret_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_payment_secret(): void {
		bindings.Bolt11InvoiceFeatures_clear_payment_secret(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_payment_secret(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_payment_secret(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_payment_secret(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_basic_mpp_optional(): void {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_basic_mpp_required(): void {
		bindings.Bolt11InvoiceFeatures_set_basic_mpp_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_basic_mpp(): void {
		bindings.Bolt11InvoiceFeatures_clear_basic_mpp(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_basic_mpp(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_basic_mpp(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_basic_mpp(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_basic_mpp(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_payment_metadata_optional(): void {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_payment_metadata_required(): void {
		bindings.Bolt11InvoiceFeatures_set_payment_metadata_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_payment_metadata(): void {
		bindings.Bolt11InvoiceFeatures_clear_payment_metadata(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_payment_metadata(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_payment_metadata(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_payment_metadata(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_payment_metadata(this.ptr);
		return ret;
	}

	/**
	 * Set this feature as optional.
	 */
	public set_trampoline_routing_optional(): void {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_optional(this.ptr);
	}

	/**
	 * Set this feature as required.
	 */
	public set_trampoline_routing_required(): void {
		bindings.Bolt11InvoiceFeatures_set_trampoline_routing_required(this.ptr);
	}

	/**
	 * Unsets this feature.
	 */
	public clear_trampoline_routing(): void {
		bindings.Bolt11InvoiceFeatures_clear_trampoline_routing(this.ptr);
	}

	/**
	 * Checks if this feature is supported.
	 */
	public supports_trampoline_routing(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_supports_trampoline_routing(this.ptr);
		return ret;
	}

	/**
	 * Checks if this feature is required.
	 */
	public requires_trampoline_routing(): boolean {
		const ret: boolean = bindings.Bolt11InvoiceFeatures_requires_trampoline_routing(this.ptr);
		return ret;
	}

}

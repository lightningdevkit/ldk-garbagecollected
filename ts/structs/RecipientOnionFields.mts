
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information which is provided, encrypted, to the payment recipient when sending HTLCs.
 * 
 * This should generally be constructed with data communicated to us from the recipient (via a
 * BOLT11 or BOLT12 invoice).
 */
export class RecipientOnionFields extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RecipientOnionFields_free);
	}

	/**
	 * The [`PaymentSecret`] is an arbitrary 32 bytes provided by the recipient for us to repeat
	 * in the onion. It is unrelated to `payment_hash` (or [`PaymentPreimage`]) and exists to
	 * authenticate the sender to the recipient and prevent payment-probing (deanonymization)
	 * attacks.
	 * 
	 * If you do not have one, the [`Route`] you pay over must not contain multiple paths as
	 * multi-path payments require a recipient-provided secret.
	 * 
	 * Some implementations may reject spontaneous payments with payment secrets, so you may only
	 * want to provide a secret for a spontaneous payment if MPP is needed and you know your
	 * recipient will not reject it.
	 */
	public get_payment_secret(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.RecipientOnionFields_get_payment_secret(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The [`PaymentSecret`] is an arbitrary 32 bytes provided by the recipient for us to repeat
	 * in the onion. It is unrelated to `payment_hash` (or [`PaymentPreimage`]) and exists to
	 * authenticate the sender to the recipient and prevent payment-probing (deanonymization)
	 * attacks.
	 * 
	 * If you do not have one, the [`Route`] you pay over must not contain multiple paths as
	 * multi-path payments require a recipient-provided secret.
	 * 
	 * Some implementations may reject spontaneous payments with payment secrets, so you may only
	 * want to provide a secret for a spontaneous payment if MPP is needed and you know your
	 * recipient will not reject it.
	 */
	public set_payment_secret(val: Option_ThirtyTwoBytesZ): void {
		bindings.RecipientOnionFields_set_payment_secret(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The payment metadata serves a similar purpose as [`Self::payment_secret`] but is of
	 * arbitrary length. This gives recipients substantially more flexibility to receive
	 * additional data.
	 * 
	 * In LDK, while the [`Self::payment_secret`] is fixed based on an internal authentication
	 * scheme to authenticate received payments against expected payments and invoices, this field
	 * is not used in LDK for received payments, and can be used to store arbitrary data in
	 * invoices which will be received with the payment.
	 * 
	 * Note that this field was added to the lightning specification more recently than
	 * [`Self::payment_secret`] and while nearly all lightning senders support secrets, metadata
	 * may not be supported as universally.
	 * 
	 * Returns a copy of the field.
	 */
	public get_payment_metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.RecipientOnionFields_get_payment_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The payment metadata serves a similar purpose as [`Self::payment_secret`] but is of
	 * arbitrary length. This gives recipients substantially more flexibility to receive
	 * additional data.
	 * 
	 * In LDK, while the [`Self::payment_secret`] is fixed based on an internal authentication
	 * scheme to authenticate received payments against expected payments and invoices, this field
	 * is not used in LDK for received payments, and can be used to store arbitrary data in
	 * invoices which will be received with the payment.
	 * 
	 * Note that this field was added to the lightning specification more recently than
	 * [`Self::payment_secret`] and while nearly all lightning senders support secrets, metadata
	 * may not be supported as universally.
	 */
	public set_payment_metadata(val: Option_CVec_u8ZZ): void {
		bindings.RecipientOnionFields_set_payment_metadata(this.ptr, CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RecipientOnionFields_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RecipientOnionFields
	 */
	public clone(): RecipientOnionFields {
		const ret: bigint = bindings.RecipientOnionFields_clone(this.ptr);
		const ret_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two RecipientOnionFieldss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RecipientOnionFields): boolean {
		const ret: boolean = bindings.RecipientOnionFields_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the RecipientOnionFields object into a byte array which can be read by RecipientOnionFields_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RecipientOnionFields_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RecipientOnionFields from a byte array, created by RecipientOnionFields_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RecipientOnionFieldsDecodeErrorZ {
		const ret: bigint = bindings.RecipientOnionFields_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RecipientOnionFieldsDecodeErrorZ = Result_RecipientOnionFieldsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a [`RecipientOnionFields`] from only a [`PaymentSecret`]. This is the most common
	 * set of onion fields for today's BOLT11 invoices - most nodes require a [`PaymentSecret`]
	 * but do not require or provide any further data.
	 */
	public static constructor_secret_only(payment_secret: Uint8Array): RecipientOnionFields {
		const ret: bigint = bindings.RecipientOnionFields_secret_only(bindings.encodeUint8Array(payment_secret));
		const ret_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`RecipientOnionFields`] with no fields. This generally does not create
	 * payable HTLCs except for single-path spontaneous payments, i.e. this should generally
	 * only be used for calls to [`ChannelManager::send_spontaneous_payment`]. If you are sending
	 * a spontaneous MPP this will not work as all MPP require payment secrets; you may
	 * instead want to use [`RecipientOnionFields::secret_only`].
	 * 
	 * [`ChannelManager::send_spontaneous_payment`]: super::channelmanager::ChannelManager::send_spontaneous_payment
	 * [`RecipientOnionFields::secret_only`]: RecipientOnionFields::secret_only
	 */
	public static constructor_spontaneous_empty(): RecipientOnionFields {
		const ret: bigint = bindings.RecipientOnionFields_spontaneous_empty();
		const ret_hu_conv: RecipientOnionFields = new RecipientOnionFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`RecipientOnionFields`] from an existing one, adding custom TLVs. Each
	 * TLV is provided as a `(u64, Vec<u8>)` for the type number and serialized value
	 * respectively. TLV type numbers must be unique and within the range
	 * reserved for custom types, i.e. >= 2^16, otherwise this method will return `Err(())`.
	 * 
	 * This method will also error for types in the experimental range which have been
	 * standardized within the protocol, which only includes 5482373484 (keysend) for now.
	 * 
	 * See [`Self::custom_tlvs`] for more info.
	 */
	public with_custom_tlvs(custom_tlvs: TwoTuple_u64CVec_u8ZZ[]): Result_RecipientOnionFieldsNoneZ {
		const ret: bigint = bindings.RecipientOnionFields_with_custom_tlvs(this.ptr, bindings.encodeUint64Array(custom_tlvs.map(custom_tlvs_conv_23 => CommonBase.get_ptr_of(custom_tlvs_conv_23))));
		const ret_hu_conv: Result_RecipientOnionFieldsNoneZ = Result_RecipientOnionFieldsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the custom TLVs that will be sent or have been received.
	 * 
	 * Custom TLVs allow sending extra application-specific data with a payment. They provide
	 * additional flexibility on top of payment metadata, as while other implementations may
	 * require `payment_metadata` to reflect metadata provided in an invoice, custom TLVs
	 * do not have this restriction.
	 * 
	 * Note that if this field is non-empty, it will contain strictly increasing TLVs, each
	 * represented by a `(u64, Vec<u8>)` for its type number and serialized value respectively.
	 * This is validated when setting this field using [`Self::with_custom_tlvs`].
	 */
	public custom_tlvs(): TwoTuple_u64CVec_u8ZZ[] {
		const ret: number = bindings.RecipientOnionFields_custom_tlvs(this.ptr);
		const ret_conv_23_len: number = bindings.getArrayLength(ret);
		const ret_conv_23_arr: TwoTuple_u64CVec_u8ZZ[] = new Array(ret_conv_23_len).fill(null);
		for (var x = 0; x < ret_conv_23_len; x++) {
			const ret_conv_23: bigint = bindings.getU64ArrayElem(ret, x);
			const ret_conv_23_hu_conv: TwoTuple_u64CVec_u8ZZ = new TwoTuple_u64CVec_u8ZZ(null, ret_conv_23);
			CommonBase.add_ref_from(ret_conv_23_hu_conv, this);
			ret_conv_23_arr[x] = ret_conv_23_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_23_arr;
	}

}

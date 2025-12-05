
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An identifier for an [`Offer`] built using [`DerivedMetadata`].
 */
export class OfferId extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferId_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.OfferId_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.OfferId_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new OfferId given each field
	 */
	public static constructor_new(a_arg: Uint8Array): OfferId {
		const ret: bigint = bindings.OfferId_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferId_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferId
	 */
	public clone(): OfferId {
		const ret: bigint = bindings.OfferId_clone(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two OfferIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: OfferId): boolean {
		const ret: boolean = bindings.OfferId_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OfferId object into a byte array which can be read by OfferId_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OfferId_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferId from a byte array, created by OfferId_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OfferIdDecodeErrorZ {
		const ret: bigint = bindings.OfferId_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OfferIdDecodeErrorZ = Result_OfferIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

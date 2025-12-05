
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An encrypted payload and node id corresponding to a hop in a payment or onion message path, to
 * be encoded in the sender's onion packet. These hops cannot be identified by outside observers
 * and thus can be used to hide the identity of the recipient.
 */
export class BlindedHop extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedHop_free);
	}

	/**
	 * The blinded node id of this hop in a blinded path.
	 */
	public get_blinded_node_id(): Uint8Array {
		const ret: number = bindings.BlindedHop_get_blinded_node_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The blinded node id of this hop in a blinded path.
	 */
	public set_blinded_node_id(val: Uint8Array): void {
		bindings.BlindedHop_set_blinded_node_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The encrypted payload intended for this hop in a blinded path.
	 * 
	 * Returns a copy of the field.
	 */
	public get_encrypted_payload(): Uint8Array {
		const ret: number = bindings.BlindedHop_get_encrypted_payload(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The encrypted payload intended for this hop in a blinded path.
	 */
	public set_encrypted_payload(val: Uint8Array): void {
		bindings.BlindedHop_set_encrypted_payload(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new BlindedHop given each field
	 */
	public static constructor_new(blinded_node_id_arg: Uint8Array, encrypted_payload_arg: Uint8Array): BlindedHop {
		const ret: bigint = bindings.BlindedHop_new(bindings.encodeUint8Array(blinded_node_id_arg), bindings.encodeUint8Array(encrypted_payload_arg));
		const ret_hu_conv: BlindedHop = new BlindedHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedHop_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedHop
	 */
	public clone(): BlindedHop {
		const ret: bigint = bindings.BlindedHop_clone(this.ptr);
		const ret_hu_conv: BlindedHop = new BlindedHop(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedHop.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedHop_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedHops contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedHop): boolean {
		const ret: boolean = bindings.BlindedHop_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BlindedHop object into a byte array which can be read by BlindedHop_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BlindedHop_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedHop from a byte array, created by BlindedHop_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BlindedHopDecodeErrorZ {
		const ret: bigint = bindings.BlindedHop_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BlindedHopDecodeErrorZ = Result_BlindedHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

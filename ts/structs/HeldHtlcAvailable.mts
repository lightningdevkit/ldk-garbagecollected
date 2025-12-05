
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An HTLC destined for the recipient of this message is being held upstream. The reply path
 * accompanying this onion message should be used to send a [`ReleaseHeldHtlc`] response, which
 * will cause the upstream HTLC to be released.
 */
export class HeldHtlcAvailable extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HeldHtlcAvailable_free);
	}

	/**
	 * Constructs a new HeldHtlcAvailable given each field
	 */
	public static constructor_new(): HeldHtlcAvailable {
		const ret: bigint = bindings.HeldHtlcAvailable_new();
		const ret_hu_conv: HeldHtlcAvailable = new HeldHtlcAvailable(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HeldHtlcAvailable_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HeldHtlcAvailable
	 */
	public clone(): HeldHtlcAvailable {
		const ret: bigint = bindings.HeldHtlcAvailable_clone(this.ptr);
		const ret_hu_conv: HeldHtlcAvailable = new HeldHtlcAvailable(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HeldHtlcAvailable object into a byte array which can be read by HeldHtlcAvailable_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HeldHtlcAvailable_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HeldHtlcAvailable from a byte array, created by HeldHtlcAvailable_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HeldHtlcAvailableDecodeErrorZ {
		const ret: bigint = bindings.HeldHtlcAvailable_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HeldHtlcAvailableDecodeErrorZ = Result_HeldHtlcAvailableDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

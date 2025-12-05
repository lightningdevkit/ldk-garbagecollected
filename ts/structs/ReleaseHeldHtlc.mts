
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Releases the HTLC corresponding to an inbound [`HeldHtlcAvailable`] message.
 */
export class ReleaseHeldHtlc extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReleaseHeldHtlc_free);
	}

	/**
	 * Constructs a new ReleaseHeldHtlc given each field
	 */
	public static constructor_new(): ReleaseHeldHtlc {
		const ret: bigint = bindings.ReleaseHeldHtlc_new();
		const ret_hu_conv: ReleaseHeldHtlc = new ReleaseHeldHtlc(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReleaseHeldHtlc_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReleaseHeldHtlc
	 */
	public clone(): ReleaseHeldHtlc {
		const ret: bigint = bindings.ReleaseHeldHtlc_clone(this.ptr);
		const ret_hu_conv: ReleaseHeldHtlc = new ReleaseHeldHtlc(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.ReleaseHeldHtlc_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReleaseHeldHtlc object into a byte array which can be read by ReleaseHeldHtlc_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ReleaseHeldHtlc_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ReleaseHeldHtlc from a byte array, created by ReleaseHeldHtlc_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ReleaseHeldHtlcDecodeErrorZ {
		const ret: bigint = bindings.ReleaseHeldHtlc_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ReleaseHeldHtlcDecodeErrorZ = Result_ReleaseHeldHtlcDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}


import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Simple structure sent back by `chain::Watch` when an HTLC from a forward channel is detected on
 * chain. Used to update the corresponding HTLC in the backward channel. Failing to pass the
 * preimage claim backward will lead to loss of funds.
 */
export class HTLCUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HTLCUpdate_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HTLCUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCUpdate
	 */
	public clone(): HTLCUpdate {
		const ret: bigint = bindings.HTLCUpdate_clone(this.ptr);
		const ret_hu_conv: HTLCUpdate = new HTLCUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HTLCUpdate): boolean {
		const ret: boolean = bindings.HTLCUpdate_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the HTLCUpdate object into a byte array which can be read by HTLCUpdate_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HTLCUpdate_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCUpdate from a byte array, created by HTLCUpdate_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HTLCUpdateDecodeErrorZ {
		const ret: bigint = bindings.HTLCUpdate_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HTLCUpdateDecodeErrorZ = Result_HTLCUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

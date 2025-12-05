
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Data to construct a [`BlindedHop`] for receiving a payment. This payload is custom to LDK and
 * may not be valid if received by another lightning implementation.
 * 
 * Can only be constructed by calling [`UnauthenticatedReceiveTlvs::authenticate`].
 */
export class ReceiveTlvs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ReceiveTlvs_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ReceiveTlvs_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ReceiveTlvs
	 */
	public clone(): ReceiveTlvs {
		const ret: bigint = bindings.ReceiveTlvs_clone(this.ptr);
		const ret_hu_conv: ReceiveTlvs = new ReceiveTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying TLVs.
	 */
	public tlvs(): UnauthenticatedReceiveTlvs {
		const ret: bigint = bindings.ReceiveTlvs_tlvs(this.ptr);
		const ret_hu_conv: UnauthenticatedReceiveTlvs = new UnauthenticatedReceiveTlvs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ReceiveTlvs object into a byte array which can be read by ReceiveTlvs_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ReceiveTlvs_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}

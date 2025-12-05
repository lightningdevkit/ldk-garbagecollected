
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Attribution data allows the sender of an HTLC to identify which hop failed an HTLC robustly,
 * preventing earlier hops from corrupting the HTLC failure information (or at least allowing the
 * sender to identify the earliest hop which corrupted HTLC failure information).
 * 
 * Additionally, it allows a sender to identify how long each hop along a path held an HTLC, with
 * 100ms granularity.
 */
export class AttributionData extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.AttributionData_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AttributionData_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AttributionData
	 */
	public clone(): AttributionData {
		const ret: bigint = bindings.AttributionData_clone(this.ptr);
		const ret_hu_conv: AttributionData = new AttributionData(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the AttributionData.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.AttributionData_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two AttributionDatas contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: AttributionData): boolean {
		const ret: boolean = bindings.AttributionData_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the AttributionData object into a byte array which can be read by AttributionData_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AttributionData_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AttributionData from a byte array, created by AttributionData_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AttributionDataDecodeErrorZ {
		const ret: bigint = bindings.AttributionData_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AttributionDataDecodeErrorZ = Result_AttributionDataDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

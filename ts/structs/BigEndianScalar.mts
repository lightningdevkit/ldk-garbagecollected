
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

export class BigEndianScalar extends CommonBase {
	/** The bytes of the scalar value, in big endian */
	public scalar_bytes: Uint8Array;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BigEndianScalar_free);
		this.scalar_bytes = bindings.decodeUint8Array(bindings.BigEndianScalar_get_bytes(ptr));
	}
	public static constructor_new(scalar_bytes: Uint8Array): BigEndianScalar {
		return new BigEndianScalar(null, bindings.BigEndianScalar_new(bindings.encodeUint8Array(scalar_bytes)));
	}
}
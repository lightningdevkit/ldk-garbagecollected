
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Data of the [`RawBolt11Invoice`] that is encoded in the data part
 */
export class RawDataPart extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RawDataPart_free);
	}

	/**
	 * generation time of the invoice
	 */
	public get_timestamp(): PositiveTimestamp {
		const ret: bigint = bindings.RawDataPart_get_timestamp(this.ptr);
		const ret_hu_conv: PositiveTimestamp = new PositiveTimestamp(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * generation time of the invoice
	 */
	public set_timestamp(val: PositiveTimestamp): void {
		bindings.RawDataPart_set_timestamp(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Checks if two RawDataParts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RawDataPart): boolean {
		const ret: boolean = bindings.RawDataPart_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RawDataPart_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RawDataPart
	 */
	public clone(): RawDataPart {
		const ret: bigint = bindings.RawDataPart_clone(this.ptr);
		const ret_hu_conv: RawDataPart = new RawDataPart(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RawDataPart.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RawDataPart_hash(this.ptr);
		return ret;
	}

}

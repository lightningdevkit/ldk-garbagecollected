
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_free);
	}

	/**
	 * 
	 */
	public get_a(): TwoTuple_HumanReadableNameThirtyTwoBytesZ[] {
		const ret: number = bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_get_a(this.ptr);
		const ret_conv_43_len: number = bindings.getArrayLength(ret);
		const ret_conv_43_arr: TwoTuple_HumanReadableNameThirtyTwoBytesZ[] = new Array(ret_conv_43_len).fill(null);
		for (var r = 0; r < ret_conv_43_len; r++) {
			const ret_conv_43: bigint = bindings.getU64ArrayElem(ret, r);
			const ret_conv_43_hu_conv: TwoTuple_HumanReadableNameThirtyTwoBytesZ = new TwoTuple_HumanReadableNameThirtyTwoBytesZ(null, ret_conv_43);
			CommonBase.add_ref_from(ret_conv_43_hu_conv, this);
			ret_conv_43_arr[r] = ret_conv_43_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_43_arr;
	}

	/**
	 * 
	 */
	public get_b(): Offer {
		const ret: bigint = bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_get_b(this.ptr);
		const ret_hu_conv: Offer = new Offer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ {
		const ret: bigint = bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ = new TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ from the contained elements.
	 */
	public static constructor_new(a: TwoTuple_HumanReadableNameThirtyTwoBytesZ[], b: Offer): TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ {
		const ret: bigint = bindings.C2Tuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ_new(bindings.encodeUint64Array(a.map(a_conv_43 => CommonBase.get_ptr_of(a_conv_43))), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ = new TwoTuple_CVec_C2Tuple_HumanReadableNameThirtyTwoBytesZZOfferZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

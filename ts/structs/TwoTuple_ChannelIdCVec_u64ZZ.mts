
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ChannelIdCVec_u64ZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ChannelIdCVec_u64ZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): ChannelId {
		const ret: bigint = bindings.C2Tuple_ChannelIdCVec_u64ZZ_get_a(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): BigUint64Array {
		const ret: number = bindings.C2Tuple_ChannelIdCVec_u64ZZ_get_b(this.ptr);
		const ret_conv: BigUint64Array = bindings.decodeUint64Array(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ChannelIdCVec_u64ZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ChannelIdCVec_u64ZZ {
		const ret: bigint = bindings.C2Tuple_ChannelIdCVec_u64ZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ChannelIdCVec_u64ZZ = new TwoTuple_ChannelIdCVec_u64ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ChannelIdCVec_u64ZZ from the contained elements.
	 */
	public static constructor_new(a: ChannelId, b: BigUint64Array): TwoTuple_ChannelIdCVec_u64ZZ {
		const ret: bigint = bindings.C2Tuple_ChannelIdCVec_u64ZZ_new(CommonBase.get_ptr_of(a), bindings.encodeUint64Array(b));
		const ret_hu_conv: TwoTuple_ChannelIdCVec_u64ZZ = new TwoTuple_ChannelIdCVec_u64ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

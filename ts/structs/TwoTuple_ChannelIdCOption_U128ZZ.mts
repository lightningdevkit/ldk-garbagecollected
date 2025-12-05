
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ChannelIdCOption_U128ZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ChannelIdCOption_U128ZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): ChannelId {
		const ret: bigint = bindings.C2Tuple_ChannelIdCOption_U128ZZ_get_a(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): Option_U128Z {
		const ret: bigint = bindings.C2Tuple_ChannelIdCOption_U128ZZ_get_b(this.ptr);
		const ret_hu_conv: Option_U128Z = Option_U128Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ChannelIdCOption_U128ZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ChannelIdCOption_U128ZZ {
		const ret: bigint = bindings.C2Tuple_ChannelIdCOption_U128ZZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ChannelIdCOption_U128ZZ = new TwoTuple_ChannelIdCOption_U128ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ChannelIdCOption_U128ZZ from the contained elements.
	 */
	public static constructor_new(a: ChannelId, b: Option_U128Z): TwoTuple_ChannelIdCOption_U128ZZ {
		const ret: bigint = bindings.C2Tuple_ChannelIdCOption_U128ZZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_ChannelIdCOption_U128ZZ = new TwoTuple_ChannelIdCOption_U128ZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

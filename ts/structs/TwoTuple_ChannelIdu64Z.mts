
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ChannelIdu64Z extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ChannelIdu64Z_free);
	}

	/**
	 * 
	 */
	public get_a(): ChannelId {
		const ret: bigint = bindings.C2Tuple_ChannelIdu64Z_get_a(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): bigint {
		const ret: bigint = bindings.C2Tuple_ChannelIdu64Z_get_b(this.ptr);
		return ret;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ChannelIdu64Z_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ChannelIdu64Z {
		const ret: bigint = bindings.C2Tuple_ChannelIdu64Z_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ChannelIdu64Z = new TwoTuple_ChannelIdu64Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ChannelIdu64Z from the contained elements.
	 */
	public static constructor_new(a: ChannelId, b: bigint): TwoTuple_ChannelIdu64Z {
		const ret: bigint = bindings.C2Tuple_ChannelIdu64Z_new(CommonBase.get_ptr_of(a), b);
		const ret_hu_conv: TwoTuple_ChannelIdu64Z = new TwoTuple_ChannelIdu64Z(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

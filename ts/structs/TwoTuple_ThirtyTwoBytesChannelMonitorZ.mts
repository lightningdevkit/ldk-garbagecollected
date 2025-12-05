
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class TwoTuple_ThirtyTwoBytesChannelMonitorZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): ChannelMonitor {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_get_b(this.ptr);
		const ret_hu_conv: ChannelMonitor = new ChannelMonitor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): TwoTuple_ThirtyTwoBytesChannelMonitorZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_clone(this.ptr);
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesChannelMonitorZ = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C2Tuple_ThirtyTwoBytesChannelMonitorZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: ChannelMonitor): TwoTuple_ThirtyTwoBytesChannelMonitorZ {
		const ret: bigint = bindings.C2Tuple_ThirtyTwoBytesChannelMonitorZ_new(bindings.encodeUint8Array(a), CommonBase.get_ptr_of(b));
		const ret_hu_conv: TwoTuple_ThirtyTwoBytesChannelMonitorZ = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

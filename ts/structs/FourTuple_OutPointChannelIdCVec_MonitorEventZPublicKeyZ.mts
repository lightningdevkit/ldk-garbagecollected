
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_free);
	}

	/**
	 * 
	 */
	public get_a(): OutPoint {
		const ret: bigint = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_get_a(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_b(): ChannelId {
		const ret: bigint = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_get_b(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_c(): MonitorEvent[] {
		const ret: number = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_get_c(this.ptr);
		const ret_conv_14_len: number = bindings.getArrayLength(ret);
		const ret_conv_14_arr: MonitorEvent[] = new Array(ret_conv_14_len).fill(null);
		for (var o = 0; o < ret_conv_14_len; o++) {
			const ret_conv_14: bigint = bindings.getU64ArrayElem(ret, o);
			const ret_conv_14_hu_conv: MonitorEvent = MonitorEvent.constr_from_ptr(ret_conv_14);
			CommonBase.add_ref_from(ret_conv_14_hu_conv, this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_14_arr;
	}

	/**
	 * 
	 */
	public get_d(): Uint8Array {
		const ret: number = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_get_d(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ {
		const ret: bigint = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_clone(this.ptr);
		const ret_hu_conv: FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ from the contained elements.
	 */
	public static constructor_new(a: OutPoint, b: ChannelId, c: MonitorEvent[], d: Uint8Array): FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ {
		const ret: bigint = bindings.C4Tuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ_new(CommonBase.get_ptr_of(a), CommonBase.get_ptr_of(b), bindings.encodeUint64Array(c.map(c_conv_14 => CommonBase.get_ptr_of(c_conv_14))), bindings.encodeUint8Array(d));
		const ret_hu_conv: FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ = new FourTuple_OutPointChannelIdCVec_MonitorEventZPublicKeyZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

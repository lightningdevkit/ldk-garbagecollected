
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Tuple
 */
export class ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_free);
	}

	/**
	 * 
	 */
	public get_a(): Uint8Array {
		const ret: number = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * 
	 */
	public get_b(): OnionMessage {
		const ret: bigint = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_b(this.ptr);
		const ret_hu_conv: OnionMessage = new OnionMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public get_c(): SocketAddress[] {
		const ret: number = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_get_c(this.ptr);
		const ret_conv_15_len: number = bindings.getArrayLength(ret);
		const ret_conv_15_arr: SocketAddress[] = new Array(ret_conv_15_len).fill(null);
		for (var p = 0; p < ret_conv_15_len; p++) {
			const ret_conv_15: bigint = bindings.getU64ArrayElem(ret, p);
			const ret_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(ret_conv_15);
			CommonBase.add_ref_from(ret_conv_15_hu_conv, this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_15_arr;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ {
		const ret: bigint = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_clone(this.ptr);
		const ret_hu_conv: ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ from the contained elements.
	 */
	public static constructor_new(a: Uint8Array, b: OnionMessage, c: SocketAddress[]): ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ {
		const ret: bigint = bindings.C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZ_new(bindings.encodeUint8Array(a), CommonBase.get_ptr_of(b), bindings.encodeUint64Array(c.map(c_conv_15 => CommonBase.get_ptr_of(c_conv_15))));
		const ret_hu_conv: ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

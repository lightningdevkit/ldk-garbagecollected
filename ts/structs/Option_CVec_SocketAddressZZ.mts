
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * An enum which can either contain a crate::c_types::derived::CVec_SocketAddressZ or not
 */
export class Option_CVec_SocketAddressZZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.COption_CVec_SocketAddressZZ_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Option_CVec_SocketAddressZZ {
		const raw_ty: number = bindings.LDKCOption_CVec_SocketAddressZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CVec_SocketAddressZZ_Some(ptr);
			case 1: return new Option_CVec_SocketAddressZZ_None(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing a crate::c_types::derived::CVec_SocketAddressZ
	 */
	public static constructor_some(o: SocketAddress[]): Option_CVec_SocketAddressZZ {
		const ret: bigint = bindings.COption_CVec_SocketAddressZZ_some(bindings.encodeUint64Array(o.map(o_conv_15 => CommonBase.get_ptr_of(o_conv_15))));
		const ret_hu_conv: Option_CVec_SocketAddressZZ = Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing nothing
	 */
	public static constructor_none(): Option_CVec_SocketAddressZZ {
		const ret: bigint = bindings.COption_CVec_SocketAddressZZ_none();
		const ret_hu_conv: Option_CVec_SocketAddressZZ = Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.COption_CVec_SocketAddressZZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_SocketAddressZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public clone(): Option_CVec_SocketAddressZZ {
		const ret: bigint = bindings.COption_CVec_SocketAddressZZ_clone(this.ptr);
		const ret_hu_conv: Option_CVec_SocketAddressZZ = Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
/** A Option_CVec_SocketAddressZZ of type Some */
export class Option_CVec_SocketAddressZZ_Some extends Option_CVec_SocketAddressZZ {
	public some: SocketAddress[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const some: number = bindings.LDKCOption_CVec_SocketAddressZZ_Some_get_some(ptr);
		const some_conv_15_len: number = bindings.getArrayLength(some);
			const some_conv_15_arr: SocketAddress[] = new Array(some_conv_15_len).fill(null);
			for (var p = 0; p < some_conv_15_len; p++) {
				const some_conv_15: bigint = bindings.getU64ArrayElem(some, p);
				const some_conv_15_hu_conv: SocketAddress = SocketAddress.constr_from_ptr(some_conv_15);
				CommonBase.add_ref_from(some_conv_15_hu_conv, this);
				some_conv_15_arr[p] = some_conv_15_hu_conv;
			}
			bindings.freeWasmMemory(some)
		this.some = some_conv_15_arr;
	}
}
/** A Option_CVec_SocketAddressZZ of type None */
export class Option_CVec_SocketAddressZZ_None extends Option_CVec_SocketAddressZZ {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

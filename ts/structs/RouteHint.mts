
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A list of hops along a payment path terminating with a channel to the recipient.
 */
export class RouteHint extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RouteHint_free);
	}

	/**
	 * Serialize the RouteHint object into a byte array which can be read by RouteHint_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.RouteHint_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a RouteHint from a byte array, created by RouteHint_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RouteHintDecodeErrorZ {
		const ret: bigint = bindings.RouteHint_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RouteHintDecodeErrorZ = Result_RouteHintDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public get_a(): RouteHintHop[] {
		const ret: number = bindings.RouteHint_get_a(this.ptr);
		const ret_conv_14_len: number = bindings.getArrayLength(ret);
		const ret_conv_14_arr: RouteHintHop[] = new Array(ret_conv_14_len).fill(null);
		for (var o = 0; o < ret_conv_14_len; o++) {
			const ret_conv_14: bigint = bindings.getU64ArrayElem(ret, o);
			const ret_conv_14_hu_conv: RouteHintHop = new RouteHintHop(null, ret_conv_14);
			CommonBase.add_ref_from(ret_conv_14_hu_conv, this);
			ret_conv_14_arr[o] = ret_conv_14_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_14_arr;
	}

	public set_a(val: RouteHintHop[]): void {
		bindings.RouteHint_set_a(this.ptr, bindings.encodeUint64Array(val.map(val_conv_14 => CommonBase.get_ptr_of(val_conv_14))));
	}

	/**
	 * Constructs a new RouteHint given each field
	 */
	public static constructor_new(a_arg: RouteHintHop[]): RouteHint {
		const ret: bigint = bindings.RouteHint_new(bindings.encodeUint64Array(a_arg.map(a_arg_conv_14 => CommonBase.get_ptr_of(a_arg_conv_14))));
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RouteHint_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RouteHint
	 */
	public clone(): RouteHint {
		const ret: bigint = bindings.RouteHint_clone(this.ptr);
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the RouteHint.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.RouteHint_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two RouteHints contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: RouteHint): boolean {
		const ret: boolean = bindings.RouteHint_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Build a RouteHint from a PrivateRoute
	 */
	public static constructor_from_PrivateRoute(f: PrivateRoute): RouteHint {
		const ret: bigint = bindings.RouteHint_from_PrivateRoute(CommonBase.get_ptr_of(f));
		const ret_hu_conv: RouteHint = new RouteHint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}

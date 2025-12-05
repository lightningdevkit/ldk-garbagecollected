
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A path in a [`Route`] to the payment recipient. Must always be at least length one.
 * If no [`Path::blinded_tail`] is present, then [`Path::hops`] length may be up to 19.
 */
export class Path extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Path_free);
	}

	/**
	 * The list of unblinded hops in this [`Path`]. Must be at least length one.
	 */
	public get_hops(): RouteHop[] {
		const ret: number = bindings.Path_get_hops(this.ptr);
		const ret_conv_10_len: number = bindings.getArrayLength(ret);
		const ret_conv_10_arr: RouteHop[] = new Array(ret_conv_10_len).fill(null);
		for (var k = 0; k < ret_conv_10_len; k++) {
			const ret_conv_10: bigint = bindings.getU64ArrayElem(ret, k);
			const ret_conv_10_hu_conv: RouteHop = new RouteHop(null, ret_conv_10);
			CommonBase.add_ref_from(ret_conv_10_hu_conv, this);
			ret_conv_10_arr[k] = ret_conv_10_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_10_arr;
	}

	/**
	 * The list of unblinded hops in this [`Path`]. Must be at least length one.
	 */
	public set_hops(val: RouteHop[]): void {
		bindings.Path_set_hops(this.ptr, bindings.encodeUint64Array(val.map(val_conv_10 => CommonBase.get_ptr_of(val_conv_10))));
	}

	/**
	 * The blinded path at which this path terminates, if we're sending to one, and its metadata.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_blinded_tail(): BlindedTail {
		const ret: bigint = bindings.Path_get_blinded_tail(this.ptr);
		const ret_hu_conv: BlindedTail = new BlindedTail(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The blinded path at which this path terminates, if we're sending to one, and its metadata.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_blinded_tail(val: BlindedTail|null): void {
		bindings.Path_set_blinded_tail(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Path given each field
	 * 
	 * Note that blinded_tail_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(hops_arg: RouteHop[], blinded_tail_arg: BlindedTail|null): Path {
		const ret: bigint = bindings.Path_new(bindings.encodeUint64Array(hops_arg.map(hops_arg_conv_10 => CommonBase.get_ptr_of(hops_arg_conv_10))), blinded_tail_arg == null ? 0n : CommonBase.get_ptr_of(blinded_tail_arg));
		const ret_hu_conv: Path = new Path(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Path_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Path
	 */
	public clone(): Path {
		const ret: bigint = bindings.Path_clone(this.ptr);
		const ret_hu_conv: Path = new Path(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Path.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Path_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Paths contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Path): boolean {
		const ret: boolean = bindings.Path_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Gets the fees for a given path, excluding any excess paid to the recipient.
	 */
	public fee_msat(): bigint {
		const ret: bigint = bindings.Path_fee_msat(this.ptr);
		return ret;
	}

	/**
	 * Gets the total amount paid on this [`Path`], excluding the fees.
	 */
	public final_value_msat(): bigint {
		const ret: bigint = bindings.Path_final_value_msat(this.ptr);
		return ret;
	}

	/**
	 * Gets the final hop's CLTV expiry delta.
	 */
	public final_cltv_expiry_delta(): Option_u32Z {
		const ret: bigint = bindings.Path_final_cltv_expiry_delta(this.ptr);
		const ret_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * True if this [`Path`] has at least one Trampoline hop.
	 */
	public has_trampoline_hops(): boolean {
		const ret: boolean = bindings.Path_has_trampoline_hops(this.ptr);
		return ret;
	}

}

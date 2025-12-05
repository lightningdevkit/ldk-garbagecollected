
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The blinded portion of a [`Path`], if we're routing to a recipient who provided blinded paths in
 * their [`Bolt12Invoice`].
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
export class BlindedTail extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BlindedTail_free);
	}

	/**
	 * The list of unblinded Trampoline hops. When using Trampoline, must contain at least one hop.
	 * 
	 * Note that the first [`TrampolineHop`] node must also be present as the last [`RouteHop`] node,
	 * where the [`RouteHop`]'s fee_msat is the fee paid for use of the entire blinded path, including
	 * any Trampoline hops.
	 */
	public get_trampoline_hops(): TrampolineHop[] {
		const ret: number = bindings.BlindedTail_get_trampoline_hops(this.ptr);
		const ret_conv_15_len: number = bindings.getArrayLength(ret);
		const ret_conv_15_arr: TrampolineHop[] = new Array(ret_conv_15_len).fill(null);
		for (var p = 0; p < ret_conv_15_len; p++) {
			const ret_conv_15: bigint = bindings.getU64ArrayElem(ret, p);
			const ret_conv_15_hu_conv: TrampolineHop = new TrampolineHop(null, ret_conv_15);
			CommonBase.add_ref_from(ret_conv_15_hu_conv, this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_15_arr;
	}

	/**
	 * The list of unblinded Trampoline hops. When using Trampoline, must contain at least one hop.
	 * 
	 * Note that the first [`TrampolineHop`] node must also be present as the last [`RouteHop`] node,
	 * where the [`RouteHop`]'s fee_msat is the fee paid for use of the entire blinded path, including
	 * any Trampoline hops.
	 */
	public set_trampoline_hops(val: TrampolineHop[]): void {
		bindings.BlindedTail_set_trampoline_hops(this.ptr, bindings.encodeUint64Array(val.map(val_conv_15 => CommonBase.get_ptr_of(val_conv_15))));
	}

	/**
	 * The hops of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public get_hops(): BlindedHop[] {
		const ret: number = bindings.BlindedTail_get_hops(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: BlindedHop[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: bigint = bindings.getU64ArrayElem(ret, m);
			const ret_conv_12_hu_conv: BlindedHop = new BlindedHop(null, ret_conv_12);
			CommonBase.add_ref_from(ret_conv_12_hu_conv, this);
			ret_conv_12_arr[m] = ret_conv_12_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * The hops of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public set_hops(val: BlindedHop[]): void {
		bindings.BlindedTail_set_hops(this.ptr, bindings.encodeUint64Array(val.map(val_conv_12 => CommonBase.get_ptr_of(val_conv_12))));
	}

	/**
	 * The blinding point of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public get_blinding_point(): Uint8Array {
		const ret: number = bindings.BlindedTail_get_blinding_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The blinding point of the [`BlindedPaymentPath`] provided by the recipient.
	 */
	public set_blinding_point(val: Uint8Array): void {
		bindings.BlindedTail_set_blinding_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Excess CLTV delta added to the recipient's CLTV expiry to deter intermediate nodes from
	 * inferring the destination. May be 0.
	 */
	public get_excess_final_cltv_expiry_delta(): number {
		const ret: number = bindings.BlindedTail_get_excess_final_cltv_expiry_delta(this.ptr);
		return ret;
	}

	/**
	 * Excess CLTV delta added to the recipient's CLTV expiry to deter intermediate nodes from
	 * inferring the destination. May be 0.
	 */
	public set_excess_final_cltv_expiry_delta(val: number): void {
		bindings.BlindedTail_set_excess_final_cltv_expiry_delta(this.ptr, val);
	}

	/**
	 * The total amount paid on this [`Path`], excluding the fees.
	 */
	public get_final_value_msat(): bigint {
		const ret: bigint = bindings.BlindedTail_get_final_value_msat(this.ptr);
		return ret;
	}

	/**
	 * The total amount paid on this [`Path`], excluding the fees.
	 */
	public set_final_value_msat(val: bigint): void {
		bindings.BlindedTail_set_final_value_msat(this.ptr, val);
	}

	/**
	 * Constructs a new BlindedTail given each field
	 */
	public static constructor_new(trampoline_hops_arg: TrampolineHop[], hops_arg: BlindedHop[], blinding_point_arg: Uint8Array, excess_final_cltv_expiry_delta_arg: number, final_value_msat_arg: bigint): BlindedTail {
		const ret: bigint = bindings.BlindedTail_new(bindings.encodeUint64Array(trampoline_hops_arg.map(trampoline_hops_arg_conv_15 => CommonBase.get_ptr_of(trampoline_hops_arg_conv_15))), bindings.encodeUint64Array(hops_arg.map(hops_arg_conv_12 => CommonBase.get_ptr_of(hops_arg_conv_12))), bindings.encodeUint8Array(blinding_point_arg), excess_final_cltv_expiry_delta_arg, final_value_msat_arg);
		const ret_hu_conv: BlindedTail = new BlindedTail(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BlindedTail_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BlindedTail
	 */
	public clone(): BlindedTail {
		const ret: bigint = bindings.BlindedTail_clone(this.ptr);
		const ret_hu_conv: BlindedTail = new BlindedTail(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the BlindedTail.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.BlindedTail_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two BlindedTails contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: BlindedTail): boolean {
		const ret: boolean = bindings.BlindedTail_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the BlindedTail object into a byte array which can be read by BlindedTail_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BlindedTail_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BlindedTail from a byte array, created by BlindedTail_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BlindedTailDecodeErrorZ {
		const ret: bigint = bindings.BlindedTail_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BlindedTailDecodeErrorZ = Result_BlindedTailDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

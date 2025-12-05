
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Struct used to return values from [`RevokeAndACK`] messages, containing a bunch of commitment
 * transaction updates if they were pending.
 */
export class CommitmentUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CommitmentUpdate_free);
	}

	/**
	 * `update_add_htlc` messages which should be sent
	 */
	public get_update_add_htlcs(): UpdateAddHTLC[] {
		const ret: number = bindings.CommitmentUpdate_get_update_add_htlcs(this.ptr);
		const ret_conv_15_len: number = bindings.getArrayLength(ret);
		const ret_conv_15_arr: UpdateAddHTLC[] = new Array(ret_conv_15_len).fill(null);
		for (var p = 0; p < ret_conv_15_len; p++) {
			const ret_conv_15: bigint = bindings.getU64ArrayElem(ret, p);
			const ret_conv_15_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, ret_conv_15);
			CommonBase.add_ref_from(ret_conv_15_hu_conv, this);
			ret_conv_15_arr[p] = ret_conv_15_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_15_arr;
	}

	/**
	 * `update_add_htlc` messages which should be sent
	 */
	public set_update_add_htlcs(val: UpdateAddHTLC[]): void {
		bindings.CommitmentUpdate_set_update_add_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_15 => CommonBase.get_ptr_of(val_conv_15))));
	}

	/**
	 * `update_fulfill_htlc` messages which should be sent
	 */
	public get_update_fulfill_htlcs(): UpdateFulfillHTLC[] {
		const ret: number = bindings.CommitmentUpdate_get_update_fulfill_htlcs(this.ptr);
		const ret_conv_19_len: number = bindings.getArrayLength(ret);
		const ret_conv_19_arr: UpdateFulfillHTLC[] = new Array(ret_conv_19_len).fill(null);
		for (var t = 0; t < ret_conv_19_len; t++) {
			const ret_conv_19: bigint = bindings.getU64ArrayElem(ret, t);
			const ret_conv_19_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret_conv_19);
			CommonBase.add_ref_from(ret_conv_19_hu_conv, this);
			ret_conv_19_arr[t] = ret_conv_19_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_19_arr;
	}

	/**
	 * `update_fulfill_htlc` messages which should be sent
	 */
	public set_update_fulfill_htlcs(val: UpdateFulfillHTLC[]): void {
		bindings.CommitmentUpdate_set_update_fulfill_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_19 => CommonBase.get_ptr_of(val_conv_19))));
	}

	/**
	 * `update_fail_htlc` messages which should be sent
	 */
	public get_update_fail_htlcs(): UpdateFailHTLC[] {
		const ret: number = bindings.CommitmentUpdate_get_update_fail_htlcs(this.ptr);
		const ret_conv_16_len: number = bindings.getArrayLength(ret);
		const ret_conv_16_arr: UpdateFailHTLC[] = new Array(ret_conv_16_len).fill(null);
		for (var q = 0; q < ret_conv_16_len; q++) {
			const ret_conv_16: bigint = bindings.getU64ArrayElem(ret, q);
			const ret_conv_16_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, ret_conv_16);
			CommonBase.add_ref_from(ret_conv_16_hu_conv, this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_16_arr;
	}

	/**
	 * `update_fail_htlc` messages which should be sent
	 */
	public set_update_fail_htlcs(val: UpdateFailHTLC[]): void {
		bindings.CommitmentUpdate_set_update_fail_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_16 => CommonBase.get_ptr_of(val_conv_16))));
	}

	/**
	 * `update_fail_malformed_htlc` messages which should be sent
	 */
	public get_update_fail_malformed_htlcs(): UpdateFailMalformedHTLC[] {
		const ret: number = bindings.CommitmentUpdate_get_update_fail_malformed_htlcs(this.ptr);
		const ret_conv_25_len: number = bindings.getArrayLength(ret);
		const ret_conv_25_arr: UpdateFailMalformedHTLC[] = new Array(ret_conv_25_len).fill(null);
		for (var z = 0; z < ret_conv_25_len; z++) {
			const ret_conv_25: bigint = bindings.getU64ArrayElem(ret, z);
			const ret_conv_25_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, ret_conv_25);
			CommonBase.add_ref_from(ret_conv_25_hu_conv, this);
			ret_conv_25_arr[z] = ret_conv_25_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_25_arr;
	}

	/**
	 * `update_fail_malformed_htlc` messages which should be sent
	 */
	public set_update_fail_malformed_htlcs(val: UpdateFailMalformedHTLC[]): void {
		bindings.CommitmentUpdate_set_update_fail_malformed_htlcs(this.ptr, bindings.encodeUint64Array(val.map(val_conv_25 => CommonBase.get_ptr_of(val_conv_25))));
	}

	/**
	 * An `update_fee` message which should be sent
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_update_fee(): UpdateFee {
		const ret: bigint = bindings.CommitmentUpdate_get_update_fee(this.ptr);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An `update_fee` message which should be sent
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_update_fee(val: UpdateFee|null): void {
		bindings.CommitmentUpdate_set_update_fee(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * `commitment_signed` messages which should be sent
	 */
	public get_commitment_signed(): CommitmentSigned[] {
		const ret: number = bindings.CommitmentUpdate_get_commitment_signed(this.ptr);
		const ret_conv_18_len: number = bindings.getArrayLength(ret);
		const ret_conv_18_arr: CommitmentSigned[] = new Array(ret_conv_18_len).fill(null);
		for (var s = 0; s < ret_conv_18_len; s++) {
			const ret_conv_18: bigint = bindings.getU64ArrayElem(ret, s);
			const ret_conv_18_hu_conv: CommitmentSigned = new CommitmentSigned(null, ret_conv_18);
			CommonBase.add_ref_from(ret_conv_18_hu_conv, this);
			ret_conv_18_arr[s] = ret_conv_18_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_18_arr;
	}

	/**
	 * `commitment_signed` messages which should be sent
	 */
	public set_commitment_signed(val: CommitmentSigned[]): void {
		bindings.CommitmentUpdate_set_commitment_signed(this.ptr, bindings.encodeUint64Array(val.map(val_conv_18 => CommonBase.get_ptr_of(val_conv_18))));
	}

	/**
	 * Constructs a new CommitmentUpdate given each field
	 * 
	 * Note that update_fee_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(update_add_htlcs_arg: UpdateAddHTLC[], update_fulfill_htlcs_arg: UpdateFulfillHTLC[], update_fail_htlcs_arg: UpdateFailHTLC[], update_fail_malformed_htlcs_arg: UpdateFailMalformedHTLC[], update_fee_arg: UpdateFee|null, commitment_signed_arg: CommitmentSigned[]): CommitmentUpdate {
		const ret: bigint = bindings.CommitmentUpdate_new(bindings.encodeUint64Array(update_add_htlcs_arg.map(update_add_htlcs_arg_conv_15 => CommonBase.get_ptr_of(update_add_htlcs_arg_conv_15))), bindings.encodeUint64Array(update_fulfill_htlcs_arg.map(update_fulfill_htlcs_arg_conv_19 => CommonBase.get_ptr_of(update_fulfill_htlcs_arg_conv_19))), bindings.encodeUint64Array(update_fail_htlcs_arg.map(update_fail_htlcs_arg_conv_16 => CommonBase.get_ptr_of(update_fail_htlcs_arg_conv_16))), bindings.encodeUint64Array(update_fail_malformed_htlcs_arg.map(update_fail_malformed_htlcs_arg_conv_25 => CommonBase.get_ptr_of(update_fail_malformed_htlcs_arg_conv_25))), update_fee_arg == null ? 0n : CommonBase.get_ptr_of(update_fee_arg), bindings.encodeUint64Array(commitment_signed_arg.map(commitment_signed_arg_conv_18 => CommonBase.get_ptr_of(commitment_signed_arg_conv_18))));
		const ret_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CommitmentUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentUpdate
	 */
	public clone(): CommitmentUpdate {
		const ret: bigint = bindings.CommitmentUpdate_clone(this.ptr);
		const ret_hu_conv: CommitmentUpdate = new CommitmentUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommitmentUpdate.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.CommitmentUpdate_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two CommitmentUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CommitmentUpdate): boolean {
		const ret: boolean = bindings.CommitmentUpdate_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}

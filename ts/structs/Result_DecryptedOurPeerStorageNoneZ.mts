
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



export class Result_DecryptedOurPeerStorageNoneZ extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CResult_DecryptedOurPeerStorageNoneZ_free);
	}
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Result_DecryptedOurPeerStorageNoneZ {
		if (bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(ptr)) {
			return new Result_DecryptedOurPeerStorageNoneZ_OK(null, ptr);
		} else {
			return new Result_DecryptedOurPeerStorageNoneZ_Err(null, ptr);
		}
	}
	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the success state.
	 */
	public static constructor_ok(o_data: Uint8Array): Result_DecryptedOurPeerStorageNoneZ {
		const ret: bigint = bindings.CResult_DecryptedOurPeerStorageNoneZ_ok(bindings.DecryptedOurPeerStorage_new(bindings.encodeUint8Array(o_data)));
		const ret_hu_conv: Result_DecryptedOurPeerStorageNoneZ = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DecryptedOurPeerStorageNoneZ in the error state.
	 */
	public static constructor_err(): Result_DecryptedOurPeerStorageNoneZ {
		const ret: bigint = bindings.CResult_DecryptedOurPeerStorageNoneZ_err();
		const ret_hu_conv: Result_DecryptedOurPeerStorageNoneZ = Result_DecryptedOurPeerStorageNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public is_ok(): boolean {
		const ret: boolean = bindings.CResult_DecryptedOurPeerStorageNoneZ_is_ok(this.ptr);
		return ret;
	}

}
export class Result_DecryptedOurPeerStorageNoneZ_OK extends Result_DecryptedOurPeerStorageNoneZ {
	public res: DecryptedOurPeerStorage;

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
		const res: bigint = bindings.CResult_DecryptedOurPeerStorageNoneZ_get_ok(ptr);
		const res_hu_conv: DecryptedOurPeerStorage = new DecryptedOurPeerStorage(null, res);
		CommonBase.add_ref_from(res_hu_conv, this);
		this.res = res_hu_conv;
	}
}
export class Result_DecryptedOurPeerStorageNoneZ_Err extends Result_DecryptedOurPeerStorageNoneZ {

	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(_dummy, ptr);
	}
}

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`BlindedMessagePath`]s to be included in an async recipient's [`Offer::paths`], sent by a
 * static invoice server in response to an [`OfferPathsRequest`].
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
export class OfferPaths extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferPaths_free);
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public get_paths(): BlindedMessagePath[] {
		const ret: number = bindings.OfferPaths_get_paths(this.ptr);
		const ret_conv_20_len: number = bindings.getArrayLength(ret);
		const ret_conv_20_arr: BlindedMessagePath[] = new Array(ret_conv_20_len).fill(null);
		for (var u = 0; u < ret_conv_20_len; u++) {
			const ret_conv_20: bigint = bindings.getU64ArrayElem(ret, u);
			const ret_conv_20_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret_conv_20);
			CommonBase.add_ref_from(ret_conv_20_hu_conv, this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_20_arr;
	}

	/**
	 * The paths that should be included in the async recipient's [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public set_paths(val: BlindedMessagePath[]): void {
		bindings.OfferPaths_set_paths(this.ptr, bindings.encodeUint64Array(val.map(val_conv_20 => CommonBase.get_ptr_of(val_conv_20))));
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public get_paths_absolute_expiry(): Option_u64Z {
		const ret: bigint = bindings.OfferPaths_get_paths_absolute_expiry(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The time as seconds since the Unix epoch at which the [`Self::paths`] expire.
	 */
	public set_paths_absolute_expiry(val: Option_u64Z): void {
		bindings.OfferPaths_set_paths_absolute_expiry(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new OfferPaths given each field
	 */
	public static constructor_new(paths_arg: BlindedMessagePath[], paths_absolute_expiry_arg: Option_u64Z): OfferPaths {
		const ret: bigint = bindings.OfferPaths_new(bindings.encodeUint64Array(paths_arg.map(paths_arg_conv_20 => CommonBase.get_ptr_of(paths_arg_conv_20))), CommonBase.get_ptr_of(paths_absolute_expiry_arg));
		const ret_hu_conv: OfferPaths = new OfferPaths(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferPaths_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPaths
	 */
	public clone(): OfferPaths {
		const ret: bigint = bindings.OfferPaths_clone(this.ptr);
		const ret_hu_conv: OfferPaths = new OfferPaths(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public as_OnionMessageContents(): OnionMessageContents {
		const ret: bigint = bindings.OfferPaths_as_OnionMessageContents(this.ptr);
		const ret_hu_conv: OnionMessageContents = new OnionMessageContents(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPaths object into a byte array which can be read by OfferPaths_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OfferPaths_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferPaths from a byte array, created by OfferPaths_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OfferPathsDecodeErrorZ {
		const ret: bigint = bindings.OfferPaths_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OfferPathsDecodeErrorZ = Result_OfferPathsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}

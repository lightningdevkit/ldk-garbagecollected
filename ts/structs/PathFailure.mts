
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * When the payment path failure took place and extra details about it. [`PathFailure::OnPath`] may
 * contain a [`NetworkUpdate`] that needs to be applied to the [`NetworkGraph`].
 * 
 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
 */
export class PathFailure extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PathFailure_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PathFailure {
		const raw_ty: number = bindings.LDKPathFailure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PathFailure_InitialSend(ptr);
			case 1: return new PathFailure_OnPath(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PathFailure_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PathFailure
	 */
	public clone(): PathFailure {
		const ret: bigint = bindings.PathFailure_clone(this.ptr);
		const ret_hu_conv: PathFailure = PathFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InitialSend-variant PathFailure
	 */
	public static constructor_initial_send(err: APIError): PathFailure {
		const ret: bigint = bindings.PathFailure_initial_send(CommonBase.get_ptr_of(err));
		const ret_hu_conv: PathFailure = PathFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OnPath-variant PathFailure
	 */
	public static constructor_on_path(network_update: Option_NetworkUpdateZ): PathFailure {
		const ret: bigint = bindings.PathFailure_on_path(CommonBase.get_ptr_of(network_update));
		const ret_hu_conv: PathFailure = PathFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PathFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: PathFailure): boolean {
		const ret: boolean = bindings.PathFailure_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the PathFailure object into a byte array which can be read by PathFailure_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PathFailure_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
/** A PathFailure of type InitialSend */
export class PathFailure_InitialSend extends PathFailure {
	/**
	 * The error surfaced from initial send.
	 */
	public err: APIError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const err: bigint = bindings.LDKPathFailure_InitialSend_get_err(ptr);
		const err_hu_conv: APIError = APIError.constr_from_ptr(err);
			CommonBase.add_ref_from(err_hu_conv, this);
		this.err = err_hu_conv;
	}
}
/** A PathFailure of type OnPath */
export class PathFailure_OnPath extends PathFailure {
	/**
	 * If present, this [`NetworkUpdate`] should be applied to the [`NetworkGraph`] so that routing
	 * decisions can take into account the update.
	 * 
	 * [`NetworkUpdate`]: crate::routing::gossip::NetworkUpdate
	 * [`NetworkGraph`]: crate::routing::gossip::NetworkGraph
	 */
	public network_update: Option_NetworkUpdateZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const network_update: bigint = bindings.LDKPathFailure_OnPath_get_network_update(ptr);
		const network_update_hu_conv: Option_NetworkUpdateZ = Option_NetworkUpdateZ.constr_from_ptr(network_update);
			CommonBase.add_ref_from(network_update_hu_conv, this);
		this.network_update = network_update_hu_conv;
	}
}

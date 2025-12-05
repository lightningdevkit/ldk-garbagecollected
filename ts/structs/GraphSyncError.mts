
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * All-encompassing standard error type that processing can return
 */
export class GraphSyncError extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.GraphSyncError_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): GraphSyncError {
		const raw_ty: number = bindings.LDKGraphSyncError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new GraphSyncError_DecodeError(ptr);
			case 1: return new GraphSyncError_LightningError(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.GraphSyncError_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the GraphSyncError
	 */
	public clone(): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_clone(this.ptr);
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DecodeError-variant GraphSyncError
	 */
	public static constructor_decode_error(a: DecodeError): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_decode_error(CommonBase.get_ptr_of(a));
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new LightningError-variant GraphSyncError
	 */
	public static constructor_lightning_error(a: LightningError): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_lightning_error(CommonBase.get_ptr_of(a));
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a GraphSyncError from a IOError
	 */
	public static constructor_from_IOError(f: IOError): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_from_IOError(f);
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a GraphSyncError from a Secp256k1Error
	 */
	public static constructor_from_Secp256k1Error(f: Secp256k1Error): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_from_Secp256k1Error(f);
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a GraphSyncError from a DecodeError
	 */
	public static constructor_from_DecodeError(f: DecodeError): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_from_DecodeError(CommonBase.get_ptr_of(f));
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Build a GraphSyncError from a LightningError
	 */
	public static constructor_from_LightningError(f: LightningError): GraphSyncError {
		const ret: bigint = bindings.GraphSyncError_from_LightningError(CommonBase.get_ptr_of(f));
		const ret_hu_conv: GraphSyncError = GraphSyncError.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A GraphSyncError of type DecodeError */
export class GraphSyncError_DecodeError extends GraphSyncError {
	public decode_error: DecodeError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const decode_error: bigint = bindings.LDKGraphSyncError_DecodeError_get_decode_error(ptr);
		const decode_error_hu_conv: DecodeError = DecodeError.constr_from_ptr(decode_error);
			CommonBase.add_ref_from(decode_error_hu_conv, this);
		this.decode_error = decode_error_hu_conv;
	}
}
/** A GraphSyncError of type LightningError */
export class GraphSyncError_LightningError extends GraphSyncError {
	public lightning_error: LightningError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const lightning_error: bigint = bindings.LDKGraphSyncError_LightningError_get_lightning_error(ptr);
		const lightning_error_hu_conv: LightningError = new LightningError(null, lightning_error);
			CommonBase.add_ref_from(lightning_error_hu_conv, this);
		this.lightning_error = lightning_error_hu_conv;
	}
}

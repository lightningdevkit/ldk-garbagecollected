
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Indicates that we failed to send a payment probe. Further errors may be surfaced later via
 * [`Event::ProbeFailed`].
 * 
 * [`Event::ProbeFailed`]: crate::events::Event::ProbeFailed
 */
export class ProbeSendFailure extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.ProbeSendFailure_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): ProbeSendFailure {
		const raw_ty: number = bindings.LDKProbeSendFailure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ProbeSendFailure_RouteNotFound(ptr);
			case 1: return new ProbeSendFailure_ParameterError(ptr);
			case 2: return new ProbeSendFailure_DuplicateProbe(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ProbeSendFailure_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ProbeSendFailure
	 */
	public clone(): ProbeSendFailure {
		const ret: bigint = bindings.ProbeSendFailure_clone(this.ptr);
		const ret_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new RouteNotFound-variant ProbeSendFailure
	 */
	public static constructor_route_not_found(): ProbeSendFailure {
		const ret: bigint = bindings.ProbeSendFailure_route_not_found();
		const ret_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParameterError-variant ProbeSendFailure
	 */
	public static constructor_parameter_error(a: APIError): ProbeSendFailure {
		const ret: bigint = bindings.ProbeSendFailure_parameter_error(CommonBase.get_ptr_of(a));
		const ret_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicateProbe-variant ProbeSendFailure
	 */
	public static constructor_duplicate_probe(): ProbeSendFailure {
		const ret: bigint = bindings.ProbeSendFailure_duplicate_probe();
		const ret_hu_conv: ProbeSendFailure = ProbeSendFailure.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ProbeSendFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: ProbeSendFailure): boolean {
		const ret: boolean = bindings.ProbeSendFailure_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
/** A ProbeSendFailure of type RouteNotFound */
export class ProbeSendFailure_RouteNotFound extends ProbeSendFailure {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ProbeSendFailure of type ParameterError */
export class ProbeSendFailure_ParameterError extends ProbeSendFailure {
	public parameter_error: APIError;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const parameter_error: bigint = bindings.LDKProbeSendFailure_ParameterError_get_parameter_error(ptr);
		const parameter_error_hu_conv: APIError = APIError.constr_from_ptr(parameter_error);
			CommonBase.add_ref_from(parameter_error_hu_conv, this);
		this.parameter_error = parameter_error_hu_conv;
	}
}
/** A ProbeSendFailure of type DuplicateProbe */
export class ProbeSendFailure_DuplicateProbe extends ProbeSendFailure {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}

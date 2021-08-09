
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class PaymentSendFailure extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.PaymentSendFailure_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): PaymentSendFailure {
		const raw_val: bindings.LDKPaymentSendFailure = bindings.LDKPaymentSendFailure_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKPaymentSendFailure.ParameterError) {
			return new ParameterError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentSendFailure.PathParameterError) {
			return new PathParameterError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentSendFailure.AllFailedRetrySafe) {
			return new AllFailedRetrySafe(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKPaymentSendFailure.PartialFailure) {
			return new PartialFailure(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class ParameterError extends PaymentSendFailure {
	public parameter_error: APIError;
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.ParameterError) {
		super(null, ptr);
		const parameter_error: number = obj.parameter_error;
		APIError parameter_error_hu_conv = APIError.constr_from_ptr(parameter_error);
			parameter_error_hu_conv.ptrs_to.add(this);
		this.parameter_error = parameter_error_hu_conv;
	}
}
export class PathParameterError extends PaymentSendFailure {
	public path_parameter_error: Result_NoneAPIErrorZ[];
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.PathParameterError) {
		super(null, ptr);
		const path_parameter_error: number[] = obj.path_parameter_error;
		Result_NoneAPIErrorZ[] path_parameter_error_conv_22_arr = new Result_NoneAPIErrorZ[path_parameter_error.length];
			for (int w = 0; w < path_parameter_error.length; w++) {
				number path_parameter_error_conv_22 = path_parameter_error[w];
				Result_NoneAPIErrorZ path_parameter_error_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(path_parameter_error_conv_22);
				path_parameter_error_conv_22_arr[w] = path_parameter_error_conv_22_hu_conv;
			}
		this.path_parameter_error = path_parameter_error_conv_22_arr;
	}
}
export class AllFailedRetrySafe extends PaymentSendFailure {
	public all_failed_retry_safe: APIError[];
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.AllFailedRetrySafe) {
		super(null, ptr);
		const all_failed_retry_safe: number[] = obj.all_failed_retry_safe;
		APIError[] all_failed_retry_safe_conv_10_arr = new APIError[all_failed_retry_safe.length];
			for (int k = 0; k < all_failed_retry_safe.length; k++) {
				number all_failed_retry_safe_conv_10 = all_failed_retry_safe[k];
				APIError all_failed_retry_safe_conv_10_hu_conv = APIError.constr_from_ptr(all_failed_retry_safe_conv_10);
				all_failed_retry_safe_conv_10_hu_conv.ptrs_to.add(this);
				all_failed_retry_safe_conv_10_arr[k] = all_failed_retry_safe_conv_10_hu_conv;
			}
		this.all_failed_retry_safe = all_failed_retry_safe_conv_10_arr;
	}
}
export class PartialFailure extends PaymentSendFailure {
	public partial_failure: Result_NoneAPIErrorZ[];
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.PartialFailure) {
		super(null, ptr);
		const partial_failure: number[] = obj.partial_failure;
		Result_NoneAPIErrorZ[] partial_failure_conv_22_arr = new Result_NoneAPIErrorZ[partial_failure.length];
			for (int w = 0; w < partial_failure.length; w++) {
				number partial_failure_conv_22 = partial_failure[w];
				Result_NoneAPIErrorZ partial_failure_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(partial_failure_conv_22);
				partial_failure_conv_22_arr[w] = partial_failure_conv_22_hu_conv;
			}
		this.partial_failure = partial_failure_conv_22_arr;
	}
}
	public PaymentSendFailure clone() {
		number ret = bindings.PaymentSendFailure_clone(this.ptr);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_parameter_error(APIError a) {
		number ret = bindings.PaymentSendFailure_parameter_error(a.ptr);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_path_parameter_error(Result_NoneAPIErrorZ[] a) {
		number ret = bindings.PaymentSendFailure_path_parameter_error(a != null ? Arrays.stream(a).map(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray(number[]::new) : null);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 Result_NoneAPIErrorZ  */;
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_all_failed_retry_safe(APIError[] a) {
		number ret = bindings.PaymentSendFailure_all_failed_retry_safe(a != null ? Arrays.stream(a).map(a_conv_10 -> a_conv_10.ptr).toArray(number[]::new) : null);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 APIError  */;
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_partial_failure(Result_NoneAPIErrorZ[] a) {
		number ret = bindings.PaymentSendFailure_partial_failure(a != null ? Arrays.stream(a).map(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray(number[]::new) : null);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 Result_NoneAPIErrorZ  */;
		return ret_hu_conv;
	}

}

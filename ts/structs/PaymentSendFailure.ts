
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
	public results: Result_NoneAPIErrorZ[];
	public failed_paths_retry: RouteParameters;
	public payment_id: Uint8Array;
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.PartialFailure) {
		super(null, ptr);
		const results: number[] = obj.results;
		Result_NoneAPIErrorZ[] results_conv_22_arr = new Result_NoneAPIErrorZ[results.length];
			for (int w = 0; w < results.length; w++) {
				number results_conv_22 = results[w];
				Result_NoneAPIErrorZ results_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(results_conv_22);
				results_conv_22_arr[w] = results_conv_22_hu_conv;
			}
		this.results = results_conv_22_arr;
		const failed_paths_retry: number = obj.failed_paths_retry;
		const failed_paths_retry_hu_conv: RouteParameters = new RouteParameters(null, failed_paths_retry);
			failed_paths_retry_hu_conv.ptrs_to.add(this);
		this.failed_paths_retry = failed_paths_retry_hu_conv;
		this.payment_id = obj.payment_id;
	}
}
	public number clone_ptr() {
		number ret = bindings.PaymentSendFailure_clone_ptr(this.ptr);
		return ret;
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
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_all_failed_retry_safe(APIError[] a) {
		number ret = bindings.PaymentSendFailure_all_failed_retry_safe(a != null ? Arrays.stream(a).map(a_conv_10 -> a_conv_10.ptr).toArray(number[]::new) : null);
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static PaymentSendFailure constructor_partial_failure(Result_NoneAPIErrorZ[] results, RouteParameters failed_paths_retry, Uint8Array payment_id) {
		number ret = bindings.PaymentSendFailure_partial_failure(results != null ? Arrays.stream(results).map(results_conv_22 -> results_conv_22 != null ? results_conv_22.ptr : 0).toArray(number[]::new) : null, failed_paths_retry == null ? 0 : failed_paths_retry.ptr & ~1, InternalUtils.check_arr_len(payment_id, 32));
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

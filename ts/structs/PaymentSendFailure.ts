
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
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.ParameterError) {
		super(null, ptr);
	}
}
export class PathParameterError extends PaymentSendFailure {
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.PathParameterError) {
		super(null, ptr);
	}
}
export class AllFailedRetrySafe extends PaymentSendFailure {
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.AllFailedRetrySafe) {
		super(null, ptr);
	}
}
export class PartialFailure extends PaymentSendFailure {
	private constructor(ptr: number, obj: bindings.LDKPaymentSendFailure.PartialFailure) {
		super(null, ptr);
	}
}

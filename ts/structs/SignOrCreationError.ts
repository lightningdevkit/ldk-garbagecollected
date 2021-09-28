
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class SignOrCreationError extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.SignOrCreationError_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): SignOrCreationError {
		const raw_val: bindings.LDKSignOrCreationError = bindings.LDKSignOrCreationError_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKSignOrCreationError.SignError) {
			return new SignError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKSignOrCreationError.CreationError) {
			return new CreationError(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class SignError extends SignOrCreationError {
	private constructor(ptr: number, obj: bindings.LDKSignOrCreationError.SignError) {
		super(null, ptr);
	}
}
export class CreationError extends SignOrCreationError {
	public creation_error: CreationError;
	private constructor(ptr: number, obj: bindings.LDKSignOrCreationError.CreationError) {
		super(null, ptr);
		this.creation_error = obj.creation_error;
	}
}
	public SignOrCreationError clone() {
		number ret = bindings.SignOrCreationError_clone(this.ptr);
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static SignOrCreationError constructor_sign_error() {
		number ret = bindings.SignOrCreationError_sign_error();
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static SignOrCreationError constructor_creation_error(CreationError a) {
		number ret = bindings.SignOrCreationError_creation_error(a);
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public boolean eq(SignOrCreationError b) {
		boolean ret = bindings.SignOrCreationError_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		return ret;
	}

	public String to_str() {
		String ret = bindings.SignOrCreationError_to_str(this.ptr);
		return ret;
	}

}

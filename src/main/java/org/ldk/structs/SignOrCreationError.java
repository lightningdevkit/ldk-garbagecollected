package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * When signing using a fallible method either an user-supplied `SignError` or a `CreationError`
 * may occur.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SignOrCreationError extends CommonBase {
	private SignOrCreationError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SignOrCreationError_free(ptr); }
	}
	static SignOrCreationError constr_from_ptr(long ptr) {
		bindings.LDKSignOrCreationError raw_val = bindings.LDKSignOrCreationError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSignOrCreationError.SignError.class) {
			return new SignError(ptr, (bindings.LDKSignOrCreationError.SignError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSignOrCreationError.CreationError.class) {
			return new CreationError(ptr, (bindings.LDKSignOrCreationError.CreationError)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class SignError extends SignOrCreationError {
		private SignError(long ptr, bindings.LDKSignOrCreationError.SignError obj) {
			super(null, ptr);
		}
	}
	public final static class CreationError extends SignOrCreationError {
		public final org.ldk.enums.CreationError creation_error;
		private CreationError(long ptr, bindings.LDKSignOrCreationError.CreationError obj) {
			super(null, ptr);
			this.creation_error = obj.creation_error;
		}
	}
	/**
	 * Creates a copy of the SignOrCreationError
	 */
	public SignOrCreationError clone() {
		long ret = bindings.SignOrCreationError_clone(this.ptr);
		if (ret < 1024) { return null; }
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SignError-variant SignOrCreationError
	 */
	public static SignOrCreationError sign_error() {
		long ret = bindings.SignOrCreationError_sign_error();
		if (ret < 1024) { return null; }
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CreationError-variant SignOrCreationError
	 */
	public static SignOrCreationError creation_error(org.ldk.enums.CreationError a) {
		long ret = bindings.SignOrCreationError_creation_error(a);
		if (ret < 1024) { return null; }
		SignOrCreationError ret_hu_conv = SignOrCreationError.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two SignOrCreationErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(SignOrCreationError b) {
		boolean ret = bindings.SignOrCreationError_eq(this.ptr, b == null ? 0 : b.ptr & ~1);
		return ret;
	}

	/**
	 * Get the string representation of a SignOrCreationError object
	 */
	public String to_str() {
		String ret = bindings.SignOrCreationError_to_str(this.ptr);
		return ret;
	}

}

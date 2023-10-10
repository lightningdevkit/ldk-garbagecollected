using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * When signing using a fallible method either an user-supplied `SignError` or a [`CreationError`]
 * may occur.
 */
public class SignOrCreationError : CommonBase {
	protected SignOrCreationError(object _dummy, long ptr) : base(ptr) { }
	~SignOrCreationError() {
		if (ptr != 0) { bindings.SignOrCreationError_free(ptr); }
	}

	internal static SignOrCreationError constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKSignOrCreationError_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SignOrCreationError_SignError(ptr);
			case 1: return new SignOrCreationError_CreationError(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A SignOrCreationError of type SignError */
	public class SignOrCreationError_SignError : SignOrCreationError {
		internal SignOrCreationError_SignError(long ptr) : base(null, ptr) {
		}
	}
	/** A SignOrCreationError of type CreationError */
	public class SignOrCreationError_CreationError : SignOrCreationError {
		public CreationError creation_error;
		internal SignOrCreationError_CreationError(long ptr) : base(null, ptr) {
			this.creation_error = bindings.LDKSignOrCreationError_CreationError_get_creation_error(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.SignOrCreationError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SignOrCreationError
	 */
	public SignOrCreationError clone() {
		long ret = bindings.SignOrCreationError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignOrCreationError ret_hu_conv = org.ldk.structs.SignOrCreationError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SignError-variant SignOrCreationError
	 */
	public static SignOrCreationError sign_error() {
		long ret = bindings.SignOrCreationError_sign_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignOrCreationError ret_hu_conv = org.ldk.structs.SignOrCreationError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CreationError-variant SignOrCreationError
	 */
	public static SignOrCreationError creation_error(CreationError a) {
		long ret = bindings.SignOrCreationError_creation_error(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SignOrCreationError ret_hu_conv = org.ldk.structs.SignOrCreationError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SignOrCreationErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.SignOrCreationError b) {
		bool ret = bindings.SignOrCreationError_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SignOrCreationError)) return false;
		return this.eq((SignOrCreationError)o);
	}
	/**
	 * Get the string representation of a SignOrCreationError object
	 */
	public string to_str() {
		string ret = bindings.SignOrCreationError_to_str(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }

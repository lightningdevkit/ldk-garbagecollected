using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Errors that indicate what is wrong with the invoice. They have some granularity for debug
 * reasons, but should generally result in an \"invalid BOLT11 invoice\" message for the user.
 */
public class Bolt11ParseError : CommonBase {
	internal Bolt11ParseError(object _dummy, long ptr) : base(ptr) { }
	~Bolt11ParseError() {
		if (ptr != 0) { bindings.Bolt11ParseError_free(ptr); }
	}

	/**
	 * Checks if two Bolt11ParseErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Bolt11ParseError b) {
		bool ret = bindings.Bolt11ParseError_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Bolt11ParseError)) return false;
		return this.eq((Bolt11ParseError)o);
	}
	internal long clone_ptr() {
		long ret = bindings.Bolt11ParseError_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt11ParseError
	 */
	public org.ldk.structs.Bolt11ParseError clone() {
		long ret = bindings.Bolt11ParseError_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Bolt11ParseError object
	 */
	public string to_str() {
		long ret = bindings.Bolt11ParseError_to_str(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		string ret_conv = InternalUtils.decodeString(ret);
		return ret_conv;
	}

	/**
	 * Build a Bolt11ParseError from a Secp256k1Error
	 */
	public static org.ldk.structs.Bolt11ParseError from_Secp256k1Error(Secp256k1Error f) {
		long ret = bindings.Bolt11ParseError_from_Secp256k1Error(f);
		GC.KeepAlive(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Build a Bolt11ParseError from a Error
	 */
	public static org.ldk.structs.Bolt11ParseError from_Error(org.ldk.util.UnqualifiedError f) {
		long ret = bindings.Bolt11ParseError_from_Error(0);
		GC.KeepAlive(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Bolt11ParseError ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Bolt11ParseError(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

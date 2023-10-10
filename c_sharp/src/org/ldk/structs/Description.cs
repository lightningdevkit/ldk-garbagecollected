using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Description string
 * 
 * # Invariants
 * The description can be at most 639 __bytes__ long
 */
public class Description : CommonBase {
	internal Description(object _dummy, long ptr) : base(ptr) { }
	~Description() {
		if (ptr != 0) { bindings.Description_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.Description_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Description
	 */
	public Description clone() {
		long ret = bindings.Description_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Description ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Description(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Description.
	 */
	public long hash() {
		long ret = bindings.Description_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Descriptions contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Description b) {
		bool ret = bindings.Description_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Description)) return false;
		return this.eq((Description)o);
	}
	/**
	 * Creates a new `Description` if `description` is at most 1023 __bytes__ long,
	 * returns [`CreationError::DescriptionTooLong`] otherwise
	 * 
	 * Please note that single characters may use more than one byte due to UTF8 encoding.
	 */
	public static Result_DescriptionCreationErrorZ of(string description) {
		long ret = bindings.Description_new(description);
		GC.KeepAlive(description);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_DescriptionCreationErrorZ ret_hu_conv = Result_DescriptionCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the underlying description [`String`]
	 */
	public string into_inner() {
		string ret = bindings.Description_into_inner(this.ptr);
		GC.KeepAlive(this);
		if (this != null) { this.ptrs_to.AddLast(this); };
		return ret;
	}

}
} } }

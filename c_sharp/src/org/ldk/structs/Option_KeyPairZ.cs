using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::SecretKey or not
 */
public class Option_KeyPairZ : CommonBase {
	protected Option_KeyPairZ(object _dummy, long ptr) : base(ptr) { }
	~Option_KeyPairZ() {
		if (ptr != 0) { bindings.COption_KeyPairZ_free(ptr); }
	}

	internal static Option_KeyPairZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_KeyPairZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_KeyPairZ_Some(ptr);
			case 1: return new Option_KeyPairZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_KeyPairZ of type Some */
	public class Option_KeyPairZ_Some : Option_KeyPairZ {
		public byte[] some;
		internal Option_KeyPairZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_KeyPairZ_Some_get_some(ptr);
		}
	}
	/** A Option_KeyPairZ of type None */
	public class Option_KeyPairZ_None : Option_KeyPairZ {
		internal Option_KeyPairZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_KeyPairZ containing a crate::c_types::SecretKey
	 */
	public static Option_KeyPairZ some(byte[] o) {
		long ret = bindings.COption_KeyPairZ_some(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_KeyPairZ containing nothing
	 */
	public static Option_KeyPairZ none() {
		long ret = bindings.COption_KeyPairZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_KeyPairZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_KeyPairZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_KeyPairZ clone() {
		long ret = bindings.COption_KeyPairZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_KeyPairZ ret_hu_conv = org.ldk.structs.Option_KeyPairZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

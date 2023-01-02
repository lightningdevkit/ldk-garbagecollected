using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::BigEndianScalar or not
 */
public class Option_ScalarZ : CommonBase {
	protected Option_ScalarZ(object _dummy, long ptr) : base(ptr) { }
	~Option_ScalarZ() {
		if (ptr != 0) { bindings.COption_ScalarZ_free(ptr); }
	}

	internal static Option_ScalarZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_ScalarZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ScalarZ_Some(ptr);
			case 1: return new Option_ScalarZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_ScalarZ of type Some */
	public class Option_ScalarZ_Some : Option_ScalarZ {
		public BigEndianScalar some;
		internal Option_ScalarZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_ScalarZ_Some_get_some(ptr);
			BigEndianScalar some_conv = new BigEndianScalar(null, some);
			this.some = some_conv;
		}
	}
	/** A Option_ScalarZ of type None */
	public class Option_ScalarZ_None : Option_ScalarZ {
		internal Option_ScalarZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_ScalarZ containing a crate::c_types::BigEndianScalar
	 */
	public static Option_ScalarZ some(byte[] o_big_endian_bytes) {
		long ret = bindings.COption_ScalarZ_some(bindings.BigEndianScalar_new(InternalUtils.check_arr_len(o_big_endian_bytes, 32)));
		GC.KeepAlive(o_big_endian_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScalarZ ret_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		;
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ScalarZ containing nothing
	 */
	public static Option_ScalarZ none() {
		long ret = bindings.COption_ScalarZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScalarZ ret_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

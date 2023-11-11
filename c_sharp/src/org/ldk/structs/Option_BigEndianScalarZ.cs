using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::BigEndianScalar or not
 */
public class Option_BigEndianScalarZ : CommonBase {
	protected Option_BigEndianScalarZ(object _dummy, long ptr) : base(ptr) { }
	~Option_BigEndianScalarZ() {
		if (ptr != 0) { bindings.COption_BigEndianScalarZ_free(ptr); }
	}

	internal static Option_BigEndianScalarZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_BigEndianScalarZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_BigEndianScalarZ_Some(ptr);
			case 1: return new Option_BigEndianScalarZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_BigEndianScalarZ of type Some */
	public class Option_BigEndianScalarZ_Some : Option_BigEndianScalarZ {
		public BigEndianScalar some;
		internal Option_BigEndianScalarZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_BigEndianScalarZ_Some_get_some(ptr);
			BigEndianScalar some_conv = new BigEndianScalar(null, some);
			this.some = some_conv;
		}
	}
	/** A Option_BigEndianScalarZ of type None */
	public class Option_BigEndianScalarZ_None : Option_BigEndianScalarZ {
		internal Option_BigEndianScalarZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_BigEndianScalarZ containing a crate::c_types::BigEndianScalar
	 */
	public static Option_BigEndianScalarZ some(byte[] o_big_endian_bytes) {
		long ret = bindings.COption_BigEndianScalarZ_some(bindings.BigEndianScalar_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(o_big_endian_bytes, 32))));
		GC.KeepAlive(o_big_endian_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BigEndianScalarZ ret_hu_conv = org.ldk.structs.Option_BigEndianScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		;
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_BigEndianScalarZ containing nothing
	 */
	public static Option_BigEndianScalarZ none() {
		long ret = bindings.COption_BigEndianScalarZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BigEndianScalarZ ret_hu_conv = org.ldk.structs.Option_BigEndianScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_BigEndianScalarZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_BigEndianScalarZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_BigEndianScalarZ clone() {
		long ret = bindings.COption_BigEndianScalarZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BigEndianScalarZ ret_hu_conv = org.ldk.structs.Option_BigEndianScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

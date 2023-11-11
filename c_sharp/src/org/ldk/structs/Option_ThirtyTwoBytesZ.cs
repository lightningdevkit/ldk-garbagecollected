using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::ThirtyTwoBytes or not
 */
public class Option_ThirtyTwoBytesZ : CommonBase {
	protected Option_ThirtyTwoBytesZ(object _dummy, long ptr) : base(ptr) { }
	~Option_ThirtyTwoBytesZ() {
		if (ptr != 0) { bindings.COption_ThirtyTwoBytesZ_free(ptr); }
	}

	internal static Option_ThirtyTwoBytesZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_ThirtyTwoBytesZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ThirtyTwoBytesZ_Some(ptr);
			case 1: return new Option_ThirtyTwoBytesZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_ThirtyTwoBytesZ of type Some */
	public class Option_ThirtyTwoBytesZ_Some : Option_ThirtyTwoBytesZ {
		public byte[] some;
		internal Option_ThirtyTwoBytesZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_ThirtyTwoBytesZ_Some_get_some(ptr);
			byte[] some_conv = InternalUtils.decodeUint8Array(some);
			this.some = some_conv;
		}
	}
	/** A Option_ThirtyTwoBytesZ of type None */
	public class Option_ThirtyTwoBytesZ_None : Option_ThirtyTwoBytesZ {
		internal Option_ThirtyTwoBytesZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_ThirtyTwoBytesZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_ThirtyTwoBytesZ some(byte[] o) {
		long ret = bindings.COption_ThirtyTwoBytesZ_some(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(o, 32)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ThirtyTwoBytesZ containing nothing
	 */
	public static Option_ThirtyTwoBytesZ none() {
		long ret = bindings.COption_ThirtyTwoBytesZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_ThirtyTwoBytesZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_ThirtyTwoBytesZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ThirtyTwoBytesZ clone() {
		long ret = bindings.COption_ThirtyTwoBytesZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

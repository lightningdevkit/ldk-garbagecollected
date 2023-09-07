using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::TxOut or not
 */
public class Option_TxOutZ : CommonBase {
	protected Option_TxOutZ(object _dummy, long ptr) : base(ptr) { }
	~Option_TxOutZ() {
		if (ptr != 0) { bindings.COption_TxOutZ_free(ptr); }
	}

	internal static Option_TxOutZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_TxOutZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_TxOutZ_Some(ptr);
			case 1: return new Option_TxOutZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_TxOutZ of type Some */
	public class Option_TxOutZ_Some : Option_TxOutZ {
		public TxOut some;
		internal Option_TxOutZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_TxOutZ_Some_get_some(ptr);
			TxOut some_conv = new TxOut(null, some);
			this.some = some_conv;
		}
	}
	/** A Option_TxOutZ of type None */
	public class Option_TxOutZ_None : Option_TxOutZ {
		internal Option_TxOutZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_TxOutZ containing a crate::c_types::TxOut
	 */
	public static Option_TxOutZ some(org.ldk.structs.TxOut o) {
		long ret = bindings.COption_TxOutZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TxOutZ containing nothing
	 */
	public static Option_TxOutZ none() {
		long ret = bindings.COption_TxOutZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_TxOutZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_TxOutZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_TxOutZ clone() {
		long ret = bindings.COption_TxOutZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

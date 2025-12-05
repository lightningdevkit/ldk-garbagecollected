using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::chain::transaction::OutPoint or not
 */
public class Option_OutPointZ : CommonBase {
	protected Option_OutPointZ(object _dummy, long ptr) : base(ptr) { }
	~Option_OutPointZ() {
		if (ptr != 0) { bindings.COption_OutPointZ_free(ptr); }
	}

	internal static Option_OutPointZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_OutPointZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OutPointZ_Some(ptr);
			case 1: return new Option_OutPointZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_OutPointZ of type Some */
	public class Option_OutPointZ_Some : Option_OutPointZ {
		public org.ldk.structs.OutPoint some;
		internal Option_OutPointZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_OutPointZ_Some_get_some(ptr);
			org.ldk.structs.OutPoint some_hu_conv = null; if (some < 0 || some > 4096) { some_hu_conv = new org.ldk.structs.OutPoint(null, some); }
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_OutPointZ of type None */
	public class Option_OutPointZ_None : Option_OutPointZ {
		internal Option_OutPointZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_OutPointZ containing a crate::lightning::chain::transaction::OutPoint
	 */
	public static org.ldk.structs.Option_OutPointZ some(org.ldk.structs.OutPoint o) {
		long ret = bindings.COption_OutPointZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OutPointZ containing nothing
	 */
	public static org.ldk.structs.Option_OutPointZ none() {
		long ret = bindings.COption_OutPointZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_OutPointZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_OutPointZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Option_OutPointZ clone() {
		long ret = bindings.COption_OutPointZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

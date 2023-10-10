using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::routing::utxo::UtxoLookup or not
 */
public class Option_UtxoLookupZ : CommonBase {
	protected Option_UtxoLookupZ(object _dummy, long ptr) : base(ptr) { }
	~Option_UtxoLookupZ() {
		if (ptr != 0) { bindings.COption_UtxoLookupZ_free(ptr); }
	}

	internal static Option_UtxoLookupZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_UtxoLookupZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_UtxoLookupZ_Some(ptr);
			case 1: return new Option_UtxoLookupZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_UtxoLookupZ of type Some */
	public class Option_UtxoLookupZ_Some : Option_UtxoLookupZ {
		public UtxoLookup some;
		internal Option_UtxoLookupZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_UtxoLookupZ_Some_get_some(ptr);
			UtxoLookup ret_hu_conv = new UtxoLookup(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_UtxoLookupZ of type None */
	public class Option_UtxoLookupZ_None : Option_UtxoLookupZ {
		internal Option_UtxoLookupZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_UtxoLookupZ containing a crate::lightning::routing::utxo::UtxoLookup
	 */
	public static Option_UtxoLookupZ some(org.ldk.structs.UtxoLookup o) {
		long ret = bindings.COption_UtxoLookupZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_UtxoLookupZ ret_hu_conv = org.ldk.structs.Option_UtxoLookupZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_UtxoLookupZ containing nothing
	 */
	public static Option_UtxoLookupZ none() {
		long ret = bindings.COption_UtxoLookupZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_UtxoLookupZ ret_hu_conv = org.ldk.structs.Option_UtxoLookupZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

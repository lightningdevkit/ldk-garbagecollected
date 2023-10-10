using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::onion_message::offers::OffersMessage or not
 */
public class Option_OffersMessageZ : CommonBase {
	protected Option_OffersMessageZ(object _dummy, long ptr) : base(ptr) { }
	~Option_OffersMessageZ() {
		if (ptr != 0) { bindings.COption_OffersMessageZ_free(ptr); }
	}

	internal static Option_OffersMessageZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_OffersMessageZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OffersMessageZ_Some(ptr);
			case 1: return new Option_OffersMessageZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_OffersMessageZ of type Some */
	public class Option_OffersMessageZ_Some : Option_OffersMessageZ {
		public OffersMessage some;
		internal Option_OffersMessageZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_OffersMessageZ_Some_get_some(ptr);
			org.ldk.structs.OffersMessage some_hu_conv = org.ldk.structs.OffersMessage.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_OffersMessageZ of type None */
	public class Option_OffersMessageZ_None : Option_OffersMessageZ {
		internal Option_OffersMessageZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_OffersMessageZ containing a crate::lightning::onion_message::offers::OffersMessage
	 */
	public static Option_OffersMessageZ some(org.ldk.structs.OffersMessage o) {
		long ret = bindings.COption_OffersMessageZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OffersMessageZ containing nothing
	 */
	public static Option_OffersMessageZ none() {
		long ret = bindings.COption_OffersMessageZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_OffersMessageZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_OffersMessageZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_OffersMessageZ clone() {
		long ret = bindings.COption_OffersMessageZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OffersMessageZ ret_hu_conv = org.ldk.structs.Option_OffersMessageZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

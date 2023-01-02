using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::onion_message::packet::CustomOnionMessageContents or not
 */
public class Option_CustomOnionMessageContentsZ : CommonBase {
	protected Option_CustomOnionMessageContentsZ(object _dummy, long ptr) : base(ptr) { }
	~Option_CustomOnionMessageContentsZ() {
		if (ptr != 0) { bindings.COption_CustomOnionMessageContentsZ_free(ptr); }
	}

	internal static Option_CustomOnionMessageContentsZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_CustomOnionMessageContentsZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_CustomOnionMessageContentsZ_Some(ptr);
			case 1: return new Option_CustomOnionMessageContentsZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_CustomOnionMessageContentsZ of type Some */
	public class Option_CustomOnionMessageContentsZ_Some : Option_CustomOnionMessageContentsZ {
		public CustomOnionMessageContents some;
		internal Option_CustomOnionMessageContentsZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_CustomOnionMessageContentsZ_Some_get_some(ptr);
			CustomOnionMessageContents ret_hu_conv = new CustomOnionMessageContents(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_CustomOnionMessageContentsZ of type None */
	public class Option_CustomOnionMessageContentsZ_None : Option_CustomOnionMessageContentsZ {
		internal Option_CustomOnionMessageContentsZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_CustomOnionMessageContentsZ containing a crate::lightning::onion_message::packet::CustomOnionMessageContents
	 */
	public static Option_CustomOnionMessageContentsZ some(org.ldk.structs.CustomOnionMessageContents o) {
		long ret = bindings.COption_CustomOnionMessageContentsZ_some(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CustomOnionMessageContentsZ containing nothing
	 */
	public static Option_CustomOnionMessageContentsZ none() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_CustomOnionMessageContentsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CustomOnionMessageContentsZ clone() {
		long ret = bindings.COption_CustomOnionMessageContentsZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CustomOnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_CustomOnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

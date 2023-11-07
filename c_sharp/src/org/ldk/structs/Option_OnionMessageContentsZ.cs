using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::onion_message::packet::OnionMessageContents or not
 */
public class Option_OnionMessageContentsZ : CommonBase {
	protected Option_OnionMessageContentsZ(object _dummy, long ptr) : base(ptr) { }
	~Option_OnionMessageContentsZ() {
		if (ptr != 0) { bindings.COption_OnionMessageContentsZ_free(ptr); }
	}

	internal static Option_OnionMessageContentsZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_OnionMessageContentsZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_OnionMessageContentsZ_Some(ptr);
			case 1: return new Option_OnionMessageContentsZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_OnionMessageContentsZ of type Some */
	public class Option_OnionMessageContentsZ_Some : Option_OnionMessageContentsZ {
		public OnionMessageContents some;
		internal Option_OnionMessageContentsZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_OnionMessageContentsZ_Some_get_some(ptr);
			OnionMessageContents ret_hu_conv = new OnionMessageContents(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.some = ret_hu_conv;
		}
	}
	/** A Option_OnionMessageContentsZ of type None */
	public class Option_OnionMessageContentsZ_None : Option_OnionMessageContentsZ {
		internal Option_OnionMessageContentsZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_OnionMessageContentsZ containing a crate::lightning::onion_message::packet::OnionMessageContents
	 */
	public static Option_OnionMessageContentsZ some(org.ldk.structs.OnionMessageContents o) {
		long ret = bindings.COption_OnionMessageContentsZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OnionMessageContentsZ containing nothing
	 */
	public static Option_OnionMessageContentsZ none() {
		long ret = bindings.COption_OnionMessageContentsZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_OnionMessageContentsZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_OnionMessageContentsZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_OnionMessageContentsZ clone() {
		long ret = bindings.COption_OnionMessageContentsZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OnionMessageContentsZ ret_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

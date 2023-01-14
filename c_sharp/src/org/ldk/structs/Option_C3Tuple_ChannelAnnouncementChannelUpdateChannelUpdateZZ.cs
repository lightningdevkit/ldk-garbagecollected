using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::c_types::derived::C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ or not
 */
public class Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ : CommonBase {
	protected Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ(object _dummy, long ptr) : base(ptr) { }
	~Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ() {
		if (ptr != 0) { bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(ptr); }
	}

	internal static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_Some(ptr);
			case 1: return new Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ of type Some */
	public class Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_Some : Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ {
		public ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ some;
		internal Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_Some_get_some(ptr);
			ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ some_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ of type None */
	public class Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_None : Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ {
		internal Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ containing a crate::c_types::derived::C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ
	 */
	public static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ some(org.ldk.structs.ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ o) {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_some(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ containing nothing
	 */
	public static Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ none() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ clone() {
		long ret = bindings.COption_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_hu_conv = org.ldk.structs.Option_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::chain::channelmonitor::MonitorEvent or not
 */
public class Option_MonitorEventZ : CommonBase {
	protected Option_MonitorEventZ(object _dummy, long ptr) : base(ptr) { }
	~Option_MonitorEventZ() {
		if (ptr != 0) { bindings.COption_MonitorEventZ_free(ptr); }
	}

	internal static Option_MonitorEventZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_MonitorEventZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_MonitorEventZ_Some(ptr);
			case 1: return new Option_MonitorEventZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_MonitorEventZ of type Some */
	public class Option_MonitorEventZ_Some : Option_MonitorEventZ {
		public MonitorEvent some;
		internal Option_MonitorEventZ_Some(long ptr) : base(null, ptr) {
			long some = bindings.LDKCOption_MonitorEventZ_Some_get_some(ptr);
			org.ldk.structs.MonitorEvent some_hu_conv = org.ldk.structs.MonitorEvent.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.AddLast(this); };
			this.some = some_hu_conv;
		}
	}
	/** A Option_MonitorEventZ of type None */
	public class Option_MonitorEventZ_None : Option_MonitorEventZ {
		internal Option_MonitorEventZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_MonitorEventZ containing a crate::lightning::chain::channelmonitor::MonitorEvent
	 */
	public static Option_MonitorEventZ some(org.ldk.structs.MonitorEvent o) {
		long ret = bindings.COption_MonitorEventZ_some(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MonitorEventZ ret_hu_conv = org.ldk.structs.Option_MonitorEventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MonitorEventZ containing nothing
	 */
	public static Option_MonitorEventZ none() {
		long ret = bindings.COption_MonitorEventZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MonitorEventZ ret_hu_conv = org.ldk.structs.Option_MonitorEventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_MonitorEventZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_MonitorEventZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_MonitorEventZ clone() {
		long ret = bindings.COption_MonitorEventZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MonitorEventZ ret_hu_conv = org.ldk.structs.Option_MonitorEventZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

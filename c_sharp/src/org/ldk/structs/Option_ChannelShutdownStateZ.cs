using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * An enum which can either contain a crate::lightning::ln::channelmanager::ChannelShutdownState or not
 */
public class Option_ChannelShutdownStateZ : CommonBase {
	protected Option_ChannelShutdownStateZ(object _dummy, long ptr) : base(ptr) { }
	~Option_ChannelShutdownStateZ() {
		if (ptr != 0) { bindings.COption_ChannelShutdownStateZ_free(ptr); }
	}

	internal static Option_ChannelShutdownStateZ constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKCOption_ChannelShutdownStateZ_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Option_ChannelShutdownStateZ_Some(ptr);
			case 1: return new Option_ChannelShutdownStateZ_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Option_ChannelShutdownStateZ of type Some */
	public class Option_ChannelShutdownStateZ_Some : Option_ChannelShutdownStateZ {
		public ChannelShutdownState some;
		internal Option_ChannelShutdownStateZ_Some(long ptr) : base(null, ptr) {
			this.some = bindings.LDKCOption_ChannelShutdownStateZ_Some_get_some(ptr);
		}
	}
	/** A Option_ChannelShutdownStateZ of type None */
	public class Option_ChannelShutdownStateZ_None : Option_ChannelShutdownStateZ {
		internal Option_ChannelShutdownStateZ_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing a crate::lightning::ln::channelmanager::ChannelShutdownState
	 */
	public static Option_ChannelShutdownStateZ some(ChannelShutdownState o) {
		long ret = bindings.COption_ChannelShutdownStateZ_some(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ChannelShutdownStateZ containing nothing
	 */
	public static Option_ChannelShutdownStateZ none() {
		long ret = bindings.COption_ChannelShutdownStateZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.COption_ChannelShutdownStateZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new COption_ChannelShutdownStateZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ChannelShutdownStateZ clone() {
		long ret = bindings.COption_ChannelShutdownStateZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ChannelShutdownStateZ ret_hu_conv = org.ldk.structs.Option_ChannelShutdownStateZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

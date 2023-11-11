using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_OnionMessageContentsDestinationBlindedPathZ : CommonBase {
	internal ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_OnionMessageContentsDestinationBlindedPathZ() {
		if (ptr != 0) { bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_free(ptr); }
	}

	/**
	 * 
	 */
	public OnionMessageContents get_a() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public Destination get_b() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Destination ret_hu_conv = org.ldk.structs.Destination.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public BlindedPath get_c() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedPath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedPath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_OnionMessageContentsDestinationBlindedPathZ clone() {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionMessageContentsDestinationBlindedPathZ ret_hu_conv = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_OnionMessageContentsDestinationBlindedPathZ from the contained elements.
	 */
	public static ThreeTuple_OnionMessageContentsDestinationBlindedPathZ of(org.ldk.structs.OnionMessageContents a, org.ldk.structs.Destination b, org.ldk.structs.BlindedPath c) {
		long ret = bindings.C3Tuple_OnionMessageContentsDestinationBlindedPathZ_new(a.ptr, b.ptr, c == null ? 0 : c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_OnionMessageContentsDestinationBlindedPathZ ret_hu_conv = new ThreeTuple_OnionMessageContentsDestinationBlindedPathZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(c); };
		return ret_hu_conv;
	}

}
} } }

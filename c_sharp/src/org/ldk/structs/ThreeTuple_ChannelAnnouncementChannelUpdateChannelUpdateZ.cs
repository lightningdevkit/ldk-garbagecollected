using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A Tuple
 */
public class ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ : CommonBase {
	internal ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(object _dummy, long ptr) : base(ptr) { }
	~ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ() {
		if (ptr != 0) { bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(ptr); }
	}

	/**
	 * 
	 */
	public ChannelAnnouncement get_a() {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_a(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelAnnouncement ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelAnnouncement(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public ChannelUpdate get_b() {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_b(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * 
	 */
	public ChannelUpdate get_c() {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_get_c(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new tuple which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ clone() {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ from the contained elements.
	 */
	public static ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ of(org.ldk.structs.ChannelAnnouncement a, org.ldk.structs.ChannelUpdate b, org.ldk.structs.ChannelUpdate c) {
		long ret = bindings.C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a == null ? 0 : a.ptr, b == null ? 0 : b.ptr, c == null ? 0 : c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret_hu_conv = new ThreeTuple_ChannelAnnouncementChannelUpdateChannelUpdateZ(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(c); };
		return ret_hu_conv;
	}

}
} } }

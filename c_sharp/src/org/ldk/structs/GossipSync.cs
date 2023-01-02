using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Either [`P2PGossipSync`] or [`RapidGossipSync`].
 */
public class GossipSync : CommonBase {
	protected GossipSync(object _dummy, long ptr) : base(ptr) { }
	~GossipSync() {
		if (ptr != 0) { bindings.GossipSync_free(ptr); }
	}

	internal static GossipSync constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKGossipSync_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new GossipSync_P2P(ptr);
			case 1: return new GossipSync_Rapid(ptr);
			case 2: return new GossipSync_None(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A GossipSync of type P2P */
	public class GossipSync_P2P : GossipSync {
		public P2PGossipSync p2p;
		internal GossipSync_P2P(long ptr) : base(null, ptr) {
			long p2p = bindings.LDKGossipSync_P2P_get_p2p(ptr);
			org.ldk.structs.P2PGossipSync p2p_hu_conv = null; if (p2p < 0 || p2p > 4096) { p2p_hu_conv = new org.ldk.structs.P2PGossipSync(null, p2p); }
			if (p2p_hu_conv != null) { p2p_hu_conv.ptrs_to.AddLast(this); };
			this.p2p = p2p_hu_conv;
		}
	}
	/** A GossipSync of type Rapid */
	public class GossipSync_Rapid : GossipSync {
		public RapidGossipSync rapid;
		internal GossipSync_Rapid(long ptr) : base(null, ptr) {
			long rapid = bindings.LDKGossipSync_Rapid_get_rapid(ptr);
			org.ldk.structs.RapidGossipSync rapid_hu_conv = null; if (rapid < 0 || rapid > 4096) { rapid_hu_conv = new org.ldk.structs.RapidGossipSync(null, rapid); }
			if (rapid_hu_conv != null) { rapid_hu_conv.ptrs_to.AddLast(this); };
			this.rapid = rapid_hu_conv;
		}
	}
	/** A GossipSync of type None */
	public class GossipSync_None : GossipSync {
		internal GossipSync_None(long ptr) : base(null, ptr) {
		}
	}
	/**
	 * Utility method to constructs a new P2P-variant GossipSync
	 */
	public static GossipSync p2_p(org.ldk.structs.P2PGossipSync a) {
		long ret = bindings.GossipSync_p2_p(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Rapid-variant GossipSync
	 */
	public static GossipSync rapid(org.ldk.structs.RapidGossipSync a) {
		long ret = bindings.GossipSync_rapid(a == null ? 0 : a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new None-variant GossipSync
	 */
	public static GossipSync none() {
		long ret = bindings.GossipSync_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

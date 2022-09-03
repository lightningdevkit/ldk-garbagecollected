package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Either [`P2PGossipSync`] or [`RapidGossipSync`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class GossipSync extends CommonBase {
	private GossipSync(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.GossipSync_free(ptr); }
	}
	static GossipSync constr_from_ptr(long ptr) {
		bindings.LDKGossipSync raw_val = bindings.LDKGossipSync_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKGossipSync.P2P.class) {
			return new P2P(ptr, (bindings.LDKGossipSync.P2P)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKGossipSync.Rapid.class) {
			return new Rapid(ptr, (bindings.LDKGossipSync.Rapid)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKGossipSync.None.class) {
			return new None(ptr, (bindings.LDKGossipSync.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Gossip sync via the lightning peer-to-peer network as defined by BOLT 7.
	 */
	public final static class P2P extends GossipSync {
		public final org.ldk.structs.P2PGossipSync p2p;
		private P2P(long ptr, bindings.LDKGossipSync.P2P obj) {
			super(null, ptr);
			long p2p = obj.p2p;
			org.ldk.structs.P2PGossipSync p2p_hu_conv = null; if (p2p < 0 || p2p > 4096) { p2p_hu_conv = new org.ldk.structs.P2PGossipSync(null, p2p); }
			if (p2p_hu_conv != null) { p2p_hu_conv.ptrs_to.add(this); };
			this.p2p = p2p_hu_conv;
		}
	}
	/**
	 * Rapid gossip sync from a trusted server.
	 */
	public final static class Rapid extends GossipSync {
		public final org.ldk.structs.RapidGossipSync rapid;
		private Rapid(long ptr, bindings.LDKGossipSync.Rapid obj) {
			super(null, ptr);
			long rapid = obj.rapid;
			org.ldk.structs.RapidGossipSync rapid_hu_conv = null; if (rapid < 0 || rapid > 4096) { rapid_hu_conv = new org.ldk.structs.RapidGossipSync(null, rapid); }
			if (rapid_hu_conv != null) { rapid_hu_conv.ptrs_to.add(this); };
			this.rapid = rapid_hu_conv;
		}
	}
	/**
	 * No gossip sync.
	 */
	public final static class None extends GossipSync {
		private None(long ptr, bindings.LDKGossipSync.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Utility method to constructs a new P2P-variant GossipSync
	 */
	public static GossipSync p2_p(P2PGossipSync a) {
		long ret = bindings.GossipSync_p2_p(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Rapid-variant GossipSync
	 */
	public static GossipSync rapid(RapidGossipSync a) {
		long ret = bindings.GossipSync_rapid(a == null ? 0 : a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new None-variant GossipSync
	 */
	public static GossipSync none() {
		long ret = bindings.GossipSync_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.GossipSync ret_hu_conv = org.ldk.structs.GossipSync.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

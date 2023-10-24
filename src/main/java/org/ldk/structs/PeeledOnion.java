package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A processed incoming onion message, containing either a Forward (another onion message)
 * or a Receive payload with decrypted contents.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PeeledOnion extends CommonBase {
	private PeeledOnion(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PeeledOnion_free(ptr); }
	}
	static PeeledOnion constr_from_ptr(long ptr) {
		bindings.LDKPeeledOnion raw_val = bindings.LDKPeeledOnion_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPeeledOnion.Forward.class) {
			return new Forward(ptr, (bindings.LDKPeeledOnion.Forward)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPeeledOnion.Receive.class) {
			return new Receive(ptr, (bindings.LDKPeeledOnion.Receive)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Forwarded onion, with the next node id and a new onion
	 */
	public final static class Forward extends PeeledOnion {
		public final byte[] _0;
		public final org.ldk.structs.OnionMessage _1;
		private Forward(long ptr, bindings.LDKPeeledOnion.Forward obj) {
			super(null, ptr);
			this._0 = obj._0;
			long _1 = obj._1;
			org.ldk.structs.OnionMessage _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.OnionMessage(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.add(this); };
			this._1 = _1_hu_conv;
		}
	}
	/**
	 * Received onion message, with decrypted contents, path_id, and reply path
	 */
	public final static class Receive extends PeeledOnion {
		public final org.ldk.structs.ParsedOnionMessageContents _0;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final byte[] _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.BlindedPath _2;
		private Receive(long ptr, bindings.LDKPeeledOnion.Receive obj) {
			super(null, ptr);
			long _0 = obj._0;
			org.ldk.structs.ParsedOnionMessageContents _0_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.add(this); };
			this._0 = _0_hu_conv;
			this._1 = obj._1;
			long _2 = obj._2;
			org.ldk.structs.BlindedPath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedPath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.add(this); };
			this._2 = _2_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.PeeledOnion_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeeledOnion
	 */
	public PeeledOnion clone() {
		long ret = bindings.PeeledOnion_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PeeledOnion
	 */
	public static PeeledOnion forward(byte[] a, org.ldk.structs.OnionMessage b) {
		long ret = bindings.PeeledOnion_forward(InternalUtils.check_arr_len(a, 33), b == null ? 0 : b.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(b); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant PeeledOnion
	 */
	public static PeeledOnion receive(org.ldk.structs.ParsedOnionMessageContents a, byte[] b, org.ldk.structs.BlindedPath c) {
		long ret = bindings.PeeledOnion_receive(a.ptr, InternalUtils.check_arr_len(b, 32), c == null ? 0 : c.ptr);
		Reference.reachabilityFence(a);
		Reference.reachabilityFence(b);
		Reference.reachabilityFence(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(c); };
		return ret_hu_conv;
	}

}

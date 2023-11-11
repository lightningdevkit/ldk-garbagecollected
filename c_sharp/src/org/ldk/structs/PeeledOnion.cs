using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A processed incoming onion message, containing either a Forward (another onion message)
 * or a Receive payload with decrypted contents.
 */
public class PeeledOnion : CommonBase {
	protected PeeledOnion(object _dummy, long ptr) : base(ptr) { }
	~PeeledOnion() {
		if (ptr != 0) { bindings.PeeledOnion_free(ptr); }
	}

	internal static PeeledOnion constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPeeledOnion_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PeeledOnion_Forward(ptr);
			case 1: return new PeeledOnion_Receive(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PeeledOnion of type Forward */
	public class PeeledOnion_Forward : PeeledOnion {
		public byte[] _0;
		public OnionMessage _1;
		internal PeeledOnion_Forward(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_Forward_get__0(ptr);
			byte[] _0_conv = InternalUtils.decodeUint8Array(_0);
			this._0 = _0_conv;
			long _1 = bindings.LDKPeeledOnion_Forward_get__1(ptr);
			org.ldk.structs.OnionMessage _1_hu_conv = null; if (_1 < 0 || _1 > 4096) { _1_hu_conv = new org.ldk.structs.OnionMessage(null, _1); }
			if (_1_hu_conv != null) { _1_hu_conv.ptrs_to.AddLast(this); };
			this._1 = _1_hu_conv;
		}
	}
	/** A PeeledOnion of type Receive */
	public class PeeledOnion_Receive : PeeledOnion {
		public ParsedOnionMessageContents _0;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public byte[] _1;
		/**
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public BlindedPath _2;
		internal PeeledOnion_Receive(long ptr) : base(null, ptr) {
			long _0 = bindings.LDKPeeledOnion_Receive_get__0(ptr);
			org.ldk.structs.ParsedOnionMessageContents _0_hu_conv = org.ldk.structs.ParsedOnionMessageContents.constr_from_ptr(_0);
			if (_0_hu_conv != null) { _0_hu_conv.ptrs_to.AddLast(this); };
			this._0 = _0_hu_conv;
			long _1 = bindings.LDKPeeledOnion_Receive_get__1(ptr);
			byte[] _1_conv = InternalUtils.decodeUint8Array(_1);
			this._1 = _1_conv;
			long _2 = bindings.LDKPeeledOnion_Receive_get__2(ptr);
			org.ldk.structs.BlindedPath _2_hu_conv = null; if (_2 < 0 || _2 > 4096) { _2_hu_conv = new org.ldk.structs.BlindedPath(null, _2); }
			if (_2_hu_conv != null) { _2_hu_conv.ptrs_to.AddLast(this); };
			this._2 = _2_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PeeledOnion_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PeeledOnion
	 */
	public PeeledOnion clone() {
		long ret = bindings.PeeledOnion_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Forward-variant PeeledOnion
	 */
	public static PeeledOnion forward(byte[] a, org.ldk.structs.OnionMessage b) {
		long ret = bindings.PeeledOnion_forward(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 33)), b == null ? 0 : b.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(b); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Receive-variant PeeledOnion
	 */
	public static PeeledOnion receive(org.ldk.structs.ParsedOnionMessageContents a, byte[] b, org.ldk.structs.BlindedPath c) {
		long ret = bindings.PeeledOnion_receive(a.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(b, 32)), c == null ? 0 : c.ptr);
		GC.KeepAlive(a);
		GC.KeepAlive(b);
		GC.KeepAlive(c);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PeeledOnion ret_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(c); };
		return ret_hu_conv;
	}

}
} } }

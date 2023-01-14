using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Simple structure sent back by `chain::Watch` when an HTLC from a forward channel is detected on
 * chain. Used to update the corresponding HTLC in the backward channel. Failing to pass the
 * preimage claim backward will lead to loss of funds.
 */
public class HTLCUpdate : CommonBase {
	internal HTLCUpdate(object _dummy, long ptr) : base(ptr) { }
	~HTLCUpdate() {
		if (ptr != 0) { bindings.HTLCUpdate_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.HTLCUpdate_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCUpdate
	 */
	public HTLCUpdate clone() {
		long ret = bindings.HTLCUpdate_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCUpdate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HTLCUpdate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.HTLCUpdate b) {
		bool ret = bindings.HTLCUpdate_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HTLCUpdate)) return false;
		return this.eq((HTLCUpdate)o);
	}
	/**
	 * Serialize the HTLCUpdate object into a byte array which can be read by HTLCUpdate_read
	 */
	public byte[] write() {
		byte[] ret = bindings.HTLCUpdate_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Read a HTLCUpdate from a byte array, created by HTLCUpdate_write
	 */
	public static Result_HTLCUpdateDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HTLCUpdate_read(ser);
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCUpdateDecodeErrorZ ret_hu_conv = Result_HTLCUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }

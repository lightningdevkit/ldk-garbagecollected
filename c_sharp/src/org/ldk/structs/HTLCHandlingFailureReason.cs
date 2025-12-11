using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The reason for HTLC failures in [`Event::HTLCHandlingFailed`].
 */
public class HTLCHandlingFailureReason : CommonBase {
	protected HTLCHandlingFailureReason(object _dummy, long ptr) : base(ptr) { }
	~HTLCHandlingFailureReason() {
		if (ptr != 0) { bindings.HTLCHandlingFailureReason_free(ptr); }
	}

	internal static HTLCHandlingFailureReason constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKHTLCHandlingFailureReason_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new HTLCHandlingFailureReason_Downstream(ptr);
			case 1: return new HTLCHandlingFailureReason_Local(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A HTLCHandlingFailureReason of type Downstream */
	public class HTLCHandlingFailureReason_Downstream : HTLCHandlingFailureReason {
		internal HTLCHandlingFailureReason_Downstream(long ptr) : base(null, ptr) {
		}
	}
	/** A HTLCHandlingFailureReason of type Local */
	public class HTLCHandlingFailureReason_Local : HTLCHandlingFailureReason {
		/**
		 * The reason that our node chose to fail the HTLC.
		 */
		public org.ldk.structs.LocalHTLCFailureReason reason;
		internal HTLCHandlingFailureReason_Local(long ptr) : base(null, ptr) {
			long reason = bindings.LDKHTLCHandlingFailureReason_Local_get_reason(ptr);
			org.ldk.structs.LocalHTLCFailureReason reason_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(reason);
			if (reason_hu_conv != null) { reason_hu_conv.ptrs_to.AddLast(this); };
			this.reason = reason_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.HTLCHandlingFailureReason_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the HTLCHandlingFailureReason
	 */
	public org.ldk.structs.HTLCHandlingFailureReason clone() {
		long ret = bindings.HTLCHandlingFailureReason_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Downstream-variant HTLCHandlingFailureReason
	 */
	public static org.ldk.structs.HTLCHandlingFailureReason downstream() {
		long ret = bindings.HTLCHandlingFailureReason_downstream();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Local-variant HTLCHandlingFailureReason
	 */
	public static org.ldk.structs.HTLCHandlingFailureReason local(org.ldk.structs.LocalHTLCFailureReason reason) {
		long ret = bindings.HTLCHandlingFailureReason_local(reason.ptr);
		GC.KeepAlive(reason);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two HTLCHandlingFailureReasons contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.HTLCHandlingFailureReason b) {
		bool ret = bindings.HTLCHandlingFailureReason_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is HTLCHandlingFailureReason)) return false;
		return this.eq((HTLCHandlingFailureReason)o);
	}
	/**
	 * Serialize the HTLCHandlingFailureReason object into a byte array which can be read by HTLCHandlingFailureReason_read
	 */
	public byte[] write() {
		long ret = bindings.HTLCHandlingFailureReason_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HTLCHandlingFailureReason from a byte array, created by HTLCHandlingFailureReason_write
	 */
	public static org.ldk.structs.Result_HTLCHandlingFailureReasonDecodeErrorZ read(byte[] ser) {
		long ret = bindings.HTLCHandlingFailureReason_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCHandlingFailureReasonDecodeErrorZ ret_hu_conv = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Build a HTLCHandlingFailureReason from a LocalHTLCFailureReason
	 */
	public static org.ldk.structs.HTLCHandlingFailureReason from_LocalHTLCFailureReason(org.ldk.structs.LocalHTLCFailureReason f) {
		long ret = bindings.HTLCHandlingFailureReason_from_LocalHTLCFailureReason(f.ptr);
		GC.KeepAlive(f);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HTLCHandlingFailureReason ret_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Result of successfully [sending an onion message].
 * 
 * [sending an onion message]: OnionMessenger::send_onion_message
 */
public class SendSuccess : CommonBase {
	protected SendSuccess(object _dummy, long ptr) : base(ptr) { }
	~SendSuccess() {
		if (ptr != 0) { bindings.SendSuccess_free(ptr); }
	}

	internal static SendSuccess constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKSendSuccess_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SendSuccess_Buffered(ptr);
			case 1: return new SendSuccess_BufferedAwaitingConnection(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A SendSuccess of type Buffered */
	public class SendSuccess_Buffered : SendSuccess {
		internal SendSuccess_Buffered(long ptr) : base(null, ptr) {
		}
	}
	/** A SendSuccess of type BufferedAwaitingConnection */
	public class SendSuccess_BufferedAwaitingConnection : SendSuccess {
		public byte[] buffered_awaiting_connection;
		internal SendSuccess_BufferedAwaitingConnection(long ptr) : base(null, ptr) {
			long buffered_awaiting_connection = bindings.LDKSendSuccess_BufferedAwaitingConnection_get_buffered_awaiting_connection(ptr);
			byte[] buffered_awaiting_connection_conv = InternalUtils.decodeUint8Array(buffered_awaiting_connection);
			this.buffered_awaiting_connection = buffered_awaiting_connection_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.SendSuccess_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SendSuccess
	 */
	public SendSuccess clone() {
		long ret = bindings.SendSuccess_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Buffered-variant SendSuccess
	 */
	public static SendSuccess buffered() {
		long ret = bindings.SendSuccess_buffered();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BufferedAwaitingConnection-variant SendSuccess
	 */
	public static SendSuccess buffered_awaiting_connection(byte[] a) {
		long ret = bindings.SendSuccess_buffered_awaiting_connection(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(a, 33)));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SendSuccesss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.SendSuccess b) {
		bool ret = bindings.SendSuccess_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is SendSuccess)) return false;
		return this.eq((SendSuccess)o);
	}
}
} } }

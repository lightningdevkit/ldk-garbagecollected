package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Result of successfully [sending an onion message].
 * 
 * [sending an onion message]: OnionMessenger::send_onion_message
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SendSuccess extends CommonBase {
	private SendSuccess(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SendSuccess_free(ptr); }
	}
	static SendSuccess constr_from_ptr(long ptr) {
		bindings.LDKSendSuccess raw_val = bindings.LDKSendSuccess_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSendSuccess.Buffered.class) {
			return new Buffered(ptr, (bindings.LDKSendSuccess.Buffered)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSendSuccess.BufferedAwaitingConnection.class) {
			return new BufferedAwaitingConnection(ptr, (bindings.LDKSendSuccess.BufferedAwaitingConnection)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The message was buffered and will be sent once it is processed by
	 * [`OnionMessageHandler::next_onion_message_for_peer`].
	 */
	public final static class Buffered extends SendSuccess {
		private Buffered(long ptr, bindings.LDKSendSuccess.Buffered obj) {
			super(null, ptr);
		}
	}
	/**
	 * The message was buffered and will be sent once the node is connected as a peer and it is
	 * processed by [`OnionMessageHandler::next_onion_message_for_peer`].
	 */
	public final static class BufferedAwaitingConnection extends SendSuccess {
		public final byte[] buffered_awaiting_connection;
		private BufferedAwaitingConnection(long ptr, bindings.LDKSendSuccess.BufferedAwaitingConnection obj) {
			super(null, ptr);
			this.buffered_awaiting_connection = obj.buffered_awaiting_connection;
		}
	}
	long clone_ptr() {
		long ret = bindings.SendSuccess_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SendSuccess
	 */
	public SendSuccess clone() {
		long ret = bindings.SendSuccess_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Buffered-variant SendSuccess
	 */
	public static SendSuccess buffered() {
		long ret = bindings.SendSuccess_buffered();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new BufferedAwaitingConnection-variant SendSuccess
	 */
	public static SendSuccess buffered_awaiting_connection(byte[] a) {
		long ret = bindings.SendSuccess_buffered_awaiting_connection(InternalUtils.check_arr_len(a, 33));
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SendSuccess ret_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two SendSuccesss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.SendSuccess b) {
		boolean ret = bindings.SendSuccess_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof SendSuccess)) return false;
		return this.eq((SendSuccess)o);
	}
}

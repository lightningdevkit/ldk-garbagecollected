package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Used to put an error message in a LightningError
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErrorAction extends CommonBase {
	private ErrorAction(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ErrorAction_free(ptr); }
	}
	static ErrorAction constr_from_ptr(long ptr) {
		bindings.LDKErrorAction raw_val = bindings.LDKErrorAction_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKErrorAction.DisconnectPeer.class) {
			return new DisconnectPeer(ptr, (bindings.LDKErrorAction.DisconnectPeer)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.IgnoreError.class) {
			return new IgnoreError(ptr, (bindings.LDKErrorAction.IgnoreError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.IgnoreAndLog.class) {
			return new IgnoreAndLog(ptr, (bindings.LDKErrorAction.IgnoreAndLog)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.IgnoreDuplicateGossip.class) {
			return new IgnoreDuplicateGossip(ptr, (bindings.LDKErrorAction.IgnoreDuplicateGossip)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.SendErrorMessage.class) {
			return new SendErrorMessage(ptr, (bindings.LDKErrorAction.SendErrorMessage)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.SendWarningMessage.class) {
			return new SendWarningMessage(ptr, (bindings.LDKErrorAction.SendWarningMessage)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The peer took some action which made us think they were useless. Disconnect them.
	 */
	public final static class DisconnectPeer extends ErrorAction {
		/**
		 * An error message which we should make an effort to send before we disconnect.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final ErrorMessage msg;
		private DisconnectPeer(long ptr, bindings.LDKErrorAction.DisconnectPeer obj) {
			super(null, ptr);
			long msg = obj.msg;
			ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ErrorMessage(null, msg); }
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	/**
	 * The peer did something harmless that we weren't able to process, just log and ignore
	 */
	public final static class IgnoreError extends ErrorAction {
		private IgnoreError(long ptr, bindings.LDKErrorAction.IgnoreError obj) {
			super(null, ptr);
		}
	}
	/**
	 * The peer did something harmless that we weren't able to meaningfully process.
	 * If the error is logged, log it at the given level.
	 */
	public final static class IgnoreAndLog extends ErrorAction {
		public final Level ignore_and_log;
		private IgnoreAndLog(long ptr, bindings.LDKErrorAction.IgnoreAndLog obj) {
			super(null, ptr);
			this.ignore_and_log = obj.ignore_and_log;
		}
	}
	/**
	 * The peer provided us with a gossip message which we'd already seen. In most cases this
	 * should be ignored, but it may result in the message being forwarded if it is a duplicate of
	 * our own channel announcements.
	 */
	public final static class IgnoreDuplicateGossip extends ErrorAction {
		private IgnoreDuplicateGossip(long ptr, bindings.LDKErrorAction.IgnoreDuplicateGossip obj) {
			super(null, ptr);
		}
	}
	/**
	 * The peer did something incorrect. Tell them.
	 */
	public final static class SendErrorMessage extends ErrorAction {
		/**
		 * The message to send.
		*/
		public final ErrorMessage msg;
		private SendErrorMessage(long ptr, bindings.LDKErrorAction.SendErrorMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new ErrorMessage(null, msg); }
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
		}
	}
	/**
	 * The peer did something incorrect. Tell them without closing any channels.
	 */
	public final static class SendWarningMessage extends ErrorAction {
		/**
		 * The message to send.
		*/
		public final WarningMessage msg;
		/**
		 * The peer may have done something harmless that we weren't able to meaningfully process,
		 * though we should still tell them about it.
		 * If this event is logged, log it at the given level.
		*/
		public final Level log_level;
		private SendWarningMessage(long ptr, bindings.LDKErrorAction.SendWarningMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			WarningMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new WarningMessage(null, msg); }
			msg_hu_conv.ptrs_to.add(this);
			this.msg = msg_hu_conv;
			this.log_level = obj.log_level;
		}
	}
	long clone_ptr() {
		long ret = bindings.ErrorAction_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ErrorAction
	 */
	public ErrorAction clone() {
		long ret = bindings.ErrorAction_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectPeer-variant ErrorAction
	 */
	public static ErrorAction disconnect_peer(ErrorMessage msg) {
		long ret = bindings.ErrorAction_disconnect_peer(msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreError-variant ErrorAction
	 */
	public static ErrorAction ignore_error() {
		long ret = bindings.ErrorAction_ignore_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreAndLog-variant ErrorAction
	 */
	public static ErrorAction ignore_and_log(org.ldk.enums.Level a) {
		long ret = bindings.ErrorAction_ignore_and_log(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreDuplicateGossip-variant ErrorAction
	 */
	public static ErrorAction ignore_duplicate_gossip() {
		long ret = bindings.ErrorAction_ignore_duplicate_gossip();
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendErrorMessage-variant ErrorAction
	 */
	public static ErrorAction send_error_message(ErrorMessage msg) {
		long ret = bindings.ErrorAction_send_error_message(msg == null ? 0 : msg.ptr & ~1);
		Reference.reachabilityFence(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendWarningMessage-variant ErrorAction
	 */
	public static ErrorAction send_warning_message(WarningMessage msg, org.ldk.enums.Level log_level) {
		long ret = bindings.ErrorAction_send_warning_message(msg == null ? 0 : msg.ptr & ~1, log_level);
		Reference.reachabilityFence(msg);
		Reference.reachabilityFence(log_level);
		if (ret >= 0 && ret <= 4096) { return null; }
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

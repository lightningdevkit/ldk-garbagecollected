using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Used to put an error message in a LightningError
 */
public class ErrorAction : CommonBase {
	protected ErrorAction(object _dummy, long ptr) : base(ptr) { }
	~ErrorAction() {
		if (ptr != 0) { bindings.ErrorAction_free(ptr); }
	}

	internal static ErrorAction constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKErrorAction_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ErrorAction_DisconnectPeer(ptr);
			case 1: return new ErrorAction_IgnoreError(ptr);
			case 2: return new ErrorAction_IgnoreAndLog(ptr);
			case 3: return new ErrorAction_IgnoreDuplicateGossip(ptr);
			case 4: return new ErrorAction_SendErrorMessage(ptr);
			case 5: return new ErrorAction_SendWarningMessage(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A ErrorAction of type DisconnectPeer */
	public class ErrorAction_DisconnectPeer : ErrorAction {
		/**
		 * An error message which we should make an effort to send before we disconnect.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public ErrorMessage msg;
		internal ErrorAction_DisconnectPeer(long ptr) : base(null, ptr) {
			long msg = bindings.LDKErrorAction_DisconnectPeer_get_msg(ptr);
			org.ldk.structs.ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ErrorMessage(null, msg); }
			if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.AddLast(this); };
			this.msg = msg_hu_conv;
		}
	}
	/** A ErrorAction of type IgnoreError */
	public class ErrorAction_IgnoreError : ErrorAction {
		internal ErrorAction_IgnoreError(long ptr) : base(null, ptr) {
		}
	}
	/** A ErrorAction of type IgnoreAndLog */
	public class ErrorAction_IgnoreAndLog : ErrorAction {
		public Level ignore_and_log;
		internal ErrorAction_IgnoreAndLog(long ptr) : base(null, ptr) {
			this.ignore_and_log = bindings.LDKErrorAction_IgnoreAndLog_get_ignore_and_log(ptr);
		}
	}
	/** A ErrorAction of type IgnoreDuplicateGossip */
	public class ErrorAction_IgnoreDuplicateGossip : ErrorAction {
		internal ErrorAction_IgnoreDuplicateGossip(long ptr) : base(null, ptr) {
		}
	}
	/** A ErrorAction of type SendErrorMessage */
	public class ErrorAction_SendErrorMessage : ErrorAction {
		/**
		 * The message to send.
		 */
		public ErrorMessage msg;
		internal ErrorAction_SendErrorMessage(long ptr) : base(null, ptr) {
			long msg = bindings.LDKErrorAction_SendErrorMessage_get_msg(ptr);
			org.ldk.structs.ErrorMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.ErrorMessage(null, msg); }
			if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.AddLast(this); };
			this.msg = msg_hu_conv;
		}
	}
	/** A ErrorAction of type SendWarningMessage */
	public class ErrorAction_SendWarningMessage : ErrorAction {
		/**
		 * The message to send.
		 */
		public WarningMessage msg;
		/**
		 * The peer may have done something harmless that we weren't able to meaningfully process,
		 * though we should still tell them about it.
		 * If this event is logged, log it at the given level.
		 */
		public Level log_level;
		internal ErrorAction_SendWarningMessage(long ptr) : base(null, ptr) {
			long msg = bindings.LDKErrorAction_SendWarningMessage_get_msg(ptr);
			org.ldk.structs.WarningMessage msg_hu_conv = null; if (msg < 0 || msg > 4096) { msg_hu_conv = new org.ldk.structs.WarningMessage(null, msg); }
			if (msg_hu_conv != null) { msg_hu_conv.ptrs_to.AddLast(this); };
			this.msg = msg_hu_conv;
			this.log_level = bindings.LDKErrorAction_SendWarningMessage_get_log_level(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.ErrorAction_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ErrorAction
	 */
	public ErrorAction clone() {
		long ret = bindings.ErrorAction_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectPeer-variant ErrorAction
	 */
	public static ErrorAction disconnect_peer(org.ldk.structs.ErrorMessage msg) {
		long ret = bindings.ErrorAction_disconnect_peer(msg == null ? 0 : msg.ptr);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreError-variant ErrorAction
	 */
	public static ErrorAction ignore_error() {
		long ret = bindings.ErrorAction_ignore_error();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreAndLog-variant ErrorAction
	 */
	public static ErrorAction ignore_and_log(Level a) {
		long ret = bindings.ErrorAction_ignore_and_log(a);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreDuplicateGossip-variant ErrorAction
	 */
	public static ErrorAction ignore_duplicate_gossip() {
		long ret = bindings.ErrorAction_ignore_duplicate_gossip();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendErrorMessage-variant ErrorAction
	 */
	public static ErrorAction send_error_message(org.ldk.structs.ErrorMessage msg) {
		long ret = bindings.ErrorAction_send_error_message(msg == null ? 0 : msg.ptr);
		GC.KeepAlive(msg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendWarningMessage-variant ErrorAction
	 */
	public static ErrorAction send_warning_message(org.ldk.structs.WarningMessage msg, Level log_level) {
		long ret = bindings.ErrorAction_send_warning_message(msg == null ? 0 : msg.ptr, log_level);
		GC.KeepAlive(msg);
		GC.KeepAlive(log_level);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ErrorAction ret_hu_conv = org.ldk.structs.ErrorAction.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(msg); };
		return ret_hu_conv;
	}

}
} } }

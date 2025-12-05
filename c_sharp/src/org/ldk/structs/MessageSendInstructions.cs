using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Instructions for how and where to send a message.
 */
public class MessageSendInstructions : CommonBase {
	protected MessageSendInstructions(object _dummy, long ptr) : base(ptr) { }
	~MessageSendInstructions() {
		if (ptr != 0) { bindings.MessageSendInstructions_free(ptr); }
	}

	internal static MessageSendInstructions constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKMessageSendInstructions_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MessageSendInstructions_WithSpecifiedReplyPath(ptr);
			case 1: return new MessageSendInstructions_WithReplyPath(ptr);
			case 2: return new MessageSendInstructions_WithoutReplyPath(ptr);
			case 3: return new MessageSendInstructions_ForReply(ptr);
			case 4: return new MessageSendInstructions_ForwardedMessage(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A MessageSendInstructions of type WithSpecifiedReplyPath */
	public class MessageSendInstructions_WithSpecifiedReplyPath : MessageSendInstructions {
		/**
		 * The destination where we need to send our message.
		 */
		public org.ldk.structs.Destination destination;
		/**
		 * The reply path which should be included in the message.
		 */
		public org.ldk.structs.BlindedMessagePath reply_path;
		internal MessageSendInstructions_WithSpecifiedReplyPath(long ptr) : base(null, ptr) {
			long destination = bindings.LDKMessageSendInstructions_WithSpecifiedReplyPath_get_destination(ptr);
			org.ldk.structs.Destination destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(destination);
			if (destination_hu_conv != null) { destination_hu_conv.ptrs_to.AddLast(this); };
			this.destination = destination_hu_conv;
			long reply_path = bindings.LDKMessageSendInstructions_WithSpecifiedReplyPath_get_reply_path(ptr);
			org.ldk.structs.BlindedMessagePath reply_path_hu_conv = null; if (reply_path < 0 || reply_path > 4096) { reply_path_hu_conv = new org.ldk.structs.BlindedMessagePath(null, reply_path); }
			if (reply_path_hu_conv != null) { reply_path_hu_conv.ptrs_to.AddLast(this); };
			this.reply_path = reply_path_hu_conv;
		}
	}
	/** A MessageSendInstructions of type WithReplyPath */
	public class MessageSendInstructions_WithReplyPath : MessageSendInstructions {
		/**
		 * The destination where we need to send our message.
		 */
		public org.ldk.structs.Destination destination;
		/**
		 * The context to include in the reply path we'll give the recipient so they can respond
		 * to us.
		 */
		public org.ldk.structs.MessageContext context;
		internal MessageSendInstructions_WithReplyPath(long ptr) : base(null, ptr) {
			long destination = bindings.LDKMessageSendInstructions_WithReplyPath_get_destination(ptr);
			org.ldk.structs.Destination destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(destination);
			if (destination_hu_conv != null) { destination_hu_conv.ptrs_to.AddLast(this); };
			this.destination = destination_hu_conv;
			long context = bindings.LDKMessageSendInstructions_WithReplyPath_get_context(ptr);
			org.ldk.structs.MessageContext context_hu_conv = org.ldk.structs.MessageContext.constr_from_ptr(context);
			if (context_hu_conv != null) { context_hu_conv.ptrs_to.AddLast(this); };
			this.context = context_hu_conv;
		}
	}
	/** A MessageSendInstructions of type WithoutReplyPath */
	public class MessageSendInstructions_WithoutReplyPath : MessageSendInstructions {
		/**
		 * The destination where we need to send our message.
		 */
		public org.ldk.structs.Destination destination;
		internal MessageSendInstructions_WithoutReplyPath(long ptr) : base(null, ptr) {
			long destination = bindings.LDKMessageSendInstructions_WithoutReplyPath_get_destination(ptr);
			org.ldk.structs.Destination destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(destination);
			if (destination_hu_conv != null) { destination_hu_conv.ptrs_to.AddLast(this); };
			this.destination = destination_hu_conv;
		}
	}
	/** A MessageSendInstructions of type ForReply */
	public class MessageSendInstructions_ForReply : MessageSendInstructions {
		/**
		 * The instructions provided by the [`Responder`].
		 */
		public org.ldk.structs.ResponseInstruction instructions;
		internal MessageSendInstructions_ForReply(long ptr) : base(null, ptr) {
			long instructions = bindings.LDKMessageSendInstructions_ForReply_get_instructions(ptr);
			org.ldk.structs.ResponseInstruction instructions_hu_conv = null; if (instructions < 0 || instructions > 4096) { instructions_hu_conv = new org.ldk.structs.ResponseInstruction(null, instructions); }
			if (instructions_hu_conv != null) { instructions_hu_conv.ptrs_to.AddLast(this); };
			this.instructions = instructions_hu_conv;
		}
	}
	/** A MessageSendInstructions of type ForwardedMessage */
	public class MessageSendInstructions_ForwardedMessage : MessageSendInstructions {
		/**
		 * The destination where we need to send the forwarded onion message.
		 */
		public org.ldk.structs.Destination destination;
		/**
		 * The reply path which should be included in the message, that terminates at the original
		 * sender of this forwarded message.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public org.ldk.structs.BlindedMessagePath reply_path;
		internal MessageSendInstructions_ForwardedMessage(long ptr) : base(null, ptr) {
			long destination = bindings.LDKMessageSendInstructions_ForwardedMessage_get_destination(ptr);
			org.ldk.structs.Destination destination_hu_conv = org.ldk.structs.Destination.constr_from_ptr(destination);
			if (destination_hu_conv != null) { destination_hu_conv.ptrs_to.AddLast(this); };
			this.destination = destination_hu_conv;
			long reply_path = bindings.LDKMessageSendInstructions_ForwardedMessage_get_reply_path(ptr);
			org.ldk.structs.BlindedMessagePath reply_path_hu_conv = null; if (reply_path < 0 || reply_path > 4096) { reply_path_hu_conv = new org.ldk.structs.BlindedMessagePath(null, reply_path); }
			if (reply_path_hu_conv != null) { reply_path_hu_conv.ptrs_to.AddLast(this); };
			this.reply_path = reply_path_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.MessageSendInstructions_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the MessageSendInstructions
	 */
	public org.ldk.structs.MessageSendInstructions clone() {
		long ret = bindings.MessageSendInstructions_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithSpecifiedReplyPath-variant MessageSendInstructions
	 */
	public static org.ldk.structs.MessageSendInstructions with_specified_reply_path(org.ldk.structs.Destination destination, org.ldk.structs.BlindedMessagePath reply_path) {
		long ret = bindings.MessageSendInstructions_with_specified_reply_path(destination.ptr, reply_path.ptr);
		GC.KeepAlive(destination);
		GC.KeepAlive(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithReplyPath-variant MessageSendInstructions
	 */
	public static org.ldk.structs.MessageSendInstructions with_reply_path(org.ldk.structs.Destination destination, org.ldk.structs.MessageContext context) {
		long ret = bindings.MessageSendInstructions_with_reply_path(destination.ptr, context.ptr);
		GC.KeepAlive(destination);
		GC.KeepAlive(context);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithoutReplyPath-variant MessageSendInstructions
	 */
	public static org.ldk.structs.MessageSendInstructions without_reply_path(org.ldk.structs.Destination destination) {
		long ret = bindings.MessageSendInstructions_without_reply_path(destination.ptr);
		GC.KeepAlive(destination);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForReply-variant MessageSendInstructions
	 */
	public static org.ldk.structs.MessageSendInstructions for_reply(org.ldk.structs.ResponseInstruction instructions) {
		long ret = bindings.MessageSendInstructions_for_reply(instructions.ptr);
		GC.KeepAlive(instructions);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForwardedMessage-variant MessageSendInstructions
	 */
	public static org.ldk.structs.MessageSendInstructions forwarded_message(org.ldk.structs.Destination destination, org.ldk.structs.BlindedMessagePath reply_path) {
		long ret = bindings.MessageSendInstructions_forwarded_message(destination.ptr, reply_path.ptr);
		GC.KeepAlive(destination);
		GC.KeepAlive(reply_path);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MessageSendInstructions ret_hu_conv = org.ldk.structs.MessageSendInstructions.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }

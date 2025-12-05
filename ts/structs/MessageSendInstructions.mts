
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Instructions for how and where to send a message.
 */
export class MessageSendInstructions extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.MessageSendInstructions_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): MessageSendInstructions {
		const raw_ty: number = bindings.LDKMessageSendInstructions_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new MessageSendInstructions_WithSpecifiedReplyPath(ptr);
			case 1: return new MessageSendInstructions_WithReplyPath(ptr);
			case 2: return new MessageSendInstructions_WithoutReplyPath(ptr);
			case 3: return new MessageSendInstructions_ForReply(ptr);
			case 4: return new MessageSendInstructions_ForwardedMessage(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.MessageSendInstructions_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the MessageSendInstructions
	 */
	public clone(): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_clone(this.ptr);
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithSpecifiedReplyPath-variant MessageSendInstructions
	 */
	public static constructor_with_specified_reply_path(destination: Destination, reply_path: BlindedMessagePath): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_with_specified_reply_path(CommonBase.get_ptr_of(destination), CommonBase.get_ptr_of(reply_path));
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithReplyPath-variant MessageSendInstructions
	 */
	public static constructor_with_reply_path(destination: Destination, context: MessageContext): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_with_reply_path(CommonBase.get_ptr_of(destination), CommonBase.get_ptr_of(context));
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new WithoutReplyPath-variant MessageSendInstructions
	 */
	public static constructor_without_reply_path(destination: Destination): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_without_reply_path(CommonBase.get_ptr_of(destination));
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForReply-variant MessageSendInstructions
	 */
	public static constructor_for_reply(instructions: ResponseInstruction): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_for_reply(CommonBase.get_ptr_of(instructions));
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ForwardedMessage-variant MessageSendInstructions
	 */
	public static constructor_forwarded_message(destination: Destination, reply_path: BlindedMessagePath): MessageSendInstructions {
		const ret: bigint = bindings.MessageSendInstructions_forwarded_message(CommonBase.get_ptr_of(destination), CommonBase.get_ptr_of(reply_path));
		const ret_hu_conv: MessageSendInstructions = MessageSendInstructions.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A MessageSendInstructions of type WithSpecifiedReplyPath */
export class MessageSendInstructions_WithSpecifiedReplyPath extends MessageSendInstructions {
	/**
	 * The destination where we need to send our message.
	 */
	public destination: Destination;
	/**
	 * The reply path which should be included in the message.
	 */
	public reply_path: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const destination: bigint = bindings.LDKMessageSendInstructions_WithSpecifiedReplyPath_get_destination(ptr);
		const destination_hu_conv: Destination = Destination.constr_from_ptr(destination);
			CommonBase.add_ref_from(destination_hu_conv, this);
		this.destination = destination_hu_conv;
		const reply_path: bigint = bindings.LDKMessageSendInstructions_WithSpecifiedReplyPath_get_reply_path(ptr);
		const reply_path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, reply_path);
			CommonBase.add_ref_from(reply_path_hu_conv, this);
		this.reply_path = reply_path_hu_conv;
	}
}
/** A MessageSendInstructions of type WithReplyPath */
export class MessageSendInstructions_WithReplyPath extends MessageSendInstructions {
	/**
	 * The destination where we need to send our message.
	 */
	public destination: Destination;
	/**
	 * The context to include in the reply path we'll give the recipient so they can respond
	 * to us.
	 */
	public context: MessageContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const destination: bigint = bindings.LDKMessageSendInstructions_WithReplyPath_get_destination(ptr);
		const destination_hu_conv: Destination = Destination.constr_from_ptr(destination);
			CommonBase.add_ref_from(destination_hu_conv, this);
		this.destination = destination_hu_conv;
		const context: bigint = bindings.LDKMessageSendInstructions_WithReplyPath_get_context(ptr);
		const context_hu_conv: MessageContext = MessageContext.constr_from_ptr(context);
			CommonBase.add_ref_from(context_hu_conv, this);
		this.context = context_hu_conv;
	}
}
/** A MessageSendInstructions of type WithoutReplyPath */
export class MessageSendInstructions_WithoutReplyPath extends MessageSendInstructions {
	/**
	 * The destination where we need to send our message.
	 */
	public destination: Destination;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const destination: bigint = bindings.LDKMessageSendInstructions_WithoutReplyPath_get_destination(ptr);
		const destination_hu_conv: Destination = Destination.constr_from_ptr(destination);
			CommonBase.add_ref_from(destination_hu_conv, this);
		this.destination = destination_hu_conv;
	}
}
/** A MessageSendInstructions of type ForReply */
export class MessageSendInstructions_ForReply extends MessageSendInstructions {
	/**
	 * The instructions provided by the [`Responder`].
	 */
	public instructions: ResponseInstruction;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const instructions: bigint = bindings.LDKMessageSendInstructions_ForReply_get_instructions(ptr);
		const instructions_hu_conv: ResponseInstruction = new ResponseInstruction(null, instructions);
			CommonBase.add_ref_from(instructions_hu_conv, this);
		this.instructions = instructions_hu_conv;
	}
}
/** A MessageSendInstructions of type ForwardedMessage */
export class MessageSendInstructions_ForwardedMessage extends MessageSendInstructions {
	/**
	 * The destination where we need to send the forwarded onion message.
	 */
	public destination: Destination;
	/**
	 * The reply path which should be included in the message, that terminates at the original
	 * sender of this forwarded message.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public reply_path: BlindedMessagePath;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const destination: bigint = bindings.LDKMessageSendInstructions_ForwardedMessage_get_destination(ptr);
		const destination_hu_conv: Destination = Destination.constr_from_ptr(destination);
			CommonBase.add_ref_from(destination_hu_conv, this);
		this.destination = destination_hu_conv;
		const reply_path: bigint = bindings.LDKMessageSendInstructions_ForwardedMessage_get_reply_path(ptr);
		const reply_path_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, reply_path);
			CommonBase.add_ref_from(reply_path_hu_conv, this);
		this.reply_path = reply_path_hu_conv;
	}
}

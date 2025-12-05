
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Used to put an error message in a [`LightningError`].
 */
export class ErrorAction extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.ErrorAction_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): ErrorAction {
		const raw_ty: number = bindings.LDKErrorAction_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new ErrorAction_DisconnectPeer(ptr);
			case 1: return new ErrorAction_DisconnectPeerWithWarning(ptr);
			case 2: return new ErrorAction_IgnoreError(ptr);
			case 3: return new ErrorAction_IgnoreAndLog(ptr);
			case 4: return new ErrorAction_IgnoreDuplicateGossip(ptr);
			case 5: return new ErrorAction_SendErrorMessage(ptr);
			case 6: return new ErrorAction_SendWarningMessage(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ErrorAction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ErrorAction
	 */
	public clone(): ErrorAction {
		const ret: bigint = bindings.ErrorAction_clone(this.ptr);
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectPeer-variant ErrorAction
	 */
	public static constructor_disconnect_peer(msg: ErrorMessage): ErrorAction {
		const ret: bigint = bindings.ErrorAction_disconnect_peer(CommonBase.get_ptr_of(msg));
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DisconnectPeerWithWarning-variant ErrorAction
	 */
	public static constructor_disconnect_peer_with_warning(msg: WarningMessage): ErrorAction {
		const ret: bigint = bindings.ErrorAction_disconnect_peer_with_warning(CommonBase.get_ptr_of(msg));
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreError-variant ErrorAction
	 */
	public static constructor_ignore_error(): ErrorAction {
		const ret: bigint = bindings.ErrorAction_ignore_error();
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreAndLog-variant ErrorAction
	 */
	public static constructor_ignore_and_log(a: Level): ErrorAction {
		const ret: bigint = bindings.ErrorAction_ignore_and_log(a);
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new IgnoreDuplicateGossip-variant ErrorAction
	 */
	public static constructor_ignore_duplicate_gossip(): ErrorAction {
		const ret: bigint = bindings.ErrorAction_ignore_duplicate_gossip();
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendErrorMessage-variant ErrorAction
	 */
	public static constructor_send_error_message(msg: ErrorMessage): ErrorAction {
		const ret: bigint = bindings.ErrorAction_send_error_message(CommonBase.get_ptr_of(msg));
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SendWarningMessage-variant ErrorAction
	 */
	public static constructor_send_warning_message(msg: WarningMessage, log_level: Level): ErrorAction {
		const ret: bigint = bindings.ErrorAction_send_warning_message(CommonBase.get_ptr_of(msg), log_level);
		const ret_hu_conv: ErrorAction = ErrorAction.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ErrorAction.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ErrorAction_hash(this.ptr);
		return ret;
	}

}
/** A ErrorAction of type DisconnectPeer */
export class ErrorAction_DisconnectPeer extends ErrorAction {
	/**
	 * An error message which we should make an effort to send before we disconnect.
	 * 
	 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public msg: ErrorMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKErrorAction_DisconnectPeer_get_msg(ptr);
		const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A ErrorAction of type DisconnectPeerWithWarning */
export class ErrorAction_DisconnectPeerWithWarning extends ErrorAction {
	/**
	 * A warning message which we should make an effort to send before we disconnect.
	 */
	public msg: WarningMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKErrorAction_DisconnectPeerWithWarning_get_msg(ptr);
		const msg_hu_conv: WarningMessage = new WarningMessage(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A ErrorAction of type IgnoreError */
export class ErrorAction_IgnoreError extends ErrorAction {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ErrorAction of type IgnoreAndLog */
export class ErrorAction_IgnoreAndLog extends ErrorAction {
	public ignore_and_log: Level;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.ignore_and_log = bindings.LDKErrorAction_IgnoreAndLog_get_ignore_and_log(ptr);
	}
}
/** A ErrorAction of type IgnoreDuplicateGossip */
export class ErrorAction_IgnoreDuplicateGossip extends ErrorAction {
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
	}
}
/** A ErrorAction of type SendErrorMessage */
export class ErrorAction_SendErrorMessage extends ErrorAction {
	/**
	 * The message to send.
	 */
	public msg: ErrorMessage;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKErrorAction_SendErrorMessage_get_msg(ptr);
		const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
	}
}
/** A ErrorAction of type SendWarningMessage */
export class ErrorAction_SendWarningMessage extends ErrorAction {
	/**
	 * The message to send.
	 */
	public msg: WarningMessage;
	/**
	 * The peer may have done something harmless that we weren't able to meaningfully process,
	 * though we should still tell them about it.
	 * If this event is logged, log it at the given level.
	 */
	public log_level: Level;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const msg: bigint = bindings.LDKErrorAction_SendWarningMessage_get_msg(ptr);
		const msg_hu_conv: WarningMessage = new WarningMessage(null, msg);
			CommonBase.add_ref_from(msg_hu_conv, this);
		this.msg = msg_hu_conv;
		this.log_level = bindings.LDKErrorAction_SendWarningMessage_get_log_level(ptr);
	}
}

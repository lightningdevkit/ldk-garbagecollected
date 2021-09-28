
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

export default class ErrorAction extends CommonBase {
	protected constructor(_dummy: object, ptr: number) { super(ptr); }
	protected finalize() {
		super.finalize();
		if (this.ptr != 0) { bindings.ErrorAction_free(this.ptr); }
	}
	static constr_from_ptr(ptr: number): ErrorAction {
		const raw_val: bindings.LDKErrorAction = bindings.LDKErrorAction_ref_from_ptr(ptr);
		if (raw_val instanceof bindings.LDKErrorAction.DisconnectPeer) {
			return new DisconnectPeer(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKErrorAction.IgnoreError) {
			return new IgnoreError(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKErrorAction.IgnoreAndLog) {
			return new IgnoreAndLog(this.ptr, raw_val);
		}
		if (raw_val instanceof bindings.LDKErrorAction.SendErrorMessage) {
			return new SendErrorMessage(this.ptr, raw_val);
		}
		throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
	}

}
export class DisconnectPeer extends ErrorAction {
	public msg: ErrorMessage;
	private constructor(ptr: number, obj: bindings.LDKErrorAction.DisconnectPeer) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
export class IgnoreError extends ErrorAction {
	private constructor(ptr: number, obj: bindings.LDKErrorAction.IgnoreError) {
		super(null, ptr);
	}
}
export class IgnoreAndLog extends ErrorAction {
	public ignore_and_log: Level;
	private constructor(ptr: number, obj: bindings.LDKErrorAction.IgnoreAndLog) {
		super(null, ptr);
		this.ignore_and_log = obj.ignore_and_log;
	}
}
export class SendErrorMessage extends ErrorAction {
	public msg: ErrorMessage;
	private constructor(ptr: number, obj: bindings.LDKErrorAction.SendErrorMessage) {
		super(null, ptr);
		const msg: number = obj.msg;
		const msg_hu_conv: ErrorMessage = new ErrorMessage(null, msg);
			msg_hu_conv.ptrs_to.add(this);
		this.msg = msg_hu_conv;
	}
}
	public ErrorAction clone() {
		number ret = bindings.ErrorAction_clone(this.ptr);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	public static ErrorAction constructor_disconnect_peer(ErrorMessage msg) {
		number ret = bindings.ErrorAction_disconnect_peer(msg == null ? 0 : msg.ptr & ~1);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ErrorAction constructor_ignore_error() {
		number ret = bindings.ErrorAction_ignore_error();
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ErrorAction constructor_ignore_and_log(Level a) {
		number ret = bindings.ErrorAction_ignore_and_log(a);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	public static ErrorAction constructor_send_error_message(ErrorMessage msg) {
		number ret = bindings.ErrorAction_send_error_message(msg == null ? 0 : msg.ptr & ~1);
		ErrorAction ret_hu_conv = ErrorAction.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}

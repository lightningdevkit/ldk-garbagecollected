package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
		if (raw_val.getClass() == bindings.LDKErrorAction.SendErrorMessage.class) {
			return new SendErrorMessage(ptr, (bindings.LDKErrorAction.SendErrorMessage)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class DisconnectPeer extends ErrorAction {
		public final ErrorMessage msg;
		private DisconnectPeer(long ptr, bindings.LDKErrorAction.DisconnectPeer obj) {
			super(null, ptr);
			long msg = obj.msg;
			ErrorMessage msg_hu_conv = new ErrorMessage(null, msg);
			this.msg = msg_hu_conv;
		}
	}
	public final static class IgnoreError extends ErrorAction {
		private IgnoreError(long ptr, bindings.LDKErrorAction.IgnoreError obj) {
			super(null, ptr);
		}
	}
	public final static class SendErrorMessage extends ErrorAction {
		public final ErrorMessage msg;
		private SendErrorMessage(long ptr, bindings.LDKErrorAction.SendErrorMessage obj) {
			super(null, ptr);
			long msg = obj.msg;
			ErrorMessage msg_hu_conv = new ErrorMessage(null, msg);
			this.msg = msg_hu_conv;
		}
	}
}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ErrorAction extends CommonBase {
	private ErrorAction(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static ErrorAction constr_from_ptr(long ptr) {
		bindings.LDKErrorAction raw_val = bindings.LDKErrorAction_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKErrorAction.DisconnectPeer.class) {
			return new DisconnectPeer(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.IgnoreError.class) {
			return new IgnoreError(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKErrorAction.SendErrorMessage.class) {
			return new SendErrorMessage(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class DisconnectPeer extends ErrorAction {
		public ErrorMessage msg;
		private DisconnectPeer(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class IgnoreError extends ErrorAction {
		private IgnoreError(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class SendErrorMessage extends ErrorAction {
		public ErrorMessage msg;
		private SendErrorMessage(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}

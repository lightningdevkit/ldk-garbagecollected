package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class PaymentSendFailure extends CommonBase {
	PaymentSendFailure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.PaymentSendFailure_free(ptr); super.finalize();
	}

}

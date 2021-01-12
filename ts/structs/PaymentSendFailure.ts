
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class PaymentSendFailure extends CommonBase {
	PaymentSendFailure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentSendFailure_free(ptr); }
	}

}

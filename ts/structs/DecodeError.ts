
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class DecodeError extends CommonBase {
	DecodeError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DecodeError_free(ptr); }
	}

}

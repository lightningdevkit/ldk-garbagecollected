
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class MonitorUpdateError extends CommonBase {
	MonitorUpdateError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorUpdateError_free(ptr); }
	}

}

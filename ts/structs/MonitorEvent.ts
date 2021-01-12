
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class MonitorEvent extends CommonBase {
	MonitorEvent(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MonitorEvent_free(ptr); }
	}

	public MonitorEvent clone() {
		uint32_t ret = bindings.MonitorEvent_clone(this.ptr);
		MonitorEvent ret_hu_conv = new MonitorEvent(null, ret);
		return ret_hu_conv;
	}

}

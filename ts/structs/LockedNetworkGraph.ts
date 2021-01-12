
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class LockedNetworkGraph extends CommonBase implements AutoCloseable {
	LockedNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		if (ptr != 0) { bindings.LockedNetworkGraph_free(ptr); }
	}

	public NetworkGraph graph() {
		uint32_t ret = bindings.LockedNetworkGraph_graph(this.ptr);
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		return ret_hu_conv;
	}

}

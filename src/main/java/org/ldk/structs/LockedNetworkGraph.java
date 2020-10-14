package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class LockedNetworkGraph extends CommonBase implements AutoCloseable {
	LockedNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		bindings.LockedNetworkGraph_free(ptr);
	}

	public NetworkGraph graph() {
		NetworkGraph ret = new NetworkGraph(null, bindings.LockedNetworkGraph_graph(this.ptr));
		return ret;
	}

}

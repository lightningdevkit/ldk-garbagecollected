package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class LockedNetworkGraph extends CommonBase {
	LockedNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.LockedNetworkGraph_free(ptr); super.finalize();
	}

	public NetworkGraph graph() {
		NetworkGraph ret = new NetworkGraph(null, bindings.LockedNetworkGraph_graph(this.ptr));
		return ret;
	}

}

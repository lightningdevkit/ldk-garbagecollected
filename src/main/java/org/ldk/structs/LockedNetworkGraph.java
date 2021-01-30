package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LockedNetworkGraph extends CommonBase implements AutoCloseable {
	LockedNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		if (ptr != 0) { bindings.LockedNetworkGraph_free(ptr); }
	}

	public NetworkGraph graph() {
		long ret = bindings.LockedNetworkGraph_graph(this.ptr);
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

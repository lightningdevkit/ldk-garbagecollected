package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A simple newtype for RwLockReadGuard<'a, NetworkGraph>.
 * This exists only to make accessing a RwLock<NetworkGraph> possible from
 * the C bindings, as it can be done directly in Rust code.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LockedNetworkGraph extends CommonBase implements AutoCloseable {
	LockedNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override public void close() {
		if (ptr != 0) { bindings.LockedNetworkGraph_free(ptr); }
	}

	/**
	 * Get a reference to the NetworkGraph which this read-lock contains.
	 */
	public NetworkGraph graph() {
		long ret = bindings.LockedNetworkGraph_graph(this.ptr);
		if (ret < 1024) { return null; }
		NetworkGraph ret_hu_conv = new NetworkGraph(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

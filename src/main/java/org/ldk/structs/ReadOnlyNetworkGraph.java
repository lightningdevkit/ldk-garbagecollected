package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A read-only view of [`NetworkGraph`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ReadOnlyNetworkGraph extends CommonBase {
	ReadOnlyNetworkGraph(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ReadOnlyNetworkGraph_free(ptr); }
	}

}

package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper around [`ChangeDestinationSource`] to allow for async calls.
 * 
 * You should likely never use this directly but rather allow LDK to build this when required to
 * build higher-level sync wrappers.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChangeDestinationSourceSyncWrapper extends CommonBase {
	ChangeDestinationSourceSyncWrapper(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChangeDestinationSourceSyncWrapper_free(ptr); }
	}

	/**
	 * Creates a new [`ChangeDestinationSourceSyncWrapper`].
	 */
	public static ChangeDestinationSourceSyncWrapper of(org.ldk.structs.ChangeDestinationSourceSync source) {
		long ret = bindings.ChangeDestinationSourceSyncWrapper_new(source.ptr);
		Reference.reachabilityFence(source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChangeDestinationSourceSyncWrapper ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChangeDestinationSourceSyncWrapper(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(source); };
		return ret_hu_conv;
	}

}

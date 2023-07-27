package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A locked `MultiThreadedLockableScore`.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MultiThreadedScoreLock extends CommonBase {
	MultiThreadedScoreLock(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MultiThreadedScoreLock_free(ptr); }
	}

	/**
	 * Serialize the MultiThreadedScoreLock object into a byte array which can be read by MultiThreadedScoreLock_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MultiThreadedScoreLock_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.MultiThreadedScoreLock_as_Score(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

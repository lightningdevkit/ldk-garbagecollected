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
public class MultiThreadedScoreLockWrite extends CommonBase {
	MultiThreadedScoreLockWrite(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MultiThreadedScoreLockWrite_free(ptr); }
	}

	/**
	 * Serialize the MultiThreadedScoreLockWrite object into a byte array which can be read by MultiThreadedScoreLockWrite_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MultiThreadedScoreLockWrite_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new ScoreUpdate which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ScoreUpdate must be freed before this_arg is
	 */
	public ScoreUpdate as_ScoreUpdate() {
		long ret = bindings.MultiThreadedScoreLockWrite_as_ScoreUpdate(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ScoreUpdate ret_hu_conv = new ScoreUpdate(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

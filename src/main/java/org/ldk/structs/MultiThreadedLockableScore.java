package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A concrete implementation of [`LockableScore`] which supports multi-threading.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class MultiThreadedLockableScore extends CommonBase {
	MultiThreadedLockableScore(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.MultiThreadedLockableScore_free(ptr); }
	}

	/**
	 * Constructs a new LockableScore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned LockableScore must be freed before this_arg is
	 */
	public LockableScore as_LockableScore() {
		long ret = bindings.MultiThreadedLockableScore_as_LockableScore(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		LockableScore ret_hu_conv = new LockableScore(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the MultiThreadedLockableScore object into a byte array which can be read by MultiThreadedLockableScore_read
	 */
	public byte[] write() {
		byte[] ret = bindings.MultiThreadedLockableScore_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new WriteableScore which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned WriteableScore must be freed before this_arg is
	 */
	public WriteableScore as_WriteableScore() {
		long ret = bindings.MultiThreadedLockableScore_as_WriteableScore(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		WriteableScore ret_hu_conv = new WriteableScore(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new [`MultiThreadedLockableScore`] given an underlying [`Score`].
	 */
	public static MultiThreadedLockableScore of(org.ldk.structs.Score score) {
		long ret = bindings.MultiThreadedLockableScore_new(score == null ? 0 : score.ptr);
		Reference.reachabilityFence(score);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.MultiThreadedLockableScore ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.MultiThreadedLockableScore(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(score); };
		return ret_hu_conv;
	}

}

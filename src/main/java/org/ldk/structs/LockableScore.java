package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * A scorer that is accessed under a lock.
 * 
 * Needed so that calls to [`Score::channel_penalty_msat`] in [`find_route`] can be made while
 * having shared ownership of a scorer but without requiring internal locking in [`Score`]
 * implementations. Internal locking would be detrimental to route finding performance and could
 * result in [`Score::channel_penalty_msat`] returning a different value for the same channel.
 * 
 * [`find_route`]: crate::routing::router::find_route
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class LockableScore extends CommonBase {
	LockableScore(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.LockableScore_free(ptr); }
	}

	/**
	 * Constructs a new LockableScore from a Score
	 */
	public static LockableScore of(Score score) {
		long ret = bindings.LockableScore_new(score == null ? 0 : score.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		LockableScore ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new LockableScore(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(score);
		return ret_hu_conv;
	}

	/**
	 * Serialize the LockableScore object into a byte array which can be read by LockableScore_read
	 */
	public byte[] write() {
		byte[] ret = bindings.LockableScore_write(this.ptr);
		return ret;
	}

}

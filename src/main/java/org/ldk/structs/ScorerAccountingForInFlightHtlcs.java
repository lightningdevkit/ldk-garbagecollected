package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * [`Score`] implementation that factors in in-flight HTLC liquidity.
 * 
 * Useful for custom [`Router`] implementations to wrap their [`Score`] on-the-fly when calling
 * [`find_route`].
 * 
 * [`Score`]: crate::routing::scoring::Score
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ScorerAccountingForInFlightHtlcs extends CommonBase {
	ScorerAccountingForInFlightHtlcs(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ScorerAccountingForInFlightHtlcs_free(ptr); }
	}

	/**
	 * Initialize a new `ScorerAccountingForInFlightHtlcs`.
	 */
	public static ScorerAccountingForInFlightHtlcs of(org.ldk.structs.Score scorer, org.ldk.structs.InFlightHtlcs inflight_htlcs) {
		long ret = bindings.ScorerAccountingForInFlightHtlcs_new(scorer.ptr, inflight_htlcs == null ? 0 : inflight_htlcs.ptr);
		Reference.reachabilityFence(scorer);
		Reference.reachabilityFence(inflight_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ScorerAccountingForInFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ScorerAccountingForInFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(scorer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(inflight_htlcs); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ScorerAccountingForInFlightHtlcs object into a byte array which can be read by ScorerAccountingForInFlightHtlcs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ScorerAccountingForInFlightHtlcs_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.ScorerAccountingForInFlightHtlcs_as_Score(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

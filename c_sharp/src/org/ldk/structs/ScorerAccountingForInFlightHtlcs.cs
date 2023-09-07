using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * [`Score`] implementation that factors in in-flight HTLC liquidity.
 * 
 * Useful for custom [`Router`] implementations to wrap their [`Score`] on-the-fly when calling
 * [`find_route`].
 * 
 * [`Score`]: crate::routing::scoring::Score
 */
public class ScorerAccountingForInFlightHtlcs : CommonBase {
	internal ScorerAccountingForInFlightHtlcs(object _dummy, long ptr) : base(ptr) { }
	~ScorerAccountingForInFlightHtlcs() {
		if (ptr != 0) { bindings.ScorerAccountingForInFlightHtlcs_free(ptr); }
	}

	/**
	 * Initialize a new `ScorerAccountingForInFlightHtlcs`.
	 */
	public static ScorerAccountingForInFlightHtlcs of(org.ldk.structs.Score scorer, org.ldk.structs.InFlightHtlcs inflight_htlcs) {
		long ret = bindings.ScorerAccountingForInFlightHtlcs_new(scorer.ptr, inflight_htlcs == null ? 0 : inflight_htlcs.ptr);
		GC.KeepAlive(scorer);
		GC.KeepAlive(inflight_htlcs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ScorerAccountingForInFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ScorerAccountingForInFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(scorer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(inflight_htlcs); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ScorerAccountingForInFlightHtlcs object into a byte array which can be read by ScorerAccountingForInFlightHtlcs_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ScorerAccountingForInFlightHtlcs_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Constructs a new Score which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Score must be freed before this_arg is
	 */
	public Score as_Score() {
		long ret = bindings.ScorerAccountingForInFlightHtlcs_as_Score(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Score ret_hu_conv = new Score(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

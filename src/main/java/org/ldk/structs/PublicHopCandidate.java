package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A [`CandidateRouteHop::PublicHop`] entry.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PublicHopCandidate extends CommonBase {
	PublicHopCandidate(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PublicHopCandidate_free(ptr); }
	}

	/**
	 * The short channel ID of the channel, i.e. the identifier by which we refer to this
	 * channel.
	 */
	public long get_short_channel_id() {
		long ret = bindings.PublicHopCandidate_get_short_channel_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The short channel ID of the channel, i.e. the identifier by which we refer to this
	 * channel.
	 */
	public void set_short_channel_id(long val) {
		bindings.PublicHopCandidate_set_short_channel_id(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.PublicHopCandidate_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PublicHopCandidate
	 */
	public PublicHopCandidate clone() {
		long ret = bindings.PublicHopCandidate_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PublicHopCandidate ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PublicHopCandidate(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

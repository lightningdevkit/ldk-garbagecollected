package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A wrapper around [`ChannelInfo`] representing information about the channel as directed from a
 * source node to a target node.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DirectedChannelInfo extends CommonBase {
	DirectedChannelInfo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DirectedChannelInfo_free(ptr); }
	}

	long clone_ptr() {
		long ret = bindings.DirectedChannelInfo_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the DirectedChannelInfo
	 */
	public DirectedChannelInfo clone() {
		long ret = bindings.DirectedChannelInfo_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		DirectedChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new DirectedChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Returns information for the channel.
	 */
	public ChannelInfo channel() {
		long ret = bindings.DirectedChannelInfo_channel(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Returns information for the direction.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	@Nullable
	public ChannelUpdateInfo direction() {
		long ret = bindings.DirectedChannelInfo_direction(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelUpdateInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelUpdateInfo(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Returns the [`EffectiveCapacity`] of the channel in the direction.
	 * 
	 * This is either the total capacity from the funding transaction, if known, or the
	 * `htlc_maximum_msat` for the direction as advertised by the gossip network, if known,
	 * whichever is smaller.
	 */
	public EffectiveCapacity effective_capacity() {
		long ret = bindings.DirectedChannelInfo_effective_capacity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EffectiveCapacity ret_hu_conv = EffectiveCapacity.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}

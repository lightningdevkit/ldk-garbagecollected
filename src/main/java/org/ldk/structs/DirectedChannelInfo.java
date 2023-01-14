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
		org.ldk.structs.DirectedChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DirectedChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns information for the channel.
	 */
	public ChannelInfo channel() {
		long ret = bindings.DirectedChannelInfo_channel(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns the maximum HTLC amount allowed over the channel in the direction.
	 */
	public long htlc_maximum_msat() {
		long ret = bindings.DirectedChannelInfo_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Returns the [`EffectiveCapacity`] of the channel in the direction.
	 * 
	 * This is either the total capacity from the funding transaction, if known, or the
	 * `htlc_maximum_msat` for the direction as advertised by the gossip network, if known,
	 * otherwise.
	 */
	public EffectiveCapacity effective_capacity() {
		long ret = bindings.DirectedChannelInfo_effective_capacity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

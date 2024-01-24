using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A wrapper around [`ChannelInfo`] representing information about the channel as directed from a
 * source node to a target node.
 */
public class DirectedChannelInfo : CommonBase {
	internal DirectedChannelInfo(object _dummy, long ptr) : base(ptr) { }
	~DirectedChannelInfo() {
		if (ptr != 0) { bindings.DirectedChannelInfo_free(ptr); }
	}

	internal long clone_ptr() {
		long ret = bindings.DirectedChannelInfo_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the DirectedChannelInfo
	 */
	public DirectedChannelInfo clone() {
		long ret = bindings.DirectedChannelInfo_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.DirectedChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.DirectedChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns information for the channel.
	 */
	public ChannelInfo channel() {
		long ret = bindings.DirectedChannelInfo_channel(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelInfo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelInfo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
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
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

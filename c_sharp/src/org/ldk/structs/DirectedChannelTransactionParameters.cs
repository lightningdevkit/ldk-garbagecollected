using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Static channel fields used to build transactions given per-commitment fields, organized by
 * broadcaster/countersignatory.
 * 
 * This is derived from the holder/counterparty-organized ChannelTransactionParameters via the
 * as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
public class DirectedChannelTransactionParameters : CommonBase {
	internal DirectedChannelTransactionParameters(object _dummy, long ptr) : base(ptr) { }
	~DirectedChannelTransactionParameters() {
		if (ptr != 0) { bindings.DirectedChannelTransactionParameters_free(ptr); }
	}

	/**
	 * Get the channel pubkeys for the broadcaster
	 */
	public ChannelPublicKeys broadcaster_pubkeys() {
		long ret = bindings.DirectedChannelTransactionParameters_broadcaster_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Get the channel pubkeys for the countersignatory
	 */
	public ChannelPublicKeys countersignatory_pubkeys() {
		long ret = bindings.DirectedChannelTransactionParameters_countersignatory_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Get the contest delay applicable to the transactions.
	 * Note that the contest delay was selected by the countersignatory.
	 */
	public short contest_delay() {
		short ret = bindings.DirectedChannelTransactionParameters_contest_delay(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Whether the channel is outbound from the broadcaster.
	 * 
	 * The boolean representing the side that initiated the channel is
	 * an input to the commitment number obscure factor computation.
	 */
	public bool is_outbound() {
		bool ret = bindings.DirectedChannelTransactionParameters_is_outbound(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The funding outpoint
	 */
	public OutPoint funding_outpoint() {
		long ret = bindings.DirectedChannelTransactionParameters_funding_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Whether to use anchors for this channel
	 */
	public ChannelTypeFeatures channel_type_features() {
		long ret = bindings.DirectedChannelTransactionParameters_channel_type_features(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }

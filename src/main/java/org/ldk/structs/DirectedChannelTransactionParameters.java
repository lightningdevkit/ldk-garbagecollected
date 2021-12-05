package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Static channel fields used to build transactions given per-commitment fields, organized by
 * broadcaster/countersignatory.
 * 
 * This is derived from the holder/counterparty-organized ChannelTransactionParameters via the
 * as_holder_broadcastable and as_counterparty_broadcastable functions.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class DirectedChannelTransactionParameters extends CommonBase {
	DirectedChannelTransactionParameters(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.DirectedChannelTransactionParameters_free(ptr); }
	}

	/**
	 * Get the channel pubkeys for the broadcaster
	 */
	public ChannelPublicKeys broadcaster_pubkeys() {
		long ret = bindings.DirectedChannelTransactionParameters_broadcaster_pubkeys(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelPublicKeys(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Get the channel pubkeys for the countersignatory
	 */
	public ChannelPublicKeys countersignatory_pubkeys() {
		long ret = bindings.DirectedChannelTransactionParameters_countersignatory_pubkeys(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelPublicKeys(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Get the contest delay applicable to the transactions.
	 * Note that the contest delay was selected by the countersignatory.
	 */
	public short contest_delay() {
		short ret = bindings.DirectedChannelTransactionParameters_contest_delay(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the channel is outbound from the broadcaster.
	 * 
	 * The boolean representing the side that initiated the channel is
	 * an input to the commitment number obscure factor computation.
	 */
	public boolean is_outbound() {
		boolean ret = bindings.DirectedChannelTransactionParameters_is_outbound(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The funding outpoint
	 */
	public OutPoint funding_outpoint() {
		long ret = bindings.DirectedChannelTransactionParameters_funding_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new OutPoint(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Whether to use anchors for this channel
	 */
	public boolean opt_anchors() {
		boolean ret = bindings.DirectedChannelTransactionParameters_opt_anchors(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}

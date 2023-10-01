package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Proposed use of a channel passed as a parameter to [`ScoreLookUp::channel_penalty_msat`].
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelUsage extends CommonBase {
	ChannelUsage(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelUsage_free(ptr); }
	}

	/**
	 * The amount to send through the channel, denominated in millisatoshis.
	 */
	public long get_amount_msat() {
		long ret = bindings.ChannelUsage_get_amount_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The amount to send through the channel, denominated in millisatoshis.
	 */
	public void set_amount_msat(long val) {
		bindings.ChannelUsage_set_amount_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Total amount, denominated in millisatoshis, already allocated to send through the channel
	 * as part of a multi-path payment.
	 */
	public long get_inflight_htlc_msat() {
		long ret = bindings.ChannelUsage_get_inflight_htlc_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Total amount, denominated in millisatoshis, already allocated to send through the channel
	 * as part of a multi-path payment.
	 */
	public void set_inflight_htlc_msat(long val) {
		bindings.ChannelUsage_set_inflight_htlc_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The effective capacity of the channel.
	 */
	public EffectiveCapacity get_effective_capacity() {
		long ret = bindings.ChannelUsage_get_effective_capacity(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.EffectiveCapacity ret_hu_conv = org.ldk.structs.EffectiveCapacity.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The effective capacity of the channel.
	 */
	public void set_effective_capacity(org.ldk.structs.EffectiveCapacity val) {
		bindings.ChannelUsage_set_effective_capacity(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Constructs a new ChannelUsage given each field
	 */
	public static ChannelUsage of(long amount_msat_arg, long inflight_htlc_msat_arg, org.ldk.structs.EffectiveCapacity effective_capacity_arg) {
		long ret = bindings.ChannelUsage_new(amount_msat_arg, inflight_htlc_msat_arg, effective_capacity_arg.ptr);
		Reference.reachabilityFence(amount_msat_arg);
		Reference.reachabilityFence(inflight_htlc_msat_arg);
		Reference.reachabilityFence(effective_capacity_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUsage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUsage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(effective_capacity_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ChannelUsage_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUsage
	 */
	public ChannelUsage clone() {
		long ret = bindings.ChannelUsage_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelUsage ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelUsage(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

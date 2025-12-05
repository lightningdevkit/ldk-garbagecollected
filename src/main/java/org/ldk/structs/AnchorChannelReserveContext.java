package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Parameters defining the context around the anchor channel reserve requirement calculation.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AnchorChannelReserveContext extends CommonBase {
	AnchorChannelReserveContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AnchorChannelReserveContext_free(ptr); }
	}

	/**
	 * The expected number of accepted in-flight HTLCs per channel.
	 * 
	 * Note that malicious counterparties can saturate the number of accepted in-flight HTLCs up to
	 * the maximum prior to forcing a unilateral closure. This estimate can include that case as a
	 * weighted average, assuming some percentage of channels are controlled by malicious peers and
	 * have the maximum number of accepted in-flight HTLCs.
	 * 
	 * See [ChannelHandshakeConfig::our_max_accepted_htlcs] to configure the maximum number of
	 * accepted in-flight HTLCs.
	 * 
	 * [ChannelHandshakeConfig::our_max_accepted_htlcs]: crate::util::config::ChannelHandshakeConfig::our_max_accepted_htlcs
	 */
	public short get_expected_accepted_htlcs() {
		short ret = bindings.AnchorChannelReserveContext_get_expected_accepted_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The expected number of accepted in-flight HTLCs per channel.
	 * 
	 * Note that malicious counterparties can saturate the number of accepted in-flight HTLCs up to
	 * the maximum prior to forcing a unilateral closure. This estimate can include that case as a
	 * weighted average, assuming some percentage of channels are controlled by malicious peers and
	 * have the maximum number of accepted in-flight HTLCs.
	 * 
	 * See [ChannelHandshakeConfig::our_max_accepted_htlcs] to configure the maximum number of
	 * accepted in-flight HTLCs.
	 * 
	 * [ChannelHandshakeConfig::our_max_accepted_htlcs]: crate::util::config::ChannelHandshakeConfig::our_max_accepted_htlcs
	 */
	public void set_expected_accepted_htlcs(short val) {
		bindings.AnchorChannelReserveContext_set_expected_accepted_htlcs(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Whether the wallet handling anchor channel reserves creates Taproot P2TR outputs for any new
	 * outputs, or Segwit P2WPKH outputs otherwise.
	 */
	public boolean get_taproot_wallet() {
		boolean ret = bindings.AnchorChannelReserveContext_get_taproot_wallet(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Whether the wallet handling anchor channel reserves creates Taproot P2TR outputs for any new
	 * outputs, or Segwit P2WPKH outputs otherwise.
	 */
	public void set_taproot_wallet(boolean val) {
		bindings.AnchorChannelReserveContext_set_taproot_wallet(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	long clone_ptr() {
		long ret = bindings.AnchorChannelReserveContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AnchorChannelReserveContext
	 */
	public AnchorChannelReserveContext clone() {
		long ret = bindings.AnchorChannelReserveContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorChannelReserveContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorChannelReserveContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two AnchorChannelReserveContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.AnchorChannelReserveContext b) {
		boolean ret = bindings.AnchorChannelReserveContext_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof AnchorChannelReserveContext)) return false;
		return this.eq((AnchorChannelReserveContext)o);
	}
	/**
	 * Creates a "default" AnchorChannelReserveContext. See struct and individual field documentaiton for details on which values are used.
	 */
	public static AnchorChannelReserveContext with_default() {
		long ret = bindings.AnchorChannelReserveContext_default();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AnchorChannelReserveContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AnchorChannelReserveContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}

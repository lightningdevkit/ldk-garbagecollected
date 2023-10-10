package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An intermediate node, its outbound channel, and relay parameters.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ForwardNode extends CommonBase {
	ForwardNode(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ForwardNode_free(ptr); }
	}

	/**
	 * The TLVs for this node's [`BlindedHop`], where the fee parameters contained within are also
	 * used for [`BlindedPayInfo`] construction.
	 */
	public ForwardTlvs get_tlvs() {
		long ret = bindings.ForwardNode_get_tlvs(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ForwardTlvs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ForwardTlvs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The TLVs for this node's [`BlindedHop`], where the fee parameters contained within are also
	 * used for [`BlindedPayInfo`] construction.
	 */
	public void set_tlvs(org.ldk.structs.ForwardTlvs val) {
		bindings.ForwardNode_set_tlvs(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * This node's pubkey.
	 */
	public byte[] get_node_id() {
		byte[] ret = bindings.ForwardNode_get_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * This node's pubkey.
	 */
	public void set_node_id(byte[] val) {
		bindings.ForwardNode_set_node_id(this.ptr, InternalUtils.check_arr_len(val, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The maximum value, in msat, that may be accepted by this node.
	 */
	public long get_htlc_maximum_msat() {
		long ret = bindings.ForwardNode_get_htlc_maximum_msat(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The maximum value, in msat, that may be accepted by this node.
	 */
	public void set_htlc_maximum_msat(long val) {
		bindings.ForwardNode_set_htlc_maximum_msat(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new ForwardNode given each field
	 */
	public static ForwardNode of(org.ldk.structs.ForwardTlvs tlvs_arg, byte[] node_id_arg, long htlc_maximum_msat_arg) {
		long ret = bindings.ForwardNode_new(tlvs_arg == null ? 0 : tlvs_arg.ptr, InternalUtils.check_arr_len(node_id_arg, 33), htlc_maximum_msat_arg);
		Reference.reachabilityFence(tlvs_arg);
		Reference.reachabilityFence(node_id_arg);
		Reference.reachabilityFence(htlc_maximum_msat_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(tlvs_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.ForwardNode_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ForwardNode
	 */
	public ForwardNode clone() {
		long ret = bindings.ForwardNode_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ForwardNode ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ForwardNode(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}

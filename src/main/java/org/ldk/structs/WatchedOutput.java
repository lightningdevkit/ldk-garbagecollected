package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A transaction output watched by a [`ChannelMonitor`] for spends on-chain.
 * 
 * Used to convey to a [`Filter`] such an output with a given spending condition. Any transaction
 * spending the output must be given to [`ChannelMonitor::block_connected`] either directly or via
 * [`Confirm::transactions_confirmed`].
 * 
 * If `block_hash` is `Some`, this indicates the output was created in the corresponding block and
 * may have been spent there. See [`Filter::register_output`] for details.
 * 
 * [`ChannelMonitor`]: channelmonitor::ChannelMonitor
 * [`ChannelMonitor::block_connected`]: channelmonitor::ChannelMonitor::block_connected
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class WatchedOutput extends CommonBase {
	WatchedOutput(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.WatchedOutput_free(ptr); }
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public Option_BlockHashZ get_block_hash() {
		long ret = bindings.WatchedOutput_get_block_hash(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public void set_block_hash(org.ldk.structs.Option_BlockHashZ val) {
		bindings.WatchedOutput_set_block_hash(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.WatchedOutput_get_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.WatchedOutput_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public byte[] get_script_pubkey() {
		byte[] ret = bindings.WatchedOutput_get_script_pubkey(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public void set_script_pubkey(byte[] val) {
		bindings.WatchedOutput_set_script_pubkey(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new WatchedOutput given each field
	 */
	public static WatchedOutput of(org.ldk.structs.Option_BlockHashZ block_hash_arg, org.ldk.structs.OutPoint outpoint_arg, byte[] script_pubkey_arg) {
		long ret = bindings.WatchedOutput_new(block_hash_arg.ptr, outpoint_arg == null ? 0 : outpoint_arg.ptr, script_pubkey_arg);
		Reference.reachabilityFence(block_hash_arg);
		Reference.reachabilityFence(outpoint_arg);
		Reference.reachabilityFence(script_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WatchedOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WatchedOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(block_hash_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.WatchedOutput_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the WatchedOutput
	 */
	public WatchedOutput clone() {
		long ret = bindings.WatchedOutput_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WatchedOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WatchedOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two WatchedOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.WatchedOutput b) {
		boolean ret = bindings.WatchedOutput_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof WatchedOutput)) return false;
		return this.eq((WatchedOutput)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the WatchedOutput.
	 */
	public long hash() {
		long ret = bindings.WatchedOutput_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
}

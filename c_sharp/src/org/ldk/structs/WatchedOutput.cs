using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class WatchedOutput : CommonBase {
	internal WatchedOutput(object _dummy, long ptr) : base(ptr) { }
	~WatchedOutput() {
		if (ptr != 0) { bindings.WatchedOutput_free(ptr); }
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public Option_BlockHashZ get_block_hash() {
		long ret = bindings.WatchedOutput_get_block_hash(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * First block where the transaction output may have been spent.
	 */
	public void set_block_hash(org.ldk.structs.Option_BlockHashZ val) {
		bindings.WatchedOutput_set_block_hash(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.WatchedOutput_get_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Outpoint identifying the transaction output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.WatchedOutput_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public byte[] get_script_pubkey() {
		byte[] ret = bindings.WatchedOutput_get_script_pubkey(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Spending condition of the transaction output.
	 */
	public void set_script_pubkey(byte[] val) {
		bindings.WatchedOutput_set_script_pubkey(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new WatchedOutput given each field
	 */
	public static WatchedOutput of(org.ldk.structs.Option_BlockHashZ block_hash_arg, org.ldk.structs.OutPoint outpoint_arg, byte[] script_pubkey_arg) {
		long ret = bindings.WatchedOutput_new(block_hash_arg.ptr, outpoint_arg == null ? 0 : outpoint_arg.ptr, script_pubkey_arg);
		GC.KeepAlive(block_hash_arg);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(script_pubkey_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WatchedOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WatchedOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(block_hash_arg); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(outpoint_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.WatchedOutput_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the WatchedOutput
	 */
	public WatchedOutput clone() {
		long ret = bindings.WatchedOutput_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.WatchedOutput ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.WatchedOutput(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two WatchedOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.WatchedOutput b) {
		bool ret = bindings.WatchedOutput_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is WatchedOutput)) return false;
		return this.eq((WatchedOutput)o);
	}
	/**
	 * Generates a non-cryptographic 64-bit hash of the WatchedOutput.
	 */
	public long hash() {
		long ret = bindings.WatchedOutput_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
}
} } }

using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * An input that must be included in a transaction when performing coin selection through
 * [`CoinSelectionSource::select_confirmed_utxos`]. It is guaranteed to be a SegWit input, so it
 * must have an empty [`TxIn::script_sig`] when spent.
 */
public class Input : CommonBase {
	internal Input(object _dummy, long ptr) : base(ptr) { }
	~Input() {
		if (ptr != 0) { bindings.Input_free(ptr); }
	}

	/**
	 * The unique identifier of the input.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.Input_get_outpoint(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the input.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.Input_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public TxOut get_previous_utxo() {
		long ret = bindings.Input_get_previous_utxo(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public void set_previous_utxo(org.ldk.structs.TxOut val) {
		bindings.Input_set_previous_utxo(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public long get_satisfaction_weight() {
		long ret = bindings.Input_get_satisfaction_weight(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public void set_satisfaction_weight(long val) {
		bindings.Input_set_satisfaction_weight(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new Input given each field
	 */
	public static Input of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut previous_utxo_arg, long satisfaction_weight_arg) {
		long ret = bindings.Input_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, previous_utxo_arg.ptr, satisfaction_weight_arg);
		GC.KeepAlive(outpoint_arg);
		GC.KeepAlive(previous_utxo_arg);
		GC.KeepAlive(satisfaction_weight_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Input ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Input(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(outpoint_arg); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.Input_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Input
	 */
	public Input clone() {
		long ret = bindings.Input_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Input ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Input(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Input.
	 */
	public long hash() {
		long ret = bindings.Input_hash(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	public override int GetHashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Inputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.Input b) {
		bool ret = bindings.Input_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		if (this != null) { this.ptrs_to.AddLast(b); };
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Input)) return false;
		return this.eq((Input)o);
	}
}
} } }

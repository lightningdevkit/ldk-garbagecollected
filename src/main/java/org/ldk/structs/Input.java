package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An input that must be included in a transaction when performing coin selection through
 * [`CoinSelectionSource::select_confirmed_utxos`]. It is guaranteed to be a SegWit input, so it
 * must have an empty [`TxIn::script_sig`] when spent.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Input extends CommonBase {
	Input(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Input_free(ptr); }
	}

	/**
	 * The unique identifier of the input.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.Input_get_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the input.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.Input_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public TxOut get_previous_utxo() {
		long ret = bindings.Input_get_previous_utxo(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public void set_previous_utxo(org.ldk.structs.TxOut val) {
		bindings.Input_set_previous_utxo(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public long get_satisfaction_weight() {
		long ret = bindings.Input_get_satisfaction_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public void set_satisfaction_weight(long val) {
		bindings.Input_set_satisfaction_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Input given each field
	 */
	public static Input of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut previous_utxo_arg, long satisfaction_weight_arg) {
		long ret = bindings.Input_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, previous_utxo_arg.ptr, satisfaction_weight_arg);
		Reference.reachabilityFence(outpoint_arg);
		Reference.reachabilityFence(previous_utxo_arg);
		Reference.reachabilityFence(satisfaction_weight_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Input ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Input(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Input_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Input
	 */
	public Input clone() {
		long ret = bindings.Input_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Input ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Input(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Input.
	 */
	public long hash() {
		long ret = bindings.Input_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Inputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Input b) {
		boolean ret = bindings.Input_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Input)) return false;
		return this.eq((Input)o);
	}
}

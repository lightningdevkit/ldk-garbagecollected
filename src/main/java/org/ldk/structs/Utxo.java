package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An unspent transaction output that is available to spend resulting from a successful
 * [`CoinSelection`] attempt.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Utxo extends CommonBase {
	Utxo(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Utxo_free(ptr); }
	}

	/**
	 * The unique identifier of the output.
	 */
	public OutPoint get_outpoint() {
		long ret = bindings.Utxo_get_outpoint(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OutPoint ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OutPoint(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the output.
	 */
	public void set_outpoint(org.ldk.structs.OutPoint val) {
		bindings.Utxo_set_outpoint(this.ptr, val == null ? 0 : val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
		if (this != null) { this.ptrs_to.add(val); };
	}

	/**
	 * The output to spend.
	 */
	public TxOut get_output() {
		long ret = bindings.Utxo_get_output(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		TxOut ret_conv = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output to spend.
	 */
	public void set_output(org.ldk.structs.TxOut val) {
		bindings.Utxo_set_output(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public long get_satisfaction_weight() {
		long ret = bindings.Utxo_get_satisfaction_weight(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public void set_satisfaction_weight(long val) {
		bindings.Utxo_set_satisfaction_weight(this.ptr, val);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new Utxo given each field
	 */
	public static Utxo of(org.ldk.structs.OutPoint outpoint_arg, org.ldk.structs.TxOut output_arg, long satisfaction_weight_arg) {
		long ret = bindings.Utxo_new(outpoint_arg == null ? 0 : outpoint_arg.ptr, output_arg.ptr, satisfaction_weight_arg);
		Reference.reachabilityFence(outpoint_arg);
		Reference.reachabilityFence(output_arg);
		Reference.reachabilityFence(satisfaction_weight_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint_arg); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.Utxo_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Utxo
	 */
	public Utxo clone() {
		long ret = bindings.Utxo_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Utxo.
	 */
	public long hash() {
		long ret = bindings.Utxo_hash(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	@Override public int hashCode() {
		return (int)this.hash();
	}
	/**
	 * Checks if two Utxos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public boolean eq(org.ldk.structs.Utxo b) {
		boolean ret = bindings.Utxo_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		if (this != null) { this.ptrs_to.add(b); };
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Utxo)) return false;
		return this.eq((Utxo)o);
	}
	/**
	 * Returns a `Utxo` with the `satisfaction_weight` estimate for a legacy P2PKH output.
	 */
	public static Utxo new_p2pkh(org.ldk.structs.OutPoint outpoint, long value, byte[] pubkey_hash) {
		long ret = bindings.Utxo_new_p2pkh(outpoint == null ? 0 : outpoint.ptr, value, InternalUtils.check_arr_len(pubkey_hash, 20));
		Reference.reachabilityFence(outpoint);
		Reference.reachabilityFence(value);
		Reference.reachabilityFence(pubkey_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Utxo ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Utxo(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(outpoint); };
		return ret_hu_conv;
	}

}
